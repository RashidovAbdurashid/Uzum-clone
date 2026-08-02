import type { ProductFilters, SortOption } from "./queries";

const VALID_SORTS: SortOption[] = ["popular", "price_asc", "price_desc", "rating", "new", "discount"];

export function parseFiltersFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
  categorySlug?: string
): ProductFilters {
  const get = (key: string) => {
    const v = searchParams[key];
    return Array.isArray(v) ? v[0] : v;
  };
  const getAll = (key: string) => {
    const v = searchParams[key];
    if (!v) return [];
    return Array.isArray(v) ? v : [v];
  };

  const sort = get("sort");
  const minPrice = get("minPrice");
  const maxPrice = get("maxPrice");
  const minRating = get("minRating");

  return {
    categorySlug,
    search: get("q"),
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    brandSlugs: getAll("brand"),
    minRating: minRating ? Number(minRating) : undefined,
    sort: sort && VALID_SORTS.includes(sort as SortOption) ? (sort as SortOption) : "popular",
  };
}
