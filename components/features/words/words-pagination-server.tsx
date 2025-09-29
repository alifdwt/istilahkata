import { getWordsListing } from "@/lib/db/queries/words-listing";

import WordsPagination from "./words-pagination";

interface WordsPaginationServerProps {
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

export default async function WordsPaginationServer({
  searchParams,
}: WordsPaginationServerProps) {
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
      limit: 15,
    });

    return (
      <WordsPagination
        currentPage={result.pagination.currentPage}
        totalPages={result.pagination.totalPages}
        totalItems={result.pagination.totalItems}
      />
    );
  } catch (error) {
    console.error("Error in pagination:", error);
    return null;
  }
}
