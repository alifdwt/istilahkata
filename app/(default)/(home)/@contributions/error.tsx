"use client";

import { AlertCircle, PenTool, RotateCcw } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ContributionsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ContributionsError({
  error,
  reset,
}: ContributionsErrorProps) {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <PenTool className="h-6 w-6 text-accent" />
          Kontribusi Baru
        </h3>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <div className="rounded-lg border-2 border-destructive/20 bg-destructive/5 p-6 text-center">
          <AlertCircle className="mx-auto mb-4 h-10 w-10 text-destructive" />

          <h4 className="mb-2 text-lg font-semibold text-destructive">
            Gagal Memuat Kontribusi
          </h4>

          <p className="mb-4 text-sm text-muted-foreground">
            Terjadi kesalahan saat mengambil data kontribusi terbaru dari
            komunitas.
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

            <Link
              href="/contributions"
              className="inline-flex items-center gap-2 rounded-lg border border-muted-foreground/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <PenTool className="h-4 w-4" />
              Lihat Halaman Kontribusi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
