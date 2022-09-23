import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'src/server/db/client';
import { compare } from '@lib/passwords';

export default async function login (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body as { email: string; password: string };
  if (req.body === undefined) return null;
  const user = await db.user.findFirst({
    where: { email },
    select: { email: true, password: true, id: true },
  });
  if (user === null) return null;
  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) return null;
  const session = await db.session.create({
    data: {
      userId: user.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });
  return { email: user.email };
};
