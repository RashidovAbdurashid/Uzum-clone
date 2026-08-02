"use client";

import { useState } from "react";
import type { ProductImage } from "@/lib/queries";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="mb-3 aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG placeholders */}
        <img src={current?.url} alt={current?.alt} className="h-full w-full object-cover transition hover:scale-105" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setActive(i)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                i === active ? "border-brand" : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- local SVG placeholders */}
              <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
