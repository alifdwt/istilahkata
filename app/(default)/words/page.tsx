import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

// Components
import WordsStats from "@/components/features/words/words-stats";
import WordsStatsSkeleton from "@/components/features/words/words-stats-skeleton";
// import WordsStatsEnhanced from "@/components/features/words/words-stats-enhanced"; // Alternative
// import WordsSidebarFilter from "@/components/features/filters/words-sidebar-filter";
// import WordsGrid from "@/components/features/words/words-grid";
// import WordsToolbar from "@/components/features/words/words-toolbar";
// import WordsPagination from "@/components/features/words/words-pagination";

// Types
interface WordsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    generation?: string;
    language?: string;
    sort?: string;
    view?: string;
  }>;
}

export default async function WordsPage({ searchParams }: WordsPageProps) {
  const params = await searchParams;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Jelajahi Kata-kata Gaul</h1>
          <p className="text-muted-foreground">
            Temukan dan pelajari arti dari ribuan kata gaul Indonesia dan bahasa
            lainnya
          </p>
        </div>

        <Link
          href="/contribute"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Tambah Kata
        </Link>
      </div>

      {/* Words Statistics - Server Component with Suspense */}
      <Suspense fallback={<WordsStatsSkeleton />}>
        <WordsStats />
      </Suspense>

      {/* Alternative: Enhanced Stats */}
      {/* <Suspense fallback={<WordsStatsSkeleton />}>
        <WordsStatsEnhanced />
      </Suspense> */}

      {/* Main Content Grid: 1/4 Sidebar + 3/4 Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Filters (1/4) */}
        <aside className="space-y-6 lg:col-span-1">
          {/* TODO: Add WordsSidebarFilter */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Filters</h3>
            <p className="text-sm text-muted-foreground">Coming soon...</p>
          </div>
        </aside>

        {/* Main Content (3/4) */}
        <main className="lg:col-span-3">
          <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Menampilkan kata-kata terbaru
              </span>
              {/* TODO: Add WordsToolbar */}
            </div>

            {/* Words Grid/List */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {/* TODO: Add WordsGrid */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-semibold">
                    Placeholder Word {i + 1}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Word content will be rendered here...
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {/* TODO: Add WordsPagination */}
            <div className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                Pagination will be here...
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// SEO Metadata
export const metadata = {
  title: "Jelajahi Kata-kata Gaul",
  description:
    "Temukan dan pelajari arti dari ribuan kata gaul Indonesia dan bahasa lainnya dengan penjelasan dari berbagai generasi.",
};
