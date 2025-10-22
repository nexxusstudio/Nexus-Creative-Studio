# Database Setup Instructions for Nexus Creative Studio

## 🎯 Database Status Check Results

**Issue Found**: The required database tables don't exist in your Supabase instance.

**Error**: `Could not find the table 'public.site_metrics' in the schema cache`

This indicates that the database schema needs to be created first.

---

## 🏗️ **Manual Database Setup (Recommended)**

### **Step 1: Access Supabase Dashboard**
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Open your project: `guarhoiykpmngfptntxt.supabase.co`

### **Step 2: Create Tables Using SQL Editor**
1. Click on **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Copy and paste the SQL schema from `server/db/schema.sql`
4. Click **"Run"** to execute the schema

### **Step 3: Verify Table Creation**
After running the schema, you should see these tables in the **Table Editor**:
- ✅ `brands`
- ✅ `services` 
- ✅ `projects`
- ✅ `site_metrics`
- ✅ `contact_submissions`

### **Step 4: Populate with Initial Data**
1. Run the seed script from your terminal:
   ```bash
   cd "/Users/jobayerhoquesiddique/Nexus Creative/Website/Nexus-Creative-Studio"
   npx tsx server/db/seed.ts
   ```

---

## 🔧 **Alternative: SQL Schema (Copy-Paste Ready)**

If you prefer to copy-paste the schema directly, here it is:

```sql
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

-- Site Metrics Table
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_brands_slug ON brands(slug);
CREATE INDEX IF NOT EXISTS idx_brands_active ON brands(is_active);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year DESC);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON contact_submissions(created_at DESC);

-- Row Level Security
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies
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
CREATE POLICY "Public insert submissions" ON contact_submissions 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);
```

---

## 🧪 **Testing After Setup**

Once you've created the tables, test the database:

1. **Run the seed script:**
   ```bash
   npx tsx server/db/seed.ts
   ```

2. **Test the API endpoints:**
   ```bash
   curl http://127.0.0.1:3002/api/metrics
   curl http://127.0.0.1:3002/api/projects
   curl http://127.0.0.1:3002/api/services
   ```

3. **Test contact form:**
   ```bash
   curl -X POST http://127.0.0.1:3002/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "Test",
       "lastName": "User",
       "email": "test@example.com",
       "company": "Test Company",
       "message": "Database test message"
     }'
   ```

---

## 📊 **Expected Results After Setup**

### **Tables Created:**
- **brands**: Nexus Creative Studio, Crypto Nexus, Byte Studio, Founder profile
- **services**: 4 main services with pricing and features
- **projects**: 6 sample projects with metrics
- **site_metrics**: Overall business metrics
- **contact_submissions**: Contact form data storage

### **API Endpoints Working:**
- ✅ `GET /api/metrics` - Business metrics
- ✅ `GET /api/projects` - Project portfolio
- ✅ `GET /api/services` - Service offerings
- ✅ `POST /api/contact` - Contact form submissions

### **Website Features:**
- ✅ Dynamic metrics display
- ✅ Project portfolio loading
- ✅ Service information
- ✅ Contact form submissions

---

## 🚀 **Next Steps**

1. **Create the database schema** using Supabase Dashboard
2. **Run the seed script** to populate initial data
3. **Test all API endpoints** to verify functionality
4. **Check the website** to see dynamic content loading

**Status**: Ready to proceed with database setup! 🎯