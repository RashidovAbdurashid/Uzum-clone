import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a number as "1 500 000 сўм" per spec section 1.4 */
export function formatPrice(value: number | string, locale: "ru" | "uz" | "en" = "ru"): string {
  const n = typeof value === "string" ? parseFloat(value) : value;
  const formatted = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n).replace(/,/g, " ");
  const suffix = { ru: "сўм", uz: "so'm", en: "UZS" }[locale];
  return `${formatted} ${suffix}`;
}

/** "Завтра" for next-day delivery, otherwise a formatted date like "3 августа" */
export function formatDeliveryLabel(days: number): string {
  if (days <= 1) return "Завтра";
  const date = new Date();
  date.setDate(date.getDate() + days);
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(date);
}
