"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateProductStatusAction } from "@/actions/admin";
import type { ProductModerationStatus } from "@/lib/admin-store";

const STATUS_LABELS: Record<ProductModerationStatus, string> = {
  PUBLISHED: "Опубликован",
  PENDING_MODERATION: "На модерации",
  REJECTED: "Отклонён",
  ARCHIVED: "В архиве",
};

const STATUS_COLORS: Record<ProductModerationStatus, string> = {
  PUBLISHED: "bg-green-50 text-green-700",
  PENDING_MODERATION: "bg-amber-50 text-amber-700",
  REJECTED: "bg-red-50 text-red-700",
  ARCHIVED: "bg-gray-100 text-gray-500",
};

export function ProductStatusActions({ productId, status }: { productId: string; status: ProductModerationStatus }) {
  const [isPending, startTransition] = useTransition();

  function setStatus(next: ProductModerationStatus) {
    startTransition(async () => {
      const res = await updateProductStatusAction(productId, next);
      if (!res.ok) toast.error(res.error);
      else toast.success("Статус обновлён");
    });
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`rounded px-2 py-1 text-xs font-medium ${STATUS_COLORS[status]}`}>{STATUS_LABELS[status]}</span>
      <select
        disabled={isPending}
        value={status}
        onChange={(e) => setStatus(e.target.value as ProductModerationStatus)}
        className="rounded-lg border border-gray-300 px-2 py-1 text-xs outline-none focus:border-brand disabled:opacity-50"
      >
        {(Object.keys(STATUS_LABELS) as ProductModerationStatus[]).map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </div>
  );
}
