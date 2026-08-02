import type { NextAuthConfig } from "next-auth";
import type { RoleType } from "@/constants/roles";

// Kept deliberately free of Prisma/ioredis/bcrypt imports so it can run on the
// Edge Runtime inside middleware.ts. The full provider list (which does need
// those Node-only libs) lives in auth.ts and is only used in Route Handlers /
// Server Components / Server Actions, which run on the Node runtime.
export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
  },
  providers: [], // populated in auth.ts
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role: RoleType }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as RoleType;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
