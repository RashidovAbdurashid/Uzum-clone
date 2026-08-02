import { adminOrders } from "@/lib/admin-store";
import { formatPrice } from "@/lib/utils";
import { PAYMENT_METHOD_LABELS } from "@/lib/mock-data/orders";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

export default function AdminOrdersPage() {
  const orders = adminOrders.listAll();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Заказы ({orders.length})</h1>
      {orders.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center text-gray-400">
          Заказов пока нет — оформите тестовый заказ через витрину, чтобы увидеть его здесь.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-left text-xs text-gray-500">
              <tr>
                <th className="px-4 py-3">№</th>
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3">Товары</th>
                <th className="px-4 py-3">Сумма</th>
                <th className="px-4 py-3">Оплата</th>
                <th className="px-4 py-3">Статус</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-3 font-medium text-gray-900">{o.orderNumber}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(o.createdAt).toLocaleDateString("ru-RU")}</td>
                  <td className="px-4 py-3 text-gray-500">{o.items.length} шт.</td>
                  <td className="px-4 py-3 text-gray-900">{formatPrice(o.total)}</td>
                  <td className="px-4 py-3 text-gray-500">{PAYMENT_METHOD_LABELS[o.paymentMethod]}</td>
                  <td className="px-4 py-3">
                    <OrderStatusSelect orderId={o.id} status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
