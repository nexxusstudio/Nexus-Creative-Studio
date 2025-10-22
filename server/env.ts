
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
}

function validateEnv(): EnvConfig {
  const env = process.env.NODE_ENV as EnvConfig['NODE_ENV'] || 'development';
  const port = parseInt(process.env.PORT || '5000', 10);
  const rateLimitWindow = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10);
  const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10);

  if (isNaN(port)) {
    throw new Error('Invalid PORT environment variable');
  }

  // Production environment validation
  if (env === 'production') {
    const requiredVars = [
      'SUPABASE_URL',
      'SUPABASE_ANON_KEY',
      'SESSION_SECRET'
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables for production: ${missingVars.join(', ')}`);
    }

    if (!process.env.DATABASE_URL && !process.env.SUPABASE_URL) {
      throw new Error('Either DATABASE_URL or SUPABASE_URL must be configured for production');
    }

    // Validate session secret strength
    if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length < 32) {
      console.warn('⚠️  Warning: SESSION_SECRET should be at least 32 characters long');
    }
  }

  return {
    NODE_ENV: env,
    PORT: port,
    DATABASE_URL: process.env.DATABASE_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    RATE_LIMIT_WINDOW_MS: rateLimitWindow,
    RATE_LIMIT_MAX_REQUESTS: rateLimitMax,
  };
}

export const env = validateEnv();
