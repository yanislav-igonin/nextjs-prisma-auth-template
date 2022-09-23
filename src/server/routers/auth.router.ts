import { z } from 'zod';
import { compare } from '@lib/passwords';
import { t } from '../trpc';

export const authRouter = t.router({
  login: t.procedure.input(z.object({
    email: z.string().email(),
    password: z.string(),
  })).mutation(async ({ input, ctx: { res, db } }) => {
    const { email, password } = input;
    const user = await db.user.findFirst({
      where: { email },
      select: { email: true, password: true, id: true },
    });
    if (user === null) {
      return null;
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    const session = await db.session.create({
      data: {
        userId: user.id,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
    res.setHeader('Set-Cookie', `sessionId=${session.id}; Path=/; HttpOnly`);
    return { email: user.email };
  }),
});
