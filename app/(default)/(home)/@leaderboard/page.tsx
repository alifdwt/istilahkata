import { Trophy, Users, Award, Crown } from "lucide-react";
import Link from "next/link";
import React from "react";

import { getLeaderboard } from "@/lib/db/queries/homepage";

export default async function LeaderboardSlot() {
  // Fetch leaderboard data from database
  const leaderboard = await getLeaderboard(5); // Get top 5 contributors

  return (
    <section className="rounded-xl border bg-card p-6">
      <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <Trophy className="h-5 w-5 text-accent" />
        Leaderboard
      </h4>

      {leaderboard.length === 0 ? (
        <div className="py-8 text-center">
          <Users className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Belum ada kontributor aktif
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {leaderboard.map((leader) => (
            <LeaderboardItem key={leader.id} leader={leader} />
          ))}
        </div>
      )}

      <Link
        href="/leaderboard"
        className="mt-4 block w-full text-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        Lihat Semua Kontributor
      </Link>
    </section>
  );
}

// Leaderboard Item Component
const LeaderboardItem = ({
  leader,
}: {
  leader: Awaited<ReturnType<typeof getLeaderboard>>[0];
}) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 2:
        return <Award className="h-4 w-4 text-gray-500" />;
      case 3:
        return <Award className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg shadow-yellow-500/25";
      case 2:
        return "bg-gradient-to-br from-gray-400 to-gray-600 text-white shadow-lg shadow-gray-500/25";
      case 3:
        return "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/25";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="group -m-2 flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-3">
        {/* Rank Badge */}
        <div className="relative">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-transform group-hover:scale-110 ${getRankStyles(
              leader.rank
            )}`}
          >
            {leader.rank}
          </span>
          {leader.rank <= 3 && (
            <div className="absolute -top-1 -right-1">
              {getRankIcon(leader.rank)}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono font-medium text-foreground transition-colors group-hover:text-primary">
              @{leader.username}
            </span>
            {leader.displayName && (
              <span className="max-w-20 truncate text-xs text-muted-foreground">
                ({leader.displayName})
              </span>
            )}
          </div>

          {/* Generation Badge */}
          {leader.generation && (
            <div className="mt-1">
              <span
                className={`rounded px-2 py-0.5 text-xs font-medium ${leader.generation.colorClass}`}
              >
                {leader.generation.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="text-right text-sm">
        <div className="font-medium text-accent">
          {formatCount(leader.totalVotes)} votes
        </div>
        <div className="text-xs text-muted-foreground">
          {formatCount(leader.totalWordCount)} kata
        </div>
      </div>
    </div>
  );
};
