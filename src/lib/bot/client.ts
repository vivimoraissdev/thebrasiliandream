import { getBotServerUrl, requireEnv } from '@/config/env';
import { deduplicatePhones } from '@/domain/phone';
import {
  BotHealthSchema,
  BotParticipantsResponseSchema,
  BotRemoveResponseSchema,
  type BotParticipantsResponse,
  type BotRemoveResponse,
} from '@/types/bot';

export class BotClientError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = 'BotClientError';
  }
}

async function requestBot(
  path: string,
  init: RequestInit,
  options: { authenticated: boolean; timeoutMs: number },
): Promise<unknown> {
  const headers = new Headers(init.headers);
  headers.set('accept', 'application/json');
  if (options.authenticated) {
    headers.set('authorization', `Bearer ${requireEnv('BOT_SECRET')}`);
  }

  let response: Response;
  try {
    response = await fetch(`${getBotServerUrl()}${path}`, {
      ...init,
      headers,
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(options.timeoutMs),
    });
  } catch {
    throw new BotClientError('Bot request failed');
  }

  if (!response.ok) {
    throw new BotClientError('Bot returned an unsuccessful response', response.status);
  }

  try {
    return await response.json();
  } catch {
    throw new BotClientError('Bot returned invalid JSON', response.status);
  }
}

export async function checkBotHealth(): Promise<boolean> {
  const payload = await requestBot('/health', { method: 'GET' }, {
    authenticated: false,
    timeoutMs: 10_000,
  });
  return BotHealthSchema.parse(payload).connected;
}

export async function removePhones(phones: string[]): Promise<BotRemoveResponse> {
  const normalizedPhones = deduplicatePhones(phones);
  if (normalizedPhones.length === 0) {
    return { results: [] };
  }

  const payload = await requestBot('/remove', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ phones: normalizedPhones }),
  }, {
    authenticated: true,
    timeoutMs: 240_000,
  });

  return BotRemoveResponseSchema.parse(payload);
}

export async function fetchParticipants(): Promise<BotParticipantsResponse> {
  const payload = await requestBot('/participants', { method: 'GET' }, {
    authenticated: true,
    timeoutMs: 60_000,
  });
  return BotParticipantsResponseSchema.parse(payload);
}
