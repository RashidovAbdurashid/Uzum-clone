"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export function SearchBar({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  // TODO(Phase 2): debounce(300ms) + Meilisearch autocomplete dropdown,
  // search history (localStorage) and popular queries (Redis top-20).
  return (
    <form onSubmit={handleSubmit} className="relative flex-1">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-11 text-sm outline-none focus:border-brand"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-500 hover:text-brand"
      >
        <Search size={18} />
      </button>
    </form>
  );
}
