import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { auth } from "@/lib/auth";
import { User, MapPin, ChevronDown } from "lucide-react";
import { getCategoryTree } from "@/lib/queries";
import { SearchBar } from "./SearchBar";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { CategoryMegaMenu } from "./CategoryMegaMenu";
import { CartBadge } from "./CartBadge";
import { FavoritesBadge } from "./FavoritesBadge";

export async function Header() {
  const t = await getTranslations("common");
  const session = await auth();
  const categoryTree = await getCategoryTree();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="hidden border-b border-gray-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-gray-600">
          <button className="flex items-center gap-1 hover:text-brand">
            <MapPin size={14} /> Ташкент
          </button>
          <nav className="flex items-center gap-4">
            <Link href="/pickup-points" className="hover:text-brand">
              {t("pickupPoints")}
            </Link>
            <Link href="/seller/register" className="hover:text-brand">
              {t("becomeSeller")}
            </Link>
            <Link href="/faq" className="hover:text-brand">
              {t("faq")}
            </Link>
            <Link href="/account/orders" className="hover:text-brand">
              {t("myOrders")}
            </Link>
          </nav>
          <LocaleSwitcher />
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="shrink-0 text-xl font-extrabold text-brand">
          uzum market
        </Link>

        <CategoryMegaMenu tree={categoryTree} label={t("catalog")} />

        <SearchBar placeholder={t("search")} />

        <div className="flex shrink-0 items-center gap-4">
          <Link
            href={session ? "/account/profile" : "/login"}
            className="flex flex-col items-center text-gray-700 hover:text-brand"
          >
            <User size={22} />
            <span className="hidden text-[11px] sm:block">{t("login")}</span>
          </Link>
          <FavoritesBadge />
          <CartBadge />
        </div>
      </div>

      {/* Quick nav */}
      <div className="hidden border-t border-gray-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 text-sm">
          {categoryTree.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalog/${cat.slug}`}
              className="shrink-0 rounded-lg px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-brand"
            >
              {cat.name.ru}
            </Link>
          ))}
          <Link
            href="/catalog"
            className="ml-auto flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-brand"
          >
            Ещё <ChevronDown size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}
