import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/lib/db";
import { users, accounts, sessions, verificationTokens } from "@/lib/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      account: accounts,
      session: sessions,
      verification: verificationTokens,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  // Map database fields to Better Auth user object
  user: {
    modelName: "user",
    fields: {
      email: "email",
      name: "displayName", // Map displayName to Better Auth's name field
      image: "avatar", // Map avatar to Better Auth's image field
      emailVerified: "emailVerified",
    },
    additionalFields: {
      username: {
        type: "string",
        required: true,
        unique: true,
        input: true,
      },
      displayName: {
        type: "string",
        required: false,
        input: true,
      },
      avatar: {
        type: "string",
        required: false,
        input: false,
      },
      bio: {
        type: "string",
        required: false,
        input: false,
      },
      totalVotes: {
        type: "number",
        required: false,
        input: false,
        defaultValue: 0,
      },
      totalWordCount: {
        type: "number",
        required: false,
        input: false,
        defaultValue: 0,
      },
      role: {
        type: "string",
        required: false,
        input: false,
        defaultValue: "user",
      },
      isActive: {
        type: "boolean",
        required: false,
        input: false,
        defaultValue: true,
      },
    },
  },
  advanced: {
    generateId: () => crypto.randomUUID(),
    cookiePrefix: "istilahkata",
    crossSubDomainCookies: {
      enabled: true,
      domain:
        process.env.NODE_ENV === "production" ? ".istilahkata.id" : "localhost",
    },
  },
  trustedOrigins: [
    "http://localhost:3200",
    "https://istilahkata.id",
    "https://dev.istilahkata.id",
  ],
});
