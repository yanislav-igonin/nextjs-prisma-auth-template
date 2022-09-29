import { authMiddleware } from '@middlewares';
import { t } from '@trpc-server';

export const usersRouter = t.router({
  getAll: t.procedure.use(authMiddleware).query(async ({ ctx: { db } }) => {
    const users = await db.user.findMany({
      select: { email: true, id: true },
    });
    return users;
  }),
});
