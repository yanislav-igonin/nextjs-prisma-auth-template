import { t } from 'server/trpc';

export const usersRouter = t.router({
  getAll: t.procedure.query(async ({ ctx: { db } }) => {
    const users = await db.user.findMany({
      select: { email: true, id: true },
    });
    return users;
  }),
});
