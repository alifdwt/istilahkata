import { defineConfig } from "drizzle-kit";

import { env } from "./env.mjs";

// Muat environment variables dari .env.local

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
