import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;