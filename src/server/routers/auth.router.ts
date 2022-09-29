import { z } from 'zod';
import { compare } from '@lib/passwords';
import { t } from '../trpc';
import { InvalidEmailOrPasswordError, UnauthorizedError } from '@lib/errors';
import type { Session } from '@prisma/client';

const ONE_MINUTE_MS = 60 * 1000;
const ONE_HOUR_MS = 60 * ONE_MINUTE_MS;
const ONE_DAY_MS = 24 * ONE_HOUR_MS;
const ONE_DAY_S = ONE_DAY_MS / 1000;

const getSessionCookieString = ({ id }: Session) =>
  `sid=${id}; Path=/; HttpOnly; Max-Age=${ONE_DAY_S}`;

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
      throw new InvalidEmailOrPasswordError();
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new InvalidEmailOrPasswordError();
    }
    const session = await db.session.create({
      data: {
        userId: user.id,
        expires: new Date(Date.now() + ONE_DAY_MS),
      },
    });
    res.setHeader('Set-Cookie', getSessionCookieString(session));
    return { email: user.email };
  }),
  logout: t.procedure.query(async ({ ctx: { req, res, db } }) => {
    const sessionId = req.cookies.sid;
    if (sessionId === undefined) {
      throw new UnauthorizedError();
    }
    const session = await db.session.findFirst({ where: { id: sessionId } });
    if (session === null) {
      throw new UnauthorizedError();
    }
    if (session.expires < new Date()) {
      throw new UnauthorizedError();
    }
    await db.session.update({ where: { id: sessionId }, data: { expires: new Date() } });
    res.setHeader('Set-Cookie', 'sid=; Path=/; HttpOnly; Max-Age=0');
  }),
  me: t.procedure.query(async ({ ctx: { db, req, res } }) => {
    const sessionId = req.cookies.sid as string || '';
    const session = await db.session.findFirst({
      where: { id: sessionId },
      select: { userId: true, expires: true },
    });
    if (session === null) {
      throw new UnauthorizedError();
    }
    if (session.expires < new Date()) {
      throw new UnauthorizedError();
    }
    const user = await db.user.findFirst({
      where: { id: session.userId },
      select: { email: true },
    });
    if (user === null) {
      throw new UnauthorizedError();
    }
    return { email: user.email };
  }),
});
