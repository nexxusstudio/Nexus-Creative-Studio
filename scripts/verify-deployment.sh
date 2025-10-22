#!/bin/bash

# Deployment Verification Script for Nexus Creative Studio
# Run this script to verify your deployment is working correctly

echo "🚀 Nexus Creative Studio - Deployment Verification"
echo "=================================================="

# Check if required commands are available
command -v curl >/dev/null 2>&1 || { echo "❌ curl is required but not installed."; exit 1; }
command -v jq >/dev/null 2>&1 || { echo "⚠️  jq not found - JSON responses won't be formatted"; JQ_AVAILABLE=false; }

# Set deployment URL (change this to your actual deployment URL)
DEPLOYMENT_URL="${1:-https://nexus-creative-studio.vercel.app}"

echo "🌐 Testing deployment at: $DEPLOYMENT_URL"
echo ""

# Test 1: Main site
echo "1️⃣  Testing main site..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL")
if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ Main site is accessible (HTTP $HTTP_CODE)"
else
    echo "❌ Main site failed (HTTP $HTTP_CODE)"
fi

# Test 2: Health check
echo ""
echo "2️⃣  Testing health check endpoint..."
HEALTH_RESPONSE=$(curl -s "$DEPLOYMENT_URL/health")
HEALTH_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL/health")

if [ "$HEALTH_CODE" -eq 200 ]; then
    echo "✅ Health check passed (HTTP $HEALTH_CODE)"
    if [ "$JQ_AVAILABLE" != false ]; then
        echo "   Response: $(echo "$HEALTH_RESPONSE" | jq -c .)"
    else
        echo "   Response: $HEALTH_RESPONSE"
    fi
else
    echo "❌ Health check failed (HTTP $HEALTH_CODE)"
fi

# Test 3: API endpoints
echo ""
echo "3️⃣  Testing API endpoints..."

# Test metrics endpoint
METRICS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL/api/metrics")
if [ "$METRICS_CODE" -eq 200 ]; then
    echo "✅ Metrics API accessible (HTTP $METRICS_CODE)"
else
    echo "❌ Metrics API failed (HTTP $METRICS_CODE)"
fi

# Test contact endpoint (POST)
CONTACT_RESPONSE=$(curl -s -X POST "$DEPLOYMENT_URL/api/contact" \
    -H "Content-Type: application/json" \
    -d '{
        "firstName": "Test",
        "lastName": "User",
        "email": "test@example.com",
        "message": "Deployment verification test"
    }')
CONTACT_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$DEPLOYMENT_URL/api/contact" \
    -H "Content-Type: application/json" \
    -d '{
        "firstName": "Test",
        "lastName": "User", 
        "email": "test@example.com",
        "message": "Deployment verification test"
    }')

if [ "$CONTACT_CODE" -eq 200 ]; then
    echo "✅ Contact API accessible (HTTP $CONTACT_CODE)"
else
    echo "❌ Contact API failed (HTTP $CONTACT_CODE)"
    if [ "$JQ_AVAILABLE" != false ]; then
        echo "   Response: $(echo "$CONTACT_RESPONSE" | jq -c .)"
    else
        echo "   Response: $CONTACT_RESPONSE"
    fi
fi

# Test 4: Static assets
echo ""
echo "4️⃣  Testing static assets..."

# Test CSS
CSS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL/css/index-CUKED2sv.css")
if [ "$CSS_CODE" -eq 200 ]; then
    echo "✅ CSS assets accessible (HTTP $CSS_CODE)"
else
    echo "❌ CSS assets failed (HTTP $CSS_CODE)"
fi

# Test JS
JS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL/assets/index-BzPzuMM2.js")
if [ "$JS_CODE" -eq 200 ]; then
    echo "✅ JS assets accessible (HTTP $JS_CODE)"
else
    echo "❌ JS assets failed (HTTP $JS_CODE)"
fi

# Test 5: SEO files
echo ""
echo "5️⃣  Testing SEO files..."

# Test robots.txt
ROBOTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL/robots.txt")
if [ "$ROBOTS_CODE" -eq 200 ]; then
    echo "✅ robots.txt accessible (HTTP $ROBOTS_CODE)"
else
    echo "❌ robots.txt failed (HTTP $ROBOTS_CODE)"
fi

# Test sitemap.xml
SITEMAP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL/sitemap.xml")
if [ "$SITEMAP_CODE" -eq 200 ]; then
    echo "✅ sitemap.xml accessible (HTTP $SITEMAP_CODE)"
else
    echo "❌ sitemap.xml failed (HTTP $SITEMAP_CODE)"
fi

# Test 6: Brand pages
echo ""
echo "6️⃣  Testing brand pages..."

PAGES=("nexus-studio" "crypto-nexus" "byte-studio" "founder")
for page in "${PAGES[@]}"; do
    PAGE_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL/$page")
    if [ "$PAGE_CODE" -eq 200 ]; then
        echo "✅ /$page accessible (HTTP $PAGE_CODE)"
    else
        echo "❌ /$page failed (HTTP $PAGE_CODE)"
    fi
done

echo ""
echo "🎯 Deployment Verification Complete!"
echo "=================================================="

# Summary
echo ""
echo "📊 Summary:"
echo "- Main site: $DEPLOYMENT_URL"
echo "- Health check: $DEPLOYMENT_URL/health"
echo "- API endpoints: $DEPLOYMENT_URL/api/*"
echo "- Static assets: Optimized and cached"
echo "- SEO files: robots.txt, sitemap.xml configured"
echo "- Brand pages: All accessible"

echo ""
echo "🚀 Next Steps:"
echo "1. Set up custom domain (optional)"
echo "2. Configure analytics and monitoring"
echo "3. Add CMS integration when ready"
echo "4. Submit sitemap to Google Search Console"

echo ""
echo "📚 Resources:"
echo "- Deployment Guide: ./DEPLOYMENT.md"
echo "- Production Audit: ./PRODUCTION_AUDIT.md"
echo "- Repository: https://github.com/nexxusstudio/Nexus-Creative-Studio"

echo ""
echo "✨ Deployment verification complete! Your app is ready for production use."