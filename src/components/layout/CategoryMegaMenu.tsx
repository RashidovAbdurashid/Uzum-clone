"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as Icons from "lucide-react";
import { Menu } from "lucide-react";
import type { CategoryWithChildren } from "@/lib/queries";

export function CategoryMegaMenu({ tree, label }: { tree: CategoryWithChildren[]; label: string }) {
  const [open, setOpen] = useState(false);
  const [activeRoot, setActiveRoot] = useState(tree[0]?.slug);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const active = tree.find((c) => c.slug === activeRoot) ?? tree[0];

  return (
    <div ref={ref} className="relative hidden shrink-0 md:block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        <Menu size={18} />
        {label}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 flex w-[520px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <ul className="w-56 border-r border-gray-100 py-2">
            {tree.map((cat) => {
              const Icon = (Icons[cat.icon as keyof typeof Icons] ?? Icons.Package) as Icons.LucideIcon;
              return (
                <li key={cat.slug}>
                  <Link
                    href={`/catalog/${cat.slug}`}
                    onMouseEnter={() => setActiveRoot(cat.slug)}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 text-sm ${
                      activeRoot === cat.slug ? "bg-brand-light text-brand" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={16} />
                    {cat.name.ru}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex-1 p-4">
            {active?.children.length ? (
              <ul className="grid grid-cols-1 gap-1">
                {active.children.map((child) => (
                  <li key={child.slug}>
                    <Link
                      href={`/catalog/${child.slug}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand"
                    >
                      {child.name.ru}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <Link
                href={`/catalog/${active?.slug}`}
                onClick={() => setOpen(false)}
                className="text-sm text-brand hover:underline"
              >
                Смотреть все товары →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
