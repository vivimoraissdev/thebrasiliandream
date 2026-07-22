import { createHash } from 'node:crypto';
import { Resend } from 'resend';
import { requireEnv } from '@/config/env';
import type { CustomerRecord } from '@/types/customer';

let resendClient: Resend | undefined;

function getResend(): Resend {
  resendClient ??= new Resend(requireEnv('RESEND_API_KEY'));
  return resendClient;
}

function createIdempotencyKey(parts: string[]): string {
  return createHash('sha256').update(parts.join(':')).digest('hex');
}

async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
  idempotencyParts: string[];
}): Promise<void> {
  const { error } = await getResend().emails.send({
    from: requireEnv('RESEND_FROM_EMAIL'),
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  }, {
    idempotencyKey: createIdempotencyKey(input.idempotencyParts),
  });

  if (error) {
    throw new Error(`Email provider error: ${error.name}`);
  }
}

function customerCycle(customer: CustomerRecord): string {
  return customer.expiration_date ?? customer.created_at;
}

export async function sendWarningEmail(customer: CustomerRecord): Promise<void> {
  await sendEmail({
    to: customer.email,
    subject: 'Seu acesso à Comunidade Imersão termina em 7 dias',
    text: 'Seu acesso à Comunidade Imersão termina em 7 dias. Aproveite este período para revisar os conteúdos e participar dos encontros.',
    html: '<p>Seu acesso à <strong>Comunidade Imersão</strong> termina em 7 dias.</p><p>Aproveite este período para revisar os conteúdos e participar dos encontros.</p>',
    idempotencyParts: ['warning', customer.id, customerCycle(customer)],
  });
}

export async function sendFinalEmail(customer: CustomerRecord): Promise<void> {
  await sendEmail({
    to: customer.email,
    subject: 'Seu acesso à Comunidade Imersão foi encerrado',
    text: 'Confirmamos que seu acesso à Comunidade Imersão foi encerrado. Agradecemos por ter participado conosco.',
    html: '<p>Confirmamos que seu acesso à <strong>Comunidade Imersão</strong> foi encerrado.</p><p>Agradecemos por ter participado conosco.</p>',
    idempotencyParts: ['final', customer.id, customerCycle(customer)],
  });
}

export async function sendBotDownAlert(now = new Date()): Promise<void> {
  const utcDate = now.toISOString().slice(0, 10);
  await sendEmail({
    to: requireEnv('ADMIN_ALERT_EMAIL'),
    subject: 'URGENTE: bot do WhatsApp desconectado',
    text: 'O heartbeat do bot do WhatsApp falhou. Nenhuma remoção foi tentada. Verifique o serviço e a sessão do WhatsApp.',
    html: '<p><strong>O heartbeat do bot do WhatsApp falhou.</strong></p><p>Nenhuma remoção foi tentada. Verifique o serviço e a sessão do WhatsApp.</p>',
    idempotencyParts: ['bot-down', utcDate],
  });
}
