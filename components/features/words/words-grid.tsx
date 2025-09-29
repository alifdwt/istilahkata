import { getWordsListing } from "@/lib/db/queries/words-listing";

import WordCard from "./word-card";
import { WordsEmptyState, WordsErrorState } from "./word-card-states";
import { WordCardList } from "./word-card-variants";

interface WordsGridProps {
  searchParams: {
    page?: string;
    search?: string;
    generation?: string;
    language?: string;
    status?: string;
    sort?: string;
    view?: string;
  };
}

export default async function WordsGrid({ searchParams }: WordsGridProps) {
  try {
    // Parse search params
    const page = parseInt(searchParams.page || "1");
    const search = searchParams.search;
    const generation = searchParams.generation;
    const language = searchParams.language;
    const status = searchParams.status as
      | "trending"
      | "newest"
      | "needs-help"
      | "complete"
      | undefined;
    const sort = searchParams.sort as
      | "newest"
      | "oldest"
      | "most-viewed"
      | "most-explained"
      | "alphabetical"
      | undefined;
    const view = searchParams.view || "grid"; // 'grid' or 'list'

    // Fetch words data
    const result = await getWordsListing({
      page,
      search,
      generation,
      language,
      status,
      sort: sort || "newest",
      limit: 15,
    });

    // Handle empty state
    if (result.words.length === 0) {
      return (
        <WordsEmptyState
          title={
            search
              ? `Tidak ada hasil untuk "${search}"`
              : "Tidak ada kata ditemukan"
          }
          description={
            search
              ? "Coba ubah kata kunci pencarian atau filter yang digunakan"
              : "Coba ubah filter atau tambahkan kata baru"
          }
        />
      );
    }

    // Render based on view mode
    if (view === "list") {
      return (
        <div className="space-y-4">
          {result.words.map((word) => (
            <WordCardList key={word.id} word={word} />
          ))}
        </div>
      );
    }

    // Default grid view
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {result.words.map((word) => (
          <WordCard
            key={word.id}
            word={word}
            showAuthor={true}
            showStats={true}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching words:", error);

    return (
      <WordsErrorState
        title="Gagal memuat data kata"
        description={
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat memuat data"
        }
      />
    );
  }
}
