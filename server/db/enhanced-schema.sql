-- Enhanced schema for Nexus Creative Studio
-- Updated metrics and content management system

-- Agency metrics table (for real-time metrics display)
CREATE TABLE IF NOT EXISTS agency_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name VARCHAR(100) NOT NULL,
  metric_value NUMERIC NOT NULL,
  metric_formatted VARCHAR(50),
  metric_description TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Site content management table
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key VARCHAR(255) NOT NULL UNIQUE,
  content_value JSONB NOT NULL,
  content_type VARCHAR(50) NOT NULL, -- 'page', 'component', 'seo', 'microcopy'
  page_name VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enhanced contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  project_type VARCHAR(100),
  budget_range VARCHAR(50),
  timeline VARCHAR(50),
  message TEXT NOT NULL,
  source VARCHAR(100) DEFAULT 'website',
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  lead_priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, proposal, closed_won, closed_lost
  assigned_to VARCHAR(255),
  notes TEXT,
  follow_up_date TIMESTAMP WITH TIME ZONE,
  estimated_value NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects table for portfolio management
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  client_name VARCHAR(255),
  client_company VARCHAR(255),
  project_type VARCHAR(100), -- web-app, mobile-app, blockchain, design, consulting
  technologies JSONB, -- Array of technologies used
  status VARCHAR(50) DEFAULT 'active', -- planning, active, completed, on_hold, cancelled
  start_date DATE,
  end_date DATE,
  budget NUMERIC,
  actual_cost NUMERIC,
  team_members JSONB, -- Array of team member objects
  testimonial TEXT,
  testimonial_author VARCHAR(255),
  testimonial_rating INTEGER CHECK (testimonial_rating >= 1 AND testimonial_rating <= 5),
  case_study_data JSONB, -- Challenge, solution, results, metrics
  featured_image_url TEXT,
  gallery_images JSONB, -- Array of image URLs
  external_links JSONB, -- Live site, repository, etc.
  seo_title VARCHAR(255),
  seo_description TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Services table for dynamic service management
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT,
  long_description TEXT,
  features JSONB, -- Array of feature objects
  pricing_model VARCHAR(50), -- fixed, hourly, project, retainer
  starting_price NUMERIC,
  price_description TEXT,
  delivery_time VARCHAR(100),
  included_items JSONB, -- Array of included items
  add_ons JSONB, -- Array of add-on services
  category VARCHAR(100), -- development, design, consulting, automation
  subcategory VARCHAR(100),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255),
  bio TEXT,
  skills JSONB, -- Array of skills
  experience_years INTEGER,
  profile_image_url TEXT,
  social_links JSONB, -- LinkedIn, Twitter, GitHub, etc.
  is_founder BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR(255) NOT NULL,
  client_title VARCHAR(255),
  client_company VARCHAR(255),
  testimonial TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  project_id UUID REFERENCES projects(id),
  service_type VARCHAR(100),
  client_avatar_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts table for content marketing
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES team_members(id),
  featured_image_url TEXT,
  tags JSONB, -- Array of tags
  category VARCHAR(100),
  read_time_minutes INTEGER,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords JSONB,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Analytics tracking table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL, -- page_view, form_submit, download, etc.
  page_path VARCHAR(500),
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  session_id VARCHAR(255),
  user_id VARCHAR(255),
  metadata JSONB, -- Additional event data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Email templates for automation
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  html_content TEXT,
  text_content TEXT,
  template_variables JSONB, -- Variables that can be replaced
  category VARCHAR(100), -- welcome, follow_up, proposal, etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Automation rules for lead management
CREATE TABLE IF NOT EXISTS automation_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  trigger_event VARCHAR(100), -- form_submit, status_change, date_based
  trigger_conditions JSONB,
  actions JSONB, -- Array of actions to perform
  is_active BOOLEAN DEFAULT true,
  last_triggered TIMESTAMP WITH TIME ZONE,
  trigger_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tasks/todos for project management
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  project_id UUID REFERENCES projects(id),
  contact_id UUID REFERENCES contact_submissions(id),
  assigned_to VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, completed, cancelled
  priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  estimated_hours NUMERIC,
  actual_hours NUMERIC,
  tags JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Ecosystem brands table
CREATE TABLE IF NOT EXISTS ecosystem_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  tagline VARCHAR(255),
  description TEXT,
  logo_url TEXT,
  brand_color VARCHAR(7), -- Hex color
  accent_color VARCHAR(7),
  specialization TEXT,
  target_audience TEXT,
  key_services JSONB,
  metrics JSONB, -- Brand-specific metrics
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_is_public ON projects(is_public);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_site_content_content_key ON site_content(content_key);
CREATE INDEX IF NOT EXISTS idx_agency_metrics_metric_name ON agency_metrics(metric_name);

-- Insert initial agency metrics
INSERT INTO agency_metrics (metric_name, metric_value, metric_formatted, metric_description) VALUES
  ('projects_total', 20, '20+', 'Total projects delivered'),
  ('clients_total', 13, '13+', 'Total clients served'),
  ('revenue_total', 13000, '$13K+', 'Total revenue generated'),
  ('satisfaction_pct', 100, '100%', 'Client satisfaction percentage'),
  ('founded_year', 2024, '2024', 'Year company was founded')
ON CONFLICT (metric_name) DO UPDATE SET
  metric_value = EXCLUDED.metric_value,
  metric_formatted = EXCLUDED.metric_formatted,
  last_updated = CURRENT_TIMESTAMP;

-- Insert ecosystem brands
INSERT INTO ecosystem_brands (name, slug, tagline, description, specialization) VALUES
  ('Nexus Creative Studio', 'nexus-studio', 'Full-Stack Digital Solutions', 'Main agency hub delivering comprehensive digital solutions', 'Web development, AI integration, digital strategy'),
  ('Crypto Nexus', 'crypto-nexus', 'Web3 & Blockchain Development', 'Specialized blockchain and DeFi solutions', 'Smart contracts, DeFi protocols, Web3 applications'),
  ('Byte Studio', 'byte-studio', 'Design & MVP Development', 'Design-focused rapid prototyping and MVP creation', 'UI/UX design, MVP development, user research'),
  ('Founder Hub', 'founder-hub', 'Strategic Leadership & Consulting', 'Direct access to founder expertise and strategic guidance', 'Technical leadership, strategic consulting, mentorship')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  specialization = EXCLUDED.specialization,
  updated_at = CURRENT_TIMESTAMP;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_team_members_updated_at ON team_members;
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_email_templates_updated_at ON email_templates;
CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON email_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_automation_rules_updated_at ON automation_rules;
CREATE TRIGGER update_automation_rules_updated_at BEFORE UPDATE ON automation_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ecosystem_brands_updated_at ON ecosystem_brands;
CREATE TRIGGER update_ecosystem_brands_updated_at BEFORE UPDATE ON ecosystem_brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_content_updated_at ON site_content;
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_agency_metrics_updated_at ON agency_metrics;
CREATE TRIGGER update_agency_metrics_updated_at BEFORE UPDATE ON agency_metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();