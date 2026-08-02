module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs) <export randomFillSync as default>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomFillSync"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[project]/src/lib/mock-db.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockDb",
    ()=>mockDb
]);
const globalForMockDb = globalThis;
function seedUsers() {
    const users = new Map();
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
        createdAt: new Date()
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
        createdAt: new Date()
    });
    return users;
}
function seedCities() {
    return [
        {
            id: "city_tashkent",
            slug: "tashkent",
            name: {
                ru: "Ташкент",
                uz: "Toshkent",
                en: "Tashkent"
            },
            region: "Ташкент"
        },
        {
            id: "city_samarkand",
            slug: "samarkand",
            name: {
                ru: "Самарканд",
                uz: "Samarqand",
                en: "Samarkand"
            },
            region: "Самаркандская обл."
        },
        {
            id: "city_bukhara",
            slug: "bukhara",
            name: {
                ru: "Бухара",
                uz: "Buxoro",
                en: "Bukhara"
            },
            region: "Бухарская обл."
        }
    ];
}
function seedCategories() {
    return [
        {
            id: "cat_electronics",
            slug: "electronics",
            name: {
                ru: "Электроника",
                uz: "Elektronika",
                en: "Electronics"
            },
            position: 0,
            isFeatured: true
        },
        {
            id: "cat_home-appliances",
            slug: "home-appliances",
            name: {
                ru: "Бытовая техника",
                uz: "Maishiy texnika",
                en: "Home Appliances"
            },
            position: 1,
            isFeatured: true
        },
        {
            id: "cat_furniture",
            slug: "furniture",
            name: {
                ru: "Мебель",
                uz: "Mebel",
                en: "Furniture"
            },
            position: 2,
            isFeatured: true
        },
        {
            id: "cat_fashion",
            slug: "fashion",
            name: {
                ru: "Модный базар",
                uz: "Moda bozori",
                en: "Fashion"
            },
            position: 3,
            isFeatured: true
        },
        {
            id: "cat_kids",
            slug: "kids",
            name: {
                ru: "Детский мир",
                uz: "Bolalar dunyosi",
                en: "Kids"
            },
            position: 4,
            isFeatured: true
        }
    ];
}
// Survive Next.js dev-server hot reloads (same trick as the old Prisma singleton).
const users = globalForMockDb.mockUsers ?? seedUsers();
const cities = globalForMockDb.mockCities ?? seedCities();
const categories = globalForMockDb.mockCategories ?? seedCategories();
if ("TURBOPACK compile-time truthy", 1) {
    globalForMockDb.mockUsers = users;
    globalForMockDb.mockCities = cities;
    globalForMockDb.mockCategories = categories;
}
let nextUserId = users.size + 1;
const mockDb = {
    users: {
        async findByEmail (email) {
            for (const u of users.values())if (u.email === email) return u;
            return null;
        },
        async findByPhone (phone) {
            for (const u of users.values())if (u.phone === phone) return u;
            return null;
        },
        /** Creates the user if the phone isn't known yet, otherwise marks it verified. */ async upsertByPhone (phone) {
            const existing = await this.findByPhone(phone);
            if (existing) {
                existing.phoneVerified = new Date();
                return existing;
            }
            const user = {
                id: `user_${nextUserId++}`,
                email: null,
                phone,
                name: null,
                passwordHash: null,
                role: "CUSTOMER",
                status: "ACTIVE",
                phoneVerified: new Date(),
                emailVerified: null,
                createdAt: new Date()
            };
            users.set(`phone:${phone}`, user);
            return user;
        },
        async findById (id) {
            for (const u of users.values())if (u.id === id) return u;
            return null;
        },
        async findMany () {
            return [
                ...users.values()
            ].sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime());
        },
        async updateRole (id, role) {
            const user = await this.findById(id);
            if (!user) return null;
            user.role = role;
            return user;
        },
        async updateStatus (id, status) {
            const user = await this.findById(id);
            if (!user) return null;
            user.status = status;
            return user;
        },
        /** Fills in profile fields collected after OTP verification during registration. */ async completeProfile (id, patch) {
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
        async setPasswordHash (id, passwordHash) {
            const user = await this.findById(id);
            if (!user) return null;
            user.passwordHash = passwordHash;
            return user;
        }
    },
    cities: {
        async findMany () {
            return cities;
        }
    },
    categories: {
        async findMany () {
            return categories;
        }
    }
};
}),
"[project]/src/lib/otp-store.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Temporary stand-in for Redis (see src/lib/mock-db.ts for the equivalent
// note on Prisma). Stores OTP codes and rate-limit counters in memory, keyed
// by phone number, with manual TTL expiry. Resets on server restart - fine
// for local dev, not for production (swap back to ioredis when you add Redis).
__turbopack_context__.s([
    "checkAndConsumeOtp",
    ()=>checkAndConsumeOtp,
    "checkOtpRateLimit",
    ()=>checkOtpRateLimit,
    "peekOtp",
    ()=>peekOtp,
    "storeOtp",
    ()=>storeOtp
]);
const globalForOtp = globalThis;
const otpStore = globalForOtp.otpStore ?? new Map();
const rateStore = globalForOtp.otpRateStore ?? new Map();
if ("TURBOPACK compile-time truthy", 1) {
    globalForOtp.otpStore = otpStore;
    globalForOtp.otpRateStore = rateStore;
}
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
function storeOtp(phone, code) {
    otpStore.set(phone, {
        code,
        expiresAt: Date.now() + OTP_TTL_MS
    });
}
function checkAndConsumeOtp(phone, code) {
    const entry = otpStore.get(phone);
    if (!entry || entry.expiresAt < Date.now() || entry.code !== code) return false;
    otpStore.delete(phone);
    return true;
}
function peekOtp(phone, code) {
    const entry = otpStore.get(phone);
    return !!entry && entry.expiresAt >= Date.now() && entry.code === code;
}
function checkOtpRateLimit(phone) {
    const now = Date.now();
    const entry = rateStore.get(phone);
    if (!entry || entry.expiresAt < now) {
        rateStore.set(phone, {
            count: 1,
            expiresAt: now + RATE_LIMIT_WINDOW_MS
        });
        return true;
    }
    entry.count += 1;
    return entry.count <= RATE_LIMIT_MAX;
}
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/node:os [external] (node:os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:os", () => require("node:os"));

module.exports = mod;
}),
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[externals]/node:diagnostics_channel [external] (node:diagnostics_channel, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:diagnostics_channel", () => require("node:diagnostics_channel"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/src/lib/logger.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logger",
    ()=>logger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pino$2f$pino$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pino/pino.js [app-rsc] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pino$2f$pino$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
    level: process.env.LOG_LEVEL || "info",
    base: {
        service: "uzum-clone"
    }
});
}),
"[project]/src/lib/sms.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendOtp",
    ()=>sendOtp,
    "verifyOtp",
    ()=>verifyOtp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$otp$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/otp-store.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-rsc] (ecmascript)");
;
;
let cachedToken = null;
async function getEskizToken() {
    if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.token;
    const res = await fetch(`${process.env.ESKIZ_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: process.env.ESKIZ_EMAIL,
            password: process.env.ESKIZ_PASSWORD
        })
    });
    if (!res.ok) throw new Error(`Eskiz auth failed: ${res.status}`);
    const data = await res.json();
    cachedToken = {
        token: data.data.token,
        expiresAt: Date.now() + 25 * 24 * 60 * 60 * 1000
    };
    return cachedToken.token;
}
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
async function sendOtp(phone) {
    const code = generateOtp();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$otp$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["storeOtp"])(phone, code);
    if ("TURBOPACK compile-time truthy", 1) {
        // In dev, skip real SMS sending and just log - avoids burning Eskiz credits
        // and lets you log in without a real SMS provider configured at all.
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].info({
            phone,
            code
        }, "DEV OTP (not sent via SMS) - use this code to log in");
        return;
    }
    //TURBOPACK unreachable
    ;
}
async function verifyOtp(phone, code) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$otp$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkAndConsumeOtp"])(phone, code);
}
}),
"[project]/src/lib/auth.config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authConfig",
    ()=>authConfig
]);
const authConfig = {
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login",
        verifyRequest: "/verify"
    },
    providers: [],
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session ({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    }
};
}),
"[project]/src/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "handlers",
    ()=>handlers,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/credentials.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/providers/credentials.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/google.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$google$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/providers/google.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sms.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.config.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
const { handlers, signIn, signOut, auth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])({
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authConfig"],
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$google$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        }),
        // Phone + OTP login. The OTP itself is requested/sent via a separate
        // Server Action (see src/actions/auth.ts) which calls sendOtp().
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
            id: "phone-otp",
            name: "Phone",
            credentials: {
                phone: {
                    label: "Phone",
                    type: "text"
                },
                code: {
                    label: "Code",
                    type: "text"
                }
            },
            async authorize (credentials) {
                const phone = credentials?.phone;
                const code = credentials?.code;
                if (!phone || !code) return null;
                const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyOtp"])(phone, code);
                if (!isValid) return null;
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockDb"].users.upsertByPhone(phone);
                if (user.status === "BLOCKED" || user.status === "DELETED") return null;
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                };
            }
        }),
        // Email + password login.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
            id: "credentials",
            name: "Email",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                const email = credentials?.email;
                const password = credentials?.password;
                if (!email || !password) return null;
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockDb"].users.findByEmail(email);
                if (!user?.passwordHash) return null;
                if (user.status === "BLOCKED" || user.status === "DELETED") return null;
                const valid = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].compare(password, user.passwordHash);
                if (!valid) return null;
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                };
            }
        })
    ]
});
}),
"[project]/src/lib/mock-data/products.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRODUCTS",
    ()=>PRODUCTS
]);
function images(slug, alt) {
    return [
        1,
        2,
        3
    ].map((i)=>({
            url: `/images/products/${slug}-${i}.svg`,
            alt: `${alt} — фото ${i}`
        }));
}
const PRODUCTS = [
    {
        id: "prod_novex-x12-128gb",
        slug: "novex-x12-128gb",
        name: "Смартфон Novex X12 128GB",
        shortDescription: "Яркий AMOLED-экран, тройная камера 50 Мп, батарея на 5000 мА·ч",
        description: "Novex X12 — смартфон среднего класса с большим AMOLED-дисплеем 6.5\", тройной камерой 50+8+2 Мп и батареей 5000 мА·ч с быстрой зарядкой 33Вт. Поддержка двух SIM-карт, NFC для бесконтактной оплаты.",
        categorySlug: "smartphones",
        brandSlug: "novex",
        images: images("novex-x12-128gb", "Novex X12"),
        variants: [
            {
                id: "var_novex-x12-black",
                sku: "NVX-X12-BLK",
                label: "Чёрный",
                attributeName: "Цвет",
                price: 3500000,
                compareAtPrice: 4000000,
                installmentPrice: 291700,
                installmentMonths: 12,
                stock: 24
            },
            {
                id: "var_novex-x12-blue",
                sku: "NVX-X12-BLU",
                label: "Синий",
                attributeName: "Цвет",
                price: 3500000,
                compareAtPrice: 4000000,
                installmentPrice: 291700,
                installmentMonths: 12,
                stock: 11
            },
            {
                id: "var_novex-x12-white",
                sku: "NVX-X12-WHT",
                label: "Белый",
                attributeName: "Цвет",
                price: 3600000,
                compareAtPrice: 4100000,
                installmentPrice: 300000,
                installmentMonths: 12,
                stock: 6
            }
        ],
        specs: [
            {
                label: "Экран",
                value: "6.5\" AMOLED, 90 Гц"
            },
            {
                label: "Память",
                value: "128 ГБ / 8 ГБ ОЗУ"
            },
            {
                label: "Камера",
                value: "50 + 8 + 2 Мп"
            },
            {
                label: "Батарея",
                value: "5000 мА·ч, 33 Вт"
            },
            {
                label: "Страна",
                value: "Вьетнам"
            },
            {
                label: "Гарантия",
                value: "12 месяцев"
            }
        ],
        reviews: [
            {
                id: "rev_1",
                author: "Дилноза",
                rating: 5,
                comment: "Отличный экран, батареи хватает на два дня. Камера радует при дневном свете.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-12"
            },
            {
                id: "rev_2",
                author: "Азиз",
                rating: 4,
                comment: "В целом доволен, но в темноте камера немного шумит.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-20"
            },
            {
                id: "rev_3",
                author: "Шахзод",
                rating: 5,
                comment: "Пришёл на следующий день после заказа, всё как на фото.",
                isVerifiedPurchase: false,
                createdAt: "2026-07-02"
            }
        ],
        isNew: true,
        isOriginal: true,
        hasLowPriceGuarantee: true,
        salesCount: 412,
        deliveryDays: 1
    },
    {
        id: "prod_kaido-s8-lite-256gb",
        slug: "kaido-s8-lite-256gb",
        name: "Смартфон Kaido S8 Lite 256GB",
        shortDescription: "256 ГБ памяти, экран 90 Гц, разблокировка по отпечатку",
        description: "Kaido S8 Lite сочетает большой объём памяти (256 ГБ) и плавный 90-герцовый экран. Сканер отпечатка пальца встроен в кнопку питания, поддержка быстрой зарядки 25 Вт.",
        categorySlug: "smartphones",
        brandSlug: "kaido",
        images: images("kaido-s8-lite-256gb", "Kaido S8 Lite"),
        variants: [
            {
                id: "var_kaido-s8-black",
                sku: "KDO-S8-BLK",
                label: "Чёрный",
                attributeName: "Цвет",
                price: 2800000,
                compareAtPrice: null,
                installmentPrice: 233400,
                installmentMonths: 12,
                stock: 18
            },
            {
                id: "var_kaido-s8-green",
                sku: "KDO-S8-GRN",
                label: "Зелёный",
                attributeName: "Цвет",
                price: 2800000,
                compareAtPrice: null,
                installmentPrice: 233400,
                installmentMonths: 12,
                stock: 9
            }
        ],
        specs: [
            {
                label: "Экран",
                value: "6.6\" IPS, 90 Гц"
            },
            {
                label: "Память",
                value: "256 ГБ / 8 ГБ ОЗУ"
            },
            {
                label: "Камера",
                value: "48 + 2 Мп"
            },
            {
                label: "Батарея",
                value: "5000 мА·ч, 25 Вт"
            },
            {
                label: "Страна",
                value: "Китай"
            },
            {
                label: "Гарантия",
                value: "12 месяцев"
            }
        ],
        reviews: [
            {
                id: "rev_4",
                author: "Мадина",
                rating: 4,
                comment: "Хорошее соотношение цены и памяти. Немного греется при играх.",
                isVerifiedPurchase: true,
                createdAt: "2026-05-30"
            },
            {
                id: "rev_5",
                author: "Бахтиёр",
                rating: 5,
                comment: "За свои деньги отличный вариант, зарядка держит весь день.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-15"
            }
        ],
        isNew: false,
        isOriginal: true,
        hasLowPriceGuarantee: false,
        salesCount: 268,
        deliveryDays: 1
    },
    {
        id: "prod_aurex-book-14",
        slug: "aurex-book-14",
        name: "Ноутбук Aurex Book 14\"",
        shortDescription: "Лёгкий корпус 1.3 кг, 16 ГБ ОЗУ, SSD 512 ГБ",
        description: "Aurex Book 14 — компактный ноутбук для учёбы и работы. Металлический корпус весом 1.3 кг, экран IPS Full HD, 16 ГБ оперативной памяти и быстрый SSD на 512 ГБ.",
        categorySlug: "laptops",
        brandSlug: "aurex",
        images: images("aurex-book-14", "Aurex Book 14"),
        variants: [
            {
                id: "var_aurex-book-8-256",
                sku: "AUX-BK14-8256",
                label: "8 ГБ / 256 ГБ",
                attributeName: "Конфигурация",
                price: 6200000,
                compareAtPrice: 7000000,
                installmentPrice: 516700,
                installmentMonths: 12,
                stock: 7
            },
            {
                id: "var_aurex-book-16-512",
                sku: "AUX-BK14-16512",
                label: "16 ГБ / 512 ГБ",
                attributeName: "Конфигурация",
                price: 7900000,
                compareAtPrice: 8800000,
                installmentPrice: 658400,
                installmentMonths: 12,
                stock: 4
            }
        ],
        specs: [
            {
                label: "Экран",
                value: "14\" IPS Full HD"
            },
            {
                label: "Процессor",
                value: "8-ядерный, до 3.4 ГГц"
            },
            {
                label: "Вес",
                value: "1.3 кг"
            },
            {
                label: "Батарея",
                value: "до 10 часов"
            },
            {
                label: "Страна",
                value: "Китай"
            },
            {
                label: "Гарантия",
                value: "24 месяца"
            }
        ],
        reviews: [
            {
                id: "rev_6",
                author: "Комрон",
                rating: 5,
                comment: "Лёгкий, быстрый, экран приятный. Для учёбы и офиса хватает с запасом.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-01"
            }
        ],
        isNew: true,
        isOriginal: true,
        hasLowPriceGuarantee: true,
        salesCount: 134,
        deliveryDays: 2
    },
    {
        id: "prod_vionic-air-13",
        slug: "vionic-air-13",
        name: "Ноутбук Vionic Air 13\"",
        shortDescription: "Ультратонкий корпус 12 мм, экран 2K, до 14 часов работы",
        description: "Vionic Air — ультрабук с корпусом толщиной всего 12 мм и экраном разрешением 2K. Оптимизирован для длительной автономной работы — до 14 часов на одном заряде.",
        categorySlug: "laptops",
        brandSlug: "vionic",
        images: images("vionic-air-13", "Vionic Air 13"),
        variants: [
            {
                id: "var_vionic-air-silver",
                sku: "VNC-AIR13-SLV",
                label: "Серебристый",
                attributeName: "Цвет",
                price: 8900000,
                compareAtPrice: null,
                installmentPrice: 741700,
                installmentMonths: 12,
                stock: 5
            }
        ],
        specs: [
            {
                label: "Экран",
                value: "13.3\" 2K IPS"
            },
            {
                label: "Процессор",
                value: "8-ядерный, до 4.0 ГГц"
            },
            {
                label: "Вес",
                value: "1.05 кг"
            },
            {
                label: "Батарея",
                value: "до 14 часов"
            },
            {
                label: "Страна",
                value: "Тайвань"
            },
            {
                label: "Гарантия",
                value: "24 месяца"
            }
        ],
        reviews: [
            {
                id: "rev_7",
                author: "Ситора",
                rating: 5,
                comment: "Очень тонкий и лёгкий, беру с собой каждый день, батареи хватает на полный рабочий день.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-28"
            }
        ],
        isNew: false,
        isOriginal: true,
        hasLowPriceGuarantee: false,
        salesCount: 58,
        deliveryDays: 3
    },
    {
        id: "prod_brightline-pods-pro",
        slug: "brightline-pods-pro",
        name: "Наушники Brightline Pods Pro",
        shortDescription: "Активное шумоподавление, до 30 часов от кейса",
        description: "Brightline Pods Pro — беспроводные наушники с активным шумоподавлением и прозрачным режимом. Кейс с беспроводной зарядкой обеспечивает до 30 часов автономной работы.",
        categorySlug: "headphones",
        brandSlug: "brightline",
        images: images("brightline-pods-pro", "Brightline Pods Pro"),
        variants: [
            {
                id: "var_brightline-pods-white",
                sku: "BRL-PODS-WHT",
                label: "Белый",
                attributeName: "Цвет",
                price: 850000,
                compareAtPrice: 1000000,
                installmentPrice: 70900,
                installmentMonths: 12,
                stock: 40
            },
            {
                id: "var_brightline-pods-black",
                sku: "BRL-PODS-BLK",
                label: "Чёрный",
                attributeName: "Цвет",
                price: 850000,
                compareAtPrice: 1000000,
                installmentPrice: 70900,
                installmentMonths: 12,
                stock: 33
            }
        ],
        specs: [
            {
                label: "Тип",
                value: "Внутриканальные, TWS"
            },
            {
                label: "Шумоподавление",
                value: "Активное (ANC)"
            },
            {
                label: "Автономность",
                value: "8ч + 22ч от кейса"
            },
            {
                label: "Защита",
                value: "IPX4"
            },
            {
                label: "Гарантия",
                value: "12 месяцев"
            }
        ],
        reviews: [
            {
                id: "rev_8",
                author: "Фарход",
                rating: 5,
                comment: "Шумодав реально работает, в метро тишина. Звук чистый.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-10"
            },
            {
                id: "rev_9",
                author: "Нилуфар",
                rating: 4,
                comment: "Удобные, но кейс немного великоват для кармана.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-22"
            }
        ],
        isNew: false,
        isOriginal: true,
        hasLowPriceGuarantee: true,
        salesCount: 521,
        deliveryDays: 1
    },
    {
        id: "prod_solace-wireless-x",
        slug: "solace-wireless-x",
        name: "Наушники Solace Wireless X",
        shortDescription: "Бюджетные TWS-наушники с ярким басом",
        description: "Solace Wireless X — доступные беспроводные наушники с усиленным басом и сенсорным управлением. Отлично подойдут для повседневного прослушивания музыки и звонков.",
        categorySlug: "headphones",
        brandSlug: "solace",
        images: images("solace-wireless-x", "Solace Wireless X"),
        variants: [
            {
                id: "var_solace-x-black",
                sku: "SLC-WX-BLK",
                label: null,
                attributeName: null,
                price: 450000,
                compareAtPrice: 600000,
                installmentPrice: null,
                installmentMonths: null,
                stock: 62
            }
        ],
        specs: [
            {
                label: "Тип",
                value: "Внутриканальные, TWS"
            },
            {
                label: "Автономность",
                value: "5ч + 15ч от кейса"
            },
            {
                label: "Защита",
                value: "IPX4"
            },
            {
                label: "Гарантия",
                value: "6 месяцев"
            }
        ],
        reviews: [
            {
                id: "rev_10",
                author: "Умид",
                rating: 4,
                comment: "За такую цену — отличный вариант, бас чувствуется хорошо.",
                isVerifiedPurchase: true,
                createdAt: "2026-05-18"
            }
        ],
        isNew: false,
        isOriginal: false,
        hasLowPriceGuarantee: false,
        salesCount: 389,
        deliveryDays: 1
    },
    {
        id: "prod_terra-blender-900w",
        slug: "terra-blender-900w",
        name: "Блендер Terra Blender 900W",
        shortDescription: "Стеклянная чаша 1.5 л, 6 скоростей, импульсный режим",
        description: "Terra Blender мощностью 900 Вт справится с любыми смузи и соусами. Стеклянная чаша на 1.5 литра, 6 скоростных режимов и импульсный режим для колки льда.",
        categorySlug: "kitchen",
        brandSlug: "terra",
        images: images("terra-blender-900w", "Terra Blender"),
        variants: [
            {
                id: "var_terra-blender",
                sku: "TRR-BLD-900",
                label: null,
                attributeName: null,
                price: 320000,
                compareAtPrice: null,
                installmentPrice: null,
                installmentMonths: null,
                stock: 45
            }
        ],
        specs: [
            {
                label: "Мощность",
                value: "900 Вт"
            },
            {
                label: "Объём чаши",
                value: "1.5 л, стекло"
            },
            {
                label: "Режимы",
                value: "6 скоростей + импульс"
            },
            {
                label: "Гарантия",
                value: "12 месяцев"
            }
        ],
        reviews: [
            {
                id: "rev_11",
                author: "Гульнора",
                rating: 5,
                comment: "Мощный, лёд колет без проблем. Мыть легко.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-05"
            }
        ],
        isNew: false,
        isOriginal: true,
        hasLowPriceGuarantee: false,
        salesCount: 97,
        deliveryDays: 2
    },
    {
        id: "prod_novex-multicooker-5l",
        slug: "novex-multicooker-5l",
        name: "Мультиварка Novex Multicooker 5L",
        shortDescription: "12 программ, отложенный старт, чаша с антипригарным покрытием",
        description: "Мультиварка Novex на 5 литров с 12 автоматическими программами и функцией отложенного старта до 24 часов. Чаша с керамическим антипригарным покрытием.",
        categorySlug: "kitchen",
        brandSlug: "novex",
        images: images("novex-multicooker-5l", "Novex Multicooker"),
        variants: [
            {
                id: "var_novex-multicooker",
                sku: "NVX-MC-5L",
                label: null,
                attributeName: null,
                price: 780000,
                compareAtPrice: 890000,
                installmentPrice: 65000,
                installmentMonths: 12,
                stock: 22
            }
        ],
        specs: [
            {
                label: "Объём",
                value: "5 л"
            },
            {
                label: "Программы",
                value: "12 автоматических"
            },
            {
                label: "Мощность",
                value: "860 Вт"
            },
            {
                label: "Гарантия",
                value: "12 месяцев"
            }
        ],
        reviews: [
            {
                id: "rev_12",
                author: "Зарина",
                rating: 5,
                comment: "Плов получается отлично, каша не пригорает. Довольна покупкой.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-19"
            }
        ],
        isNew: true,
        isOriginal: true,
        hasLowPriceGuarantee: true,
        salesCount: 156,
        deliveryDays: 1
    },
    {
        id: "prod_aurex-ac-12000btu",
        slug: "aurex-ac-12000btu",
        name: "Кондиционер Aurex AC 12000BTU",
        shortDescription: "Инверторный компрессор, охлаждение до 35 м²",
        description: "Инверторный кондиционер Aurex мощностью 12000 BTU рассчитан на помещения до 35 м². Тихая работа, режим осушения и ночной режим для комфортного сна.",
        categorySlug: "climate",
        brandSlug: "aurex",
        images: images("aurex-ac-12000btu", "Aurex AC 12000"),
        variants: [
            {
                id: "var_aurex-ac",
                sku: "AUX-AC-12K",
                label: null,
                attributeName: null,
                price: 4500000,
                compareAtPrice: 5200000,
                installmentPrice: 375000,
                installmentMonths: 12,
                stock: 14
            }
        ],
        specs: [
            {
                label: "Мощность охлаждения",
                value: "12000 BTU"
            },
            {
                label: "Площадь",
                value: "до 35 м²"
            },
            {
                label: "Компрессор",
                value: "Инверторный"
            },
            {
                label: "Гарантия",
                value: "36 месяцев"
            }
        ],
        reviews: [
            {
                id: "rev_13",
                author: "Отабек",
                rating: 5,
                comment: "Работает тихо, охлаждает быстро даже в жару. Установили за один день.",
                isVerifiedPurchase: true,
                createdAt: "2026-07-01"
            }
        ],
        isNew: false,
        isOriginal: true,
        hasLowPriceGuarantee: true,
        salesCount: 73,
        deliveryDays: 3
    },
    {
        id: "prod_vionic-fan-tower",
        slug: "vionic-fan-tower",
        name: "Вентилятор Vionic Fan Tower",
        shortDescription: "Башенный вентилятор с пультом ДУ и таймером",
        description: "Башенный вентилятор Vionic с 3 скоростями обдува, таймером выключения и пультом дистанционного управления. Компактный корпус не занимает много места.",
        categorySlug: "climate",
        brandSlug: "vionic",
        images: images("vionic-fan-tower", "Vionic Fan Tower"),
        variants: [
            {
                id: "var_vionic-fan",
                sku: "VNC-FAN-TWR",
                label: null,
                attributeName: null,
                price: 590000,
                compareAtPrice: null,
                installmentPrice: null,
                installmentMonths: null,
                stock: 31
            }
        ],
        specs: [
            {
                label: "Тип",
                value: "Башенный"
            },
            {
                label: "Скорости",
                value: "3"
            },
            {
                label: "Пульт ДУ",
                value: "Есть"
            },
            {
                label: "Гарантия",
                value: "12 месяцев"
            }
        ],
        reviews: [],
        isNew: false,
        isOriginal: false,
        hasLowPriceGuarantee: false,
        salesCount: 41,
        deliveryDays: 2
    },
    {
        id: "prod_divan-comfort-3seat",
        slug: "divan-comfort-3seat",
        name: "Диван «Комфорт» 3-местный",
        shortDescription: "Раскладной механизм еврокнижка, обивка велюр",
        description: "Трёхместный диван «Комфорт» с раскладным механизмом «еврокнижка» и вместительным бельевым ящиком. Обивка — мягкий велюр, устойчивый к истиранию.",
        categorySlug: "furniture",
        brandSlug: "terra",
        images: images("divan-comfort-3seat", "Divan Comfort"),
        variants: [
            {
                id: "var_divan-grey",
                sku: "TRR-DVN-GRY",
                label: "Серый",
                attributeName: "Цвет",
                price: 5200000,
                compareAtPrice: 6000000,
                installmentPrice: 433400,
                installmentMonths: 12,
                stock: 6
            },
            {
                id: "var_divan-beige",
                sku: "TRR-DVN-BGE",
                label: "Бежевый",
                attributeName: "Цвет",
                price: 5200000,
                compareAtPrice: 6000000,
                installmentPrice: 433400,
                installmentMonths: 12,
                stock: 4
            }
        ],
        specs: [
            {
                label: "Механизм",
                value: "Еврокнижка"
            },
            {
                label: "Обивка",
                value: "Велюр"
            },
            {
                label: "Размер",
                value: "210×95×90 см"
            },
            {
                label: "Гарантия",
                value: "18 месяцев"
            }
        ],
        reviews: [
            {
                id: "rev_14",
                author: "Малика",
                rating: 4,
                comment: "Красивый и удобный, но сборка заняла время.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-08"
            }
        ],
        isNew: false,
        isOriginal: false,
        hasLowPriceGuarantee: true,
        salesCount: 29,
        deliveryDays: 5
    },
    {
        id: "prod_kreslo-ergomax",
        slug: "kreslo-ergomax",
        name: "Кресло офисное ErgoMax",
        shortDescription: "Регулировка высоты и наклона, сетчатая спинка",
        description: "Эргономичное офисное кресло ErgoMax с сетчатой дышащей спинкой, регулировкой высоты, наклона и подлокотников. Подходит для долгой работы за компьютером.",
        categorySlug: "furniture",
        brandSlug: "vionic",
        images: images("kreslo-ergomax", "Kreslo ErgoMax"),
        variants: [
            {
                id: "var_kreslo-black",
                sku: "VNC-CHR-BLK",
                label: null,
                attributeName: null,
                price: 1350000,
                compareAtPrice: null,
                installmentPrice: 112500,
                installmentMonths: 12,
                stock: 17
            }
        ],
        specs: [
            {
                label: "Материал спинки",
                value: "Сетка"
            },
            {
                label: "Регулировки",
                value: "Высота, наклон, подлокотники"
            },
            {
                label: "Макс. нагрузка",
                value: "120 кг"
            },
            {
                label: "Гарантия",
                value: "24 месяца"
            }
        ],
        reviews: [
            {
                id: "rev_15",
                author: "Жасур",
                rating: 5,
                comment: "Спина больше не болит после 8 часов работы. Рекомендую.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-25"
            }
        ],
        isNew: true,
        isOriginal: true,
        hasLowPriceGuarantee: false,
        salesCount: 88,
        deliveryDays: 2
    },
    {
        id: "prod_stol-loft",
        slug: "stol-loft",
        name: "Стол письменный «Лофт»",
        shortDescription: "Металлический каркас, столешница из ЛДСП",
        description: "Письменный стол в стиле лофт с прочным металлическим каркасом чёрного цвета и столешницей из ЛДСП. Подходит для дома и офиса.",
        categorySlug: "furniture",
        brandSlug: "terra",
        images: images("stol-loft", "Stol Loft"),
        variants: [
            {
                id: "var_stol-120",
                sku: "TRR-DSK-120",
                label: "120 см",
                attributeName: "Ширина",
                price: 980000,
                compareAtPrice: null,
                installmentPrice: null,
                installmentMonths: null,
                stock: 12
            },
            {
                id: "var_stol-140",
                sku: "TRR-DSK-140",
                label: "140 см",
                attributeName: "Ширина",
                price: 1150000,
                compareAtPrice: null,
                installmentPrice: null,
                installmentMonths: null,
                stock: 8
            }
        ],
        specs: [
            {
                label: "Каркас",
                value: "Металл, чёрный"
            },
            {
                label: "Столешница",
                value: "ЛДСП, дуб сонома"
            },
            {
                label: "Гарантия",
                value: "12 месяцев"
            }
        ],
        reviews: [],
        isNew: false,
        isOriginal: false,
        hasLowPriceGuarantee: false,
        salesCount: 34,
        deliveryDays: 4
    },
    {
        id: "prod_kurtka-urbanstyle",
        slug: "kurtka-urbanstyle",
        name: "Куртка мужская зимняя UrbanStyle",
        shortDescription: "Утеплитель до -25°C, водоотталкивающая ткань",
        description: "Зимняя мужская куртка UrbanStyle с утеплителем, рассчитанным на температуру до -25°C. Верхняя ткань с водоотталкивающей пропиткой, капюшон с мехом на молнии.",
        categorySlug: "men",
        brandSlug: "urbanstyle",
        images: images("kurtka-urbanstyle", "Kurtka Urban"),
        variants: [
            {
                id: "var_kurtka-s",
                sku: "URB-JCK-S",
                label: "S",
                attributeName: "Размер",
                price: 620000,
                compareAtPrice: 780000,
                installmentPrice: null,
                installmentMonths: null,
                stock: 5
            },
            {
                id: "var_kurtka-m",
                sku: "URB-JCK-M",
                label: "M",
                attributeName: "Размер",
                price: 620000,
                compareAtPrice: 780000,
                installmentPrice: null,
                installmentMonths: null,
                stock: 9
            },
            {
                id: "var_kurtka-l",
                sku: "URB-JCK-L",
                label: "L",
                attributeName: "Размер",
                price: 620000,
                compareAtPrice: 780000,
                installmentPrice: null,
                installmentMonths: null,
                stock: 7
            },
            {
                id: "var_kurtka-xl",
                sku: "URB-JCK-XL",
                label: "XL",
                attributeName: "Размер",
                price: 650000,
                compareAtPrice: 810000,
                installmentPrice: null,
                installmentMonths: null,
                stock: 3
            }
        ],
        specs: [
            {
                label: "Утеплитель",
                value: "Синтепон 300г"
            },
            {
                label: "Температура",
                value: "до -25°C"
            },
            {
                label: "Ткань",
                value: "Водоотталкивающая"
            },
            {
                label: "Гарантия",
                value: "Возврат 14 дней"
            }
        ],
        reviews: [
            {
                id: "rev_16",
                author: "Рустам",
                rating: 5,
                comment: "Тёплая, не продувает даже в сильный ветер. Размер соответствует.",
                isVerifiedPurchase: true,
                createdAt: "2026-01-15"
            }
        ],
        isNew: false,
        isOriginal: false,
        hasLowPriceGuarantee: true,
        salesCount: 203,
        deliveryDays: 2
    },
    {
        id: "prod_jeans-slimfit",
        slug: "jeans-slimfit",
        name: "Джинсы мужские Slim Fit",
        shortDescription: "Стрейч-деним, зауженный крой",
        description: "Мужские джинсы приталенного кроя Slim Fit из эластичного денима. Пять карманов, универсальный тёмно-синий цвет подходит к любому образу.",
        categorySlug: "men",
        brandSlug: "urbanstyle",
        images: images("jeans-slimfit", "Jeans Slim"),
        variants: [
            {
                id: "var_jeans-30",
                sku: "URB-JNS-30",
                label: "30",
                attributeName: "Размер",
                price: 280000,
                compareAtPrice: null,
                installmentPrice: null,
                installmentMonths: null,
                stock: 14
            },
            {
                id: "var_jeans-32",
                sku: "URB-JNS-32",
                label: "32",
                attributeName: "Размер",
                price: 280000,
                compareAtPrice: null,
                installmentPrice: null,
                installmentMonths: null,
                stock: 19
            },
            {
                id: "var_jeans-34",
                sku: "URB-JNS-34",
                label: "34",
                attributeName: "Размер",
                price: 280000,
                compareAtPrice: null,
                installmentPrice: null,
                installmentMonths: null,
                stock: 10
            }
        ],
        specs: [
            {
                label: "Состав",
                value: "98% хлопок, 2% эластан"
            },
            {
                label: "Крой",
                value: "Slim Fit"
            },
            {
                label: "Гарантия",
                value: "Возврат 14 дней"
            }
        ],
        reviews: [
            {
                id: "rev_17",
                author: "Диёр",
                rating: 4,
                comment: "Сидят хорошо, но со временем немного растягиваются.",
                isVerifiedPurchase: true,
                createdAt: "2026-05-11"
            }
        ],
        isNew: false,
        isOriginal: false,
        hasLowPriceGuarantee: false,
        salesCount: 176,
        deliveryDays: 1
    },
    {
        id: "prod_plate-terra-style",
        slug: "plate-terra-style",
        name: "Платье летнее Terra Style",
        shortDescription: "Лёгкая ткань, свободный крой, миди-длина",
        description: "Летнее платье свободного кроя миди-длины из лёгкой дышащей ткани. Идеально для жаркой погоды — не сковывает движения и приятно к телу.",
        categorySlug: "women",
        brandSlug: "terra",
        images: images("plate-terra-style", "Plate Terra"),
        variants: [
            {
                id: "var_plate-xs",
                sku: "TRR-DRS-XS",
                label: "XS",
                attributeName: "Размер",
                price: 340000,
                compareAtPrice: null,
                installmentPrice: null,
                installmentMonths: null,
                stock: 8
            },
            {
                id: "var_plate-s",
                sku: "TRR-DRS-S",
                label: "S",
                attributeName: "Размер",
                price: 340000,
                compareAtPrice: null,
                installmentPrice: null,
                installmentMonths: null,
                stock: 12
            },
            {
                id: "var_plate-m",
                sku: "TRR-DRS-M",
                label: "M",
                attributeName: "Размер",
                price: 340000,
                compareAtPrice: null,
                installmentPrice: null,
                installmentMonths: null,
                stock: 15
            },
            {
                id: "var_plate-l",
                sku: "TRR-DRS-L",
                label: "L",
                attributeName: "Размер",
                price: 350000,
                compareAtPrice: null,
                installmentPrice: null,
                installmentMonths: null,
                stock: 6
            }
        ],
        specs: [
            {
                label: "Состав",
                value: "100% вискоза"
            },
            {
                label: "Длина",
                value: "Миди"
            },
            {
                label: "Гарантия",
                value: "Возврат 14 дней"
            }
        ],
        reviews: [
            {
                id: "rev_18",
                author: "Камила",
                rating: 5,
                comment: "Очень лёгкое и приятное, отлично на лето. Цвет как на фото.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-30"
            }
        ],
        isNew: true,
        isOriginal: false,
        hasLowPriceGuarantee: false,
        salesCount: 145,
        deliveryDays: 1
    },
    {
        id: "prod_palto-wool",
        slug: "palto-wool",
        name: "Пальто женское шерстяное",
        shortDescription: "Классический крой, утеплённая подкладка",
        description: "Женское пальто классического кроя из шерстяной смеси с утеплённой подкладкой. Подходит для прохладной погоды, сочетается с любым гардеробом.",
        categorySlug: "women",
        brandSlug: "urbanstyle",
        images: images("palto-wool", "Palto Wool"),
        variants: [
            {
                id: "var_palto-s",
                sku: "URB-CT-S",
                label: "S",
                attributeName: "Размер",
                price: 890000,
                compareAtPrice: 1100000,
                installmentPrice: 74200,
                installmentMonths: 12,
                stock: 4
            },
            {
                id: "var_palto-m",
                sku: "URB-CT-M",
                label: "M",
                attributeName: "Размер",
                price: 890000,
                compareAtPrice: 1100000,
                installmentPrice: 74200,
                installmentMonths: 12,
                stock: 6
            },
            {
                id: "var_palto-l",
                sku: "URB-CT-L",
                label: "L",
                attributeName: "Размер",
                price: 910000,
                compareAtPrice: 1130000,
                installmentPrice: 75800,
                installmentMonths: 12,
                stock: 3
            }
        ],
        specs: [
            {
                label: "Состав",
                value: "70% шерсть, 30% полиэстер"
            },
            {
                label: "Подкладка",
                value: "Утеплённая"
            },
            {
                label: "Гарантия",
                value: "Возврат 14 дней"
            }
        ],
        reviews: [
            {
                id: "rev_19",
                author: "Севара",
                rating: 5,
                comment: "Тёплое и элегантное, носится с любой обувью.",
                isVerifiedPurchase: true,
                createdAt: "2026-01-20"
            }
        ],
        isNew: false,
        isOriginal: false,
        hasLowPriceGuarantee: true,
        salesCount: 67,
        deliveryDays: 2
    },
    {
        id: "prod_konstruktor-kidjoy-350",
        slug: "konstruktor-kidjoy-350",
        name: "Конструктор KidJoy 350 деталей",
        shortDescription: "Развивающий конструктор, совместим с популярными брендами",
        description: "Конструктор KidJoy на 350 деталей развивает мелкую моторику и пространственное мышление. Крупные и мелкие блоки совместимы с большинством популярных наборов.",
        categorySlug: "kids",
        brandSlug: "kidjoy",
        images: images("konstruktor-kidjoy-350", "KidJoy 350"),
        variants: [
            {
                id: "var_konstruktor",
                sku: "KDJ-BLK-350",
                label: null,
                attributeName: null,
                price: 210000,
                compareAtPrice: 250000,
                installmentPrice: null,
                installmentMonths: null,
                stock: 55
            }
        ],
        specs: [
            {
                label: "Деталей",
                value: "350 шт"
            },
            {
                label: "Возраст",
                value: "3+"
            },
            {
                label: "Материал",
                value: "ABS-пластик"
            },
            {
                label: "Гарантия",
                value: "Возврат 14 дней"
            }
        ],
        reviews: [
            {
                id: "rev_20",
                author: "Наргиза",
                rating: 5,
                comment: "Ребёнок в восторге, детали крупные и безопасные.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-14"
            }
        ],
        isNew: false,
        isOriginal: true,
        hasLowPriceGuarantee: true,
        salesCount: 231,
        deliveryDays: 1
    },
    {
        id: "prod_kolyaska-babygo-3in1",
        slug: "kolyaska-babygo-3in1",
        name: "Коляска детская 3в1 BabyGo",
        shortDescription: "Люлька + прогулочный блок + автокресло",
        description: "Детская коляска-трансформер BabyGo 3в1 включает люльку для новорождённых, прогулочный блок и автокресло. Большие колёса с амортизацией для комфортной езды по любым покрытиям.",
        categorySlug: "kids",
        brandSlug: "babygo",
        images: images("kolyaska-babygo-3in1", "BabyGo 3v1"),
        variants: [
            {
                id: "var_kolyaska-grey",
                sku: "BBG-STR-GRY",
                label: "Серый",
                attributeName: "Цвет",
                price: 3100000,
                compareAtPrice: 3600000,
                installmentPrice: 258400,
                installmentMonths: 12,
                stock: 9
            },
            {
                id: "var_kolyaska-beige",
                sku: "BBG-STR-BGE",
                label: "Бежевый",
                attributeName: "Цвет",
                price: 3100000,
                compareAtPrice: 3600000,
                installmentPrice: 258400,
                installmentMonths: 12,
                stock: 5
            }
        ],
        specs: [
            {
                label: "Комплектация",
                value: "Люлька + прогулка + автокресло"
            },
            {
                label: "Колёса",
                value: "С амортизацией"
            },
            {
                label: "Возраст",
                value: "0-36 месяцев"
            },
            {
                label: "Гарантия",
                value: "24 месяца"
            }
        ],
        reviews: [
            {
                id: "rev_21",
                author: "Феруза",
                rating: 5,
                comment: "Очень манёвренная, легко раскладывается одной рукой.",
                isVerifiedPurchase: true,
                createdAt: "2026-05-22"
            },
            {
                id: "rev_22",
                author: "Шохрух",
                rating: 4,
                comment: "Качество хорошее, но инструкция могла быть понятнее.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-03"
            }
        ],
        isNew: true,
        isOriginal: true,
        hasLowPriceGuarantee: true,
        salesCount: 62,
        deliveryDays: 3
    },
    {
        id: "prod_velosiped-detsky-16",
        slug: "velosiped-detsky-16",
        name: "Велосипед детский 16\"",
        shortDescription: "Съёмные боковые колёса, регулируемое сиденье",
        description: "Детский велосипед с колёсами 16 дюймов и съёмными боковыми колёсиками для первых поездок. Сиденье и руль регулируются по высоте по мере роста ребёнка.",
        categorySlug: "kids",
        brandSlug: "kidjoy",
        images: images("velosiped-detsky-16", "Velosiped 16"),
        variants: [
            {
                id: "var_velosiped-red",
                sku: "KDJ-BIKE16-RED",
                label: "Красный",
                attributeName: "Цвет",
                price: 890000,
                compareAtPrice: null,
                installmentPrice: 74200,
                installmentMonths: 12,
                stock: 13
            },
            {
                id: "var_velosiped-blue",
                sku: "KDJ-BIKE16-BLU",
                label: "Синий",
                attributeName: "Цвет",
                price: 890000,
                compareAtPrice: null,
                installmentPrice: 74200,
                installmentMonths: 12,
                stock: 10
            }
        ],
        specs: [
            {
                label: "Диаметр колёс",
                value: "16\""
            },
            {
                label: "Возраст",
                value: "4-6 лет"
            },
            {
                label: "Доп. колёса",
                value: "Съёмные боковые"
            },
            {
                label: "Гарантия",
                value: "12 месяцев"
            }
        ],
        reviews: [
            {
                id: "rev_23",
                author: "Дилшод",
                rating: 5,
                comment: "Сын быстро научился кататься, качество сборки хорошее.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-17"
            }
        ],
        isNew: false,
        isOriginal: false,
        hasLowPriceGuarantee: false,
        salesCount: 54,
        deliveryDays: 2
    }
];
}),
"[project]/src/lib/mock-data/brands.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BRANDS",
    ()=>BRANDS
]);
const BRANDS = [
    {
        id: "brand_novex",
        name: "Novex",
        slug: "novex"
    },
    {
        id: "brand_kaido",
        name: "Kaido",
        slug: "kaido"
    },
    {
        id: "brand_aurex",
        name: "Aurex",
        slug: "aurex"
    },
    {
        id: "brand_vionic",
        name: "Vionic",
        slug: "vionic"
    },
    {
        id: "brand_brightline",
        name: "Brightline",
        slug: "brightline"
    },
    {
        id: "brand_solace",
        name: "Solace",
        slug: "solace"
    },
    {
        id: "brand_terra",
        name: "Terra",
        slug: "terra"
    },
    {
        id: "brand_urbanstyle",
        name: "UrbanStyle",
        slug: "urbanstyle"
    },
    {
        id: "brand_kidjoy",
        name: "KidJoy",
        slug: "kidjoy"
    },
    {
        id: "brand_babygo",
        name: "BabyGo",
        slug: "babygo"
    }
];
}),
"[project]/src/lib/mock-data/categories.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORIES",
    ()=>CATEGORIES
]);
const CATEGORIES = [
    {
        id: "cat_electronics",
        slug: "electronics",
        name: {
            ru: "Электроника",
            uz: "Elektronika",
            en: "Electronics"
        },
        icon: "Smartphone",
        parentSlug: null,
        position: 0,
        isFeatured: true
    },
    {
        id: "cat_smartphones",
        slug: "smartphones",
        name: {
            ru: "Смартфоны",
            uz: "Smartfonlar",
            en: "Smartphones"
        },
        icon: "Smartphone",
        parentSlug: "electronics",
        position: 0,
        isFeatured: false
    },
    {
        id: "cat_laptops",
        slug: "laptops",
        name: {
            ru: "Ноутбуки",
            uz: "Noutbuklar",
            en: "Laptops"
        },
        icon: "Laptop",
        parentSlug: "electronics",
        position: 1,
        isFeatured: false
    },
    {
        id: "cat_headphones",
        slug: "headphones",
        name: {
            ru: "Наушники",
            uz: "Quloqchinlar",
            en: "Headphones"
        },
        icon: "Headphones",
        parentSlug: "electronics",
        position: 2,
        isFeatured: false
    },
    {
        id: "cat_home-appliances",
        slug: "home-appliances",
        name: {
            ru: "Бытовая техника",
            uz: "Maishiy texnika",
            en: "Home Appliances"
        },
        icon: "Refrigerator",
        parentSlug: null,
        position: 1,
        isFeatured: true
    },
    {
        id: "cat_kitchen",
        slug: "kitchen",
        name: {
            ru: "Кухонная техника",
            uz: "Oshxona texnikasi",
            en: "Kitchen"
        },
        icon: "CookingPot",
        parentSlug: "home-appliances",
        position: 0,
        isFeatured: false
    },
    {
        id: "cat_climate",
        slug: "climate",
        name: {
            ru: "Климатическая техника",
            uz: "Iqlim texnikasi",
            en: "Climate"
        },
        icon: "Fan",
        parentSlug: "home-appliances",
        position: 1,
        isFeatured: false
    },
    {
        id: "cat_furniture",
        slug: "furniture",
        name: {
            ru: "Мебель",
            uz: "Mebel",
            en: "Furniture"
        },
        icon: "Sofa",
        parentSlug: null,
        position: 2,
        isFeatured: true
    },
    {
        id: "cat_fashion",
        slug: "fashion",
        name: {
            ru: "Модный базар",
            uz: "Moda bozori",
            en: "Fashion"
        },
        icon: "Shirt",
        parentSlug: null,
        position: 3,
        isFeatured: true
    },
    {
        id: "cat_men",
        slug: "men",
        name: {
            ru: "Мужская одежда",
            uz: "Erkaklar kiyimi",
            en: "Menswear"
        },
        icon: "Shirt",
        parentSlug: "fashion",
        position: 0,
        isFeatured: false
    },
    {
        id: "cat_women",
        slug: "women",
        name: {
            ru: "Женская одежда",
            uz: "Ayollar kiyimi",
            en: "Womenswear"
        },
        icon: "Shirt",
        parentSlug: "fashion",
        position: 1,
        isFeatured: false
    },
    {
        id: "cat_kids",
        slug: "kids",
        name: {
            ru: "Детский мир",
            uz: "Bolalar dunyosi",
            en: "Kids"
        },
        icon: "Baby",
        parentSlug: null,
        position: 4,
        isFeatured: true
    }
];
}),
"[project]/src/lib/mock-data/banners.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BANNERS",
    ()=>BANNERS
]);
const BANNERS = [
    {
        id: "banner_summer",
        title: "Летняя коллекция",
        subtitle: "Скидки до −50% на летний ассортимент",
        image: "/images/banners/summer-collection.svg",
        link: "/catalog/fashion"
    },
    {
        id: "banner_low-price",
        title: "Гарантия низких цен",
        subtitle: "Вернём разницу, если найдёте дешевле",
        image: "/images/banners/low-price-guarantee.svg",
        link: "/catalog"
    },
    {
        id: "banner_electronics",
        title: "Техника со скидкой",
        subtitle: "Смартфоны, ноутбуки и не только",
        image: "/images/banners/electronics-sale.svg",
        link: "/catalog/electronics"
    }
];
}),
"[project]/src/lib/orders-store.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ordersStore",
    ()=>ordersStore
]);
const globalForOrders = globalThis;
const orders = globalForOrders.mockOrders ?? new Map();
if ("TURBOPACK compile-time truthy", 1) globalForOrders.mockOrders = orders;
let nextOrderSeq = 10001;
function generateOrderNumber() {
    const year = new Date().getFullYear();
    return `UZM-${year}-${nextOrderSeq++}`;
}
const DELIVERY_FEE_COURIER = 25000;
const ordersStore = {
    create (input) {
        const subtotal = input.items.reduce((sum, item)=>sum + item.price * item.quantity, 0);
        const deliveryFee = input.deliveryMethod === "COURIER" ? DELIVERY_FEE_COURIER : 0;
        const now = new Date().toISOString();
        const order = {
            id: `order_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            orderNumber: generateOrderNumber(),
            userId: input.userId,
            status: "PENDING",
            items: input.items,
            subtotal,
            deliveryFee,
            total: subtotal + deliveryFee,
            paymentMethod: input.paymentMethod,
            paymentStatus: "PENDING",
            deliveryMethod: input.deliveryMethod,
            pickupPointId: input.pickupPointId,
            address: input.address,
            note: input.note,
            statusHistory: [
                {
                    status: "PENDING",
                    comment: "Заказ создан",
                    createdAt: now
                }
            ],
            createdAt: now
        };
        orders.set(order.id, order);
        return order;
    },
    findById (id) {
        return orders.get(id) ?? null;
    },
    findByUser (userId) {
        return [
            ...orders.values()
        ].filter((o)=>o.userId === userId).sort((a, b)=>b.createdAt.localeCompare(a.createdAt));
    },
    /** Admin/seller only - customers never see other people's orders. */ listAllForAdmin () {
        return [
            ...orders.values()
        ].sort((a, b)=>b.createdAt.localeCompare(a.createdAt));
    },
    updateStatus (orderId, status, comment) {
        const order = orders.get(orderId);
        if (!order) return null;
        order.status = status;
        order.statusHistory.push({
            status,
            comment: comment ?? null,
            createdAt: new Date().toISOString()
        });
        if (status !== "CANCELLED" && status !== "PENDING") order.paymentStatus = "PAID";
        return order;
    }
};
}),
"[project]/src/lib/admin-store.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminBanners",
    ()=>adminBanners,
    "adminCategories",
    ()=>adminCategories,
    "adminOrders",
    ()=>adminOrders,
    "adminProducts",
    ()=>adminProducts,
    "adminReviews",
    ()=>adminReviews
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data/products.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data/categories.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$banners$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data/banners.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orders-store.ts [app-rsc] (ecmascript)");
;
;
;
;
const globalForAdmin = globalThis;
const productStatus = globalForAdmin.productStatusOverrides ?? new Map();
const reviewStatus = globalForAdmin.reviewStatusOverrides ?? new Map();
const categories = globalForAdmin.mutableCategories ?? [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CATEGORIES"]
];
const banners = globalForAdmin.mutableBanners ?? [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$banners$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BANNERS"]
];
if ("TURBOPACK compile-time truthy", 1) {
    globalForAdmin.productStatusOverrides = productStatus;
    globalForAdmin.reviewStatusOverrides = reviewStatus;
    globalForAdmin.mutableCategories = categories;
    globalForAdmin.mutableBanners = banners;
}
const adminProducts = {
    list () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCTS"].map((p)=>({
                ...p,
                status: productStatus.get(p.id) ?? "PUBLISHED"
            }));
    },
    setStatus (productId, status) {
        productStatus.set(productId, status);
    }
};
const adminOrders = {
    listAll () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ordersStore"].listAllForAdmin();
    },
    updateStatus (orderId, status, comment) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ordersStore"].updateStatus(orderId, status, comment);
    }
};
const adminCategories = {
    list () {
        return categories;
    },
    create (input) {
        const node = {
            ...input,
            id: `cat_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
        };
        categories.push(node);
        return node;
    },
    update (id, patch) {
        const node = categories.find((c)=>c.id === id);
        if (!node) return null;
        Object.assign(node, patch);
        return node;
    },
    remove (id) {
        const idx = categories.findIndex((c)=>c.id === id);
        if (idx === -1) return false;
        // Refuse to delete a category that still has children - avoids orphaning them.
        if (categories.some((c)=>c.parentSlug === categories[idx].slug)) return false;
        categories.splice(idx, 1);
        return true;
    }
};
const adminReviews = {
    list () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCTS"].flatMap((p)=>p.reviews.map((r)=>({
                    ...r,
                    productId: p.id,
                    productName: p.name,
                    productSlug: p.slug,
                    status: reviewStatus.get(r.id) ?? "APPROVED"
                })));
    },
    setStatus (reviewId, status) {
        reviewStatus.set(reviewId, status);
    }
};
const adminBanners = {
    list () {
        return banners;
    },
    create (input) {
        const banner = {
            ...input,
            id: `banner_${Date.now()}`
        };
        banners.push(banner);
        return banner;
    },
    remove (id) {
        const idx = banners.findIndex((b)=>b.id === id);
        if (idx === -1) return false;
        banners.splice(idx, 1);
        return true;
    }
};
}),
"[project]/src/lib/queries.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBanners",
    ()=>getBanners,
    "getBrandBySlug",
    ()=>getBrandBySlug,
    "getBrands",
    ()=>getBrands,
    "getCategoryBreadcrumb",
    ()=>getCategoryBreadcrumb,
    "getCategoryBySlug",
    ()=>getCategoryBySlug,
    "getCategoryTree",
    ()=>getCategoryTree,
    "getDiscountedProducts",
    ()=>getDiscountedProducts,
    "getFeaturedCategories",
    ()=>getFeaturedCategories,
    "getNewProducts",
    ()=>getNewProducts,
    "getPopularProducts",
    ()=>getPopularProducts,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProductSummariesByIdsSync",
    ()=>getProductSummariesByIdsSync,
    "getProducts",
    ()=>getProducts,
    "getRelatedProducts",
    ()=>getRelatedProducts,
    "toProductSummary",
    ()=>toProductSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data/products.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$brands$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data/brands.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin-store.ts [app-rsc] (ecmascript)");
;
;
;
async function getCategoryTree() {
    const all = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminCategories"].list();
    const roots = all.filter((c)=>c.parentSlug === null).sort((a, b)=>a.position - b.position);
    return roots.map((root)=>({
            ...root,
            children: all.filter((c)=>c.parentSlug === root.slug).sort((a, b)=>a.position - b.position)
        }));
}
async function getFeaturedCategories() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminCategories"].list().filter((c)=>c.parentSlug === null && c.isFeatured).sort((a, b)=>a.position - b.position);
}
async function getCategoryBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminCategories"].list().find((c)=>c.slug === slug) ?? null;
}
async function getCategoryBreadcrumb(slug) {
    const all = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminCategories"].list();
    const chain = [];
    let current = all.find((c)=>c.slug === slug) ?? null;
    while(current){
        chain.unshift(current);
        current = current.parentSlug ? all.find((c)=>c.slug === current.parentSlug) ?? null : null;
    }
    return chain;
}
/** A category slug plus every descendant slug (for "all products in Electronics incl. subcategories"). */ function expandCategorySlugs(slug) {
    const all = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminCategories"].list();
    const node = all.find((c)=>c.slug === slug);
    if (!node) return [
        slug
    ];
    if (node.parentSlug !== null) return [
        slug
    ]; // leaf/subcategory - exact match only
    const children = all.filter((c)=>c.parentSlug === slug).map((c)=>c.slug);
    return [
        slug,
        ...children
    ];
}
async function getBrands() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$brands$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRANDS"];
}
async function getBanners() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminBanners"].list();
}
// ------------------------------------------------------------------
// Products
// ------------------------------------------------------------------
function cheapestVariant(product) {
    return product.variants.reduce((min, v)=>v.price < min.price ? v : min, product.variants[0]);
}
function toProductSummary(product) {
    const variant = cheapestVariant(product);
    const rating = product.reviews.length ? Math.round(product.reviews.reduce((sum, r)=>sum + r.rating, 0) / product.reviews.length * 10) / 10 : 0;
    const discountPercent = variant.compareAtPrice ? Math.round((variant.compareAtPrice - variant.price) / variant.compareAtPrice * 100) : null;
    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0]?.url ?? "",
        price: variant.price,
        compareAtPrice: variant.compareAtPrice,
        discountPercent,
        installmentPrice: variant.installmentPrice,
        installmentMonths: variant.installmentMonths,
        rating,
        reviewCount: product.reviews.length,
        isNew: product.isNew,
        isOriginal: product.isOriginal,
        hasLowPriceGuarantee: product.hasLowPriceGuarantee,
        deliveryDays: product.deliveryDays,
        salesCount: product.salesCount,
        categorySlug: product.categorySlug,
        brandSlug: product.brandSlug
    };
}
function sortSummaries(items, sort) {
    const sorted = [
        ...items
    ];
    switch(sort){
        case "price_asc":
            return sorted.sort((a, b)=>a.price - b.price);
        case "price_desc":
            return sorted.sort((a, b)=>b.price - a.price);
        case "rating":
            return sorted.sort((a, b)=>b.rating - a.rating);
        case "new":
            return sorted.sort((a, b)=>Number(b.isNew) - Number(a.isNew));
        case "discount":
            return sorted.sort((a, b)=>(b.discountPercent ?? 0) - (a.discountPercent ?? 0));
        case "popular":
        default:
            return sorted.sort((a, b)=>b.salesCount - a.salesCount);
    }
}
async function getProducts(filters = {}) {
    const categorySlugs = filters.categorySlug ? new Set(expandCategorySlugs(filters.categorySlug)) : null;
    const search = filters.search?.trim().toLowerCase();
    const statusById = new Map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminProducts"].list().map((p)=>[
            p.id,
            p.status
        ]));
    let summaries = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCTS"].filter((p)=>{
        if (statusById.get(p.id) !== "PUBLISHED") return false;
        if (categorySlugs && !categorySlugs.has(p.categorySlug)) return false;
        if (search && !p.name.toLowerCase().includes(search) && !p.shortDescription.toLowerCase().includes(search)) {
            return false;
        }
        return true;
    }).map(toProductSummary);
    // Compute available brands + price range from the category/search-filtered set,
    // BEFORE price/brand/rating filters are applied - so the filter UI always shows
    // every option relevant to the current category/search, not just currently visible ones.
    const availableBrandSlugs = new Set(summaries.map((s)=>s.brandSlug));
    const availableBrands = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$brands$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRANDS"].filter((b)=>availableBrandSlugs.has(b.slug));
    const priceRange = summaries.reduce((acc, s)=>({
            min: Math.min(acc.min, s.price),
            max: Math.max(acc.max, s.price)
        }), {
        min: Infinity,
        max: 0
    });
    if (filters.minPrice !== undefined) summaries = summaries.filter((s)=>s.price >= filters.minPrice);
    if (filters.maxPrice !== undefined) summaries = summaries.filter((s)=>s.price <= filters.maxPrice);
    if (filters.brandSlugs?.length) summaries = summaries.filter((s)=>filters.brandSlugs.includes(s.brandSlug));
    if (filters.minRating !== undefined) summaries = summaries.filter((s)=>s.rating >= filters.minRating);
    summaries = sortSummaries(summaries, filters.sort ?? "popular");
    return {
        items: summaries,
        availableBrands,
        priceRange: priceRange.min === Infinity ? {
            min: 0,
            max: 0
        } : priceRange
    };
}
async function getProductBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCTS"].find((p)=>p.slug === slug) ?? null;
}
function publishedProducts() {
    const statusById = new Map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminProducts"].list().map((p)=>[
            p.id,
            p.status
        ]));
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCTS"].filter((p)=>statusById.get(p.id) === "PUBLISHED");
}
async function getRelatedProducts(product, limit = 5) {
    return publishedProducts().filter((p)=>p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, limit).map(toProductSummary);
}
async function getPopularProducts(limit = 5) {
    return publishedProducts().map(toProductSummary).sort((a, b)=>b.salesCount - a.salesCount).slice(0, limit);
}
async function getNewProducts(limit = 5) {
    return publishedProducts().filter((p)=>p.isNew).map(toProductSummary).slice(0, limit);
}
async function getDiscountedProducts(limit = 5) {
    return publishedProducts().map(toProductSummary).filter((s)=>s.discountPercent !== null).sort((a, b)=>(b.discountPercent ?? 0) - (a.discountPercent ?? 0)).slice(0, limit);
}
async function getBrandBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$brands$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRANDS"].find((b)=>b.slug === slug) ?? null;
}
function getProductSummariesByIdsSync(ids) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCTS"].filter((p)=>ids.includes(p.id)).map(toProductSummary);
}
}),
"[project]/src/components/layout/SearchBar.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "SearchBar",
    ()=>SearchBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SearchBar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SearchBar() from the server but SearchBar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/SearchBar.tsx <module evaluation>", "SearchBar");
}),
"[project]/src/components/layout/SearchBar.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "SearchBar",
    ()=>SearchBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SearchBar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SearchBar() from the server but SearchBar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/SearchBar.tsx", "SearchBar");
}),
"[project]/src/components/layout/SearchBar.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SearchBar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/layout/SearchBar.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SearchBar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/layout/SearchBar.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SearchBar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/layout/LocaleSwitcher.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "LocaleSwitcher",
    ()=>LocaleSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const LocaleSwitcher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call LocaleSwitcher() from the server but LocaleSwitcher is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/LocaleSwitcher.tsx <module evaluation>", "LocaleSwitcher");
}),
"[project]/src/components/layout/LocaleSwitcher.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "LocaleSwitcher",
    ()=>LocaleSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const LocaleSwitcher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call LocaleSwitcher() from the server but LocaleSwitcher is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/LocaleSwitcher.tsx", "LocaleSwitcher");
}),
"[project]/src/components/layout/LocaleSwitcher.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$LocaleSwitcher$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/layout/LocaleSwitcher.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$LocaleSwitcher$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/layout/LocaleSwitcher.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$LocaleSwitcher$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/layout/CategoryMegaMenu.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "CategoryMegaMenu",
    ()=>CategoryMegaMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CategoryMegaMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CategoryMegaMenu() from the server but CategoryMegaMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/CategoryMegaMenu.tsx <module evaluation>", "CategoryMegaMenu");
}),
"[project]/src/components/layout/CategoryMegaMenu.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "CategoryMegaMenu",
    ()=>CategoryMegaMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CategoryMegaMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CategoryMegaMenu() from the server but CategoryMegaMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/CategoryMegaMenu.tsx", "CategoryMegaMenu");
}),
"[project]/src/components/layout/CategoryMegaMenu.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$CategoryMegaMenu$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/layout/CategoryMegaMenu.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$CategoryMegaMenu$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/layout/CategoryMegaMenu.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$CategoryMegaMenu$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/layout/CartBadge.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "CartBadge",
    ()=>CartBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CartBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CartBadge() from the server but CartBadge is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/CartBadge.tsx <module evaluation>", "CartBadge");
}),
"[project]/src/components/layout/CartBadge.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "CartBadge",
    ()=>CartBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CartBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CartBadge() from the server but CartBadge is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/CartBadge.tsx", "CartBadge");
}),
"[project]/src/components/layout/CartBadge.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$CartBadge$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/layout/CartBadge.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$CartBadge$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/layout/CartBadge.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$CartBadge$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/layout/FavoritesBadge.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "FavoritesBadge",
    ()=>FavoritesBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FavoritesBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FavoritesBadge() from the server but FavoritesBadge is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/FavoritesBadge.tsx <module evaluation>", "FavoritesBadge");
}),
"[project]/src/components/layout/FavoritesBadge.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "FavoritesBadge",
    ()=>FavoritesBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FavoritesBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FavoritesBadge() from the server but FavoritesBadge is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/FavoritesBadge.tsx", "FavoritesBadge");
}),
"[project]/src/components/layout/FavoritesBadge.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$FavoritesBadge$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/layout/FavoritesBadge.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$FavoritesBadge$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/layout/FavoritesBadge.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$FavoritesBadge$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/layout/Header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$server$2f$react$2d$server$2f$getTranslations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getTranslations$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/server/react-server/getTranslations.js [app-rsc] (ecmascript) <export default as getTranslations>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-rsc] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-rsc] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-rsc] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/queries.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SearchBar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/SearchBar.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$LocaleSwitcher$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/LocaleSwitcher.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$CategoryMegaMenu$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/CategoryMegaMenu.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$CartBadge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/CartBadge.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$FavoritesBadge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/FavoritesBadge.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
async function Header() {
    const t = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$server$2f$react$2d$server$2f$getTranslations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getTranslations$3e$__["getTranslations"])("common");
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    const categoryTree = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoryTree"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 bg-white shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden border-b border-gray-100 md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-gray-600",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "flex items-center gap-1 hover:text-brand",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 23,
                                    columnNumber: 13
                                }, this),
                                " Ташкент"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/pickup-points",
                                    className: "hover:text-brand",
                                    children: t("pickupPoints")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 26,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/seller/register",
                                    className: "hover:text-brand",
                                    children: t("becomeSeller")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/faq",
                                    className: "hover:text-brand",
                                    children: t("faq")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/account/orders",
                                    className: "hover:text-brand",
                                    children: t("myOrders")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$LocaleSwitcher$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LocaleSwitcher"], {}, void 0, false, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Header.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex max-w-7xl items-center gap-4 px-4 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "shrink-0 text-xl font-extrabold text-brand",
                        children: "uzum market"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$CategoryMegaMenu$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryMegaMenu"], {
                        tree: categoryTree,
                        label: t("catalog")
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SearchBar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SearchBar"], {
                        placeholder: t("search")
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex shrink-0 items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: session ? "/account/profile" : "/login",
                                className: "flex flex-col items-center text-gray-700 hover:text-brand",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        size: 22
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 58,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden text-[11px] sm:block",
                                        children: t("login")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$FavoritesBadge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FavoritesBadge"], {}, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$CartBadge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CartBadge"], {}, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden border-t border-gray-100 md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 text-sm",
                    children: [
                        categoryTree.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: `/catalog/${cat.slug}`,
                                className: "shrink-0 rounded-lg px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-brand",
                                children: cat.name.ru
                            }, cat.slug, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/catalog",
                            className: "ml-auto flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-brand",
                            children: [
                                "Ещё ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 82,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Header.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Header.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/Footer.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$server$2f$react$2d$server$2f$getTranslations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getTranslations$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/server/react-server/getTranslations.js [app-rsc] (ecmascript) <export default as getTranslations>");
;
;
;
async function Footer() {
    const t = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$server$2f$react$2d$server$2f$getTranslations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getTranslations$3e$__["getTranslations"])("footer");
    const columns = [
        {
            title: t("about"),
            links: [
                {
                    href: "/pickup-points",
                    label: "Пункты выдачи"
                },
                {
                    href: "/careers",
                    label: "Вакансии"
                },
                {
                    href: "/pages/about",
                    label: "О компании"
                }
            ]
        },
        {
            title: t("forUsers"),
            links: [
                {
                    href: "/pages/contacts",
                    label: "Связаться с нами"
                },
                {
                    href: "/faq",
                    label: "Вопрос-Ответ"
                },
                {
                    href: "/pages/returns",
                    label: "Возврат товара"
                }
            ]
        },
        {
            title: t("forBusiness"),
            links: [
                {
                    href: "/seller/register",
                    label: "Продавайте на Uzum"
                },
                {
                    href: "/login?role=seller",
                    label: "Вход для продавцов"
                },
                {
                    href: "/pages/open-pickup-point",
                    label: "Открыть пункт выдачи"
                }
            ]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "mt-12 border-t border-gray-200 bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 md:grid-cols-4",
                children: [
                    columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "mb-3 text-sm font-semibold text-gray-900",
                                    children: col.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2",
                                    children: col.links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-sm text-gray-500 hover:text-brand",
                                                children: link.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Footer.tsx",
                                                lineNumber: 43,
                                                columnNumber: 19
                                            }, this)
                                        }, link.href, false, {
                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                            lineNumber: 42,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, col.title, true, {
                            fileName: "[project]/src/components/layout/Footer.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "mb-3 text-sm font-semibold text-gray-900",
                                children: t("getApp")
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Footer.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500",
                                        children: "App Store"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Footer.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500",
                                        children: "Google Play"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Footer.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Footer.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Footer.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-100 px-4 py-4 text-center text-xs text-gray-400",
                children: t("copyright", {
                    year: new Date().getFullYear()
                })
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/MobileNav.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "MobileNav",
    ()=>MobileNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const MobileNav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call MobileNav() from the server but MobileNav is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/MobileNav.tsx <module evaluation>", "MobileNav");
}),
"[project]/src/components/layout/MobileNav.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "MobileNav",
    ()=>MobileNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const MobileNav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call MobileNav() from the server but MobileNav is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/MobileNav.tsx", "MobileNav");
}),
"[project]/src/components/layout/MobileNav.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$MobileNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/layout/MobileNav.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$MobileNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/layout/MobileNav.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$MobileNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/(storefront)/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StorefrontLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Header.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Footer.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$MobileNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/MobileNav.tsx [app-rsc] (ecmascript)");
;
;
;
;
function StorefrontLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                fileName: "[project]/src/app/(storefront)/layout.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "min-h-screen pb-16 md:pb-0",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/(storefront)/layout.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                fileName: "[project]/src/app/(storefront)/layout.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$MobileNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MobileNav"], {}, void 0, false, {
                fileName: "[project]/src/app/(storefront)/layout.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3b9f58df._.js.map