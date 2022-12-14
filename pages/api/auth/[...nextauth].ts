import { CustomAxiosError } from '@client/interfaces/axios.types';
import { apiClient } from '@server/api-client';
import { API_AUTH_LOGIN } from '@server/server.constants';
import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface UserResponse {
  access_token: string;
}

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as unknown as UserResponse).access_token;
      }

      return token;
    },
    async session({ session, token }) {
      session = {
        ...session,
        accessToken: token.accessToken,
      } as Session;

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
        token: {
          type: 'token',
        },
      },
      authorize: async (credentials) => {
        try {
          const { email, password, token } = credentials || {};

          const { data } = await apiClient.post(API_AUTH_LOGIN, {
            email,
            password,
            token,
          });

          return data;
        } catch (err) {
          console.error(
            '[authorize error]:',
            (err as CustomAxiosError).message
          );
          throw new Error('Unauthorized');
        }
      },
    }),
  ],
});
