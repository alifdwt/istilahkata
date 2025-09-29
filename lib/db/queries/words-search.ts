// lib/db/queries/words-search.ts
import { and, desc, eq, sql, ilike, or, inArray } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  words,
  explanations,
  users,
  wordGenerations,
  wordLanguages,
  generations,
  languages,
} from "@/lib/db/schema";

// =====================================
// SEARCH TYPES
// =====================================

export interface SearchSuggestion {
  type: "word" | "explanation" | "user";
  id: string;
  title: string;
  subtitle?: string;
  slug?: string;
  relevanceScore: number;
}

export interface QuickSearchResult {
  words: Array<{
    id: string;
    term: string;
    slug: string;
    totalExplanations: number;
    primaryGeneration?: {
      name: string;
      colorClass: string;
    };
  }>;
  explanations: Array<{
    id: string;
    content: string;
    wordTerm: string;
    wordSlug: string;
    author: {
      username: string;
      displayName: string | null;
    };
    votes: number;
  }>;
}

// =====================================
// SEARCH AUTOCOMPLETE/SUGGESTIONS
// =====================================

export async function getSearchSuggestions(
  query: string,
  limit: number = 8
): Promise<SearchSuggestion[]> {
  if (!query || query.length < 2) {
    return [];
  }

  const searchTerm = `%${query.toLowerCase()}%`;
  const suggestions: SearchSuggestion[] = [];

  // Search words by term
  const wordSuggestions = await db
    .select({
      id: words.id,
      term: words.term,
      slug: words.slug,
      totalExplanations: words.totalExplanations,
      // Calculate relevance score
      relevanceScore: sql<number>`
        CASE 
          WHEN LOWER(${words.term}) = LOWER(${query}) THEN 100
          WHEN LOWER(${words.term}) LIKE ${query.toLowerCase() + "%"} THEN 80
          WHEN LOWER(${words.term}) LIKE ${
        "%" + query.toLowerCase() + "%"
      } THEN 60
          ELSE 40
        END
      `,
    })
    .from(words)
    .where(and(eq(words.isActive, true), ilike(words.term, searchTerm)))
    .orderBy(desc(sql`relevanceScore`), desc(words.totalViews))
    .limit(limit);

  // Transform to SearchSuggestion format
  suggestions.push(
    ...wordSuggestions.map(
      (word): SearchSuggestion => ({
        type: "word",
        id: word.id,
        title: word.term,
        subtitle: `${word.totalExplanations || 0} penjelasan`,
        slug: word.slug,
        relevanceScore: word.relevanceScore,
      })
    )
  );

  return suggestions.slice(0, limit);
}

// =====================================
// QUICK SEARCH (FOR SEARCH RESULTS PAGE)
// =====================================

export async function quickSearch(
  query: string,
  limit: number = 12
): Promise<QuickSearchResult> {
  if (!query || query.length < 2) {
    return { words: [], explanations: [] };
  }

  const searchTerm = `%${query}%`;

  // Search words
  const wordsResult = await db
    .select({
      id: words.id,
      term: words.term,
      slug: words.slug,
      totalExplanations: words.totalExplanations,
      // Get primary generation
      primaryGenName: sql<string | null>`
        (SELECT g.name 
         FROM word_generations wg
         JOIN generations g ON wg.generation_id = g.id
         WHERE wg.word_id = words.id AND wg.is_primary = true
         LIMIT 1)
      `,
      primaryGenColor: sql<string | null>`
        (SELECT g.color_class
         FROM word_generations wg
         JOIN generations g ON wg.generation_id = g.id
         WHERE wg.word_id = words.id AND wg.is_primary = true
         LIMIT 1)
      `,
    })
    .from(words)
    .where(
      and(
        eq(words.isActive, true),
        or(ilike(words.term, searchTerm), ilike(words.context, searchTerm))
      )
    )
    .orderBy(desc(words.totalViews))
    .limit(limit);

  // Search explanations
  const explanationsResult = await db
    .select({
      id: explanations.id,
      content: explanations.content,
      votes: explanations.votes,
      wordTerm: words.term,
      wordSlug: words.slug,
      authorUsername: users.username,
      authorDisplayName: users.displayName,
    })
    .from(explanations)
    .innerJoin(words, eq(explanations.wordId, words.id))
    .innerJoin(users, eq(explanations.userId, users.id))
    .where(
      and(eq(words.isActive, true), ilike(explanations.content, searchTerm))
    )
    .orderBy(desc(explanations.votes))
    .limit(limit);

  return {
    words: wordsResult.map((word) => ({
      id: word.id,
      term: word.term,
      slug: word.slug,
      totalExplanations: word.totalExplanations || 0,
      primaryGeneration: word.primaryGenName
        ? {
            name: word.primaryGenName,
            colorClass: word.primaryGenColor || "bg-gray-100 text-gray-700",
          }
        : undefined,
    })),
    explanations: explanationsResult.map((exp) => ({
      id: exp.id,
      content: exp.content,
      wordTerm: exp.wordTerm,
      wordSlug: exp.wordSlug,
      author: {
        username: exp.authorUsername || "",
        displayName: exp.authorDisplayName,
      },
      votes: exp.votes || 0,
    })),
  };
}

// =====================================
// ADVANCED SEARCH WITH FILTERS
// =====================================

export interface AdvancedSearchParams {
  query: string;
  generations?: string[];
  languages?: string[];
  minExplanations?: number;
  maxExplanations?: number;
  dateFrom?: Date;
  dateTo?: Date;
  sortBy?: "relevance" | "newest" | "oldest" | "most-viewed" | "most-explained";
  page?: number;
  limit?: number;
}

export async function advancedSearch(params: AdvancedSearchParams): Promise<{
  words: Array<{
    id: string;
    term: string;
    slug: string;
    totalViews: number;
    totalExplanations: number;
    createdAt: Date | null; // Allow null
    relevanceScore: number;
    primaryGeneration?: {
      name: string;
      colorClass: string;
    };
    topExplanation?: {
      content: string;
      author: string;
      votes: number;
    };
  }>;
  totalCount: number;
}> {
  const {
    query,
    generations: generationFilters,
    languages: languageFilters,
    minExplanations,
    maxExplanations,
    dateFrom,
    dateTo,
    sortBy = "relevance",
    page = 1,
    limit = 24,
  } = params;

  const offset = (page - 1) * limit;
  const searchTerm = `%${query}%`;

  // Build conditions
  const conditions = [eq(words.isActive, true)];

  // Add search condition
  if (query && query.length >= 2) {
    conditions.push(
      or(ilike(words.term, searchTerm), ilike(words.context, searchTerm))!
    );
  }

  // Add explanation count filters
  if (minExplanations !== undefined) {
    conditions.push(sql`${words.totalExplanations} >= ${minExplanations}`);
  }
  if (maxExplanations !== undefined) {
    conditions.push(sql`${words.totalExplanations} <= ${maxExplanations}`);
  }

  // Add date filters
  if (dateFrom) {
    conditions.push(sql`${words.createdAt} >= ${dateFrom.toISOString()}`);
  }
  if (dateTo) {
    conditions.push(sql`${words.createdAt} <= ${dateTo.toISOString()}`);
  }

  // Build different queries based on filter combinations
  let wordsResult;

  const baseSelect = {
    id: words.id,
    term: words.term,
    slug: words.slug,
    totalViews: words.totalViews,
    totalExplanations: words.totalExplanations,
    createdAt: words.createdAt,
    relevanceScore: sql<number>`
      CASE 
        WHEN LOWER(${words.term}) = LOWER(${query || ""}) THEN 100
        WHEN LOWER(${words.term}) LIKE ${
      (query || "").toLowerCase() + "%"
    } THEN 80
        WHEN LOWER(${words.term}) LIKE ${
      "%" + (query || "").toLowerCase() + "%"
    } THEN 60
        WHEN LOWER(${words.context}) LIKE ${
      "%" + (query || "").toLowerCase() + "%"
    } THEN 40
        ELSE 20
      END
    `,
  };

  // Build order by clause
  let orderByClause;
  switch (sortBy) {
    case "newest":
      orderByClause = [desc(words.createdAt)];
      break;
    case "oldest":
      orderByClause = [words.createdAt];
      break;
    case "most-viewed":
      orderByClause = [desc(words.totalViews)];
      break;
    case "most-explained":
      orderByClause = [desc(words.totalExplanations)];
      break;
    default: // 'relevance'
      orderByClause = [desc(sql`relevanceScore`), desc(words.totalViews)];
      break;
  }

  // Handle different filter combinations
  if (generationFilters?.length && languageFilters?.length) {
    // Both generation and language filters
    wordsResult = await db
      .select(baseSelect)
      .from(words)
      .innerJoin(wordGenerations, eq(wordGenerations.wordId, words.id))
      .innerJoin(generations, eq(wordGenerations.generationId, generations.id))
      .innerJoin(wordLanguages, eq(wordLanguages.wordId, words.id))
      .innerJoin(languages, eq(wordLanguages.languageId, languages.id))
      .where(
        and(
          ...conditions,
          inArray(generations.code, generationFilters),
          inArray(languages.code, languageFilters)
        )
      )
      .orderBy(...orderByClause)
      .limit(limit)
      .offset(offset);
  } else if (generationFilters?.length) {
    // Only generation filter
    wordsResult = await db
      .select(baseSelect)
      .from(words)
      .innerJoin(wordGenerations, eq(wordGenerations.wordId, words.id))
      .innerJoin(generations, eq(wordGenerations.generationId, generations.id))
      .where(and(...conditions, inArray(generations.code, generationFilters)))
      .orderBy(...orderByClause)
      .limit(limit)
      .offset(offset);
  } else if (languageFilters?.length) {
    // Only language filter
    wordsResult = await db
      .select(baseSelect)
      .from(words)
      .innerJoin(wordLanguages, eq(wordLanguages.wordId, words.id))
      .innerJoin(languages, eq(wordLanguages.languageId, languages.id))
      .where(and(...conditions, inArray(languages.code, languageFilters)))
      .orderBy(...orderByClause)
      .limit(limit)
      .offset(offset);
  } else {
    // No additional filters
    wordsResult = await db
      .select(baseSelect)
      .from(words)
      .where(and(...conditions))
      .orderBy(...orderByClause)
      .limit(limit)
      .offset(offset);
  }

  // Get total count using the same pattern
  let totalCount = 0;
  if (generationFilters?.length && languageFilters?.length) {
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(words)
      .innerJoin(wordGenerations, eq(wordGenerations.wordId, words.id))
      .innerJoin(generations, eq(wordGenerations.generationId, generations.id))
      .innerJoin(wordLanguages, eq(wordLanguages.wordId, words.id))
      .innerJoin(languages, eq(wordLanguages.languageId, languages.id))
      .where(
        and(
          ...conditions,
          inArray(generations.code, generationFilters),
          inArray(languages.code, languageFilters)
        )
      );
    totalCount = countResult[0]?.count || 0;
  } else if (generationFilters?.length) {
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(words)
      .innerJoin(wordGenerations, eq(wordGenerations.wordId, words.id))
      .innerJoin(generations, eq(wordGenerations.generationId, generations.id))
      .where(and(...conditions, inArray(generations.code, generationFilters)));
    totalCount = countResult[0]?.count || 0;
  } else if (languageFilters?.length) {
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(words)
      .innerJoin(wordLanguages, eq(wordLanguages.wordId, words.id))
      .innerJoin(languages, eq(wordLanguages.languageId, languages.id))
      .where(and(...conditions, inArray(languages.code, languageFilters)));
    totalCount = countResult[0]?.count || 0;
  } else {
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(words)
      .where(and(...conditions));
    totalCount = countResult[0]?.count || 0;
  }

  // Enrich results with additional data
  const enrichedWords = await Promise.all(
    wordsResult.map(async (word) => {
      // Get primary generation
      const primaryGen = await db
        .select({
          name: generations.name,
          colorClass: generations.colorClass,
        })
        .from(wordGenerations)
        .innerJoin(
          generations,
          eq(wordGenerations.generationId, generations.id)
        )
        .where(
          and(
            eq(wordGenerations.wordId, word.id),
            eq(wordGenerations.isPrimary, true)
          )
        )
        .limit(1);

      // Get top explanation
      const topExp = await db
        .select({
          content: explanations.content,
          votes: explanations.votes,
          authorUsername: users.username,
          authorDisplayName: users.displayName,
        })
        .from(explanations)
        .innerJoin(users, eq(explanations.userId, users.id))
        .where(eq(explanations.wordId, word.id))
        .orderBy(desc(explanations.votes))
        .limit(1);

      return {
        ...word,
        totalViews: word.totalViews || 0,
        totalExplanations: word.totalExplanations || 0,
        primaryGeneration: primaryGen[0]
          ? {
              name: primaryGen[0].name,
              colorClass: primaryGen[0].colorClass,
            }
          : undefined,
        topExplanation: topExp[0]
          ? {
              content:
                topExp[0].content.length > 100
                  ? topExp[0].content.substring(0, 100) + "..."
                  : topExp[0].content,
              author:
                topExp[0].authorDisplayName || topExp[0].authorUsername || "",
              votes: topExp[0].votes || 0,
            }
          : undefined,
      };
    })
  );

  return {
    words: enrichedWords,
    totalCount,
  };
}

// =====================================
// TRENDING SEARCHES
// =====================================

export async function getTrendingSearches(limit: number = 10): Promise<
  Array<{
    term: string;
    searchCount: number;
    trend: "up" | "down" | "stable";
  }>
> {
  // This would require a search_logs table to track search queries
  // For now, return popular words as trending searches

  const trendingWords = await db
    .select({
      term: words.term,
      searchCount: words.totalViews,
    })
    .from(words)
    .where(eq(words.isActive, true))
    .orderBy(desc(words.totalViews))
    .limit(limit);

  return trendingWords.map((word) => ({
    term: word.term,
    searchCount: word.searchCount || 0,
    trend: "stable" as const, // Would be calculated from search_logs
  }));
}

// =====================================
// SEARCH ANALYTICS (FOR ADMIN)
// =====================================

export async function getSearchAnalytics(): Promise<{
  totalSearches: number;
  topQueries: Array<{
    query: string;
    count: number;
    resultsFound: number;
  }>;
  noResultQueries: Array<{
    query: string;
    count: number;
  }>;
  searchTrends: Array<{
    date: string;
    searches: number;
  }>;
}> {
  // This would require implementing search logging
  // Return mock data for now
  return {
    totalSearches: 0,
    topQueries: [],
    noResultQueries: [],
    searchTrends: [],
  };
}
