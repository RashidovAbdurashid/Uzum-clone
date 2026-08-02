"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Brand } from "@/lib/queries";
import { formatPrice } from "@/lib/utils";

interface Props {
  availableBrands: Brand[];
  priceRange: { min: number; max: number };
}

export function FiltersSidebar({ availableBrands, priceRange }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const selectedBrands = searchParams.getAll("brand");
  const minRating = searchParams.get("minRating");

  function updateParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    router.push(`${pathname}?${params.toString()}`);
  }

  function applyPriceRange(e: React.FormEvent) {
    e.preventDefault();
    updateParams((params) => {
      if (minPrice) params.set("minPrice", minPrice);
      else params.delete("minPrice");
      if (maxPrice) params.set("maxPrice", maxPrice);
      else params.delete("maxPrice");
    });
  }

  function toggleBrand(slug: string) {
    updateParams((params) => {
      const current = params.getAll("brand");
      params.delete("brand");
      const next = current.includes(slug) ? current.filter((b) => b !== slug) : [...current, slug];
      next.forEach((b) => params.append("brand", b));
    });
  }

  function setMinRatingFilter(value: string) {
    updateParams((params) => {
      if (params.get("minRating") === value) params.delete("minRating");
      else params.set("minRating", value);
    });
  }

  function resetFilters() {
    setMinPrice("");
    setMaxPrice("");
    router.push(pathname);
  }

  const hasActiveFilters = searchParams.toString().length > 0;

  return (
    <aside className="w-full shrink-0 space-y-6 md:w-64">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Цена, сўм</h3>
        <form onSubmit={applyPriceRange} className="flex items-center gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder={String(priceRange.min || 0)}
            className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-brand"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder={String(priceRange.max || 0)}
            className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-brand"
          />
        </form>
        <button
          onClick={applyPriceRange}
          className="mt-2 w-full rounded-lg border border-gray-300 py-1.5 text-xs font-medium text-gray-600 hover:border-brand hover:text-brand"
        >
          Применить
        </button>
      </div>

      {availableBrands.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Бренд</h3>
          <div className="space-y-2">
            {availableBrands.map((brand) => (
              <label key={brand.slug} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.slug)}
                  onChange={() => toggleBrand(brand.slug)}
                  className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                />
                {brand.name}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Рейтинг</h3>
        <div className="space-y-2">
          {[4, 3].map((r) => (
            <button
              key={r}
              onClick={() => setMinRatingFilter(String(r))}
              className={`flex w-full items-center gap-1 rounded-lg px-2 py-1.5 text-left text-sm ${
                minRating === String(r) ? "bg-brand-light text-brand" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {"★".repeat(r)}
              {"☆".repeat(5 - r)} <span className="ml-1 text-gray-500">и выше</span>
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={resetFilters} className="text-sm text-brand hover:underline">
          Сбросить фильтры
        </button>
      )}

      <p className="text-xs text-gray-400">
        Диапазон цен в каталоге: {formatPrice(priceRange.min)} — {formatPrice(priceRange.max)}
      </p>
    </aside>
  );
}
