import { TRPCError } from '@trpc/server';
import { compare } from '@lib/passwords';
import { z } from 'zod';
import { createRouter } from './context';

export const authRouter = createRouter()
  .mutation('login', {
    input: z.object({ email: z.string().email(), password: z.string() }),
    async resolve({ input, ctx: { db, res } }) {
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
      res?.setHeader('Set-Cookie', `sid=${session.id}; Path=/; HttpOnly`);
      return { email: user.email };
    },
  })
  // .mutation('logout', {
  //   resolve({ ctx }) {
  //     // ...
  //   },
  // })
  // .mutation('register', {
  //   input: z.object({ email: z.string(), password: z.string() }),
  //   resolve({ input }) {
  //     // ...
  //   },
  // })
  // .query('me', {
  //   resolve({ ctx }) {
  //     // ...
  //   },
  // });
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .query('getSecretMessage', {
    async resolve({ ctx }) {
      return 'You are logged in and can see this secret message!';
    },
  });
