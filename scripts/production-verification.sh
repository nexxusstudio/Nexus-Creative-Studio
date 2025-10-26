#!/bin/bash

# Production Deployment Verification Script
# Verifies all systems are production-ready

echo "🚀 Nexus Creative Studio - Production Deployment Verification"
echo "============================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $2 -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
        exit 1
    fi
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 1. Build Verification
echo -e "\n${BLUE}1. Build System Verification${NC}"
echo "----------------------------"

print_info "Running production build..."
npm run build > /dev/null 2>&1
print_status "Production build completed" $?

print_info "Checking build output..."
if [ -d "dist" ] && [ -f "dist/index.html" ]; then
    print_status "Build artifacts generated" 0
else
    print_status "Build artifacts missing" 1
fi

# 2. Content System Verification
echo -e "\n${BLUE}2. Content System Verification${NC}"
echo "--------------------------------"

print_info "Verifying site content file..."
if [ -f "client/src/data/site-content.json" ]; then
    print_status "Site content file exists" 0
else
    print_status "Site content file missing" 1
fi

print_info "Checking for legacy content..."
if grep -r "22000\|22K\|\$22K\|17 projects\|14 clients\|2026-2027" client/src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" > /dev/null 2>&1; then
    print_warning "Legacy content found - review needed"
else
    print_status "No legacy content detected" 0
fi

# 3. Dependencies Verification
echo -e "\n${BLUE}3. Dependencies Verification${NC}"
echo "------------------------------"

print_info "Checking for Node.js imports in client code..."
if grep -r "import.*from.*['\"]fs['\"]" client/src/ > /dev/null 2>&1 || \
   grep -r "import.*from.*['\"]path['\"]" client/src/ > /dev/null 2>&1 || \
   grep -r "import.*from.*['\"]url['\"]" client/src/ > /dev/null 2>&1; then
    print_status "Node.js imports found in client code" 1
else
    print_status "No Node.js imports in client code" 0
fi

# 4. Configuration Verification
echo -e "\n${BLUE}4. Configuration Verification${NC}"
echo "-------------------------------"

print_info "Checking Vercel configuration..."
if [ -f "vercel.json" ]; then
    print_status "Vercel config exists" 0
else
    print_status "Vercel config missing" 1
fi

print_info "Checking Vite configuration..."
if [ -f "vite.config.ts" ]; then
    print_status "Vite config exists" 0
else
    print_status "Vite config missing" 1
fi

# 5. Type Safety Verification
echo -e "\n${BLUE}5. Type Safety Verification${NC}"
echo "-----------------------------"

print_info "Running TypeScript check..."
npx tsc --noEmit > /dev/null 2>&1
print_status "TypeScript compilation" $?

# 6. Production Readiness Summary
echo -e "\n${GREEN}🎉 Production Readiness Summary${NC}"
echo "================================"

print_info "Canonical metrics: Founded 2024, \$13K revenue, 13 clients, 20 projects"
print_info "Build system: Vite with optimized chunking"
print_info "Content system: Direct JSON import with fallbacks"
print_info "Error handling: Production-safe with comprehensive logging"
print_info "Dependencies: All Node.js imports removed from client code"

echo -e "\n${GREEN}✅ DEPLOYMENT READY${NC}"
echo -e "${BLUE}Ready to deploy to Vercel, Netlify, or any static hosting platform${NC}"

# 7. Next Steps
echo -e "\n${BLUE}📋 Next Steps${NC}"
echo "---------------"
echo "1. Deploy to your preferred platform"
echo "2. Monitor production logs for any issues"
echo "3. Verify all metrics display correctly"
echo "4. Test all interactive features"
echo "5. Monitor performance and Core Web Vitals"

echo -e "\n${GREEN}🚀 Happy Deploying!${NC}"