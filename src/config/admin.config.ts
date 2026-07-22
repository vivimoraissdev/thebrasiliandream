import { requireEnv } from './env';
import { deduplicatePhones } from '@/domain/phone';

export function getAdminNumbers(): string[] {
  const values = requireEnv('ADMIN_NUMBERS')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  if (values.length === 0) {
    throw new Error('ADMIN_NUMBERS must contain at least one phone number');
  }

  return deduplicatePhones(values);
}
