import axios from '@/lib/axios';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return (
          axios
            .post(`/auth/login`, {
              email: credentials?.email,
              password: credentials?.password,
            })
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              throw new Error(error.response.data.message);
            }) || null
        );
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: (1 / 2) * 24 * 60 * 60, // 12 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
