import { Clock, MessageSquare, PenTool, User } from "lucide-react";
import Link from "next/link";
import React from "react";

import { getRecentContributions } from "@/lib/db/queries/homepage";
import { formatRelativeTime } from "@/lib/utils";

export default async function ContributionsSlot() {
  // Fetch recent contributions from database
  const recentContributions = await getRecentContributions(8); // Get 8 recent contributions

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <PenTool className="h-6 w-6 text-accent" />
          Kontribusi Baru
        </h3>
        <Link
          href="/contributions"
          className="font-medium text-primary hover:text-primary/80"
        >
          Lihat Semua
        </Link>
      </div>

      {recentContributions.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-muted p-8 text-center">
          <PenTool className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h4 className="mt-4 text-lg font-semibold text-muted-foreground">
            Belum Ada Kontribusi
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Jadilah yang pertama berkontribusi dengan menjelaskan kata baru!
          </p>
          <Link
            href="/contribute"
            className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Mulai Berkontribusi
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {recentContributions.map((contribution) => (
            <ContributionCard
              key={contribution.id}
              contribution={contribution}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// Contribution Card Component
const ContributionCard = ({
  contribution,
}: {
  contribution: Awaited<ReturnType<typeof getRecentContributions>>[0];
}) => {
  const getContributionIcon = (type: string) => {
    switch (type) {
      case "explanation":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case "vote":
        return <MessageSquare className="h-4 w-4 text-orange-500" />;
      default:
        return <PenTool className="h-4 w-4 text-gray-500" />;
    }
  };

  const getContributionAction = (type: string) => {
    switch (type) {
      case "explanation":
        return "Penjelasan";
      case "comment":
        return "Komentar";
      case "vote":
        return "Vote";
      default:
        return "Kontribusi";
    }
  };

  return (
    <Link
      href={`/word/${contribution.word.slug}`}
      className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
      aria-label={`Lihat kontribusi ${contribution.user.username} pada kata ${contribution.word.term}`}
      role="article"
    >
      {/* Activity indicator */}
      <div className="absolute top-3 right-3">
        <div className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
          {getContributionIcon(contribution.type)}
          <span>{getContributionAction(contribution.type)}</span>
        </div>
      </div>

      {/* Word title */}
      <div className="mb-3 pr-20">
        <h5 className="font-mono text-lg font-semibold text-primary transition-colors group-hover:text-primary/90">
          {contribution.word.term}
        </h5>
      </div>

      {/* User info */}
      <div className="mb-3 flex items-center gap-2">
        <User className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate font-medium text-foreground">
            @{contribution.user.username}
          </span>
          {contribution.user.displayName && (
            <span className="truncate text-xs text-muted-foreground">
              ({contribution.user.displayName})
            </span>
          )}
        </div>
      </div>

      {/* Generation badge */}
      {contribution.user.generation && (
        <div className="mb-3">
          <span
            className={`rounded px-2 py-1 text-xs font-medium ${contribution.user.generation.colorClass}`}
          >
            {contribution.user.generation.name}
          </span>
        </div>
      )}

      {/* Content preview */}
      {contribution.content && (
        <div className="mb-3">
          <p className="line-clamp-2 text-sm text-foreground group-hover:text-foreground/90">
            &quot;{contribution.content}&quot;
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3 w-3" />
          <time dateTime={contribution.createdAt.toISOString()}>
            {formatRelativeTime(contribution.createdAt)}
          </time>
        </div>

        {/* Contribution type badge */}
        {/* <span
          className={`rounded px-2 py-1 text-xs font-medium ${getContributionBadgeColor(
            contribution.type
          )}`}
        >
          {getContributionAction(contribution.type)}
        </span> */}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
};
