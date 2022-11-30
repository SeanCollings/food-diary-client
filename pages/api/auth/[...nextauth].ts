import axios, { AxiosError } from 'axios';
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
      },
      authorize: async (credentials) => {
        try {
          const { data } = await axios.post(
            `${process.env.SERVER_HOST}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          return data;
        } catch (err) {
          console.error('[authorize error]:', (err as AxiosError).message);
          throw new Error('Unauthorized');
        }
      },
    }),
  ],
});
