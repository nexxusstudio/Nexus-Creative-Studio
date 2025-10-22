-- Nexus Creative Studio Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Brands Table
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  tagline TEXT,
  metrics JSONB DEFAULT '{}',
  social_links JSONB DEFAULT '{}',
  color_primary TEXT,
  color_secondary TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_brands_slug ON brands(slug);
CREATE INDEX IF NOT EXISTS idx_brands_active ON brands(is_active);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price_base DECIMAL(10,2),
  price_complexity_multiplier JSONB DEFAULT '{"simple": 1.0, "standard": 1.5, "complex": 2.0}',
  features TEXT[],
  deliverables TEXT[],
  timeline_days INTEGER,
  icon_name TEXT,
  is_featured BOOLEAN DEFAULT false,
  brand_id UUID REFERENCES brands(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(is_featured);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  year INTEGER NOT NULL,
  client_name TEXT,
  categories TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  case_study_url TEXT,
  cover_image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  excerpt TEXT,
  description TEXT,
  metrics JSONB DEFAULT '{}',
  testimonial JSONB,
  brand_id UUID REFERENCES brands(id),
  service_id UUID REFERENCES services(id),
  is_featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year DESC);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);

-- Site Metrics Table (Singleton)
CREATE TABLE IF NOT EXISTS site_metrics (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  revenue_total DECIMAL(12,2) DEFAULT 0,
  projects_total INTEGER DEFAULT 0,
  clients_total INTEGER DEFAULT 0,
  months_in_business INTEGER DEFAULT 0,
  satisfaction_pct DECIMAL(5,2) DEFAULT 100.00,
  success_rate_pct DECIMAL(5,2) DEFAULT 100.00,
  quality_score DECIMAL(3,2) DEFAULT 5.00,
  active_clients INTEGER DEFAULT 0,
  repeat_clients INTEGER DEFAULT 0,
  avg_project_value DECIMAL(10,2) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  service_interest TEXT,
  budget_range TEXT,
  metadata JSONB DEFAULT '{}',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON contact_submissions(created_at DESC);

-- Row Level Security Policies
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access
DROP POLICY IF EXISTS "Public read brands" ON brands;
CREATE POLICY "Public read brands" ON brands FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read services" ON services;
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read projects" ON projects;
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Public read metrics" ON site_metrics;
CREATE POLICY "Public read metrics" ON site_metrics FOR SELECT USING (true);

-- Contact submissions: insert only
DROP POLICY IF EXISTS "Public insert submissions" ON contact_submissions;
CREATE POLICY "Public insert submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
