import bcrypt from 'bcryptjs';
import { type User, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import connect from './db';
import adminModel from './modals/admin.modal';
import { decrypt, secretKey } from './enc_dec';

// ✅ Use NextAuthOptions type
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('email or password is missing');
        }

        await connect();
        try {
          const admins = await adminModel.find();
          const user = admins.find((ad) => decrypt(ad.email, secretKey) === credentials.email);
          if (!user) {
            throw new Error('No admin found with this email');
          }

          const compare = await bcrypt.compare(credentials.password, user.password);
          if (!compare) {
            throw new Error('Password is not matching');
          }

          return {
            id: user._id?.toString(),
            email: user.email,
          } as User;
        } catch (error: any) {
          console.error(error);
          throw new Error('Authorization failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: '/auth/jwt/sign-in',
    error: '/auth/jwt/sign-in/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
};
