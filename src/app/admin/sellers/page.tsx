import { mockDb } from "@/lib/mock-db";
import { UserActions } from "@/components/admin/UserActions";

export default async function AdminSellersPage() {
  const users = await mockDb.users.findMany();
  const sellers = users.filter((u) => u.role === "SELLER");

  return (
    <div>
      <h1 className="mb-2 text-xl font-bold text-gray-900">Продавцы ({sellers.length})</h1>
      <p className="mb-6 text-xs text-gray-400">
        Демо-режим: заявок на модерацию нет — единственный тестовый продавец (seller@uzum-clone.local)
        засеян сразу со статусом ACTIVE. Реестр товаров и заказов у всех продавцов общий (см. /seller/products).
      </p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 text-left text-xs text-gray-500">
            <tr>
              <th className="px-4 py-3">Компания / имя</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Регистрация</th>
              <th className="px-4 py-3">Роль / статус</th>
            </tr>
          </thead>
          <tbody>
            {sellers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                  Продавцов пока нет
                </td>
              </tr>
            ) : (
              sellers.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-3 font-medium text-gray-900">{u.name ?? "—"}</td>
                  <td className="px-4 py-3 text-gray-500">{u.email}</td>
                  <td className="px-4 py-3 text-gray-500">{u.createdAt.toLocaleDateString("ru-RU")}</td>
                  <td className="px-4 py-3">
                    <UserActions userId={u.id} role={u.role} status={u.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
