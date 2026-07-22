import { describe, expect, it } from 'vitest';
import {
  deduplicatePhones,
  getPhoneComparisonKey,
  getPhoneVariants,
  normalizePhone,
  phonesAreEquivalent,
} from './phone';

describe('phone normalization', () => {
  it('strips formatting from international numbers', () => {
    expect(normalizePhone('+55 (11) 99999-9999')).toBe('5511999999999');
  });

  it('creates the Brazilian ninth-digit fallback', () => {
    expect(getPhoneVariants('5511999999999')).toEqual(['5511999999999', '551199999999']);
  });

  it('treats Brazilian variants as equivalent', () => {
    expect(phonesAreEquivalent('5511999999999', '551199999999')).toBe(true);
    expect(getPhoneComparisonKey('5511999999999')).toBe('551199999999');
  });

  it('deduplicates equivalent formatted phones', () => {
    expect(deduplicatePhones(['+55 11 99999-9999', '55 11 9999-9999'])).toEqual(['5511999999999']);
  });
});
