CREATE TABLE "user_generation_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"generation_id" uuid NOT NULL,
	"change_reason" varchar(50),
	"previous_generation_id" uuid,
	"changed_by" uuid,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_generation_preferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"show_generation_on_profile" boolean DEFAULT true,
	"show_generation_on_contributions" boolean DEFAULT true,
	"allow_generation_filtering" boolean DEFAULT true,
	"notify_generation_trends" boolean DEFAULT false,
	"notify_generation_milestones" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "generations" ADD COLUMN "total_users" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "birth_year" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "generation_id" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_generation_public" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "generation_updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "user_generation_history" ADD CONSTRAINT "user_generation_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_generation_history" ADD CONSTRAINT "user_generation_history_generation_id_generations_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_generation_history" ADD CONSTRAINT "user_generation_history_previous_generation_id_generations_id_fk" FOREIGN KEY ("previous_generation_id") REFERENCES "public"."generations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_generation_history" ADD CONSTRAINT "user_generation_history_changed_by_users_id_fk" FOREIGN KEY ("changed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_generation_preferences" ADD CONSTRAINT "user_generation_preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_generation_history_user_idx" ON "user_generation_history" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_generation_history_generation_idx" ON "user_generation_history" USING btree ("generation_id");--> statement-breakpoint
CREATE INDEX "user_generation_history_created_at_idx" ON "user_generation_history" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "user_generation_preferences_user_idx" ON "user_generation_preferences" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_generation_id_generations_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "generations_year_range_idx" ON "generations" USING btree ("start_year","end_year");--> statement-breakpoint
CREATE INDEX "users_generation_idx" ON "users" USING btree ("generation_id");--> statement-breakpoint
CREATE INDEX "users_birth_year_idx" ON "users" USING btree ("birth_year");