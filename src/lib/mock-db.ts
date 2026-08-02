import type { RoleType } from "@/constants/roles";

// ============================================================
// In-memory data store.
//
// This is a temporary stand-in for the real database (see prisma/schema.prisma
// in the project history / docs for the intended PostgreSQL schema). Everything
// here resets when the dev server restarts - it exists purely so the app runs
// with zero external setup (no Docker, no Postgres, no Prisma generate step).
//
// When you're ready to wire up a real database, reintroduce Prisma (or another
// ORM) and replace the functions below with real queries - the function
// signatures are intentionally DB-shaped so call sites won't need to change.
// ============================================================

export interface MockUser {
  id: string;
  email: string | null;
  phone: string | null;
  name: string | null;
  passwordHash: string | null;
  role: RoleType;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  phoneVerified: Date | null;
  emailVerified: Date | null;
  createdAt: Date;
}

export interface MockCity {
  id: string;
  slug: string;
  name: { ru: string; uz: string; en: string };
  region: string;
}

export interface MockCategory {
  id: string;
  slug: string;
  name: { ru: string; uz: string; en: string };
  position: number;
  isFeatured: boolean;
}

const globalForMockDb = globalThis as unknown as {
  mockUsers: Map<string, MockUser> | undefined;
  mockCities: MockCity[] | undefined;
  mockCategories: MockCategory[] | undefined;
};

function seedUsers(): Map<string, MockUser> {
  const users = new Map<string, MockUser>();
  users.set("admin@uzum-clone.local", {
    id: "user_super_admin",
    email: "admin@uzum-clone.local",
    phone: null,
    name: "Super Admin",
    // bcrypt hash for "ChangeMe123!" - see README for login instructions
    passwordHash: "$2a$10$TEgv6wceJTXHOTJqYe2bIuV.xtRaNV69J9m4m9Fyx9rcWe4aqbV1S",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    phoneVerified: null,
    emailVerified: new Date(),
    createdAt: new Date(),
  });
  users.set("seller@uzum-clone.local", {
    id: "user_seller_demo",
    email: "seller@uzum-clone.local",
    phone: null,
    name: "Novex Store",
    // same password as the admin account: "ChangeMe123!"
    passwordHash: "$2a$10$TEgv6wceJTXHOTJqYe2bIuV.xtRaNV69J9m4m9Fyx9rcWe4aqbV1S",
    role: "SELLER",
    status: "ACTIVE",
    phoneVerified: null,
    emailVerified: new Date(),
    createdAt: new Date(),
  });
  return users;
}

function seedCities(): MockCity[] {
  return [
    { id: "city_tashkent", slug: "tashkent", name: { ru: "Ташкент", uz: "Toshkent", en: "Tashkent" }, region: "Ташкент" },
    { id: "city_samarkand", slug: "samarkand", name: { ru: "Самарканд", uz: "Samarqand", en: "Samarkand" }, region: "Самаркандская обл." },
    { id: "city_bukhara", slug: "bukhara", name: { ru: "Бухара", uz: "Buxoro", en: "Bukhara" }, region: "Бухарская обл." },
  ];
}

function seedCategories(): MockCategory[] {
  return [
    { id: "cat_electronics", slug: "electronics", name: { ru: "Электроника", uz: "Elektronika", en: "Electronics" }, position: 0, isFeatured: true },
    { id: "cat_home-appliances", slug: "home-appliances", name: { ru: "Бытовая техника", uz: "Maishiy texnika", en: "Home Appliances" }, position: 1, isFeatured: true },
    { id: "cat_furniture", slug: "furniture", name: { ru: "Мебель", uz: "Mebel", en: "Furniture" }, position: 2, isFeatured: true },
    { id: "cat_fashion", slug: "fashion", name: { ru: "Модный базар", uz: "Moda bozori", en: "Fashion" }, position: 3, isFeatured: true },
    { id: "cat_kids", slug: "kids", name: { ru: "Детский мир", uz: "Bolalar dunyosi", en: "Kids" }, position: 4, isFeatured: true },
  ];
}

// Survive Next.js dev-server hot reloads (same trick as the old Prisma singleton).
const users = globalForMockDb.mockUsers ?? seedUsers();
const cities = globalForMockDb.mockCities ?? seedCities();
const categories = globalForMockDb.mockCategories ?? seedCategories();
if (process.env.NODE_ENV !== "production") {
  globalForMockDb.mockUsers = users;
  globalForMockDb.mockCities = cities;
  globalForMockDb.mockCategories = categories;
}

let nextUserId = users.size + 1;

export const mockDb = {
  users: {
    async findByEmail(email: string): Promise<MockUser | null> {
      for (const u of users.values()) if (u.email === email) return u;
      return null;
    },
    async findByPhone(phone: string): Promise<MockUser | null> {
      for (const u of users.values()) if (u.phone === phone) return u;
      return null;
    },
    /** Creates the user if the phone isn't known yet, otherwise marks it verified. */
    async upsertByPhone(phone: string): Promise<MockUser> {
      const existing = await this.findByPhone(phone);
      if (existing) {
        existing.phoneVerified = new Date();
        return existing;
      }
      const user: MockUser = {
        id: `user_${nextUserId++}`,
        email: null,
        phone,
        name: null,
        passwordHash: null,
        role: "CUSTOMER",
        status: "ACTIVE",
        phoneVerified: new Date(),
        emailVerified: null,
        createdAt: new Date(),
      };
      users.set(`phone:${phone}`, user);
      return user;
    },
    async findById(id: string): Promise<MockUser | null> {
      for (const u of users.values()) if (u.id === id) return u;
      return null;
    },
    async findMany(): Promise<MockUser[]> {
      return [...users.values()].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    },
    async updateRole(id: string, role: RoleType): Promise<MockUser | null> {
      const user = await this.findById(id);
      if (!user) return null;
      user.role = role;
      return user;
    },
    async updateStatus(id: string, status: MockUser["status"]): Promise<MockUser | null> {
      const user = await this.findById(id);
      if (!user) return null;
      user.status = status;
      return user;
    },
    /** Fills in profile fields collected after OTP verification during registration. */
    async completeProfile(
      id: string,
      patch: { name?: string; email?: string; passwordHash?: string }
    ): Promise<MockUser | null> {
      const user = await this.findById(id);
      if (!user) return null;
      if (patch.name) user.name = patch.name;
      if (patch.email) {
        user.email = patch.email;
        user.emailVerified = new Date();
      }
      if (patch.passwordHash) user.passwordHash = patch.passwordHash;
      return user;
    },
    async setPasswordHash(id: string, passwordHash: string): Promise<MockUser | null> {
      const user = await this.findById(id);
      if (!user) return null;
      user.passwordHash = passwordHash;
      return user;
    },
  },
  cities: {
    async findMany(): Promise<MockCity[]> {
      return cities;
    },
  },
  categories: {
    async findMany(): Promise<MockCategory[]> {
      return categories;
    },
  },
};
