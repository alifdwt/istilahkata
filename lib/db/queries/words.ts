import { and, desc, eq, sql, count, ilike } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  words,
  explanations,
  users,
  wordGenerations,
  wordLanguages,
  generations,
  languages,
  comments,
  wordViews,
} from "@/lib/db/schema";

// Type definitions for returned data
export type WordWithDetails = {
  id: string;
  term: string;
  slug: string;
  context: string | null;
  totalViews: number;
  totalExplanations: number;
  totalVotes: number;
  status: "pending" | "approved" | "rejected" | "needs-review";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  requestedBy: {
    id: string;
    username: string | null;
    displayName: string | null;
    avatar: string | null;
  } | null;
  generations: Array<{
    id: string;
    name: string;
    code: string;
    isPrimary: boolean;
  }>;
  languages: Array<{
    id: string;
    name: string;
    code: string;
    isPrimary: boolean;
  }>;
};

export type ExplanationWithDetails = {
  id: string;
  content: string;
  example: string | null;
  votes: number;
  wordCount: number;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    username: string | null;
    displayName: string | null;
    avatar: string | null;
    totalVotes: number;
    totalWordCount: number;
  };
  totalComments: number;
};

// Get word by slug with all related data
export async function getWordBySlug(
  slug: string
): Promise<WordWithDetails | null> {
  const result = await db
    .select({
      // Word fields
      id: words.id,
      term: words.term,
      slug: words.slug,
      context: words.context,
      totalViews: words.totalViews,
      totalExplanations: words.totalExplanations,
      totalVotes: words.totalVotes,
      status: words.status,
      isActive: words.isActive,
      createdAt: words.createdAt,
      updatedAt: words.updatedAt,
      // User fields
      requestedById: words.requestedBy,
      requesterUsername: users.username,
      requesterDisplayName: users.displayName,
      requesterAvatar: users.avatar,
    })
    .from(words)
    .leftJoin(users, eq(words.requestedBy, users.id))
    .where(and(eq(words.slug, slug), eq(words.isActive, true)))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const word = result[0];

  // Get generations for this word
  const generationsResult = await db
    .select({
      id: generations.id,
      name: generations.name,
      code: generations.code,
      isPrimary: wordGenerations.isPrimary,
    })
    .from(wordGenerations)
    .innerJoin(generations, eq(wordGenerations.generationId, generations.id))
    .where(eq(wordGenerations.wordId, word.id))
    .orderBy(desc(wordGenerations.isPrimary));

  // Get languages for this word
  const languagesResult = await db
    .select({
      id: languages.id,
      name: languages.name,
      code: languages.code,
      isPrimary: wordLanguages.isPrimary,
    })
    .from(wordLanguages)
    .innerJoin(languages, eq(wordLanguages.languageId, languages.id))
    .where(eq(wordLanguages.wordId, word.id))
    .orderBy(desc(wordLanguages.isPrimary));

  return {
    id: word.id,
    term: word.term,
    slug: word.slug,
    context: word.context,
    totalViews: word.totalViews ?? 0,
    totalExplanations: word.totalExplanations ?? 0,
    totalVotes: word.totalVotes ?? 0,
    status: word.status ?? "pending",
    isActive: word.isActive ?? true,
    createdAt: word.createdAt ?? new Date(),
    updatedAt: word.updatedAt ?? new Date(),
    requestedBy: word.requestedById
      ? {
          id: word.requestedById,
          username: word.requesterUsername,
          displayName: word.requesterDisplayName,
          avatar: word.requesterAvatar,
        }
      : null,
    generations: generationsResult.map((gen) => ({
      id: gen.id,
      name: gen.name,
      code: gen.code,
      isPrimary: gen.isPrimary ?? false,
    })),
    languages: languagesResult.map((lang) => ({
      id: lang.id,
      name: lang.name,
      code: lang.code,
      isPrimary: lang.isPrimary ?? false,
    })),
  };
}

// Get explanations for a word with user details
export async function getExplanationsByWordSlug(
  slug: string,
  limit: number = 10,
  offset: number = 0
): Promise<ExplanationWithDetails[]> {
  const result = await db
    .select({
      // Explanation fields
      id: explanations.id,
      content: explanations.content,
      example: explanations.example,
      votes: explanations.votes,
      wordCount: explanations.wordCount,
      isAccepted: explanations.isAccepted,
      createdAt: explanations.createdAt,
      updatedAt: explanations.updatedAt,
      // User fields
      userId: users.id,
      username: users.username,
      displayName: users.displayName,
      avatar: users.avatar,
      userTotalVotes: users.totalVotes,
      userTotalWordCount: users.totalWordCount,
      // Comments count
      totalComments: sql<number>`CAST(COUNT(${comments.id}) AS INTEGER)`,
    })
    .from(explanations)
    .innerJoin(words, eq(explanations.wordId, words.id))
    .innerJoin(users, eq(explanations.userId, users.id))
    .leftJoin(comments, eq(comments.explanationId, explanations.id))
    .where(and(eq(words.slug, slug), eq(words.isActive, true)))
    .groupBy(
      explanations.id,
      explanations.content,
      explanations.example,
      explanations.votes,
      explanations.wordCount,
      explanations.isAccepted,
      explanations.createdAt,
      explanations.updatedAt,
      users.id,
      users.username,
      users.displayName,
      users.avatar,
      users.totalVotes,
      users.totalWordCount
    )
    .orderBy(desc(explanations.isAccepted), desc(explanations.votes))
    .limit(limit)
    .offset(offset);

  return result.map((row) => ({
    id: row.id,
    content: row.content,
    example: row.example,
    votes: row.votes ?? 0,
    wordCount: row.wordCount ?? 0,
    isAccepted: row.isAccepted ?? false,
    createdAt: row.createdAt ?? new Date(),
    updatedAt: row.updatedAt ?? new Date(),
    user: {
      id: row.userId,
      username: row.username,
      displayName: row.displayName,
      avatar: row.avatar,
      totalVotes: row.userTotalVotes ?? 0,
      totalWordCount: row.userTotalWordCount ?? 0,
    },
    totalComments: row.totalComments,
  }));
}

// Get words with pagination and filters
export async function getWords(
  options: {
    limit?: number;
    offset?: number;
    search?: string;
    generation?: string;
    language?: string;
    status?: "pending" | "approved" | "rejected" | "needs-review";
    sortBy?: "newest" | "popular" | "trending" | "votes";
  } = {}
) {
  const {
    limit = 20,
    offset = 0,
    search,
    generation,
    language,
    status,
    sortBy = "newest",
  } = options;

  let query = db
    .select({
      id: words.id,
      term: words.term,
      slug: words.slug,
      context: words.context,
      totalViews: words.totalViews,
      totalExplanations: words.totalExplanations,
      totalVotes: words.totalVotes,
      status: words.status,
      createdAt: words.createdAt,
      // User fields
      requesterUsername: users.username,
      requesterDisplayName: users.displayName,
      requesterAvatar: users.avatar,
    })
    .from(words)
    .leftJoin(users, eq(words.requestedBy, users.id))
    .$dynamic();

  // Add filters
  const conditions = [eq(words.isActive, true)];

  if (search) {
    conditions.push(ilike(words.term, `%${search}%`));
  }

  if (status) {
    conditions.push(eq(words.status, status));
  }

  if (generation) {
    query = query
      .innerJoin(wordGenerations, eq(words.id, wordGenerations.wordId))
      .innerJoin(generations, eq(wordGenerations.generationId, generations.id));
    conditions.push(eq(generations.code, generation));
  }

  if (language) {
    query = query
      .innerJoin(wordLanguages, eq(words.id, wordLanguages.wordId))
      .innerJoin(languages, eq(wordLanguages.languageId, languages.id));
    conditions.push(eq(languages.code, language));
  }

  query = query.where(and(...conditions));

  // Add sorting
  switch (sortBy) {
    case "popular":
      query = query.orderBy(desc(words.totalViews));
      break;
    case "trending":
      // Trending could be a complex calculation, for now use recent popular
      query = query.orderBy(desc(words.totalViews), desc(words.createdAt));
      break;
    case "votes":
      query = query.orderBy(desc(words.totalVotes));
      break;
    case "newest":
    default:
      query = query.orderBy(desc(words.createdAt));
      break;
  }

  return await query.limit(limit).offset(offset);
}

// Increment word view count
export async function incrementWordView(
  wordId: string,
  userId?: string,
  ipAddress?: string,
  userAgent?: string
) {
  // Record the view
  await db.insert(wordViews).values({
    wordId,
    userId,
    ipAddress,
    userAgent,
  });

  // Update total views count
  await db
    .update(words)
    .set({
      totalViews: sql`${words.totalViews} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(words.id, wordId));
}

// Search words (for search functionality)
export async function searchWords(query: string, limit: number = 10) {
  return await db
    .select({
      id: words.id,
      term: words.term,
      slug: words.slug,
      context: words.context,
      totalViews: words.totalViews,
      totalExplanations: words.totalExplanations,
    })
    .from(words)
    .where(
      and(
        ilike(words.term, `%${query}%`),
        eq(words.isActive, true),
        eq(words.status, "approved")
      )
    )
    .orderBy(desc(words.totalViews))
    .limit(limit);
}

// Get related words (words with similar generations/languages)
export async function getRelatedWords(wordId: string, limit: number = 5) {
  // Get words that share generations with the current word
  const relatedWords = await db
    .select({
      id: words.id,
      term: words.term,
      slug: words.slug,
      totalViews: words.totalViews,
      totalExplanations: words.totalExplanations,
    })
    .from(words)
    .innerJoin(wordGenerations, eq(words.id, wordGenerations.wordId))
    .where(
      and(
        sql`${wordGenerations.generationId} IN (
          SELECT ${wordGenerations.generationId} 
          FROM ${wordGenerations} 
          WHERE ${wordGenerations.wordId} = ${wordId}
        )`,
        sql`${words.id} != ${wordId}`,
        eq(words.isActive, true),
        eq(words.status, "approved")
      )
    )
    .groupBy(
      words.id,
      words.term,
      words.slug,
      words.totalViews,
      words.totalExplanations
    )
    .orderBy(desc(words.totalViews))
    .limit(limit);

  return relatedWords;
}

// Get word statistics for analytics
export async function getWordStats(wordId: string) {
  const stats = await db
    .select({
      totalExplanations: count(explanations.id),
      totalVotes: sql<number>`COALESCE(SUM(${explanations.votes}), 0)`,
      totalComments: sql<number>`COALESCE(COUNT(${comments.id}), 0)`,
    })
    .from(words)
    .leftJoin(explanations, eq(words.id, explanations.wordId))
    .leftJoin(comments, eq(explanations.id, comments.explanationId))
    .where(eq(words.id, wordId))
    .groupBy(words.id);

  return stats[0] || { totalExplanations: 0, totalVotes: 0, totalComments: 0 };
}

// Get top contributors for a word
export async function getWordTopContributors(
  wordId: string,
  limit: number = 5
) {
  return await db
    .select({
      userId: users.id,
      username: users.username,
      displayName: users.displayName,
      avatar: users.avatar,
      totalVotes: sql<number>`COALESCE(SUM(${explanations.votes}), 0)`,
      explanationCount: count(explanations.id),
    })
    .from(explanations)
    .innerJoin(users, eq(explanations.userId, users.id))
    .where(eq(explanations.wordId, wordId))
    .groupBy(users.id, users.username, users.displayName, users.avatar)
    .orderBy(desc(sql`COALESCE(SUM(${explanations.votes}), 0)`))
    .limit(limit);
}

// Get word by ID
export async function getWordById(id: string): Promise<WordWithDetails | null> {
  const result = await db
    .select({
      slug: words.slug,
    })
    .from(words)
    .where(eq(words.id, id))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  return getWordBySlug(result[0].slug);
}
