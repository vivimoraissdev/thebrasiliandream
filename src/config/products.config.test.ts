import { describe, expect, it } from 'vitest';
import { addMonths, getProductConfig } from './products.config';

describe('product configuration', () => {
  it('does not grant group access to ebook-only purchases', () => {
    const ebook = getProductConfig('5dffc200-2b3e-456d-8ee2-4e676beb6fb5');
    expect(ebook).toMatchObject({ grantsGroupAccess: false, durationMonths: null });
  });

  it('maps all group products to their expected durations', () => {
    expect(getProductConfig('1934b475-7b9d-4e20-bf0c-2f6e5906c7fd')?.durationMonths).toBe(4);
    expect(getProductConfig('42fd1b1b-70ef-4405-993f-f29ec8362beb')?.durationMonths).toBe(1);
    expect(getProductConfig('b5642630-4c45-4657-853c-1f35da3d0349')?.durationMonths).toBe(4);
  });
});

describe('addMonths', () => {
  it('clamps month-end dates instead of rolling into another month', () => {
    const result = addMonths(new Date('2026-01-31T15:45:00.000Z'), 1);
    expect(result?.toISOString()).toBe('2026-02-28T15:45:00.000Z');
  });

  it('handles leap years', () => {
    const result = addMonths(new Date('2024-01-31T00:00:00.000Z'), 1);
    expect(result?.toISOString()).toBe('2024-02-29T00:00:00.000Z');
  });

  it('returns null for lifetime duration', () => {
    expect(addMonths(new Date('2026-01-01T00:00:00.000Z'), null)).toBeNull();
  });
});
