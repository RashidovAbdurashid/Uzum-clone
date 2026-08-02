import type { RoleType } from "@/constants/roles";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: RoleType;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: RoleType;
    phone?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: RoleType;
  }
}
