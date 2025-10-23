# 🚀 Deployment Guide - Nexus Creative Studio

This guide provides comprehensive instructions for deploying the Nexus Creative Studio application to various platforms.

## 📋 Pre-Deployment Checklist

### Required Environment Variables
```bash
# Core Configuration
NODE_ENV=production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SESSION_SECRET=your_32_character_session_secret

# Optional but Recommended
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Build Requirements
- Node.js 18+ 
- npm 9+
- TypeScript support
- Environment variables configured

## 🌐 Platform-Specific Deployment

### 1. Vercel (Recommended)

**Setup:**
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy using CLI or auto-deploy on push

**CLI Deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
npm run deploy:preview

# Deploy to production
npm run deploy
```

**Configuration:** `vercel.json` is already configured

### 2. Netlify

**Setup:**
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `public`
4. Configure environment variables

**CLI Deployment:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
npm run deploy:netlify
```

**Configuration:** `netlify.toml` is configured

### 3. Railway

**Setup:**
1. Connect GitHub repository
2. Railway auto-detects the Node.js app
3. Configure environment variables
4. Deploy

**CLI Deployment:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway deploy
```

**Configuration:** `railway.toml` is configured

### 4. Render

**Setup:**
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Configure environment variables

**Configuration:** `render.yaml` is configured

### 5. Docker Deployment

**Local Testing:**
```bash
# Build and run locally
npm run docker:build
npm run docker:run

# Or use Docker Compose
npm run docker:compose
```

**Production Deployment:**
```bash
# Build image
docker build -t nexus-creative-studio .

# Tag for registry
docker tag nexus-creative-studio:latest your-registry/nexus-creative-studio:latest

# Push to registry
docker push your-registry/nexus-creative-studio:latest
```

## 🔧 Build Configuration

### Client Build (Vite)
- Output: `public/` directory
- Optimized for production with code splitting
- Assets organized in subdirectories

### Server Build (esbuild)
- Output: `api/index.js` (for serverless)
- Bundled for Node.js runtime
- Source maps included

## 📊 Performance Optimizations

### Bundle Splitting
- Vendor libraries separated
- UI components chunked
- Lazy loading for routes

### Asset Optimization
- Image optimization
- Font preloading
- CSS minification
- JavaScript tree shaking

### Caching Strategy
- Static assets: 1 year cache
- API responses: No cache
- HTML: CDN cache with revalidation

## 🔒 Security Configuration

### Headers
- CSP (Content Security Policy)
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options
- X-Content-Type-Options

### Rate Limiting
- API endpoints protected
- Configurable limits
- IP-based throttling

## 🔍 Monitoring & Health Checks

### Health Endpoint
- URL: `/health`
- Returns system status
- Used for deployment verification

### Error Handling
- Centralized error logging
- Unique error IDs
- Environment-specific responses

## 🚀 Quick Deployment Commands

```bash
# Universal deployment script
./scripts/deploy.sh [platform] [environment]

# Examples:
./scripts/deploy.sh vercel prod
./scripts/deploy.sh netlify preview
./scripts/deploy.sh docker dev
```

## 🐛 Troubleshooting

### Common Issues

1. **Page Not Found (404)**
   - Ensure `vercel.json` rewrites are configured
   - Check SPA routing configuration
   - Verify build output directory

2. **API Endpoints Not Working**
   - Check API route configuration
   - Verify environment variables
   - Ensure database connection

3. **Build Failures**
   - Run `npm run type-check`
   - Check for missing dependencies
   - Verify TypeScript configuration

4. **Environment Variables**
   - Ensure all required vars are set
   - Check variable naming (no typos)
   - Verify deployment platform settings

### Build Verification
```bash
# Test production build locally
npm run build
npm run start:dev

# Run deployment verification
./scripts/verify-deployment.sh
```

## 📈 Post-Deployment

### Verification Steps
1. Check health endpoint: `https://yourdomain.com/health`
2. Test main routes: `/`, `/founder`, `/crypto-nexus`, etc.
3. Verify API endpoints: `/api/projects`, `/api/services`
4. Test contact form submission
5. Check browser console for errors

### Performance Testing
- Use Lighthouse for performance audit
- Test Core Web Vitals
- Verify mobile responsiveness
- Check loading times

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [Docker Documentation](https://docs.docker.com)

## 🆘 Support

For deployment issues:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Review platform-specific documentation
5. Check GitHub issues for similar problems

---

## 📝 Deployment Summary

This application is now fully production-ready with:
- ✅ Multiple deployment platform support
- ✅ Optimized build configuration
- ✅ Security headers and rate limiting
- ✅ Environment variable management
- ✅ Docker containerization
- ✅ Comprehensive error handling
- ✅ Health monitoring
- ✅ Asset optimization
- ✅ SPA routing configuration

Choose your preferred deployment platform and follow the corresponding section above. The application should deploy successfully and be fully functional on any of the supported platforms.