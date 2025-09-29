import {
  Eye,
  ThumbsUp,
  MessageCircle,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import type { WordCardData } from "@/lib/db/queries/words-listing";
import {
  getRelativeTime,
  truncateText,
  formatCount,
  getPrimaryGeneration,
  getPrimaryLanguage,
  getWordUrl,
} from "@/lib/words";

// Compact variant - for sidebar or mobile view
export function WordCardCompact({ word }: { word: WordCardData }) {
  const primaryGeneration = getPrimaryGeneration(word);
  const wordUrl = getWordUrl(word.slug);

  return (
    <Link
      href={wordUrl}
      className="group block rounded-lg border bg-card p-3 transition-all hover:shadow-md hover:shadow-primary/5"
    >
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">
              {word.term}
            </h4>
            {primaryGeneration && (
              <span
                className={`rounded px-1.5 py-0.5 text-xs font-medium ${primaryGeneration.colorClass}`}
              >
                {primaryGeneration.shortName}
              </span>
            )}
          </div>

          {word.topExplanation && (
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {truncateText(word.topExplanation.content, 60)}
            </p>
          )}

          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {word.totalExplanations}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              {formatCount(word.totalVotes)}
            </span>
          </div>
        </div>

        <ArrowRight className="ml-2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
    </Link>
  );
}

// List variant - for list view mode
export function WordCardList({ word }: { word: WordCardData }) {
  const primaryGeneration = getPrimaryGeneration(word);
  const primaryLanguage = getPrimaryLanguage(word);
  const wordUrl = getWordUrl(word.slug);

  return (
    <Link href={wordUrl} className="group block">
      <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:shadow-primary/5">
        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-3">
            <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
              {word.term}
            </h3>

            <div className="flex gap-2">
              {primaryGeneration && (
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${primaryGeneration.colorClass}`}
                >
                  {primaryGeneration.shortName}
                </span>
              )}
              {primaryLanguage && (
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                  {primaryLanguage.flag} {primaryLanguage.name}
                </span>
              )}
            </div>
          </div>

          {word.topExplanation && (
            <p className="mb-2 text-sm text-muted-foreground">
              {truncateText(word.topExplanation.content, 150)}
            </p>
          )}

          {word.requestedBy && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span>
                Oleh {word.requestedBy.displayName || word.requestedBy.username}
              </span>
              {word.createdAt && (
                <>
                  <Clock className="h-3 w-3" />
                  <span>{getRelativeTime(word.createdAt)}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Stats sidebar */}
        <div className="flex flex-col items-end gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{formatCount(word.totalViews)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>{word.totalExplanations}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            <span>{formatCount(word.totalVotes)}</span>
          </div>
        </div>

        {/* Arrow indicator */}
        <ArrowRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
    </Link>
  );
}

// Featured variant - for highlighted words
export function WordCardFeatured({ word }: { word: WordCardData }) {
  const primaryGeneration = getPrimaryGeneration(word);
  const primaryLanguage = getPrimaryLanguage(word);
  const wordUrl = getWordUrl(word.slug);

  return (
    <Link href={wordUrl} className="group block">
      <div className="relative overflow-hidden rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
        {/* Featured badge */}
        <div className="absolute top-4 right-4">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
            TRENDING
          </span>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-primary/10" />
        <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-primary/5" />

        <div className="relative">
          {/* Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            {primaryGeneration && (
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${primaryGeneration.colorClass}`}
              >
                {primaryGeneration.name}
              </span>
            )}
            {primaryLanguage && (
              <span className="rounded-full bg-white/50 px-3 py-1 text-sm font-medium text-gray-700">
                {primaryLanguage.flag} {primaryLanguage.name}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-4 text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
            {word.term}
          </h3>

          {/* Top explanation */}
          {word.topExplanation && (
            <div className="mb-4">
              <p className="leading-relaxed text-foreground">
                {truncateText(word.topExplanation.content, 200)}
              </p>

              {word.topExplanation.author && (
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>—</span>
                  <span className="font-medium">
                    {word.topExplanation.author.displayName ||
                      word.topExplanation.author.username}
                  </span>
                  {word.topExplanation.votes > 0 && (
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{word.topExplanation.votes} votes</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{formatCount(word.totalViews)} views</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>{word.totalExplanations} penjelasan</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>{formatCount(word.totalVotes)} votes</span>
              </div>
            </div>

            <div className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Jelajahi →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
