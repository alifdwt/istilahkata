import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env.mjs";

import * as schema from "./schema";

// For query purposes
const queryClient = postgres(env.DATABASE_URL);
export const db = drizzle(queryClient, { schema });

// Export types for use in app
export type DB = typeof db;
export * from "./schema";
