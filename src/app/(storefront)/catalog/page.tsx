import Link from "next/link";
import { getProducts, getCategoryTree } from "@/lib/queries";
import { parseFiltersFromSearchParams } from "@/lib/parse-filters";
import { FiltersSidebar } from "@/components/product/FiltersSidebar";
import { SortSelect } from "@/components/product/SortSelect";
import { ProductGrid } from "@/components/product/ProductGrid";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseFiltersFromSearchParams(params);
  const [{ items, availableBrands, priceRange }, categoryTree] = await Promise.all([
    getProducts(filters),
    getCategoryTree(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand">
          Главная
        </Link>{" "}
        / <span className="text-gray-900">Каталог</span>
      </nav>

      <div className="mb-6 flex flex-wrap gap-2">
        {categoryTree.map((cat) => (
          <Link
            key={cat.slug}
            href={`/catalog/${cat.slug}`}
            className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-700 hover:border-brand hover:text-brand"
          >
            {cat.name.ru}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <FiltersSidebar availableBrands={availableBrands} priceRange={priceRange} />

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Все товары ({items.length})</h1>
            <SortSelect />
          </div>
          <ProductGrid items={items} />
        </div>
      </div>
    </div>
  );
}
