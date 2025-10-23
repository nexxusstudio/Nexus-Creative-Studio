// server/index.ts
import express from "express";
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
import { z as z2 } from "zod";

// server/env.ts
import { config } from "dotenv";
config();
function validateEnv() {
  const env2 = process.env.NODE_ENV || "development";
  const port = parseInt(process.env.PORT || "5000", 10);
  const rateLimitWindow = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10);
  const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10);
  if (isNaN(port)) {
    throw new Error("Invalid PORT environment variable");
  }
  if (env2 === "production") {
    const requiredVars = [
      "SUPABASE_URL",
      "SUPABASE_ANON_KEY",
      "SESSION_SECRET"
    ];
    const missingVars = requiredVars.filter((varName) => !process.env[varName]);
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables for production: ${missingVars.join(", ")}`);
    }
    if (!process.env.DATABASE_URL && !process.env.SUPABASE_URL) {
      throw new Error("Either DATABASE_URL or SUPABASE_URL must be configured for production");
    }
    if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length < 32) {
      console.warn("\u26A0\uFE0F  Warning: SESSION_SECRET should be at least 32 characters long");
    }
  }
  return {
    NODE_ENV: env2,
    PORT: port,
    DATABASE_URL: process.env.DATABASE_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    RATE_LIMIT_WINDOW_MS: rateLimitWindow,
    RATE_LIMIT_MAX_REQUESTS: rateLimitMax
  };
}
var env = validateEnv();

// server/routes.ts
var projectQuerySchema = z2.object({
  published: z2.string().optional().transform((val) => val !== "false"),
  featured: z2.string().optional().transform((val) => val === "true"),
  limit: z2.string().optional().transform((val) => val ? parseInt(val, 10) : void 0),
  offset: z2.string().optional().transform((val) => val ? parseInt(val, 10) : void 0)
});
var slugParamSchema = z2.object({
  slug: z2.string().min(1).max(100).regex(/^[a-z0-9-]+$/, "Invalid slug format")
});
function sanitizeString(input) {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").trim();
}
async function registerRoutes(app2) {
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
      const projects2 = await supabaseStorage.projects.getAll({
        published,
        featured
      });
      res.json({
        success: true,
        data: projects2,
        count: projects2.length
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
      const projects2 = await supabaseStorage.projects.getAll({
        published: true,
        featured: true
      });
      res.json(projects2.slice(0, 3));
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
      const services2 = await supabaseStorage.services.getAll({
        featured,
        category
      });
      res.json(services2);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });
  app2.get("/api/services/featured", async (_req, res) => {
    try {
      const services2 = await supabaseStorage.services.getAll({ featured: true });
      res.json(services2);
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
var app = express();
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
app.use(express.json({
  limit: "10mb",
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
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
  app.use(express.static(publicPath));
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
var index_default = app;
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
