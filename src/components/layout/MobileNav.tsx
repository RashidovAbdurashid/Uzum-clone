"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid2x2, ShoppingCart, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", icon: Home, label: "Главная" },
  { href: "/catalog", icon: Grid2x2, label: "Каталог" },
  { href: "/cart", icon: ShoppingCart, label: "Корзина" },
  { href: "/favorites", icon: Heart, label: "Избранное" },
  { href: "/account/profile", icon: User, label: "Профиль" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-gray-200 bg-white md:hidden">
      {TABS.map(({ href, icon: Icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px]",
              active ? "text-brand" : "text-gray-500"
            )}
          >
            <Icon size={20} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
