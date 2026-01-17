# Colegio Dual Website

## Overview

This is a bilingual Ecuadorian-German school website built to improve user experience and drive admissions conversions. The site showcases the school's unique "learning by doing" methodology, combining Project-Based Learning (ABP) with a Dual Education system where students gain real-world experience through corporate partnerships.

The main goal is to help prospective families understand the school's value proposition within 5 seconds and guide them through the admissions process with minimal friction.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom theme variables and shadcn/ui component library
- **State Management**: TanStack React Query for server state
- **Animations**: Framer Motion for smooth transitions and scroll animations
- **Forms**: React Hook Form with Zod validation

### Design System
- **Typography**: Plus Jakarta Sans for headings, Inter for body text
- **Color Palette**: Institutional red primary (#DC1E35) with neutral black secondary
- **Components**: Radix UI primitives wrapped with shadcn/ui styling conventions
- **Layout**: Mobile-first responsive design with container-based layouts

### Backend Architecture
- **Server**: Express.js running on Node.js
- **Database**: PostgreSQL with Drizzle ORM for type-safe queries
- **Schema**: Defined in `shared/schema.ts` using Drizzle's PostgreSQL adapter
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Storage**: Abstracted storage interface supporting both in-memory and database backends

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route-based page components
    lib/          # Utilities and data files
    hooks/        # Custom React hooks
server/           # Express backend
shared/           # Shared types and schema between client/server
attached_assets/  # Stock images and static assets
```

### Key Pages
- Home: Hero with value proposition, stats, academic offerings, testimonials
- Admisiones: Step-by-step admission process with FAQ accordion
- Oferta Académica: Academic levels with tabbed navigation
- Propuesta: ABP and Dual education methodology explanation
- Contacto: Contact form with validation
- Sobre Nosotros: History, mission, and vision

## External Dependencies

### Database
- **PostgreSQL**: Primary database configured via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migration and schema push tooling

### UI Component Libraries
- **Radix UI**: Full suite of accessible primitives (dialogs, accordions, tabs, etc.)
- **shadcn/ui**: Pre-styled component variants using Tailwind and Radix
- **Lucide React**: Icon library

### Build Tools
- **Vite**: Frontend bundler with HMR
- **esbuild**: Server-side bundling for production
- **TypeScript**: Full type safety across client and server

### Form Handling
- **React Hook Form**: Form state management
- **Zod**: Schema validation with `@hookform/resolvers`
- **drizzle-zod**: Auto-generate Zod schemas from Drizzle tables

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Dev tooling integration
- **@replit/vite-plugin-dev-banner**: Development mode indicator