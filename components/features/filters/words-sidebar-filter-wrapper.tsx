// components/features/filters/words-sidebar-filter-wrapper.tsx
// Server component wrapper untuk fetch filter data

import { getFilterOptions } from "@/lib/db/queries/words-filters";
import { getSuggestedWords } from "@/lib/db/queries/words-listing";

import WordsSidebarFilter from "./words-sidebar-filter";

export default async function WordsSidebarFilterWrapper() {
  try {
    // Fetch filter options dan suggested words
    const [filterOptions, suggestedWords] = await Promise.all([
      getFilterOptions(),
      getSuggestedWords(5),
    ]);

    // Transform generations data
    const generations = filterOptions.generations.map((gen) => ({
      id: gen.id,
      code: gen.code,
      name: gen.name,
      shortName: gen.shortName,
      colorClass: gen.colorClass,
      count: gen.wordCount,
    }));

    // Transform languages data
    const languages = filterOptions.languages.map((lang) => ({
      id: lang.id,
      code: lang.code,
      name: lang.name,
      colorClass: "",
      count: lang.wordCount,
    }));

    return (
      <WordsSidebarFilter
        generations={generations}
        languages={languages}
        suggestedWords={suggestedWords}
      />
    );
  } catch (error) {
    console.error("Error fetching filter options:", error);

    // Fallback UI
    return (
      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Gagal memuat filter. Silakan refresh halaman.
        </p>
      </div>
    );
  }
}

// Loading skeleton for sidebar filter
export function WordsSidebarFilterSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search skeleton */}
      <div className="rounded-xl border bg-card p-6">
        <div className="mb-4 h-5 w-24 animate-pulse rounded bg-muted" />
        <div className="space-y-3">
          <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
        </div>
      </div>

      {/* Quick filters skeleton */}
      <div className="rounded-xl border bg-card p-6">
        <div className="mb-4 h-5 w-32 animate-pulse rounded bg-muted" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-full animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      </div>

      {/* Generation filters skeleton */}
      <div className="rounded-xl border bg-card p-6">
        <div className="mb-4 h-5 w-20 animate-pulse rounded bg-muted" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-full animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      </div>

      {/* Language filters skeleton */}
      <div className="rounded-xl border bg-card p-6">
        <div className="mb-4 h-5 w-16 animate-pulse rounded bg-muted" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-full animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      </div>

      {/* Suggested words skeleton */}
      <div className="rounded-xl border bg-card p-6">
        <div className="mb-4 h-5 w-32 animate-pulse rounded bg-muted" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-16 w-full animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
