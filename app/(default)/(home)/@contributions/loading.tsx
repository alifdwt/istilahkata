import { PenTool } from "lucide-react";
import React from "react";

export default function ContributionsLoading() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <PenTool className="h-6 w-6 text-accent" />
          Kontribusi Baru
        </h3>
        <div className="h-6 w-20 animate-pulse rounded bg-muted" />
      </div>

      <div className="rounded-xl border bg-card">
        {/* Header skeleton */}
        <div className="border-b p-4">
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>

        {/* Contribution items skeleton */}
        <div className="divide-y divide-border">
          {Array.from({ length: 8 }).map((_, index) => (
            <ContributionItemSkeleton key={index} />
          ))}
        </div>

        {/* Footer skeleton */}
        <div className="border-t bg-muted/30 p-4">
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </section>
  );
}

const ContributionItemSkeleton = () => {
  return (
    <div className="p-4">
      <div className="flex items-start gap-3">
        {/* Icon skeleton */}
        <div className="mt-1 flex-shrink-0">
          <div className="h-4 w-4 animate-pulse rounded bg-muted" />
        </div>

        {/* Content skeleton */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              {/* User info skeleton */}
              <div className="mb-1 flex items-center gap-2">
                <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              </div>

              {/* Action description skeleton */}
              <div className="mb-2">
                <div className="h-4 w-48 animate-pulse rounded bg-muted" />
              </div>

              {/* Content preview skeleton */}
              <div className="space-y-1">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
              </div>
            </div>

            {/* Timestamp skeleton */}
            <div className="flex-shrink-0">
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};
