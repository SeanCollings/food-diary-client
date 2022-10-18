import { IUserModel } from '@store/user-context';
import { userMock } from 'client/mock';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.user = {
        ...session.user,
        ...(token.user as IUserModel),
      };

      return session;
    },
  },
  secret: process.env.CREDENTIALS_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          type: 'email',
        },
        password: {
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        const { data, error } = await Promise.resolve({
          data: userMock,
          error: undefined,
        } as { data: IUserModel; error?: { message: string } });

        if (error) {
          throw new Error(error.message || 'Could not log in');
        }

        return data;
      },
    }),
  ],
});
