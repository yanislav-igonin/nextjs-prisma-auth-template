import { t } from '../trpc';

export const healthRouter = t.router({
  check: t.procedure.query(() => ({ ok: true })),
});
