"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { formatPrice, formatDeliveryLabel } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useFavoritesStore } from "@/stores/favorites-store";
import type { MockProduct } from "@/lib/queries";

export function ProductPurchasePanel({ product }: { product: MockProduct }) {
  const router = useRouter();
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const isFavorite = useFavoritesStore((s) => s.has(product.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggle);

  const variant = useMemo(
    () => product.variants.find((v) => v.id === variantId) ?? product.variants[0],
    [product.variants, variantId]
  );
  const attributeName = product.variants[0]?.attributeName;
  const image = product.images[0]?.url ?? "";

  function handleAddToCart() {
    addItem({
      variantId: variant.id,
      productId: product.id,
      name: `${product.name}${variant.label ? ` (${variant.label})` : ""}`,
      image,
      price: variant.price,
      quantity,
    });
    toast.success("Товар добавлен в корзину");
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/cart");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-3">
        <span className="price-current text-2xl">{formatPrice(variant.price)}</span>
        {variant.compareAtPrice && <span className="price-compare text-base">{formatPrice(variant.compareAtPrice)}</span>}
      </div>
      {variant.installmentPrice && (
        <p className="text-sm text-gray-500">
          или от {formatPrice(variant.installmentPrice)}/мес на {variant.installmentMonths} мес
        </p>
      )}

      {attributeName && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">{attributeName}</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                disabled={v.stock === 0}
                className={`rounded-lg border px-3 py-1.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
                  v.id === variant.id
                    ? "border-brand bg-brand-light text-brand"
                    : "border-gray-300 text-gray-700 hover:border-brand"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-gray-300">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-gray-600 hover:text-brand"
          >
            −
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(variant.stock, q + 1))}
            className="px-3 py-2 text-gray-600 hover:text-brand"
          >
            +
          </button>
        </div>
        <span className="text-xs text-gray-500">{variant.stock > 0 ? `В наличии: ${variant.stock} шт.` : "Нет в наличии"}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleAddToCart}
          disabled={variant.stock === 0}
          className="flex-1 rounded-lg bg-brand py-3 font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Добавить в корзину
        </button>
        <button
          onClick={handleBuyNow}
          disabled={variant.stock === 0}
          className="flex-1 rounded-lg border border-brand py-3 font-semibold text-brand transition hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          Купить сейчас
        </button>
        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label="В избранное"
          className="flex w-12 items-center justify-center rounded-lg border border-gray-300 hover:border-brand"
        >
          <Heart size={18} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>
      </div>

      <p className="text-sm text-gray-500">Доставка: {formatDeliveryLabel(product.deliveryDays)}</p>
    </div>
  );
}
