import NextAuth, { User } from 'next-auth';
import Providers from 'next-auth/providers';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const AuthProvider = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      Providers.Credentials({
        name: 'Credentials',

        credentials: {
          email: {
            label: 'Email',
            type: 'text',
            placeholder: 'jsmith@example.com',
          },
          password: {
            label: 'Password',
            type: 'password',
            placeholder: '***************',
          },
        },

        async authorize(credentials, request): Promise<User> {
          const result = await fetch(process.env.API_URL + 'auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          });
          const user = await result.json();

          res.setHeader(
            'Set-Cookie',
            serialize('next-auth.access-token', user.token, {
              httpOnly: true,
              sameSite: 'lax',
              path: '/',
              secure: true,
            })
          );

          if (result.ok && user) {
            return {
              id: user.user.id.toString(),
              name: user.user.name,
              email: user.user.email,
              user_role: user.user.user_role,
              verified: user.user.verified,
              token: user.token,
            };
          }

          return null;
        },
      }),
    ],

    secret: '2yVd#@{N@Y>R0sb&ptzv)*")iyX<~UV+bpf^F:;I}eu64>h&Ar@>kos4W0efS:K',

    // session: {
    //   jwt: true,
    // },

    callbacks: {
      async jwt(token, user, account, profile, isNewUser) {
        if (account?.type === 'credentials' && account?.id === 'credentials') {
          token.id = token?.id || user?.id;
          token.user_role = token?.user_role || user?.user_role;
          token.verified = token?.verified || user?.verified;
          token.token = token?.token || user?.token;
        }

        return token;
      },

      async session(session, token) {
        session.user.id = token.id as string;
        session.user.user_role = token.user_role as string;
        session.user.verified = token.verified as string;
        session.user.token = token.token as string;

        return session;
      },
    },
    debug: true,
  });

export default AuthProvider;

declare module 'next-auth/index' {
  interface User {
    id: string;
    user_role: string;
    verified: string;
  }
}

declare module 'next-auth/index' {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string | null;
      user_role?: string | null;
      verified?: string | null;
      token?: string | null;
    };
  }
}
