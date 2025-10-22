import { type VercelRequest, type VercelResponse } from '@vercel/node';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { registerRoutes } from '../server/routes';
import { env } from '../server/env';

// Create Express app for Vercel
const app = express();

// Trust proxy for Vercel
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://api.supabase.co", "wss://realtime.supabase.co"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
}));

// CORS configuration for Vercel
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = env.CORS_ORIGIN ? 
    env.CORS_ORIGIN.split(',') : 
    ['https://nexus-creative-studio.vercel.app', 'http://localhost:5173'];
  
  if (!origin || allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(String(env.RATE_LIMIT_WINDOW_MS || '900000')),
  max: parseInt(String(env.RATE_LIMIT_MAX_REQUESTS || '100')),
  message: {
    error: true,
    message: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil(parseInt(String(env.RATE_LIMIT_WINDOW_MS || '900000')) / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health';
  }
});

app.use('/api', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    version: process.env.npm_package_version || '2.0.0'
  });
});

// Register API routes
registerRoutes(app);

// Error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  const errorId = Math.random().toString(36).substring(2, 15);
  
  console.error(`[${errorId}] Error:`, error);
  
  res.status(error.status || 500).json({
    error: true,
    message: env.NODE_ENV === 'production' 
      ? 'An error occurred while processing your request.' 
      : error.message,
    errorId,
    ...(env.NODE_ENV !== 'production' && { details: error.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: true,
    message: 'API endpoint not found',
    path: req.originalUrl
  });
});

// Export handler for Vercel
export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}