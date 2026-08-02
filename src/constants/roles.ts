export const ROLES = {
  GUEST: "GUEST",
  CUSTOMER: "CUSTOMER",
  SELLER: "SELLER",
  MODERATOR: "MODERATOR",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];

// Route prefix -> roles allowed to access it. Checked in middleware.ts.
export const ROUTE_ROLE_MAP: { prefix: string; roles: RoleType[] }[] = [
  { prefix: "/admin", roles: [ROLES.MODERATOR, ROLES.ADMIN, ROLES.SUPER_ADMIN] },
  { prefix: "/seller", roles: [ROLES.SELLER, ROLES.ADMIN, ROLES.SUPER_ADMIN] },
  {
    prefix: "/account",
    roles: [ROLES.CUSTOMER, ROLES.SELLER, ROLES.MODERATOR, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  },
];

// Finer-grained admin section access, e.g. only ADMIN+ may touch settings/finance.
export const ADMIN_SECTION_ROLE_MAP: { prefix: string; roles: RoleType[] }[] = [
  { prefix: "/admin/settings", roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN] },
  { prefix: "/admin/finance", roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN] },
  { prefix: "/admin/sellers", roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN] },
  { prefix: "/admin/users", roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN] },
  { prefix: "/admin/reviews", roles: [ROLES.MODERATOR, ROLES.ADMIN, ROLES.SUPER_ADMIN] },
  { prefix: "/admin/products", roles: [ROLES.MODERATOR, ROLES.ADMIN, ROLES.SUPER_ADMIN] },
];

export function hasRole(userRole: RoleType | undefined, allowed: RoleType[]): boolean {
  if (!userRole) return false;
  return allowed.includes(userRole);
}
