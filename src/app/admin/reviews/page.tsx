import Link from "next/link";
import { Star } from "lucide-react";
import { adminReviews } from "@/lib/admin-store";
import { ReviewStatusActions } from "@/components/admin/ReviewStatusActions";

export default function AdminReviewsPage() {
  const reviews = adminReviews.list();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Отзывы ({reviews.length})</h1>
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <Link href={`/product/${r.productSlug}`} className="text-sm font-medium text-gray-900 hover:text-brand">
                {r.productName}
              </Link>
              <ReviewStatusActions reviewId={r.id} status={r.status} />
            </div>
            <div className="mb-1 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className={i < r.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
              ))}
            </div>
            <p className="text-sm text-gray-600">{r.comment}</p>
            <p className="mt-1 text-xs text-gray-400">
              {r.author} · {r.createdAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
