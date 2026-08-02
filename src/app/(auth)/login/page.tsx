"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { requestOtpAction } from "@/actions/auth";
import { phoneSchema, loginWithPasswordSchema } from "@/schemas/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [mode, setMode] = useState<"phone" | "email">("phone");

  // Phone + OTP state
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("+998");
  const [code, setCode] = useState("");

  // Email + password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function switchMode(next: "phone" | "email") {
    setMode(next);
    setError(null);
    setStep("phone");
  }

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
    setStep("code");
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("phone-otp", { phone, code, redirect: false });
    setLoading(false);

    if (res?.error) {
      setError("Неверный код. Попробуйте снова.");
      return;
    }
    router.push(callbackUrl);
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = loginWithPasswordSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (res?.error) {
      setError("Неверный email или пароль.");
      return;
    }
    router.push(callbackUrl);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
        Вход
      </h1>

      <div className="mb-6 flex justify-center gap-1 rounded-lg bg-gray-100 p-1 text-sm">
        <button
          onClick={() => switchMode("phone")}
          className={`rounded-md px-4 py-1.5 font-medium transition ${
            mode === "phone" ? "bg-white text-brand shadow-sm" : "text-gray-500"
          }`}
        >
          Телефон
        </button>
        <button
          onClick={() => switchMode("email")}
          className={`rounded-md px-4 py-1.5 font-medium transition ${
            mode === "email" ? "bg-white text-brand shadow-sm" : "text-gray-500"
          }`}
        >
          Email
        </button>
      </div>

      {mode === "phone" ? (
        step === "phone" ? (
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
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-sm text-gray-500">Код отправлен на {phone}</p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-xl tracking-widest outline-none focus:border-brand"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand py-3 font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Проверка..." : "Подтвердить"}
            </button>
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="w-full text-center text-sm text-gray-500"
            >
              Изменить номер
            </button>
          </form>
        )
      ) : (
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            value={"admin@uzum-clone.local"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand"
          />
          <input
            type="password"
            value={"ChangeMe123!"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            autoComplete="current-password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
          <p className="text-center text-xs text-gray-400">
            Тестовый доступ: admin@uzum-clone.local / ChangeMe123!
          </p>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-gray-500">
        Нет аккаунта?{" "}
        <Link href="/register" className="text-brand hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
}
