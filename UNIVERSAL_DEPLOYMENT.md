# 🚀 Universal Deployment Guide - Nexus Creative Studio

**Deploy your application to any platform with zero manual configuration**

---

## 📋 **Quick Start**

### 1. **Environment Setup** (Required)
```bash
# Copy environment template
cp .env.template .env

# Edit with your credentials
nano .env  # or your preferred editor
```

### 2. **One-Command Deployment**
```bash
# Choose your platform
./scripts/deploy.sh vercel    # Deploy to Vercel
./scripts/deploy.sh netlify   # Deploy to Netlify  
./scripts/deploy.sh railway   # Deploy to Railway
./scripts/deploy.sh render    # Deploy to Render
./scripts/deploy.sh docker    # Run in Docker
```

---

## 🏗️ **Platform-Specific Instructions**

### **Vercel** ⚡
```bash
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy
./scripts/deploy.sh vercel
```

**Environment Variables:**
- Set in Vercel dashboard or use `vercel env pull`
- Required: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SESSION_SECRET`

### **Netlify** 🌐
```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
./scripts/deploy.sh netlify
```

**Environment Variables:**
- Set in Netlify dashboard under Site Settings > Environment Variables
- Required: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SESSION_SECRET`

### **Railway** 🚂
```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
./scripts/deploy.sh railway
```

**Environment Variables:**
- Set using `railway variables set KEY=value`
- Required: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SESSION_SECRET`

### **Render** 🎨
```bash
# No CLI needed - Git-based deployment
./scripts/deploy.sh render
```

**Setup:**
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Push commits trigger auto-deployments

### **Docker** 🐳
```bash
# Install Docker
# Deploy locally
./scripts/deploy.sh docker
```

**Access:** http://localhost:3000

---

## 🔧 **Environment Variables Reference**

### **Required Variables**
```env
# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key

# Security
SESSION_SECRET=your_32_char_secret

# Client (Vite)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_ENVIRONMENT=production
```

### **Optional Variables**
```env
# CORS (for custom domains)
CORS_ORIGIN=https://yourapp.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🔍 **Platform Detection**

The application automatically detects deployment platform:

| Platform | Auto-Detection | Port Handling |
|----------|---------------|---------------|
| Vercel   | `VERCEL=true` | Uses `process.env.PORT` |
| Railway  | `RAILWAY_ENVIRONMENT` | Uses `RAILWAY_PORT` |
| Render   | `RENDER=true` | Uses `PORT` (10000) |
| Netlify  | `NETLIFY=true` | Functions mode |
| Docker   | `DOCKER_CONTAINER=true` | Uses `PORT` (3000) |

---

## 📦 **Build Process**

### **Automatic Build Steps**
1. **Type Check**: `npm run type-check`
2. **Client Build**: `vite build` → `public/`
3. **Server Build**: `esbuild` → `api/index.js`
4. **Verification**: Check critical files exist

### **Build Outputs**
```
public/               # Static frontend files
├── index.html        # Main HTML file
├── assets/           # JS/CSS bundles
└── images/           # Static images

api/
└── index.js          # Server bundle
```

---

## 🚨 **Error Handling**

### **Common Issues & Solutions**

#### **Missing Environment Variables**
```bash
# Error: "Missing SUPABASE_URL"
# Solution: Configure .env file
cp .env.template .env
# Edit .env with real values
```

#### **Build Failures**
```bash
# Error: TypeScript errors
# Solution: Fix type issues
npm run type-check

# Error: Missing dependencies
# Solution: Clean install
rm -rf node_modules
npm ci
```

#### **Port Conflicts**
```bash
# Error: Port already in use
# Solution: Platform auto-assigns ports
# No manual configuration needed
```

#### **Database Connection**
```bash
# Error: Database connection failed
# Solution: Check Supabase credentials
# Verify SUPABASE_URL and SUPABASE_ANON_KEY
```

---

## 🎯 **Platform Comparison**

| Feature | Vercel | Netlify | Railway | Render | Docker |
|---------|--------|---------|---------|--------|--------|
| **Setup** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| **Speed** | ⚡ Fast | ⚡ Fast | 🚀 Very Fast | 🐌 Slow | ⚡ Fast |
| **Cost** | 💰 Free tier | 💰 Free tier | 💰 Free tier | 💰 Free tier | 🆓 Free |
| **Auto-scale** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Custom Domain** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ❌ Local only |

### **Recommendations**

- **Development**: Docker (local testing)
- **Prototyping**: Vercel (fastest setup)
- **Production**: Railway (best performance)
- **Static Sites**: Netlify (optimized for frontend)
- **Full-Stack Apps**: Render (comprehensive features)

---

## 🔄 **Deployment Workflow**

### **Standard Workflow**
```bash
# 1. Development
npm run dev

# 2. Testing
npm run build
npm run preview

# 3. Deploy
./scripts/deploy.sh <platform>

# 4. Verify
curl https://your-app.com/health
```

### **CI/CD Integration**
All platforms support automatic deployments:

- **Git Push**: Automatic deployment on push to main
- **PR Previews**: Deploy preview environments for pull requests
- **Environment Branches**: Different environments per branch

---

## 📊 **Health Monitoring**

### **Health Check Endpoint**
```bash
# Check application health
curl https://your-app.com/health

# Expected response:
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345,
  "environment": "production",
  "platform": "vercel"
}
```

### **Verification Script**
```bash
# Run comprehensive deployment verification
./scripts/verify-deployment.sh https://your-app.com
```

---

## 🚀 **Advanced Configuration**

### **Custom Build Commands**
```json
// package.json
{
  "scripts": {
    "build:custom": "npm run build && custom-post-build-script"
  }
}
```

### **Platform-Specific Optimizations**

#### **Vercel**
```json
// vercel.json
{
  "functions": {
    "api/index.js": { "maxDuration": 30 }
  }
}
```

#### **Netlify**
```toml
# netlify.toml
[build]
  command = "npm run build"
  functions = "api"
```

#### **Railway**
```toml
# railway.toml
[build]
  builder = "nixpacks"
```

#### **Render**
```yaml
# render.yaml
services:
  - type: web
    buildCommand: npm run build
    startCommand: npm start
```

---

## 📞 **Support**

### **Getting Help**
- **Documentation**: Check platform-specific docs
- **Logs**: Use platform dashboards for error logs
- **Community**: Platform Discord/forums
- **Issues**: GitHub repository issues

### **Debugging Commands**
```bash
# Check build locally
npm run build
npm run preview

# Test Docker build
docker build -t test .
docker run -p 3000:3000 test

# Verify environment
node -e "console.log(process.env.NODE_ENV)"
```

---

**🎉 Your application is now ready for zero-config deployment to any platform!**