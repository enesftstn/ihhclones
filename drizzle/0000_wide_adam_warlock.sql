-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `admin_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`role` varchar(50) NOT NULL DEFAULT 'admin',
	`full_name` varchar(100),
	`is_active` tinyint(1) DEFAULT 1,
	`last_login` timestamp,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admin_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`action` varchar(100) NOT NULL,
	`entity_type` varchar(50),
	`entity_id` int,
	`changes` json,
	`ip_address` varchar(45),
	`user_agent` text,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title_en` varchar(255) NOT NULL,
	`title_tr` varchar(255) NOT NULL,
	`content_en` longtext,
	`content_tr` longtext,
	`excerpt_en` text,
	`excerpt_tr` text,
	`featured_image` text,
	`author` varchar(100),
	`category` varchar(100),
	`tags` text,
	`view_count` int DEFAULT 0,
	`is_published` tinyint(1) DEFAULT 0,
	`published_at` timestamp,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `campaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category_id` int,
	`title` varchar(500) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`subtitle` varchar(500),
	`description` text,
	`image_url` text,
	`cta_label` varchar(100) DEFAULT 'Donate',
	`cta_link` varchar(500),
	`goal_amount` decimal(12,2),
	`raised_amount` decimal(12,2) DEFAULT '0.00',
	`currency` varchar(10) DEFAULT 'USD',
	`is_featured` tinyint(1) DEFAULT 0,
	`is_active` tinyint(1) DEFAULT 1,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `campaigns_id` PRIMARY KEY(`id`),
	CONSTRAINT `slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name_en` varchar(255) NOT NULL,
	`name_tr` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description_en` text,
	`description_tr` text,
	`icon` varchar(100),
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contact_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(50),
	`subject` varchar(500),
	`message` text NOT NULL,
	`status` varchar(50) DEFAULT 'new',
	`responded_at` timestamp,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `donations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`donor_email` varchar(255) NOT NULL,
	`donor_name` varchar(255),
	`amount` decimal(10,2) NOT NULL,
	`currency` varchar(3) DEFAULT 'USD',
	`campaign_id` int,
	`payment_provider` varchar(50) DEFAULT 'stripe',
	`payment_id` varchar(255),
	`payment_status` varchar(50) DEFAULT 'pending',
	`is_recurring` tinyint(1) DEFAULT 0,
	`subscription_id` varchar(255),
	`message` text,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `donations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `donor_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`full_name` varchar(255),
	`phone` varchar(50),
	`country` varchar(100),
	`address` text,
	`profile_image` text,
	`total_donated` decimal(10,2) DEFAULT '0.00',
	`donation_count` int DEFAULT 0,
	`monthly_donations` int DEFAULT 0,
	`certificates_issued` int DEFAULT 0,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `donor_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title_en` varchar(255) NOT NULL,
	`title_tr` varchar(255) NOT NULL,
	`description_en` text,
	`description_tr` text,
	`event_type` varchar(50),
	`location` varchar(255),
	`event_date` datetime NOT NULL,
	`end_date` datetime,
	`image_url` text,
	`registration_url` varchar(500),
	`max_attendees` int,
	`current_attendees` int DEFAULT 0,
	`is_active` tinyint(1) DEFAULT 1,
	`is_featured` tinyint(1) DEFAULT 0,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `impact_stories` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name_en` varchar(255) NOT NULL,
	`name_tr` varchar(255) NOT NULL,
	`story_en` text,
	`story_tr` text,
	`location_en` varchar(255),
	`location_tr` varchar(255),
	`image_url` text,
	`year` int,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `impact_stories_id` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`file_url` text NOT NULL,
	`file_type` varchar(50),
	`file_size` int,
	`category` varchar(100),
	`description` text,
	`uploaded_by` int,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_gallery` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`media_type` varchar(50),
	`media_url` text NOT NULL,
	`thumbnail_url` text,
	`category` varchar(100),
	`tags` text,
	`location` varchar(255),
	`upload_date` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `media_gallery_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category_id` int,
	`author_id` int,
	`title` varchar(500) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text,
	`content` longtext,
	`image_url` text,
	`is_featured` tinyint(1) DEFAULT 0,
	`is_published` tinyint(1) DEFAULT 0,
	`published_at` timestamp,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `news_id` PRIMARY KEY(`id`),
	CONSTRAINT `slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `newsletter_subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`name` varchar(255),
	`status` varchar(50) DEFAULT 'subscribed',
	`subscribed_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`unsubscribed_at` timestamp,
	CONSTRAINT `newsletter_subscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category_id` int,
	`title_en` varchar(500) NOT NULL,
	`title_tr` varchar(500) NOT NULL,
	`description_en` text,
	`description_tr` text,
	`location_en` varchar(255),
	`location_tr` varchar(255),
	`country` varchar(100),
	`region` varchar(100),
	`image_url` text,
	`goal_amount` decimal(12,2),
	`funded_amount` decimal(12,2) DEFAULT '0.00',
	`beneficiaries` int,
	`start_date` date,
	`end_date` date,
	`status` varchar(50) DEFAULT 'active',
	`is_featured` tinyint(1) DEFAULT 0,
	`slug` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `regions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name_en` varchar(255) NOT NULL,
	`name_tr` varchar(255) NOT NULL,
	`country` varchar(100) NOT NULL,
	`continent` varchar(100),
	`description_en` text,
	`description_tr` text,
	`active_projects` int DEFAULT 0,
	`beneficiaries` int DEFAULT 0,
	`image_url` text,
	`slug` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `regions_id` PRIMARY KEY(`id`),
	CONSTRAINT `slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`token` varchar(500) NOT NULL,
	`ip_address` varchar(45),
	`user_agent` text,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `token` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `stories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title_en` varchar(500) NOT NULL,
	`title_tr` varchar(500) NOT NULL,
	`content_en` longtext,
	`content_tr` longtext,
	`excerpt_en` text,
	`excerpt_tr` text,
	`image_url` text,
	`location` varchar(255),
	`person_name` varchar(255),
	`is_featured` tinyint(1) DEFAULT 0,
	`is_published` tinyint(1) DEFAULT 0,
	`published_at` timestamp,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`full_name` varchar(255),
	`role` enum('admin','editor','viewer') NOT NULL DEFAULT 'viewer',
	`is_active` tinyint(1) DEFAULT 1,
	`email_verified_at` datetime,
	`last_login` datetime,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `volunteers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(50),
	`country` varchar(100),
	`city` varchar(100),
	`skills` text,
	`availability` varchar(100),
	`message` text,
	`status` varchar(50) DEFAULT 'pending',
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `volunteers_id` PRIMARY KEY(`id`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `admin_users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `campaigns` ADD CONSTRAINT `campaigns_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `donations` ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `admin_users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_admin_email` ON `admin_users` (`email`);--> statement-breakpoint
CREATE INDEX `idx_audit_action` ON `audit_logs` (`action`);--> statement-breakpoint
CREATE INDEX `idx_audit_created` ON `audit_logs` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_audit_user` ON `audit_logs` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_blog_published` ON `blog_posts` (`is_published`,`published_at`);--> statement-breakpoint
CREATE INDEX `idx_blog_slug` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_campaigns_active` ON `campaigns` (`is_active`);--> statement-breakpoint
CREATE INDEX `idx_campaigns_category` ON `campaigns` (`category_id`);--> statement-breakpoint
CREATE INDEX `idx_campaigns_featured` ON `campaigns` (`is_featured`);--> statement-breakpoint
CREATE INDEX `idx_campaigns_slug` ON `campaigns` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_contact_status` ON `contact_submissions` (`status`);--> statement-breakpoint
CREATE INDEX `idx_donations_campaign` ON `donations` (`campaign_id`);--> statement-breakpoint
CREATE INDEX `idx_donations_email` ON `donations` (`donor_email`);--> statement-breakpoint
CREATE INDEX `idx_donations_status` ON `donations` (`payment_status`);--> statement-breakpoint
CREATE INDEX `idx_donor_email` ON `donor_profiles` (`email`);--> statement-breakpoint
CREATE INDEX `idx_events_active` ON `events` (`is_active`);--> statement-breakpoint
CREATE INDEX `idx_events_date` ON `events` (`event_date`);--> statement-breakpoint
CREATE INDEX `idx_media_category` ON `media` (`category`);--> statement-breakpoint
CREATE INDEX `idx_media_type` ON `media` (`file_type`);--> statement-breakpoint
CREATE INDEX `idx_news_featured` ON `news` (`is_featured`);--> statement-breakpoint
CREATE INDEX `idx_news_published` ON `news` (`is_published`,`published_at`);--> statement-breakpoint
CREATE INDEX `idx_news_slug` ON `news` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_newsletter_email` ON `newsletter_subscribers` (`email`);--> statement-breakpoint
CREATE INDEX `idx_newsletter_status` ON `newsletter_subscribers` (`status`);--> statement-breakpoint
CREATE INDEX `category_id` ON `projects` (`category_id`);--> statement-breakpoint
CREATE INDEX `idx_projects_country` ON `projects` (`country`);--> statement-breakpoint
CREATE INDEX `idx_projects_featured` ON `projects` (`is_featured`);--> statement-breakpoint
CREATE INDEX `idx_projects_status` ON `projects` (`status`);--> statement-breakpoint
CREATE INDEX `idx_sessions_expires` ON `sessions` (`expires_at`);--> statement-breakpoint
CREATE INDEX `idx_sessions_token` ON `sessions` (`token`);--> statement-breakpoint
CREATE INDEX `user_id` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_stories_featured` ON `stories` (`is_featured`);--> statement-breakpoint
CREATE INDEX `idx_stories_published` ON `stories` (`is_published`);--> statement-breakpoint
CREATE INDEX `idx_volunteers_email` ON `volunteers` (`email`);--> statement-breakpoint
CREATE INDEX `idx_volunteers_status` ON `volunteers` (`status`);
*/