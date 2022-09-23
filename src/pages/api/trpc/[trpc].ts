import { initTRPC } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import superjson from 'superjson';

export const t = initTRPC.create({ transformer: superjson });

export const appRouter = t.router({
  hello: t.procedure.input(z.object({ text: z.string() }))
    .query(({ input }) => ({
      greeting: `hello ${input?.text ?? 'world'}`,
      time: new Date(),
    })),
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
