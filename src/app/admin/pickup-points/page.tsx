import { mockDb } from "@/lib/mock-db";
import { PICKUP_POINTS } from "@/lib/mock-data/pickup-points";

export default async function AdminPickupPointsPage() {
  const cities = await mockDb.cities.findMany();
  const cityName = (slug: string) => cities.find((c) => c.slug === slug)?.name.ru ?? slug;

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Пункты выдачи ({PICKUP_POINTS.length})</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 text-left text-xs text-gray-500">
            <tr>
              <th className="px-4 py-3">Название</th>
              <th className="px-4 py-3">Город</th>
              <th className="px-4 py-3">Адрес</th>
              <th className="px-4 py-3">Время работы</th>
              <th className="px-4 py-3">Телефон</th>
            </tr>
          </thead>
          <tbody>
            {PICKUP_POINTS.map((pp) => (
              <tr key={pp.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3 font-medium text-gray-900">{pp.name}</td>
                <td className="px-4 py-3 text-gray-500">{cityName(pp.citySlug)}</td>
                <td className="px-4 py-3 text-gray-500">{pp.address}</td>
                <td className="px-4 py-3 text-gray-500">{pp.workingHours}</td>
                <td className="px-4 py-3 text-gray-500">{pp.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-400">
        Только просмотр в этой сборке — CRUD и карта запланированы на следующую итерацию.
      </p>
    </div>
  );
}
