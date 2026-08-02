"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { MockProduct } from "@/lib/queries";

const TABS = ["Описание", "Характеристики", "Отзывы"] as const;

export function ProductTabs({ product }: { product: MockProduct }) {
  const [active, setActive] = useState<(typeof TABS)[number]>("Описание");
  const rating = product.reviews.length
    ? Math.round((product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length) * 10) / 10
    : 0;

  return (
    <div className="mt-10">
      <div className="mb-6 flex gap-6 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`border-b-2 pb-3 text-sm font-medium transition ${
              active === tab ? "border-brand text-brand" : "border-transparent text-gray-500"
            }`}
          >
            {tab}
            {tab === "Отзывы" && ` (${product.reviews.length})`}
          </button>
        ))}
      </div>

      {active === "Описание" && <p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-gray-700">{product.description}</p>}

      {active === "Характеристики" && (
        <dl className="max-w-2xl divide-y divide-gray-100">
          {product.specs.map((spec) => (
            <div key={spec.label} className="flex justify-between py-2.5 text-sm">
              <dt className="text-gray-500">{spec.label}</dt>
              <dd className="font-medium text-gray-900">{spec.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {active === "Отзывы" && (
        <div className="max-w-2xl">
          {product.reviews.length === 0 ? (
            <p className="text-sm text-gray-500">Пока нет отзывов на этот товар.</p>
          ) : (
            <>
              <div className="mb-6 flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">{rating}</span>
                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className={i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{product.reviews.length} отзывов</p>
                </div>
              </div>
              <ul className="space-y-5">
                {product.reviews.map((review) => (
                  <li key={review.id} className="border-b border-gray-100 pb-5 last:border-0">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{review.author}</span>
                      {review.isVerifiedPurchase && (
                        <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
                          Проверенная покупка
                        </span>
                      )}
                    </div>
                    <div className="mb-1.5 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                    <p className="mt-1 text-xs text-gray-400">{review.createdAt}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
