import { timingSafeEqual } from 'node:crypto';

export function secretsMatch(provided: string | null | undefined, expected: string): boolean {
  if (!provided) {
    return false;
  }

  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}

export function hasValidBearerToken(request: Request, expected: string): boolean {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return false;
  }

  return secretsMatch(authorization.slice('Bearer '.length), expected);
}
