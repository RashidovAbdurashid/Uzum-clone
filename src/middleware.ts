import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";
import { ROUTE_ROLE_MAP, ADMIN_SECTION_ROLE_MAP, hasRole, type RoleType } from "@/constants/roles";

// Uses the edge-safe base config (no Prisma/ioredis) - see auth.config.ts.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role as RoleType | undefined;

  // Check fine-grained admin sections first (more specific prefixes).
  const adminSection = ADMIN_SECTION_ROLE_MAP.find((r) => pathname.startsWith(r.prefix));
  if (adminSection && !hasRole(role, adminSection.roles)) {
    return redirectToLogin(req.nextUrl, req.url);
  }

  const generalRule = ROUTE_ROLE_MAP.find((r) => pathname.startsWith(r.prefix));
  if (generalRule && !hasRole(role, generalRule.roles)) {
    return redirectToLogin(req.nextUrl, req.url);
  }

  return NextResponse.next();
});

function redirectToLogin(currentUrl: URL, base: string) {
  const loginUrl = new URL("/login", base);
  loginUrl.searchParams.set("callbackUrl", currentUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/seller/:path*", "/account/:path*"],
};
