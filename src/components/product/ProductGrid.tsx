"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import type { ProductSummary } from "@/lib/queries";

const PAGE_SIZE = 10;

export function ProductGrid({ items }: { items: ProductSummary[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center text-gray-400">
        Ничего не найдено. Попробуйте изменить фильтры.
      </div>
    );
  }

  const visible = items.slice(0, visibleCount);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {visibleCount < items.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:border-brand hover:text-brand"
          >
            Показать ещё ({items.length - visibleCount})
          </button>
        </div>
      )}
    </div>
  );
}
