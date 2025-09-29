// lib/db/schema.ts
import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  uuid,
  varchar,
  index,
  real,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enum definitions
export const userRoleEnum = pgEnum("user_role", ["user", "moderator", "admin"]);
export const wordStatusEnum = pgEnum("word_status", [
  "pending",
  "approved",
  "rejected",
  "needs-review",
]);
export const voteTypeEnum = pgEnum("vote_type", ["up", "down"]);

// Enhanced generations table with age ranges
export const generations = pgTable(
  "generations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    code: varchar("code", { length: 20 }).notNull().unique(),
    name: varchar("name", { length: 50 }).notNull(),
    shortName: varchar("short_name", { length: 20 }).notNull(),
    description: text("description"),

    // Age/year ranges
    startYear: integer("start_year").notNull(),
    endYear: integer("end_year"), // nullable for ongoing generations

    // Display settings
    colorClass: varchar("color_class", { length: 50 }).notNull(),
    iconClass: varchar("icon_class", { length: 50 }),
    sortOrder: integer("sort_order").default(0),

    // Metadata
    totalUsers: integer("total_users").default(0), // Computed field
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    codeIdx: index("generations_code_idx").on(table.code),
    activeIdx: index("generations_active_idx").on(table.isActive),
    sortIdx: index("generations_sort_idx").on(table.sortOrder),
    yearRangeIdx: index("generations_year_range_idx").on(
      table.startYear,
      table.endYear
    ),
  })
);

export const languages = pgTable(
  "languages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    code: varchar("code", { length: 10 }).notNull().unique(), // id, en, jv, etc.
    name: varchar("name", { length: 100 }).notNull(),
    nativeName: varchar("native_name", { length: 50 }),
    description: text("description"),
    colorClass: varchar("color_class", { length: 50 }).notNull(),
    flag: varchar("flag", { length: 10 }), // Emoji flag: 🇮🇩, 🇺🇸
    sortOrder: integer("sort_order").default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    codeIdx: index("languages_code_idx").on(table.code),
    activeIdx: index("languages_active_idx").on(table.isActive),
    sortIdx: index("languages_sort_idx").on(table.sortOrder),
  })
);

// Core Tables - Updated users table to work with Better Auth
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    displayName: varchar("display_name", { length: 100 }),
    avatar: text("avatar"),
    bio: text("bio"),

    // NEW: Generation fields
    birthYear: integer("birth_year"), // User's birth year
    generationId: uuid("generation_id").references(() => generations.id), // Computed generation
    isGenerationPublic: boolean("is_generation_public").default(true), // Privacy setting
    generationUpdatedAt: timestamp("generation_updated_at"), // When generation was last computed

    // Existing fields
    totalVotes: integer("total_votes").default(0),
    totalWordCount: integer("total_word_count").default(0),
    role: userRoleEnum("role").default("user"),
    isActive: boolean("is_active").default(true),

    // Auth fields
    emailVerified: boolean("email_verified").default(false),
    password: text("password"), // For email/password auth

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    usernameIdx: index("users_username_idx").on(table.username),
    emailIdx: index("users_email_idx").on(table.email),
    generationIdx: index("users_generation_idx").on(table.generationId), // NEW index
    birthYearIdx: index("users_birth_year_idx").on(table.birthYear), // NEW index
  })
);

// User generation preferences table
export const userGenerationPreferences = pgTable(
  "user_generation_preferences",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    // Privacy settings
    showGenerationOnProfile: boolean("show_generation_on_profile").default(
      true
    ),
    showGenerationOnContributions: boolean(
      "show_generation_on_contributions"
    ).default(true),
    allowGenerationFiltering: boolean("allow_generation_filtering").default(
      true
    ),

    // Notification preferences
    notifyGenerationTrends: boolean("notify_generation_trends").default(false),
    notifyGenerationMilestones: boolean("notify_generation_milestones").default(
      false
    ),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    userIdx: index("user_generation_preferences_user_idx").on(table.userId),
  })
);

// User generation history (for analytics)
export const userGenerationHistory = pgTable(
  "user_generation_history",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    generationId: uuid("generation_id")
      .notNull()
      .references(() => generations.id),

    // Context
    changeReason: varchar("change_reason", { length: 50 }), // 'initial_signup', 'birth_year_update', 'manual_correction'
    previousGenerationId: uuid("previous_generation_id").references(
      () => generations.id
    ),
    changedBy: uuid("changed_by").references(() => users.id), // Admin who made change

    // Metadata
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    userIdx: index("user_generation_history_user_idx").on(table.userId),
    generationIdx: index("user_generation_history_generation_idx").on(
      table.generationId
    ),
    createdAtIdx: index("user_generation_history_created_at_idx").on(
      table.createdAt
    ),
  })
);

// Better Auth additional tables
export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  expiresAt: timestamp("expires_at"),
  password: text("password"), // For email/password auth
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const verificationTokens = pgTable("verification_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Rest of the existing schema...
export const words = pgTable(
  "words",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    term: varchar("term", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull().unique(),
    context: text("context"), // Contoh kalimat dimana kata ini digunakan
    requestedBy: uuid("requested_by").references(() => users.id),
    totalViews: integer("total_views").default(0),
    totalExplanations: integer("total_explanations").default(0),
    totalVotes: integer("total_votes").default(0),
    status: wordStatusEnum("status").default("pending"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    termIdx: index("words_term_idx").on(table.term),
    slugIdx: index("words_slug_idx").on(table.slug),
    statusIdx: index("words_status_idx").on(table.status),
    viewsIdx: index("words_views_idx").on(table.totalViews),
  })
);

export const explanations = pgTable(
  "explanations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    wordId: uuid("word_id").references(() => words.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id),
    content: text("content").notNull(),
    example: text("example"),
    votes: integer("votes").default(0),
    wordCount: integer("word_count").default(0),
    isAccepted: boolean("is_accepted").default(false),
    isFeatured: boolean("is_featured").default(false),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    wordIdx: index("explanations_word_idx").on(table.wordId),
    userIdx: index("explanations_user_idx").on(table.userId),
    votesIdx: index("explanations_votes_idx").on(table.votes),
    acceptedIdx: index("explanations_accepted_idx").on(table.isAccepted),
  })
);

export const votes = pgTable(
  "votes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id),
    explanationId: uuid("explanation_id").references(() => explanations.id, {
      onDelete: "cascade",
    }),
    type: voteTypeEnum("type").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    userExplanationIdx: index("votes_user_explanation_idx").on(
      table.userId,
      table.explanationId
    ),
    explanationIdx: index("votes_explanation_idx").on(table.explanationId),
  })
);

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    explanationId: uuid("explanation_id").references(() => explanations.id, {
      onDelete: "cascade",
    }),
    userId: uuid("user_id").references(() => users.id),
    content: text("content").notNull(),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    explanationIdx: index("comments_explanation_idx").on(table.explanationId),
    userIdx: index("comments_user_idx").on(table.userId),
  })
);

// Many-to-Many Relationship Tables
export const wordGenerations = pgTable(
  "word_generations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    wordId: uuid("word_id").references(() => words.id, { onDelete: "cascade" }),
    generationId: uuid("generation_id").references(() => generations.id, {
      onDelete: "cascade",
    }),
    isPrimary: boolean("is_primary").default(false),
    startYear: integer("start_year"),
    confidence: real("confidence").default(0.5), // 0-1 scale
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    wordIdx: index("word_generations_word_idx").on(table.wordId),
    generationIdx: index("word_generations_generation_idx").on(
      table.generationId
    ),
    uniqueWordGeneration: index("word_generations_unique_idx").on(
      table.wordId,
      table.generationId
    ),
  })
);

export const wordLanguages = pgTable(
  "word_languages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    wordId: uuid("word_id").references(() => words.id, { onDelete: "cascade" }),
    languageId: uuid("language_id").references(() => languages.id, {
      onDelete: "cascade",
    }),
    isPrimary: boolean("is_primary").default(false),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    wordIdx: index("word_languages_word_idx").on(table.wordId),
    languageIdx: index("word_languages_language_idx").on(table.languageId),
    uniqueWordLanguage: index("word_languages_unique_idx").on(
      table.wordId,
      table.languageId
    ),
  })
);

// Analytics Tables
export const dailyMetrics = pgTable(
  "daily_metrics",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    date: timestamp("date").notNull().unique(),
    totalWords: integer("total_words").default(0),
    totalExplanations: integer("total_explanations").default(0),
    totalUsers: integer("total_users").default(0),
    totalVotes: integer("total_votes").default(0),
    activeUsers: integer("active_users").default(0),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    dateIdx: index("daily_metrics_date_idx").on(table.date),
  })
);

export const wordViews = pgTable(
  "word_views",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    wordId: uuid("word_id").references(() => words.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id), // nullable untuk anonymous views
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    wordIdx: index("word_views_word_idx").on(table.wordId),
    dateIdx: index("word_views_date_idx").on(table.createdAt),
  })
);

// Admin Tables
export const moderationQueue = pgTable(
  "moderation_queue",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    contentType: varchar("content_type", { length: 50 }).notNull(), // 'word', 'explanation', 'comment'
    contentId: uuid("content_id").notNull(),
    reportedBy: uuid("reported_by").references(() => users.id),
    reason: text("reason"),
    status: varchar("status", { length: 20 }).default("pending"), // 'pending', 'reviewed', 'resolved'
    assignedTo: uuid("assigned_to").references(() => users.id), // nullable
    reviewNotes: text("review_notes"),
    createdAt: timestamp("created_at").defaultNow(),
    reviewedAt: timestamp("reviewed_at"),
  },
  (table) => ({
    statusIdx: index("moderation_queue_status_idx").on(table.status),
    contentIdx: index("moderation_queue_content_idx").on(
      table.contentType,
      table.contentId
    ),
  })
);

// Relations
export const generationsRelations = relations(generations, ({ many }) => ({
  wordGenerations: many(wordGenerations),
}));

export const languagesRelations = relations(languages, ({ many }) => ({
  wordLanguages: many(wordLanguages),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const wordsRelations = relations(words, ({ one, many }) => ({
  requestedBy: one(users, {
    fields: [words.requestedBy],
    references: [users.id],
  }),
  explanations: many(explanations),
  generations: many(wordGenerations),
  languages: many(wordLanguages),
  wordViews: many(wordViews),
}));

export const explanationsRelations = relations(
  explanations,
  ({ one, many }) => ({
    word: one(words, {
      fields: [explanations.wordId],
      references: [words.id],
    }),
    user: one(users, {
      fields: [explanations.userId],
      references: [users.id],
    }),
    votes: many(votes),
    comments: many(comments),
  })
);

export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, {
    fields: [votes.userId],
    references: [users.id],
  }),
  explanation: one(explanations, {
    fields: [votes.explanationId],
    references: [explanations.id],
  }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  explanation: one(explanations, {
    fields: [comments.explanationId],
    references: [explanations.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));

export const wordGenerationsRelations = relations(
  wordGenerations,
  ({ one }) => ({
    word: one(words, {
      fields: [wordGenerations.wordId],
      references: [words.id],
    }),
    generation: one(generations, {
      fields: [wordGenerations.generationId],
      references: [generations.id],
    }),
  })
);

export const wordLanguagesRelations = relations(wordLanguages, ({ one }) => ({
  word: one(words, {
    fields: [wordLanguages.wordId],
    references: [words.id],
  }),
  language: one(languages, {
    fields: [wordLanguages.languageId],
    references: [languages.id],
  }),
}));

export const wordViewsRelations = relations(wordViews, ({ one }) => ({
  word: one(words, {
    fields: [wordViews.wordId],
    references: [words.id],
  }),
  user: one(users, {
    fields: [wordViews.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  // Auth relations
  accounts: many(accounts),
  sessions: many(sessions),
  // App relations
  requestedWords: many(words),
  generation: one(generations, {
    fields: [users.generationId],
    references: [generations.id],
  }),
  generationPreferences: one(userGenerationPreferences, {
    fields: [users.id],
    references: [userGenerationPreferences.userId],
  }),
  generationHistory: many(userGenerationHistory),
  words: many(words),
  explanations: many(explanations),
  votes: many(votes),
  comments: many(comments),
}));

export const userGenerationPreferencesRelations = relations(
  userGenerationPreferences,
  ({ one }) => ({
    user: one(users, {
      fields: [userGenerationPreferences.userId],
      references: [users.id],
    }),
  })
);

export const userGenerationHistoryRelations = relations(
  userGenerationHistory,
  ({ one }) => ({
    user: one(users, {
      fields: [userGenerationHistory.userId],
      references: [users.id],
    }),
    generation: one(generations, {
      fields: [userGenerationHistory.generationId],
      references: [generations.id],
    }),
    previousGeneration: one(generations, {
      fields: [userGenerationHistory.previousGenerationId],
      references: [generations.id],
    }),
    changedByUser: one(users, {
      fields: [userGenerationHistory.changedBy],
      references: [users.id],
    }),
  })
);
