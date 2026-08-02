// Temporary stand-in for Redis (see src/lib/mock-db.ts for the equivalent
// note on Prisma). Stores OTP codes and rate-limit counters in memory, keyed
// by phone number, with manual TTL expiry. Resets on server restart - fine
// for local dev, not for production (swap back to ioredis when you add Redis).

interface OtpEntry {
  code: string;
  expiresAt: number;
}

interface RateEntry {
  count: number;
  expiresAt: number;
}

const globalForOtp = globalThis as unknown as {
  otpStore: Map<string, OtpEntry> | undefined;
  otpRateStore: Map<string, RateEntry> | undefined;
};

const otpStore = globalForOtp.otpStore ?? new Map<string, OtpEntry>();
const rateStore = globalForOtp.otpRateStore ?? new Map<string, RateEntry>();
if (process.env.NODE_ENV !== "production") {
  globalForOtp.otpStore = otpStore;
  globalForOtp.otpRateStore = rateStore;
}

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export function storeOtp(phone: string, code: string): void {
  otpStore.set(phone, { code, expiresAt: Date.now() + OTP_TTL_MS });
}

export function checkAndConsumeOtp(phone: string, code: string): boolean {
  const entry = otpStore.get(phone);
  if (!entry || entry.expiresAt < Date.now() || entry.code !== code) return false;
  otpStore.delete(phone);
  return true;
}

/**
 * Checks the code WITHOUT consuming it. Used by the registration Server
 * Action, which needs to validate the code server-side before it can safely
 * create/update the user record - but the actual sign-in (and the real,
 * consuming verification) still happens via signIn("phone-otp", ...) on the
 * client right after, so the code must survive this check.
 */
export function peekOtp(phone: string, code: string): boolean {
  const entry = otpStore.get(phone);
  return !!entry && entry.expiresAt >= Date.now() && entry.code === code;
}

/** Returns true if the phone is within its rate limit (and increments the counter). */
export function checkOtpRateLimit(phone: string): boolean {
  const now = Date.now();
  const entry = rateStore.get(phone);
  if (!entry || entry.expiresAt < now) {
    rateStore.set(phone, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= RATE_LIMIT_MAX;
}
