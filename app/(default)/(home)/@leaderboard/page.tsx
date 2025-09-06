import { TrophyIcon } from "lucide-react";
import React from "react";

export default function LeaderboardSlot() {
  return (
    <section className="rounded-xl border bg-card p-6">
      <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <TrophyIcon className="h-5 w-5 text-accent" />
        Leaderboard
      </h4>

      <div className="space-y-3">
        {[
          {
            rank: 1,
            user: "@daud",
            votes: 234,
            words: "1.2k",
            color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
            generation: "Gen Z",
            genColor: "bg-blue-100 text-blue-700",
          },
          {
            rank: 2,
            user: "@sinta",
            votes: 189,
            words: "890",
            color: "bg-gradient-to-br from-gray-400 to-gray-600",
            generation: "Milenial",
            genColor: "bg-green-100 text-green-700",
          },
          {
            rank: 3,
            user: "@rani",
            votes: 156,
            words: "567",
            color: "bg-gradient-to-br from-orange-400 to-orange-600",
            generation: "Gen Z",
            genColor: "bg-blue-100 text-blue-700",
          },
        ].map((leader) => (
          <div key={leader.rank} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`${leader.color} flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white`}
              >
                {leader.rank}
              </span>
              <div>
                <span className="font-mono font-medium">{leader.user}</span>
                <div className="flex items-center gap-1">
                  <span
                    className={`rounded px-1 py-0.5 text-xs font-medium ${leader.genColor}`}
                  >
                    {leader.generation}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right text-sm">
              <div className="font-medium text-secondary">
                {leader.votes} votes
              </div>
              <div className="text-xs text-muted-foreground">
                {leader.words} words
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full text-sm font-medium text-primary hover:text-primary/80">
        Lihat Semua Kontributor
      </button>
    </section>
  );
}
