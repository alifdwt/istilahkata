import {
  and,
  desc,
  asc,
  eq,
  sql,
  count,
  ilike,
  inArray,
  or,
  gte,
} from "drizzle-orm";

import { db } from "@/lib/db";
import {
  words,
  explanations,
  users,
  wordGenerations,
  wordLanguages,
  generations,
  languages,
  wordViews,
} from "@/lib/db/schema";

// =====================================
// TYPES FOR WORDS LISTING PAGE
// =====================================

export interface WordsPageStats {
  totalWords: number;
  newWords: number; // Words created in last 7 days
  trending: number; // Words with high recent activity
  needHelp: number; // Words with < 2 explanations
}

export interface WordsFilterParams {
  page?: number;
  search?: string;
  generation?: string | string[];
  language?: string | string[];
  status?: "trending" | "newest" | "needs-help" | "complete";
  sort?:
    | "newest"
    | "oldest"
    | "most-viewed"
    | "most-explained"
    | "alphabetical";
  view?: "grid" | "list";
  limit?: number;
}

export interface WordCardData {
  id: string;
  term: string;
  slug: string;
  totalViews: number;
  totalExplanations: number;
  totalVotes: number;
  status: "pending" | "approved" | "rejected" | "needs-review" | null; // Allow null
  createdAt: Date | null; // Allow null

  // Top explanation (highest voted)
  topExplanation: {
    id: string;
    content: string;
    votes: number;
    author: {
      username: string;
      displayName: string | null;
    };
  } | null;

  // Generations and languages
  generations: Array<{
    code: string;
    name: string;
    shortName: string;
    colorClass: string;
    isPrimary: boolean;
  }>;

  languages: Array<{
    code: string;
    name: string;
    flag: string | null;
    isPrimary: boolean;
  }>;

  // Requester info
  requestedBy: {
    username: string;
    displayName: string | null;
  } | null;
}

export interface WordsListingResult {
  words: WordCardData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters: {
    availableGenerations: Array<{
      id: string;
      code: string;
      name: string;
      shortName: string;
      colorClass: string;
      count: number;
    }>;
    availableLanguages: Array<{
      id: string;
      code: string;
      name: string;
      flag: string | null;
      count: number;
    }>;
  };
}

// =====================================
// QUICK STATS FOR HEADER
// =====================================

export async function getWordsPageStats(): Promise<WordsPageStats> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // Get total words count
  const totalWordsResult = await db
    .select({ count: count() })
    .from(words)
    .where(eq(words.isActive, true));

  // Get new words (last 7 days)
  const newWordsResult = await db
    .select({ count: count() })
    .from(words)
    .where(and(eq(words.isActive, true), gte(words.createdAt, sevenDaysAgo)));

  // Get trending words (high recent activity)
  const trendingResult = await db
    .select({ count: count() })
    .from(words)
    .leftJoin(wordViews, eq(wordViews.wordId, words.id))
    .where(
      and(eq(words.isActive, true), gte(wordViews.createdAt, sevenDaysAgo))
    )
    .groupBy(words.id)
    .having(sql`COUNT(${wordViews.id}) >= 5`);

  // Get words needing help (< 2 explanations)
  const needHelpResult = await db
    .select({ count: count() })
    .from(words)
    .where(and(eq(words.isActive, true), sql`${words.totalExplanations} < 2`));

  return {
    totalWords: totalWordsResult[0]?.count || 0,
    newWords: newWordsResult[0]?.count || 0,
    trending: trendingResult.length || 0,
    needHelp: needHelpResult[0]?.count || 0,
  };
}

// =====================================
// MAIN WORDS LISTING FUNCTION
// =====================================

export async function getWordsListing(
  params: WordsFilterParams = {}
): Promise<WordsListingResult> {
  const {
    page = 1,
    search,
    generation,
    language,
    status,
    sort = "newest",
    limit = 24,
  } = params;

  const offset = (page - 1) * limit;

  // Build base query conditions
  const conditions = [eq(words.isActive, true)];

  // Search condition
  if (search) {
    conditions.push(
      or(ilike(words.term, `%${search}%`), ilike(words.context, `%${search}%`))!
    );
  }

  // Status filters
  if (status === "needs-help") {
    conditions.push(sql`${words.totalExplanations} < 2`);
  } else if (status === "complete") {
    conditions.push(sql`${words.totalExplanations} >= 2`);
  }

  // Build order by clause
  let orderBy;
  switch (sort) {
    case "oldest":
      orderBy = asc(words.createdAt);
      break;
    case "most-viewed":
      orderBy = desc(words.totalViews);
      break;
    case "most-explained":
      orderBy = desc(words.totalExplanations);
      break;
    case "alphabetical":
      orderBy = asc(words.term);
      break;
    default: // 'newest'
      orderBy = desc(words.createdAt);
      break;
  }

  // Base query builder
  let wordsQueryBuilder = db
    .select({
      // Word fields
      id: words.id,
      term: words.term,
      slug: words.slug,
      totalViews: words.totalViews,
      totalExplanations: words.totalExplanations,
      totalVotes: words.totalVotes,
      status: words.status,
      createdAt: words.createdAt,
      // Requester fields
      requesterUsername: users.username,
      requesterDisplayName: users.displayName,
    })
    .from(words)
    .leftJoin(users, eq(words.requestedBy, users.id));

  // Apply generation filter if provided
  if (generation) {
    const generationCodes = Array.isArray(generation)
      ? generation
      : [generation];
    wordsQueryBuilder = wordsQueryBuilder
      .innerJoin(wordGenerations, eq(wordGenerations.wordId, words.id))
      .innerJoin(generations, eq(wordGenerations.generationId, generations.id));

    conditions.push(inArray(generations.code, generationCodes));
  }

  // Apply language filter if provided
  if (language) {
    const languageCodes = Array.isArray(language) ? language : [language];
    wordsQueryBuilder = wordsQueryBuilder
      .innerJoin(wordLanguages, eq(wordLanguages.wordId, words.id))
      .innerJoin(languages, eq(wordLanguages.languageId, languages.id));

    conditions.push(inArray(languages.code, languageCodes));
  }

  // Apply conditions, ordering and pagination
  const wordsResult = await wordsQueryBuilder
    .where(and(...conditions))
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset);

  if (wordsResult.length === 0) {
    return {
      words: [],
      pagination: {
        currentPage: page,
        totalPages: 0,
        totalItems: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      filters: {
        availableGenerations: [],
        availableLanguages: [],
      },
    };
  }

  // Get word IDs for additional data
  const wordIds = wordsResult.map((w) => w.id);

  // Get generations for these words
  const wordGenerationsData = await db
    .select({
      wordId: wordGenerations.wordId,
      generationId: wordGenerations.generationId,
      isPrimary: wordGenerations.isPrimary,
      code: generations.code,
      name: generations.name,
      shortName: generations.shortName,
      colorClass: generations.colorClass,
    })
    .from(wordGenerations)
    .innerJoin(generations, eq(wordGenerations.generationId, generations.id))
    .where(inArray(wordGenerations.wordId, wordIds));

  // Get languages for these words
  const wordLanguagesData = await db
    .select({
      wordId: wordLanguages.wordId,
      languageId: wordLanguages.languageId,
      isPrimary: wordLanguages.isPrimary,
      code: languages.code,
      name: languages.name,
      flag: languages.flag,
    })
    .from(wordLanguages)
    .innerJoin(languages, eq(wordLanguages.languageId, languages.id))
    .where(inArray(wordLanguages.wordId, wordIds));

  // Get top explanations for these words
  const topExplanationsData = await db
    .select({
      wordId: explanations.wordId,
      id: explanations.id,
      content: explanations.content,
      votes: explanations.votes,
      authorUsername: users.username,
      authorDisplayName: users.displayName,
    })
    .from(explanations)
    .innerJoin(users, eq(explanations.userId, users.id))
    .where(
      and(
        inArray(explanations.wordId, wordIds),
        eq(explanations.isAccepted, true)
      )
    )
    .orderBy(desc(explanations.votes));

  // Get total count using the same pattern
  let totalCount = 0;

  if (generation) {
    const generationCodes = Array.isArray(generation)
      ? generation
      : [generation];
    const countResult = await db
      .select({ count: count() })
      .from(words)
      .innerJoin(wordGenerations, eq(wordGenerations.wordId, words.id))
      .innerJoin(generations, eq(wordGenerations.generationId, generations.id))
      .where(and(...conditions, inArray(generations.code, generationCodes)));
    totalCount = countResult[0]?.count || 0;
  } else if (language) {
    const languageCodes = Array.isArray(language) ? language : [language];
    const countResult = await db
      .select({ count: count() })
      .from(words)
      .innerJoin(wordLanguages, eq(wordLanguages.wordId, words.id))
      .innerJoin(languages, eq(wordLanguages.languageId, languages.id))
      .where(and(...conditions, inArray(languages.code, languageCodes)));
    totalCount = countResult[0]?.count || 0;
  } else {
    const countResult = await db
      .select({ count: count() })
      .from(words)
      .where(and(...conditions));
    totalCount = countResult[0]?.count || 0;
  }

  const totalPages = Math.ceil(totalCount / limit);

  // Transform data into WordCardData format
  const wordsData: WordCardData[] = wordsResult.map((word) => {
    // Get generations for this word
    const wordGens = wordGenerationsData
      .filter((wg) => wg.wordId === word.id)
      .map((wg) => ({
        code: wg.code,
        name: wg.name,
        shortName: wg.shortName,
        colorClass: wg.colorClass,
        isPrimary: wg.isPrimary ?? false, // Handle null
      }));

    // Get languages for this word
    const wordLangs = wordLanguagesData
      .filter((wl) => wl.wordId === word.id)
      .map((wl) => ({
        code: wl.code,
        name: wl.name,
        flag: wl.flag,
        isPrimary: wl.isPrimary ?? false, // Handle null
      }));

    // Get top explanation for this word
    const topExplanation = topExplanationsData.find(
      (te) => te.wordId === word.id
    );

    return {
      id: word.id,
      term: word.term,
      slug: word.slug,
      totalViews: word.totalViews || 0,
      totalExplanations: word.totalExplanations || 0,
      totalVotes: word.totalVotes || 0,
      status: word.status, // Keep as is (can be null)
      createdAt: word.createdAt, // Keep as is (can be null)
      topExplanation: topExplanation
        ? {
            id: topExplanation.id,
            content: topExplanation.content,
            votes: topExplanation.votes || 0,
            author: {
              username: topExplanation.authorUsername || "",
              displayName: topExplanation.authorDisplayName,
            },
          }
        : null,
      generations: wordGens,
      languages: wordLangs,
      requestedBy: word.requesterUsername
        ? {
            username: word.requesterUsername,
            displayName: word.requesterDisplayName,
          }
        : null,
    };
  });

  // Get filter options (available generations and languages)
  const availableGenerations = await getAvailableGenerations();
  const availableLanguages = await getAvailableLanguages();

  return {
    words: wordsData,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: totalCount,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
    filters: {
      availableGenerations,
      availableLanguages,
    },
  };
}

// =====================================
// HELPER FUNCTIONS
// =====================================

async function getAvailableGenerations() {
  const generationsWithCount = await db
    .select({
      id: generations.id,
      code: generations.code,
      name: generations.name,
      shortName: generations.shortName,
      colorClass: generations.colorClass,
      count: count(wordGenerations.wordId),
    })
    .from(generations)
    .leftJoin(wordGenerations, eq(wordGenerations.generationId, generations.id))
    .leftJoin(
      words,
      and(eq(wordGenerations.wordId, words.id), eq(words.isActive, true))
    )
    .where(eq(generations.isActive, true))
    .groupBy(
      generations.id,
      generations.code,
      generations.name,
      generations.shortName,
      generations.colorClass
    )
    .orderBy(asc(generations.sortOrder));

  return generationsWithCount.map((g) => ({
    id: g.id,
    code: g.code,
    name: g.name,
    shortName: g.shortName,
    colorClass: g.colorClass,
    count: g.count || 0,
  }));
}

async function getAvailableLanguages() {
  const languagesWithCount = await db
    .select({
      id: languages.id,
      code: languages.code,
      name: languages.name,
      flag: languages.flag,
      count: count(wordLanguages.wordId),
    })
    .from(languages)
    .leftJoin(wordLanguages, eq(wordLanguages.languageId, languages.id))
    .leftJoin(
      words,
      and(eq(wordLanguages.wordId, words.id), eq(words.isActive, true))
    )
    .where(eq(languages.isActive, true))
    .groupBy(languages.id, languages.code, languages.name, languages.flag)
    .orderBy(asc(languages.name));

  return languagesWithCount.map((l) => ({
    id: l.id,
    code: l.code,
    name: l.name,
    flag: l.flag,
    count: l.count || 0,
  }));
}

// =====================================
// SUGGESTED WORDS (FOR SIDEBAR)
// =====================================

export async function getSuggestedWords(limit: number = 5): Promise<
  Array<{
    id: string;
    term: string;
    slug: string;
    totalExplanations: number;
    daysSinceRequest: number;
  }>
> {
  const suggestedWords = await db
    .select({
      id: words.id,
      term: words.term,
      slug: words.slug,
      totalExplanations: words.totalExplanations,
      createdAt: words.createdAt,
    })
    .from(words)
    .where(and(eq(words.isActive, true), sql`${words.totalExplanations} < 2`))
    .orderBy(asc(words.createdAt))
    .limit(limit);

  return suggestedWords.map((word) => ({
    id: word.id,
    term: word.term,
    slug: word.slug,
    totalExplanations: word.totalExplanations || 0,
    daysSinceRequest: Math.floor(
      (Date.now() - (word.createdAt?.getTime() || Date.now())) /
        (1000 * 60 * 60 * 24)
    ),
  }));
}
