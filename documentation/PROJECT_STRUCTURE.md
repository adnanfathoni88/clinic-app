# Clinic App - Project Structure Documentation

## Overview

This is a **Next.js 16** application built with **TypeScript**, designed as a clinic management system. The project follows a feature-based architecture with clear separation of concerns.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.1.6 (App Router) |
| **Language** | TypeScript 5 |
| **Database** | PostgreSQL |
| **ORM** | Prisma 7.4.2 |
| **State Management** | TanStack React Query 5.90.21 |
| **Styling** | Tailwind CSS 4 |
| **React** | 19.2.3 |

---

## Project Structure

```
clinic-app/
├── documentation/          # Project documentation
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma       # Prisma schema definition
│   └── migrations/         # Database migration files
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   │   ├── (dashboard)/    # Dashboard route group
│   │   │   └── roles/      # Roles management page
│   │   ├── api/            # API routes
│   │   │   └── roles/      # Roles API endpoints
│   │   ├── generated/      # Auto-generated Prisma client
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── features/           # Feature-based modules
│   │   └── roles/          # Roles feature module
│   │       ├── api/        # Feature API functions
│   │       ├── components/ # React components
│   │       └── hooks/      # Custom React hooks
│   ├── lib/                # Core utilities and configurations
│   │   └── prisma.ts       # Prisma client singleton
│   ├── providers/          # React context providers
│   │   └── query.tsx       # React Query provider
│   └── services/           # Business logic layer
│       └── role.service.ts # Role business logic
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── eslint.config.mjs       # ESLint configuration
```

---

## Directory Descriptions

### `/src/app`
Next.js App Router directory containing all routes, layouts, and API endpoints.

- **`(dashboard)/`** - Route group for dashboard pages (parentheses exclude from URL path)
- **`api/`** - API route handlers (REST endpoints)
- **`generated/`** - Auto-generated Prisma client (do not modify manually)
- **`layout.tsx`** - Root layout with providers
- **`page.tsx`** - Home page entry point

### `/src/features`
Feature-based modules following the **Feature-Sliced Design** pattern. Each feature contains its own API functions, components, and hooks.

**Structure per feature:**
```
features/<feature-name>/
├── api/        # API functions (fetch calls)
├── components/ # React components specific to feature
└── hooks/      # Custom React hooks
```

### `/src/lib`
Core utilities and singleton instances.

- **`prisma.ts`** - Prisma client singleton with connection pooling

### `/src/providers`
React context providers for global state and configuration.

- **`query.tsx`** - TanStack React Query client provider

### `/src/services`
Business logic layer that interacts with the database via Prisma.

### `/prisma`
Database schema and migrations.

- **`schema.prisma`** - Database models and Prisma configuration

---

## Key Files Explained

### `src/lib/prisma.ts`
Prisma client singleton with connection pooling for PostgreSQL:

```typescript
// Prevents multiple Prisma instances in development
const globalForPrisma = global as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })
```

### `src/providers/query.tsx`
React Query client provider for server state management:

```typescript
const queryClient = new QueryClient()
// Provides caching, background updates, and query invalidation
```

### `prisma/schema.prisma`
Database schema definition:

```prisma
model Role {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## Feature Module: Roles

The **Roles** feature demonstrates the complete architecture pattern:

```
src/features/roles/
├── api/
│   └── roles.api.ts      # HTTP fetch functions
├── components/
│   ├── CreateRoleModal.tsx
│   ├── DeleteRoleModal.tsx
│   ├── EditRoleModal.tsx
│   ├── RoleForm.tsx
│   └── RoleTable.tsx
└── hooks/
    └── useRoles.tsx      # React Query hooks
```

### Data Flow

1. **Components** → Use custom hooks (`useRoles`, `useCreateRole`, etc.)
2. **Hooks** → Call API functions (`roles.api.ts`)
3. **API Functions** → Make HTTP requests to `/api/roles`
4. **API Routes** → Call service layer (`role.service.ts`)
5. **Service Layer** → Interact with database via Prisma

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/roles` | Fetch all roles |
| `POST` | `/api/roles` | Create new role |
| `PUT` | `/api/roles` | Update role (requires `id` and `name`) |
| `DELETE` | `/api/roles/:id` | Delete role by ID |

---

## Custom Hooks

### `useRoles()`
Fetches all roles with React Query caching.

### `useCreateRole()`
Creates a role and invalidates the roles query cache.

### `useUpdateRole()`
Updates a role and invalidates the roles query cache.

### `useDeleteRole()`
Deletes a role and invalidates the roles query cache.

---

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Database commands
npx prisma generate    # Generate Prisma client
npx prisma migrate dev # Create and apply migration
npx prisma studio      # Open Prisma Studio
```

---

## Architecture Patterns

### 1. **Feature-Sliced Design**
Each feature is self-contained with its own API, components, and hooks.

### 2. **Server State Management**
TanStack React Query handles caching, background updates, and query invalidation.

### 3. **Singleton Pattern**
Prisma client uses singleton pattern to prevent multiple connections.

### 4. **Route Groups**
Next.js route groups `(dashboard)` organize pages without affecting URL structure.

### 5. **Service Layer**
Business logic is separated from API routes for better testability.

---

## Environment Variables

Required environment variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/clinic_db"
```

---

## Database Setup

1. Set `DATABASE_URL` environment variable
2. Run migrations:
   ```bash
   npx prisma migrate dev
   ```
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

---

## Future Enhancements

- [ ] Add authentication/authorization
- [ ] Implement patient management feature
- [ ] Add appointment scheduling
- [ ] Create doctor/staff management
- [ ] Add queue management system
- [ ] Implement real-time notifications
- [ ] Add reporting and analytics

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
