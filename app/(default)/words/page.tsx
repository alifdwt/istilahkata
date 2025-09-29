import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

// Components
import WordsSidebarFilterWrapper, {
  WordsSidebarFilterSkeleton,
} from "@/components/features/filters/words-sidebar-filter-wrapper";
import { WordCardsGridSkeleton } from "@/components/features/words/word-card-skeleton";
import WordsGrid from "@/components/features/words/words-grid";
import WordsPaginationServer from "@/components/features/words/words-pagination-server";
import WordsStats from "@/components/features/words/words-stats";
import WordsStatsSkeleton from "@/components/features/words/words-stats-skeleton";
import WordsToolbarServer from "@/components/features/words/words-toolbar-server";

// Types
interface WordsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    generation?: string;
    language?: string;
    status?: string;
    sort?: string;
    view?: string;
  }>;
}

export default async function WordsPage({ searchParams }: WordsPageProps) {
  const params = await searchParams;
  const view = params.view || "grid";

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

      {/* Words Statistics */}
      <Suspense fallback={<WordsStatsSkeleton />}>
        <WordsStats />
      </Suspense>

      {/* Main Content Grid: 1/4 Sidebar + 3/4 Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Filters (1/4) */}
        <aside className="space-y-6 lg:col-span-1">
          <Suspense fallback={<WordsSidebarFilterSkeleton />}>
            <WordsSidebarFilterWrapper />
          </Suspense>
        </aside>

        {/* Main Content (3/4) */}
        <main className="lg:col-span-3">
          <div className="space-y-6">
            {/* Toolbar: Sort, Filter, View Toggle */}
            <Suspense
              fallback={
                <div className="h-12 animate-pulse rounded-lg bg-muted" />
              }
            >
              <WordsToolbarServer searchParams={params} />
            </Suspense>

            {/* Words Grid/List */}
            <Suspense
              fallback={
                <WordCardsGridSkeleton
                  count={24}
                  variant={view === "list" ? "list" : "default"}
                />
              }
            >
              <WordsGrid searchParams={params} />
            </Suspense>

            {/* Pagination */}
            <Suspense
              fallback={
                <div className="h-12 animate-pulse rounded-lg bg-muted" />
              }
            >
              <WordsPaginationServer searchParams={params} />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

// SEO Metadata
export const metadata = {
  title: "Jelajahi Kata-kata Gaul - IstilahKata",
  description:
    "Temukan dan pelajari arti dari ribuan kata gaul Indonesia dan bahasa lainnya dengan penjelasan dari berbagai generasi.",
  openGraph: {
    title: "Jelajahi Kata-kata Gaul - IstilahKata",
    description:
      "Platform kolaboratif untuk memahami bahasa gaul Indonesia dari berbagai generasi",
    url: "/words",
    type: "website",
  },
};
