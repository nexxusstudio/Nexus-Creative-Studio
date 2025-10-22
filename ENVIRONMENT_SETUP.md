# 🔐 Environment Variables Setup Guide

## 🚀 Quick Vercel Import

**Use the `.env` file in this repository to quickly import all environment variables to Vercel.**

---

## 📋 **Step-by-Step Setup**

### **1. Get Supabase Credentials**

1. Go to [supabase.com](https://supabase.com) → Your Project
2. Navigate to **Settings** → **API**
3. Copy these values:

```bash
# From API Settings page:
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Navigate to **Settings** → **Database** → **Connection String**
5. Copy the **URI** (not Transaction mode):

```bash
DATABASE_URL=postgresql://postgres.your-project-ref:your-password@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

### **2. Generate SESSION_SECRET**

Run this command in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output to `SESSION_SECRET`

### **3. Update CORS_ORIGIN**

After deploying to Vercel, update with your actual URL:

```bash
CORS_ORIGIN=https://your-app-name.vercel.app
```

---

## 🔧 **Import to Vercel**

### **Method 1: Upload .env File (Easiest)**

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Click **"Import .env"**
3. Select the `.env` file from this repository
4. Click **"Import"**
5. Fill in the placeholder values with your actual credentials

### **Method 2: Manual Entry**

Copy each variable from `.env` and add them one by one in Vercel Dashboard.

### **Method 3: Vercel CLI**

```bash
# From your project directory
vercel env add
# Follow prompts for each variable
```

---

## ✅ **Required Variables Checklist**

**Must fill these out before deploying:**

- [ ] `SUPABASE_URL` - Your Supabase project URL
- [ ] `SUPABASE_ANON_KEY` - Your Supabase anon public key
- [ ] `DATABASE_URL` - Your Supabase database connection string
- [ ] `VITE_SUPABASE_URL` - Same as SUPABASE_URL
- [ ] `VITE_SUPABASE_ANON_KEY` - Same as SUPABASE_ANON_KEY
- [ ] `SESSION_SECRET` - Generated 32+ character random string
- [ ] `CORS_ORIGIN` - Your Vercel deployment URL

**Optional but recommended:**

- [ ] `SUPABASE_SERVICE_ROLE_KEY` - For enhanced database access
- [ ] `RATE_LIMIT_WINDOW_MS` - Keep as 900000 (15 minutes)
- [ ] `RATE_LIMIT_MAX_REQUESTS` - Keep as 100

---

## 🎯 **Quick Reference Values**

```bash
# These values are already set correctly:
NODE_ENV=production
VITE_ENVIRONMENT=production
VITE_API_URL=/api
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Update CORS_ORIGIN after deployment:
CORS_ORIGIN=https://your-actual-vercel-url.vercel.app
```

---

## 🚨 **Security Notes**

1. **Never commit `.env` to Git** - It's already in `.gitignore`
2. **Use different values for development and production**
3. **Regenerate SESSION_SECRET** if compromised
4. **Keep Supabase service role key secure** - only use for server-side operations

---

## 🔄 **After Deployment**

1. Update `CORS_ORIGIN` with your actual Vercel URL
2. Test all environment variables with the verification script:
   ```bash
   npm run verify:deployment https://your-app.vercel.app
   ```
3. Monitor error logs for any missing variables

---

**Your `.env` file is ready for Vercel import! 🚀**