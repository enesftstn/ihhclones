import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, primaryKey, unique, int, varchar, timestamp, foreignKey, json, text, longtext, decimal, datetime, serial, date, mysqlEnum } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const adminUsers = mysqlTable("admin_users", {
	id: int().autoincrement().notNull(),
	email: varchar({ length: 255 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	role: varchar({ length: 50 }).default('admin').notNull(),
	fullName: varchar("full_name", { length: 100 }),
	isActive: tinyint("is_active").default(1),
	lastLogin: timestamp("last_login", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("idx_admin_email").on(table.email),
	primaryKey({ columns: [table.id], name: "admin_users_id"}),
	unique("email").on(table.email),
]);

export const auditLogs = mysqlTable("audit_logs", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").references(() => adminUsers.id, { onDelete: "set null" } ),
	action: varchar({ length: 100 }).notNull(),
	entityType: varchar("entity_type", { length: 50 }),
	entityId: int("entity_id"),
	changes: json(),
	ipAddress: varchar("ip_address", { length: 45 }),
	userAgent: text("user_agent"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("idx_audit_action").on(table.action),
	index("idx_audit_created").on(table.createdAt),
	index("idx_audit_user").on(table.userId),
	primaryKey({ columns: [table.id], name: "audit_logs_id"}),
]);

export const blogPosts = mysqlTable("blog_posts", {
	id: int().autoincrement().notNull(),
	slug: varchar({ length: 255 }).notNull(),
	titleEn: varchar("title_en", { length: 255 }).notNull(),
	titleTr: varchar("title_tr", { length: 255 }).notNull(),
	contentEn: longtext("content_en"),
	contentTr: longtext("content_tr"),
	excerptEn: text("excerpt_en"),
	excerptTr: text("excerpt_tr"),
	featuredImage: text("featured_image"),
	author: varchar({ length: 100 }),
	category: varchar({ length: 100 }),
	tags: text(),
	viewCount: int("view_count").default(0),
	isPublished: tinyint("is_published").default(0),
	publishedAt: timestamp("published_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("idx_blog_published").on(table.isPublished, table.publishedAt),
	index("idx_blog_slug").on(table.slug),
	primaryKey({ columns: [table.id], name: "blog_posts_id"}),
	unique("slug").on(table.slug),
]);

export const campaigns = mysqlTable("campaigns", {
	id: int().autoincrement().notNull(),
	categoryId: int("category_id").references(() => categories.id, { onDelete: "set null" } ),
	title: varchar({ length: 500 }).notNull(),
	slug: varchar({ length: 255 }).notNull(),
	subtitle: varchar({ length: 500 }),
	description: text(),
	imageUrl: text("image_url"),
	ctaLabel: varchar("cta_label", { length: 100 }).default('Donate'),
	ctaLink: varchar("cta_link", { length: 500 }),
	goalAmount: decimal("goal_amount", { precision: 12, scale: 2 }),
	raisedAmount: decimal("raised_amount", { precision: 12, scale: 2 }).default('0.00'),
	currency: varchar({ length: 10 }).default('USD'),
	isFeatured: tinyint("is_featured").default(0),
	isActive: tinyint("is_active").default(1),
	sortOrder: int("sort_order").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("idx_campaigns_active").on(table.isActive),
	index("idx_campaigns_category").on(table.categoryId),
	index("idx_campaigns_featured").on(table.isFeatured),
	index("idx_campaigns_slug").on(table.slug),
	primaryKey({ columns: [table.id], name: "campaigns_id"}),
	unique("slug").on(table.slug),
]);

export const categories = mysqlTable("categories", {
	id: int().autoincrement().notNull(),
	nameEn: varchar("name_en", { length: 255 }).notNull(),
	nameTr: varchar("name_tr", { length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull(),
	descriptionEn: text("description_en"),
	descriptionTr: text("description_tr"),
	icon: varchar({ length: 100 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "categories_id"}),
	unique("slug").on(table.slug),
]);

export const contactSubmissions = mysqlTable("contact_submissions", {
	id: int().autoincrement().notNull(),
	fullName: varchar("full_name", { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 50 }),
	subject: varchar({ length: 500 }),
	message: text().notNull(),
	status: varchar({ length: 50 }).default('new'),
	respondedAt: timestamp("responded_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("idx_contact_status").on(table.status),
	primaryKey({ columns: [table.id], name: "contact_submissions_id"}),
]);

export const donations = mysqlTable("donations", {
	id: int().autoincrement().notNull(),
	donorEmail: varchar("donor_email", { length: 255 }).notNull(),
	donorName: varchar("donor_name", { length: 255 }),
	amount: decimal({ precision: 10, scale: 2 }).notNull(),
	currency: varchar({ length: 3 }).default('USD'),
	campaignId: int("campaign_id").references(() => campaigns.id, { onDelete: "set null" } ),
	paymentProvider: varchar("payment_provider", { length: 50 }).default('stripe'),
	paymentId: varchar("payment_id", { length: 255 }),
	paymentStatus: varchar("payment_status", { length: 50 }).default('pending'),
	isRecurring: tinyint("is_recurring").default(0),
	subscriptionId: varchar("subscription_id", { length: 255 }),
	message: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("idx_donations_campaign").on(table.campaignId),
	index("idx_donations_email").on(table.donorEmail),
	index("idx_donations_status").on(table.paymentStatus),
	primaryKey({ columns: [table.id], name: "donations_id"}),
]);

export const donorProfiles = mysqlTable("donor_profiles", {
	id: int().autoincrement().notNull(),
	email: varchar({ length: 255 }).notNull(),
	fullName: varchar("full_name", { length: 255 }),
	phone: varchar({ length: 50 }),
	country: varchar({ length: 100 }),
	address: text(),
	profileImage: text("profile_image"),
	totalDonated: decimal("total_donated", { precision: 10, scale: 2 }).default('0.00'),
	donationCount: int("donation_count").default(0),
	monthlyDonations: int("monthly_donations").default(0),
	certificatesIssued: int("certificates_issued").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("idx_donor_email").on(table.email),
	primaryKey({ columns: [table.id], name: "donor_profiles_id"}),
	unique("email").on(table.email),
]);

export const events = mysqlTable("events", {
	id: int().autoincrement().notNull(),
	titleEn: varchar("title_en", { length: 255 }).notNull(),
	titleTr: varchar("title_tr", { length: 255 }).notNull(),
	descriptionEn: text("description_en"),
	descriptionTr: text("description_tr"),
	eventType: varchar("event_type", { length: 50 }),
	location: varchar({ length: 255 }),
	eventDate: datetime("event_date", { mode: 'string'}).notNull(),
	endDate: datetime("end_date", { mode: 'string'}),
	imageUrl: text("image_url"),
	registrationUrl: varchar("registration_url", { length: 500 }),
	maxAttendees: int("max_attendees"),
	currentAttendees: int("current_attendees").default(0),
	isActive: tinyint("is_active").default(1),
	isFeatured: tinyint("is_featured").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("idx_events_active").on(table.isActive),
	index("idx_events_date").on(table.eventDate),
	primaryKey({ columns: [table.id], name: "events_id"}),
]);

export const impactStories = mysqlTable("impact_stories", {
	id: serial().notNull(),
	nameEn: varchar("name_en", { length: 255 }).notNull(),
	nameTr: varchar("name_tr", { length: 255 }).notNull(),
	storyEn: text("story_en"),
	storyTr: text("story_tr"),
	locationEn: varchar("location_en", { length: 255 }),
	locationTr: varchar("location_tr", { length: 255 }),
	imageUrl: text("image_url"),
	year: int(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "impact_stories_id"}),
	unique("id").on(table.id),
]);

export const media = mysqlTable("media", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	fileUrl: text("file_url").notNull(),
	fileType: varchar("file_type", { length: 50 }),
	fileSize: int("file_size"),
	category: varchar({ length: 100 }),
	description: text(),
	uploadedBy: int("uploaded_by"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("idx_media_category").on(table.category),
	index("idx_media_type").on(table.fileType),
	primaryKey({ columns: [table.id], name: "media_id"}),
]);

export const mediaGallery = mysqlTable("media_gallery", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text(),
	mediaType: varchar("media_type", { length: 50 }),
	mediaUrl: text("media_url").notNull(),
	thumbnailUrl: text("thumbnail_url"),
	category: varchar({ length: 100 }),
	tags: text(),
	location: varchar({ length: 255 }),
	uploadDate: timestamp("upload_date", { mode: 'string' }).defaultNow(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "media_gallery_id"}),
]);

export const news = mysqlTable("news", {
	id: int().autoincrement().notNull(),
	categoryId: int("category_id"),
	authorId: int("author_id"),
	title: varchar({ length: 500 }).notNull(),
	slug: varchar({ length: 255 }).notNull(),
	excerpt: text(),
	content: longtext(),
	imageUrl: text("image_url"),
	isFeatured: tinyint("is_featured").default(0),
	isPublished: tinyint("is_published").default(0),
	publishedAt: timestamp("published_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("idx_news_featured").on(table.isFeatured),
	index("idx_news_published").on(table.isPublished, table.publishedAt),
	index("idx_news_slug").on(table.slug),
	primaryKey({ columns: [table.id], name: "news_id"}),
	unique("slug").on(table.slug),
]);

export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
	id: int().autoincrement().notNull(),
	email: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }),
	status: varchar({ length: 50 }).default('subscribed'),
	subscribedAt: timestamp("subscribed_at", { mode: 'string' }).defaultNow(),
	unsubscribedAt: timestamp("unsubscribed_at", { mode: 'string' }),
},
(table) => [
	index("idx_newsletter_email").on(table.email),
	index("idx_newsletter_status").on(table.status),
	primaryKey({ columns: [table.id], name: "newsletter_subscribers_id"}),
	unique("email").on(table.email),
]);

export const projects = mysqlTable("projects", {
	id: int().autoincrement().notNull(),
	categoryId: int("category_id").references(() => categories.id, { onDelete: "set null" } ),
	titleEn: varchar("title_en", { length: 500 }).notNull(),
	titleTr: varchar("title_tr", { length: 500 }).notNull(),
	descriptionEn: text("description_en"),
	descriptionTr: text("description_tr"),
	locationEn: varchar("location_en", { length: 255 }),
	locationTr: varchar("location_tr", { length: 255 }),
	country: varchar({ length: 100 }),
	region: varchar({ length: 100 }),
	imageUrl: text("image_url"),
	goalAmount: decimal("goal_amount", { precision: 12, scale: 2 }),
	fundedAmount: decimal("funded_amount", { precision: 12, scale: 2 }).default('0.00'),
	beneficiaries: int(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }),
	status: varchar({ length: 50 }).default('active'),
	isFeatured: tinyint("is_featured").default(0),
	slug: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("category_id").on(table.categoryId),
	index("idx_projects_country").on(table.country),
	index("idx_projects_featured").on(table.isFeatured),
	index("idx_projects_status").on(table.status),
	primaryKey({ columns: [table.id], name: "projects_id"}),
	unique("slug").on(table.slug),
]);

export const regions = mysqlTable("regions", {
	id: int().autoincrement().notNull(),
	nameEn: varchar("name_en", { length: 255 }).notNull(),
	nameTr: varchar("name_tr", { length: 255 }).notNull(),
	country: varchar({ length: 100 }).notNull(),
	continent: varchar({ length: 100 }),
	descriptionEn: text("description_en"),
	descriptionTr: text("description_tr"),
	activeProjects: int("active_projects").default(0),
	beneficiaries: int().default(0),
	imageUrl: text("image_url"),
	slug: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "regions_id"}),
	unique("slug").on(table.slug),
]);

export const sessions = mysqlTable("sessions", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").references(() => adminUsers.id, { onDelete: "cascade" } ),
	token: varchar({ length: 500 }).notNull(),
	ipAddress: varchar("ip_address", { length: 45 }),
	userAgent: text("user_agent"),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("idx_sessions_expires").on(table.expiresAt),
	index("idx_sessions_token").on(table.token),
	index("user_id").on(table.userId),
	primaryKey({ columns: [table.id], name: "sessions_id"}),
	unique("token").on(table.token),
]);

export const stories = mysqlTable("stories", {
	id: int().autoincrement().notNull(),
	titleEn: varchar("title_en", { length: 500 }).notNull(),
	titleTr: varchar("title_tr", { length: 500 }).notNull(),
	contentEn: longtext("content_en"),
	contentTr: longtext("content_tr"),
	excerptEn: text("excerpt_en"),
	excerptTr: text("excerpt_tr"),
	imageUrl: text("image_url"),
	location: varchar({ length: 255 }),
	personName: varchar("person_name", { length: 255 }),
	isFeatured: tinyint("is_featured").default(0),
	isPublished: tinyint("is_published").default(0),
	publishedAt: timestamp("published_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("idx_stories_featured").on(table.isFeatured),
	index("idx_stories_published").on(table.isPublished),
	primaryKey({ columns: [table.id], name: "stories_id"}),
]);

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	email: varchar({ length: 255 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	fullName: varchar("full_name", { length: 255 }),
	role: mysqlEnum(['admin','editor','viewer']).default('viewer').notNull(),
	isActive: tinyint("is_active").default(1),
	emailVerifiedAt: datetime("email_verified_at", { mode: 'string'}),
	lastLogin: datetime("last_login", { mode: 'string'}),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
	unique("email").on(table.email),
]);

export const volunteers = mysqlTable("volunteers", {
	id: int().autoincrement().notNull(),
	fullName: varchar("full_name", { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 50 }),
	country: varchar({ length: 100 }),
	city: varchar({ length: 100 }),
	skills: text(),
	availability: varchar({ length: 100 }),
	message: text(),
	status: varchar({ length: 50 }).default('pending'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("idx_volunteers_email").on(table.email),
	index("idx_volunteers_status").on(table.status),
	primaryKey({ columns: [table.id], name: "volunteers_id"}),
	unique("email").on(table.email),
]);
