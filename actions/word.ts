"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { findWordBySlug, findSimilarSlugs } from "@/lib/db/queries/word";
import { words, wordLanguages, wordGenerations } from "@/lib/db/schema";
import { createSlug, createUniqueSlug } from "@/lib/utils/slug";
import {
  wordRequestSchema,
  type WordRequestInput,
} from "@/lib/validations/word";

export async function createWordRequest(data: WordRequestInput) {
  try {
    // 1. Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        error: "Unauthorized. Please login first.",
      };
    }

    // 2. Validate input
    const validated = wordRequestSchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.message,
      };
    }

    const {
      term,
      context,
      languages: selectedLanguages,
      generations: selectedGenerations,
    } = validated.data;

    // 3. Generate slug
    const baseSlug = createSlug(term);

    // 4. Check for existing similar slugs
    const existingSlugs = await findSimilarSlugs(baseSlug);
    const uniqueSlug = createUniqueSlug(
      baseSlug,
      existingSlugs.map((w) => w.slug)
    );

    // 5. Insert word
    const [newWord] = await db
      .insert(words)
      .values({
        term: term.trim(),
        slug: uniqueSlug,
        context: context?.trim() || null,
        requestedBy: session.user.id,
        status: "approved", // Auto-approve for now
        isActive: true,
      })
      .returning();

    // 6. Insert word languages
    await db.insert(wordLanguages).values(
      selectedLanguages.map((lang) => ({
        wordId: newWord.id,
        languageId: lang.id,
        isPrimary: lang.isPrimary,
      }))
    );

    // 7. Insert word generations (if any)
    if (selectedGenerations && selectedGenerations.length > 0) {
      await db.insert(wordGenerations).values(
        selectedGenerations.map((gen) => ({
          wordId: newWord.id,
          generationId: gen.id,
          isPrimary: gen.isPrimary,
        }))
      );
    }

    // 8. Revalidate paths
    revalidatePath("/");
    revalidatePath("/contribute/word");
    revalidatePath(`/word/${uniqueSlug}`);

    return {
      success: true,
      data: {
        slug: uniqueSlug,
        id: newWord.id,
      },
    };
  } catch (error) {
    console.error("Error creating word request:", error);
    return {
      success: false,
      error: "Failed to create word request. Please try again.",
    };
  }
}

export async function checkSlugAvailability(term: string) {
  try {
    const slug = createSlug(term);
    const existing = await findWordBySlug(slug);

    return {
      available: !existing,
      slug,
      existingWord: existing ? { id: existing.id, term: existing.term } : null,
    };
  } catch (error) {
    console.error("Error checking slug:", error);
    return {
      available: true,
      slug: createSlug(term),
      existingWord: null,
    };
  }
}
