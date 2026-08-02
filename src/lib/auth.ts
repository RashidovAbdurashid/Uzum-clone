import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { mockDb } from "./mock-db";
import { verifyOtp } from "./sms";
import { authConfig } from "./auth.config";

// Full config: Node-only bits (bcrypt, OTP verification) live here.
// Only import this file from Route Handlers, Server Components, or Server
// Actions - never from middleware.ts (use auth.config.ts there instead).
//
// NOTE: no database adapter is configured. Session strategy is "jwt", so
// Auth.js doesn't need one to persist sessions - and since we're on the
// in-memory mock-db for now (see src/lib/mock-db.ts) there's nothing for an
// adapter to write to anyway. When you add a real database, reintroduce
// PrismaAdapter (or your ORM's adapter) here.
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    // Phone + OTP login. The OTP itself is requested/sent via a separate
    // Server Action (see src/actions/auth.ts) which calls sendOtp().
    Credentials({
      id: "phone-otp",
      name: "Phone",
      credentials: {
        phone: { label: "Phone", type: "text" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        const phone = credentials?.phone as string | undefined;
        const code = credentials?.code as string | undefined;
        if (!phone || !code) return null;

        const isValid = await verifyOtp(phone, code);
        if (!isValid) return null;

        const user = await mockDb.users.upsertByPhone(phone);
        if (user.status === "BLOCKED" || user.status === "DELETED") return null;

        return { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role };
      },
    }),

    // Email + password login.
    Credentials({
      id: "credentials",
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await mockDb.users.findByEmail(email);
        if (!user?.passwordHash) return null;
        if (user.status === "BLOCKED" || user.status === "DELETED") return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role };
      },
    }),
  ],
});
