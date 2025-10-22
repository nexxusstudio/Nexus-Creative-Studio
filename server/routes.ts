import type { Express } from "express";
import { createServer, type Server } from "http";
import { supabaseStorage, SupabaseStorageError } from "./supabase-storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/projects", async (req, res) => {
    try {
      const published = req.query.published !== 'false';
      const featured = req.query.featured === 'true' ? true : undefined;
      
      const projects = await supabaseStorage.projects.getAll({ 
        published, 
        featured 
      });
      
      res.json(projects);
    } catch (error) {
      if (error instanceof SupabaseStorageError) {
        return res.status(500).json({ error: error.message });
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
      const validationResult = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: validationError.message 
        });
      }

      const submission = await supabaseStorage.contactSubmissions.create(
        validationResult.data
      );
      
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
