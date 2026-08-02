import { z } from "zod";

// Uzbek phone numbers: +998 XX XXX XX XX
export const phoneSchema = z
  .string()
  .regex(/^\+998\d{9}$/, "Введите номер в формате +998XXXXXXXXX");

export const requestOtpSchema = z.object({
  phone: phoneSchema,
});

export const verifyOtpSchema = z.object({
  phone: phoneSchema,
  code: z.string().length(6, "Код должен состоять из 6 цифр"),
});

const passwordField = z.string().min(8, "Минимум 8 символов");

export const registerSchema = z
  .object({
    phone: phoneSchema,
    code: z.string().length(6, "Код должен состоять из 6 цифр"),
    name: z.string().min(2, "Введите имя").max(100),
    email: z.string().email("Некорректный email").optional().or(z.literal("")),
    password: z.string().optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: "Необходимо согласиться с условиями" }),
    }),
  })
  .refine((data) => !data.password || data.password.length >= 8, {
    message: "Пароль должен быть не короче 8 символов",
    path: ["password"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const loginWithPasswordSchema = z.object({
  email: z.string().email(),
  password: passwordField,
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().optional().or(z.literal("")), // not required if the account has no password yet
    newPassword: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  identifier: z.string().min(3), // phone or email
});

export type RequestOtpInput = z.infer<typeof requestOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginWithPasswordInput = z.infer<typeof loginWithPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
