#!/bin/bash

# ==========================================
# Nexus Creative Studio - Universal Deployment Script
# Compatible with all major platforms
# ==========================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check environment file
check_env_file() {
    if [ ! -f ".env" ]; then
        print_warning "No .env file found. Creating from template..."
        if [ -f ".env.template" ]; then
            cp .env.template .env
            print_warning "Please edit .env file with your actual credentials before deploying!"
            return 1
        else
            print_error "No .env.template found. Cannot create environment configuration."
            return 1
        fi
    fi
    return 0
}

# Function to verify build
verify_build() {
    print_status "Verifying build..."
    
    # Check if build artifacts exist
    if [ ! -f "api/index.js" ] || [ ! -d "public" ]; then
        print_error "Build artifacts not found. Running build..."
        npm run build
    fi
    
    # Verify critical files
    if [ ! -f "public/index.html" ]; then
        print_error "Missing public/index.html"
        return 1
    fi
    
    if [ ! -f "api/index.js" ]; then
        print_error "Missing api/index.js"
        return 1
    fi
    
    print_success "Build verification passed"
    return 0
}
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Platform-specific deployment functions
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command_exists vercel; then
        print_error "Vercel CLI not found. Install with: npm i -g vercel"
        return 1
    fi
    
    # Set environment variables from .env file
    if [ -f ".env" ]; then
        print_status "Setting up environment variables..."
        print_warning "Make sure to set environment variables in Vercel dashboard"
    fi
    
    vercel --prod
    print_success "Deployed to Vercel!"
}

deploy_netlify() {
    print_status "Deploying to Netlify..."
    
    if ! command_exists netlify; then
        print_error "Netlify CLI not found. Install with: npm i -g netlify-cli"
        return 1
    fi
    
    netlify deploy --prod --dir=public --functions=api
    print_success "Deployed to Netlify!"
}

deploy_railway() {
    print_status "Deploying to Railway..."
    
    if ! command_exists railway; then
        print_error "Railway CLI not found. Install with: npm i -g @railway/cli"
        return 1
    fi
    
    railway up
    print_success "Deployed to Railway!"
}

deploy_render() {
    print_status "Deploying to Render..."
    
    print_status "Pushing to Git repository..."
    git add .
    git commit -m "Deploy to Render" || true
    git push origin main
    
    print_success "Pushed to Git! Render will auto-deploy from your repository."
    print_warning "Make sure your Render service is connected to this repository."
}

deploy_docker() {
    print_status "Building and running Docker container..."
    
    if ! command_exists docker; then
        print_error "Docker not found. Please install Docker first."
        return 1
    fi
    
    # Build Docker image
    docker build -t nexus-creative-studio .
    
    # Stop existing container if running
    docker stop nexus-creative-studio 2>/dev/null || true
    docker rm nexus-creative-studio 2>/dev/null || true
    
    # Run new container
    docker run -d --name nexus-creative-studio -p 3000:3000 --env-file .env nexus-creative-studio
    
        print_success "Docker container is running on http://localhost:3000"
}

# Main deployment function
deploy() {
    local platform=$1
    
    print_status "Starting deployment to $platform..."
    
    # Pre-deployment checks
    if ! check_env_file; then
        print_error "Environment setup failed. Please configure .env file first."
        exit 1
    fi
    
    # Install dependencies
    print_status "Installing dependencies..."
    npm ci
    
    # Run build
    print_status "Building application..."
    npm run build
    
    # Verify build
    if ! verify_build; then
        print_error "Build verification failed"
        exit 1
    fi
    
    # Deploy to specific platform
    case $platform in
        "vercel")
            deploy_vercel
            ;;
        "netlify")
            deploy_netlify
            ;;
        "railway")
            deploy_railway
            ;;
        "render")
            deploy_render
            ;;
        "docker")
            deploy_docker
            ;;
        *)
            print_error "Unknown platform: $platform"
            print_status "Available platforms: vercel, netlify, railway, render, docker"
            exit 1
            ;;
    esac
}

# Help function
show_help() {
    echo "Nexus Creative Studio - Universal Deployment Script"
    echo ""
    echo "Usage: $0 <platform>"
    echo ""
    echo "Available platforms:"
    echo "  vercel      Deploy to Vercel"
    echo "  netlify     Deploy to Netlify"
    echo "  railway     Deploy to Railway"
    echo "  render      Deploy to Render (via Git push)"
    echo "  docker      Build and run Docker container locally"
    echo ""
    echo "Examples:"
    echo "  $0 vercel       # Deploy to Vercel"
    echo "  $0 netlify      # Deploy to Netlify"
    echo "  $0 railway      # Deploy to Railway"
    echo "  $0 render       # Deploy to Render"
    echo "  $0 docker       # Run in Docker"
    echo ""
    echo "Prerequisites:"
    echo "  - Configure .env file with your credentials"
    echo "  - Install platform-specific CLI tools"
    echo "  - Ensure you're logged into the platform"
}

# Main script logic
if [ $# -eq 0 ]; then
    show_help
    exit 1
fi

case $1 in
    "help" | "-h" | "--help")
        show_help
        ;;
    *)
        deploy $1
        ;;
esac
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