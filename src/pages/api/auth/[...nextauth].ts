import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@lib/db';
import * as passwords from '@lib/passwords';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jogndoe@gmail.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        if (credentials === undefined) return null;
        const { email, password } = credentials;
        const user = await db.user.findFirst({
          where: { email },
          select: { email: true, password: true }
        });
        if (user === null) return null;
        const isPasswordValid = await passwords.compare(password, user.password);
        if (!isPasswordValid) return null;
        return { email: user.email };
      }
    })
  ],
});
