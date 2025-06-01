CREATE TABLE `retailer` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category_id` integer,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `products` ADD `retailer_id` integer REFERENCES retailer(id);