"use client";

import { AlertCircle, Trophy, RotateCcw } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LeaderboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function LeaderboardError({
  error,
  reset,
}: LeaderboardErrorProps) {
  return (
    <section className="rounded-xl border bg-card p-6">
      <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <Trophy className="h-5 w-5 text-accent" />
        Leaderboard
      </h4>

      <div className="rounded-lg border-2 border-destructive/20 bg-destructive/5 p-4 text-center">
        <AlertCircle className="mx-auto mb-3 h-8 w-8 text-destructive" />

        <h5 className="mb-2 font-semibold text-destructive">
          Gagal Memuat Leaderboard
        </h5>

        <p className="mb-3 text-xs text-muted-foreground">
          Terjadi kesalahan saat mengambil data kontributor terbaik.
        </p>

        {/* Error details for development */}
        {process.env.NODE_ENV === "development" && (
          <details className="mb-3 rounded border bg-muted p-2 text-left text-xs">
            <summary className="cursor-pointer font-medium">
              Detail Error
            </summary>
            <pre className="mt-1 text-xs break-words whitespace-pre-wrap">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}

        <div className="flex flex-col gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <RotateCcw className="h-3 w-3" />
            Coba Lagi
          </button>

          <Link
            href="/leaderboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-muted-foreground/20 px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
          >
            <Trophy className="h-3 w-3" />
            Lihat Halaman Leaderboard
          </Link>
        </div>
      </div>
    </section>
  );
}
