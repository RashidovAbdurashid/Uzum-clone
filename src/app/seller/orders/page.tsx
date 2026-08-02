import { adminOrders } from "@/lib/admin-store";
import { formatPrice } from "@/lib/utils";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

export default function SellerOrdersPage() {
  const orders = adminOrders.listAll();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Заказы ({orders.length})</h1>
      {orders.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center text-gray-400">
          Заказов пока нет.
        </p>
      ) : (
        <ul className="space-y-2">
          {orders.map((o) => (
            <li key={o.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">{o.orderNumber}</p>
                <p className="text-xs text-gray-500">
                  {new Date(o.createdAt).toLocaleDateString("ru-RU")} · {o.items.length} товар(ов) · {formatPrice(o.total)}
                </p>
              </div>
              <OrderStatusSelect orderId={o.id} status={o.status} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
