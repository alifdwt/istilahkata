"use client";

import { AlertTriangle, Home, RefreshCcw, MessageCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to external service (Sentry, LogRocket, etc.)
    console.error("Global error caught:", error);

    // Optional: Send to error reporting service
    // if (typeof window !== 'undefined') {
    //   // Sentry.captureException(error);
    // }
  }, [error]);

  const handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <html lang="id">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="w-full max-w-2xl space-y-8 text-center">
            {/* Error Icon */}
            <div className="relative">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
              <div className="absolute -inset-1 -z-10 animate-pulse rounded-full bg-destructive/20 blur-lg" />
            </div>

            {/* Error Content */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                Ups! Terjadi Kesalahan
              </h1>
              <p className="mx-auto max-w-md text-xl text-muted-foreground">
                Aplikasi mengalami kesalahan yang tidak terduga. Tim kami akan
                segera mengatasi masalah ini.
              </p>
            </div>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === "development" && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-left">
                <h3 className="mb-3 font-semibold text-destructive">
                  Error Details (Development Only)
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong className="text-foreground">Message:</strong>
                    <pre className="mt-1 rounded bg-muted p-2 text-xs break-words whitespace-pre-wrap">
                      {error.message}
                    </pre>
                  </div>
                  {error.digest && (
                    <div>
                      <strong className="text-foreground">Digest:</strong>
                      <code className="ml-2 rounded bg-muted px-1 py-0.5 text-xs">
                        {error.digest}
                      </code>
                    </div>
                  )}
                  {error.stack && (
                    <details className="mt-2">
                      <summary className="cursor-pointer font-medium hover:text-foreground">
                        Stack Trace
                      </summary>
                      <pre className="mt-2 max-h-40 overflow-auto rounded bg-muted p-2 text-xs break-words whitespace-pre-wrap">
                        {error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
              >
                <RefreshCcw className="h-4 w-4" />
                Coba Lagi
              </button>

              <button
                onClick={handleReload}
                className="inline-flex items-center gap-2 rounded-lg bg-muted px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted/80 focus:ring-2 focus:ring-muted focus:ring-offset-2 focus:outline-none"
              >
                <RefreshCcw className="h-4 w-4" />
                Muat Ulang Halaman
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted/50 focus:ring-2 focus:ring-border focus:ring-offset-2 focus:outline-none"
              >
                <Home className="h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </div>

            {/* Additional Help */}
            <div className="border-t border-border pt-8">
              <p className="mb-4 text-sm text-muted-foreground">
                Jika masalah terus berlanjut, silakan hubungi tim support kami
              </p>
              <div className="flex flex-col items-center justify-center gap-3 text-sm sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
                >
                  <MessageCircle className="h-4 w-4" />
                  Hubungi Support
                </Link>
                <span className="hidden text-muted-foreground sm:inline">
                  •
                </span>
                <Link
                  href="/status"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Status Sistem
                </Link>
                <span className="hidden text-muted-foreground sm:inline">
                  •
                </span>
                <Link
                  href="/help"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Pusat Bantuan
                </Link>
              </div>
            </div>

            {/* Footer Info */}
            <div className="pt-4 text-xs text-muted-foreground">
              <p>
                Error ID:{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  {error.digest || "unknown"}
                </code>
              </p>
              <p className="mt-1">
                Waktu: {new Date().toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
