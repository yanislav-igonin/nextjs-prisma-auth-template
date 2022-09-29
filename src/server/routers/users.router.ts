import { UnauthorizedError } from '@lib/errors';
import { authMiddleware } from '@middlewares';
import { t } from '@trpc-server';

export const usersRouter = t.router({
  me: t.procedure.use(authMiddleware).query(async ({
    ctx: { db, session },
  }) => {
    const user = await db.user.findFirst({
      where: { id: session.userId },
      select: { email: true },
    });
    if (!user) {
      throw new UnauthorizedError();
    }
    return { email: user.email };
  }),
  getAll: t.procedure.use(authMiddleware).query(async ({ ctx: { db } }) => {
    const users = await db.user.findMany({
      select: { email: true, id: true },
    });
    return users;
  }),
});
