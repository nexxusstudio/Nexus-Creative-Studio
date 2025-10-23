# Multi-stage Docker build for production-ready deployment
FROM node:18-alpine AS dependencies

# Set working directory
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi && npm cache clean --force

# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including dev dependencies)
# Use npm install if package-lock.json doesn't exist, otherwise use npm ci
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy source code
COPY . .

# Build the application
RUN npm run build && npm run build:server

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001

# Copy production dependencies
COPY --from=dependencies --chown=appuser:nodejs /app/node_modules ./node_modules

# Copy built application
COPY --from=build --chown=appuser:nodejs /app/public ./public
COPY --from=build --chown=appuser:nodejs /app/dist ./dist
COPY --from=build --chown=appuser:nodejs /app/api ./api
COPY --from=build --chown=appuser:nodejs /app/server ./server
COPY --from=build --chown=appuser:nodejs /app/shared ./shared
COPY --from=build --chown=appuser:nodejs /app/package.json ./package.json

# Set environment variables
ENV NODE_ENV=production
ENV DOCKER_CONTAINER=true
ENV PORT=3000

# Expose port (configurable via PORT env var)
EXPOSE $PORT

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:${PORT:-3000}/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))"

# Start the application
CMD ["npm", "start"]