"use server";

import { auth } from "@/lib/auth";
import { checkoutSchema } from "@/schemas/checkout";
import { ordersStore } from "@/lib/orders-store";
import { logger } from "@/lib/logger";

export async function createOrderAction(input: unknown) {
  const session = await auth();
  if (!session?.user) {
    return { success: false, error: "Необходимо войти в аккаунт" };
  }

  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Некорректные данные" };
  }
  const data = parsed.data;

  // NOTE: this trusts client-supplied item prices, which is fine for this
  // mock/demo build but would be a real vulnerability with a live payment
  // integration - a production version must recompute totals server-side
  // from the product/variant records, not from what the client sent.
  const order = ordersStore.create({
    userId: session.user.id,
    items: data.items,
    deliveryMethod: data.deliveryMethod,
    pickupPointId: data.pickupPointId,
    address: data.address,
    paymentMethod: data.paymentMethod,
    note: data.note ?? null,
  });

  // Simulated notification dispatch (see src/lib/sms.ts for the same pattern
  // used by OTP) - in production this would call Resend (email) and
  // Eskiz.uz (SMS) with the order confirmation.
  logger.info(
    { orderNumber: order.orderNumber, userId: session.user.id },
    "Order confirmation notification (simulated email/SMS)"
  );

  return { success: true, orderId: order.id, orderNumber: order.orderNumber };
}
