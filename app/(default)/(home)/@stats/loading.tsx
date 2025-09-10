import React from "react";

export default function StatsLoading() {
  return (
    <section>
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
        {/* Main stat cards skeleton */}
        {Array.from({ length: 5 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

const StatCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-card p-4 text-center">
      {/* Icon skeleton */}
      <div className="mb-1 flex items-center justify-center">
        <div className="h-4 w-4 animate-pulse rounded bg-muted" />
      </div>

      {/* Number skeleton */}
      <div className="mb-1">
        <div className="mx-auto h-8 w-16 animate-pulse rounded bg-muted" />
      </div>

      {/* Label skeleton */}
      <div className="mx-auto h-4 w-12 animate-pulse rounded bg-muted" />

      {/* Percentage skeleton (for generation cards) */}
      <div className="mt-1">
        <div className="mx-auto h-3 w-8 animate-pulse rounded bg-muted" />
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};
