# 🚀 Nexus Creative Studio - Vercel Deployment Guide

**Complete step-by-step deployment guide for production-ready Nexus Creative Studio**

---

## 📋 **Pre-Deployment Checklist**

### ✅ **Environment Requirements**
- [x] Node.js 18+ installed locally
- [x] Vercel CLI installed (`npm i -g vercel`)
- [x] Git repository connected to GitHub
- [x] Supabase project created and configured
- [x] All environment variables prepared

### ✅ **Local Verification**
```bash
# 1. Clone and install dependencies
git clone https://github.com/nexxusstudio/Nexus-Creative-Studio.git
cd Nexus-Creative-Studio
npm ci

# 2. Test production build locally
npm run build
npm run preview

# 3. Verify all routes work
curl http://localhost:4173
curl http://localhost:4173/api/health
```

---

## 🔧 **Step 1: Supabase Configuration**

### **Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note down:
   - Project URL: `https://your-project.supabase.co`
   - Anon Key: `eyJhbGciOi...`
   - Service Role Key: `eyJhbGciOi...`

### **Database Setup**
```sql
-- Run in Supabase SQL Editor
-- Enable Row Level Security and create necessary tables
-- (Add your schema here when implementing database features)
```

---

## 🌐 **Step 2: Vercel Deployment**

### **Option A: Deploy via Vercel CLI (Recommended)**

```bash
# 1. Login to Vercel
vercel login

# 2. Deploy to Vercel
cd Nexus-Creative-Studio
vercel

# Follow prompts:
# - Set up project: Yes
# - Link to existing project: No (for first deployment)
# - Project name: nexus-creative-studio
# - Directory: ./
# - Override settings: No

# 3. Deploy to production
vercel --prod
```

### **Option B: Deploy via Vercel Dashboard**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub: `nexxusstudio/Nexus-Creative-Studio`
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm ci`
5. Click "Deploy"

---

## 🔐 **Step 3: Environment Variables**

### **Add Environment Variables in Vercel Dashboard**

Go to: `Project Settings > Environment Variables`

**Required Variables:**
```bash
# Database Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Client Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
VITE_ENVIRONMENT=production
VITE_API_URL=/api

# Security
SESSION_SECRET=your_32_character_random_string_here
CORS_ORIGIN=https://nexus-creative-studio.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Runtime
NODE_ENV=production
```

**Optional Variables:**
```bash
# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VERCEL_ANALYTICS_ID=your_vercel_analytics_id

# Email (if implementing contact forms)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@yourdomain.com

# CMS (when ready to integrate)
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
```

### **Environment Variables via CLI**
```bash
# Add variables one by one
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add SESSION_SECRET
# ... continue for all variables

# Or import from .env file
vercel env pull .env.local
```

---

## 🔍 **Step 4: Post-Deployment Verification**

### **Test All Endpoints**
```bash
# Get your deployment URL from Vercel dashboard
export DEPLOYMENT_URL="https://nexus-creative-studio.vercel.app"

# Test main site
curl -I $DEPLOYMENT_URL

# Test health check
curl $DEPLOYMENT_URL/health

# Test API endpoints
curl -X POST $DEPLOYMENT_URL/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "message": "Test message"
  }'

# Test metrics endpoint
curl $DEPLOYMENT_URL/api/metrics
```

### **Performance Testing**
```bash
# Run Lighthouse audit
npx lighthouse $DEPLOYMENT_URL --output=html --output-path=./lighthouse-report.html

# Expected scores:
# - Performance: 90+
# - Accessibility: 95+
# - Best Practices: 90+
# - SEO: 95+
```

---

## 🛠️ **Step 5: Custom Domain Setup (Optional)**

### **Add Custom Domain**
1. Go to Vercel Project Settings > Domains
2. Add your domain: `yourdomain.com`
3. Configure DNS records as instructed by Vercel
4. Update CORS_ORIGIN environment variable:
   ```bash
   CORS_ORIGIN=https://yourdomain.com,https://nexus-creative-studio.vercel.app
   ```

### **SSL Certificate**
- Vercel automatically provisions SSL certificates
- Verify HTTPS is working: `https://yourdomain.com`

---

## 📊 **Step 6: Monitoring & Analytics**

### **Vercel Analytics**
1. Go to Project Settings > Analytics
2. Enable Vercel Analytics
3. Add `VERCEL_ANALYTICS_ID` to environment variables

### **Error Monitoring**
Consider adding error monitoring:
```bash
# Add Sentry for error tracking
npm install @sentry/nextjs

# Add environment variable
SENTRY_DSN=https://your-sentry-dsn
```

### **Performance Monitoring**
```bash
# Monitor Core Web Vitals
# Vercel automatically tracks:
# - First Contentful Paint (FCP)
# - Largest Contentful Paint (LCP)
# - Cumulative Layout Shift (CLS)
# - First Input Delay (FID)
```

---

## 🔄 **Step 7: CI/CD Pipeline**

### **Automatic Deployments**
Vercel automatically deploys when you push to GitHub:

- **Production**: Pushes to `main` branch
- **Preview**: Pushes to other branches
- **Pull Requests**: Automatic preview deployments

### **Build Hooks**
Set up build hooks for external triggers:
1. Go to Project Settings > Git
2. Create Deploy Hook
3. Use the webhook URL to trigger builds

---

## 🎯 **Step 8: CMS Integration (Future)**

### **When Ready to Add CMS**

**For Sanity CMS:**
```bash
# Install Sanity packages
npm install @sanity/client @sanity/image-url

# Add environment variables
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Initialize CMS in your app
# (Already prepared in client/src/lib/cms/)
```

**For Strapi CMS:**
```bash
# Add environment variables
STRAPI_URL=https://your-strapi-instance.com
STRAPI_API_TOKEN=your_api_token

# CMS provider is ready in client/src/lib/cms/strapi.ts
```

**For Notion API:**
```bash
# Add environment variables
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id

# CMS provider is ready in client/src/lib/cms/notion.ts
```

---

## 🚨 **Troubleshooting**

### **Common Issues**

**Build Failures:**
```bash
# Clear Vercel cache
vercel --force

# Check build logs in Vercel dashboard
# Common fixes:
# - Ensure all environment variables are set
# - Check for TypeScript errors
# - Verify dependency versions
```

**API Endpoints Not Working:**
```bash
# Check environment variables
# Verify CORS_ORIGIN includes your domain
# Check Supabase connection
# Review server logs in Vercel Functions tab
```

**Database Connection Issues:**
```bash
# Verify Supabase credentials
# Check if Supabase project is active
# Test connection locally first
# Ensure DATABASE_URL is correctly formatted
```

**Performance Issues:**
```bash
# Optimize images (use WebP format)
# Check bundle size: npm run build:analyze
# Enable Vercel Edge Caching
# Optimize database queries
```

---

## 📈 **Optimization Checklist**

### **Post-Deployment Optimizations**

**Performance:**
- [ ] Optimize images with WebP format
- [ ] Enable Edge Caching
- [ ] Implement lazy loading
- [ ] Monitor Core Web Vitals

**Security:**
- [ ] Enable Vercel Security Headers
- [ ] Set up rate limiting
- [ ] Configure proper CORS
- [ ] Regular security audits

**SEO:**
- [ ] Submit sitemap to Google Search Console
- [ ] Configure meta tags
- [ ] Set up analytics tracking
- [ ] Monitor search performance

**Monitoring:**
- [ ] Set up error tracking
- [ ] Monitor performance metrics
- [ ] Configure uptime monitoring
- [ ] Set up alerts for critical issues

---

## 🎉 **Deployment Complete!**

### **Your app is now live at:**
- **Production URL**: https://nexus-creative-studio.vercel.app
- **Custom Domain**: https://yourdomain.com (if configured)

### **Next Steps:**
1. 🎨 Customize content and branding
2. 📊 Set up analytics and monitoring
3. 🔧 Configure CMS when ready
4. 📈 Optimize performance based on real user data
5. 🚀 Scale as your business grows

### **Support Resources:**
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Project Repository**: [github.com/nexxusstudio/Nexus-Creative-Studio](https://github.com/nexxusstudio/Nexus-Creative-Studio)

---

**🚀 Your Nexus Creative Studio is now production-ready and deployed!**