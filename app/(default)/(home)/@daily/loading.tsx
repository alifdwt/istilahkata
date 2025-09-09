"use client";

import { StarIcon } from "lucide-react";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DailyWordsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Daily Words Error:", error);
  }, [error]);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <StarIcon className="h-6 w-6 text-accent" />
          Kata-kata Hari Ini
        </h3>
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h4 className="mb-2 text-lg font-medium text-red-900">
          Gagal memuat kata-kata hari ini
        </h4>
        <p className="mb-4 text-sm text-red-700">
          Terjadi kesalahan saat mengambil data dari server
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700"
        >
          Coba Lagi
        </button>
      </div>
    </section>
  );
}
