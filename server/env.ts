
import { config } from 'dotenv';

// Load environment variables
config();

interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  DATABASE_URL?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  SESSION_SECRET?: string;
  CORS_ORIGIN?: string;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX_REQUESTS: number;
  DEPLOYMENT_PLATFORM: string;
  IS_VERCEL: boolean;
  IS_RAILWAY: boolean;
  IS_RENDER: boolean;
  IS_NETLIFY: boolean;
  IS_DOCKER: boolean;
}

function validateEnv(): EnvConfig {
  const env = process.env.NODE_ENV as EnvConfig['NODE_ENV'] || 'development';
  
  // Cross-platform port detection
  const port = parseInt(
    process.env.PORT || 
    process.env.RAILWAY_PORT || 
    process.env.RENDER_PORT || 
    process.env.VERCEL_PORT || 
    '5000', 
    10
  );
  
  // Platform detection
  const isVercel = !!(process.env.VERCEL || process.env.VERCEL_ENV);
  const isRailway = !!(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID);
  const isRender = !!(process.env.RENDER || process.env.RENDER_SERVICE_ID);
  const isNetlify = !!(process.env.NETLIFY || process.env.NETLIFY_BUILD_BASE);
  const isDocker = !!(process.env.DOCKER_CONTAINER || process.env.DOCKERIZED);
  
  // Determine deployment platform
  let deploymentPlatform = 'local';
  if (isVercel) deploymentPlatform = 'vercel';
  else if (isRailway) deploymentPlatform = 'railway';
  else if (isRender) deploymentPlatform = 'render';
  else if (isNetlify) deploymentPlatform = 'netlify';
  else if (isDocker) deploymentPlatform = 'docker';
  
  const rateLimitWindow = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10);
  const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10);

  if (isNaN(port)) {
    console.warn('⚠️  Invalid PORT environment variable, using default 5000');
  }

  // Auto-generate session secret if missing (with warning)
  let sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret && env === 'production') {
    console.warn('⚠️  SESSION_SECRET not found, generating temporary secret. Set SESSION_SECRET env var!');
    sessionSecret = require('crypto').randomBytes(32).toString('hex');
  }

  // Graceful environment validation with warnings instead of errors
  if (env === 'production') {
    const warnings = [];
    
    if (!process.env.SUPABASE_URL) warnings.push('SUPABASE_URL');
    if (!process.env.SUPABASE_ANON_KEY) warnings.push('SUPABASE_ANON_KEY');
    
    if (warnings.length > 0) {
      console.warn(`⚠️  Missing environment variables (app may not work properly): ${warnings.join(', ')}`);
    }

    if (!process.env.DATABASE_URL && !process.env.SUPABASE_URL) {
      console.warn('⚠️  No database connection configured. Some features may not work.');
    }

    // Validate session secret strength
    if (sessionSecret && sessionSecret.length < 32) {
      console.warn('⚠️  Warning: SESSION_SECRET should be at least 32 characters long');
    }
  }

  console.log(`🚀 Starting on ${deploymentPlatform} platform (PORT: ${port})`);

  return {
    NODE_ENV: env,
    PORT: port,
    DATABASE_URL: process.env.DATABASE_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SESSION_SECRET: sessionSecret,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    RATE_LIMIT_WINDOW_MS: rateLimitWindow,
    RATE_LIMIT_MAX_REQUESTS: rateLimitMax,
    DEPLOYMENT_PLATFORM: deploymentPlatform,
    IS_VERCEL: isVercel,
    IS_RAILWAY: isRailway,
    IS_RENDER: isRender,
    IS_NETLIFY: isNetlify,
    IS_DOCKER: isDocker,
  };
}

export const env = validateEnv();
