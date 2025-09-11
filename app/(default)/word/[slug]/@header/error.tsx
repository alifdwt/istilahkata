"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function WordHeaderError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="rounded-xl border bg-card p-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <div>
            <p className="font-medium">Gagal memuat informasi kata</p>
            <p className="text-sm opacity-80">
              Terjadi kesalahan saat mengambil data kata.
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
          </div>
          <Button variant="outline" size="sm" onClick={reset} className="ml-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            Coba Lagi
          </Button>
        </AlertDescription>
      </Alert>
    </section>
  );
}
