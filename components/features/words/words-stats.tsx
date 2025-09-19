import { getWordsPageStats } from "@/lib/db/queries/words-listing";

// Helper function untuk format numbers
function formatNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${Math.floor(num / 100) / 10}k`;
  return `${Math.floor(num / 100000) / 10}M`;
}

// Individual stat card component
function StatCard({
  label,
  value,
  colorClass = "text-primary",
  description,
}: {
  label: string;
  value: number;
  colorClass?: string;
  description?: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-4 text-center transition-shadow hover:shadow-md">
      <div className={`text-2xl font-bold ${colorClass}`}>
        {formatNumber(value)}
      </div>
      <div className="text-sm font-medium text-foreground">{label}</div>
      {description && (
        <div className="mt-1 text-xs text-muted-foreground">{description}</div>
      )}
    </div>
  );
}

// Main WordsStats component
export default async function WordsStats() {
  try {
    // Fetch stats from database
    const stats = await getWordsPageStats();

    return (
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          label="Total Kata"
          value={stats.totalWords}
          colorClass="text-primary"
          description="Kata yang tersedia"
        />
        <StatCard
          label="Kata Baru"
          value={stats.newWords}
          colorClass="text-blue-600"
          description="7 hari terakhir"
        />
        <StatCard
          label="Trending"
          value={stats.trending}
          colorClass="text-orange-600"
          description="Sedang populer"
        />
        <StatCard
          label="Butuh Bantuan"
          value={stats.needHelp}
          colorClass="text-red-600"
          description="Perlu penjelasan"
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching words stats:", error);

    // Fallback UI when there's an error
    return (
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Kata" value={0} description="Memuat..." />
        <StatCard label="Kata Baru" value={0} description="Memuat..." />
        <StatCard label="Trending" value={0} description="Memuat..." />
        <StatCard label="Butuh Bantuan" value={0} description="Memuat..." />
      </div>
    );
  }
}
