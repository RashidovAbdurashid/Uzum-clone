import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { auth } from "@/lib/auth";
import { ordersStore } from "@/lib/orders-store";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from "@/lib/mock-data/orders";
import { PICKUP_POINTS } from "@/lib/mock-data/pickup-points";

export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { orderId } = await params;
  const order = ordersStore.findById(orderId);
  if (!order || order.userId !== session.user.id) notFound();

  const pickupPoint = order.pickupPointId ? PICKUP_POINTS.find((p) => p.id === order.pickupPointId) : null;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
        <CheckCircle2 className="text-green-600" size={24} />
        <div>
          <p className="font-semibold text-green-800">Заказ {order.orderNumber} оформлен</p>
          <p className="text-sm text-green-700">Мы отправили подтверждение на вашу почту/телефон.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">Товары</h2>
          <ul className="mb-6 space-y-2">
            {order.items.map((item) => (
              <li key={item.variantId} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                {/* eslint-disable-next-line @next/next/no-img-element -- local SVG placeholder */}
                <img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-900">{item.name}</p>
                  <p className="text-gray-500">
                    {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>

          <h2 className="mb-3 text-sm font-semibold text-gray-900">История статуса</h2>
          <ul className="space-y-3 border-l-2 border-gray-200 pl-4">
            {order.statusHistory.map((h, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-brand" />
                <p className="text-sm font-medium text-gray-900">{ORDER_STATUS_LABELS[h.status]}</p>
                <p className="text-xs text-gray-400">{new Date(h.createdAt).toLocaleString("ru-RU")}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">Информация о заказе</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Номер</dt>
              <dd className="font-medium text-gray-900">{order.orderNumber}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Дата</dt>
              <dd className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString("ru-RU")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Доставка</dt>
              <dd className="text-right font-medium text-gray-900">
                {order.deliveryMethod === "PICKUP_POINT" ? pickupPoint?.name ?? "ПВЗ" : order.address}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Оплата</dt>
              <dd className="font-medium text-gray-900">{PAYMENT_METHOD_LABELS[order.paymentMethod]}</dd>
            </div>
            {order.note && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Комментарий</dt>
                <dd className="text-right font-medium text-gray-900">{order.note}</dd>
              </div>
            )}
          </dl>
          <div className="mt-4 space-y-1 border-t border-gray-100 pt-3 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Товары</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Доставка</span>
              <span>{order.deliveryFee ? formatPrice(order.deliveryFee) : "Бесплатно"}</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900">
              <span>Итого</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <Link href="/account/orders" className="mt-6 inline-block text-sm text-brand hover:underline">
        ← Все заказы
      </Link>
    </div>
  );
}
