module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/schemas/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "changePasswordSchema",
    ()=>changePasswordSchema,
    "forgotPasswordSchema",
    ()=>forgotPasswordSchema,
    "loginWithPasswordSchema",
    ()=>loginWithPasswordSchema,
    "phoneSchema",
    ()=>phoneSchema,
    "registerSchema",
    ()=>registerSchema,
    "requestOtpSchema",
    ()=>requestOtpSchema,
    "verifyOtpSchema",
    ()=>verifyOtpSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
;
const phoneSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\+998\d{9}$/, "Введите номер в формате +998XXXXXXXXX");
const requestOtpSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    phone: phoneSchema
});
const verifyOtpSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    phone: phoneSchema,
    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().length(6, "Код должен состоять из 6 цифр")
});
const passwordField = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8, "Минимум 8 символов");
const registerSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    phone: phoneSchema,
    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().length(6, "Код должен состоять из 6 цифр"),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, "Введите имя").max(100),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Некорректный email").optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("")),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("")),
    confirmPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("")),
    agreeToTerms: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal(true, {
        errorMap: ()=>({
                message: "Необходимо согласиться с условиями"
            })
    })
}).refine((data)=>!data.password || data.password.length >= 8, {
    message: "Пароль должен быть не короче 8 символов",
    path: [
        "password"
    ]
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: [
        "confirmPassword"
    ]
});
const loginWithPasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
    password: passwordField
});
const changePasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    currentPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("")),
    newPassword: passwordField,
    confirmPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
}).refine((data)=>data.newPassword === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: [
        "confirmPassword"
    ]
});
const forgotPasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    identifier: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(3)
});
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
"[project]/src/actions/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4000a45f82370c85b07d9d09e65cb28580ebe5868c":"verifyOtpAction","402eaf73b147e32e2dc68a71482dfd5fd41a71dd1d":"requestOtpAction","407638bb635ea70a2eb080e57081b883a79ecbd9d3":"changePasswordAction","4094db56ee71e4cb80de75d319de6930dc66667794":"registerAction"},"",""] */ __turbopack_context__.s([
    "changePasswordAction",
    ()=>changePasswordAction,
    "registerAction",
    ()=>registerAction,
    "requestOtpAction",
    ()=>requestOtpAction,
    "verifyOtpAction",
    ()=>verifyOtpAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$schemas$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/schemas/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sms.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$otp$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/otp-store.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
async function requestOtpAction(input) {
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$schemas$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requestOtpSchema"].safeParse(input);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.errors[0]?.message ?? "Некорректные данные"
        };
    }
    const { phone } = parsed.data;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$otp$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkOtpRateLimit"])(phone)) {
        return {
            success: false,
            error: "Слишком много попыток. Попробуйте позже."
        };
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendOtp"])(phone);
        return {
            success: true
        };
    } catch (err) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error({
            err,
            phone
        }, "requestOtpAction failed");
        return {
            success: false,
            error: "Не удалось отправить код. Попробуйте позже."
        };
    }
}
async function verifyOtpAction(input) {
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$schemas$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyOtpSchema"].safeParse(input);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.errors[0]?.message ?? "Некорректные данные"
        };
    }
    // Actual sign-in happens client-side via next-auth's signIn("phone-otp", ...)
    // using the same phone/code - this action only validates shape ahead of that call.
    return {
        success: true,
        data: parsed.data
    };
}
async function registerAction(input) {
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$schemas$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerSchema"].safeParse(input);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.errors[0]?.message ?? "Некорректные данные"
        };
    }
    const { phone, code, name, email, password } = parsed.data;
    // Non-destructive check: the real (consuming) verification happens a
    // moment later when the client calls signIn("phone-otp", ...) - see
    // src/lib/otp-store.ts for why this is split in two.
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$otp$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["peekOtp"])(phone, code)) {
        return {
            success: false,
            error: "Неверный код"
        };
    }
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockDb"].users.upsertByPhone(phone);
    const passwordHash = password ? await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].hash(password, 10) : undefined;
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockDb"].users.completeProfile(user.id, {
        name,
        email: email || undefined,
        passwordHash
    });
    return {
        success: true
    };
}
async function changePasswordAction(input) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user) {
        return {
            success: false,
            error: "Необходимо войти в аккаунт"
        };
    }
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$schemas$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["changePasswordSchema"].safeParse(input);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.errors[0]?.message ?? "Некорректные данные"
        };
    }
    const { currentPassword, newPassword } = parsed.data;
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockDb"].users.findById(session.user.id);
    if (!user) return {
        success: false,
        error: "Пользователь не найден"
    };
    if (user.passwordHash) {
        // Account already has a password - the current one must be confirmed
        // before it can be changed.
        if (!currentPassword) {
            return {
                success: false,
                error: "Введите текущий пароль"
            };
        }
        const valid = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].compare(currentPassword, user.passwordHash);
        if (!valid) {
            return {
                success: false,
                error: "Неверный текущий пароль"
            };
        }
    }
    const newHash = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].hash(newPassword, 10);
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockDb"].users.setPasswordHash(user.id, newHash);
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    requestOtpAction,
    verifyOtpAction,
    registerAction,
    changePasswordAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(requestOtpAction, "402eaf73b147e32e2dc68a71482dfd5fd41a71dd1d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(verifyOtpAction, "4000a45f82370c85b07d9d09e65cb28580ebe5868c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerAction, "4094db56ee71e4cb80de75d319de6930dc66667794", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(changePasswordAction, "407638bb635ea70a2eb080e57081b883a79ecbd9d3", null);
}),
"[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/auth.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/auth.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/auth.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "402eaf73b147e32e2dc68a71482dfd5fd41a71dd1d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requestOtpAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$auth$292f$login$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => "[project]/src/actions/auth.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/auth.ts [app-rsc] (ecmascript)");
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(auth)/login/page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(auth)/login/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(auth)/login/page.tsx <module evaluation>", "default");
}),
"[project]/src/app/(auth)/login/page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(auth)/login/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(auth)/login/page.tsx", "default");
}),
"[project]/src/app/(auth)/login/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$login$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/(auth)/login/page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$login$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/(auth)/login/page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$login$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/(auth)/login/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(auth)/login/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a0ca562a._.js.map