import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { env } from "./env";

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
    return req.path === '/health' || req.path.startsWith('/assets/');
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

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      // Log response data in development only
      if (env.NODE_ENV === 'development' && capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

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

(async () => {
  const server = await registerRoutes(app);

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

  // Setup development or production serving
  if (env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Start server with appropriate host binding
  const host = env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';
  
  server.listen(env.PORT, host, () => {
    log(`🚀 Server running in ${env.NODE_ENV} mode on http://${host}:${env.PORT}`);
    
    if (env.NODE_ENV === 'production') {
      log(`🔒 Security headers enabled`);
      log(`⚡ Rate limiting: ${env.RATE_LIMIT_MAX_REQUESTS} requests per ${env.RATE_LIMIT_WINDOW_MS / 1000}s`);
    }
  });
})();
