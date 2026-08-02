import { Percent } from "lucide-react";

export default function AdminPromotionsPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Акции и промокоды</h1>
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
        <Percent className="text-gray-300" size={32} />
        <p className="text-gray-500">Раздел ещё не реализован в этой сборке.</p>
        <p className="max-w-md text-sm text-gray-400">
          Планируется: CRUD промокодов (% / фикс. скидка / бесплатная доставка), привязка к
          товарам/категориям/продавцам, лимиты использования и статистика применения.
        </p>
      </div>
    </div>
  );
}
