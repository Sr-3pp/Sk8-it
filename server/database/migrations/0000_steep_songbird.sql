CREATE TABLE `boards` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer,
	`description` text,
	`size` numeric,
	`shape` text,
	`stock` integer,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `clothes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer,
	`description` text,
	`size` numeric,
	`color` text,
	`stock` integer,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `contests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`banner` text DEFAULT '/img/default.jpg',
	`date` text NOT NULL,
	`cost` integer NOT NULL,
	`prizes` text NOT NULL,
	`podium` text,
	`description` text NOT NULL,
	`address` text NOT NULL,
	`latlng` text NOT NULL,
	`sponsors` text NOT NULL,
	`status` integer NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `outlets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`manager` text NOT NULL,
	`address` text NOT NULL,
	`phone` text,
	`facebook` text,
	`instagram` text,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`cost` integer DEFAULT 0,
	`price` integer NOT NULL,
	`thumbs` text,
	`category_id` integer,
	`subcategory_id` integer,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `participants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sku` text NOT NULL,
	`name` text NOT NULL,
	`sponsors` text NOT NULL,
	`stance` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`outlet_id` integer,
	`shipping_id` integer,
	`total` text NOT NULL,
	`products` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`outlet_id`) REFERENCES `outlets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`shipping_id`) REFERENCES `shippings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shippings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`address` text NOT NULL,
	`name` text NOT NULL,
	`phone` text,
	`email` text,
	`status` integer DEFAULT 0 NOT NULL,
	`total` integer DEFAULT 0 NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `skate-contests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contest_id` integer,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`contest_id`) REFERENCES `contests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `skate-contest-matches` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`skateContest_id` integer,
	`a_participant_id` integer,
	`b_participant_id` integer,
	`a_participant_tricks` text NOT NULL,
	`b_participant_tricks` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`skateContest_id`) REFERENCES `skate-contests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`a_participant_id`) REFERENCES `participants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`b_participant_id`) REFERENCES `participants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `line-contests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contest_id` integer,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`contest_id`) REFERENCES `contests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `line-contest-scores` (
	`line_contest_id` integer,
	`participant_id` integer,
	`score_a` real DEFAULT 0,
	`score_b` real DEFAULT 0,
	`score_c` real DEFAULT 0,
	`score_d` real DEFAULT 0,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`line_contest_id`) REFERENCES `line-contests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`participant_id`) REFERENCES `participants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `best-trick-contests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contest_id` integer,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`contest_id`) REFERENCES `contests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `best-trick-contest-scores` (
	`best_trick_contest_id` integer,
	`participant_id` integer,
	`tricks` text,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`best_trick_contest_id`) REFERENCES `best-trick-contests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`participant_id`) REFERENCES `participants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `contest-participants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contestId` integer NOT NULL,
	`participantId` integer NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`contestId`) REFERENCES `contests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`participantId`) REFERENCES `participants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `subcategories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer,
	`name` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`skater_slug` integer,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);