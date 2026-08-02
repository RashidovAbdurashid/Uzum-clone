"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

export function CartBadge() {
  const count = useCartStore((s) => s.totalCount());

  return (
    <Link href="/cart" className="relative flex flex-col items-center text-gray-700 hover:text-brand">
      <ShoppingCart size={22} />
      {count > 0 && (
        <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
