import { AuthOptions, DefaultSession } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';
import { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { prisma } from './prisma';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: { id: string } & DefaultSession['user'];
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    })
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id
      }
    })
  }
};

export async function getAuthSession() {
  const session = await getServerSession(authOptions);

  return session;
}
