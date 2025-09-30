import { eq, like } from "drizzle-orm";

import { db } from "@/lib/db";
import { words, languages, generations } from "@/lib/db/schema";

export async function findWordBySlug(slug: string) {
  return await db.query.words.findFirst({
    where: eq(words.slug, slug),
  });
}

export async function findSimilarSlugs(baseSlug: string) {
  return await db.query.words.findMany({
    where: like(words.slug, `${baseSlug}%`),
    columns: {
      slug: true,
    },
  });
}

export async function getActiveLanguages() {
  return await db.query.languages.findMany({
    where: eq(languages.isActive, true),
    orderBy: (languages, { asc }) => [asc(languages.sortOrder)],
  });
}

export async function getActiveGenerations() {
  return await db.query.generations.findMany({
    where: eq(generations.isActive, true),
    orderBy: (generations, { asc }) => [asc(generations.sortOrder)],
  });
}

export async function getRecentWordRequests(userId: string, limit = 5) {
  return await db.query.words.findMany({
    where: eq(words.requestedBy, userId),
    orderBy: (words, { desc }) => [desc(words.createdAt)],
    limit,
    with: {
      languages: {
        with: {
          language: true,
        },
      },
    },
  });
}
