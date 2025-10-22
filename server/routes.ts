import type { Express } from "express";
import { createServer, type Server } from "http";
import { supabase } from "@shared/supabase";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all brands
  app.get("/api/brands", async (_req, res) => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  // Get single brand
  app.get("/api/brands/:slug", async (req, res) => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('slug', req.params.slug)
      .single();
    
    if (error) return res.status(404).json({ error: 'Brand not found' });
    res.json(data);
  });

  // Get all services
  app.get("/api/services", async (_req, res) => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('title');
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  // Get featured services
  app.get("/api/services/featured", async (_req, res) => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_featured', true)
      .order('title');
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  // Get all projects
  app.get("/api/projects", async (_req, res) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('year', { ascending: false });
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  // Get featured projects
  app.get("/api/projects/featured", async (_req, res) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_featured', true)
      .eq('published', true)
      .order('year', { ascending: false })
      .limit(3);
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  // Get single project
  app.get("/api/projects/:slug", async (req, res) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', req.params.slug)
      .single();
    
    if (error) return res.status(404).json({ error: 'Project not found' });
    res.json(data);
  });

  // Get site metrics
  app.get("/api/metrics", async (_req, res) => {
    const { data, error} = await supabase
      .from('site_metrics')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    const { name, email, company, phone, message, service_interest, budget_range } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        company,
        phone,
        message,
        service_interest,
        budget_range,
        status: 'new'
      })
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true, data });
  });

  const httpServer = createServer(app);
  return httpServer;
}
