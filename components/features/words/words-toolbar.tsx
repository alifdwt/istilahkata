"use client";

import { Grid, List, SortAsc } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface WordsToolbarProps {
  totalResults?: number;
  currentPage?: number;
  totalPages?: number;
}

export default function WordsToolbar({
  totalResults = 0,
  currentPage = 1,
  totalPages = 1,
}: WordsToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentView = searchParams.get("view") || "grid";
  const currentSort = searchParams.get("sort") || "newest";

  // Helper to update URL params
  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/words?${params.toString()}`);
  };

  const sortOptions = [
    { value: "newest", label: "Terbaru" },
    { value: "oldest", label: "Terlama" },
    { value: "most-viewed", label: "Paling Dilihat" },
    { value: "most-explained", label: "Paling Banyak Penjelasan" },
    { value: "alphabetical", label: "Alfabetis" },
  ];

  // Calculate showing range
  const itemsPerPage = 24;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Results info */}
      <div className="text-sm text-muted-foreground">
        {totalResults > 0 ? (
          <>
            Menampilkan{" "}
            <span className="font-medium text-foreground">
              {startItem}-{endItem}
            </span>{" "}
            dari{" "}
            <span className="font-medium text-foreground">{totalResults}</span>{" "}
            kata
          </>
        ) : (
          "Tidak ada kata ditemukan"
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <SortAsc className="h-4 w-4 text-muted-foreground" />
          <select
            value={currentSort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
          <button
            onClick={() => updateParam("view", "grid")}
            className={`rounded p-2 transition-colors ${
              currentView === "grid"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
            title="Grid view"
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => updateParam("view", "list")}
            className={`rounded p-2 transition-colors ${
              currentView === "list"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
            title="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
