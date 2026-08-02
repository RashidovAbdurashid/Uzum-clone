import { adminOrders } from "@/lib/admin-store";
import { formatPrice } from "@/lib/utils";

const COMMISSION_RATE = 0.15;

export default function SellerFinancePage() {
  const orders = adminOrders.listAll().filter((o) => o.paymentStatus === "PAID");
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const commission = revenue * COMMISSION_RATE;
  const balance = revenue - commission;

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Финансы</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Выручка</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{formatPrice(revenue)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Комиссия платформы (15%)</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{formatPrice(commission)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Баланс к выплате</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{formatPrice(balance)}</p>
        </div>
      </div>
      <button
        disabled
        className="mt-6 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-400"
        title="Запрос выплаты пока не реализован в этой сборке"
      >
        Запросить выплату
      </button>
    </div>
  );
}
