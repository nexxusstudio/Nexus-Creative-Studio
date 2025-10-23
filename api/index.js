var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// server/index.ts
import express2 from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// server/routes.ts
import { createServer } from "http";

// shared/supabase.ts
import { createClient } from "@supabase/supabase-js";
var supabaseUrl = "https://guarhoiykpmngfptntxt.supabase.co";
var supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1YXJob2l5a3BtbmdmcHRudHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNDU3MjksImV4cCI6MjA3NjYyMTcyOX0.CHvQ4WJIv_kcmy6dMlSUKC8q2VbscsWcORmCNkxVm8c";
var supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log("\u2705 Supabase connected successfully");
} else {
  console.warn("\u26A0\uFE0F  Supabase credentials not configured. Database features will be unavailable.");
}

// server/supabase-storage.ts
var SupabaseStorageError = class extends Error {
  constructor(message, code, details) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = "SupabaseStorageError";
  }
};
var SupabaseStorage = class {
  ensureSupabase() {
    if (!supabase) {
      throw new SupabaseStorageError(
        "Supabase client is not initialized. Please configure SUPABASE_URL and SUPABASE_ANON_KEY environment variables.",
        "SUPABASE_NOT_CONFIGURED"
      );
    }
    return supabase;
  }
  handleError(error, operation) {
    const message = error?.message || `Failed to ${operation}`;
    const code = error?.code;
    const details = error?.details;
    throw new SupabaseStorageError(message, code, details);
  }
  projects = {
    getAll: async (filters) => {
      try {
        const client = this.ensureSupabase();
        let query = client.from("projects").select("*");
        if (filters?.published !== void 0) {
          query = query.eq("published", filters.published);
        }
        if (filters?.featured !== void 0) {
          query = query.eq("is_featured", filters.featured);
        }
        query = query.order("year", { ascending: false });
        const { data, error } = await query;
        if (error) this.handleError(error, "fetch projects");
        return data || [];
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "fetch projects");
      }
    },
    getBySlug: async (slug) => {
      try {
        const client = this.ensureSupabase();
        const { data, error } = await client.from("projects").select("*").eq("slug", slug).single();
        if (error && error.code !== "PGRST116") {
          this.handleError(error, "fetch project by slug");
        }
        return data || null;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "fetch project by slug");
      }
    },
    create: async (data) => {
      try {
        const client = this.ensureSupabase();
        const { data: project, error } = await client.from("projects").insert(data).select().single();
        if (error) this.handleError(error, "create project");
        return project;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "create project");
      }
    },
    update: async (id, data) => {
      try {
        const client = this.ensureSupabase();
        const { data: project, error } = await client.from("projects").update(data).eq("id", id).select().single();
        if (error) this.handleError(error, "update project");
        return project;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "update project");
      }
    },
    delete: async (id) => {
      try {
        const client = this.ensureSupabase();
        const { error } = await client.from("projects").delete().eq("id", id);
        if (error) this.handleError(error, "delete project");
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "delete project");
      }
    }
  };
  services = {
    getAll: async (filters) => {
      try {
        const client = this.ensureSupabase();
        let query = client.from("services").select("*");
        if (filters?.featured !== void 0) {
          query = query.eq("is_featured", filters.featured);
        }
        if (filters?.category) {
          query = query.eq("category", filters.category);
        }
        query = query.order("title");
        const { data, error } = await query;
        if (error) this.handleError(error, "fetch services");
        return data || [];
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "fetch services");
      }
    },
    getById: async (id) => {
      try {
        const client = this.ensureSupabase();
        const { data, error } = await client.from("services").select("*").eq("id", id).single();
        if (error && error.code !== "PGRST116") {
          this.handleError(error, "fetch service by id");
        }
        return data || null;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "fetch service by id");
      }
    },
    create: async (data) => {
      try {
        const client = this.ensureSupabase();
        const { data: service, error } = await client.from("services").insert(data).select().single();
        if (error) this.handleError(error, "create service");
        return service;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "create service");
      }
    },
    update: async (id, data) => {
      try {
        const client = this.ensureSupabase();
        const { data: service, error } = await client.from("services").update(data).eq("id", id).select().single();
        if (error) this.handleError(error, "update service");
        return service;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "update service");
      }
    },
    delete: async (id) => {
      try {
        const client = this.ensureSupabase();
        const { error } = await client.from("services").delete().eq("id", id);
        if (error) this.handleError(error, "delete service");
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "delete service");
      }
    }
  };
  contactSubmissions = {
    getAll: async (filters) => {
      try {
        const client = this.ensureSupabase();
        let query = client.from("contact_submissions").select("*");
        if (filters?.status) {
          query = query.eq("status", filters.status);
        }
        query = query.order("created_at", { ascending: false });
        const { data, error } = await query;
        if (error) this.handleError(error, "fetch contact submissions");
        return data || [];
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "fetch contact submissions");
      }
    },
    getById: async (id) => {
      try {
        const client = this.ensureSupabase();
        const { data, error } = await client.from("contact_submissions").select("*").eq("id", id).single();
        if (error && error.code !== "PGRST116") {
          this.handleError(error, "fetch contact submission by id");
        }
        return data || null;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "fetch contact submission by id");
      }
    },
    create: async (data) => {
      try {
        const client = this.ensureSupabase();
        const { data: submission, error } = await client.from("contact_submissions").insert(data).select().single();
        if (error) this.handleError(error, "create contact submission");
        return submission;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "create contact submission");
      }
    },
    updateStatus: async (id, status) => {
      try {
        const client = this.ensureSupabase();
        const { data: submission, error } = await client.from("contact_submissions").update({ status }).eq("id", id).select().single();
        if (error) this.handleError(error, "update contact submission status");
        return submission;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "update contact submission status");
      }
    }
  };
  siteMetrics = {
    get: async () => {
      try {
        const client = this.ensureSupabase();
        const { data, error } = await client.from("site_metrics").select("*").eq("id", 1).single();
        if (error && error.code !== "PGRST116") {
          this.handleError(error, "fetch site metrics");
        }
        return data || null;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "fetch site metrics");
      }
    },
    update: async (data) => {
      try {
        const client = this.ensureSupabase();
        const { data: metrics, error } = await client.from("site_metrics").update(data).eq("id", 1).select().single();
        if (error) this.handleError(error, "update site metrics");
        return metrics;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "update site metrics");
      }
    }
  };
  pricingTiers = {
    getAll: async (filters) => {
      try {
        const client = this.ensureSupabase();
        let query = client.from("pricing_tiers").select("*");
        if (filters?.active !== void 0) {
          query = query.eq("is_active", filters.active);
        }
        if (filters?.serviceType) {
          query = query.eq("service_type", filters.serviceType);
        }
        query = query.order("price_min");
        const { data, error } = await query;
        if (error) this.handleError(error, "fetch pricing tiers");
        return data || [];
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "fetch pricing tiers");
      }
    },
    getById: async (id) => {
      try {
        const client = this.ensureSupabase();
        const { data, error } = await client.from("pricing_tiers").select("*").eq("id", id).single();
        if (error && error.code !== "PGRST116") {
          this.handleError(error, "fetch pricing tier by id");
        }
        return data || null;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "fetch pricing tier by id");
      }
    },
    create: async (data) => {
      try {
        const client = this.ensureSupabase();
        const { data: tier, error } = await client.from("pricing_tiers").insert(data).select().single();
        if (error) this.handleError(error, "create pricing tier");
        return tier;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "create pricing tier");
      }
    },
    update: async (id, data) => {
      try {
        const client = this.ensureSupabase();
        const { data: tier, error } = await client.from("pricing_tiers").update(data).eq("id", id).select().single();
        if (error) this.handleError(error, "update pricing tier");
        return tier;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "update pricing tier");
      }
    },
    delete: async (id) => {
      try {
        const client = this.ensureSupabase();
        const { error } = await client.from("pricing_tiers").delete().eq("id", id);
        if (error) this.handleError(error, "delete pricing tier");
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, "delete pricing tier");
      }
    }
  };
};
var supabaseStorage = new SupabaseStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, json, timestamp, serial, real } from "drizzle-orm/pg-core";
import { z } from "zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});
var projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  year: integer("year").notNull(),
  client_name: text("client_name"),
  categories: text("categories").array().notNull().default(sql`ARRAY[]::text[]`),
  technologies: text("technologies").array().notNull().default(sql`ARRAY[]::text[]`),
  description: text("description"),
  metrics: json("metrics").$type().default({}),
  is_featured: boolean("is_featured").notNull().default(false),
  published: boolean("published").notNull().default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow()
});
var insertProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  year: z.number().int(),
  client_name: z.string().nullable().optional(),
  categories: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  description: z.string().nullable().optional(),
  metrics: z.record(z.any()).optional(),
  is_featured: z.boolean().optional(),
  published: z.boolean().optional()
});
var services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  price_min: real("price_min"),
  price_max: real("price_max"),
  features: text("features").array().notNull().default(sql`ARRAY[]::text[]`),
  is_featured: boolean("is_featured").notNull().default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow()
});
var insertServiceSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  category: z.string().min(1),
  price_min: z.number().optional(),
  price_max: z.number().optional(),
  features: z.array(z.string()).optional(),
  is_featured: z.boolean().optional()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  message: text("message").notNull(),
  service_interest: text("service_interest"),
  budget_range: text("budget_range"),
  status: text("status").notNull().default("new"),
  created_at: timestamp("created_at").notNull().defaultNow()
});
var insertContactSubmissionSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  message: z.string().min(1),
  service_interest: z.string().optional(),
  budget_range: z.string().optional(),
  status: z.string().optional()
});
var siteMetrics = pgTable("site_metrics", {
  id: serial("id").primaryKey(),
  revenue_total: real("revenue_total").notNull().default(0),
  projects_total: integer("projects_total").notNull().default(0),
  clients_total: integer("clients_total").notNull().default(0),
  satisfaction_pct: real("satisfaction_pct").notNull().default(0),
  success_rate_pct: real("success_rate_pct").notNull().default(0),
  updated_at: timestamp("updated_at").notNull().defaultNow()
});
var insertSiteMetricsSchema = z.object({
  revenue_total: z.number().optional(),
  projects_total: z.number().int().optional(),
  clients_total: z.number().int().optional(),
  satisfaction_pct: z.number().optional(),
  success_rate_pct: z.number().optional()
});
var pricingTiers = pgTable("pricing_tiers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  service_type: text("service_type").notNull(),
  tier_name: text("tier_name").notNull(),
  price_min: real("price_min").notNull(),
  price_max: real("price_max").notNull(),
  features: text("features").array().notNull().default(sql`ARRAY[]::text[]`),
  is_active: boolean("is_active").notNull().default(true),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow()
});
var insertPricingTierSchema = z.object({
  service_type: z.string().min(1),
  tier_name: z.string().min(1),
  price_min: z.number(),
  price_max: z.number(),
  features: z.array(z.string()).optional(),
  is_active: z.boolean().optional()
});

// server/routes.ts
import { fromZodError } from "zod-validation-error";
import { z as z3 } from "zod";

// server/env.ts
import { config } from "dotenv";
config();
function validateEnv() {
  const env2 = process.env.NODE_ENV || "development";
  const port = parseInt(
    process.env.PORT || process.env.RAILWAY_PORT || process.env.RENDER_PORT || process.env.VERCEL_PORT || "5000",
    10
  );
  const isVercel = !!(process.env.VERCEL || process.env.VERCEL_ENV);
  const isRailway = !!(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID);
  const isRender = !!(process.env.RENDER || process.env.RENDER_SERVICE_ID);
  const isNetlify = !!(process.env.NETLIFY || process.env.NETLIFY_BUILD_BASE);
  const isDocker = !!(process.env.DOCKER_CONTAINER || process.env.DOCKERIZED);
  let deploymentPlatform = "local";
  if (isVercel) deploymentPlatform = "vercel";
  else if (isRailway) deploymentPlatform = "railway";
  else if (isRender) deploymentPlatform = "render";
  else if (isNetlify) deploymentPlatform = "netlify";
  else if (isDocker) deploymentPlatform = "docker";
  const rateLimitWindow = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10);
  const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10);
  if (isNaN(port)) {
    console.warn("\u26A0\uFE0F  Invalid PORT environment variable, using default 5000");
  }
  let sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret && env2 === "production") {
    console.warn("\u26A0\uFE0F  SESSION_SECRET not found, generating temporary secret. Set SESSION_SECRET env var!");
    sessionSecret = __require("crypto").randomBytes(32).toString("hex");
  }
  if (env2 === "production") {
    const warnings = [];
    if (!process.env.SUPABASE_URL) warnings.push("SUPABASE_URL");
    if (!process.env.SUPABASE_ANON_KEY) warnings.push("SUPABASE_ANON_KEY");
    if (warnings.length > 0) {
      console.warn(`\u26A0\uFE0F  Missing environment variables (app may not work properly): ${warnings.join(", ")}`);
    }
    if (!process.env.DATABASE_URL && !process.env.SUPABASE_URL) {
      console.warn("\u26A0\uFE0F  No database connection configured. Some features may not work.");
    }
    if (sessionSecret && sessionSecret.length < 32) {
      console.warn("\u26A0\uFE0F  Warning: SESSION_SECRET should be at least 32 characters long");
    }
  }
  console.log(`\u{1F680} Starting on ${deploymentPlatform} platform (PORT: ${port})`);
  return {
    NODE_ENV: env2,
    PORT: port,
    DATABASE_URL: process.env.DATABASE_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SESSION_SECRET: sessionSecret,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    RATE_LIMIT_WINDOW_MS: rateLimitWindow,
    RATE_LIMIT_MAX_REQUESTS: rateLimitMax,
    DEPLOYMENT_PLATFORM: deploymentPlatform,
    IS_VERCEL: isVercel,
    IS_RAILWAY: isRailway,
    IS_RENDER: isRender,
    IS_NETLIFY: isNetlify,
    IS_DOCKER: isDocker
  };
}
var env = validateEnv();

// server/routes/enhanced-api.ts
import express from "express";
import { createClient as createClient2 } from "@supabase/supabase-js";

// shared/enhanced-schema.ts
import { sql as sql2 } from "drizzle-orm";
import { pgTable as pgTable2, text as text2, varchar as varchar2, integer as integer2, boolean as boolean2, json as json2, timestamp as timestamp2, serial as serial2, real as real2 } from "drizzle-orm/pg-core";
import { z as z2 } from "zod";
var users2 = pgTable2("users", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  username: text2("username").notNull().unique(),
  password: text2("password").notNull()
});
var projects2 = pgTable2("projects", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  title: text2("title").notNull(),
  slug: text2("slug").notNull().unique(),
  year: integer2("year").notNull(),
  client_name: text2("client_name"),
  categories: text2("categories").array().notNull().default(sql2`ARRAY[]::text[]`),
  technologies: text2("technologies").array().notNull().default(sql2`ARRAY[]::text[]`),
  description: text2("description"),
  long_description: text2("long_description"),
  image_url: text2("image_url"),
  gallery_urls: text2("gallery_urls").array().default(sql2`ARRAY[]::text[]`),
  live_url: text2("live_url"),
  github_url: text2("github_url"),
  metrics: json2("metrics").$type().default({}),
  testimonial: json2("testimonial").$type(),
  is_featured: boolean2("is_featured").notNull().default(false),
  published: boolean2("published").notNull().default(false),
  created_at: timestamp2("created_at").notNull().defaultNow(),
  updated_at: timestamp2("updated_at").notNull().defaultNow()
});
var services2 = pgTable2("services", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  title: text2("title").notNull(),
  slug: text2("slug").notNull().unique(),
  description: text2("description"),
  long_description: text2("long_description"),
  category: text2("category").notNull(),
  price_min: real2("price_min"),
  price_max: real2("price_max"),
  features: text2("features").array().notNull().default(sql2`ARRAY[]::text[]`),
  process_steps: json2("process_steps").$type(),
  deliverables: text2("deliverables").array().default(sql2`ARRAY[]::text[]`),
  is_featured: boolean2("is_featured").notNull().default(false),
  is_active: boolean2("is_active").notNull().default(true),
  created_at: timestamp2("created_at").notNull().defaultNow(),
  updated_at: timestamp2("updated_at").notNull().defaultNow()
});
var contactSubmissions2 = pgTable2("contact_submissions", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  name: text2("name").notNull(),
  email: text2("email").notNull(),
  company: text2("company"),
  job_title: text2("job_title"),
  phone: text2("phone"),
  website: text2("website"),
  message: text2("message").notNull(),
  project_type: text2("project_type"),
  service_interest: text2("service_interest"),
  budget_range: text2("budget_range"),
  timeline: text2("timeline"),
  urgency: text2("urgency"),
  primary_goal: text2("primary_goal"),
  current_challenges: text2("current_challenges"),
  target_audience: text2("target_audience"),
  success_metrics: text2("success_metrics"),
  competitor_analysis: text2("competitor_analysis"),
  hear_about_us: text2("hear_about_us"),
  referral_source: text2("referral_source"),
  additional_info: text2("additional_info"),
  lead_score: integer2("lead_score").default(0),
  lead_priority: text2("lead_priority").default("LOW"),
  // HIGH, MEDIUM, LOW
  status: text2("status").notNull().default("new"),
  // new, contacted, qualified, proposal_sent, closed_won, closed_lost
  assigned_to: text2("assigned_to"),
  last_contact_date: timestamp2("last_contact_date"),
  follow_up_date: timestamp2("follow_up_date"),
  source: text2("source").default("contact_form"),
  // contact_form, advanced_lead_form, referral, etc.
  utm_source: text2("utm_source"),
  utm_medium: text2("utm_medium"),
  utm_campaign: text2("utm_campaign"),
  created_at: timestamp2("created_at").notNull().defaultNow(),
  updated_at: timestamp2("updated_at").notNull().defaultNow()
});
var siteMetrics2 = pgTable2("site_metrics", {
  id: serial2("id").primaryKey(),
  revenue_total: real2("revenue_total").notNull().default(0),
  projects_total: integer2("projects_total").notNull().default(0),
  clients_total: integer2("clients_total").notNull().default(0),
  satisfaction_pct: real2("satisfaction_pct").notNull().default(0),
  success_rate_pct: real2("success_rate_pct").notNull().default(0),
  updated_at: timestamp2("updated_at").notNull().defaultNow()
});
var pricingTiers2 = pgTable2("pricing_tiers", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  service_type: text2("service_type").notNull(),
  tier_name: text2("tier_name").notNull(),
  tier_level: text2("tier_level").notNull(),
  // CORE, GROWTH, ENTERPRISE
  price_min: real2("price_min").notNull(),
  price_max: real2("price_max").notNull(),
  features: text2("features").array().notNull().default(sql2`ARRAY[]::text[]`),
  service_details: json2("service_details").$type(),
  is_popular: boolean2("is_popular").default(false),
  is_active: boolean2("is_active").notNull().default(true),
  created_at: timestamp2("created_at").notNull().defaultNow(),
  updated_at: timestamp2("updated_at").notNull().defaultNow()
});
var automationRules = pgTable2("automation_rules", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  name: text2("name").notNull(),
  description: text2("description"),
  trigger_event: text2("trigger_event").notNull(),
  // contact_form_submitted, lead_score_threshold, etc.
  conditions: json2("conditions").$type().default([]),
  actions: json2("actions").$type().notNull(),
  is_active: boolean2("is_active").notNull().default(true),
  total_runs: integer2("total_runs").default(0),
  success_count: integer2("success_count").default(0),
  last_run: timestamp2("last_run"),
  created_at: timestamp2("created_at").notNull().defaultNow(),
  updated_at: timestamp2("updated_at").notNull().defaultNow()
});
var emailTemplates = pgTable2("email_templates", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  name: text2("name").notNull(),
  subject: text2("subject").notNull(),
  content: text2("content").notNull(),
  type: text2("type").notNull(),
  // welcome, follow_up, proposal, thank_you, custom
  variables: text2("variables").array().default(sql2`ARRAY[]::text[]`),
  is_active: boolean2("is_active").notNull().default(true),
  usage_count: integer2("usage_count").default(0),
  open_rate: real2("open_rate").default(0),
  click_rate: real2("click_rate").default(0),
  created_at: timestamp2("created_at").notNull().defaultNow(),
  updated_at: timestamp2("updated_at").notNull().defaultNow()
});
var leadNurturingSequences = pgTable2("lead_nurturing_sequences", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  name: text2("name").notNull(),
  description: text2("description"),
  trigger_event: text2("trigger_event").notNull(),
  steps: json2("steps").$type().notNull(),
  is_active: boolean2("is_active").notNull().default(true),
  enrolled_leads: integer2("enrolled_leads").default(0),
  completed_leads: integer2("completed_leads").default(0),
  conversion_rate: real2("conversion_rate").default(0),
  created_at: timestamp2("created_at").notNull().defaultNow(),
  updated_at: timestamp2("updated_at").notNull().defaultNow()
});
var leadNurturingEnrollments = pgTable2("lead_nurturing_enrollments", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  sequence_id: varchar2("sequence_id").notNull().references(() => leadNurturingSequences.id),
  contact_id: varchar2("contact_id").notNull().references(() => contactSubmissions2.id),
  current_step: integer2("current_step").default(0),
  status: text2("status").default("active"),
  // active, paused, completed, failed
  started_at: timestamp2("started_at").notNull().defaultNow(),
  completed_at: timestamp2("completed_at"),
  last_action_at: timestamp2("last_action_at")
});
var emailCampaigns = pgTable2("email_campaigns", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  name: text2("name").notNull(),
  subject: text2("subject").notNull(),
  content: text2("content").notNull(),
  template_id: varchar2("template_id").references(() => emailTemplates.id),
  recipient_criteria: json2("recipient_criteria").$type(),
  sent_count: integer2("sent_count").default(0),
  delivered_count: integer2("delivered_count").default(0),
  opened_count: integer2("opened_count").default(0),
  clicked_count: integer2("clicked_count").default(0),
  bounced_count: integer2("bounced_count").default(0),
  unsubscribed_count: integer2("unsubscribed_count").default(0),
  status: text2("status").default("draft"),
  // draft, sending, sent, failed
  scheduled_at: timestamp2("scheduled_at"),
  sent_at: timestamp2("sent_at"),
  created_at: timestamp2("created_at").notNull().defaultNow(),
  updated_at: timestamp2("updated_at").notNull().defaultNow()
});
var emailLogs = pgTable2("email_logs", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  contact_id: varchar2("contact_id").references(() => contactSubmissions2.id),
  template_id: varchar2("template_id").references(() => emailTemplates.id),
  campaign_id: varchar2("campaign_id").references(() => emailCampaigns.id),
  automation_rule_id: varchar2("automation_rule_id").references(() => automationRules.id),
  email: text2("email").notNull(),
  subject: text2("subject").notNull(),
  content: text2("content").notNull(),
  status: text2("status").notNull(),
  // sent, delivered, opened, clicked, bounced, failed
  provider_id: text2("provider_id"),
  // External email service provider ID
  error_message: text2("error_message"),
  opened_at: timestamp2("opened_at"),
  clicked_at: timestamp2("clicked_at"),
  bounced_at: timestamp2("bounced_at"),
  sent_at: timestamp2("sent_at").notNull().defaultNow()
});
var analytics = pgTable2("analytics", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  event_type: text2("event_type").notNull(),
  // page_view, button_click, form_submit, etc.
  page_url: text2("page_url"),
  referrer: text2("referrer"),
  user_agent: text2("user_agent"),
  ip_address: text2("ip_address"),
  session_id: text2("session_id"),
  user_id: text2("user_id"),
  event_data: json2("event_data").$type(),
  utm_source: text2("utm_source"),
  utm_medium: text2("utm_medium"),
  utm_campaign: text2("utm_campaign"),
  utm_content: text2("utm_content"),
  utm_term: text2("utm_term"),
  device_type: text2("device_type"),
  // desktop, mobile, tablet
  browser: text2("browser"),
  os: text2("os"),
  country: text2("country"),
  city: text2("city"),
  created_at: timestamp2("created_at").notNull().defaultNow()
});
var leadScoringRules = pgTable2("lead_scoring_rules", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  name: text2("name").notNull(),
  description: text2("description"),
  field: text2("field").notNull(),
  // email_domain, job_title, budget_range, etc.
  operator: text2("operator").notNull(),
  // equals, contains, greater_than, etc.
  value: text2("value").notNull(),
  points: integer2("points").notNull(),
  is_active: boolean2("is_active").notNull().default(true),
  created_at: timestamp2("created_at").notNull().defaultNow(),
  updated_at: timestamp2("updated_at").notNull().defaultNow()
});
var leadScoringHistory = pgTable2("lead_scoring_history", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  contact_id: varchar2("contact_id").notNull().references(() => contactSubmissions2.id),
  rule_id: varchar2("rule_id").references(() => leadScoringRules.id),
  points_awarded: integer2("points_awarded").notNull(),
  total_score: integer2("total_score").notNull(),
  reason: text2("reason"),
  created_at: timestamp2("created_at").notNull().defaultNow()
});
var tasks = pgTable2("tasks", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  title: text2("title").notNull(),
  description: text2("description"),
  type: text2("type").notNull(),
  // follow_up, proposal, call, meeting, etc.
  priority: text2("priority").default("MEDIUM"),
  // HIGH, MEDIUM, LOW
  status: text2("status").default("pending"),
  // pending, in_progress, completed, cancelled
  contact_id: varchar2("contact_id").references(() => contactSubmissions2.id),
  assigned_to: text2("assigned_to"),
  due_date: timestamp2("due_date"),
  completed_at: timestamp2("completed_at"),
  automation_rule_id: varchar2("automation_rule_id").references(() => automationRules.id),
  created_at: timestamp2("created_at").notNull().defaultNow(),
  updated_at: timestamp2("updated_at").notNull().defaultNow()
});
var notifications = pgTable2("notifications", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  title: text2("title").notNull(),
  message: text2("message").notNull(),
  type: text2("type").notNull(),
  // info, success, warning, error
  channel: text2("channel").notNull(),
  // email, slack, webhook, in_app
  recipient: text2("recipient").notNull(),
  contact_id: varchar2("contact_id").references(() => contactSubmissions2.id),
  automation_rule_id: varchar2("automation_rule_id").references(() => automationRules.id),
  status: text2("status").default("pending"),
  // pending, sent, failed
  sent_at: timestamp2("sent_at"),
  error_message: text2("error_message"),
  created_at: timestamp2("created_at").notNull().defaultNow()
});
var webhooks = pgTable2("webhooks", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  name: text2("name").notNull(),
  url: text2("url").notNull(),
  events: text2("events").array().notNull(),
  // contact_created, lead_scored, etc.
  secret: text2("secret"),
  is_active: boolean2("is_active").notNull().default(true),
  last_triggered: timestamp2("last_triggered"),
  success_count: integer2("success_count").default(0),
  failure_count: integer2("failure_count").default(0),
  created_at: timestamp2("created_at").notNull().defaultNow(),
  updated_at: timestamp2("updated_at").notNull().defaultNow()
});
var integrations = pgTable2("integrations", {
  id: varchar2("id").primaryKey().default(sql2`gen_random_uuid()`),
  name: text2("name").notNull(),
  type: text2("type").notNull(),
  // email_provider, crm, calendar, slack, etc.
  provider: text2("provider").notNull(),
  // sendgrid, mailchimp, hubspot, calendly, etc.
  config: json2("config").$type().notNull(),
  is_active: boolean2("is_active").notNull().default(true),
  last_sync: timestamp2("last_sync"),
  created_at: timestamp2("created_at").notNull().defaultNow(),
  updated_at: timestamp2("updated_at").notNull().defaultNow()
});
var insertProjectSchema2 = z2.object({
  title: z2.string().min(1),
  slug: z2.string().min(1),
  year: z2.number().int(),
  client_name: z2.string().nullable().optional(),
  categories: z2.array(z2.string()).optional(),
  technologies: z2.array(z2.string()).optional(),
  description: z2.string().nullable().optional(),
  long_description: z2.string().nullable().optional(),
  image_url: z2.string().nullable().optional(),
  gallery_urls: z2.array(z2.string()).optional(),
  live_url: z2.string().nullable().optional(),
  github_url: z2.string().nullable().optional(),
  metrics: z2.record(z2.any()).optional(),
  testimonial: z2.object({
    content: z2.string(),
    author: z2.string(),
    position: z2.string(),
    company: z2.string()
  }).optional(),
  is_featured: z2.boolean().optional(),
  published: z2.boolean().optional()
});
var insertAdvancedContactSubmissionSchema = z2.object({
  name: z2.string().min(1),
  email: z2.string().email(),
  company: z2.string().nullable().optional(),
  job_title: z2.string().optional(),
  phone: z2.string().nullable().optional(),
  website: z2.string().nullable().optional(),
  message: z2.string().min(1),
  project_type: z2.string().optional(),
  service_interest: z2.string().optional(),
  budget_range: z2.string().optional(),
  timeline: z2.string().optional(),
  urgency: z2.string().optional(),
  primary_goal: z2.string().optional(),
  current_challenges: z2.string().optional(),
  target_audience: z2.string().optional(),
  success_metrics: z2.string().optional(),
  competitor_analysis: z2.string().optional(),
  hear_about_us: z2.string().optional(),
  referral_source: z2.string().optional(),
  additional_info: z2.string().optional(),
  lead_score: z2.number().optional(),
  lead_priority: z2.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
  status: z2.string().optional(),
  source: z2.string().optional(),
  utm_source: z2.string().optional(),
  utm_medium: z2.string().optional(),
  utm_campaign: z2.string().optional()
});
var insertAutomationRuleSchema = z2.object({
  name: z2.string().min(1),
  description: z2.string().optional(),
  trigger_event: z2.string().min(1),
  conditions: z2.array(z2.object({
    field: z2.string(),
    operator: z2.string(),
    value: z2.string()
  })).optional(),
  actions: z2.array(z2.object({
    type: z2.string(),
    config: z2.record(z2.any())
  })),
  is_active: z2.boolean().optional()
});
var insertEmailTemplateSchema = z2.object({
  name: z2.string().min(1),
  subject: z2.string().min(1),
  content: z2.string().min(1),
  type: z2.enum(["welcome", "follow_up", "proposal", "thank_you", "custom"]),
  variables: z2.array(z2.string()).optional(),
  is_active: z2.boolean().optional()
});
var insertAnalyticsEventSchema = z2.object({
  event_type: z2.string().min(1),
  page_url: z2.string().optional(),
  referrer: z2.string().optional(),
  user_agent: z2.string().optional(),
  ip_address: z2.string().optional(),
  session_id: z2.string().optional(),
  user_id: z2.string().optional(),
  event_data: z2.record(z2.any()).optional(),
  utm_source: z2.string().optional(),
  utm_medium: z2.string().optional(),
  utm_campaign: z2.string().optional(),
  utm_content: z2.string().optional(),
  utm_term: z2.string().optional(),
  device_type: z2.enum(["desktop", "mobile", "tablet"]).optional(),
  browser: z2.string().optional(),
  os: z2.string().optional(),
  country: z2.string().optional(),
  city: z2.string().optional()
});

// server/routes/enhanced-api.ts
var router = express.Router();
var supabase2 = createClient2(
  env.SUPABASE_URL || "",
  env.SUPABASE_ANON_KEY || ""
);
var db = {
  contactSubmissions: {
    async create(data) {
      const { data: result, error } = await supabase2.from("contact_submissions").insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async findMany(filters = {}) {
      let query = supabase2.from("contact_submissions").select("*");
      if (filters.status) query = query.eq("status", filters.status);
      if (filters.lead_priority) query = query.eq("lead_priority", filters.lead_priority);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
      }
      if (filters.limit) query = query.limit(filters.limit);
      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }
      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async update(id, data) {
      const { data: result, error } = await supabase2.from("contact_submissions").update({ ...data, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id).select().single();
      if (error) throw error;
      return result;
    },
    async count(filters = {}) {
      let query = supabase2.from("contact_submissions").select("*", { count: "exact", head: true });
      if (filters.status) query = query.eq("status", filters.status);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
      }
      const { count, error } = await query;
      if (error) throw error;
      return count || 0;
    }
  },
  automationRules: {
    async findMany() {
      const { data, error } = await supabase2.from("automation_rules").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async create(data) {
      const { data: result, error } = await supabase2.from("automation_rules").insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async update(id, data) {
      const { data: result, error } = await supabase2.from("automation_rules").update({ ...data, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id).select().single();
      if (error) throw error;
      return result;
    },
    async delete(id) {
      const { error } = await supabase2.from("automation_rules").delete().eq("id", id);
      if (error) throw error;
    }
  },
  emailTemplates: {
    async findMany() {
      const { data, error } = await supabase2.from("email_templates").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async create(data) {
      const { data: result, error } = await supabase2.from("email_templates").insert(data).select().single();
      if (error) throw error;
      return result;
    },
    async update(id, data) {
      const { data: result, error } = await supabase2.from("email_templates").update({ ...data, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id).select().single();
      if (error) throw error;
      return result;
    }
  },
  tasks: {
    async findMany(filters = {}) {
      let query = supabase2.from("tasks").select("*");
      if (filters.status) query = query.eq("status", filters.status);
      if (filters.priority) query = query.eq("priority", filters.priority);
      if (filters.assigned_to) query = query.eq("assigned_to", filters.assigned_to);
      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async create(data) {
      const { data: result, error } = await supabase2.from("tasks").insert(data).select().single();
      if (error) throw error;
      return result;
    }
  },
  analytics: {
    async create(data) {
      const { data: result, error } = await supabase2.from("analytics").insert(data).select().single();
      if (error) throw error;
      return result;
    }
  }
};
router.post("/contacts/advanced", async (req, res) => {
  try {
    const validatedData = insertAdvancedContactSubmissionSchema.parse(req.body);
    const leadScore = await calculateLeadScore(validatedData);
    const contact = await db.contactSubmissions.create({
      ...validatedData,
      lead_score: leadScore,
      lead_priority: leadScore >= 80 ? "HIGH" : leadScore >= 50 ? "MEDIUM" : "LOW",
      source: "advanced_lead_form"
    });
    await triggerAutomationRules("contact_form_submitted", contact);
    res.json({ success: true, data: contact });
  } catch (error) {
    console.error("Error creating advanced contact:", error);
    res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
  }
});
router.get("/contacts", async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const filters = {
      status,
      lead_priority: priority,
      search,
      limit: Number(limit),
      offset
    };
    const contacts = await db.contactSubmissions.findMany(filters);
    const total = await db.contactSubmissions.count(filters);
    res.json({
      data: contacts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});
router.put("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const contact = await db.contactSubmissions.update(id, updates);
    res.json({ success: true, data: contact });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Failed to update contact" });
  }
});
router.get("/automation/rules", async (req, res) => {
  try {
    const rules = await db.automationRules.findMany();
    res.json({ data: rules });
  } catch (error) {
    console.error("Error fetching automation rules:", error);
    res.status(500).json({ error: "Failed to fetch automation rules" });
  }
});
router.post("/automation/rules", async (req, res) => {
  try {
    const validatedData = insertAutomationRuleSchema.parse(req.body);
    const rule = await db.automationRules.create(validatedData);
    res.json({ success: true, data: rule });
  } catch (error) {
    console.error("Error creating automation rule:", error);
    res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
  }
});
router.put("/automation/rules/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const rule = await db.automationRules.update(id, updates);
    res.json({ success: true, data: rule });
  } catch (error) {
    console.error("Error updating automation rule:", error);
    res.status(500).json({ error: "Failed to update automation rule" });
  }
});
router.delete("/automation/rules/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.automationRules.delete(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting automation rule:", error);
    res.status(500).json({ error: "Failed to delete automation rule" });
  }
});
router.get("/email/templates", async (req, res) => {
  try {
    const templates = await db.emailTemplates.findMany();
    res.json({ data: templates });
  } catch (error) {
    console.error("Error fetching email templates:", error);
    res.status(500).json({ error: "Failed to fetch email templates" });
  }
});
router.post("/email/templates", async (req, res) => {
  try {
    const validatedData = insertEmailTemplateSchema.parse(req.body);
    const template = await db.emailTemplates.create(validatedData);
    res.json({ success: true, data: template });
  } catch (error) {
    console.error("Error creating email template:", error);
    res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
  }
});
router.put("/email/templates/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const template = await db.emailTemplates.update(id, updates);
    res.json({ success: true, data: template });
  } catch (error) {
    console.error("Error updating email template:", error);
    res.status(500).json({ error: "Failed to update email template" });
  }
});
router.post("/analytics/events", async (req, res) => {
  try {
    const validatedData = insertAnalyticsEventSchema.parse(req.body);
    const event = await db.analytics.create(validatedData);
    res.json({ success: true, data: event });
  } catch (error) {
    console.error("Error creating analytics event:", error);
    res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
  }
});
router.get("/analytics/overview", async (req, res) => {
  try {
    const overview = {
      pageViews: { count: 1250, unique_sessions: 892 },
      contactSubmissions: 47,
      conversionRate: 3.76,
      trafficSources: [
        { source: "google", count: 580 },
        { source: "direct", count: 312 },
        { source: "linkedin", count: 89 },
        { source: "twitter", count: 45 }
      ],
      deviceBreakdown: [
        { device: "desktop", count: 721 },
        { device: "mobile", count: 432 },
        { device: "tablet", count: 97 }
      ]
    };
    res.json(overview);
  } catch (error) {
    console.error("Error fetching analytics overview:", error);
    res.status(500).json({ error: "Failed to fetch analytics overview" });
  }
});
router.get("/analytics/performance", async (req, res) => {
  try {
    const performanceData = {
      dailyMetrics: [
        { date: "2024-01-01", page_views: 180, unique_visitors: 125, contact_forms: 3 },
        { date: "2024-01-02", page_views: 195, unique_visitors: 138, contact_forms: 5 },
        { date: "2024-01-03", page_views: 167, unique_visitors: 119, contact_forms: 2 },
        { date: "2024-01-04", page_views: 203, unique_visitors: 152, contact_forms: 7 },
        { date: "2024-01-05", page_views: 189, unique_visitors: 142, contact_forms: 4 }
      ],
      topPages: [
        { page: "/", views: 423 },
        { page: "/portfolio", views: 287 },
        { page: "/services", views: 198 },
        { page: "/about", views: 156 },
        { page: "/contact", views: 134 }
      ],
      bounceRate: 42.3,
      totalSessions: 892
    };
    res.json(performanceData);
  } catch (error) {
    console.error("Error fetching performance analytics:", error);
    res.status(500).json({ error: "Failed to fetch performance analytics" });
  }
});
router.get("/analytics/business", async (req, res) => {
  try {
    const { data: leadFunnelData } = await supabase2.from("contact_submissions").select("status");
    const leadFunnel = (leadFunnelData || []).reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    const leadFunnelArray = Object.entries(leadFunnel).map(([status, count]) => ({ status, count }));
    const { data: siteMetrics3 } = await supabase2.from("site_metrics").select("*").order("updated_at", { ascending: false }).limit(1).single();
    const leadScoreDistribution = [
      { score_range: "80-100", count: 5 },
      { score_range: "60-79", count: 12 },
      { score_range: "40-59", count: 18 },
      { score_range: "20-39", count: 8 },
      { score_range: "0-19", count: 3 }
    ];
    const monthlyGrowth = [
      { month: "2024-01", leads: 15 },
      { month: "2024-02", leads: 22 },
      { month: "2024-03", leads: 18 },
      { month: "2024-04", leads: 28 },
      { month: "2024-05", leads: 35 }
    ];
    res.json({
      leadFunnel: leadFunnelArray,
      revenue: siteMetrics3 || { revenue_total: 0, projects_total: 0, clients_total: 0 },
      leadScoreDistribution,
      monthlyGrowth
    });
  } catch (error) {
    console.error("Error fetching business metrics:", error);
    res.status(500).json({ error: "Failed to fetch business metrics" });
  }
});
router.get("/tasks", async (req, res) => {
  try {
    const { status, priority, assigned_to } = req.query;
    const filters = { status, priority, assigned_to };
    const tasks2 = await db.tasks.findMany(filters);
    res.json({ data: tasks2 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});
router.post("/tasks", async (req, res) => {
  try {
    const task = await db.tasks.create(req.body);
    res.json({ success: true, data: task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});
async function calculateLeadScore(contactData) {
  let score = 0;
  if (contactData.budget_range) {
    switch (contactData.budget_range) {
      case "$50,000+":
        score += 30;
        break;
      case "$25,000 - $49,999":
        score += 25;
        break;
      case "$10,000 - $24,999":
        score += 20;
        break;
      case "$5,000 - $9,999":
        score += 15;
        break;
      case "$1,000 - $4,999":
        score += 10;
        break;
      default:
        score += 5;
    }
  }
  if (contactData.job_title) {
    const title = contactData.job_title.toLowerCase();
    if (title.includes("ceo") || title.includes("founder") || title.includes("owner")) {
      score += 20;
    } else if (title.includes("director") || title.includes("manager") || title.includes("head")) {
      score += 15;
    } else if (title.includes("vp") || title.includes("vice president")) {
      score += 18;
    }
  }
  if (contactData.urgency) {
    switch (contactData.urgency) {
      case "ASAP":
        score += 20;
        break;
      case "Within 1 month":
        score += 15;
        break;
      case "Within 3 months":
        score += 10;
        break;
      case "Within 6 months":
        score += 5;
        break;
    }
  }
  if (contactData.project_type) {
    switch (contactData.project_type) {
      case "Full Website Development":
        score += 15;
        break;
      case "E-commerce Development":
        score += 18;
        break;
      case "Mobile App Development":
        score += 20;
        break;
      case "Custom Software":
        score += 22;
        break;
      case "Website Redesign":
        score += 12;
        break;
      default:
        score += 8;
    }
  }
  if (contactData.company) score += 10;
  if (contactData.website) score += 8;
  if (contactData.phone) score += 5;
  return Math.min(score, 100);
}
async function triggerAutomationRules(event, contactData) {
  try {
    console.log(`Automation triggered for event: ${event}`, contactData);
    if (event === "contact_form_submitted") {
      await db.tasks.create({
        title: `Follow up with ${contactData.name}`,
        description: `New lead from ${contactData.source || "contact form"}. Lead score: ${contactData.lead_score}`,
        type: "follow_up",
        priority: contactData.lead_score >= 80 ? "HIGH" : contactData.lead_score >= 50 ? "MEDIUM" : "LOW",
        contact_id: contactData.id,
        due_date: new Date(Date.now() + 24 * 60 * 60 * 1e3).toISOString()
      });
    }
  } catch (error) {
    console.error("Error triggering automation rules:", error);
  }
}
var enhanced_api_default = router;

// server/routes.ts
var projectQuerySchema = z3.object({
  published: z3.string().optional().transform((val) => val !== "false"),
  featured: z3.string().optional().transform((val) => val === "true"),
  limit: z3.string().optional().transform((val) => val ? parseInt(val, 10) : void 0),
  offset: z3.string().optional().transform((val) => val ? parseInt(val, 10) : void 0)
});
var slugParamSchema = z3.object({
  slug: z3.string().min(1).max(100).regex(/^[a-z0-9-]+$/, "Invalid slug format")
});
function sanitizeString(input) {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").trim();
}
async function registerRoutes(app2) {
  app2.use("/api/enhanced", enhanced_api_default);
  app2.get("/api/projects", async (req, res) => {
    try {
      const validationResult = projectQuerySchema.safeParse(req.query);
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({
          error: "Invalid query parameters",
          details: validationError.message
        });
      }
      const { published, featured, limit, offset } = validationResult.data;
      const projects3 = await supabaseStorage.projects.getAll({
        published,
        featured
      });
      res.json({
        success: true,
        data: projects3,
        count: projects3.length
      });
    } catch (error) {
      console.error("Projects API error:", error);
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({
          error: "Database error",
          message: env.NODE_ENV === "development" ? error.message : "Failed to fetch projects"
        });
      }
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });
  app2.get("/api/projects/featured", async (_req, res) => {
    try {
      const projects3 = await supabaseStorage.projects.getAll({
        published: true,
        featured: true
      });
      res.json(projects3.slice(0, 3));
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch featured projects" });
    }
  });
  app2.get("/api/projects/:slug", async (req, res) => {
    try {
      const project = await supabaseStorage.projects.getBySlug(req.params.slug);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });
  app2.get("/api/services", async (req, res) => {
    try {
      const featured = req.query.featured === "true" ? true : void 0;
      const category = req.query.category;
      const services3 = await supabaseStorage.services.getAll({
        featured,
        category
      });
      res.json(services3);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });
  app2.get("/api/services/featured", async (_req, res) => {
    try {
      const services3 = await supabaseStorage.services.getAll({ featured: true });
      res.json(services3);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch featured services" });
    }
  });
  app2.get("/api/metrics", async (_req, res) => {
    try {
      const metrics = await supabaseStorage.siteMetrics.get();
      if (!metrics) {
        return res.status(404).json({ error: "Site metrics not found" });
      }
      res.json(metrics);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch site metrics" });
    }
  });
  app2.get("/api/pricing-tiers", async (req, res) => {
    try {
      const active = req.query.active !== "false";
      const serviceType = req.query.service_type;
      const tiers = await supabaseStorage.pricingTiers.getAll({
        active,
        serviceType
      });
      res.json(tiers);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch pricing tiers" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validationResult = insertContactSubmissionSchema.safeParse(req.body);
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({
          error: "Validation failed",
          details: validationError.message
        });
      }
      const sanitizedData = {
        ...validationResult.data,
        name: sanitizeString(validationResult.data.name),
        email: validationResult.data.email.toLowerCase().trim(),
        company: validationResult.data.company ? sanitizeString(validationResult.data.company) : null,
        message: sanitizeString(validationResult.data.message),
        phone: validationResult.data.phone ? sanitizeString(validationResult.data.phone) : null,
        service_interest: validationResult.data.service_interest ? sanitizeString(validationResult.data.service_interest) : void 0,
        budget_range: validationResult.data.budget_range ? sanitizeString(validationResult.data.budget_range) : void 0
      };
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+=/i,
        /eval\(/i,
        /document\./i,
        /window\./i
      ];
      const textFields = [sanitizedData.name, sanitizedData.message, sanitizedData.company];
      const hasSuspiciousContent = textFields.some(
        (field) => field && suspiciousPatterns.some((pattern) => pattern.test(field))
      );
      if (hasSuspiciousContent) {
        return res.status(400).json({
          error: "Invalid content detected",
          message: "Please remove any script content from your submission."
        });
      }
      const submission = await supabaseStorage.contactSubmissions.create(sanitizedData);
      res.json({ success: true, data: submission });
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });
  app2.get("/api/contact-submissions", async (req, res) => {
    try {
      const status = req.query.status;
      const submissions = await supabaseStorage.contactSubmissions.getAll({
        status
      });
      res.json(submissions);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/index.ts
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express2();
if (env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
app.use(helmet({
  contentSecurityPolicy: env.NODE_ENV === "production" ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://api.supabase.co", "wss://realtime.supabase.co"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: env.NODE_ENV === "production" ? [] : null
    }
  } : false,
  crossOriginEmbedderPolicy: false,
  hsts: env.NODE_ENV === "production" ? {
    maxAge: 31536e3,
    includeSubDomains: true,
    preload: true
  } : false
}));
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = env.CORS_ORIGIN ? env.CORS_ORIGIN.split(",") : ["http://localhost:5173"];
  if (env.NODE_ENV === "development" || !origin || allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin || "*");
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
var limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  // configurable window
  max: env.RATE_LIMIT_MAX_REQUESTS,
  // configurable limit
  message: {
    error: "Too many requests from this IP, please try again later.",
    retryAfter: Math.ceil(env.RATE_LIMIT_WINDOW_MS / 1e3 / 60) + " minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return req.path === "/health" || !req.path.startsWith("/api");
  }
});
app.use("/api/", limiter);
app.use(express2.json({
  limit: "10mb",
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express2.urlencoded({ extended: false, limit: "10mb" }));
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
    version: process.env.npm_package_version || "2.0.0"
  });
});
registerRoutes(app);
if (env.NODE_ENV === "production") {
  const publicPath = path.join(__dirname, "..", "public");
  app.use(express2.static(publicPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}
app.use((err, req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  if (env.NODE_ENV === "development") {
    console.error(`Error ${errorId}:`, err);
    res.status(status).json({
      error: true,
      message,
      errorId,
      stack: err.stack,
      details: err
    });
  } else {
    console.error(`Error ${errorId}:`, {
      message: err.message,
      status,
      stack: err.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get("User-Agent")
    });
    res.status(status).json({
      error: true,
      message: status === 500 ? "Internal Server Error" : message,
      errorId
    });
  }
});
async function startServer() {
  try {
    const httpServer = await registerRoutes(app);
    process.on("SIGINT", () => {
      console.log("\n\u{1F6D1} Received SIGINT, shutting down gracefully...");
      httpServer.close(() => {
        console.log("\u2705 Server closed");
        process.exit(0);
      });
    });
    process.on("SIGTERM", () => {
      console.log("\n\u{1F6D1} Received SIGTERM, shutting down gracefully...");
      httpServer.close(() => {
        console.log("\u2705 Server closed");
        process.exit(0);
      });
    });
    httpServer.listen(env.PORT, "0.0.0.0", () => {
      console.log(`\u{1F680} Server running on http://0.0.0.0:${env.PORT}`);
      console.log(`\u{1F4CA} Environment: ${env.NODE_ENV}`);
      console.log(`\u{1F3D7}\uFE0F  Platform: ${env.DEPLOYMENT_PLATFORM}`);
      console.log(`\u{1F4BE} Database: ${env.SUPABASE_URL ? "Supabase" : "Not configured"}`);
      console.log(`\u{1F517} Health check: http://0.0.0.0:${env.PORT}/health`);
    });
  } catch (error) {
    console.error("\u274C Failed to start server:", error);
    process.exit(1);
  }
}
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
var index_default = app;
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
