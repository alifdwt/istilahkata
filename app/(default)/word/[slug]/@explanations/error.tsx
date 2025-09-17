"use client";

import { AlertCircle, RefreshCw, MessageCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function WordExplanationsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Penjelasan Kata</h2>
          <p className="text-muted-foreground">
            Terjadi kesalahan saat memuat penjelasan
          </p>
        </div>
      </div>

      {/* Error Alert */}
      <Card>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="space-y-3">
              <div>
                <p className="font-medium">Gagal memuat penjelasan</p>
                <p className="text-sm opacity-80">
                  Tidak dapat mengambil data penjelasan untuk kata ini. Silakan
                  coba lagi dalam beberapa saat.
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

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={reset}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Coba Lagi
                </Button>

                <Button variant="outline" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Laporkan Masalah
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
