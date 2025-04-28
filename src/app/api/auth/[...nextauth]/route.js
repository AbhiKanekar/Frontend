import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            async authorize(credentials) {
                const user = { id: "1" };
                return user;
            }
        })
    ],
    sessions: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/SignIn",
    },
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };