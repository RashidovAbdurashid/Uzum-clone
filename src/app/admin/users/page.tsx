import { mockDb } from "@/lib/mock-db";
import { UserActions } from "@/components/admin/UserActions";

export default async function AdminUsersPage() {
  const users = await mockDb.users.findMany();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Пользователи ({users.length})</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 text-left text-xs text-gray-500">
            <tr>
              <th className="px-4 py-3">Имя</th>
              <th className="px-4 py-3">Email / телефон</th>
              <th className="px-4 py-3">Регистрация</th>
              <th className="px-4 py-3">Роль / статус</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3 font-medium text-gray-900">{u.name ?? "—"}</td>
                <td className="px-4 py-3 text-gray-500">{u.email ?? u.phone ?? "—"}</td>
                <td className="px-4 py-3 text-gray-500">{u.createdAt.toLocaleDateString("ru-RU")}</td>
                <td className="px-4 py-3">
                  <UserActions userId={u.id} role={u.role} status={u.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
