import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h1 className="mb-4 text-xl font-bold text-gray-900">Профиль</h1>
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <dt className="text-gray-500">Имя</dt>
          <dd className="font-medium text-gray-900">{session?.user?.name || "—"}</dd>
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <dt className="text-gray-500">Телефон</dt>
          <dd className="font-medium text-gray-900">{session?.user?.email || "—"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Роль</dt>
          <dd className="font-medium text-gray-900">{session?.user?.role}</dd>
        </div>
      </dl>
    </div>
  );
}
