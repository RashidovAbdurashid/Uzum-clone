import { PRODUCTS } from "./mock-data/products";
import { CATEGORIES, type CategoryNode } from "./mock-data/categories";
import { BANNERS as INITIAL_BANNERS, type MockBanner } from "./mock-data/banners";
import { ordersStore } from "./orders-store";
import type { OrderStatus } from "./mock-data/orders";

export type ProductModerationStatus = "PUBLISHED" | "PENDING_MODERATION" | "REJECTED" | "ARCHIVED";
export type ReviewModerationStatus = "PENDING" | "APPROVED" | "REJECTED";

const globalForAdmin = globalThis as unknown as {
  productStatusOverrides: Map<string, ProductModerationStatus> | undefined;
  reviewStatusOverrides: Map<string, ReviewModerationStatus> | undefined;
  mutableCategories: CategoryNode[] | undefined;
  mutableBanners: MockBanner[] | undefined;
};

const productStatus = globalForAdmin.productStatusOverrides ?? new Map<string, ProductModerationStatus>();
const reviewStatus = globalForAdmin.reviewStatusOverrides ?? new Map<string, ReviewModerationStatus>();
const categories = globalForAdmin.mutableCategories ?? [...CATEGORIES];
const banners = globalForAdmin.mutableBanners ?? [...INITIAL_BANNERS];

if (process.env.NODE_ENV !== "production") {
  globalForAdmin.productStatusOverrides = productStatus;
  globalForAdmin.reviewStatusOverrides = reviewStatus;
  globalForAdmin.mutableCategories = categories;
  globalForAdmin.mutableBanners = banners;
}

// ------------------------------------------------------------------
// Products (moderation status only - the catalog data itself is static
// mock content; this layer just tracks a PUBLISHED/PENDING/REJECTED/
// ARCHIVED flag per product, same as Product.status would in a real DB)
// ------------------------------------------------------------------

export const adminProducts = {
  list() {
    return PRODUCTS.map((p) => ({
      ...p,
      status: productStatus.get(p.id) ?? "PUBLISHED",
    }));
  },
  setStatus(productId: string, status: ProductModerationStatus) {
    productStatus.set(productId, status);
  },
};

// ------------------------------------------------------------------
// Orders
// ------------------------------------------------------------------

export const adminOrders = {
  listAll() {
    return ordersStore.listAllForAdmin();
  },
  updateStatus(orderId: string, status: OrderStatus, comment?: string) {
    return ordersStore.updateStatus(orderId, status, comment);
  },
};

// ------------------------------------------------------------------
// Categories (flat list, mutable - mirrors src/lib/mock-data/categories.ts
// shape so getCategoryTree() in queries.ts keeps working unmodified)
// ------------------------------------------------------------------

export const adminCategories = {
  list() {
    return categories;
  },
  create(input: Omit<CategoryNode, "id">) {
    const node: CategoryNode = { ...input, id: `cat_${Date.now()}_${Math.random().toString(36).slice(2, 6)}` };
    categories.push(node);
    return node;
  },
  update(id: string, patch: Partial<Omit<CategoryNode, "id">>) {
    const node = categories.find((c) => c.id === id);
    if (!node) return null;
    Object.assign(node, patch);
    return node;
  },
  remove(id: string) {
    const idx = categories.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    // Refuse to delete a category that still has children - avoids orphaning them.
    if (categories.some((c) => c.parentSlug === categories[idx].slug)) return false;
    categories.splice(idx, 1);
    return true;
  },
};

// ------------------------------------------------------------------
// Reviews (moderation status per review id, default APPROVED so the
// existing seeded reviews keep showing up on product pages unchanged)
// ------------------------------------------------------------------

export const adminReviews = {
  list() {
    return PRODUCTS.flatMap((p) =>
      p.reviews.map((r) => ({
        ...r,
        productId: p.id,
        productName: p.name,
        productSlug: p.slug,
        status: reviewStatus.get(r.id) ?? ("APPROVED" as ReviewModerationStatus),
      }))
    );
  },
  setStatus(reviewId: string, status: ReviewModerationStatus) {
    reviewStatus.set(reviewId, status);
  },
};

// ------------------------------------------------------------------
// Banners
// ------------------------------------------------------------------

export const adminBanners = {
  list() {
    return banners;
  },
  create(input: Omit<MockBanner, "id">) {
    const banner: MockBanner = { ...input, id: `banner_${Date.now()}` };
    banners.push(banner);
    return banner;
  },
  remove(id: string) {
    const idx = banners.findIndex((b) => b.id === id);
    if (idx === -1) return false;
    banners.splice(idx, 1);
    return true;
  },
};
