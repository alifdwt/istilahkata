// lib/auth/server.ts
import { headers } from "next/headers";
import { cache } from "react";

import { auth } from "./config";

// Type definitions based on Better Auth actual response
type AuthSession = {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
    // Custom fields from our schema - allowing null values
    username?: string | null;
    displayName?: string | null;
    avatar?: string | null;
    bio?: string | null;
    totalVotes?: number | null;
    totalWordCount?: number | null;
    role?: string | null;
    isActive?: boolean | null;
  };
} | null;

// Cache the session for the duration of the request
export const getSession = cache(async (): Promise<AuthSession> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  return session?.user ?? null;
});

export const requireAuth = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
};

export const requireRole = async (roles: string | string[]) => {
  const session = await requireAuth();
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  // Use nullish coalescing to default to "user" if role is null/undefined
  if (!allowedRoles.includes(session.user.role ?? "user")) {
    throw new Error("Insufficient permissions");
  }

  return session;
};

// Helper to check if user is admin
export const isAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user?.role === "admin";
};

// Helper to check if user is moderator or admin
export const isModerator = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user?.role === "moderator" || user?.role === "admin";
};
