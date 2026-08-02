import Link from "next/link";
import { auth } from "@/lib/auth";
import { ordersStore } from "@/lib/orders-store";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/mock-data/orders";

export default async function OrdersPage() {
  const session = await auth();
  const orders = session?.user ? ordersStore.findByUser(session.user.id) : [];

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
        <p className="mb-4 text-gray-500">У вас пока нет заказов</p>
        <Link href="/catalog" className="text-brand hover:underline">
          Перейти в каталог →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h1 className="mb-4 text-xl font-bold text-gray-900">Мои заказы</h1>
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/account/orders/${order.id}`}
          className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 hover:border-brand"
        >
          <div>
            <p className="text-sm font-semibold text-gray-900">{order.orderNumber}</p>
            <p className="text-xs text-gray-500">
              {new Date(order.createdAt).toLocaleDateString("ru-RU")} · {order.items.length} товар(ов)
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{formatPrice(order.total)}</p>
            <p className="text-xs text-brand">{ORDER_STATUS_LABELS[order.status]}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
