import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { db } from '@db/client';

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions,
) => {
  const req = opts?.req;
  const res = opts?.res;

  const sessionId = req?.cookies?.sid;

  const session =
    req && res && (await db.session.findFirst({ where: { id: sessionId } }));

  return {
    req,
    res,
    session,
    db,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
