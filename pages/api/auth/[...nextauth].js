import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session }) {
            const admins = process.env.ADMINS.split(',');
            if (!admins.some(x => x === session.user?.email)) {
                return session;
            }
            return session;
        },
        // authorized({ req, token }) {
        //     if (token) return true;
        // }
        // async signIn({ user, account, email, credentials, profile }) {
        //     const admins = process.env.ADMINS.split(',');
        //     if (!admins.some(x => x === session.user?.email)) return false
        //     return true
        // }
    },
    session: {
        strategy: "jwt"
    }
    // pages: {
    //     signIn: "/auth/login",
    //     signOut: "/auth/logout"
    // }
});
