import { getWordsListing } from "@/lib/db/queries/words-listing";

import WordsToolbar from "./words-toolbar";

interface WordsToolbarServerProps {
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

export default async function WordsToolbarServer({
  searchParams,
}: WordsToolbarServerProps) {
  try {
    const page = parseInt(searchParams.page || "1");

    const result = await getWordsListing({
      page,
      search: searchParams.search,
      generation: searchParams.generation,
      language: searchParams.language,
      status: searchParams.status as
        | "trending"
        | "newest"
        | "needs-help"
        | "complete"
        | undefined,
      sort: searchParams.sort as
        | "newest"
        | "oldest"
        | "most-viewed"
        | "most-explained"
        | "alphabetical"
        | undefined,
      limit: 24,
    });

    return (
      <WordsToolbar
        totalResults={result.pagination.totalItems}
        currentPage={result.pagination.currentPage}
        totalPages={result.pagination.totalPages}
      />
    );
  } catch (error) {
    console.error("Error in toolbar:", error);
    return <WordsToolbar totalResults={0} />;
  }
}
