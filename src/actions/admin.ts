"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { mockDb } from "@/lib/mock-db";
import { adminProducts, adminOrders, adminCategories, adminReviews, adminBanners } from "@/lib/admin-store";
import type { ProductModerationStatus, ReviewModerationStatus } from "@/lib/admin-store";
import type { OrderStatus } from "@/lib/mock-data/orders";
import type { RoleType } from "@/constants/roles";
import { hasRole, ROLES } from "@/constants/roles";

async function requireRole(allowed: RoleType[]) {
  const session = await auth();
  if (!hasRole(session?.user?.role, allowed)) {
    return { ok: false as const, error: "Недостаточно прав" };
  }
  return { ok: true as const, session };
}

const STAFF: RoleType[] = [ROLES.MODERATOR, ROLES.ADMIN, ROLES.SUPER_ADMIN];
const STAFF_AND_SELLER: RoleType[] = [ROLES.SELLER, ROLES.MODERATOR, ROLES.ADMIN, ROLES.SUPER_ADMIN];
const ADMIN_ONLY: RoleType[] = [ROLES.ADMIN, ROLES.SUPER_ADMIN];

export async function updateProductStatusAction(productId: string, status: ProductModerationStatus) {
  const check = await requireRole(STAFF_AND_SELLER);
  if (!check.ok) return check;
  adminProducts.setStatus(productId, status);
  revalidatePath("/admin/products");
  revalidatePath("/seller/products");
  revalidatePath("/catalog");
  return { ok: true as const };
}

export async function updateOrderStatusAction(orderId: string, status: OrderStatus, comment?: string) {
  const check = await requireRole(STAFF_AND_SELLER);
  if (!check.ok) return check;
  const order = adminOrders.updateStatus(orderId, status, comment);
  if (!order) return { ok: false as const, error: "Заказ не найден" };
  revalidatePath("/admin/orders");
  revalidatePath("/seller/orders");
  revalidatePath(`/account/orders/${orderId}`);
  return { ok: true as const };
}

export async function updateUserRoleAction(userId: string, role: RoleType) {
  const check = await requireRole(ADMIN_ONLY);
  if (!check.ok) return check;
  const user = await mockDb.users.updateRole(userId, role);
  if (!user) return { ok: false as const, error: "Пользователь не найден" };
  revalidatePath("/admin/users");
  return { ok: true as const };
}

export async function updateUserStatusAction(userId: string, status: "ACTIVE" | "BLOCKED") {
  const check = await requireRole(ADMIN_ONLY);
  if (!check.ok) return check;
  const user = await mockDb.users.updateStatus(userId, status);
  if (!user) return { ok: false as const, error: "Пользователь не найден" };
  revalidatePath("/admin/users");
  return { ok: true as const };
}

export async function createCategoryAction(input: {
  slug: string;
  nameRu: string;
  nameUz: string;
  nameEn: string;
  icon: string;
  parentSlug: string | null;
}) {
  const check = await requireRole(ADMIN_ONLY);
  if (!check.ok) return check;
  if (!input.slug.trim()) return { ok: false as const, error: "Укажите slug" };

  adminCategories.create({
    slug: input.slug.trim(),
    name: { ru: input.nameRu, uz: input.nameUz, en: input.nameEn },
    icon: input.icon || "Package",
    parentSlug: input.parentSlug,
    position: adminCategories.list().length,
    isFeatured: input.parentSlug === null,
  });
  revalidatePath("/admin/categories");
  revalidatePath("/catalog");
  return { ok: true as const };
}

export async function deleteCategoryAction(id: string) {
  const check = await requireRole(ADMIN_ONLY);
  if (!check.ok) return check;
  const removed = adminCategories.remove(id);
  if (!removed) return { ok: false as const, error: "Нельзя удалить категорию с подкатегориями" };
  revalidatePath("/admin/categories");
  revalidatePath("/catalog");
  return { ok: true as const };
}

export async function updateReviewStatusAction(reviewId: string, status: ReviewModerationStatus) {
  const check = await requireRole(STAFF);
  if (!check.ok) return check;
  adminReviews.setStatus(reviewId, status);
  revalidatePath("/admin/reviews");
  return { ok: true as const };
}

export async function createBannerAction(input: { title: string; subtitle: string; image: string; link: string }) {
  const check = await requireRole(ADMIN_ONLY);
  if (!check.ok) return check;
  adminBanners.create(input);
  revalidatePath("/admin/banners");
  revalidatePath("/");
  return { ok: true as const };
}

export async function deleteBannerAction(id: string) {
  const check = await requireRole(ADMIN_ONLY);
  if (!check.ok) return check;
  adminBanners.remove(id);
  revalidatePath("/admin/banners");
  revalidatePath("/");
  return { ok: true as const };
}
