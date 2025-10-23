#!/bin/bash

# Deployment script for Nexus Creative Studio
# Supports multiple deployment platforms

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if platform is provided
if [ -z "$1" ]; then
    print_error "Please specify a deployment platform: vercel, netlify, railway, render, or docker"
    echo "Usage: ./scripts/deploy.sh [platform] [environment]"
    echo "Platforms: vercel, netlify, railway, render, docker"
    echo "Environment: dev, preview, prod (default: prod)"
    exit 1
fi

PLATFORM=$1
ENVIRONMENT=${2:-prod}

print_status "Starting deployment to $PLATFORM ($ENVIRONMENT environment)"

# Pre-deployment checks
print_status "Running pre-deployment checks..."

# Check if required environment variables are set for production
if [ "$ENVIRONMENT" = "prod" ]; then
    if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ]; then
        print_warning "Production environment variables not set. Please ensure SUPABASE_URL and SUPABASE_ANON_KEY are configured."
    fi
fi

# Run tests
print_status "Running tests..."
npm run test || {
    print_error "Tests failed. Deployment aborted."
    exit 1
}

# Type checking
print_status "Running type check..."
npm run type-check || {
    print_error "Type check failed. Deployment aborted."
    exit 1
}

# Linting
print_status "Running linter..."
npm run lint || {
    print_error "Linting failed. Deployment aborted."
    exit 1
}

# Build the application
print_status "Building application..."
npm run build || {
    print_error "Build failed. Deployment aborted."
    exit 1
}

# Platform-specific deployment
case $PLATFORM in
    "vercel")
        print_status "Deploying to Vercel..."
        if [ "$ENVIRONMENT" = "prod" ]; then
            vercel --prod
        else
            vercel
        fi
        print_success "Deployment to Vercel completed!"
        ;;
    
    "netlify")
        print_status "Deploying to Netlify..."
        if [ "$ENVIRONMENT" = "prod" ]; then
            netlify deploy --prod --dir=public
        else
            netlify deploy --dir=public
        fi
        print_success "Deployment to Netlify completed!"
        ;;
    
    "railway")
        print_status "Deploying to Railway..."
        railway up
        print_success "Deployment to Railway completed!"
        ;;
    
    "render")
        print_status "Deploying to Render..."
        print_warning "Please push your changes to Git. Render will auto-deploy from the connected repository."
        git status
        print_success "Code ready for Render deployment!"
        ;;
    
    "docker")
        print_status "Building Docker image..."
        docker build -t nexus-creative-studio:latest .
        
        if [ "$ENVIRONMENT" = "dev" ]; then
            print_status "Starting local Docker container..."
            docker run -p 3000:3000 --env-file .env nexus-creative-studio:latest
        else
            print_status "Docker image built successfully. Tag and push to your registry:"
            echo "docker tag nexus-creative-studio:latest your-registry/nexus-creative-studio:latest"
            echo "docker push your-registry/nexus-creative-studio:latest"
        fi
        print_success "Docker deployment completed!"
        ;;
    
    *)
        print_error "Unknown platform: $PLATFORM"
        print_error "Supported platforms: vercel, netlify, railway, render, docker"
        exit 1
        ;;
esac

# Post-deployment verification
if [ "$PLATFORM" != "docker" ]; then
    print_status "Running post-deployment verification..."
    sleep 10 # Wait for deployment to propagate
    
    if [ -f "./scripts/verify-deployment.sh" ]; then
        ./scripts/verify-deployment.sh
    else
        print_warning "Verification script not found. Please manually verify your deployment."
    fi
fi

print_success "🚀 Deployment process completed successfully!"
print_status "Platform: $PLATFORM"
print_status "Environment: $ENVIRONMENT"
print_status "Timestamp: $(date)"

# Display helpful information
case $PLATFORM in
    "vercel")
        print_status "View your deployment: https://vercel.com/dashboard"
        ;;
    "netlify")
        print_status "View your deployment: https://app.netlify.com/sites"
        ;;
    "railway")
        print_status "View your deployment: https://railway.app/dashboard"
        ;;
    "render")
        print_status "View your deployment: https://dashboard.render.com/"
        ;;
esac