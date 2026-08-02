"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { createOrderAction } from "@/actions/orders";
import { formatPrice, cn } from "@/lib/utils";
import { PAYMENT_METHOD_LABELS, type PaymentMethod, type DeliveryMethod } from "@/lib/mock-data/orders";
import type { PickupPoint } from "@/lib/mock-data/pickup-points";
import type { MockCity } from "@/lib/mock-db";

const STEPS = ["Доставка", "Оплата", "Подтверждение"] as const;
const DELIVERY_FEE_COURIER = 25000;
const PAYMENT_METHODS: PaymentMethod[] = ["CASH_ON_DELIVERY", "CLICK", "PAYME", "UZUM_BANK", "INSTALLMENT"];

export function CheckoutWizard({ cities, pickupPoints }: { cities: MockCity[]; pickupPoints: PickupPoint[] }) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clear);

  const [step, setStep] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("PICKUP_POINT");
  const [citySlug, setCitySlug] = useState(cities[0]?.slug ?? "tashkent");
  const [pickupPointId, setPickupPointId] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH_ON_DELIVERY");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const availablePickupPoints = pickupPoints.filter((p) => p.citySlug === citySlug);
  const deliveryFee = deliveryMethod === "COURIER" ? DELIVERY_FEE_COURIER : 0;
  const total = totalPrice + deliveryFee;

  function goNext() {
    setErrors(null);
    if (step === 0) {
      if (deliveryMethod === "PICKUP_POINT" && !pickupPointId) {
        setErrors("Выберите пункт выдачи");
        return;
      }
      if (deliveryMethod === "COURIER" && !address.trim()) {
        setErrors("Укажите адрес доставки");
        return;
      }
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function handleConfirm() {
    setSubmitting(true);
    setErrors(null);
    const result = await createOrderAction({
      deliveryMethod,
      pickupPointId: deliveryMethod === "PICKUP_POINT" ? pickupPointId : null,
      address: deliveryMethod === "COURIER" ? address : null,
      paymentMethod,
      note: note || undefined,
      items: items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        name: i.name,
        image: i.image,
        price: i.price,
        quantity: i.quantity,
      })),
    });
    setSubmitting(false);

    if (!result.success) {
      setErrors(result.error ?? "Не удалось оформить заказ");
      return;
    }
    clearCart();
    toast.success(`Заказ ${result.orderNumber} оформлен`);
    router.push(`/account/orders/${result.orderId}`);
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="flex-1">
        {/* Step indicator */}
        <div className="mb-8 flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  i < step ? "bg-brand text-white" : i === step ? "border-2 border-brand text-brand" : "border border-gray-300 text-gray-400"
                )}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className={cn("text-sm", i === step ? "font-semibold text-gray-900" : "text-gray-500")}>{label}</span>
              {i < STEPS.length - 1 && <div className="h-px flex-1 bg-gray-200" />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-5">
            <div className="flex gap-3">
              <button
                onClick={() => setDeliveryMethod("PICKUP_POINT")}
                className={cn(
                  "flex-1 rounded-lg border-2 px-4 py-3 text-left text-sm font-medium",
                  deliveryMethod === "PICKUP_POINT" ? "border-brand bg-brand-light text-brand" : "border-gray-200 text-gray-700"
                )}
              >
                Самовывоз из ПВЗ
              </button>
              <button
                onClick={() => setDeliveryMethod("COURIER")}
                className={cn(
                  "flex-1 rounded-lg border-2 px-4 py-3 text-left text-sm font-medium",
                  deliveryMethod === "COURIER" ? "border-brand bg-brand-light text-brand" : "border-gray-200 text-gray-700"
                )}
              >
                Курьерская доставка ({formatPrice(DELIVERY_FEE_COURIER)})
              </button>
            </div>

            {deliveryMethod === "PICKUP_POINT" ? (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Город</label>
                <select
                  value={citySlug}
                  onChange={(e) => {
                    setCitySlug(e.target.value);
                    setPickupPointId(null);
                  }}
                  className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand"
                >
                  {cities.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name.ru}
                    </option>
                  ))}
                </select>

                <div className="space-y-2">
                  {availablePickupPoints.map((pp) => (
                    <label
                      key={pp.id}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm",
                        pickupPointId === pp.id ? "border-brand bg-brand-light" : "border-gray-200"
                      )}
                    >
                      <input
                        type="radio"
                        name="pickupPoint"
                        checked={pickupPointId === pp.id}
                        onChange={() => setPickupPointId(pp.id)}
                        className="mt-1 text-brand focus:ring-brand"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{pp.name}</p>
                        <p className="text-gray-500">{pp.address}</p>
                        <p className="text-xs text-gray-400">
                          {pp.workingHours} · {pp.phone}
                        </p>
                      </div>
                    </label>
                  ))}
                  {availablePickupPoints.length === 0 && (
                    <p className="text-sm text-gray-400">В этом городе пока нет пунктов выдачи.</p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Адрес доставки</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="Город, улица, дом, квартира"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand"
                />
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-2">
            {PAYMENT_METHODS.map((method) => (
              <label
                key={method}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm",
                  paymentMethod === method ? "border-brand bg-brand-light text-brand" : "border-gray-200 text-gray-700"
                )}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="text-brand focus:ring-brand"
                />
                {PAYMENT_METHOD_LABELS[method]}
              </label>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="rounded-lg border border-gray-200 p-4 text-sm">
              <p className="mb-1">
                <span className="text-gray-500">Доставка: </span>
                {deliveryMethod === "PICKUP_POINT"
                  ? pickupPoints.find((p) => p.id === pickupPointId)?.name
                  : `Курьером — ${address}`}
              </p>
              <p>
                <span className="text-gray-500">Оплата: </span>
                {PAYMENT_METHOD_LABELS[paymentMethod]}
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Комментарий к заказу (необязательно)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>
          </div>
        )}

        {errors && <p className="mt-4 text-sm text-red-500">{errors}</p>}

        <div className="mt-6 flex justify-between">
          {step > 0 ? (
            <button onClick={() => setStep((s) => s - 1)} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700">
              Назад
            </button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <button onClick={goNext} className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark">
              Далее
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={submitting}
              className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
            >
              {submitting ? "Оформляем..." : "Подтвердить заказ"}
            </button>
          )}
        </div>
      </div>

      <div className="w-full shrink-0 rounded-xl border border-gray-200 bg-white p-5 lg:w-80">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Ваш заказ ({items.length})</h3>
        <ul className="mb-4 max-h-64 space-y-2 overflow-y-auto text-sm">
          {items.map((item) => (
            <li key={item.variantId} className="flex justify-between gap-2 text-gray-600">
              <span className="line-clamp-1">
                {item.name} × {item.quantity}
              </span>
              <span className="shrink-0">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-1.5 border-t border-gray-100 pt-3 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Товары</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Доставка</span>
            <span>{deliveryFee ? formatPrice(deliveryFee) : "Бесплатно"}</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900">
            <span>Итого</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
