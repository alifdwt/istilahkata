import { BarChart } from "lucide-react";
import React from "react";

import { getHomepageStats } from "@/lib/db/queries/homepage";

export default async function StatsSlot() {
  // Fetch homepage statistics from database
  const stats = await getHomepageStats();

  return (
    <section>
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
        {/* Total Words */}
        <div className="group relative overflow-hidden rounded-lg border bg-card p-4 text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <div className="mb-1 flex items-center justify-center">
              <BarChart className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {stats.totalWords.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Kata</div>
          </div>
        </div>

        {/* Generation Stats */}
        {stats.generationStats.slice(0, 4).map((generation) => (
          <GenerationStatCard key={generation.id} generation={generation} />
        ))}
      </div>
    </section>
  );
}

// Generation Stat Card Component
const GenerationStatCard = ({
  generation,
}: {
  generation: Awaited<
    ReturnType<typeof getHomepageStats>
  >["generationStats"][0];
}) => {
  const getColorClasses = (colorClass: string) => {
    // Extract color name from Tailwind class (e.g., "bg-blue-100 text-blue-700" -> "blue")
    const colorMatch = colorClass.match(
      /(red|blue|green|yellow|purple|orange|pink|indigo|cyan|teal|gray)/
    );
    const color = colorMatch ? colorMatch[1] : "gray";

    return {
      text: `text-${color}-600`,
      hover: `hover:shadow-${color}-500/10`,
      gradient: `from-${color}-500/5`,
    };
  };

  const colors = getColorClasses(generation.colorClass);

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border bg-card p-4 text-center transition-all duration-300 hover:shadow-lg ${colors.hover}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
      <div className="relative">
        <div className="text-2xl font-bold">
          <span className={colors.text}>
            {generation.totalWords.toLocaleString()}
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          {generation.shortName}
        </div>
        {generation.percentage > 0 && (
          <div className="mt-1 text-xs text-muted-foreground/80">
            {generation.percentage}%
          </div>
        )}
      </div>
    </div>
  );
};
