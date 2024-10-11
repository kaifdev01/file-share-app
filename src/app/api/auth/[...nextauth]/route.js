import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: "1002222804164-qi1ovlku75c877609ah4n4tle8kij3lb.apps.googleusercontent.com",
            clientSecret: "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",
        }),
        GithubProvider({
            clientId: "Ov23lioW447FuXEGLjoB",
            clientSecret: "3cdd87794125f6a5f6b0086c2565d87a5c8de683",
        })
    ]
})

export { handler as GET, handler as POST }