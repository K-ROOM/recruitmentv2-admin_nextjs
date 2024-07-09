import axios from 'axios';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
            role: { label: "Role", type: "text" },
          },
          
          async authorize(credentials: any, req: any) {
            if (credentials) {
              return Promise.resolve(credentials);
            } else {
              return Promise.resolve(null);
            }
          }
        }),
    ],
    callbacks: {
      async signIn({user, account, profile, credentials}: any) {
        const res = await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/auth/loginadmin', credentials, {
          headers: { "Content-Type": "application/json" }
        })
        const userlogin = res.data;
        user.accessToken = userlogin.accessToken;
        user.refreshToken = userlogin.refreshToken;
        user.username = userlogin.username;
        user.firstname = userlogin.firstname;
        user.lastname = userlogin.lastname;
        user.role = userlogin.role;
        return user;
      },
      async jwt({ token, user, account, profile, isNewUser }: any) {
        if (user) {
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.username = user.username;
          token.firstname = user.firstname;
          token.lastname = user.lastname;
          token.role = user.role;
          // token.customJwt = user.accessToken
          // token.customRefreshJwt = user.refreshToken
  
          // const currentTime = Date.now();
          // const tokenExpired = user.accessToken < currentTime;
          // const tokenExpiredSoon = user.refreshToken - currentTime < 60 * 5;
          // const headers = { Authorization: `Bearer ${token.customJwt}` };
          // if (tokenExpired || tokenExpiredSoon) {
          //   const refreshTokenJwt = await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/auth/refresh', { headers });
          //   token.customJwt = refreshTokenJwt.data.accessToken;
          //   token.customRefreshJwt = refreshTokenJwt.data.refreshToken;
          // }
        }
        return token;
      },
      async session({ session, token, user }: any) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.username = token.username;
        session.firstname = token.firstname;
        session.lastname = token.lastname;
        session.role = token.role;
        return session;
      },
    },
}