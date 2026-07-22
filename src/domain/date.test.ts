import { describe, expect, it } from 'vitest';
import { startOfUtcDay, utcDayWindow } from './date';

describe('UTC date windows', () => {
  it('returns a date-based seven-day window', () => {
    const window = utcDayWindow(7, new Date('2026-07-22T23:59:59.000Z'));
    expect(window.start.toISOString()).toBe('2026-07-29T00:00:00.000Z');
    expect(window.end.toISOString()).toBe('2026-07-30T00:00:00.000Z');
  });

  it('normalizes a timestamp to the beginning of its UTC day', () => {
    expect(startOfUtcDay(new Date('2026-07-22T12:34:56.000Z')).toISOString())
      .toBe('2026-07-22T00:00:00.000Z');
  });
});
