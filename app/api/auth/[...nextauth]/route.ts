import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { User, prismaClient } from '@/prismaConnection';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { type: 'text', label: 'Username' },
        password: { type: 'password', label: 'Password' },
      },
      async authorize(credentials, req) {
        const user = await prismaClient.user.findUniqueOrThrow({
          where: { username: credentials?.username },
        });

        let isValidPassword: boolean = false;

        if (credentials?.password) {
          isValidPassword = await bcrypt.compare(
            credentials?.password,
            user.password
          );
        }

        if (!isValidPassword) {
          throw new Error('Invalid Credentials');
        }

        // @ts-ignore
        delete user.password;

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
