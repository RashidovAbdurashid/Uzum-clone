"use client";

import { useFavoritesStore } from "@/stores/favorites-store";
import { getProductSummariesByIdsSync } from "@/lib/queries";
import { ProductGrid } from "@/components/product/ProductGrid";

export default function FavoritesPage() {
  const productIds = useFavoritesStore((s) => s.productIds);
  const items = getProductSummariesByIdsSync(productIds);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-xl font-bold text-gray-900">Избранное ({items.length})</h1>
      <ProductGrid items={items} />
    </div>
  );
}
