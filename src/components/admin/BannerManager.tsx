"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import { createBannerAction, deleteBannerAction } from "@/actions/admin";
import type { MockBanner } from "@/lib/queries";

export function BannerManager({ banners }: { banners: MockBanner[] }) {
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [link, setLink] = useState("/catalog");

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await createBannerAction({
        title,
        subtitle,
        link,
        image: "/images/banners/low-price-guarantee.svg", // demo mode: reuse an existing placeholder image
      });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success("Баннер создан");
      setTitle("");
      setSubtitle("");
      setShowForm(false);
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const res = await deleteBannerAction(id);
      if (!res.ok) toast.error(res.error);
      else toast.success("Баннер удалён");
    });
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          <Plus size={16} /> Добавить баннер
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-2">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand sm:col-span-2"
          />
          <input
            required
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Подзаголовок"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand sm:col-span-2"
          />
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Ссылка"
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

      <div className="grid gap-3 sm:grid-cols-2">
        {banners.map((b) => (
          <div key={b.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element -- local SVG placeholder */}
            <img src={b.image} alt={b.title} className="h-32 w-full object-cover" />
            <div className="flex items-center justify-between p-3">
              <div>
                <p className="text-sm font-medium text-gray-900">{b.title}</p>
                <p className="text-xs text-gray-500">{b.subtitle}</p>
              </div>
              <button disabled={isPending} onClick={() => handleDelete(b.id)} className="text-gray-400 hover:text-red-500 disabled:opacity-50">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
