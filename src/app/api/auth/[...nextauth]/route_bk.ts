import axios from 'axios';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            },
        }),
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }
          },
          
          async authorize(credentials, req) {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/auth/login', credentials, {
              headers: { "Content-Type": "application/json" }
            })
            const user = res.data;
            if (user) {
              return user
            }
            return null
          }
        }),
    ],
    callbacks: {
      async signIn({user, account, profile, credentials}: any) {
        const providerAccount = {
          'username': user.id,
          'password': account.provider,
        }
        const responselogin = await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/auth/loginpublic', providerAccount);
        const jwt_accessToken = responselogin.data.accessToken;
        const jwt_refreshToken = responselogin.data.refreshToken;
        const headers = { Authorization: `Bearer ${jwt_accessToken}` };
        const response = await axios.get(process.env.NEXT_PUBLIC_API_KEY + '/rmslogin_public/info/' + user.id, { headers });
        if (response.data.providerID == null) {
          const dataPublic = {
            'providerID': user.id,
            'email': user.email,
            'provider': 'google',
          }
          await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/rmslogin_public', dataPublic, { headers });
        }
        user.customJwt = jwt_accessToken
        user.customRefreshJwt = jwt_refreshToken
        return user;
      },
      async jwt({ token, user, account, profile, isNewUser }: any) {
        if (user) {
          token.id = user.id;
          token.profile = profile;
          token.customJwt = user.customJwt
          token.customRefreshJwt = user.customRefreshJwt
  
          const currentTime = Date.now();
          const tokenExpired = user.customJwt < currentTime;
          const tokenExpiredSoon = user.customJwt - currentTime < 60 * 5;
          const headers = { Authorization: `Bearer ${token.customJwt}` };
          if (tokenExpired || tokenExpiredSoon) {
            const refreshTokenJwt = await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/auth/refresh', { headers });
            token.customJwt = refreshTokenJwt.data.accessToken;
            token.customRefreshJwt = refreshTokenJwt.data.refreshToken;
          }
        }
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      },
      async session({ session, token, user }: any) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
        session.customJwt = token.customJwt;
        session.customRefreshJwt = token.customRefreshJwt;
        return session;
      },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }