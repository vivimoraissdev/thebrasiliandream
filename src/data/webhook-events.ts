import { createHash } from 'node:crypto';
import type { CaktoWebhook } from '@/types/cakto';
import { getSupabaseAdmin } from '@/utils/supabase';

export type WebhookReservation = 'reserved' | 'duplicate';

export class WebhookEventDataError extends Error {
  constructor(operation: string) {
    super(`Webhook event operation failed: ${operation}`);
    this.name = 'WebhookEventDataError';
  }
}

export function createWebhookFingerprint(payload: CaktoWebhook): string {
  const eventTimestamp = payload.data.paidAt
    ?? payload.data.refundedAt
    ?? payload.data.chargedbackAt
    ?? '';
  const stableFields = [
    payload.event,
    payload.data.customer.email.trim().toLowerCase(),
    payload.data.product.id,
    eventTimestamp,
  ];

  return createHash('sha256').update(JSON.stringify(stableFields)).digest('hex');
}

function logAndThrow(operation: string, error: { code?: string } | null): never {
  console.error('webhook_event_data_error', { operation, code: error?.code ?? 'unknown' });
  throw new WebhookEventDataError(operation);
}

export async function reserveWebhookEvent(
  fingerprint: string,
  payload: CaktoWebhook,
  now = new Date(),
): Promise<WebhookReservation> {
  const supabase = getSupabaseAdmin();
  const record = {
    fingerprint,
    event_type: payload.event,
    customer_email: payload.data.customer.email.trim().toLowerCase(),
    product_id: payload.data.product.id,
    status: 'processing',
  };
  const { error: insertError } = await supabase.from('webhook_events').insert(record);

  if (!insertError) {
    return 'reserved';
  }
  if (insertError.code !== '23505') {
    logAndThrow('reserve_insert', insertError);
  }

  const { data, error } = await supabase
    .from('webhook_events')
    .select('status,updated_at')
    .eq('fingerprint', fingerprint)
    .single();
  if (error) {
    logAndThrow('reserve_lookup', error);
  }

  const staleBefore = new Date(now.getTime() - 10 * 60 * 1000);
  const isStale = new Date(String(data.updated_at)) < staleBefore;
  if (data.status === 'completed' || (data.status === 'processing' && !isStale)) {
    return 'duplicate';
  }

  const { error: updateError } = await supabase
    .from('webhook_events')
    .update({ status: 'processing', error_code: null, processed_at: null })
    .eq('fingerprint', fingerprint);
  if (updateError) {
    logAndThrow('reserve_retry', updateError);
  }
  return 'reserved';
}

export async function completeWebhookEvent(fingerprint: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('webhook_events')
    .update({ status: 'completed', error_code: null, processed_at: new Date().toISOString() })
    .eq('fingerprint', fingerprint);
  if (error) {
    logAndThrow('complete', error);
  }
}

export async function failWebhookEvent(fingerprint: string, errorCode: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('webhook_events')
    .update({ status: 'failed', error_code: errorCode.slice(0, 100) })
    .eq('fingerprint', fingerprint);
  if (error) {
    console.error('webhook_event_data_error', { operation: 'fail', code: error.code });
  }
}
