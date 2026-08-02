"use client";

import { useState } from "react";
import { toast } from "sonner";
import { changePasswordAction } from "@/actions/auth";

export function ChangePasswordForm({ hasPassword }: { hasPassword: boolean }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await changePasswordAction({ currentPassword, newPassword, confirmPassword });
    setLoading(false);

    if (!res.success) {
      setError(res.error ?? "Не удалось сменить пароль");
      return;
    }
    toast.success(hasPassword ? "Пароль обновлён" : "Пароль установлен");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-3">
      {hasPassword && (
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Текущий пароль"
          autoComplete="current-password"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      )}
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Новый пароль"
        autoComplete="new-password"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Повторите новый пароль"
        autoComplete="new-password"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Сохранение..." : hasPassword ? "Сменить пароль" : "Установить пароль"}
      </button>
    </form>
  );
}
