import { MapPin, Phone, Clock } from "lucide-react";
import { mockDb } from "@/lib/mock-db";
import { PICKUP_POINTS } from "@/lib/mock-data/pickup-points";

export default async function PickupPointsPage() {
  const cities = await mockDb.cities.findMany();

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="mb-2 text-xl font-bold text-gray-900">Пункты выдачи</h1>
      <p className="mb-6 text-sm text-gray-500">
        Интерактивная карта появится в следующей фазе — пока список ПВЗ по городам.
      </p>

      {cities.map((city) => {
        const points = PICKUP_POINTS.filter((p) => p.citySlug === city.slug);
        if (points.length === 0) return null;
        return (
          <section key={city.slug} className="mb-8">
            <h2 className="mb-3 text-sm font-semibold text-gray-900">{city.name.ru}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {points.map((pp) => (
                <div key={pp.id} className="rounded-xl border border-gray-200 bg-white p-4">
                  <p className="mb-1 flex items-center gap-1.5 font-medium text-gray-900">
                    <MapPin size={15} className="text-brand" /> {pp.name}
                  </p>
                  <p className="mb-2 text-sm text-gray-500">{pp.address}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {pp.workingHours}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={12} /> {pp.phone}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
