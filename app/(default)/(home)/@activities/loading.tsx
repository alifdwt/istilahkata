import { Activity } from "lucide-react";
import React from "react";

export default function ActivitiesLoading() {
  return (
    <section className="rounded-xl border bg-card p-6">
      <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <Activity className="h-5 w-5 text-secondary" />
        Aktivitas Terbaru
      </h4>

      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <ActivityItemSkeleton key={index} index={index} />
        ))}
      </div>

      <div className="mt-4 text-center">
        <div className="mx-auto h-5 w-32 animate-pulse rounded bg-muted" />
      </div>
    </section>
  );
}

const ActivityItemSkeleton = ({ index }: { index: number }) => {
  const getBorderColor = (index: number) => {
    const colors = [
      "border-blue-500",
      "border-green-500",
      "border-orange-500",
      "border-purple-500",
      "border-pink-500",
      "border-cyan-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div
      className={`rounded-r-lg border-l-2 pb-3 pl-3 ${getBorderColor(index)}`}
    >
      <div className="flex items-start gap-2">
        {/* Activity icon skeleton */}
        <div className="mt-0.5 flex-shrink-0">
          <div className="h-4 w-4 animate-pulse rounded bg-muted" />
        </div>

        {/* Content skeleton */}
        <div className="min-w-0 flex-1">
          {/* User info skeleton */}
          <div className="mb-1 flex items-center gap-2">
            <div className="h-3 w-3 animate-pulse rounded bg-muted" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            <div className="h-3 w-12 animate-pulse rounded bg-muted" />
          </div>

          {/* Activity description skeleton */}
          <div className="mb-1 space-y-1">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>

          {/* Timestamp skeleton */}
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-16 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};
