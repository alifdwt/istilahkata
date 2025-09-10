import { Clock, HelpCircle, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import React from "react";

import { getUnclearWords } from "@/lib/db/queries/homepage";

export default async function UnclearWordsSlot() {
  // Fetch unclear words from database
  const unclearWords = await getUnclearWords(6); // Get 6 unclear words

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <HelpCircle className="h-6 w-6 text-accent" />
          Kata Belum Jelas
        </h3>
        <Link
          href="/words?filter=unclear"
          className="font-medium text-primary hover:text-primary/80"
        >
          Bantu Jelaskan
        </Link>
      </div>

      {unclearWords.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-muted p-8 text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h4 className="mt-4 text-lg font-semibold text-muted-foreground">
            Semua Kata Sudah Jelas!
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Saat ini tidak ada kata yang membutuhkan penjelasan tambahan.
          </p>
          <Link
            href="/contribute"
            className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Request Kata Baru
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-6">
          <div className="mb-4 text-sm text-muted-foreground">
            Kata-kata ini membutuhkan lebih banyak penjelasan dari komunitas
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {unclearWords.map((word) => (
              <UnclearWordCard key={word.id} word={word} />
            ))}
          </div>

          {unclearWords.length >= 6 && (
            <div className="mt-6 text-center">
              <Link
                href="/words?filter=unclear"
                className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
              >
                <HelpCircle className="h-4 w-4" />
                Lihat Semua Kata yang Butuh Bantuan
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// Unclear Word Card Component
const UnclearWordCard = ({
  word,
}: {
  word: Awaited<ReturnType<typeof getUnclearWords>>[0];
}) => {
  return (
    <div className="group flex items-center justify-between rounded-lg bg-muted/50 p-4 transition-all duration-200 hover:bg-muted hover:shadow-sm">
      <div className="min-w-0 flex-1">
        {/* Word term */}
        <div className="mb-2">
          <Link
            href={`/word/${word.slug}`}
            className="font-mono text-lg font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {word.term}
          </Link>
        </div>

        {/* Word info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {/* Requester info */}
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>@{word.requestedBy.username}</span>
            {word.requestedBy.displayName && (
              <span className="hidden sm:inline">
                ({word.requestedBy.displayName})
              </span>
            )}
          </div>

          {/* Time since request */}
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>
              {word.daysSinceRequest === 0
                ? "Hari ini"
                : word.daysSinceRequest === 1
                ? "1 hari lalu"
                : `${word.daysSinceRequest} hari lalu`}
            </span>
          </div>

          {/* Explanation count */}
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            <span>
              {word.totalExplanations === 0
                ? "Belum ada penjelasan"
                : word.totalExplanations === 1
                ? "1 penjelasan"
                : `${word.totalExplanations} penjelasan`}
            </span>
          </div>
        </div>
      </div>

      {/* Action button */}
      <div className="ml-4 flex-shrink-0">
        <Link
          href={`/word/${word.slug}?action=explain`}
          className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-accent-foreground transition-all duration-200 group-hover:scale-105 hover:bg-accent/90 hover:shadow-sm"
        >
          <HelpCircle className="h-3 w-3" />
          <span className="hidden sm:inline">Bantu Jelaskan</span>
          <span className="sm:hidden">Bantu</span>
        </Link>
      </div>

      {/* Priority indicator */}
      {word.totalExplanations === 0 && (
        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-background bg-red-500" />
      )}
    </div>
  );
};
