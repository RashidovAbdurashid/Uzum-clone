const SETTINGS = [
  { label: "Название платформы", value: "Uzum Market Clone" },
  { label: "Комиссия по умолчанию", value: "15%" },
  { label: "Бесплатная доставка от", value: "0 сўм (доставка курьером всегда 25 000 сўм в этой сборке)" },
  { label: "Автоматическая модерация товаров", value: "Выключена (все новые товары публикуются вручную)" },
  { label: "Автоматическая модерация отзывов", value: "Выключена" },
  { label: "Email отправителя", value: "no-reply@uzum-clone.local" },
];

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="mb-2 text-xl font-bold text-gray-900">Настройки платформы</h1>
      <p className="mb-6 text-xs text-gray-400">
        Только просмотр в этой сборке — значения зашиты в код. Форма редактирования с сохранением
        в БД запланирована на следующую итерацию.
      </p>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <dl className="divide-y divide-gray-100">
          {SETTINGS.map((s) => (
            <div key={s.label} className="flex justify-between px-4 py-3 text-sm">
              <dt className="text-gray-500">{s.label}</dt>
              <dd className="text-right font-medium text-gray-900">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
