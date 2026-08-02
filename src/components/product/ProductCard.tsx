"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { cn, formatPrice, formatDeliveryLabel } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useCartStore } from "@/stores/cart-store";
import type { ProductSummary } from "@/lib/queries";

export function ProductCard({ product }: { product: ProductSummary }) {
  const isFavorite = useFavoritesStore((s) => s.has(product.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      variantId: product.id, // Phase 2 mock: card adds the cheapest variant; the product
      productId: product.id, // page lets you pick a specific variant before adding.
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    });
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG placeholders, swapped for next/image once real product photos exist */}
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
          }}
          aria-label="В избранное"
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm"
        >
          <Heart size={16} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>

        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.isOriginal && <Badge color="blue">ОРИГИНАЛ</Badge>}
          {product.hasLowPriceGuarantee && <Badge color="green">НИЗКАЯ ЦЕНА</Badge>}
          {product.isNew && <Badge color="orange">НОВИНКА</Badge>}
          {product.discountPercent && <Badge color="red">−{product.discountPercent}%</Badge>}
        </div>

        <button
          onClick={handleAddToCart}
          className="absolute inset-x-2 bottom-2 flex translate-y-10 items-center justify-center gap-1.5 rounded-lg bg-brand py-2 text-xs font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ShoppingCart size={14} /> В корзину
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-2 min-h-[2.5rem] text-sm text-gray-800">{product.name}</p>

        <div className="flex items-baseline gap-2">
          <span className="price-current text-sm">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="price-compare text-xs">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>

        {product.installmentPrice && (
          <p className="text-[11px] text-gray-500">
            от {formatPrice(product.installmentPrice)}/мес
          </p>
        )}

        <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500">
          {product.reviewCount > 0 ? (
            <span className="flex items-center gap-0.5">
              <Star size={12} className="fill-amber-400 text-amber-400" /> {product.rating} ({product.reviewCount})
            </span>
          ) : (
            <span />
          )}
          <span className="rounded bg-gray-100 px-1.5 py-0.5">{formatDeliveryLabel(product.deliveryDays)}</span>
        </div>
      </div>
    </Link>
  );
}

function Badge({ color, children }: { color: "blue" | "green" | "orange" | "red"; children: React.ReactNode }) {
  const colors = {
    blue: "bg-badge-blue",
    green: "bg-badge-green",
    orange: "bg-badge-orange",
    red: "bg-badge-red",
  };
  return (
    <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold text-white", colors[color])}>
      {children}
    </span>
  );
}
