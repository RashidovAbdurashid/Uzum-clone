(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__bf85e39e._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/lib/auth.config.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/constants/roles.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADMIN_SECTION_ROLE_MAP",
    ()=>ADMIN_SECTION_ROLE_MAP,
    "ROLES",
    ()=>ROLES,
    "ROUTE_ROLE_MAP",
    ()=>ROUTE_ROLE_MAP,
    "hasRole",
    ()=>hasRole
]);
const ROLES = {
    GUEST: "GUEST",
    CUSTOMER: "CUSTOMER",
    SELLER: "SELLER",
    MODERATOR: "MODERATOR",
    ADMIN: "ADMIN",
    SUPER_ADMIN: "SUPER_ADMIN"
};
const ROUTE_ROLE_MAP = [
    {
        prefix: "/admin",
        roles: [
            ROLES.MODERATOR,
            ROLES.ADMIN,
            ROLES.SUPER_ADMIN
        ]
    },
    {
        prefix: "/seller",
        roles: [
            ROLES.SELLER,
            ROLES.ADMIN,
            ROLES.SUPER_ADMIN
        ]
    },
    {
        prefix: "/account",
        roles: [
            ROLES.CUSTOMER,
            ROLES.SELLER,
            ROLES.MODERATOR,
            ROLES.ADMIN,
            ROLES.SUPER_ADMIN
        ]
    }
];
const ADMIN_SECTION_ROLE_MAP = [
    {
        prefix: "/admin/settings",
        roles: [
            ROLES.ADMIN,
            ROLES.SUPER_ADMIN
        ]
    },
    {
        prefix: "/admin/finance",
        roles: [
            ROLES.ADMIN,
            ROLES.SUPER_ADMIN
        ]
    },
    {
        prefix: "/admin/sellers",
        roles: [
            ROLES.ADMIN,
            ROLES.SUPER_ADMIN
        ]
    },
    {
        prefix: "/admin/users",
        roles: [
            ROLES.ADMIN,
            ROLES.SUPER_ADMIN
        ]
    },
    {
        prefix: "/admin/reviews",
        roles: [
            ROLES.MODERATOR,
            ROLES.ADMIN,
            ROLES.SUPER_ADMIN
        ]
    },
    {
        prefix: "/admin/products",
        roles: [
            ROLES.MODERATOR,
            ROLES.ADMIN,
            ROLES.SUPER_ADMIN
        ]
    }
];
function hasRole(userRole, allowed) {
    if (!userRole) return false;
    return allowed.includes(userRole);
}
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.config.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$roles$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/roles.ts [middleware-edge] (ecmascript)");
;
;
;
;
// Uses the edge-safe base config (no Prisma/ioredis) - see auth.config.ts.
const { auth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["authConfig"]);
const __TURBOPACK__default__export__ = auth((req)=>{
    const { pathname } = req.nextUrl;
    const role = req.auth?.user?.role;
    // Check fine-grained admin sections first (more specific prefixes).
    const adminSection = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$roles$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ADMIN_SECTION_ROLE_MAP"].find((r)=>pathname.startsWith(r.prefix));
    if (adminSection && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$roles$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["hasRole"])(role, adminSection.roles)) {
        return redirectToLogin(req.nextUrl, req.url);
    }
    const generalRule = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$roles$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ROUTE_ROLE_MAP"].find((r)=>pathname.startsWith(r.prefix));
    if (generalRule && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$roles$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["hasRole"])(role, generalRule.roles)) {
        return redirectToLogin(req.nextUrl, req.url);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
});
function redirectToLogin(currentUrl, base) {
    const loginUrl = new URL("/login", base);
    loginUrl.searchParams.set("callbackUrl", currentUrl.pathname);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl);
}
const config = {
    matcher: [
        "/admin/:path*",
        "/seller/:path*",
        "/account/:path*"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__bf85e39e._.js.map