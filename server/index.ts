import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { env } from "./env";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust proxy for production deployments
if (env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Enhanced security middleware for production
app.use(helmet({
  contentSecurityPolicy: env.NODE_ENV === 'production' ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://api.supabase.co", "wss://realtime.supabase.co"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: env.NODE_ENV === 'production' ? [] : null,
    },
  } : false,
  crossOriginEmbedderPolicy: false,
  hsts: env.NODE_ENV === 'production' ? {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  } : false,
}));

// CORS configuration
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = env.CORS_ORIGIN ? env.CORS_ORIGIN.split(',') : ['http://localhost:5173'];
  
  if (env.NODE_ENV === 'development' || !origin || allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Production-grade rate limiting
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS, // configurable window
  max: env.RATE_LIMIT_MAX_REQUESTS, // configurable limit
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil(env.RATE_LIMIT_WINDOW_MS / 1000 / 60) + ' minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks and static assets
    return req.path === '/health' || !req.path.startsWith('/api');
  },
});

app.use('/api/', limiter);

// Body parsing with size limits
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    // Store raw body for webhook verification if needed
    (req as any).rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
    version: process.env.npm_package_version || '2.0.0'
  });
});

// Register API routes
registerRoutes(app);

// Serve static files in production
if (env.NODE_ENV === 'production') {
  const publicPath = path.join(__dirname, '..', 'public');
  app.use(express.static(publicPath));

  // For any other request, serve the index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

// Enhanced error handling middleware
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Generate unique error ID for tracking
  const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Log error details
  if (env.NODE_ENV === 'development') {
    console.error(`Error ${errorId}:`, err);
    res.status(status).json({ 
      error: true,
      message,
      errorId,
      stack: err.stack,
      details: err 
    });
  } else {
    // Production error logging (could integrate with logging service)
    console.error(`Error ${errorId}:`, {
      message: err.message,
      status,
      stack: err.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    res.status(status).json({ 
      error: true,
      message: status === 500 ? "Internal Server Error" : message,
      errorId
    });
  }
});

// Cross-platform server startup
async function startServer() {
  try {
    const httpServer = await registerRoutes(app);

    // Graceful shutdown handling
    process.on('SIGINT', () => {
      console.log('\n🛑 Received SIGINT, shutting down gracefully...');
      httpServer.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

    process.on('SIGTERM', () => {
      console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
      httpServer.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

    // Start server
    httpServer.listen(env.PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://0.0.0.0:${env.PORT}`);
      console.log(`📊 Environment: ${env.NODE_ENV}`);
      console.log(`🏗️  Platform: ${env.DEPLOYMENT_PLATFORM}`);
      console.log(`💾 Database: ${env.SUPABASE_URL ? 'Supabase' : 'Not configured'}`);
      console.log(`🔗 Health check: http://0.0.0.0:${env.PORT}/health`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Only start server if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export default app;

