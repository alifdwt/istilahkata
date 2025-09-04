CREATE TYPE "public"."user_role" AS ENUM('user', 'moderator', 'admin');--> statement-breakpoint
CREATE TYPE "public"."vote_type" AS ENUM('up', 'down');--> statement-breakpoint
CREATE TYPE "public"."word_status" AS ENUM('pending', 'approved', 'rejected', 'needs-review');--> statement-breakpoint
CREATE TABLE "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"explanation_id" uuid,
	"user_id" uuid,
	"content" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "daily_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" timestamp NOT NULL,
	"total_words" integer DEFAULT 0,
	"total_explanations" integer DEFAULT 0,
	"total_users" integer DEFAULT 0,
	"total_votes" integer DEFAULT 0,
	"active_users" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "daily_metrics_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE "explanations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"word_id" uuid,
	"user_id" uuid,
	"content" text NOT NULL,
	"example" text,
	"votes" integer DEFAULT 0,
	"word_count" integer DEFAULT 0,
	"is_accepted" boolean DEFAULT false,
	"is_featured" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "generations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(20) NOT NULL,
	"name" varchar(50) NOT NULL,
	"short_name" varchar(20) NOT NULL,
	"description" text,
	"start_year" integer NOT NULL,
	"end_year" integer,
	"color_class" varchar(50) NOT NULL,
	"icon_class" varchar(50),
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "generations_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(20) NOT NULL,
	"name" varchar(50) NOT NULL,
	"native_name" varchar(50),
	"description" text,
	"color_class" varchar(50) NOT NULL,
	"flag" varchar(10),
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "languages_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "moderation_queue" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_type" varchar(50) NOT NULL,
	"content_id" uuid NOT NULL,
	"reported_by" uuid,
	"reason" text,
	"status" varchar(20) DEFAULT 'pending',
	"assigned_to" uuid,
	"review_notes" text,
	"created_at" timestamp DEFAULT now(),
	"reviewed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"display_name" varchar(100),
	"avatar" text,
	"bio" text,
	"total_votes" integer DEFAULT 0,
	"total_word_count" integer DEFAULT 0,
	"role" "user_role" DEFAULT 'user',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"explanation_id" uuid,
	"type" "vote_type" NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "word_generations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"word_id" uuid,
	"generation_id" uuid,
	"is_primary" boolean DEFAULT false,
	"start_year" integer,
	"confidence" real DEFAULT 0.5,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "word_languages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"word_id" uuid,
	"language_id" uuid,
	"is_primary" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "word_views" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"word_id" uuid,
	"user_id" uuid,
	"ip_address" varchar(45),
	"user_agent" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "words" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"term" varchar(100) NOT NULL,
	"slug" varchar(120) NOT NULL,
	"context" text,
	"requested_by" uuid,
	"total_views" integer DEFAULT 0,
	"total_explanations" integer DEFAULT 0,
	"total_votes" integer DEFAULT 0,
	"status" "word_status" DEFAULT 'pending',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "words_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_explanation_id_explanations_id_fk" FOREIGN KEY ("explanation_id") REFERENCES "public"."explanations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "explanations" ADD CONSTRAINT "explanations_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "explanations" ADD CONSTRAINT "explanations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "moderation_queue" ADD CONSTRAINT "moderation_queue_reported_by_users_id_fk" FOREIGN KEY ("reported_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "moderation_queue" ADD CONSTRAINT "moderation_queue_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_explanation_id_explanations_id_fk" FOREIGN KEY ("explanation_id") REFERENCES "public"."explanations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "word_generations" ADD CONSTRAINT "word_generations_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "word_generations" ADD CONSTRAINT "word_generations_generation_id_generations_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "word_languages" ADD CONSTRAINT "word_languages_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "word_languages" ADD CONSTRAINT "word_languages_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "word_views" ADD CONSTRAINT "word_views_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "word_views" ADD CONSTRAINT "word_views_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "words" ADD CONSTRAINT "words_requested_by_users_id_fk" FOREIGN KEY ("requested_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "comments_explanation_idx" ON "comments" USING btree ("explanation_id");--> statement-breakpoint
CREATE INDEX "comments_user_idx" ON "comments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "daily_metrics_date_idx" ON "daily_metrics" USING btree ("date");--> statement-breakpoint
CREATE INDEX "explanations_word_idx" ON "explanations" USING btree ("word_id");--> statement-breakpoint
CREATE INDEX "explanations_user_idx" ON "explanations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "explanations_votes_idx" ON "explanations" USING btree ("votes");--> statement-breakpoint
CREATE INDEX "explanations_accepted_idx" ON "explanations" USING btree ("is_accepted");--> statement-breakpoint
CREATE INDEX "generations_code_idx" ON "generations" USING btree ("code");--> statement-breakpoint
CREATE INDEX "generations_active_idx" ON "generations" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "generations_sort_idx" ON "generations" USING btree ("sort_order");--> statement-breakpoint
CREATE INDEX "languages_code_idx" ON "languages" USING btree ("code");--> statement-breakpoint
CREATE INDEX "languages_active_idx" ON "languages" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "languages_sort_idx" ON "languages" USING btree ("sort_order");--> statement-breakpoint
CREATE INDEX "moderation_queue_status_idx" ON "moderation_queue" USING btree ("status");--> statement-breakpoint
CREATE INDEX "moderation_queue_content_idx" ON "moderation_queue" USING btree ("content_type","content_id");--> statement-breakpoint
CREATE INDEX "users_username_idx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "votes_user_explanation_idx" ON "votes" USING btree ("user_id","explanation_id");--> statement-breakpoint
CREATE INDEX "votes_explanation_idx" ON "votes" USING btree ("explanation_id");--> statement-breakpoint
CREATE INDEX "word_generations_word_idx" ON "word_generations" USING btree ("word_id");--> statement-breakpoint
CREATE INDEX "word_generations_generation_idx" ON "word_generations" USING btree ("generation_id");--> statement-breakpoint
CREATE INDEX "word_generations_unique_idx" ON "word_generations" USING btree ("word_id","generation_id");--> statement-breakpoint
CREATE INDEX "word_languages_word_idx" ON "word_languages" USING btree ("word_id");--> statement-breakpoint
CREATE INDEX "word_languages_language_idx" ON "word_languages" USING btree ("language_id");--> statement-breakpoint
CREATE INDEX "word_languages_unique_idx" ON "word_languages" USING btree ("word_id","language_id");--> statement-breakpoint
CREATE INDEX "word_views_word_idx" ON "word_views" USING btree ("word_id");--> statement-breakpoint
CREATE INDEX "word_views_date_idx" ON "word_views" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "words_term_idx" ON "words" USING btree ("term");--> statement-breakpoint
CREATE INDEX "words_slug_idx" ON "words" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "words_status_idx" ON "words" USING btree ("status");--> statement-breakpoint
CREATE INDEX "words_views_idx" ON "words" USING btree ("total_views");