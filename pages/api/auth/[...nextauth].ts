import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,  // Your Google Client ID
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,  // Your Google Client Secret
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.id = profile.sub;
                token.email = profile.email;
                token.name = profile.name;
                token.picture = (profile as { picture: string }).picture;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id as string,
                email: token.email as string,
                name: token.name as string,
                picture: token.picture as string,
            };
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 3600
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true
} as NextAuthOptions);