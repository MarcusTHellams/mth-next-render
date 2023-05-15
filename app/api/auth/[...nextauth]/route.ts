import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [

  ]
});

export { handler as GET, handler as POST };
