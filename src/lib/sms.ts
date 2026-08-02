import { storeOtp, checkAndConsumeOtp } from "./otp-store";
import { logger } from "./logger";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getEskizToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.token;

  const res = await fetch(`${process.env.ESKIZ_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.ESKIZ_EMAIL,
      password: process.env.ESKIZ_PASSWORD,
    }),
  });
  if (!res.ok) throw new Error(`Eskiz auth failed: ${res.status}`);
  const data = await res.json();
  cachedToken = { token: data.data.token, expiresAt: Date.now() + 25 * 24 * 60 * 60 * 1000 };
  return cachedToken.token;
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/** Generates and sends a 6-digit OTP to the given phone, storing it in memory for verification. */
export async function sendOtp(phone: string): Promise<void> {
  const code = generateOtp();
  storeOtp(phone, code);

  if (process.env.NODE_ENV === "development") {
    // In dev, skip real SMS sending and just log - avoids burning Eskiz credits
    // and lets you log in without a real SMS provider configured at all.
    logger.info({ phone, code }, "DEV OTP (not sent via SMS) - use this code to log in");
    return;
  }

  try {
    const token = await getEskizToken();
    const res = await fetch(`${process.env.ESKIZ_BASE_URL}/message/sms/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mobile_phone: phone.replace("+", ""),
        message: `Uzum Market: код подтверждения ${code}`,
        from: "4546",
      }),
    });
    if (!res.ok) throw new Error(`Eskiz send failed: ${res.status}`);
  } catch (err) {
    logger.error({ err, phone }, "Failed to send OTP via Eskiz");
    throw new Error("Не удалось отправить SMS. Попробуйте позже.");
  }
}

export async function verifyOtp(phone: string, code: string): Promise<boolean> {
  return checkAndConsumeOtp(phone, code);
}
