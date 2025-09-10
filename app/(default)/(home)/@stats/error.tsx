"use client";

import { AlertCircle, BarChart, RotateCcw } from "lucide-react";
import React from "react";

interface StatsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function StatsError({ error, reset }: StatsErrorProps) {
  return (
    <section>
      <div className="rounded-lg border-2 border-destructive/20 bg-destructive/5 p-6 text-center">
        <AlertCircle className="mx-auto mb-4 h-10 w-10 text-destructive" />

        <h4 className="mb-2 text-lg font-semibold text-destructive">
          Gagal Memuat Statistik
        </h4>

        <p className="mb-4 text-sm text-muted-foreground">
          Terjadi kesalahan saat mengambil data statistik platform.
        </p>

        {/* Error details for development */}
        {process.env.NODE_ENV === "development" && (
          <details className="mb-4 rounded border bg-muted p-3 text-left text-xs">
            <summary className="cursor-pointer font-medium">
              Detail Error (Development)
            </summary>
            <pre className="mt-2 text-xs break-words whitespace-pre-wrap">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <RotateCcw className="h-4 w-4" />
            Coba Lagi
          </button>

          <div className="inline-flex items-center gap-2 rounded-lg border border-muted-foreground/20 px-4 py-2 text-sm font-medium text-muted-foreground">
            <BarChart className="h-4 w-4" />
            Statistik Tidak Tersedia
          </div>
        </div>
      </div>
    </section>
  );
}
