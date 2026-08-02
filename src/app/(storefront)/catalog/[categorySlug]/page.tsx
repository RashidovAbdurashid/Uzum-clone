import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, getCategoryBySlug, getCategoryBreadcrumb, getCategoryTree } from "@/lib/queries";
import { parseFiltersFromSearchParams } from "@/lib/parse-filters";
import { FiltersSidebar } from "@/components/product/FiltersSidebar";
import { SortSelect } from "@/components/product/SortSelect";
import { ProductGrid } from "@/components/product/ProductGrid";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const resolvedSearchParams = await searchParams;
  const filters = parseFiltersFromSearchParams(resolvedSearchParams, categorySlug);
  const [{ items, availableBrands, priceRange }, breadcrumb, categoryTree] = await Promise.all([
    getProducts(filters),
    getCategoryBreadcrumb(categorySlug),
    getCategoryTree(),
  ]);

  // Subcategory chips: if this is a root category, show its children;
  // if it's a subcategory itself, show its siblings.
  const rootNode = categoryTree.find((c) => c.slug === (category.parentSlug ?? category.slug));
  const chips = rootNode?.children ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand">
          Главная
        </Link>
        {breadcrumb.map((c) => (
          <span key={c.slug} className="flex items-center gap-1">
            <span>/</span>
            <Link href={`/catalog/${c.slug}`} className="hover:text-brand">
              {c.name.ru}
            </Link>
          </span>
        ))}
      </nav>

      {chips.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href={`/catalog/${rootNode!.slug}`}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              categorySlug === rootNode!.slug
                ? "border-brand bg-brand-light text-brand"
                : "border-gray-200 bg-white text-gray-700 hover:border-brand hover:text-brand"
            }`}
          >
            Все
          </Link>
          {chips.map((c) => (
            <Link
              key={c.slug}
              href={`/catalog/${c.slug}`}
              className={`rounded-full border px-4 py-1.5 text-sm ${
                categorySlug === c.slug
                  ? "border-brand bg-brand-light text-brand"
                  : "border-gray-200 bg-white text-gray-700 hover:border-brand hover:text-brand"
              }`}
            >
              {c.name.ru}
            </Link>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-6 md:flex-row">
        <FiltersSidebar availableBrands={availableBrands} priceRange={priceRange} />

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              {category.name.ru} ({items.length})
            </h1>
            <SortSelect />
          </div>
          <ProductGrid items={items} />
        </div>
      </div>
    </div>
  );
}
