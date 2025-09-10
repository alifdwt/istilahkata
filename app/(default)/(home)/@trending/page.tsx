import { Eye, Flame, ThumbsUp } from "lucide-react";
import Link from "next/link";
import React from "react";

import { getTrendingWords } from "@/lib/db/queries/homepage";

export default async function TrendingSlot() {
  // Fetch trending words from database
  const trendingWords = await getTrendingWords(6); // Get 6 trending words

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <Flame className="h-6 w-6 text-accent" />
          Yang Lagi Populer
        </h3>
        <Link
          href="/words?filter=trending"
          className="font-medium text-primary hover:text-primary/80"
        >
          Lihat Semua
        </Link>
      </div>

      {trendingWords.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-muted p-8 text-center">
          <Flame className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h4 className="mt-4 text-lg font-semibold text-muted-foreground">
            Belum Ada Kata Trending
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Mulai berkontribusi untuk melihat kata-kata yang sedang populer!
          </p>
          <Link
            href="/contribute"
            className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Mulai Berkontribusi
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trendingWords.map((word) => (
            <TrendingWordCard key={word.id} word={word} />
          ))}
        </div>
      )}
    </section>
  );
}

// Trending Word Card Component
const TrendingWordCard = ({
  word,
}: {
  word: Awaited<ReturnType<typeof getTrendingWords>>[0];
}) => {
  return (
    <Link
      href={`/word/${word.slug}`}
      className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
      aria-label={`Lihat detail kata trending ${word.term} dengan ${word.recentViews} views baru`}
      role="article"
    >
      {/* Trending indicator */}
      <div className="absolute top-3 right-3">
        <div className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
          <Flame className="h-3 w-3" />
          <span>+{word.recentViews}</span>
        </div>
      </div>

      {/* Word title */}
      <div className="mb-3">
        <h5 className="font-mono text-lg font-semibold text-primary transition-colors group-hover:text-primary/90">
          {word.term}
        </h5>
      </div>

      {/* Languages */}
      {word.languages.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {word.languages.slice(0, 2).map((language, index) => (
            <div
              key={index}
              className="flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs"
            >
              {language.flag && (
                <span className="text-sm" role="img" aria-label={language.name}>
                  {language.flag}
                </span>
              )}
              <span className="text-muted-foreground">{language.name}</span>
            </div>
          ))}
          {word.languages.length > 2 && (
            <span className="flex items-center rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
              +{word.languages.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Generation Tag */}
      {word.topGeneration && (
        <div className="mb-3">
          <span
            className={`rounded px-2 py-1 text-xs font-medium ${word.topGeneration.colorClass}`}
          >
            {word.topGeneration.name}
          </span>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{word.totalViews.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{word.totalExplanations}</span>
          </div>
        </div>

        {/* Recent activity indicator */}
        <div className="flex items-center gap-1 text-accent">
          <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          <span className="text-xs font-medium">Hot</span>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
};
