import { z } from 'zod';
import { compare } from '@lib/passwords';
import { t } from '../trpc';

const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

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
        expires: new Date(Date.now() + ONE_DAY),
      },
    });
    const ONE_DAY_IN_S = ONE_DAY / 1000;
    res.setHeader('Set-Cookie', `sid=${session.id}; Path=/; HttpOnly; Max-Age=${ONE_DAY_IN_S}`);
    return { email: user.email };
  }),
});
