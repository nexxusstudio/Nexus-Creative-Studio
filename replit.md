# Nexus Creative Studio

## Overview
Nexus Creative Studio is a multi-brand digital agency website showcasing Web3, design, and strategic technology leadership services. The application features a modern, interactive portfolio with multiple brand pages including Crypto Nexus, Byte Studio, and founder information.

## Tech Stack
- **Frontend**: React 18 with TypeScript, Vite
- **Backend**: Express.js server with TypeScript
- **UI Framework**: Tailwind CSS 4, shadcn/ui components
- **Styling**: Framer Motion for animations, custom themes
- **Database**: Drizzle ORM with PostgreSQL support (currently using in-memory storage)
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query)

## Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # React components including shadcn/ui
│   │   ├── pages/       # Page components (Home, Founder, CryptoNexus, etc.)
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and configuration
├── server/              # Backend Express server
│   ├── index.ts        # Server entry point
│   ├── routes.ts       # API routes
│   ├── vite.ts         # Vite dev server middleware
│   └── storage.ts      # Storage interface (in-memory)
├── shared/             # Shared types and schemas
└── attached_assets/    # Static images and assets
```

## Development Setup

### Running the Application
The application runs on port 5000 with a single server serving both the API and frontend:
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Type Checking
```bash
npm run check
```

## Configuration Notes

### Port Configuration
- Server runs on port 5000 (configured in server/index.ts)
- Uses host 0.0.0.0 for Replit environment compatibility
- Vite dev server uses `allowedHosts: true` for proxy compatibility

### Asset Imports
Assets are imported using the `@assets` alias which points to `attached_assets/`

### Database
The application supports PostgreSQL via Drizzle ORM but currently uses in-memory storage (MemStorage) as the fallback. To enable database:
1. Provision a PostgreSQL database
2. Set DATABASE_URL environment variable
3. Run `npm run db:push` to create tables

## Deployment
Configured for Replit Autoscale deployment:
- **Build**: `npm run build`
- **Run**: `npm start`
- **Type**: Autoscale (stateless web application)

## Recent Changes (October 21, 2025)
- Fixed missing NotFound page component
- Corrected asset file paths for NexusStudio, ByteStudio, and Hero components
- Configured development workflow
- Set up deployment configuration
- Project imported and running successfully in Replit environment

## Features
- Interactive particle background effects
- Responsive design with dark/light theme support
- Multiple brand showcase pages
- Pricing calculator
- Interactive roadmap and metrics
- Data visualizations with Recharts
- Contact forms and portfolio displays
