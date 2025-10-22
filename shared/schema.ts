import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, json, timestamp, serial, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  year: integer("year").notNull(),
  client_name: text("client_name"),
  categories: text("categories").array().notNull().default(sql`ARRAY[]::text[]`),
  technologies: text("technologies").array().notNull().default(sql`ARRAY[]::text[]`),
  description: text("description"),
  metrics: json("metrics").$type<Record<string, any>>().default({}),
  is_featured: boolean("is_featured").notNull().default(false),
  published: boolean("published").notNull().default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  price_min: real("price_min"),
  price_max: real("price_max"),
  features: text("features").array().notNull().default(sql`ARRAY[]::text[]`),
  is_featured: boolean("is_featured").notNull().default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  message: text("message").notNull(),
  service_interest: text("service_interest"),
  budget_range: text("budget_range"),
  status: text("status").notNull().default("new"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  created_at: true,
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const siteMetrics = pgTable("site_metrics", {
  id: serial("id").primaryKey(),
  revenue_total: real("revenue_total").notNull().default(0),
  projects_total: integer("projects_total").notNull().default(0),
  clients_total: integer("clients_total").notNull().default(0),
  satisfaction_pct: real("satisfaction_pct").notNull().default(0),
  success_rate_pct: real("success_rate_pct").notNull().default(0),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const insertSiteMetricsSchema = createInsertSchema(siteMetrics).omit({
  id: true,
  updated_at: true,
});

export type InsertSiteMetrics = z.infer<typeof insertSiteMetricsSchema>;
export type SiteMetrics = typeof siteMetrics.$inferSelect;

export const pricingTiers = pgTable("pricing_tiers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  service_type: text("service_type").notNull(),
  tier_name: text("tier_name").notNull(),
  price_min: real("price_min").notNull(),
  price_max: real("price_max").notNull(),
  features: text("features").array().notNull().default(sql`ARRAY[]::text[]`),
  is_active: boolean("is_active").notNull().default(true),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const insertPricingTierSchema = createInsertSchema(pricingTiers).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type InsertPricingTier = z.infer<typeof insertPricingTierSchema>;
export type PricingTier = typeof pricingTiers.$inferSelect;
