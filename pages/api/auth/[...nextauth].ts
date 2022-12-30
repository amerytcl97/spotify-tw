import NextAuth, { NextAuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { generateRandomString } from "../../../utils/functions";
import { CLIENT_ID, CLIENT_SECRET, refreshAccessToken, SCOPE } from "../../../utils/login";


export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers  
    providers: [
        SpotifyProvider({
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            authorization: {
                params: {
                    response_type: "code",
                    // client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
                    scope: SCOPE,
                    // redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL!,
                    state: generateRandomString(16),
                }
            },
        }),
        // ...add more providers here  
    ],
    secret: process.env.NEXTAUTH_SECRET!,
    // session: {
    //     strategy: "jwt",
    // },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // console.log("Check JWT TOKEN", token);
            if (account) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    accessTokenExpires: (account.expires_at as number ?? 0) * 1000,
                    refreshToken: account.refresh_token,
                    user,
                }
            }
            console.log(token.accessToken);
            if (Date.now() < token.accessTokenExpires!) {
                return token;
            }
            console.log('token has expired');
            return await refreshAccessToken(token);
            // return await checkAccessToken(token);

        },
        async session({ session, token }) {
            session.accessTokenExpires = token.accessTokenExpires as number;
            session.accessToken = token.accessToken as string;
            // console.log('Checking session token', session);

            return session;
        }
    }
}
export default NextAuth(authOptions);