import {
  desc,
  eq,
  asc,
  sql,
  and,
  isNull,
  or,
  inArray,
  count,
} from "drizzle-orm";

import { db } from "@/lib/db";
import {
  words,
  explanations,
  users,
  comments,
  generations,
  languages,
  wordGenerations,
  wordLanguages,
  wordViews,
} from "@/lib/db/schema";

export interface HomepageStats {
  totalWords: number;
  totalExplanations: number;
  totalVotes: number;
  totalUsers: number;
  generationStats: {
    id: string;
    code: string;
    name: string;
    shortName: string;
    colorClass: string;
    totalWords: number;
    percentage: number;
  }[];
}

// Updated types to handle nullable database fields
export interface DailyWord {
  id: string;
  term: string;
  slug: string;
  totalViews: number;
  totalExplanations: number;
  topExplanation: {
    content: string;
    votes: number;
    author: {
      username: string;
      displayName: string | null;
    };
    generation: {
      name: string;
      colorClass: string;
    };
  } | null;
  languages: {
    name: string;
    flag: string | null;
  }[];
  generations: {
    name: string;
    colorClass: string;
  }[];
  createdAt: Date;
}

export interface TrendingWord {
  id: string;
  term: string;
  slug: string;
  totalViews: number;
  totalExplanations: number;
  recentViews: number;
  languages: {
    name: string;
    flag: string | null;
  }[];
  topGeneration: {
    name: string;
    colorClass: string;
  } | null;
}

export interface UnclearWord {
  id: string;
  term: string;
  slug: string;
  totalExplanations: number;
  requestedBy: {
    username: string;
    displayName: string | null;
  };
  createdAt: Date;
  daysSinceRequest: number;
}

export interface RecentContribution {
  id: string;
  type: "explanation" | "comment" | "vote";
  word: {
    term: string;
    slug: string;
  };
  user: {
    username: string;
    displayName: string | null;
    generation?: {
      name: string;
      colorClass: string;
    };
  };
  content?: string;
  createdAt: Date;
}

export interface LeaderboardUser {
  id: string;
  username: string;
  displayName: string | null;
  totalVotes: number;
  totalWordCount: number;
  rank: number;
  generation?: {
    name: string;
    colorClass: string;
  };
}

export interface GenerationHighlight {
  generation: {
    id: string;
    code: string;
    name: string;
    shortName: string;
    description: string | null;
    colorClass: string;
    iconClass: string | null;
    startYear: number;
    endYear: number | null;
  };
  stats: {
    totalWords: number;
    totalExplanations: number;
    totalVotes: number;
    activeUsers: number;
  };
  topWords: {
    id: string;
    term: string;
    slug: string;
    totalViews: number;
    totalExplanations: number;
  }[];
  recentActivity: number; // Activity in last 7 days
  trendingTag: string; // "Baru dan viral", "Paling aktif", "Timeless", etc.
}

export async function getHomepageStats(): Promise<HomepageStats> {
  // Get overall platform statistics
  const [overallStats] = await db
    .select({
      totalWords: sql<number>`COUNT(DISTINCT ${words.id})`,
      totalExplanations: sql<number>`COALESCE(SUM(${words.totalExplanations}), 0)`,
      totalVotes: sql<number>`COALESCE(SUM(${words.totalVotes}), 0)`,
      totalUsers: sql<number>`COUNT(DISTINCT ${explanations.userId})`,
    })
    .from(words)
    .leftJoin(explanations, eq(explanations.wordId, words.id))
    .where(eq(words.status, "approved"));

  // Get generation breakdown with word counts
  const generationBreakdown = await db
    .select({
      generationId: wordGenerations.generationId,
      generationCode: generations.code,
      generationName: generations.name,
      generationShortName: generations.shortName,
      generationColorClass: generations.colorClass,
      totalWords: count(words.id),
    })
    .from(wordGenerations)
    .innerJoin(words, eq(wordGenerations.wordId, words.id))
    .innerJoin(generations, eq(wordGenerations.generationId, generations.id))
    .where(
      and(
        eq(wordGenerations.isPrimary, true),
        eq(words.status, "approved"),
        eq(generations.isActive, true)
      )
    )
    .groupBy(
      wordGenerations.generationId,
      generations.code,
      generations.name,
      generations.shortName,
      generations.colorClass,
      generations.sortOrder
    )
    .orderBy(asc(generations.sortOrder));

  // Calculate percentages and format data
  const totalWords = overallStats?.totalWords ?? 0;

  // Filter out null generationId and handle type safety
  const generationStats = generationBreakdown
    .filter((gen) => gen.generationId !== null) // Filter out null IDs
    .map((gen) => ({
      id: gen.generationId!, // Use non-null assertion since we filtered
      code: gen.generationCode,
      name: gen.generationName,
      shortName: gen.generationShortName,
      colorClass: gen.generationColorClass,
      totalWords: gen.totalWords ?? 0,
      percentage:
        totalWords > 0
          ? Math.round(((gen.totalWords ?? 0) / totalWords) * 100)
          : 0,
    }));

  return {
    totalWords: totalWords,
    totalExplanations: overallStats?.totalExplanations ?? 0,
    totalVotes: overallStats?.totalVotes ?? 0,
    totalUsers: overallStats?.totalUsers ?? 0,
    generationStats,
  };
}

// Daily Words - Top voted explanations (FIXED TypeScript errors)
export async function getDailyWords(limit: number = 6): Promise<DailyWord[]> {
  // Get top explanations with their words
  const topExplanations = await db
    .select({
      wordId: words.id,
      wordTerm: words.term,
      wordSlug: words.slug,
      wordViews: words.totalViews,
      wordExplanations: words.totalExplanations,
      wordCreatedAt: words.createdAt,
      explanationContent: explanations.content,
      explanationVotes: explanations.votes,
      authorUsername: users.username,
      authorDisplayName: users.displayName,
    })
    .from(explanations)
    .innerJoin(words, eq(explanations.wordId, words.id))
    .innerJoin(users, eq(explanations.userId, users.id))
    .where(
      and(
        eq(words.status, "approved"),
        eq(explanations.isActive, true),
        eq(explanations.isAccepted, true)
      )
    )
    .orderBy(desc(explanations.votes), desc(words.totalViews))
    .limit(limit);

  // Get unique word IDs
  const wordIds = [...new Set(topExplanations.map((exp) => exp.wordId))];

  if (wordIds.length === 0) return [];

  // Get language and generation data
  const wordLanguagesData = await db
    .select({
      wordId: wordLanguages.wordId,
      languageName: languages.name,
      languageFlag: languages.flag,
      isPrimary: wordLanguages.isPrimary,
    })
    .from(wordLanguages)
    .innerJoin(languages, eq(wordLanguages.languageId, languages.id))
    .where(inArray(wordLanguages.wordId, wordIds));

  const wordGenerationsData = await db
    .select({
      wordId: wordGenerations.wordId,
      generationName: generations.name,
      generationColorClass: generations.colorClass,
      isPrimary: wordGenerations.isPrimary,
    })
    .from(wordGenerations)
    .innerJoin(generations, eq(wordGenerations.generationId, generations.id))
    .where(inArray(wordGenerations.wordId, wordIds));

  // Group data by word and handle null values
  const wordsMap = new Map<string, DailyWord>();

  topExplanations.forEach((exp) => {
    if (!wordsMap.has(exp.wordId)) {
      const wordLanguagesList = wordLanguagesData
        .filter((wl) => wl.wordId === exp.wordId)
        .map((wl) => ({
          name: wl.languageName,
          flag: wl.languageFlag,
        }));

      const wordGenerationsList = wordGenerationsData
        .filter((wg) => wg.wordId === exp.wordId)
        .map((wg) => ({
          name: wg.generationName,
          colorClass: wg.generationColorClass,
        }));

      const primaryGeneration = wordGenerationsData.find(
        (wg) => wg.wordId === exp.wordId && wg.isPrimary
      );

      wordsMap.set(exp.wordId, {
        id: exp.wordId,
        term: exp.wordTerm,
        slug: exp.wordSlug,
        totalViews: exp.wordViews ?? 0, // Handle null with nullish coalescing
        totalExplanations: exp.wordExplanations ?? 0, // Handle null
        languages: wordLanguagesList,
        generations: wordGenerationsList,
        topExplanation: {
          content: exp.explanationContent,
          votes: exp.explanationVotes ?? 0, // Handle null
          author: {
            username: exp.authorUsername,
            displayName: exp.authorDisplayName,
          },
          generation: {
            name: primaryGeneration?.generationName || "Unknown",
            colorClass:
              primaryGeneration?.generationColorClass ||
              "bg-gray-100 text-gray-700",
          },
        },
        createdAt: exp.wordCreatedAt ?? new Date(), // Handle null Date
      });
    }
  });

  return Array.from(wordsMap.values());
}

export async function getGenerationHighlights(
  limit: number = 4
): Promise<GenerationHighlight[]> {
  // Get all active generations
  const allGenerations = await db
    .select()
    .from(generations)
    .where(eq(generations.isActive, true))
    .orderBy(asc(generations.sortOrder));

  if (allGenerations.length === 0) return [];

  const generationIds = allGenerations.map((g) => g.id);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // Get stats for each generation
  const generationStats = await db
    .select({
      generationId: wordGenerations.generationId,
      totalWords: count(words.id),
      totalExplanations: sql<number>`COALESCE(SUM(${words.totalExplanations}), 0)`,
      totalVotes: sql<number>`COALESCE(SUM(${words.totalVotes}), 0)`,
      recentActivity: sql<number>`COUNT(CASE WHEN ${
        explanations.createdAt
      } > ${sevenDaysAgo.toISOString()} THEN 1 END)`,
    })
    .from(wordGenerations)
    .innerJoin(words, eq(wordGenerations.wordId, words.id))
    .leftJoin(explanations, eq(explanations.wordId, words.id))
    .where(
      and(
        inArray(wordGenerations.generationId, generationIds),
        eq(wordGenerations.isPrimary, true),
        eq(words.status, "approved")
      )
    )
    .groupBy(wordGenerations.generationId);

  // Get active users count per generation
  const activeUsersPerGeneration = await db
    .select({
      generationId: wordGenerations.generationId,
      activeUsers: sql<number>`COUNT(DISTINCT ${explanations.userId})`,
    })
    .from(wordGenerations)
    .innerJoin(explanations, eq(wordGenerations.wordId, explanations.wordId))
    .where(
      and(
        inArray(wordGenerations.generationId, generationIds),
        eq(wordGenerations.isPrimary, true),
        eq(explanations.isActive, true)
      )
    )
    .groupBy(wordGenerations.generationId);

  // Get top words for each generation
  const topWordsPerGeneration = await db
    .select({
      generationId: wordGenerations.generationId,
      wordId: words.id,
      wordTerm: words.term,
      wordSlug: words.slug,
      wordViews: words.totalViews,
      wordExplanations: words.totalExplanations,
      wordVotes: words.totalVotes,
    })
    .from(wordGenerations)
    .innerJoin(words, eq(wordGenerations.wordId, words.id))
    .where(
      and(
        inArray(wordGenerations.generationId, generationIds),
        eq(wordGenerations.isPrimary, true),
        eq(words.status, "approved")
      )
    )
    .orderBy(desc(words.totalVotes), desc(words.totalViews));

  // Process data for each generation
  const highlights: GenerationHighlight[] = allGenerations.map((generation) => {
    const stats = generationStats.find((s) => s.generationId === generation.id);
    const activeUsers = activeUsersPerGeneration.find(
      (a) => a.generationId === generation.id
    );

    const topWords = topWordsPerGeneration
      .filter((w) => w.generationId === generation.id)
      .slice(0, 3) // Top 3 words per generation
      .map((w) => ({
        id: w.wordId,
        term: w.wordTerm,
        slug: w.wordSlug,
        totalViews: w.wordViews ?? 0,
        totalExplanations: w.wordExplanations ?? 0,
      }));

    // Determine trending tag based on generation characteristics
    const getTrendingTag = (gen: typeof generation, recentActivity: number) => {
      if (gen.code === "gen-alpha") return "Baru dan viral";
      if (gen.code === "gen-z") return "Paling aktif";
      if (gen.code === "milenial") return "Workplace humor";
      if (gen.code === "gen-x") return "Classic vibes";
      if (gen.code === "lintas-generasi") return "Timeless";

      // Dynamic based on activity
      if (recentActivity > 10) return "Trending";
      if (recentActivity > 5) return "Aktif";
      return "Stabil";
    };

    return {
      generation: {
        id: generation.id,
        code: generation.code,
        name: generation.name,
        shortName: generation.shortName,
        description: generation.description,
        colorClass: generation.colorClass,
        iconClass: generation.iconClass,
        startYear: generation.startYear,
        endYear: generation.endYear,
      },
      stats: {
        totalWords: stats?.totalWords ?? 0,
        totalExplanations: stats?.totalExplanations ?? 0,
        totalVotes: stats?.totalVotes ?? 0,
        activeUsers: activeUsers?.activeUsers ?? 0,
      },
      topWords,
      recentActivity: stats?.recentActivity ?? 0,
      trendingTag: getTrendingTag(generation, stats?.recentActivity ?? 0),
    };
  });

  // Sort by activity and relevance, take top ones
  return highlights
    .sort((a, b) => {
      // Prioritize generations with more activity and words
      const scoreA =
        a.stats.totalWords * 2 + a.recentActivity * 5 + a.stats.totalVotes;
      const scoreB =
        b.stats.totalWords * 2 + b.recentActivity * 5 + b.stats.totalVotes;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

// Trending Words - Fixed TypeScript errors
export async function getTrendingWords(
  limit: number = 8
): Promise<TrendingWord[]> {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const twentyFourHoursAgoISO = twentyFourHoursAgo.toISOString(); // Convert to ISO string

  // Get words with recent activity
  const trendingWords = await db
    .select({
      id: words.id,
      term: words.term,
      slug: words.slug,
      totalViews: words.totalViews,
      totalExplanations: words.totalExplanations,
      recentViews: sql<number>`COUNT(CASE WHEN ${wordViews.createdAt} > ${twentyFourHoursAgoISO} THEN 1 END)`,
    })
    .from(words)
    .leftJoin(wordViews, eq(wordViews.wordId, words.id))
    .where(eq(words.status, "approved"))
    .groupBy(
      words.id,
      words.term,
      words.slug,
      words.totalViews,
      words.totalExplanations
    )
    .orderBy(
      desc(
        sql`COUNT(CASE WHEN ${wordViews.createdAt} > ${twentyFourHoursAgoISO} THEN 1 END)`
      ),
      desc(words.totalViews)
    )
    .limit(limit);

  const wordIds = trendingWords.map((w) => w.id);

  if (wordIds.length === 0) return [];

  // Get languages and primary generations
  const wordLanguagesData = await db
    .select({
      wordId: wordLanguages.wordId,
      languageName: languages.name,
      languageFlag: languages.flag,
    })
    .from(wordLanguages)
    .innerJoin(languages, eq(wordLanguages.languageId, languages.id))
    .where(inArray(wordLanguages.wordId, wordIds));

  const wordGenerationsData = await db
    .select({
      wordId: wordGenerations.wordId,
      generationName: generations.name,
      generationColorClass: generations.colorClass,
    })
    .from(wordGenerations)
    .innerJoin(generations, eq(wordGenerations.generationId, generations.id))
    .where(
      and(
        inArray(wordGenerations.wordId, wordIds),
        eq(wordGenerations.isPrimary, true)
      )
    );

  return trendingWords.map((word) => {
    const wordLanguagesList = wordLanguagesData
      .filter((wl) => wl.wordId === word.id)
      .map((wl) => ({
        name: wl.languageName,
        flag: wl.languageFlag,
      }));

    const primaryGeneration = wordGenerationsData.find(
      (wg) => wg.wordId === word.id
    );

    return {
      id: word.id,
      term: word.term,
      slug: word.slug,
      totalViews: word.totalViews ?? 0, // Handle null
      totalExplanations: word.totalExplanations ?? 0, // Handle null
      recentViews: word.recentViews ?? 0, // Handle null
      languages: wordLanguagesList,
      topGeneration: primaryGeneration
        ? {
            name: primaryGeneration.generationName,
            colorClass: primaryGeneration.generationColorClass,
          }
        : null,
    };
  });
}

// Unclear Words - Fixed TypeScript errors
export async function getUnclearWords(
  limit: number = 6
): Promise<UnclearWord[]> {
  const unclearWords = await db
    .select({
      id: words.id,
      term: words.term,
      slug: words.slug,
      totalExplanations: words.totalExplanations,
      requesterUsername: users.username,
      requesterDisplayName: users.displayName,
      createdAt: words.createdAt,
    })
    .from(words)
    .leftJoin(users, eq(words.requestedBy, users.id))
    .where(
      and(
        eq(words.status, "approved"),
        or(isNull(words.totalExplanations), sql`${words.totalExplanations} < 3`)
      )
    )
    .orderBy(asc(words.totalExplanations), desc(words.createdAt))
    .limit(limit);

  return unclearWords.map((word) => ({
    id: word.id,
    term: word.term,
    slug: word.slug,
    totalExplanations: word.totalExplanations ?? 0, // Handle null
    requestedBy: {
      username: word.requesterUsername || "Anonymous",
      displayName: word.requesterDisplayName,
    },
    createdAt: word.createdAt ?? new Date(), // Handle null Date
    daysSinceRequest: Math.floor(
      (Date.now() - (word.createdAt?.getTime() ?? Date.now())) /
        (1000 * 60 * 60 * 24)
    ),
  }));
}

// Recent Contributions - Fixed TypeScript errors
export async function getRecentContributions(
  limit: number = 10
): Promise<RecentContribution[]> {
  // Get recent explanations
  const recentExplanations = await db
    .select({
      id: explanations.id,
      type: sql<string>`'explanation'`,
      wordTerm: words.term,
      wordSlug: words.slug,
      username: users.username,
      displayName: users.displayName,
      content: explanations.content,
      createdAt: explanations.createdAt,
      generationName: generations.name,
      generationColorClass: generations.colorClass,
    })
    .from(explanations)
    .innerJoin(words, eq(explanations.wordId, words.id))
    .innerJoin(users, eq(explanations.userId, users.id))
    .leftJoin(
      wordGenerations,
      and(
        eq(wordGenerations.wordId, words.id),
        eq(wordGenerations.isPrimary, true)
      )
    )
    .leftJoin(generations, eq(wordGenerations.generationId, generations.id))
    .where(eq(explanations.isActive, true))
    .orderBy(desc(explanations.createdAt))
    .limit(Math.ceil(limit / 2));

  // Get recent comments
  const recentComments = await db
    .select({
      id: comments.id,
      type: sql<string>`'comment'`,
      wordTerm: words.term,
      wordSlug: words.slug,
      username: users.username,
      displayName: users.displayName,
      content: comments.content,
      createdAt: comments.createdAt,
      generationName: sql<string | null>`NULL`,
      generationColorClass: sql<string | null>`NULL`,
    })
    .from(comments)
    .innerJoin(explanations, eq(comments.explanationId, explanations.id))
    .innerJoin(words, eq(explanations.wordId, words.id))
    .innerJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.isActive, true))
    .orderBy(desc(comments.createdAt))
    .limit(Math.floor(limit / 2));

  // Combine and sort by date
  const allContributions = [...recentExplanations, ...recentComments]
    .sort(
      (a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
    )
    .slice(0, limit);

  return allContributions.map((contribution) => ({
    id: contribution.id,
    type: contribution.type as "explanation" | "comment" | "vote",
    word: {
      term: contribution.wordTerm,
      slug: contribution.wordSlug,
    },
    user: {
      username: contribution.username,
      displayName: contribution.displayName,
      generation: contribution.generationName
        ? {
            name: contribution.generationName,
            colorClass:
              contribution.generationColorClass || "bg-gray-100 text-gray-700",
          }
        : undefined,
    },
    content: contribution.content,
    createdAt: contribution.createdAt ?? new Date(), // Handle null Date
  }));
}

// Fixed Leaderboard Query - Replace the existing getLeaderboard function
export async function getLeaderboard(
  limit: number = 10
): Promise<LeaderboardUser[]> {
  const leaderboard = await db
    .select({
      id: users.id,
      username: users.username,
      displayName: users.displayName,
      totalVotes: users.totalVotes,
      totalWordCount: users.totalWordCount,
      // Get primary generation from user's most active word explanations
      generationName: sql<string | null>`
        (SELECT g.name 
         FROM explanations e
         JOIN word_generations wg ON e.word_id = wg.word_id AND wg.is_primary = true
         JOIN generations g ON wg.generation_id = g.id
         WHERE e.user_id = users.id
         GROUP BY g.name, g.sort_order
         ORDER BY COUNT(*) DESC, g.sort_order ASC
         LIMIT 1)
      `,
      generationColorClass: sql<string | null>`
        (SELECT g.color_class 
         FROM explanations e
         JOIN word_generations wg ON e.word_id = wg.word_id AND wg.is_primary = true
         JOIN generations g ON wg.generation_id = g.id
         WHERE e.user_id = users.id
         GROUP BY g.color_class, g.sort_order
         ORDER BY COUNT(*) DESC, g.sort_order ASC
         LIMIT 1)
      `,
    })
    .from(users)
    .where(eq(users.isActive, true))
    .orderBy(desc(users.totalVotes), desc(users.totalWordCount))
    .limit(limit);

  return leaderboard.map((user, index) => ({
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    totalVotes: user.totalVotes ?? 0, // Handle null
    totalWordCount: user.totalWordCount ?? 0, // Handle null
    rank: index + 1,
    generation: user.generationName
      ? {
          name: user.generationName,
          colorClass: user.generationColorClass || "bg-gray-100 text-gray-700",
        }
      : undefined,
  }));
}

// Recent Activities - Fixed TypeScript errors
export async function getRecentActivities(limit: number = 15) {
  // Since we don't have an activities table in the schema,
  // we'll create a virtual activity feed from recent actions

  const recentActions = await db
    .select({
      id: explanations.id,
      type: sql<string>`'explanation'`,
      description: sql<string>`'memberikan penjelasan untuk kata'`,
      username: users.username,
      displayName: users.displayName,
      wordTerm: words.term,
      wordSlug: words.slug,
      createdAt: explanations.createdAt,
    })
    .from(explanations)
    .innerJoin(users, eq(explanations.userId, users.id))
    .innerJoin(words, eq(explanations.wordId, words.id))
    .where(eq(explanations.isActive, true))
    .orderBy(desc(explanations.createdAt))
    .limit(limit);

  return recentActions.map((activity) => ({
    id: activity.id,
    type: activity.type,
    description: activity.description,
    user: {
      username: activity.username,
      displayName: activity.displayName,
    },
    relatedWord: {
      term: activity.wordTerm,
      slug: activity.wordSlug,
    },
    createdAt: activity.createdAt ?? new Date(), // Handle null Date
  }));
}
