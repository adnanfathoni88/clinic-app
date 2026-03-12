# Clinic App - Project Structure

## Overview

A Next.js 16 clinic application built with React 19, TypeScript, Prisma ORM, and Tailwind CSS 4.

---

## Directory Structure

```
clinic-app/
├── src/                          # Source code
│   ├── app/                      # Next.js App Router
│   │   ├── (dashboard)/          # Route group for dashboard pages
│   │   │   └── roles/
│   │   │       └── page.tsx      # Roles management page
│   │   ├── generated/            # Generated code (Prisma client)
│   │   │   └── prisma/           # Prisma generated types
│   │   ├── favicon.ico
│   │   ├── globals.css           # Global styles (Tailwind)
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   │
│   ├── features/                 # Feature-based modules
│   │   └── roles/                # Roles feature
│   │       ├── api/              # Feature API layer
│   │       │   └── roles.api.ts  # Roles API functions
│   │       ├── components/       # Feature components
│   │       │   └── RoleTable.tsx # Roles table component
│   │       └── hooks/            # Feature hooks
│   │           └── useRoles.tsx  # Roles data fetching hook
│   │
│   ├── lib/                      # Utility libraries
│   │   └── prisma.ts             # Prisma client instance
│   │
│   ├── providers/                # Context providers
│   │   └── query.tsx             # TanStack Query provider
│   │
│   └── services/                 # Service layer
│       └── role.service.ts       # Role service functions
│
├── prisma/                       # Prisma ORM
│   ├── migrations/               # Database migrations
│   └── schema.prisma             # Database schema
│
├── public/                       # Static assets
│
├── documentation/                # Project documentation
│   └── PROJECT_STRUCTURE.md      # This file
│
├── .next/                        # Next.js build output
├── node_modules/                 # Dependencies
│
├── .gitignore
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Project dependencies & scripts
├── package-lock.json             # Dependency lock file
├── postcss.config.mjs            # PostCSS configuration
├── prisma.config.ts              # Prisma configuration
├── README.md
└── tsconfig.json                 # TypeScript configuration
```

---

## Technology Stack

| Category       | Technology          | Version    |
|----------------|---------------------|------------|
| Framework      | Next.js             | 16.1.6     |
| UI Library     | React               | 19.2.3     |
| Language       | TypeScript          | ^5         |
| ORM            | Prisma              | ^7.4.2     |
| Database       | PostgreSQL          | -          |
| Styling        | Tailwind CSS        | ^4         |
| Data Fetching  | TanStack Query      | ^5.90.21   |
| Linting        | ESLint              | ^9         |

---

## Key Files Description

### Configuration Files

| File                    | Purpose                                      |
|-------------------------|----------------------------------------------|
| `next.config.ts`        | Next.js framework configuration              |
| `tsconfig.json`         | TypeScript compiler options                  |
| `eslint.config.mjs`     | ESLint linting rules                         |
| `postcss.config.mjs`    | PostCSS plugins configuration                |
| `prisma.config.ts`      | Prisma ORM configuration                     |
| `package.json`          | Project metadata and dependencies            |

### App Router Files

| File                    | Purpose                                      |
|-------------------------|----------------------------------------------|
| `src/app/layout.tsx`    | Root layout component                        |
| `src/app/page.tsx`      | Home page component                          |
| `src/app/globals.css`   | Global CSS with Tailwind directives          |

### Database Schema

**Prisma Schema** (`prisma/schema.prisma`):
- **Model**: `Role`
  - `id`: Integer (auto-incrementing primary key)
  - `name`: String
  - `createdAt`: DateTime (default: now)
  - `updatedAt`: DateTime (auto-updated)

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Feature Modules

### Roles Management

| Layer         | File Path                                  |
|---------------|--------------------------------------------|
| API           | `src/features/roles/api/roles.api.ts`      |
| Service       | `src/services/role.service.ts`             |
| Page          | `src/app/(dashboard)/roles/page.tsx`       |
| Component     | `src/features/roles/components/RoleTable.tsx` |
| Hook          | `src/features/roles/hooks/useRoles.tsx`    |

---

## Generated Code

- **Prisma Client**: `src/app/generated/prisma/`
  - Auto-generated TypeScript types and client from `schema.prisma`

---

## Notes

- Route groups `(dashboard)` are used for organizational purposes and don't affect the URL path
- Prisma client is generated to `app/generated/prisma` (custom output path)
- Tailwind CSS v4 uses the new `@tailwindcss/postcss` package
