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
        // const res = await fetch('http://localhost:3000/api/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     email: credentials?.email,
        //     password: credentials?.password,
        //   }),
        // });

        // const user = await res.json();
        // console.log(user);
        // if (user) {
        //   return user;
        // } else {
        //   console.log('error');
        //   return null;
        // }
        return (
          axios
            .post(`/login`, {
              email: credentials?.email,
              password: credentials?.password,
            })
            .then((response) => {
              // console.log(response.data.status);
              return response.data;
            })
            .catch((error) => {
              console.log(error.response.status);
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
