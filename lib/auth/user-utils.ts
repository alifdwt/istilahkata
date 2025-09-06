import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

import { getSession } from "./server";

export type ExtendedUser = {
  id: string;
  username: string | null;
  email: string;
  displayName: string | null;
  avatar: string | null;
  bio: string | null;
  totalVotes: number;
  totalWordCount: number;
  role: "user" | "moderator" | "admin";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Get current user with all custom fields from database
export async function getCurrentUserExtended(): Promise<ExtendedUser | null> {
  const session = await getSession();
  if (!session) return null;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  // @ts-expect-error Type 'null' is not assignable to type 'ExtendedUser | null'.
  return user || null;
}

// Check if current user has specific role
export async function hasRole(roles: string | string[]): Promise<boolean> {
  const user = await getCurrentUserExtended();
  if (!user) return false;

  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return allowedRoles.includes(user.role);
}

// Update user profile
export async function updateUserProfile(data: {
  username?: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
}) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const [updatedUser] = await db
    .update(users)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(users.id, session.user.id))
    .returning();

  return updatedUser;
}
