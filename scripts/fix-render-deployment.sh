#!/bin/bash

# Render Deployment Fix Script
# This script helps resolve common deployment issues on Render

echo "🔧 Nexus Creative Studio - Render Deployment Fix"
echo "================================================"

# Check if package-lock.json exists
if [ -f "package-lock.json" ]; then
    echo "✅ package-lock.json found"
    
    # Check lockfileVersion
    lockVersion=$(head -10 package-lock.json | grep -o '"lockfileVersion": [0-9]*' | grep -o '[0-9]*')
    echo "📦 Lock file version: $lockVersion"
    
    if [ "$lockVersion" -ge 1 ]; then
        echo "✅ Lock file version is compatible"
    else
        echo "❌ Lock file version is too old, regenerating..."
        rm package-lock.json
        npm install
    fi
else
    echo "❌ package-lock.json missing, generating..."
    npm install
fi

echo ""
echo "🏗️  Testing build process..."

# Test build commands
echo "📦 Installing dependencies..."
if npm ci; then
    echo "✅ Dependencies installed successfully"
else
    echo "⚠️  npm ci failed, trying npm install..."
    if npm install; then
        echo "✅ Dependencies installed with npm install"
    else
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

echo ""
echo "🔨 Building client..."
if npm run build; then
    echo "✅ Client build successful"
else
    echo "❌ Client build failed"
    exit 1
fi

echo ""
echo "🔨 Building server..."
if npm run build:server; then
    echo "✅ Server build successful"
else
    echo "❌ Server build failed"
    exit 1
fi

echo ""
echo "🚀 Deployment preparation complete!"
echo "✅ Ready for Render deployment"

echo ""
echo "📋 Next steps:"
echo "1. Commit and push these changes to GitHub"
echo "2. Redeploy on Render"
echo "3. Check build logs for any remaining issues"