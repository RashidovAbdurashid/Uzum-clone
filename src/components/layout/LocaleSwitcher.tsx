"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const LOCALES = [
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "uz", label: "O'zbek", flag: "🇺🇿" },
  { code: "en", label: "English", flag: "🇬🇧" },
] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function setLocale(code: string) {
    document.cookie = `locale=${code}; path=/; max-age=31536000`;
    startTransition(() => router.refresh());
  }

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLocale(l.code)}
          disabled={isPending}
          className={`rounded px-1.5 py-0.5 ${locale === l.code ? "font-semibold text-brand" : "text-gray-500"}`}
          title={l.label}
        >
          {l.flag}
        </button>
      ))}
    </div>
  );
}
