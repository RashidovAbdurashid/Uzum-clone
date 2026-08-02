import Link from "next/link";
import { getTranslations } from "next-intl/server";
import * as Icons from "lucide-react";
import {
  getBanners,
  getFeaturedCategories,
  getPopularProducts,
  getNewProducts,
  getDiscountedProducts,
} from "@/lib/queries";
import { HeroSlider } from "@/components/storefront/HeroSlider";
import { ProductRow } from "@/components/product/ProductRow";

export default async function HomePage() {
  const t = await getTranslations("home");

  const [banners, categories, popular, newArrivals, discounted] = await Promise.all([
    getBanners(),
    getFeaturedCategories(),
    getPopularProducts(5),
    getNewProducts(5),
    getDiscountedProducts(5),
  ]);

  const sections = [
    { title: t("popular"), items: popular },
    { title: t("newArrivals"), items: newArrivals },
    { title: t("discounts"), items: discounted },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <HeroSlider banners={banners} />

      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-5">
        {categories.map((cat) => {
          const Icon = (Icons[cat.icon as keyof typeof Icons] ?? Icons.Package) as Icons.LucideIcon;
          return (
            <Link
              key={cat.slug}
              href={`/catalog/${cat.slug}`}
              className="flex h-24 flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
            >
              <Icon size={22} className="text-brand" />
              {cat.name.ru}
            </Link>
          );
        })}
      </div>

      {sections.map((section) =>
        section.items.length > 0 ? (
          <section key={section.title} className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
              <Link href="/catalog" className="text-sm text-brand hover:underline">
                {t("viewAll")} →
              </Link>
            </div>
            <ProductRow items={section.items} />
          </section>
        ) : null
      )}
    </div>
  );
}
