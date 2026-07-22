const REQUIRED_ENV_NAMES = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'CAKTO_WEBHOOK_SECRET',
  'CRON_SECRET',
  'ADMIN_AUDIT_SECRET',
  'BOT_SERVER_URL',
  'BOT_SECRET',
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
  'ADMIN_ALERT_EMAIL',
  'ADMIN_NUMBERS',
] as const;

export type RequiredEnvName = typeof REQUIRED_ENV_NAMES[number];

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export function requireEnv(name: RequiredEnvName): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new ConfigurationError(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getBotServerUrl(): string {
  const rawUrl = requireEnv('BOT_SERVER_URL');
  let url: URL;

  try {
    url = new URL(rawUrl);
  } catch {
    throw new ConfigurationError('BOT_SERVER_URL must be a valid URL');
  }

  const isLocalDevelopment = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  if (url.protocol !== 'https:' && !(process.env.NODE_ENV !== 'production' && isLocalDevelopment)) {
    throw new ConfigurationError('BOT_SERVER_URL must use HTTPS');
  }

  return url.toString().replace(/\/$/, '');
}

export function getAuditMaxRemovals(): number {
  const rawValue = process.env.AUDIT_MAX_REMOVALS?.trim() || '25';
  const value = Number.parseInt(rawValue, 10);
  if (!Number.isInteger(value) || value < 1 || value > 500) {
    throw new ConfigurationError('AUDIT_MAX_REMOVALS must be an integer between 1 and 500');
  }
  return value;
}
