import { notFound } from "next/navigation";

import { WordBreadcrumb } from "@/components/features/breadcrumb/word-breadcrumb";
import { getWordBySlug } from "@/lib/db/queries/words";

interface WordDetailBreadcrumbProps {
  slug: string;
}

export default async function WordDetailBreadcrumb({
  slug,
}: WordDetailBreadcrumbProps) {
  // Fetch word data for proper title display
  const word = await getWordBySlug(slug);

  if (!word) {
    notFound();
  }

  const capitalizedTerm =
    word.term.charAt(0).toUpperCase() + word.term.slice(1);

  return <WordBreadcrumb wordSlug={slug} wordTitle={capitalizedTerm} />;
}
