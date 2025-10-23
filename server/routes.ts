import type { Express } from "express";
import { createServer, type Server } from "http";
import { supabaseStorage, SupabaseStorageError } from "./supabase-storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";
import { env } from "./env";
import enhancedApiRoutes from "./routes/enhanced-api.js";

// Input validation schemas
const projectQuerySchema = z.object({
  published: z.string().optional().transform(val => val !== 'false'),
  featured: z.string().optional().transform(val => val === 'true'),
  limit: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
  offset: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
});

const slugParamSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
});

// Sanitization helper
function sanitizeString(input: string): string {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+=/gi, '')
              .trim();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Register enhanced API routes
  app.use("/api/enhanced", enhancedApiRoutes);

  app.get("/api/projects", async (req, res) => {
    try {
      const validationResult = projectQuerySchema.safeParse(req.query);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error as any);
        return res.status(400).json({ 
          error: 'Invalid query parameters', 
          details: validationError.message 
        });
      }

      const { published, featured, limit, offset } = validationResult.data;
      
      const projects = await supabaseStorage.projects.getAll({ 
        published, 
        featured
      });
      
      res.json({
        success: true,
        data: projects,
        count: projects.length
      });
    } catch (error) {
      console.error('Projects API error:', error);
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ 
          error: 'Database error',
          message: env.NODE_ENV === 'development' ? error.message : 'Failed to fetch projects'
        });
      }
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  app.get("/api/projects/featured", async (_req, res) => {
    try {
      const projects = await supabaseStorage.projects.getAll({ 
        published: true, 
        featured: true 
      });
      
      res.json(projects.slice(0, 3));
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to fetch featured projects' });
    }
  });

  app.get("/api/projects/:slug", async (req, res) => {
    try {
      const project = await supabaseStorage.projects.getBySlug(req.params.slug);
      
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      
      res.json(project);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  });

  app.get("/api/services", async (req, res) => {
    try {
      const featured = req.query.featured === 'true' ? true : undefined;
      const category = req.query.category as string | undefined;
      
      const services = await supabaseStorage.services.getAll({ 
        featured, 
        category 
      });
      
      res.json(services);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  });

  app.get("/api/services/featured", async (_req, res) => {
    try {
      const services = await supabaseStorage.services.getAll({ featured: true });
      res.json(services);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to fetch featured services' });
    }
  });

  app.get("/api/metrics", async (_req, res) => {
    try {
      const metrics = await supabaseStorage.siteMetrics.get();
      
      if (!metrics) {
        return res.status(404).json({ error: 'Site metrics not found' });
      }
      
      res.json(metrics);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to fetch site metrics' });
    }
  });

  app.get("/api/pricing-tiers", async (req, res) => {
    try {
      const active = req.query.active !== 'false';
      const serviceType = req.query.service_type as string | undefined;
      
      const tiers = await supabaseStorage.pricingTiers.getAll({ 
        active, 
        serviceType 
      });
      
      res.json(tiers);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to fetch pricing tiers' });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      // Input validation
      const validationResult = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error as any);
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: validationError.message 
        });
      }

      // Sanitize input data
      const sanitizedData = {
        ...validationResult.data,
        name: sanitizeString(validationResult.data.name),
        email: validationResult.data.email.toLowerCase().trim(),
        company: validationResult.data.company ? sanitizeString(validationResult.data.company) : null,
        message: sanitizeString(validationResult.data.message),
        phone: validationResult.data.phone ? sanitizeString(validationResult.data.phone) : null,
        service_interest: validationResult.data.service_interest ? sanitizeString(validationResult.data.service_interest) : undefined,
        budget_range: validationResult.data.budget_range ? sanitizeString(validationResult.data.budget_range) : undefined,
      };

      // Additional security checks
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+=/i,
        /eval\(/i,
        /document\./i,
        /window\./i
      ];

      const textFields = [sanitizedData.name, sanitizedData.message, sanitizedData.company];
      const hasSuspiciousContent = textFields.some(field => 
        field && suspiciousPatterns.some(pattern => pattern.test(field))
      );

      if (hasSuspiciousContent) {
        return res.status(400).json({ 
          error: 'Invalid content detected',
          message: 'Please remove any script content from your submission.'
        });
      }

      const submission = await supabaseStorage.contactSubmissions.create(sanitizedData);
      
      res.json({ success: true, data: submission });
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to submit contact form' });
    }
  });

  app.get("/api/contact-submissions", async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      
      const submissions = await supabaseStorage.contactSubmissions.getAll({ 
        status 
      });
      
      res.json(submissions);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to fetch contact submissions' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
