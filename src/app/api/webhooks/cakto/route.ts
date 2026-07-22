import { getProductConfig } from '@/config/products.config';
import { requireEnv } from '@/config/env';
import { activateCustomerAccess, revokeCustomerAccess } from '@/data/customers';
import {
  completeWebhookEvent,
  createWebhookFingerprint,
  failWebhookEvent,
  reserveWebhookEvent,
} from '@/data/webhook-events';
import { InvalidPhoneError, normalizePhone } from '@/domain/phone';
import { CaktoEnvelopeSchema, CaktoWebhookSchema } from '@/types/cakto';
import { secretsMatch } from '@/utils/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 64 * 1024;
const HANDLED_EVENTS = new Set(['purchase_approved', 'refund', 'chargeback']);

function parseEventDate(value: string | null | undefined, fallback: Date): Date {
  if (!value) {
    return fallback;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new RangeError('Invalid event date');
  }
  return parsed;
}

export async function POST(request: Request): Promise<Response> {
  let fingerprint: string | undefined;

  try {
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
      return Response.json({ error: 'payload too large' }, { status: 413 });
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return Response.json({ error: 'invalid JSON' }, { status: 400 });
    }

    const envelope = CaktoEnvelopeSchema.safeParse(body);
    if (!envelope.success) {
      return Response.json({ error: 'invalid payload' }, { status: 400 });
    }

    if (!secretsMatch(envelope.data.secret, requireEnv('CAKTO_WEBHOOK_SECRET'))) {
      return Response.json({ error: 'unauthorized' }, { status: 401 });
    }

    if (!HANDLED_EVENTS.has(envelope.data.event)) {
      return Response.json({ ok: true, action: 'ignored_event' });
    }

    const parsedPayload = CaktoWebhookSchema.safeParse(body);
    if (!parsedPayload.success) {
      return Response.json({ error: 'invalid payload' }, { status: 400 });
    }

    const payload = parsedPayload.data;
    const product = getProductConfig(payload.data.product.id);
    if (!product) {
      console.warn('cakto_unknown_product', { productId: payload.data.product.id });
      return Response.json({ ok: true, action: 'ignored_unknown_product' });
    }

    if (!product.grantsGroupAccess) {
      return Response.json({ ok: true, action: 'ignored_product_without_group_access' });
    }

    if (product.durationMonths === null) {
      throw new Error('Group-access product has no duration');
    }

    const email = payload.data.customer.email.trim().toLowerCase();
    const phone = normalizePhone(payload.data.customer.phone);
    const now = new Date();
    const paidAt = parseEventDate(payload.data.paidAt, now);

    fingerprint = createWebhookFingerprint(payload);
    const reservation = await reserveWebhookEvent(fingerprint, payload, now);
    if (reservation === 'duplicate') {
      return Response.json({ ok: true, action: 'duplicate_ignored' });
    }

    if (payload.event === 'purchase_approved') {
      await activateCustomerAccess({
        email,
        phone,
        paidAt,
        durationMonths: product.durationMonths,
        now,
      });
    } else if (payload.event === 'refund') {
      await revokeCustomerAccess(email, 'refunded');
    } else {
      await revokeCustomerAccess(email, 'chargebacked');
    }

    await completeWebhookEvent(fingerprint);
    return Response.json({ ok: true, action: 'processed' });
  } catch (error) {
    if (fingerprint) {
      const errorCode = error instanceof Error ? error.name : 'UnknownError';
      await failWebhookEvent(fingerprint, errorCode);
    }

    if (error instanceof InvalidPhoneError || error instanceof RangeError) {
      return Response.json({ error: 'invalid payload' }, { status: 400 });
    }

    console.error('cakto_webhook_failed', {
      error: error instanceof Error ? error.name : 'UnknownError',
    });
    return Response.json({ error: 'internal error' }, { status: 500 });
  }
}
