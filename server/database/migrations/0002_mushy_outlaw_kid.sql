PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_blog_posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`banner` text NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`author_id` integer,
	`tags` text DEFAULT '[]',
	`content` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_blog_posts`("id", "banner", "title", "slug", "author_id", "tags", "content", "timestamp") SELECT "id", "banner", "title", "slug", "author_id", "tags", "content", "timestamp" FROM `blog_posts`;--> statement-breakpoint
DROP TABLE `blog_posts`;--> statement-breakpoint
ALTER TABLE `__new_blog_posts` RENAME TO `blog_posts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_retailer` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category_id` integer,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_retailer`("id", "name", "category_id", "timestamp") SELECT "id", "name", "category_id", "timestamp" FROM `retailer`;--> statement-breakpoint
DROP TABLE `retailer`;--> statement-breakpoint
ALTER TABLE `__new_retailer` RENAME TO `retailer`;