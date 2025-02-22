import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/types/User";
import { getUser } from "@/services/AuthService";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 40000,
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${account?.id_token}`,
            },
          },
        );
        const resParsed = await res.json();
        token = Object.assign({}, token, {
          id_token: account.id_token,
        });
        token = Object.assign({}, token, {
          myToken: resParsed.authToken,
        });
      }

      return token;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl + '/new-user'
    // },
    async session({ session }: { session: any }) {
      const user: User = await getUser({ email: session.user.email ?? "" });

      session.user = {
        ...session.user,
        id: user.uuid,
      };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
