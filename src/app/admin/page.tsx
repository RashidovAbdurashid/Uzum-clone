const KPIS = [
  { label: "Заказы сегодня", value: "0" },
  { label: "Выручка за месяц", value: "0 сўм" },
  { label: "Новые пользователи", value: "0" },
  { label: "Активные продавцы", value: "0" },
  { label: "Средний чек", value: "0 сўм" },
  { label: "Конверсия", value: "0%" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">{kpi.label}</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{kpi.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-400">
        Графики (Recharts) и таблицы последних заказов будут подключены в Фазе 5, когда появятся реальные данные
        заказов и аналитики.
      </div>
    </div>
  );
}
