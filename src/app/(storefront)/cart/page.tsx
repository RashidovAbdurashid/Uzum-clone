"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice());

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="mb-4 text-gray-500">Корзина пуста</p>
        <Link href="/catalog" className="text-brand hover:underline">
          Перейти в каталог →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-xl font-bold text-gray-900">Корзина ({items.length})</h1>

      <div className="flex flex-col gap-6 lg:flex-row">
        <ul className="flex-1 space-y-3">
          {items.map((item) => (
            <li key={item.variantId} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- local SVG placeholder */}
              <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="price-current mt-1 text-sm">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center rounded-lg border border-gray-300">
                <button
                  onClick={() => setQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                  className="px-2.5 py-1.5 text-gray-600 hover:text-brand"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => setQuantity(item.variantId, item.quantity + 1)}
                  className="px-2.5 py-1.5 text-gray-600 hover:text-brand"
                >
                  +
                </button>
              </div>
              <p className="w-28 text-right text-sm font-semibold text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </p>
              <button onClick={() => removeItem(item.variantId)} aria-label="Удалить" className="text-gray-400 hover:text-red-500">
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>

        <div className="w-full shrink-0 rounded-xl border border-gray-200 bg-white p-5 lg:w-80">
          <div className="mb-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Товары</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Доставка</span>
              <span>Бесплатно</span>
            </div>
          </div>
          <div className="mb-4 flex justify-between border-t border-gray-100 pt-3 text-base font-bold text-gray-900">
            <span>Итого</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <button
            onClick={() => router.push("/checkout")}
            className="w-full rounded-lg bg-brand py-3 font-semibold text-white hover:bg-brand-dark"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}
