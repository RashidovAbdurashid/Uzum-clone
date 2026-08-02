import { auth } from "@/lib/auth";

export default async function SellerSettingsPage() {
  const session = await auth();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Настройки</h1>
      <div className="max-w-md rounded-xl border border-gray-200 bg-white p-5">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="text-gray-500">Компания</dt>
            <dd className="font-medium text-gray-900">{session?.user?.name ?? "—"}</dd>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium text-gray-900">{session?.user?.email ?? "—"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Комиссия</dt>
            <dd className="font-medium text-gray-900">15%</dd>
          </div>
        </dl>
      </div>
      <p className="mt-3 text-xs text-gray-400">Редактирование реквизитов пока не реализовано в этой сборке.</p>
    </div>
  );
}
