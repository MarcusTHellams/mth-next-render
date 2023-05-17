import { type User, prismaClient } from '@/prismaConnection';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { type: 'text', label: 'Username' },
        password: { type: 'password', label: 'Password' },
      },
      async authorize(credentials) {
        const user = await prismaClient.user.findUniqueOrThrow({
          where: { username: credentials?.username },
          include: {
            roles: {
              select: { role: { select: { name: true } } },
            },
          },
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
};
