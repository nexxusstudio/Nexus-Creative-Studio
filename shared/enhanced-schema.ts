import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, json, timestamp, serial, real, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";

// Existing tables (kept for compatibility)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  year: integer("year").notNull(),
  client_name: text("client_name"),
  categories: text("categories").array().notNull().default(sql`ARRAY[]::text[]`),
  technologies: text("technologies").array().notNull().default(sql`ARRAY[]::text[]`),
  description: text("description"),
  long_description: text("long_description"),
  image_url: text("image_url"),
  gallery_urls: text("gallery_urls").array().default(sql`ARRAY[]::text[]`),
  live_url: text("live_url"),
  github_url: text("github_url"),
  metrics: json("metrics").$type<Record<string, any>>().default({}),
  testimonial: json("testimonial").$type<{
    content: string;
    author: string;
    position: string;
    company: string;
  }>(),
  is_featured: boolean("is_featured").notNull().default(false),
  published: boolean("published").notNull().default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  long_description: text("long_description"),
  category: text("category").notNull(),
  price_min: real("price_min"),
  price_max: real("price_max"),
  features: text("features").array().notNull().default(sql`ARRAY[]::text[]`),
  process_steps: json("process_steps").$type<Array<{
    title: string;
    description: string;
    duration: string;
  }>>(),
  deliverables: text("deliverables").array().default(sql`ARRAY[]::text[]`),
  is_featured: boolean("is_featured").notNull().default(false),
  is_active: boolean("is_active").notNull().default(true),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  job_title: text("job_title"),
  phone: text("phone"),
  website: text("website"),
  message: text("message").notNull(),
  project_type: text("project_type"),
  service_interest: text("service_interest"),
  budget_range: text("budget_range"),
  timeline: text("timeline"),
  urgency: text("urgency"),
  primary_goal: text("primary_goal"),
  current_challenges: text("current_challenges"),
  target_audience: text("target_audience"),
  success_metrics: text("success_metrics"),
  competitor_analysis: text("competitor_analysis"),
  hear_about_us: text("hear_about_us"),
  referral_source: text("referral_source"),
  additional_info: text("additional_info"),
  lead_score: integer("lead_score").default(0),
  lead_priority: text("lead_priority").default("LOW"), // HIGH, MEDIUM, LOW
  status: text("status").notNull().default("new"), // new, contacted, qualified, proposal_sent, closed_won, closed_lost
  assigned_to: text("assigned_to"),
  last_contact_date: timestamp("last_contact_date"),
  follow_up_date: timestamp("follow_up_date"),
  source: text("source").default("contact_form"), // contact_form, advanced_lead_form, referral, etc.
  utm_source: text("utm_source"),
  utm_medium: text("utm_medium"),
  utm_campaign: text("utm_campaign"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const siteMetrics = pgTable("site_metrics", {
  id: serial("id").primaryKey(),
  revenue_total: real("revenue_total").notNull().default(0),
  projects_total: integer("projects_total").notNull().default(0),
  clients_total: integer("clients_total").notNull().default(0),
  satisfaction_pct: real("satisfaction_pct").notNull().default(0),
  success_rate_pct: real("success_rate_pct").notNull().default(0),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const pricingTiers = pgTable("pricing_tiers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  service_type: text("service_type").notNull(),
  tier_name: text("tier_name").notNull(),
  tier_level: text("tier_level").notNull(), // CORE, GROWTH, ENTERPRISE
  price_min: real("price_min").notNull(),
  price_max: real("price_max").notNull(),
  features: text("features").array().notNull().default(sql`ARRAY[]::text[]`),
  service_details: json("service_details").$type<Array<{
    name: string;
    description: string;
    price: string;
  }>>(),
  is_popular: boolean("is_popular").default(false),
  is_active: boolean("is_active").notNull().default(true),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// New tables for enhanced functionality

export const automationRules = pgTable("automation_rules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  trigger_event: text("trigger_event").notNull(), // contact_form_submitted, lead_score_threshold, etc.
  conditions: json("conditions").$type<Array<{
    field: string;
    operator: string;
    value: string;
  }>>().default([]),
  actions: json("actions").$type<Array<{
    type: string;
    config: Record<string, any>;
  }>>().notNull(),
  is_active: boolean("is_active").notNull().default(true),
  total_runs: integer("total_runs").default(0),
  success_count: integer("success_count").default(0),
  last_run: timestamp("last_run"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const emailTemplates = pgTable("email_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull(), // welcome, follow_up, proposal, thank_you, custom
  variables: text("variables").array().default(sql`ARRAY[]::text[]`),
  is_active: boolean("is_active").notNull().default(true),
  usage_count: integer("usage_count").default(0),
  open_rate: real("open_rate").default(0),
  click_rate: real("click_rate").default(0),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const leadNurturingSequences = pgTable("lead_nurturing_sequences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  trigger_event: text("trigger_event").notNull(),
  steps: json("steps").$type<Array<{
    delay: number; // in hours
    action: string;
    template_id: string;
    conditions?: Array<{
      field: string;
      operator: string;
      value: string;
    }>;
  }>>().notNull(),
  is_active: boolean("is_active").notNull().default(true),
  enrolled_leads: integer("enrolled_leads").default(0),
  completed_leads: integer("completed_leads").default(0),
  conversion_rate: real("conversion_rate").default(0),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const leadNurturingEnrollments = pgTable("lead_nurturing_enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sequence_id: varchar("sequence_id").notNull().references(() => leadNurturingSequences.id),
  contact_id: varchar("contact_id").notNull().references(() => contactSubmissions.id),
  current_step: integer("current_step").default(0),
  status: text("status").default("active"), // active, paused, completed, failed
  started_at: timestamp("started_at").notNull().defaultNow(),
  completed_at: timestamp("completed_at"),
  last_action_at: timestamp("last_action_at"),
});

export const emailCampaigns = pgTable("email_campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  template_id: varchar("template_id").references(() => emailTemplates.id),
  recipient_criteria: json("recipient_criteria").$type<{
    lead_score_min?: number;
    lead_score_max?: number;
    status?: string[];
    tags?: string[];
    created_after?: string;
    created_before?: string;
  }>(),
  sent_count: integer("sent_count").default(0),
  delivered_count: integer("delivered_count").default(0),
  opened_count: integer("opened_count").default(0),
  clicked_count: integer("clicked_count").default(0),
  bounced_count: integer("bounced_count").default(0),
  unsubscribed_count: integer("unsubscribed_count").default(0),
  status: text("status").default("draft"), // draft, sending, sent, failed
  scheduled_at: timestamp("scheduled_at"),
  sent_at: timestamp("sent_at"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const emailLogs = pgTable("email_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contact_id: varchar("contact_id").references(() => contactSubmissions.id),
  template_id: varchar("template_id").references(() => emailTemplates.id),
  campaign_id: varchar("campaign_id").references(() => emailCampaigns.id),
  automation_rule_id: varchar("automation_rule_id").references(() => automationRules.id),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  status: text("status").notNull(), // sent, delivered, opened, clicked, bounced, failed
  provider_id: text("provider_id"), // External email service provider ID
  error_message: text("error_message"),
  opened_at: timestamp("opened_at"),
  clicked_at: timestamp("clicked_at"),
  bounced_at: timestamp("bounced_at"),
  sent_at: timestamp("sent_at").notNull().defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  event_type: text("event_type").notNull(), // page_view, button_click, form_submit, etc.
  page_url: text("page_url"),
  referrer: text("referrer"),
  user_agent: text("user_agent"),
  ip_address: text("ip_address"),
  session_id: text("session_id"),
  user_id: text("user_id"),
  event_data: json("event_data").$type<Record<string, any>>(),
  utm_source: text("utm_source"),
  utm_medium: text("utm_medium"),
  utm_campaign: text("utm_campaign"),
  utm_content: text("utm_content"),
  utm_term: text("utm_term"),
  device_type: text("device_type"), // desktop, mobile, tablet
  browser: text("browser"),
  os: text("os"),
  country: text("country"),
  city: text("city"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const leadScoringRules = pgTable("lead_scoring_rules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  field: text("field").notNull(), // email_domain, job_title, budget_range, etc.
  operator: text("operator").notNull(), // equals, contains, greater_than, etc.
  value: text("value").notNull(),
  points: integer("points").notNull(),
  is_active: boolean("is_active").notNull().default(true),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const leadScoringHistory = pgTable("lead_scoring_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contact_id: varchar("contact_id").notNull().references(() => contactSubmissions.id),
  rule_id: varchar("rule_id").references(() => leadScoringRules.id),
  points_awarded: integer("points_awarded").notNull(),
  total_score: integer("total_score").notNull(),
  reason: text("reason"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // follow_up, proposal, call, meeting, etc.
  priority: text("priority").default("MEDIUM"), // HIGH, MEDIUM, LOW
  status: text("status").default("pending"), // pending, in_progress, completed, cancelled
  contact_id: varchar("contact_id").references(() => contactSubmissions.id),
  assigned_to: text("assigned_to"),
  due_date: timestamp("due_date"),
  completed_at: timestamp("completed_at"),
  automation_rule_id: varchar("automation_rule_id").references(() => automationRules.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // info, success, warning, error
  channel: text("channel").notNull(), // email, slack, webhook, in_app
  recipient: text("recipient").notNull(),
  contact_id: varchar("contact_id").references(() => contactSubmissions.id),
  automation_rule_id: varchar("automation_rule_id").references(() => automationRules.id),
  status: text("status").default("pending"), // pending, sent, failed
  sent_at: timestamp("sent_at"),
  error_message: text("error_message"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const webhooks = pgTable("webhooks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  url: text("url").notNull(),
  events: text("events").array().notNull(), // contact_created, lead_scored, etc.
  secret: text("secret"),
  is_active: boolean("is_active").notNull().default(true),
  last_triggered: timestamp("last_triggered"),
  success_count: integer("success_count").default(0),
  failure_count: integer("failure_count").default(0),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const integrations = pgTable("integrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // email_provider, crm, calendar, slack, etc.
  provider: text("provider").notNull(), // sendgrid, mailchimp, hubspot, calendly, etc.
  config: json("config").$type<Record<string, any>>().notNull(),
  is_active: boolean("is_active").notNull().default(true),
  last_sync: timestamp("last_sync"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Zod schemas for validation
export const insertProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  year: z.number().int(),
  client_name: z.string().nullable().optional(),
  categories: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  description: z.string().nullable().optional(),
  long_description: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  gallery_urls: z.array(z.string()).optional(),
  live_url: z.string().nullable().optional(),
  github_url: z.string().nullable().optional(),
  metrics: z.record(z.any()).optional(),
  testimonial: z.object({
    content: z.string(),
    author: z.string(),
    position: z.string(),
    company: z.string(),
  }).optional(),
  is_featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export const insertAdvancedContactSubmissionSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().nullable().optional(),
  job_title: z.string().optional(),
  phone: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  message: z.string().min(1),
  project_type: z.string().optional(),
  service_interest: z.string().optional(),
  budget_range: z.string().optional(),
  timeline: z.string().optional(),
  urgency: z.string().optional(),
  primary_goal: z.string().optional(),
  current_challenges: z.string().optional(),
  target_audience: z.string().optional(),
  success_metrics: z.string().optional(),
  competitor_analysis: z.string().optional(),
  hear_about_us: z.string().optional(),
  referral_source: z.string().optional(),
  additional_info: z.string().optional(),
  lead_score: z.number().optional(),
  lead_priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
  status: z.string().optional(),
  source: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

export const insertAutomationRuleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  trigger_event: z.string().min(1),
  conditions: z.array(z.object({
    field: z.string(),
    operator: z.string(),
    value: z.string(),
  })).optional(),
  actions: z.array(z.object({
    type: z.string(),
    config: z.record(z.any()),
  })),
  is_active: z.boolean().optional(),
});

export const insertEmailTemplateSchema = z.object({
  name: z.string().min(1),
  subject: z.string().min(1),
  content: z.string().min(1),
  type: z.enum(["welcome", "follow_up", "proposal", "thank_you", "custom"]),
  variables: z.array(z.string()).optional(),
  is_active: z.boolean().optional(),
});

export const insertAnalyticsEventSchema = z.object({
  event_type: z.string().min(1),
  page_url: z.string().optional(),
  referrer: z.string().optional(),
  user_agent: z.string().optional(),
  ip_address: z.string().optional(),
  session_id: z.string().optional(),
  user_id: z.string().optional(),
  event_data: z.record(z.any()).optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  device_type: z.enum(["desktop", "mobile", "tablet"]).optional(),
  browser: z.string().optional(),
  os: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
});

// Type exports
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertAdvancedContactSubmission = z.infer<typeof insertAdvancedContactSubmissionSchema>;
export type AutomationRule = typeof automationRules.$inferSelect;
export type InsertAutomationRule = z.infer<typeof insertAutomationRuleSchema>;
export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;
export type AnalyticsEvent = typeof analytics.$inferSelect;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type LeadNurturingSequence = typeof leadNurturingSequences.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type Webhook = typeof webhooks.$inferSelect;
export type Integration = typeof integrations.$inferSelect;