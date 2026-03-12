import {
    mysqlTable,
    serial,
    varchar,
    text,
    decimal,
    boolean,
    timestamp,
    int,
    json,
    datetime
} from "drizzle-orm/mysql-core";

// =====================================================
// CORE TABLES
// =====================================================

export const campaigns = mysqlTable("campaigns", {
    id: serial("id").primaryKey(),
    titleEn: varchar("title_en", { length: 255 }).notNull(),
    titleTr: varchar("title_tr", { length: 255 }).notNull(),
    descriptionEn: text("description_en"),
    descriptionTr: text("description_tr"),
    targetAmount: decimal("target_amount", { precision: 10, scale: 2 }),
    currentAmount: decimal("current_amount", { precision: 10, scale: 2 }).default("0.00"),
    imageUrl: text("image_url"),
    category: varchar("category", { length: 100 }),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const projects = mysqlTable("projects", {
    id: serial("id").primaryKey(),
    titleEn: varchar("title_en", { length: 255 }).notNull(),
    titleTr: varchar("title_tr", { length: 255 }).notNull(),
    descriptionEn: text("description_en"),
    descriptionTr: text("description_tr"),
    targetAmount: decimal("target_amount", { precision: 10, scale: 2 }),
    currentAmount: decimal("current_amount", { precision: 10, scale: 2 }).default("0.00"),
    imageUrl: text("image_url"),
    location: varchar("location", { length: 255 }),
    status: varchar("status", { length: 50 }).default("active"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const news = mysqlTable("news", {
    id: serial("id").primaryKey(),
    titleEn: varchar("title_en", { length: 255 }).notNull(),
    titleTr: varchar("title_tr", { length: 255 }).notNull(),
    contentEn: text("content_en"),
    contentTr: text("content_tr"),
    excerptEn: text("excerpt_en"),
    excerptTr: text("excerpt_tr"),
    imageUrl: text("image_url"),
    category: varchar("category", { length: 100 }),
    author: varchar("author", { length: 100 }),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const impactStories = mysqlTable("impact_stories", {
    id: serial("id").primaryKey(),
    nameEn: varchar("name_en", { length: 255 }).notNull(),
    nameTr: varchar("name_tr", { length: 255 }).notNull(),
    storyEn: text("story_en"),
    storyTr: text("story_tr"),
    locationEn: varchar("location_en", { length: 255 }),
    locationTr: varchar("location_tr", { length: 255 }),
    imageUrl: text("image_url"),
    year: int("year"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const media = mysqlTable("media", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    fileUrl: text("file_url").notNull(),
    fileType: varchar("file_type", { length: 50 }),
    fileSize: int("file_size"),
    category: varchar("category", { length: 100 }),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const regions = mysqlTable("regions", {
    id: serial("id").primaryKey(),
    nameEn: varchar("name_en", { length: 255 }).notNull(),
    nameTr: varchar("name_tr", { length: 255 }).notNull(),
    descriptionEn: text("description_en"),
    descriptionTr: text("description_tr"),
    activeProjects: int("active_projects").default(0),
    totalBeneficiaries: int("total_beneficiaries").default(0),
    createdAt: timestamp("created_at").defaultNow(),
});

export const volunteers = mysqlTable("volunteers", {
    id: serial("id").primaryKey(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 50 }),
    country: varchar("country", { length: 100 }),
    skills: text("skills"),
    message: text("message"),
    status: varchar("status", { length: 50 }).default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const contactSubmissions = mysqlTable("contact_submissions", {
    id: serial("id").primaryKey(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }),
    subject: varchar("subject", { length: 255 }),
    message: text("message"),
    status: varchar("status", { length: 50 }).default("new"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const categories = mysqlTable("categories", {
    id: serial("id").primaryKey(),
    nameEn: varchar("name_en", { length: 100 }).notNull(),
    nameTr: varchar("name_tr", { length: 100 }).notNull(),
    type: varchar("type", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
});

export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    status: varchar("status", { length: 50 }).default("subscribed"),
    subscribedAt: timestamp("subscribed_at").defaultNow(),
});

// =====================================================
// SECURITY TABLES
// =====================================================

export const adminUsers = mysqlTable("admin_users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    role: varchar("role", { length: 50 }).default("admin").notNull(),
    fullName: varchar("full_name", { length: 100 }),
    isActive: boolean("is_active").default(true),
    lastLogin: timestamp("last_login"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const auditLogs = mysqlTable("audit_logs", {
    id: serial("id").primaryKey(),
    userId: int("user_id"),
    action: varchar("action", { length: 100 }).notNull(),
    entityType: varchar("entity_type", { length: 50 }),
    entityId: int("entity_id"),
    changes: json("changes"),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow(),
});

// =====================================================
// DONATIONS TABLES
// =====================================================

export const donations = mysqlTable("donations", {
    id: serial("id").primaryKey(),
    donorEmail: varchar("donor_email", { length: 255 }).notNull(),
    donorName: varchar("donor_name", { length: 255 }),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default("USD"),
    campaignId: int("campaign_id"),
    paymentProvider: varchar("payment_provider", { length: 50 }).default("stripe"),
    paymentId: varchar("payment_id", { length: 255 }),
    paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
    isRecurring: boolean("is_recurring").default(false),
    subscriptionId: varchar("subscription_id", { length: 255 }),
    message: text("message"),
    createdAt: timestamp("created_at").defaultNow(),
});

// =====================================================
// EVENTS TABLES
// =====================================================

export const events = mysqlTable("events", {
    id: serial("id").primaryKey(),
    titleEn: varchar("title_en", { length: 255 }).notNull(),
    titleTr: varchar("title_tr", { length: 255 }).notNull(),
    descriptionEn: text("description_en"),
    descriptionTr: text("description_tr"),
    eventType: varchar("event_type", { length: 50 }),
    location: varchar("location", { length: 255 }),
    eventDate: datetime("event_date").notNull(),
    endDate: datetime("end_date"),
    imageUrl: text("image_url"),
    registrationUrl: text("registration_url"),
    maxAttendees: int("max_attendees"),
    currentAttendees: int("current_attendees").default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
});

// =====================================================
// BLOG TABLES
// =====================================================

export const blogPosts = mysqlTable("blog_posts", {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    titleEn: varchar("title_en", { length: 255 }).notNull(),
    titleTr: varchar("title_tr", { length: 255 }).notNull(),
    contentEn: text("content_en"),
    contentTr: text("content_tr"),
    excerptEn: text("excerpt_en"),
    excerptTr: text("excerpt_tr"),
    featuredImage: text("featured_image"),
    author: varchar("author", { length: 100 }),
    category: varchar("category", { length: 100 }),
    tags: text("tags"),
    viewCount: int("view_count").default(0),
    isPublished: boolean("is_published").default(false),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const mediaGallery = mysqlTable("media_gallery", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    mediaType: varchar("media_type", { length: 50 }),
    mediaUrl: text("media_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    category: varchar("category", { length: 100 }),
    tags: text("tags"),
    location: varchar("location", { length: 255 }),
    uploadDate: timestamp("upload_date").defaultNow(),
});

// =====================================================
// DONOR PROFILES TABLES
// =====================================================

export const donorProfiles = mysqlTable("donor_profiles", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    fullName: varchar("full_name", { length: 255 }),
    phone: varchar("phone", { length: 50 }),
    country: varchar("country", { length: 100 }),
    address: text("address"),
    profileImage: text("profile_image"),
    totalDonated: decimal("total_donated", { precision: 10, scale: 2 }).default("0.00"),
    donationCount: int("donation_count").default(0),
    monthlyDonations: int("monthly_donations").default(0),
    certificatesIssued: int("certificates_issued").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// =====================================================
// BANNER MANAGEMENT TABLE
// =====================================================

export const banners = mysqlTable("banners", {
    id: serial("id").primaryKey(),
    titleEn: varchar("title_en", { length: 255 }).notNull(),
    titleTr: varchar("title_tr", { length: 255 }).notNull(),
    subtitleEn: text("subtitle_en"),
    subtitleTr: text("subtitle_tr"),
    imageUrl: text("image_url").notNull(),
    linkUrl: text("link_url"),
    buttonTextEn: varchar("button_text_en", { length: 100 }),
    buttonTextTr: varchar("button_text_tr", { length: 100 }),
    sortOrder: int("sort_order").default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
