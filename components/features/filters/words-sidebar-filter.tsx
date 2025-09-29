"use client";

import {
  Search,
  X,
  TrendingUp,
  Clock,
  HelpCircle,
  CheckCircle,
  Zap,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface FilterOption {
  id: string;
  code: string;
  name: string;
  shortName?: string;
  colorClass?: string;
  count: number;
}

interface WordsSidebarFilterProps {
  generations: FilterOption[];
  languages: FilterOption[];
  suggestedWords?: Array<{
    id: string;
    term: string;
    slug: string;
    totalExplanations: number;
  }>;
}

export default function WordsSidebarFilter({
  generations,
  languages,
  suggestedWords = [],
}: WordsSidebarFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  // Get current filter values
  const currentGeneration = searchParams.get("generation");
  const currentLanguage = searchParams.get("language");
  const currentStatus = searchParams.get("status");

  // Helper to update URL params
  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Reset to page 1 when filter changes
    params.delete("page");

    router.push(`/words?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("search", searchQuery || null);
  };

  const clearSearch = () => {
    setSearchQuery("");
    updateParam("search", null);
  };

  const clearAllFilters = () => {
    router.push("/words");
  };

  const activeFiltersCount = [
    searchParams.get("search"),
    currentGeneration,
    currentLanguage,
    currentStatus,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <div className="rounded-xl border bg-card p-6">
        <h3 className="mb-4 font-semibold">Pencarian</h3>

        <form onSubmit={handleSearch} className="space-y-3">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata..."
              className="w-full rounded-lg border bg-background py-2 pr-10 pl-10 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Cari
          </button>
        </form>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="rounded-xl border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium">
              Filter Aktif ({activeFiltersCount})
            </span>
            <button
              onClick={clearAllFilters}
              className="text-xs text-primary hover:underline"
            >
              Hapus Semua
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {searchParams.get("search") && (
              <FilterTag
                label={`"${searchParams.get("search")}"`}
                onRemove={() => updateParam("search", null)}
              />
            )}
            {currentGeneration && (
              <FilterTag
                label={
                  generations.find((g) => g.code === currentGeneration)
                    ?.shortName || currentGeneration
                }
                onRemove={() => updateParam("generation", null)}
              />
            )}
            {currentLanguage && (
              <FilterTag
                label={
                  languages.find((l) => l.code === currentLanguage)?.name ||
                  currentLanguage
                }
                onRemove={() => updateParam("language", null)}
              />
            )}
            {currentStatus && (
              <FilterTag
                label={getStatusLabel(currentStatus)}
                onRemove={() => updateParam("status", null)}
              />
            )}
          </div>
        </div>
      )}

      {/* Quick Filters */}
      <div className="rounded-xl border bg-card p-6">
        <h3 className="mb-4 font-semibold">Filter Cepat</h3>

        <div className="space-y-2">
          <QuickFilterButton
            icon={<TrendingUp className="h-4 w-4" />}
            label="Trending"
            count={156}
            isActive={currentStatus === "trending"}
            onClick={() =>
              updateParam(
                "status",
                currentStatus === "trending" ? null : "trending"
              )
            }
          />
          <QuickFilterButton
            icon={<Clock className="h-4 w-4" />}
            label="Terbaru"
            count={89}
            isActive={currentStatus === "newest"}
            onClick={() =>
              updateParam(
                "status",
                currentStatus === "newest" ? null : "newest"
              )
            }
          />
          <QuickFilterButton
            icon={<HelpCircle className="h-4 w-4" />}
            label="Perlu Penjelasan"
            count={67}
            isActive={currentStatus === "needs-help"}
            onClick={() =>
              updateParam(
                "status",
                currentStatus === "needs-help" ? null : "needs-help"
              )
            }
          />
          <QuickFilterButton
            icon={<CheckCircle className="h-4 w-4" />}
            label="Lengkap"
            count={892}
            isActive={currentStatus === "complete"}
            onClick={() =>
              updateParam(
                "status",
                currentStatus === "complete" ? null : "complete"
              )
            }
          />
        </div>
      </div>

      {/* Generation Filter */}
      <div className="rounded-xl border bg-card p-6">
        <h3 className="mb-4 font-semibold">Generasi</h3>

        <div className="space-y-2">
          {generations.map((gen) => (
            <label
              key={gen.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
            >
              <input
                type="checkbox"
                checked={currentGeneration === gen.code}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateParam("generation", gen.code);
                  } else {
                    updateParam("generation", null);
                  }
                }}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div className="min-w-0 flex-1">
                <div
                  className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${gen.colorClass}`}
                >
                  {gen.shortName || gen.name}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{gen.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Language Filter */}
      <div className="rounded-xl border bg-card p-6">
        <h3 className="mb-4 font-semibold">Bahasa</h3>

        <div className="space-y-2">
          {languages.map((lang) => (
            <label
              key={lang.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
            >
              <input
                type="checkbox"
                checked={currentLanguage === lang.code}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateParam("language", lang.code);
                  } else {
                    updateParam("language", null);
                  }
                }}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div className="min-w-0 flex-1 text-sm">{lang.name}</div>
              <span className="text-xs text-muted-foreground">
                {lang.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Suggested Words */}
      {suggestedWords.length > 0 && (
        <div className="rounded-xl border bg-card p-6">
          <h3 className="mb-4 flex items-center gap-2 font-semibold">
            <Zap className="h-4 w-4 text-accent" />
            Butuh Bantuan
          </h3>

          <div className="space-y-2">
            {suggestedWords.map((word) => (
              <a
                key={word.id}
                href={`/word/${word.slug}`}
                className="block rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <div className="font-mono text-sm font-medium text-primary">
                  {word.term}
                </div>
                <div className="text-xs text-muted-foreground">
                  {word.totalExplanations === 0
                    ? "Belum ada penjelasan"
                    : `${word.totalExplanations} penjelasan`}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function FilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {label}
      <button
        onClick={onRemove}
        className="transition-colors hover:text-primary/70"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

function QuickFilterButton({
  icon,
  label,
  count,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg p-2 text-left text-sm transition-colors ${
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        <span
          className={`text-xs ${
            isActive ? "opacity-75" : "text-muted-foreground"
          }`}
        >
          {count}
        </span>
      </div>
    </button>
  );
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    trending: "Trending",
    newest: "Terbaru",
    "needs-help": "Perlu Penjelasan",
    complete: "Lengkap",
  };
  return labels[status] || status;
}
