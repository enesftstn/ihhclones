import { relations } from "drizzle-orm/relations";
import { adminUsers, auditLogs, categories, campaigns, donations, projects, sessions } from "./schema";

export const auditLogsRelations = relations(auditLogs, ({one}) => ({
	adminUser: one(adminUsers, {
		fields: [auditLogs.userId],
		references: [adminUsers.id]
	}),
}));

export const adminUsersRelations = relations(adminUsers, ({many}) => ({
	auditLogs: many(auditLogs),
	sessions: many(sessions),
}));

export const campaignsRelations = relations(campaigns, ({one, many}) => ({
	category: one(categories, {
		fields: [campaigns.categoryId],
		references: [categories.id]
	}),
	donations: many(donations),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	campaigns: many(campaigns),
	projects: many(projects),
}));

export const donationsRelations = relations(donations, ({one}) => ({
	campaign: one(campaigns, {
		fields: [donations.campaignId],
		references: [campaigns.id]
	}),
}));

export const projectsRelations = relations(projects, ({one}) => ({
	category: one(categories, {
		fields: [projects.categoryId],
		references: [categories.id]
	}),
}));

export const sessionsRelations = relations(sessions, ({one}) => ({
	adminUser: one(adminUsers, {
		fields: [sessions.userId],
		references: [adminUsers.id]
	}),
}));