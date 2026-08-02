import { adminOrders } from "@/lib/admin-store";
import { formatPrice } from "@/lib/utils";
import { PAYMENT_METHOD_LABELS } from "@/lib/mock-data/orders";

const COMMISSION_RATE = 0.15;

export default function AdminFinancePage() {
  const orders = adminOrders.listAll();
  const paidOrders = orders.filter((o) => o.paymentStatus === "PAID");

  const gmv = paidOrders.reduce((sum, o) => sum + o.total, 0);
  const commission = gmv * COMMISSION_RATE;
  const payout = gmv - commission;

  const byMethod = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.paymentMethod] = (acc[o.paymentMethod] ?? 0) + o.total;
    return acc;
  }, {});

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Финансы</h1>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Оборот (GMV)", value: formatPrice(gmv) },
          { label: "Комиссия платформы (15%)", value: formatPrice(commission) },
          { label: "К выплате продавцам", value: formatPrice(payout) },
          { label: "Оплаченных заказов", value: String(paidOrders.length) },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">{kpi.label}</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{kpi.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 text-sm font-semibold text-gray-900">Оборот по способам оплаты</h2>
      {Object.keys(byMethod).length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 bg-white py-10 text-center text-gray-400">
          Пока нет данных — оформите тестовый заказ.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(byMethod).map(([method, total]) => (
                <tr key={method} className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-3 text-gray-700">{PAYMENT_METHOD_LABELS[method as keyof typeof PAYMENT_METHOD_LABELS]}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">{formatPrice(total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
