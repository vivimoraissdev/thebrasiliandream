export class InvalidPhoneError extends Error {
  constructor() {
    super('Invalid international phone number');
    this.name = 'InvalidPhoneError';
  }
}

export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 8 || digits.length > 15) {
    throw new InvalidPhoneError();
  }
  return digits;
}

export function getPhoneVariants(value: string): string[] {
  const normalized = normalizePhone(value);
  const variants = new Set([normalized]);

  if (normalized.startsWith('55') && normalized.length === 13 && normalized[4] === '9') {
    variants.add(normalized.slice(0, 4) + normalized.slice(5));
  }

  return [...variants];
}

export function phonesAreEquivalent(left: string, right: string): boolean {
  const rightVariants = new Set(getPhoneVariants(right));
  return getPhoneVariants(left).some((variant) => rightVariants.has(variant));
}

export function getPhoneComparisonKey(value: string): string {
  return getPhoneVariants(value).sort((left, right) => left.length - right.length)[0];
}

export function deduplicatePhones(values: string[]): string[] {
  const seenVariants = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const normalized = normalizePhone(value);
    const variants = getPhoneVariants(normalized);
    if (variants.some((variant) => seenVariants.has(variant))) {
      continue;
    }

    result.push(normalized);
    variants.forEach((variant) => seenVariants.add(variant));
  }

  return result;
}
