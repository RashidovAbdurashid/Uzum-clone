import { type CategoryNode } from "./mock-data/categories";
import { PRODUCTS, type MockProduct } from "./mock-data/products";
import { BRANDS, type Brand } from "./mock-data/brands";
import { type MockBanner } from "./mock-data/banners";
import { adminCategories, adminBanners, adminProducts } from "./admin-store";

export type { MockProduct, ProductVariant, ProductImage, ProductReview } from "./mock-data/products";
export type { Brand } from "./mock-data/brands";
export type { MockBanner } from "./mock-data/banners";

export interface CategoryWithChildren extends CategoryNode {
  children: CategoryNode[];
}

export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  compareAtPrice: number | null;
  discountPercent: number | null;
  installmentPrice: number | null;
  installmentMonths: number | null;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isOriginal: boolean;
  hasLowPriceGuarantee: boolean;
  deliveryDays: number;
  salesCount: number;
  categorySlug: string;
  brandSlug: string;
}

export type SortOption = "popular" | "price_asc" | "price_desc" | "rating" | "new" | "discount";

export interface ProductFilters {
  categorySlug?: string; // includes subcategories if it's a root category
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  brandSlugs?: string[];
  minRating?: number;
  sort?: SortOption;
}

// ------------------------------------------------------------------
// Categories
// ------------------------------------------------------------------

export async function getCategoryTree(): Promise<CategoryWithChildren[]> {
  const all = adminCategories.list();
  const roots = all.filter((c) => c.parentSlug === null).sort((a, b) => a.position - b.position);
  return roots.map((root) => ({
    ...root,
    children: all.filter((c) => c.parentSlug === root.slug).sort((a, b) => a.position - b.position),
  }));
}

export async function getFeaturedCategories(): Promise<CategoryNode[]> {
  return adminCategories
    .list()
    .filter((c) => c.parentSlug === null && c.isFeatured)
    .sort((a, b) => a.position - b.position);
}

export async function getCategoryBySlug(slug: string): Promise<CategoryNode | null> {
  return adminCategories.list().find((c) => c.slug === slug) ?? null;
}

/** Breadcrumb chain from root ancestor down to the given category (inclusive). */
export async function getCategoryBreadcrumb(slug: string): Promise<CategoryNode[]> {
  const all = adminCategories.list();
  const chain: CategoryNode[] = [];
  let current = all.find((c) => c.slug === slug) ?? null;
  while (current) {
    chain.unshift(current);
    current = current.parentSlug ? all.find((c) => c.slug === current!.parentSlug) ?? null : null;
  }
  return chain;
}

/** A category slug plus every descendant slug (for "all products in Electronics incl. subcategories"). */
function expandCategorySlugs(slug: string): string[] {
  const all = adminCategories.list();
  const node = all.find((c) => c.slug === slug);
  if (!node) return [slug];
  if (node.parentSlug !== null) return [slug]; // leaf/subcategory - exact match only
  const children = all.filter((c) => c.parentSlug === slug).map((c) => c.slug);
  return [slug, ...children];
}

// ------------------------------------------------------------------
// Brands / Banners
// ------------------------------------------------------------------

export async function getBrands(): Promise<Brand[]> {
  return BRANDS;
}

export async function getBanners(): Promise<MockBanner[]> {
  return adminBanners.list();
}

// ------------------------------------------------------------------
// Products
// ------------------------------------------------------------------

function cheapestVariant(product: MockProduct) {
  return product.variants.reduce((min, v) => (v.price < min.price ? v : min), product.variants[0]);
}

export function toProductSummary(product: MockProduct): ProductSummary {
  const variant = cheapestVariant(product);
  const rating = product.reviews.length
    ? Math.round((product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length) * 10) / 10
    : 0;
  const discountPercent = variant.compareAtPrice
    ? Math.round(((variant.compareAtPrice - variant.price) / variant.compareAtPrice) * 100)
    : null;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    image: product.images[0]?.url ?? "",
    price: variant.price,
    compareAtPrice: variant.compareAtPrice,
    discountPercent,
    installmentPrice: variant.installmentPrice,
    installmentMonths: variant.installmentMonths,
    rating,
    reviewCount: product.reviews.length,
    isNew: product.isNew,
    isOriginal: product.isOriginal,
    hasLowPriceGuarantee: product.hasLowPriceGuarantee,
    deliveryDays: product.deliveryDays,
    salesCount: product.salesCount,
    categorySlug: product.categorySlug,
    brandSlug: product.brandSlug,
  };
}

function sortSummaries(items: ProductSummary[], sort: SortOption): ProductSummary[] {
  const sorted = [...items];
  switch (sort) {
    case "price_asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "new":
      return sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case "discount":
      return sorted.sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0));
    case "popular":
    default:
      return sorted.sort((a, b) => b.salesCount - a.salesCount);
  }
}

export async function getProducts(
  filters: ProductFilters = {}
): Promise<{ items: ProductSummary[]; availableBrands: Brand[]; priceRange: { min: number; max: number } }> {
  const categorySlugs = filters.categorySlug ? new Set(expandCategorySlugs(filters.categorySlug)) : null;
  const search = filters.search?.trim().toLowerCase();
  const statusById = new Map(adminProducts.list().map((p) => [p.id, p.status]));

  let summaries = PRODUCTS.filter((p) => {
    if (statusById.get(p.id) !== "PUBLISHED") return false;
    if (categorySlugs && !categorySlugs.has(p.categorySlug)) return false;
    if (search && !p.name.toLowerCase().includes(search) && !p.shortDescription.toLowerCase().includes(search)) {
      return false;
    }
    return true;
  }).map(toProductSummary);

  // Compute available brands + price range from the category/search-filtered set,
  // BEFORE price/brand/rating filters are applied - so the filter UI always shows
  // every option relevant to the current category/search, not just currently visible ones.
  const availableBrandSlugs = new Set(summaries.map((s) => s.brandSlug));
  const availableBrands = BRANDS.filter((b) => availableBrandSlugs.has(b.slug));
  const priceRange = summaries.reduce(
    (acc, s) => ({ min: Math.min(acc.min, s.price), max: Math.max(acc.max, s.price) }),
    { min: Infinity, max: 0 }
  );

  if (filters.minPrice !== undefined) summaries = summaries.filter((s) => s.price >= filters.minPrice!);
  if (filters.maxPrice !== undefined) summaries = summaries.filter((s) => s.price <= filters.maxPrice!);
  if (filters.brandSlugs?.length) summaries = summaries.filter((s) => filters.brandSlugs!.includes(s.brandSlug));
  if (filters.minRating !== undefined) summaries = summaries.filter((s) => s.rating >= filters.minRating!);

  summaries = sortSummaries(summaries, filters.sort ?? "popular");

  return {
    items: summaries,
    availableBrands,
    priceRange: priceRange.min === Infinity ? { min: 0, max: 0 } : priceRange,
  };
}

export async function getProductBySlug(slug: string): Promise<MockProduct | null> {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

function publishedProducts(): MockProduct[] {
  const statusById = new Map(adminProducts.list().map((p) => [p.id, p.status]));
  return PRODUCTS.filter((p) => statusById.get(p.id) === "PUBLISHED");
}

export async function getRelatedProducts(product: MockProduct, limit = 5): Promise<ProductSummary[]> {
  return publishedProducts()
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit)
    .map(toProductSummary);
}

export async function getPopularProducts(limit = 5): Promise<ProductSummary[]> {
  return publishedProducts()
    .map(toProductSummary)
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, limit);
}

export async function getNewProducts(limit = 5): Promise<ProductSummary[]> {
  return publishedProducts().filter((p) => p.isNew).map(toProductSummary).slice(0, limit);
}

export async function getDiscountedProducts(limit = 5): Promise<ProductSummary[]> {
  return publishedProducts()
    .map(toProductSummary)
    .filter((s) => s.discountPercent !== null)
    .sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0))
    .slice(0, limit);
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  return BRANDS.find((b) => b.slug === slug) ?? null;
}

/**
 * Synchronous variant of the product lookup, for client components that can't
 * easily await a server-shaped async function (e.g. the favorites page, which
 * reads favorited IDs from a Zustand store). Fine now since PRODUCTS is just
 * an in-memory array; once this becomes a real DB-backed function, the
 * favorites page will need to switch to a Server Action or route handler.
 */
export function getProductSummariesByIdsSync(ids: string[]): ProductSummary[] {
  return PRODUCTS.filter((p) => ids.includes(p.id)).map(toProductSummary);
}
