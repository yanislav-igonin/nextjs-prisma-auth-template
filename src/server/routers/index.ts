import { t } from '../trpc';
import { exampleRouter } from './example.router';
import { healthRouter } from './health.router';

// Main router.
export const appRouter = t.router({
  health: healthRouter,
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;

