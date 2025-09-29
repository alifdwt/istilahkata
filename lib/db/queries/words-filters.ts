// lib/db/queries/words-filters.ts
import { and, desc, asc, eq, sql, count, gte, lte } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  words,
  explanations,
  wordGenerations,
  wordLanguages,
  generations,
  languages,
  wordViews,
} from "@/lib/db/schema";

// =====================================
// FILTER OPTIONS & METADATA
// =====================================

export interface FilterOptions {
  generations: Array<{
    id: string;
    code: string;
    name: string;
    shortName: string;
    description: string | null;
    colorClass: string;
    startYear: number;
    endYear: number | null;
    wordCount: number;
    isPopular: boolean;
  }>;
  languages: Array<{
    id: string;
    code: string;
    name: string;
    flag: string | null;
    wordCount: number;
    isPopular: boolean;
  }>;
  statusFilters: Array<{
    key: string;
    label: string;
    count: number;
    description: string;
  }>;
  dateRanges: Array<{
    key: string;
    label: string;
    from: Date;
    to: Date;
    count: number;
  }>;
}

export async function getFilterOptions(): Promise<FilterOptions> {
  // Get generations with word counts
  const generationsData = await db
    .select({
      id: generations.id,
      code: generations.code,
      name: generations.name,
      shortName: generations.shortName,
      description: generations.description,
      colorClass: generations.colorClass,
      startYear: generations.startYear,
      endYear: generations.endYear,
      sortOrder: generations.sortOrder,
      wordCount: count(words.id),
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
      generations.description,
      generations.colorClass,
      generations.startYear,
      generations.endYear,
      generations.sortOrder
    )
    .orderBy(asc(generations.sortOrder));

  // Get languages with word counts
  const languagesData = await db
    .select({
      id: languages.id,
      code: languages.code,
      name: languages.name,
      flag: languages.flag,
      wordCount: count(words.id),
    })
    .from(languages)
    .leftJoin(wordLanguages, eq(wordLanguages.languageId, languages.id))
    .leftJoin(
      words,
      and(eq(wordLanguages.wordId, words.id), eq(words.isActive, true))
    )
    .where(eq(languages.isActive, true))
    .groupBy(languages.id, languages.code, languages.name, languages.flag)
    .orderBy(desc(count(words.id)), asc(languages.name));

  // Get status filter counts
  const totalWords = await getWordCount();
  const needsHelpWords = await getWordCount({ maxExplanations: 1 });
  const completeWords = await getWordCount({ minExplanations: 2 });
  const trendingWords = await getTrendingWordCount();

  // Get date range counts
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  const lastWeekCount = await getWordCount({ dateFrom: sevenDaysAgo });
  const lastMonthCount = await getWordCount({ dateFrom: thirtyDaysAgo });
  const lastQuarterCount = await getWordCount({ dateFrom: ninetyDaysAgo });

  return {
    generations: generationsData.map((gen) => ({
      id: gen.id,
      code: gen.code,
      name: gen.name,
      shortName: gen.shortName,
      description: gen.description,
      colorClass: gen.colorClass,
      startYear: gen.startYear,
      endYear: gen.endYear,
      wordCount: gen.wordCount || 0,
      isPopular: (gen.wordCount || 0) > 50, // Mark as popular if >50 words
    })),
    languages: languagesData.map((lang) => ({
      id: lang.id,
      code: lang.code,
      name: lang.name,
      flag: lang.flag,
      wordCount: lang.wordCount || 0,
      isPopular: (lang.wordCount || 0) > 100, // Mark as popular if >100 words
    })),
    statusFilters: [
      {
        key: "all",
        label: "Semua Kata",
        count: totalWords,
        description: "Tampilkan semua kata aktif",
      },
      {
        key: "trending",
        label: "Trending",
        count: trendingWords,
        description: "Kata dengan aktivitas tinggi belakangan ini",
      },
      {
        key: "needs-help",
        label: "Butuh Bantuan",
        count: needsHelpWords,
        description: "Kata yang masih memerlukan lebih banyak penjelasan",
      },
      {
        key: "complete",
        label: "Lengkap",
        count: completeWords,
        description: "Kata dengan penjelasan yang memadai",
      },
    ],
    dateRanges: [
      {
        key: "last-week",
        label: "Minggu Terakhir",
        from: sevenDaysAgo,
        to: now,
        count: lastWeekCount,
      },
      {
        key: "last-month",
        label: "Bulan Terakhir",
        from: thirtyDaysAgo,
        to: now,
        count: lastMonthCount,
      },
      {
        key: "last-quarter",
        label: "Tiga Bulan Terakhir",
        from: ninetyDaysAgo,
        to: now,
        count: lastQuarterCount,
      },
    ],
  };
}

// =====================================
// HELPER FUNCTIONS FOR COUNTING
// =====================================

interface WordCountParams {
  minExplanations?: number;
  maxExplanations?: number;
  dateFrom?: Date;
  dateTo?: Date;
  generation?: string;
  language?: string;
}

async function getWordCount(params: WordCountParams = {}): Promise<number> {
  const {
    minExplanations,
    maxExplanations,
    dateFrom,
    dateTo,
    generation,
    language,
  } = params;

  const conditions = [eq(words.isActive, true)];

  // Add explanation count filters
  if (minExplanations !== undefined) {
    conditions.push(sql`${words.totalExplanations} >= ${minExplanations}`);
  }
  if (maxExplanations !== undefined) {
    conditions.push(sql`${words.totalExplanations} <= ${maxExplanations}`);
  }

  // Add date filters
  if (dateFrom) {
    conditions.push(gte(words.createdAt, dateFrom));
  }
  if (dateTo) {
    conditions.push(lte(words.createdAt, dateTo));
  }

  // Handle different query types based on filters
  if (generation && language) {
    // Both generation and language filters
    const result = await db
      .select({ count: count() })
      .from(words)
      .innerJoin(wordGenerations, eq(wordGenerations.wordId, words.id))
      .innerJoin(generations, eq(wordGenerations.generationId, generations.id))
      .innerJoin(wordLanguages, eq(wordLanguages.wordId, words.id))
      .innerJoin(languages, eq(wordLanguages.languageId, languages.id))
      .where(
        and(
          ...conditions,
          eq(generations.code, generation),
          eq(languages.code, language)
        )
      );
    return result[0]?.count || 0;
  } else if (generation) {
    // Only generation filter
    const result = await db
      .select({ count: count() })
      .from(words)
      .innerJoin(wordGenerations, eq(wordGenerations.wordId, words.id))
      .innerJoin(generations, eq(wordGenerations.generationId, generations.id))
      .where(and(...conditions, eq(generations.code, generation)));
    return result[0]?.count || 0;
  } else if (language) {
    // Only language filter
    const result = await db
      .select({ count: count() })
      .from(words)
      .innerJoin(wordLanguages, eq(wordLanguages.wordId, words.id))
      .innerJoin(languages, eq(wordLanguages.languageId, languages.id))
      .where(and(...conditions, eq(languages.code, language)));
    return result[0]?.count || 0;
  } else {
    // No additional filters
    const result = await db
      .select({ count: count() })
      .from(words)
      .where(and(...conditions));
    return result[0]?.count || 0;
  }
}

async function getTrendingWordCount(): Promise<number> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // Count words with recent high activity (views, explanations, votes)
  const result = await db
    .select({ count: count() })
    .from(words)
    .leftJoin(wordViews, eq(wordViews.wordId, words.id))
    .where(
      and(eq(words.isActive, true), gte(wordViews.createdAt, sevenDaysAgo))
    )
    .groupBy(words.id)
    .having(sql`COUNT(${wordViews.id}) >= 5`);

  return result.length;
}

// =====================================
// WORD STATISTICS
// =====================================

export interface WordStatistics {
  totalWords: number;
  totalExplanations: number;
  totalVotes: number;
  totalViews: number;
  averageExplanationsPerWord: number;
  averageVotesPerExplanation: number;
  topGenerations: Array<{
    name: string;
    shortName: string;
    colorClass: string;
    wordCount: number;
    percentage: number;
  }>;
  topLanguages: Array<{
    name: string;
    code: string;
    flag: string | null;
    wordCount: number;
    percentage: number;
  }>;
  activityTrends: Array<{
    date: string;
    newWords: number;
    newExplanations: number;
  }>;
}

export async function getWordStatistics(): Promise<WordStatistics> {
  // Basic counts
  const totalWordsResult = await db
    .select({ count: count() })
    .from(words)
    .where(eq(words.isActive, true));

  const totalExplanationsResult = await db
    .select({ count: count() })
    .from(explanations)
    .innerJoin(words, eq(explanations.wordId, words.id))
    .where(eq(words.isActive, true));

  const totalVotesResult = await db
    .select({ sum: sql<number>`COALESCE(SUM(${explanations.votes}), 0)` })
    .from(explanations)
    .innerJoin(words, eq(explanations.wordId, words.id))
    .where(eq(words.isActive, true));

  const totalViewsResult = await db
    .select({ sum: sql<number>`COALESCE(SUM(${words.totalViews}), 0)` })
    .from(words)
    .where(eq(words.isActive, true));

  const totalWords = totalWordsResult[0]?.count || 0;
  const totalExplanations = totalExplanationsResult[0]?.count || 0;
  const totalVotes = totalVotesResult[0]?.sum || 0;
  const totalViews = totalViewsResult[0]?.sum || 0;

  // Top generations by word count
  const topGenerations = await db
    .select({
      name: generations.name,
      shortName: generations.shortName,
      colorClass: generations.colorClass,
      wordCount: count(words.id),
    })
    .from(generations)
    .innerJoin(
      wordGenerations,
      eq(wordGenerations.generationId, generations.id)
    )
    .innerJoin(
      words,
      and(eq(wordGenerations.wordId, words.id), eq(words.isActive, true))
    )
    .where(eq(generations.isActive, true))
    .groupBy(
      generations.id,
      generations.name,
      generations.shortName,
      generations.colorClass
    )
    .orderBy(desc(count(words.id)))
    .limit(5);

  // Top languages by word count
  const topLanguages = await db
    .select({
      name: languages.name,
      code: languages.code,
      flag: languages.flag,
      wordCount: count(words.id),
    })
    .from(languages)
    .innerJoin(wordLanguages, eq(wordLanguages.languageId, languages.id))
    .innerJoin(
      words,
      and(eq(wordLanguages.wordId, words.id), eq(words.isActive, true))
    )
    .where(eq(languages.isActive, true))
    .groupBy(languages.id, languages.name, languages.code, languages.flag)
    .orderBy(desc(count(words.id)))
    .limit(5);

  // Activity trends (last 7 days)
  const activityTrends = await getActivityTrends(7);

  return {
    totalWords,
    totalExplanations,
    totalVotes,
    totalViews,
    averageExplanationsPerWord:
      totalWords > 0
        ? Math.round((totalExplanations / totalWords) * 100) / 100
        : 0,
    averageVotesPerExplanation:
      totalExplanations > 0
        ? Math.round((totalVotes / totalExplanations) * 100) / 100
        : 0,
    topGenerations: topGenerations.map((gen) => ({
      name: gen.name,
      shortName: gen.shortName,
      colorClass: gen.colorClass,
      wordCount: gen.wordCount || 0,
      percentage:
        totalWords > 0
          ? Math.round(((gen.wordCount || 0) / totalWords) * 10000) / 100
          : 0,
    })),
    topLanguages: topLanguages.map((lang) => ({
      name: lang.name,
      code: lang.code,
      flag: lang.flag,
      wordCount: lang.wordCount || 0,
      percentage:
        totalWords > 0
          ? Math.round(((lang.wordCount || 0) / totalWords) * 10000) / 100
          : 0,
    })),
    activityTrends,
  };
}

async function getActivityTrends(days: number): Promise<
  Array<{
    date: string;
    newWords: number;
    newExplanations: number;
  }>
> {
  const trends: Array<{
    date: string;
    newWords: number;
    newExplanations: number;
  }> = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const dayEnd = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    // Count new words for this day
    const newWordsResult = await db
      .select({ count: count() })
      .from(words)
      .where(
        and(
          eq(words.isActive, true),
          gte(words.createdAt, dayStart),
          lte(words.createdAt, dayEnd)
        )
      );

    // Count new explanations for this day
    const newExplanationsResult = await db
      .select({ count: count() })
      .from(explanations)
      .innerJoin(words, eq(explanations.wordId, words.id))
      .where(
        and(
          eq(words.isActive, true),
          gte(explanations.createdAt, dayStart),
          lte(explanations.createdAt, dayEnd)
        )
      );

    trends.push({
      date: dayStart.toISOString().split("T")[0], // YYYY-MM-DD format
      newWords: newWordsResult[0]?.count || 0,
      newExplanations: newExplanationsResult[0]?.count || 0,
    });
  }

  return trends;
}

// =====================================
// EXPORT INDEX
// =====================================

export * from "./words-listing";
export * from "./words-search";
