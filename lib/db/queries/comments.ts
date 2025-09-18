import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { comments, users } from "@/lib/db/schema";

// Type for comment with user details
export type CommentWithUser = {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    username: string | null;
    displayName: string | null;
    avatar: string | null;
  };
};

// Get comments for a specific explanation
export async function getCommentsByExplanationId(
  explanationId: string,
  limit: number = 20
): Promise<CommentWithUser[]> {
  const result = await db
    .select({
      id: comments.id,
      content: comments.content,
      createdAt: comments.createdAt,
      userId: users.id,
      username: users.username,
      displayName: users.displayName,
      avatar: users.avatar,
    })
    .from(comments)
    .innerJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.explanationId, explanationId))
    .orderBy(desc(comments.createdAt))
    .limit(limit);

  return result.map((row) => ({
    id: row.id,
    content: row.content,
    createdAt: row.createdAt ?? new Date(),
    user: {
      id: row.userId,
      username: row.username,
      displayName: row.displayName,
      avatar: row.avatar,
    },
  }));
}

// Add a new comment
export async function addComment(
  explanationId: string,
  userId: string,
  content: string
) {
  const [newComment] = await db
    .insert(comments)
    .values({
      explanationId,
      userId,
      content,
    })
    .returning();

  return newComment;
}

// Delete a comment (for moderation)
export async function deleteComment(commentId: string, userId: string) {
  const [deletedComment] = await db
    .delete(comments)
    .where(eq(comments.id, commentId))
    .returning();

  return deletedComment;
}
