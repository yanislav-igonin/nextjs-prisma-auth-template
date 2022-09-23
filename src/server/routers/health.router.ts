import { t } from '../trpc';

export const healthRouter = t.router({
  health: t.procedure.query(() => ({ ok: true })),
});
