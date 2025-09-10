"use client";

import { AlertCircle, Flame, RotateCcw } from "lucide-react";
import React from "react";

interface TrendingErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TrendingError({ error, reset }: TrendingErrorProps) {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <Flame className="h-6 w-6 text-accent" />
          Yang Lagi Populer
        </h3>
      </div>

      <div className="rounded-lg border-2 border-destructive/20 bg-destructive/5 p-8 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
        <h4 className="mt-4 text-lg font-semibold text-destructive">
          Gagal Memuat Kata Trending
        </h4>
        <p className="mt-2 text-sm text-muted-foreground">
          Terjadi kesalahan saat mengambil data kata-kata yang sedang populer.
        </p>

        {/* Error details for development */}
        {process.env.NODE_ENV === "development" && (
          <details className="mt-4 rounded border bg-muted p-3 text-left text-xs">
            <summary className="cursor-pointer font-medium">
              Detail Error (Development)
            </summary>
            <pre className="mt-2 text-xs break-words whitespace-pre-wrap">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}

        <button
          onClick={reset}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <RotateCcw className="h-4 w-4" />
          Coba Lagi
        </button>
      </div>
    </section>
  );
}
