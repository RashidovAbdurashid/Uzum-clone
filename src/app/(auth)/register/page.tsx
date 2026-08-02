"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { requestOtpAction, registerAction } from "@/actions/auth";
import { phoneSchema } from "@/schemas/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState<"phone" | "profile">("phone");
  const [phone, setPhone] = useState("+998");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = phoneSchema.safeParse(phone);
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    setLoading(true);
    const res = await requestOtpAction({ phone });
    setLoading(false);

    if (!res.success) {
      setError(res.error ?? "Ошибка");
      return;
    }
    setStep("profile");
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await registerAction({
      phone,
      code,
      name,
      email,
      password,
      confirmPassword,
      agreeToTerms,
    });

    if (!res.success) {
      setLoading(false);
      setError(res.error ?? "Не удалось зарегистрироваться");
      return;
    }

    // Real (consuming) OTP verification happens here, right after
    // registerAction's non-destructive check - see src/actions/auth.ts.
    const signInRes = await signIn("phone-otp", { phone, code, redirect: false });
    setLoading(false);

    if (signInRes?.error) {
      setError("Регистрация прошла, но вход не удался. Попробуйте войти вручную.");
      return;
    }
    router.push("/account/profile");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Регистрация
      </h1>

      {step === "phone" ? (
        <form onSubmit={handleSendCode} className="space-y-4">
          <input
            type="tel"
            value={"+998901234567"}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+998901234567"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Отправка..." : "Получить код"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <p className="text-sm text-gray-500">Код отправлен на {phone}</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Код из SMS"
            maxLength={6}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-lg tracking-widest outline-none focus:border-brand"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            autoComplete="name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (необязательно)"
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль (необязательно, для входа по email)"
            autoComplete="new-password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Повторите пароль"
            autoComplete="new-password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand"
          />
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
            />
            Согласен с условиями использования и политикой конфиденциальности
          </label>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-gray-500">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="text-brand hover:underline">
          Войти
        </Link>
      </p>
    </div>
  );
}
