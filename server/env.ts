
import { config } from 'dotenv';

// Load environment variables
config();

interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  DATABASE_URL?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
}

function validateEnv(): EnvConfig {
  const env = process.env.NODE_ENV as EnvConfig['NODE_ENV'] || 'development';
  const port = parseInt(process.env.PORT || '5000', 10);

  if (isNaN(port)) {
    throw new Error('Invalid PORT environment variable');
  }

  // Warn if important variables are missing
  if (env === 'production') {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      console.warn('⚠️  Warning: Supabase credentials not configured for production');
    }
    if (!process.env.DATABASE_URL) {
      console.warn('⚠️  Warning: DATABASE_URL not configured for production');
    }
  }

  return {
    NODE_ENV: env,
    PORT: port,
    DATABASE_URL: process.env.DATABASE_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  };
}

export const env = validateEnv();
