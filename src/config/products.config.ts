export type DurationMonths = number | null;

export interface ProductConfig {
  name: string;
  durationMonths: DurationMonths;
  grantsGroupAccess: boolean;
}

export const PRODUCT_CONFIG = {
  '1934b475-7b9d-4e20-bf0c-2f6e5906c7fd': {
    name: 'Comunidade Imersão',
    durationMonths: 4,
    grantsGroupAccess: true,
  },
  '42fd1b1b-70ef-4405-993f-f29ec8362beb': {
    name: 'Combo Completo',
    durationMonths: 1,
    grantsGroupAccess: true,
  },
  '5dffc200-2b3e-456d-8ee2-4e676beb6fb5': {
    name: 'Ebook',
    durationMonths: null,
    grantsGroupAccess: false,
  },
  'b5642630-4c45-4657-853c-1f35da3d0349': {
    name: 'Extensão de Comunidade',
    durationMonths: 4,
    grantsGroupAccess: true,
  },
} as const satisfies Record<string, ProductConfig>;

export function getProductConfig(productId: string): ProductConfig | undefined {
  return PRODUCT_CONFIG[productId as keyof typeof PRODUCT_CONFIG];
}

export function addMonths(date: Date, months: DurationMonths): Date | null {
  if (months === null) {
    return null;
  }

  if (!Number.isInteger(months) || months < 0) {
    throw new RangeError('months must be a non-negative integer or null');
  }

  const result = new Date(date.getTime());
  const originalDay = result.getUTCDate();

  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);

  const lastDayOfTargetMonth = new Date(Date.UTC(
    result.getUTCFullYear(),
    result.getUTCMonth() + 1,
    0,
  )).getUTCDate();

  result.setUTCDate(Math.min(originalDay, lastDayOfTargetMonth));
  return result;
}
