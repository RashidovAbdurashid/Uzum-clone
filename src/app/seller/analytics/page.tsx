import { adminOrders, adminProducts } from "@/lib/admin-store";
import { SalesChart } from "@/components/admin/SalesChart";

export default function SellerAnalyticsPage() {
  const orders = adminOrders.listAll();
  const products = adminProducts.list();

  const days: { day: string; total: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayKey = date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
    const total = orders
      .filter((o) => new Date(o.createdAt).toDateString() === date.toDateString())
      .reduce((sum, o) => sum + o.total, 0);
    days.push({ day: dayKey, total });
  }

  const topProducts = [...products].sort((a, b) => b.salesCount - a.salesCount).slice(0, 5);

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Аналитика</h1>
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-gray-900">Продажи за 14 дней</h2>
        <SalesChart data={days} />
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-gray-900">Топ-5 моих товаров</h2>
        <ul className="space-y-2">
          {topProducts.map((p, i) => (
            <li key={p.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">
                {i + 1}. {p.name}
              </span>
              <span className="font-medium text-gray-900">{p.salesCount} продаж</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
