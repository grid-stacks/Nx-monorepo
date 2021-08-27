import NextAuth, { User } from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { Awaitable } from 'next-auth/internals/utils';
import * as jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.GitHub({
      clientId: '1046561fd9ec9ee5f526',
      clientSecret: '30ee59d0f12651dc970d431475635a7cbc7c07de',
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        } as Awaitable<User>;
      },
    }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<User> {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();

        console.log(user);

        // If no error and we have user data, return it
        if (res.ok && user) {
          return {
            id: user.user.id.toString(),
            name: user.user.name,
            email: user.user.email,
            country: 'bangladesh',
            token: user.token,
          };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    jwt: true,
  },
  secret: '2yVd#@{N@Y>R0sb&ptzv)*")iyX<~UV+bpf^F:;I}eu64>h&Ar@>kos4W0efS:K',
  jwt: {
    encode: async ({ secret, token, maxAge }) => {
      console.log('----------------');
      console.log({ secret });
      console.log({ token });
      console.log({ maxAge });
      const jwtClaims = {
        sub: token.id,
        name: token.name,
        email: token.email,
        picture: token.picture,
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + 60,
        claims: {
          'x-hasura-allowed-roles': ['user'],
          'x-hasura-default-role': 'user',
          'x-hasura-role': 'user',
          'x-hasura-user-id': token.id,
        },
      };
      delete token.accessToken;
      console.log({ token });
      const encodedToken = jwt.sign(token, secret, { algorithm: 'HS256' });
      console.log({ encodedToken });
      console.log('----------------');
      return encodedToken;
    },
    decode: async ({ secret, token, maxAge }) => {
      console.log('==================');
      console.log({ secret });
      console.log({ token });
      console.log({ maxAge });
      const decodedToken = jwt.verify(token, secret, { algorithms: ['HS256'] });
      console.log({ decodedToken });
      console.log('==================');
      return decodedToken as JWT;
    },
  },
  callbacks: {
    // async signIn(user, account, profile) {
    //   console.log({ user });
    //   console.log({ account });
    //   console.log({ profile });
    //   return true;
    // },

    async jwt(token, user, account, profile, isNewUser) {
      console.log('JWT==================');
      console.log({ token });
      console.log({ user });
      console.log({ account });
      console.log({ profile });
      console.log({ isNewUser });
      // Add access_token to the token right after signin
      if (profile?.token) {
        token.accessToken = profile?.token;
      }
      token.country = token.country || user?.country;
      console.log({ token });
      console.log('JWT==================');
      return Promise.resolve(token);
    },

    async session(session, token) {
      console.log('SESSION==================');
      console.log({ session });
      console.log({ token });
      // Add property to session, like an access_token from a provider.
      // session.accessToken = token.accessToken;
      // return session;

      const encodedToken = jwt.sign(
        token,
        '2yVd#@{N@Y>R0sb&ptzv)*")iyX<~UV+bpf^F:;I}eu64>h&Ar@>kos4W0efS:K',
        {
          algorithm: 'HS256',
        }
      );
      session.id = token.sub;
      session.token = encodedToken;
      console.log({ encodedToken });
      console.log({ session });
      console.log('SESSION==================');
      return Promise.resolve(session);
    },
  },
  debug: true,
});

declare module 'next-auth/index' {
  interface User {
    id: string;
    country: string;
  }
}

// 1. authorize => L057 => eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmQ0NDZiMzZiOWJmYmQ3Y2Y1NzQ5YmZmZDIzNmRlMzFlNWI5ZmZlNjE3YzE0NmE3MmNmYWEwMjM4MGM0YWVlYzM2OGI1ZmRiNTAxNzI2ODgiLCJpYXQiOjE2Mjk3NTEzMDIuODMwNzc4LCJuYmYiOjE2Mjk3NTEzMDIuODMwNzgxLCJleHAiOjE2NjEyODczMDIuODI4NDYzLCJzdWIiOiIxIiwic2NvcGVzIjpbXSwidHlwZSI6InVzZXIifQ.iLgEHnZroaohajjgp1rTE-8ExCC8f6TGxKoyrBXLTNFE38p_70OziAR8PQ5NUdeJt3MoSCeprSchIytLVdtNSh1IyHidmmrBhCDMU-QHRVPKxo9_qUsnkCI2Dt_rDF6cgFG_XAj9BB1Wt7KtLG34ARHGhVafcZCws_PTv9DZ-XkX0N_24bOk9VdVfb6qGVbCnw90NkO4fKeAkd-NqAIjqVjzcoWBB-sWqbfrZhhumiJVYjFEdev1NSc9XnOjyuHsRARhcY0OXmgprWdkQBmCyj4YizWR6QKx7pGp1jdMimY-2gtp0-_2h4ZoSD1hAiKpb8MQAl9zRZK0reI9gMArW0gVMyboRZOQaugUV1eL9ojLAY-vCQXKYwIoNUM0bkJvVqKVEwDM2BsDfxptOB9Pvc8Bw8aXalo4o-eso-2bLRE2rz8-hjdpGea64-4nn5k5ZokAujMF1-6GhK2ouFf_2XnDUEC-mryF-2P-mQ5zJDD6lI8PG2xmT42Cup9ypWe-RLKdYVpDn2FV-3exAL_Hyy3h2hCM8lWmZzttHi7vFYeXFziTY9ShgmO8UVNtby8tpJWATYfqhpwMMsfVO31F_j8Tch8fcfWdkASDy_eOoiizhl9G-EFaNTp8xC7D7iA_63V5k-PjZRWNA5decBTcZcTAt8EZV64uiYGRgkxxAII
// 2. jwt       => L137 => eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmQ0NDZiMzZiOWJmYmQ3Y2Y1NzQ5YmZmZDIzNmRlMzFlNWI5ZmZlNjE3YzE0NmE3MmNmYWEwMjM4MGM0YWVlYzM2OGI1ZmRiNTAxNzI2ODgiLCJpYXQiOjE2Mjk3NTEzMDIuODMwNzc4LCJuYmYiOjE2Mjk3NTEzMDIuODMwNzgxLCJleHAiOjE2NjEyODczMDIuODI4NDYzLCJzdWIiOiIxIiwic2NvcGVzIjpbXSwidHlwZSI6InVzZXIifQ.iLgEHnZroaohajjgp1rTE-8ExCC8f6TGxKoyrBXLTNFE38p_70OziAR8PQ5NUdeJt3MoSCeprSchIytLVdtNSh1IyHidmmrBhCDMU-QHRVPKxo9_qUsnkCI2Dt_rDF6cgFG_XAj9BB1Wt7KtLG34ARHGhVafcZCws_PTv9DZ-XkX0N_24bOk9VdVfb6qGVbCnw90NkO4fKeAkd-NqAIjqVjzcoWBB-sWqbfrZhhumiJVYjFEdev1NSc9XnOjyuHsRARhcY0OXmgprWdkQBmCyj4YizWR6QKx7pGp1jdMimY-2gtp0-_2h4ZoSD1hAiKpb8MQAl9zRZK0reI9gMArW0gVMyboRZOQaugUV1eL9ojLAY-vCQXKYwIoNUM0bkJvVqKVEwDM2BsDfxptOB9Pvc8Bw8aXalo4o-eso-2bLRE2rz8-hjdpGea64-4nn5k5ZokAujMF1-6GhK2ouFf_2XnDUEC-mryF-2P-mQ5zJDD6lI8PG2xmT42Cup9ypWe-RLKdYVpDn2FV-3exAL_Hyy3h2hCM8lWmZzttHi7vFYeXFziTY9ShgmO8UVNtby8tpJWATYfqhpwMMsfVO31F_j8Tch8fcfWdkASDy_eOoiizhl9G-EFaNTp8xC7D7iA_63V5k-PjZRWNA5decBTcZcTAt8EZV64uiYGRgkxxAII
// 3. encode    => L102 => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGlsd2FyIEhvc3NhaW4gTm9vciIsImVtYWlsIjoicGhwLmNoYW5kYW5AZ21haWwuY29tIiwic3ViIjoiMSIsImNvdW50cnkiOiJiYW5nbGFkZXNoIiwiaWF0IjoxNjI5NzUxMzAyfQ.fjxn933zNqfNA1jJyCAK9GF8wNfDrfFEiXFfWBQmbIs
// 4. authorize => L057 => undefined
// 5. decode    => L109 => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGlsd2FyIEhvc3NhaW4gTm9vciIsImVtYWlsIjoicGhwLmNoYW5kYW5AZ21haWwuY29tIiwic3ViIjoiMSIsImNvdW50cnkiOiJiYW5nbGFkZXNoIiwiaWF0IjoxNjI5NzUxMzAyfQ.fjxn933zNqfNA1jJyCAK9GF8wNfDrfFEiXFfWBQmbIs
// 6. session   => L159 => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGlsd2FyIEhvc3NhaW4gTm9vciIsImVtYWlsIjoicGhwLmNoYW5kYW5AZ21haWwuY29tIiwic3ViIjoiMSIsImNvdW50cnkiOiJiYW5nbGFkZXNoIiwiaWF0IjoxNjI5NzUxMzAyfQ.fjxn933zNqfNA1jJyCAK9GF8wNfDrfFEiXFfWBQmbIs
// 7. session   => L160 => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGlsd2FyIEhvc3NhaW4gTm9vciIsImVtYWlsIjoicGhwLmNoYW5kYW5AZ21haWwuY29tIiwic3ViIjoiMSIsImNvdW50cnkiOiJiYW5nbGFkZXNoIiwiaWF0IjoxNjI5NzUxMzAyfQ.fjxn933zNqfNA1jJyCAK9GF8wNfDrfFEiXFfWBQmbIs
// 8. encode    => L102 => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGlsd2FyIEhvc3NhaW4gTm9vciIsImVtYWlsIjoicGhwLmNoYW5kYW5AZ21haWwuY29tIiwic3ViIjoiMSIsImNvdW50cnkiOiJiYW5nbGFkZXNoIiwiaWF0IjoxNjI5NzUxMzAyfQ.fjxn933zNqfNA1jJyCAK9GF8wNfDrfFEiXFfWBQmbIs
// 9.

// Session
// ac083da3d1b7e25ffb521ba9c22ea2f6893e569578483deff42bf78a91e51322
// 99ce8e430ed099292a8978b7429212ea0d0a32db91ddda53f679e80c64ee154b

// Access
// c383ad193eed1a7e86f682c13bdab4ddef6aad0ef91c4fb2c63520081ff93f25
// 03ab81e79d3f70be8345bad0466fa6d74f8e8f76eda6c7f63d4b1c485fa1d531
