"use server";

import bcrypt from "bcryptjs";
import { requestOtpSchema, verifyOtpSchema, registerSchema, changePasswordSchema } from "@/schemas/auth";
import { sendOtp } from "@/lib/sms";
import { checkOtpRateLimit, peekOtp } from "@/lib/otp-store";
import { logger } from "@/lib/logger";
import { mockDb } from "@/lib/mock-db";
import { auth } from "@/lib/auth";

export async function requestOtpAction(input: unknown) {
  const parsed = requestOtpSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Некорректные данные" };
  }
  const { phone } = parsed.data;

  if (!checkOtpRateLimit(phone)) {
    return { success: false, error: "Слишком много попыток. Попробуйте позже." };
  }

  try {
    await sendOtp(phone);
    return { success: true };
  } catch (err) {
    logger.error({ err, phone }, "requestOtpAction failed");
    return { success: false, error: "Не удалось отправить код. Попробуйте позже." };
  }
}

export async function verifyOtpAction(input: unknown) {
  const parsed = verifyOtpSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Некорректные данные" };
  }
  // Actual sign-in happens client-side via next-auth's signIn("phone-otp", ...)
  // using the same phone/code - this action only validates shape ahead of that call.
  return { success: true, data: parsed.data };
}

export async function registerAction(input: unknown) {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Некорректные данные" };
  }
  const { phone, code, name, email, password } = parsed.data;

  // Non-destructive check: the real (consuming) verification happens a
  // moment later when the client calls signIn("phone-otp", ...) - see
  // src/lib/otp-store.ts for why this is split in two.
  if (!peekOtp(phone, code)) {
    return { success: false, error: "Неверный код" };
  }

  const user = await mockDb.users.upsertByPhone(phone);
  const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
  await mockDb.users.completeProfile(user.id, { name, email: email || undefined, passwordHash });

  return { success: true };
}

export async function changePasswordAction(input: unknown) {
  const session = await auth();
  if (!session?.user) {
    return { success: false, error: "Необходимо войти в аккаунт" };
  }

  const parsed = changePasswordSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Некорректные данные" };
  }
  const { currentPassword, newPassword } = parsed.data;

  const user = await mockDb.users.findById(session.user.id);
  if (!user) return { success: false, error: "Пользователь не найден" };

  if (user.passwordHash) {
    // Account already has a password - the current one must be confirmed
    // before it can be changed.
    if (!currentPassword) {
      return { success: false, error: "Введите текущий пароль" };
    }
    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) {
      return { success: false, error: "Неверный текущий пароль" };
    }
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  await mockDb.users.setPasswordHash(user.id, newHash);
  return { success: true };
}
