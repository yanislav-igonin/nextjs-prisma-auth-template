import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

export const t =  initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  hello: t.procedure.input(
    z.object({
      text: z.string(),
    })
  ).query(({ input }) => {
      return {
        greeting: `hello ${input.text ?? 'world'}`,
        time: new Date().toISOString(),
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
