import { ProductCard } from "./ProductCard";
import type { ProductSummary } from "@/lib/queries";

export function ProductRow({ items }: { items: ProductSummary[] }) {
  if (items.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
