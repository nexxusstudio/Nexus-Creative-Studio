#!/bin/bash

# Environment Variables Validation Script
# Run this before deploying to ensure all required variables are set

echo "🔐 Nexus Creative Studio - Environment Variables Checker"
echo "======================================================"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "   Create .env file from .env.example or use the provided .env template"
    exit 1
fi

echo "✅ .env file found"
echo ""

# Source the .env file (for validation only)
set -a
source .env 2>/dev/null
set +a

# Required variables
REQUIRED_VARS=(
    "NODE_ENV"
    "SUPABASE_URL"
    "SUPABASE_ANON_KEY"
    "DATABASE_URL"
    "VITE_SUPABASE_URL"
    "VITE_SUPABASE_ANON_KEY"
    "VITE_ENVIRONMENT"
    "VITE_API_URL"
    "SESSION_SECRET"
    "CORS_ORIGIN"
)

# Recommended variables
RECOMMENDED_VARS=(
    "RATE_LIMIT_WINDOW_MS"
    "RATE_LIMIT_MAX_REQUESTS"
    "SUPABASE_SERVICE_ROLE_KEY"
)

# Optional variables
OPTIONAL_VARS=(
    "GOOGLE_ANALYTICS_ID"
    "VERCEL_ANALYTICS_ID"
    "SENTRY_DSN"
    "SMTP_HOST"
    "SMTP_USER"
    "SMTP_PASS"
)

echo "🔍 Checking Required Variables:"
echo "================================"

MISSING_REQUIRED=0

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ $var - NOT SET"
        MISSING_REQUIRED=1
    elif [[ "${!var}" == *"your_"* ]] || [[ "${!var}" == *"your-"* ]]; then
        echo "⚠️  $var - PLACEHOLDER VALUE (needs real value)"
        MISSING_REQUIRED=1
    else
        echo "✅ $var - SET"
    fi
done

echo ""
echo "🎯 Checking Recommended Variables:"
echo "=================================="

MISSING_RECOMMENDED=0

for var in "${RECOMMENDED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo "⚠️  $var - NOT SET (recommended)"
        MISSING_RECOMMENDED=1
    elif [[ "${!var}" == *"your_"* ]] || [[ "${!var}" == *"your-"* ]]; then
        echo "⚠️  $var - PLACEHOLDER VALUE"
        MISSING_RECOMMENDED=1
    else
        echo "✅ $var - SET"
    fi
done

echo ""
echo "🔧 Checking Optional Variables:"
echo "==============================="

for var in "${OPTIONAL_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo "🔵 $var - NOT SET (optional)"
    elif [[ "${!var}" == *"your_"* ]] || [[ "${!var}" == *"your-"* ]]; then
        echo "🔵 $var - PLACEHOLDER VALUE (optional)"
    else
        echo "✅ $var - SET"
    fi
done

echo ""
echo "🧪 Validation Tests:"
echo "===================="

# Test Supabase URL format
if [[ "$SUPABASE_URL" =~ ^https://[a-z]+\.supabase\.co$ ]]; then
    echo "✅ SUPABASE_URL format is valid"
else
    echo "❌ SUPABASE_URL format invalid (should be https://your-project.supabase.co)"
fi

# Test SESSION_SECRET length
if [ ${#SESSION_SECRET} -ge 32 ]; then
    echo "✅ SESSION_SECRET length is sufficient (${#SESSION_SECRET} characters)"
else
    echo "❌ SESSION_SECRET too short (${#SESSION_SECRET} characters, needs 32+)"
fi

# Test VITE variables match Supabase variables
if [ "$VITE_SUPABASE_URL" = "$SUPABASE_URL" ]; then
    echo "✅ VITE_SUPABASE_URL matches SUPABASE_URL"
else
    echo "❌ VITE_SUPABASE_URL doesn't match SUPABASE_URL"
fi

if [ "$VITE_SUPABASE_ANON_KEY" = "$SUPABASE_ANON_KEY" ]; then
    echo "✅ VITE_SUPABASE_ANON_KEY matches SUPABASE_ANON_KEY"
else
    echo "❌ VITE_SUPABASE_ANON_KEY doesn't match SUPABASE_ANON_KEY"
fi

echo ""
echo "📊 Summary:"
echo "==========="

if [ $MISSING_REQUIRED -eq 0 ]; then
    echo "✅ All required variables are set!"
    
    if [ $MISSING_RECOMMENDED -eq 0 ]; then
        echo "🎉 All recommended variables are set!"
        echo "🚀 Ready for production deployment!"
        echo ""
        echo "📋 Next Steps:"
        echo "1. Deploy to Vercel: vercel --prod"
        echo "2. Update CORS_ORIGIN with your actual Vercel URL"
        echo "3. Run verification: npm run verify:deployment"
    else
        echo "⚠️  Some recommended variables are missing"
        echo "🚀 Ready for basic deployment (can add recommended vars later)"
    fi
else
    echo "❌ Missing required variables - fix before deploying"
    echo ""
    echo "🛠️  Quick fixes:"
    echo "1. Get Supabase credentials from: supabase.com → Your Project → Settings → API"
    echo "2. Generate SESSION_SECRET: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    echo "3. Update CORS_ORIGIN with your deployment URL"
    exit 1
fi

echo ""
echo "📚 Documentation:"
echo "- Environment Setup: ./ENVIRONMENT_SETUP.md"
echo "- Deployment Guide: ./DEPLOYMENT.md"
echo "- Full Documentation: ./README.md"