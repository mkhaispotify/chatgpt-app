import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions: NextAuthConfig = {
  callbacks: {
    async signIn({ profile }) {
      return profile?.login === "mkhai9x";
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  basePath: "/api/auth",
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
