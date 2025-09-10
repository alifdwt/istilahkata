import { Flame } from "lucide-react";
import React from "react";

export default function TrendingLoading() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <Flame className="h-6 w-6 text-accent" />
          Yang Lagi Populer
        </h3>
        <div className="h-6 w-20 animate-pulse rounded bg-muted" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <TrendingCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

const TrendingCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-card p-4">
      {/* Trending indicator skeleton */}
      <div className="absolute top-3 right-3">
        <div className="h-6 w-12 animate-pulse rounded-full bg-muted" />
      </div>

      {/* Word title skeleton */}
      <div className="mb-3">
        <div className="h-6 w-24 animate-pulse rounded bg-muted" />
      </div>

      {/* Languages skeleton */}
      <div className="mb-3 flex flex-wrap gap-1">
        <div className="h-6 w-16 animate-pulse rounded bg-muted" />
        <div className="h-6 w-20 animate-pulse rounded bg-muted" />
      </div>

      {/* Generation tag skeleton */}
      <div className="mb-3">
        <div className="h-6 w-18 animate-pulse rounded bg-muted" />
      </div>

      {/* Stats skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 animate-pulse rounded bg-muted" />
          <div className="h-4 w-8 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-4 w-8 animate-pulse rounded bg-muted" />
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};
