import { getPhoneVariants, normalizePhone } from './phone';

export interface AuditClassification {
  unauthorized: string[];
  adminExempted: string[];
}

function buildVariantSet(phones: string[]): Set<string> {
  const variants = new Set<string>();
  for (const phone of phones) {
    getPhoneVariants(phone).forEach((variant) => variants.add(variant));
  }
  return variants;
}

export function classifyParticipants(
  participants: string[],
  validAccessPhones: string[],
  adminPhones: string[],
): AuditClassification {
  const validVariants = buildVariantSet(validAccessPhones);
  const adminVariants = buildVariantSet(adminPhones);
  const seen = new Set<string>();
  const unauthorized: string[] = [];
  const adminExempted: string[] = [];

  for (const participant of participants) {
    const normalized = normalizePhone(participant);
    const variants = getPhoneVariants(normalized);
    if (variants.some((variant) => seen.has(variant))) {
      continue;
    }
    variants.forEach((variant) => seen.add(variant));

    if (variants.some((variant) => adminVariants.has(variant))) {
      adminExempted.push(normalized);
    } else if (!variants.some((variant) => validVariants.has(variant))) {
      unauthorized.push(normalized);
    }
  }

  return { unauthorized, adminExempted };
}
