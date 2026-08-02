"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const OPTIONS: { value: string; label: string }[] = [
  { value: "popular", label: "По популярности" },
  { value: "price_asc", label: "Сначала дешевле" },
  { value: "price_desc", label: "Сначала дороже" },
  { value: "rating", label: "По рейтингу" },
  { value: "new", label: "По новизне" },
  { value: "discount", label: "По скидке" },
];

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "popular";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "popular") params.delete("sort");
    else params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={current}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-brand"
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
