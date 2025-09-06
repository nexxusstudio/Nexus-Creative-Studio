# Nexus Creative Studio

## Overview

Nexus Creative Studio is a modern, multi-brand digital agency platform built as a full-stack web application. The project serves as a comprehensive showcase for multiple interconnected brands under the Nexus umbrella, including Crypto Nexus (Web3/blockchain), Byte Studio (design/MVP development), and founder Jobayer Hoque Siddique's personal brand. The platform features an interactive, premium design with multiple themes, animations, and a complete service portfolio presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using **React with TypeScript** and follows a component-based architecture. The application uses **Vite** as the build tool and development server, providing fast hot module replacement and optimized builds. The project implements a **single-page application (SPA)** pattern using Wouter for client-side routing.

**Component Structure:**
- Modular component architecture with reusable UI components in `/components/ui/`
- Feature-specific components for different sections (Hero, Services, Brands, Portfolio, Contact)
- Custom hooks for scroll animations and responsive behavior
- Shadcn/ui component library for consistent design system

**Styling Solution:**
- **Tailwind CSS** for utility-first styling approach
- CSS custom properties for theme variables
- Multi-theme support (light, dark, gradient, minimal) with theme provider context
- Responsive design with mobile-first approach

**State Management:**
- React Context API for theme management
- TanStack React Query for server state management and API interactions
- Local state management using React hooks

### Backend Architecture
The server-side is built with **Express.js** following a RESTful API pattern. The application uses a modular route structure with middleware for logging and error handling.

**API Design:**
- Express server with middleware for JSON parsing and URL encoding
- Custom request logging middleware for API monitoring
- Centralized error handling middleware
- Route registration system for API endpoints prefixed with `/api`

**Development Server Integration:**
- Vite middleware integration for development mode
- Custom logging system with formatted timestamps
- Hot module replacement support during development

### Data Storage Solutions
The application is configured to use **PostgreSQL** as the primary database with **Drizzle ORM** for database operations and schema management.

**Database Configuration:**
- Drizzle ORM with PostgreSQL dialect
- Schema definition in TypeScript with type safety
- Database migrations support through Drizzle Kit
- Environment-based database URL configuration
- Neon Database integration for serverless PostgreSQL

**Storage Interface:**
- Abstract storage interface (IStorage) for CRUD operations
- In-memory storage implementation for development/testing
- User management system with basic authentication schema

### Authentication and Authorization
The application includes a basic user authentication system with username/password authentication.

**Security Features:**
- User schema with unique usernames and password fields
- UUID-based user identification
- Zod schema validation for data integrity
- Environment variable management for sensitive configuration

### External Dependencies
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Framer Motion ecosystem**: Animation and interaction libraries (Embla Carousel for carousels)
- **Lucide React**: Icon library for consistent iconography
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form handling with validation support
- **Hookform Resolvers**: Integration between React Hook Form and validation libraries
- **Date-fns**: Date manipulation and formatting utilities
- **CMDK**: Command palette and search functionality
- **Class Variance Authority (CVA)**: Type-safe component variants
- **Clsx & Tailwind Merge**: Conditional CSS class utilities

The architecture prioritizes modern development practices with TypeScript for type safety, modular component design for maintainability, and a flexible theming system for brand customization across multiple sub-brands.