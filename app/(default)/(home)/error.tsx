"use client";

import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import React from "react";

interface HomepageErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function HomepageError({ error, reset }: HomepageErrorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-lg rounded-xl border-2 border-destructive/20 bg-destructive/5 p-12 text-center">
        <AlertTriangle className="mx-auto mb-6 h-16 w-16 text-destructive" />

        <h1 className="mb-4 text-2xl font-bold text-destructive">
          Ups! Terjadi Kesalahan
        </h1>

        <p className="mb-6 text-muted-foreground">
          Maaf, halaman beranda tidak dapat dimuat saat ini. Silakan coba lagi
          atau hubungi tim support jika masalah berlanjut.
        </p>

        {/* Error details for development */}
        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 rounded border bg-muted p-4 text-left text-sm">
            <summary className="mb-2 cursor-pointer font-medium text-foreground">
              Detail Error (Development Only)
            </summary>
            <div className="mt-2 space-y-2">
              <div>
                <strong>Message:</strong>
                <pre className="mt-1 rounded bg-background p-2 text-xs break-words whitespace-pre-wrap">
                  {error.message}
                </pre>
              </div>
              {error.digest && (
                <div>
                  <strong>Digest:</strong>
                  <code className="ml-2 text-xs">{error.digest}</code>
                </div>
              )}
              {error.stack && (
                <div>
                  <strong>Stack:</strong>
                  <pre className="mt-1 max-h-32 overflow-auto rounded bg-background p-2 text-xs break-words whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          </details>
        )}

        {/* Action buttons */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <RotateCcw className="h-4 w-4" />
            Muat Ulang Halaman
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-muted-foreground/20 px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Home className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Help text */}
        <p className="mt-6 text-xs text-muted-foreground">
          Jika masalah terus berlanjut, silakan{" "}
          <Link href="/contact" className="text-primary hover:underline">
            hubungi support
          </Link>{" "}
          atau coba lagi nanti.
        </p>
      </div>
    </div>
  );
}
