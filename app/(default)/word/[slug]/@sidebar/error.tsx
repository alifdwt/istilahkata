"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function WordSidebarError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="space-y-2">
              <p className="font-medium">Gagal memuat sidebar</p>
              <p className="text-sm opacity-80">
                Terjadi kesalahan saat mengambil data pendukung.
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
              <Button
                variant="outline"
                size="sm"
                onClick={reset}
                className="mt-2"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Coba Lagi
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
