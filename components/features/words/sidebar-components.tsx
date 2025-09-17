import {
  Eye,
  MessageSquare,
  ThumbsUp,
  ExternalLink,
  Crown,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/word-util";

// Stats Card Component
interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  stats: Array<{
    label: string;
    value: string | number;
    format?: boolean;
  }>;
  extras?: React.ReactNode;
}

export function StatsCard({ title, icon, stats, extras }: StatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <span className="font-semibold">
              {stat.format && typeof stat.value === "number"
                ? formatNumber(stat.value)
                : stat.value}
            </span>
          </div>
        ))}
        {extras && <div className="border-t pt-2">{extras}</div>}
      </CardContent>
    </Card>
  );
}

// Related Words Card Component
interface RelatedWord {
  id: string;
  term: string;
  slug: string;
  totalViews?: number | null;
  totalExplanations?: number | null;
}

interface RelatedWordsCardProps {
  words: RelatedWord[];
  baseSlug?: string;
}

export function RelatedWordsCard({ words, baseSlug }: RelatedWordsCardProps) {
  if (words.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ExternalLink className="h-5 w-5 text-primary" />
          Kata Terkait
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {words.map((word) => (
          <Link
            key={word.id}
            href={`/word/${word.slug}`}
            className="block rounded-lg border p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-mono font-medium text-primary">
                  {word.term}
                </h4>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {formatNumber(word.totalViews || 0)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {word.totalExplanations || 0}
                  </span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
          </Link>
        ))}

        {/* View More Link */}
        <Link
          href={baseSlug ? `/words?related=${baseSlug}` : "/words"}
          className="block py-2 text-center text-sm text-primary transition-colors hover:text-primary/80"
        >
          Lihat kata terkait lainnya →
        </Link>
      </CardContent>
    </Card>
  );
}

// Contributors Card Component
interface Contributor {
  userId: string;
  username: string | null;
  displayName: string | null;
  avatar: string | null;
  totalVotes: number;
  explanationCount: number;
}

interface ContributorsCardProps {
  contributors: Contributor[];
  limit?: number;
}

export function ContributorsCard({
  contributors,
  limit = 5,
}: ContributorsCardProps) {
  if (contributors.length === 0) {
    return null;
  }

  const displayContributors = contributors.slice(0, limit);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Crown className="h-5 w-5 text-primary" />
          Kontributor Teratas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayContributors.map((contributor, index) => (
          <div key={contributor.userId} className="flex items-center gap-3">
            {/* Ranking Badge */}
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                index === 0
                  ? "bg-yellow-100 text-yellow-700"
                  : index === 1
                  ? "bg-gray-100 text-gray-700"
                  : index === 2
                  ? "bg-orange-100 text-orange-700"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index === 0
                ? "🥇"
                : index === 1
                ? "🥈"
                : index === 2
                ? "🥉"
                : index + 1}
            </div>

            {/* User Info */}
            <Link
              href={`/user/${contributor.username}`}
              className="group flex min-w-0 flex-1 items-center gap-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={contributor.avatar || undefined}
                  alt={contributor.displayName || contributor.username || ""}
                />
                <AvatarFallback className="text-xs">
                  {(contributor.displayName ||
                    contributor.username ||
                    "U")[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium transition-colors group-hover:text-primary">
                  {contributor.displayName || contributor.username}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {formatNumber(contributor.totalVotes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {contributor.explanationCount}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {/* View Leaderboard Link */}
        <Link
          href="/leaderboard"
          className="block py-2 text-center text-sm text-primary transition-colors hover:text-primary/80"
        >
          Lihat leaderboard lengkap →
        </Link>
      </CardContent>
    </Card>
  );
}

// Insights Card Component
interface InsightItem {
  label: string;
  value: string;
}

interface InsightsCardProps {
  title: string;
  icon: React.ReactNode;
  insights: InsightItem[];
}

export function InsightsCard({ title, icon, insights }: InsightsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {insight.label}
            </span>
            <span className="text-sm font-medium">{insight.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Empty State Component
interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="text-muted-foreground">{icon}</div>
          <div>
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
