import { UnauthorizedError } from '@lib/errors';
import { t } from '../trpc';

export const authMiddleware = t.middleware(async ({ ctx: { session }, next }) => {
  if (session === null || session.expires < new Date()) {
    throw new UnauthorizedError();
  }
  return next();
});
