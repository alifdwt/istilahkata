import { Users, TrendingUp, MessageSquare } from "lucide-react";
import Link from "next/link";

import { getGenerationHighlights } from "@/lib/db/queries/homepage";
import { getGenerationIcon } from "@/lib/utils";

export default async function GenerationHighlightSection() {
  const highlights = await getGenerationHighlights(4);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Antar Generasi</h2>
        </div>
        <Link
          href="/generations"
          className="text-sm text-primary hover:underline"
        >
          Lihat Semua →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((highlight) => (
          <GenerationCard key={highlight.generation.id} highlight={highlight} />
        ))}
      </div>

      {highlights.length === 0 && (
        <div className="py-8 text-center text-muted-foreground">
          <Users className="mx-auto mb-2 h-8 w-8" />
          <p>Belum ada data generasi</p>
        </div>
      )}
    </section>
  );
}

// Generation Card Component
const GenerationCard = ({
  highlight,
}: {
  highlight: Awaited<ReturnType<typeof getGenerationHighlights>>[0];
}) => {
  const { generation, stats, topWords, trendingTag } = highlight;

  return (
    <div className="group rounded-lg border bg-card p-4 transition-all hover:border-primary hover:shadow-md">
      {/* Header with generation name and icon */}
      <Link
        href={`/generation/${generation.code}`}
        className="mb-3 flex items-center justify-between hover:underline"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">
            {getGenerationIcon(generation.iconClass)}
          </span>
          <div>
            <h3 className="font-medium text-foreground group-hover:text-primary">
              {generation.shortName}
            </h3>
            <span className="text-xs text-muted-foreground">
              {generation.startYear}
              {generation.endYear ? `-${generation.endYear}` : "+"}
            </span>
          </div>
        </div>

        {/* Trending tag */}
        <span
          className={`rounded px-2 py-1 text-xs font-medium ${generation.colorClass}`}
        >
          {trendingTag}
        </span>
      </Link>

      {/* Top words preview */}
      <div className="mb-3 space-y-1">
        {topWords.slice(0, 3).map((word) => (
          <Link
            href={`/word/${word.slug}`}
            key={word.id}
            className="flex items-center gap-2 text-sm"
          >
            <span className="font-mono text-primary">{word.term}</span>
          </Link>
        ))}
      </div>

      {/* Stats summary */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <MessageSquare className="h-3 w-3" />
          <span>{stats.totalWords} kata</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          <span>{stats.totalVotes} votes</span>
        </div>
      </div>

      {/* Year range and description tooltip */}
      {generation.description && (
        <div
          className="mt-2 line-clamp-1 text-xs text-muted-foreground"
          title={generation.description}
        >
          {generation.description}
        </div>
      )}
    </div>
  );
};
