ALTER TABLE `routine_steps` ADD `execution` text DEFAULT 'straight' NOT NULL;
--> statement-breakpoint
ALTER TABLE `routine_steps` ADD `rounds` integer;
--> statement-breakpoint
ALTER TABLE `routine_steps` ADD `rest_seconds` integer;
--> statement-breakpoint
ALTER TABLE `step_exercises` ADD `prescription` text;
