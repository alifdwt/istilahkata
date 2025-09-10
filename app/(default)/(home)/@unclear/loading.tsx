import { HelpCircle } from "lucide-react";
import React from "react";

export default function UnclearLoading() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <HelpCircle className="h-6 w-6 text-accent" />
          Kata Belum Jelas
        </h3>
        <div className="h-6 w-24 animate-pulse rounded bg-muted" />
      </div>

      <div className="rounded-xl border bg-card p-6">
        {/* Description skeleton */}
        <div className="mb-4">
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <UnclearCardSkeleton key={index} />
          ))}
        </div>

        {/* Load more button skeleton */}
        <div className="mt-6 text-center">
          <div className="inline-block h-10 w-48 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
    </section>
  );
}

const UnclearCardSkeleton = () => {
  return (
    <div className="relative flex items-center justify-between rounded-lg bg-muted/50 p-4">
      <div className="min-w-0 flex-1">
        {/* Word term skeleton */}
        <div className="mb-2">
          <div className="h-6 w-20 animate-pulse rounded bg-muted" />
        </div>

        {/* Word info skeleton */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-4 w-14 animate-pulse rounded bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* Action button skeleton */}
      <div className="ml-4 flex-shrink-0">
        <div className="h-8 w-16 animate-pulse rounded-lg bg-muted" />
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};
