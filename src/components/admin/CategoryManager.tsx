"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import { createCategoryAction, deleteCategoryAction } from "@/actions/admin";
import type { CategoryNode } from "@/lib/mock-data/categories";

export function CategoryManager({ categories }: { categories: CategoryNode[] }) {
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [slug, setSlug] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameUz, setNameUz] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [parentSlug, setParentSlug] = useState<string>("");

  const roots = categories.filter((c) => c.parentSlug === null);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await createCategoryAction({
        slug,
        nameRu,
        nameUz,
        nameEn,
        icon: "Package",
        parentSlug: parentSlug || null,
      });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success("Категория создана");
      setSlug("");
      setNameRu("");
      setNameUz("");
      setNameEn("");
      setShowForm(false);
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const res = await deleteCategoryAction(id);
      if (!res.ok) toast.error(res.error);
      else toast.success("Категория удалена");
    });
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          <Plus size={16} /> Добавить категорию
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-2">
          <input
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="slug (например, toys)"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <select
            value={parentSlug}
            onChange={(e) => setParentSlug(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand"
          >
            <option value="">— корневая категория —</option>
            {roots.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name.ru}
              </option>
            ))}
          </select>
          <input
            required
            value={nameRu}
            onChange={(e) => setNameRu(e.target.value)}
            placeholder="Название (RU)"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <input
            value={nameUz}
            onChange={(e) => setNameUz(e.target.value)}
            placeholder="Название (UZ)"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <input
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            placeholder="Название (EN)"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand sm:col-span-2"
          />
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60 sm:col-span-2"
          >
            Сохранить
          </button>
        </form>
      )}

      <div className="space-y-4">
        {roots.map((root) => (
          <div key={root.id} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-gray-900">{root.name.ru}</span>
              <button
                disabled={isPending}
                onClick={() => handleDelete(root.id)}
                className="text-gray-400 hover:text-red-500 disabled:opacity-50"
                aria-label="Удалить"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <ul className="space-y-1 pl-4">
              {categories
                .filter((c) => c.parentSlug === root.slug)
                .map((child) => (
                  <li key={child.id} className="flex items-center justify-between text-sm text-gray-600">
                    <span>— {child.name.ru}</span>
                    <button
                      disabled={isPending}
                      onClick={() => handleDelete(child.id)}
                      className="text-gray-400 hover:text-red-500 disabled:opacity-50"
                      aria-label="Удалить"
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
