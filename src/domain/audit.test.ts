import { describe, expect, it } from 'vitest';
import { classifyParticipants } from './audit';

describe('classifyParticipants', () => {
  it('separates valid, unauthorized and admin phones across Brazilian variants', () => {
    const result = classifyParticipants(
      ['5511999999999', '5521977777777', '5531988888888'],
      ['551199999999'],
      ['552177777777'],
    );

    expect(result.adminExempted).toEqual(['5521977777777']);
    expect(result.unauthorized).toEqual(['5531988888888']);
  });
});
