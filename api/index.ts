import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../server/index.js';

// For Vercel serverless deployment
export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}

// Export the Express app for other deployments
export { app };
