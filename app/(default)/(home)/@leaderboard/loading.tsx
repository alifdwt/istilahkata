import { Trophy } from "lucide-react";
import React from "react";

export default function LeaderboardLoading() {
  return (
    <section className="rounded-xl border bg-card p-6">
      <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <Trophy className="h-5 w-5 text-accent" />
        Leaderboard
      </h4>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <LeaderboardItemSkeleton key={index} rank={index + 1} />
        ))}
      </div>

      <div className="mt-4 text-center">
        <div className="mx-auto h-5 w-32 animate-pulse rounded bg-muted" />
      </div>
    </section>
  );
}

const LeaderboardItemSkeleton = ({ rank }: { rank: number }) => {
  const getRankSkeletonColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-600";
      case 2:
        return "from-gray-400 to-gray-600";
      case 3:
        return "from-orange-400 to-orange-600";
      default:
        return "from-muted to-muted";
    }
  };

  return (
    <div className="-m-2 flex items-center justify-between p-2">
      <div className="flex items-center gap-3">
        {/* Rank badge skeleton */}
        <div
          className={`h-8 w-8 rounded-full bg-gradient-to-br ${getRankSkeletonColor(
            rank
          )} flex items-center justify-center`}
        >
          <span className="text-sm font-bold text-white">{rank}</span>
        </div>

        {/* User info skeleton */}
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            <div className="h-3 w-12 animate-pulse rounded bg-muted" />
          </div>

          {/* Generation badge skeleton */}
          <div className="h-4 w-14 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="text-right">
        <div className="mb-1 h-4 w-12 animate-pulse rounded bg-muted" />
        <div className="h-3 w-10 animate-pulse rounded bg-muted" />
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};
