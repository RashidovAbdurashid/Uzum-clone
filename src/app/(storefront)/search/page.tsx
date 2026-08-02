import { getProducts } from "@/lib/queries";
import { parseFiltersFromSearchParams } from "@/lib/parse-filters";
import { FiltersSidebar } from "@/components/product/FiltersSidebar";
import { SortSelect } from "@/components/product/SortSelect";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductRow } from "@/components/product/ProductRow";
import { getPopularProducts } from "@/lib/queries";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseFiltersFromSearchParams(params);
  const query = filters.search ?? "";

  const { items, availableBrands, priceRange } = await getProducts(filters);

  if (!query) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-gray-500">
        Введите запрос в строке поиска, чтобы найти товары.
      </div>
    );
  }

  if (items.length === 0) {
    const popular = await getPopularProducts(5);
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="mb-8 text-center text-gray-500">
          По запросу «{query}» ничего не найдено. Попробуйте изменить запрос.
        </p>
        <h2 className="mb-4 text-lg font-bold text-gray-900">Популярные товары</h2>
        <ProductRow items={popular} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <FiltersSidebar availableBrands={availableBrands} priceRange={priceRange} />
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              Результаты по запросу «{query}» ({items.length})
            </h1>
            <SortSelect />
          </div>
          <ProductGrid items={items} />
        </div>
      </div>
    </div>
  );
}
