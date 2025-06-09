# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Settings
- **Primary Language**: Korean (한국어)
- Always respond in Korean unless specifically asked to use English
- Error messages and explanations should be in Korean

## Common Development Commands

All package management uses `pnpm`:

```bash
# Development
pnpm serve                # Clean cache and start dev server
pnpm build                # Clean and build for production
pnpm start                # Build and start production server
pnpm vercel:build         # Production build with Prisma setup

# Database Operations
pnpm db:generate          # Generate Prisma client
pnpm db:migrate           # Create and apply migration named "update"
pnpm db:reset             # Reset database with migrations
pnpm db:studio            # Open Prisma Studio

# Code Quality
pnpm lint                 # Run ESLint
pnpm lint:fix             # Run ESLint with auto-fix

# Utilities
pnpm create:admin         # Create admin user via script
pnpm clean                # Clean pnpm store
```

## Project Architecture

### Route Groups Structure
- `(common)/` - Public blog pages (home, posts, categories, search, about)
- `(auth)/` - Authentication pages (signin, signup) 
- `(admin)/` - Admin dashboard and management pages

### Entity-Based Architecture
The project follows a domain-driven design with entities in `/app/_entities/`:

- **auth/** - User session management with JWT authentication
- **posts/** - Blog post CRUD operations with hooks
- **categories/** - Category management
- **hashtags/** - Hashtag system
- **users/** - User management with authentication
- **user-auth/** - User authentication data
- **common/** - Shared state and utilities

Each entity contains:
- `*.types.ts` - TypeScript interfaces
- `*.api.ts` - API client functions  
- `*.store.ts` - Zustand state management
- `*.keys.ts` - React Query keys
- `hooks/` - Custom React Query hooks

### State Management
- **Global State**: Zustand stores with Immer middleware
- **Server State**: TanStack React Query with custom hooks
- **Persistence**: localStorage via Zustand persist middleware

### Authentication System
- JWT-based with access/refresh tokens stored in HTTP-only cookies
- Authentication middleware at `/app/api/_libs/middleware/auth.ts`
- User session stored in Zustand with localStorage persistence
- Admin-only system (no public user registration)

### Database Design
PostgreSQL with Prisma ORM:
- Models use UUID as primary keys with `@@map` to snake_case table names
- Relationships use `onDelete: Cascade`
- Post system with categories, hashtags (many-to-many), and users
- PostHashtag junction table for post-hashtag relationships

### API Architecture
REST API structure in `/app/api/`:
- `/auth/*` - Authentication endpoints
- `/admin/*` - Admin-specific operations
- `/posts/*` - Blog post CRUD
- `/categories/*` - Category management
- `/hashtags/*` - Hashtag operations
- `/users/*` - User management

API utilities:
- `/api/_libs/prisma.ts` - Database client
- `/api/_libs/tools/jwt.ts` - JWT utilities  
- `/api/_libs/tools/bcrypt.ts` - Password hashing
- `/api/_libs/middleware/` - Request middleware

### Styling and UI
- TailwindCSS v4 with custom CSS variables
- shadcn/ui component library
- class-variance-authority for component variants
- Custom components in `(common)/_components/ui/`

## Development Conventions

### Import Paths
- `@/` alias points to the `app/` directory
- Always use index.ts exports: `export { Component } from "./Component"`
- Import from entity indexes: `import { useAuth } from '@/_entities/auth'`

### Code Style
- All statements must have blank lines between them for readability
- Error messages in Korean
- Object properties on separate lines when returning objects
- Function parameters on separate lines when multiple parameters
- Use `find` prefix for variables when checking if data exists

### API Development
- Access tokens managed via `/app/api/_libs/tools/jwt.ts`
- Password hashing via `/app/api/_libs/tools/bcrypt.ts` 
- Database operations via `/app/api/_libs/prisma.ts`
- Route params are wrapped in Promise: `params: Promise<{id: string}>`
- Cookies are also Promise-based, use `await cookies()`
- Use NextResponse.json with proper formatting for multiple arguments

### Component Development
- Common components in `/app/(common)/_components/`
- Use class-variance-authority for custom components (see `/file template/component_example.tsx`)
- Export components through index.ts files
- Follow the component structure in template files

### Database Schema
- Models start with uppercase, map to snake_case tables
- UUID primary keys with auto-generation
- Snake_case column names
- Cascade deletes for relationships