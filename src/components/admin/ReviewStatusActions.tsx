"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { updateReviewStatusAction } from "@/actions/admin";
import type { ReviewModerationStatus } from "@/lib/admin-store";

export function ReviewStatusActions({ reviewId, status }: { reviewId: string; status: ReviewModerationStatus }) {
  const [isPending, startTransition] = useTransition();

  function setStatus(next: ReviewModerationStatus) {
    startTransition(async () => {
      const res = await updateReviewStatusAction(reviewId, next);
      if (!res.ok) toast.error(res.error);
      else toast.success("Статус отзыва обновлён");
    });
  }

  if (status === "APPROVED") {
    return (
      <button disabled={isPending} onClick={() => setStatus("REJECTED")} className="text-xs font-medium text-red-500 hover:underline disabled:opacity-50">
        Отклонить
      </button>
    );
  }
  if (status === "REJECTED") {
    return (
      <button disabled={isPending} onClick={() => setStatus("APPROVED")} className="text-xs font-medium text-green-600 hover:underline disabled:opacity-50">
        Одобрить
      </button>
    );
  }
  return (
    <div className="flex gap-2">
      <button disabled={isPending} onClick={() => setStatus("APPROVED")} className="flex items-center gap-1 text-xs font-medium text-green-600 disabled:opacity-50">
        <Check size={14} /> Одобрить
      </button>
      <button disabled={isPending} onClick={() => setStatus("REJECTED")} className="flex items-center gap-1 text-xs font-medium text-red-500 disabled:opacity-50">
        <X size={14} /> Отклонить
      </button>
    </div>
  );
}
