"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateOrderStatusAction } from "@/actions/admin";
import { ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/mock-data/orders";

const ALL_STATUSES: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "AT_PICKUP_POINT",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
  "RETURNED",
];

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const [isPending, startTransition] = useTransition();

  function handleChange(next: OrderStatus) {
    startTransition(async () => {
      const res = await updateOrderStatusAction(orderId, next);
      if (!res.ok) toast.error(res.error);
      else toast.success("Статус заказа обновлён");
    });
  }

  return (
    <select
      disabled={isPending}
      value={status}
      onChange={(e) => handleChange(e.target.value as OrderStatus)}
      className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs outline-none focus:border-brand disabled:opacity-50"
    >
      {ALL_STATUSES.map((s) => (
        <option key={s} value={s}>
          {ORDER_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
