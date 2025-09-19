import { Eye, ThumbsUp, MessageCircle, Clock, User } from "lucide-react";
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

interface WordCardProps {
  word: WordCardData;
  variant?: "default" | "compact" | "detailed";
  showAuthor?: boolean;
  showStats?: boolean;
}

// Generation badge component
function GenerationBadge({
  generation,
}: {
  generation: { name: string; shortName: string; colorClass: string };
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${generation.colorClass}`}
    >
      {generation.shortName}
    </span>
  );
}

// Language badge component
function LanguageBadge({
  language,
}: {
  language: { name: string; flag: string | null };
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
      {language.flag && <span>{language.flag}</span>}
      {language.name}
    </span>
  );
}

// Stats row component
function StatsRow({
  views,
  explanations,
  votes,
}: {
  views: number;
  explanations: number;
  votes: number;
}) {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <Eye className="h-3 w-3" />
        <span>{formatCount(views)}</span>
      </div>
      <div className="flex items-center gap-1">
        <MessageCircle className="h-3 w-3" />
        <span>{explanations}</span>
      </div>
      <div className="flex items-center gap-1">
        <ThumbsUp className="h-3 w-3" />
        <span>{formatCount(votes)}</span>
      </div>
    </div>
  );
}

// Author info component
function AuthorInfo({
  author,
  createdAt,
}: {
  author: { username: string; displayName: string | null } | null;
  createdAt: Date | null;
}) {
  if (!author) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <User className="h-3 w-3" />
      <span>Oleh {author.displayName || author.username}</span>
      {createdAt && (
        <>
          <Clock className="h-3 w-3" />
          <span>{getRelativeTime(createdAt)}</span>
        </>
      )}
    </div>
  );
}

// Main WordCard component
export default function WordCard({
  word,
  variant = "default",
  showAuthor = true,
  showStats = true,
}: WordCardProps) {
  const primaryGeneration = getPrimaryGeneration(word);
  const primaryLanguage = getPrimaryLanguage(word);
  const wordUrl = getWordUrl(word.slug);

  return (
    <Link href={wordUrl} className="group block">
      <div className="h-full rounded-lg border bg-card p-4 transition-all hover:shadow-lg hover:shadow-primary/5">
        {/* Header with badges */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex flex-wrap gap-2">
            {primaryGeneration && (
              <GenerationBadge generation={primaryGeneration} />
            )}
            {primaryLanguage && <LanguageBadge language={primaryLanguage} />}
          </div>

          {/* Status indicator */}
          {word.totalExplanations < 2 && (
            <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
              Butuh Bantuan
            </span>
          )}
        </div>

        {/* Word title */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
            {word.term}
          </h3>
        </div>

        {/* Top explanation preview */}
        {word.topExplanation && (
          <div className="mb-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {truncateText(
                word.topExplanation.content,
                variant === "compact" ? 80 : 120
              )}
            </p>

            {/* Explanation author */}
            {word.topExplanation.author && (
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span>—</span>
                <span className="font-medium">
                  {word.topExplanation.author.displayName ||
                    word.topExplanation.author.username}
                </span>
                {word.topExplanation.votes > 0 && (
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{word.topExplanation.votes}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* No explanation state */}
        {!word.topExplanation && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground italic">
              Belum ada penjelasan. Jadilah yang pertama memberikan penjelasan!
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="space-y-2">
          {/* Stats row */}
          {showStats && (
            <StatsRow
              views={word.totalViews}
              explanations={word.totalExplanations}
              votes={word.totalVotes}
            />
          )}

          {/* Author info */}
          {showAuthor && (
            <AuthorInfo author={word.requestedBy} createdAt={word.createdAt} />
          )}
        </div>

        {/* Hover effect indicator */}
        <div className="mt-3 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Klik untuk lihat detail →
        </div>
      </div>
    </Link>
  );
}
