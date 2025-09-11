// app/(default)/word/[slug]/@header/page.tsx
import { Eye, MessageSquare, ThumbsUp, User, Clock } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GenerationBadges } from "@/components/features/words/generation-badges";
import { WordActionButtonsStatic } from "@/components/features/words/word-action-buttons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getWordBySlug, incrementWordView } from "@/lib/db/queries/words";
import { formatNumber, formatRelativeTime } from "@/lib/word-util";

interface WordHeaderProps {
  params: { slug: string };
}

export default async function WordHeader({ params }: WordHeaderProps) {
  const { slug } = await params;
  const word = await getWordBySlug(slug);

  if (!word) {
    notFound();
  }

  // Track view (in real app, you'd want to do this more carefully)
  // Get user IP and user agent for analytics
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || undefined;
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const ipAddress = forwardedFor?.split(",")[0] || realIp || undefined;

  // Increment view count (fire and forget)
  incrementWordView(word.id, undefined, ipAddress, userAgent).catch(
    console.error
  );

  return (
    <section className="rounded-xl border bg-card p-8">
      {/* Main Header */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex-1">
          {/* Word Title */}
          <h1 className="mb-3 font-mono text-4xl font-bold text-primary lg:text-5xl">
            {word.term}
          </h1>

          {/* Context/Example if available */}
          {word.context && (
            <div className="mb-4 rounded-lg bg-muted/50 p-4">
              <p className="mb-1 text-sm text-muted-foreground">
                Contoh penggunaan:
              </p>
              <p className="text-base text-foreground italic">
                &quot;{word.context}&quot;
              </p>
            </div>
          )}

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              <span className="font-medium">
                {formatNumber(word.totalViews)}
              </span>
              <span>views</span>
            </span>

            <span className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              <span className="font-medium">{word.totalExplanations}</span>
              <span>penjelasan</span>
            </span>

            <span className="flex items-center gap-1.5">
              <ThumbsUp className="h-4 w-4" />
              <span className="font-medium">
                {formatNumber(word.totalVotes)}
              </span>
              <span>votes</span>
            </span>

            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{formatRelativeTime(word.createdAt)}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons - Static for now, can be made interactive with client component */}
        <div className="ml-4">
          <WordActionButtonsStatic />
        </div>
      </div>

      {/* Tags and Metadata Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Generation and Language Badges */}
        <GenerationBadges
          generations={word.generations}
          languages={word.languages}
          maxVisible={5}
        />

        {/* Requester Info */}
        {word.requestedBy && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Direquest oleh</span>
            <Link
              href={`/user/${word.requestedBy.username}`}
              className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
            >
              <Avatar className="h-5 w-5">
                <AvatarImage
                  src={word.requestedBy.avatar || undefined}
                  alt={
                    word.requestedBy.displayName ||
                    word.requestedBy.username ||
                    ""
                  }
                />
                <AvatarFallback className="text-xs">
                  {(word.requestedBy.displayName ||
                    word.requestedBy.username ||
                    "U")[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>
                {word.requestedBy.displayName || word.requestedBy.username}
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
