import { z } from "zod";

export const checkoutSchema = z
  .object({
    deliveryMethod: z.enum(["PICKUP_POINT", "COURIER"]),
    pickupPointId: z.string().nullable(),
    address: z.string().nullable(),
    paymentMethod: z.enum(["CASH_ON_DELIVERY", "CARD_ON_DELIVERY", "CLICK", "PAYME", "UZUM_BANK", "INSTALLMENT"]),
    note: z.string().max(500).optional(),
    items: z
      .array(
        z.object({
          productId: z.string(),
          variantId: z.string(),
          name: z.string(),
          image: z.string(),
          price: z.number().positive(),
          quantity: z.number().int().positive(),
        })
      )
      .min(1, "Корзина пуста"),
  })
  .refine((data) => data.deliveryMethod !== "PICKUP_POINT" || !!data.pickupPointId, {
    message: "Выберите пункт выдачи",
    path: ["pickupPointId"],
  })
  .refine((data) => data.deliveryMethod !== "COURIER" || !!data.address?.trim(), {
    message: "Укажите адрес доставки",
    path: ["address"],
  });

export type CheckoutInput = z.infer<typeof checkoutSchema>;
