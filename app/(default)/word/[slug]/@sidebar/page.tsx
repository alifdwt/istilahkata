import { TrendingUp, Award } from "lucide-react";
import { notFound } from "next/navigation";

import {
  StatsCard,
  RelatedWordsCard,
  ContributorsCard,
  InsightsCard,
} from "@/components/features/words/sidebar-components";
import { Badge } from "@/components/ui/badge";
import {
  getWordBySlug,
  getRelatedWords,
  getWordTopContributors,
  getWordStats,
} from "@/lib/db/queries/words";
import { formatRelativeTime, getGenerationColor } from "@/lib/word-util";

interface WordSidebarProps {
  params: Promise<{ slug: string }>;
}

export default async function WordSidebar({ params }: WordSidebarProps) {
  const { slug } = await params;
  const word = await getWordBySlug(slug);

  if (!word) {
    notFound();
  }

  // Fetch sidebar data in parallel
  const [relatedWords, topContributors, wordStats] = await Promise.all([
    getRelatedWords(word.id, 5),
    getWordTopContributors(word.id, 5),
    getWordStats(word.id),
  ]);

  // Prepare stats data
  const statsData = [
    { label: "Total Penjelasan", value: wordStats.totalExplanations },
    { label: "Total Vote", value: wordStats.totalVotes, format: true },
    { label: "Total Komentar", value: wordStats.totalComments },
    { label: "Total Views", value: word.totalViews, format: true },
  ];

  // Prepare insights data
  const insightsData = [
    {
      label: "Umur Kata",
      value: formatRelativeTime(word.createdAt),
    },
    {
      label: "Engagement",
      value:
        word.totalViews > 0
          ? `${Math.round((wordStats.totalVotes / word.totalViews) * 100)}%`
          : "0%",
    },
    {
      label: "Kejelasan",
      value:
        wordStats.totalExplanations >= 3
          ? "Sangat Jelas"
          : wordStats.totalExplanations >= 1
          ? "Cukup Jelas"
          : "Perlu Penjelasan",
    },
    {
      label: "Lintas Generasi",
      value: `${word.generations.length} generasi`,
    },
  ];

  // Generation badge extra for stats
  const generationExtra =
    word.generations.length > 0 ? (
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Generasi Utama</span>
        <Badge
          variant="secondary"
          className={`${getGenerationColor(
            word.generations[0].code
          )} border-0 text-xs`}
        >
          {word.generations[0].name}
        </Badge>
      </div>
    ) : null;

  return (
    <div className="space-y-6">
      {/* Quick Stats Card */}
      <StatsCard
        title="Statistik"
        icon={<TrendingUp className="h-5 w-5 text-accent" />}
        stats={statsData}
        extras={generationExtra}
      />

      {/* Related Words Card */}
      <RelatedWordsCard words={relatedWords} baseSlug={word.slug} />

      {/* Top Contributors Card */}
      <ContributorsCard contributors={topContributors} limit={5} />

      {/* Simple Analytics Card */}
      <InsightsCard
        title="Insights"
        icon={<Award className="h-5 w-5 text-primary" />}
        insights={insightsData}
      />
    </div>
  );
}
