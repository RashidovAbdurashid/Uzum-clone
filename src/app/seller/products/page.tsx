import { adminProducts } from "@/lib/admin-store";
import { formatPrice } from "@/lib/utils";
import { ProductStatusActions } from "@/components/admin/ProductStatusActions";

export default function SellerProductsPage() {
  const products = adminProducts.list();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Мои товары ({products.length})</h1>
      </div>
      <p className="mb-4 text-xs text-gray-400">
        Демо-режим: в этой сборке каталог общий (нет привязки товара к конкретному продавцу),
        поэтому продавец видит весь каталог, как если бы он был его собственным.
      </p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 text-left text-xs text-gray-500">
            <tr>
              <th className="px-4 py-3">Товар</th>
              <th className="px-4 py-3">Цена</th>
              <th className="px-4 py-3">Остаток</th>
              <th className="px-4 py-3">Продажи</th>
              <th className="px-4 py-3">Статус</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 last:border-0">
                <td className="flex items-center gap-3 px-4 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local SVG placeholder */}
                  <img src={p.images[0]?.url} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                  <span className="line-clamp-1 font-medium text-gray-900">{p.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-900">{formatPrice(p.variants[0]?.price ?? 0)}</td>
                <td className="px-4 py-3 text-gray-500">{p.variants.reduce((s, v) => s + v.stock, 0)}</td>
                <td className="px-4 py-3 text-gray-500">{p.salesCount}</td>
                <td className="px-4 py-3">
                  <ProductStatusActions productId={p.id} status={p.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
