const KPIS = [
  { label: "Продажи сегодня", value: "0 сўм" },
  { label: "Заказов за неделю", value: "0" },
  { label: "Средний чек", value: "0 сўм" },
  { label: "Рейтинг", value: "—" },
  { label: "Баланс", value: "0 сўм" },
];

export default function SellerDashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">{kpi.label}</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
