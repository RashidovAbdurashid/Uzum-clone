"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/stores/favorites-store";

export function FavoritesBadge() {
  const count = useFavoritesStore((s) => s.productIds.length);

  return (
    <Link href="/favorites" className="relative flex flex-col items-center text-gray-700 hover:text-brand">
      <Heart size={22} />
      {count > 0 && (
        <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
