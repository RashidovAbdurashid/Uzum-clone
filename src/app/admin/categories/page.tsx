import { adminCategories } from "@/lib/admin-store";
import { CategoryManager } from "@/components/admin/CategoryManager";

export default function AdminCategoriesPage() {
  const categories = adminCategories.list();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Категории ({categories.length})</h1>
      <CategoryManager categories={categories} />
    </div>
  );
}
