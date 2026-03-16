# Application Flow Documentation

This document explains how the application flows from route access to database queries.

---

## Request Flow Overview

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Browser   │ ──► │  Next.js    │ ──► │   API       │ ──► │   Service   │ ──► │   Prisma    │
│   (Client)  │     │  Route/Page │     │   Handler   │     │   Layer     │     │   (ORM)     │
└─────────────┘     └──────────────┘     └─────────────┘     └──────────────┘     └─────────────┘
                                                                                       │
                                                                                       ▼
                                                                                ┌─────────────┐
                                                                                │  PostgreSQL │
                                                                                │   Database  │
                                                                                └─────────────┘
```

---

## Flow 1: Page Load (Client-Side Rendering with React Query)

### Example: Loading Roles Page (`/roles`)

```
User visits /roles → RolesPage → RoleTable → useRoles → API → /api/roles → Service → Prisma → DB
```

### Step-by-Step Breakdown

#### Step 1: Route Access
**File:** `src/app/(dashboard)/roles/page.tsx`

```typescript
import CreateRoleModal from "@/src/features/roles/components/CreateRoleModal"
import RoleTable from "@/src/features/roles/components/RoleTable"

export default function RolesPage() {
    return (
        <div>
            <CreateRoleModal />
            <RoleTable />
        </div>
    )
}
```

**What happens:**
- Next.js App Router matches the URL `/roles` to this page
- The `RolesPage` component renders two components: `CreateRoleModal` and `RoleTable`

---

#### Step 2: Component Renders with Hook
**File:** `src/features/roles/components/RoleTable.tsx`

```typescript
'use client'

import { useRoles } from "../hooks/useRoles"

export default function RoleTable() {
    const { data: roles, isLoading } = useRoles()  // ← Custom hook called here

    if (isLoading) return <div>Loading...</div>

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {roles?.map((role) => (
                    <tr key={role.id}>
                        <td>{role.id}</td>
                        <td>{role.name}</td>
                        <td>
                            <EditRoleModal role={role} />
                            <DeleteRoleModal role={role} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
```

**What happens:**
- Component mounts and calls `useRoles()` hook
- Hook triggers a fetch to `/api/roles`
- Shows loading state while fetching

---

#### Step 3: Custom Hook Triggers Query
**File:** `src/features/roles/hooks/useRoles.tsx`

```typescript
import { useQuery } from "@tanstack/react-query"
import { getRoles } from "../api/roles.api"

export const useRoles = () => {
    return useQuery<Role[]>({
        queryKey: ["roles"],
        queryFn: getRoles  // ← API function called here
    })
}
```

**What happens:**
- React Query manages the fetch with caching
- Query is cached with key `["roles"]`
- Calls `getRoles()` API function

---

#### Step 4: API Function Makes HTTP Request
**File:** `src/features/roles/api/roles.api.ts`

```typescript
export async function getRoles() {
    const res = await fetch("/api/roles")  // ← HTTP request to API route

    if (!res.ok) {
        throw new Error("Failed to fetch roles")
    }

    return res.json()  // ← Returns JSON response
}
```

**What happens:**
- Makes HTTP GET request to `/api/roles`
- Returns parsed JSON response
- Error handling for failed requests

---

#### Step 5: API Route Handler Receives Request
**File:** `src/app/api/roles/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server"
import { getRoles } from "@/src/services/role.service"

// GET handler
export async function GET() {
    try {
        const roles = await getRoles()  // ← Service layer called here
        return NextResponse.json(roles)
    } catch (error) {
        console.error("Failed to fetch roles:", error)
        return NextResponse.json(
            { error: "Failed to fetch roles" },
            { status: 500 }
        )
    }
}
```

**What happens:**
- Next.js routes HTTP GET to this handler
- Calls `getRoles()` from service layer
- Returns JSON response to client

---

#### Step 6: Service Layer Executes Business Logic
**File:** `src/services/role.service.ts`

```typescript
import { prisma } from "@/src/lib/prisma"

export async function getRoles() {
    return prisma.role.findMany({
        orderBy: {
            name: 'asc',
        },
    })
}
```

**What happens:**
- Uses Prisma client to query database
- Fetches all roles ordered by name
- Returns array of role objects

---

#### Step 7: Prisma Client Queries Database
**File:** `src/lib/prisma.ts`

```typescript
import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({ adapter })
```

**What happens:**
- Prisma translates query to SQL
- Executes against PostgreSQL via connection pool
- Returns results back through the chain

---

#### Step 8: Data Returns to Component

```
DB → Prisma → Service → API Route → API Function → Hook → Component → UI
```

**Final Result:**
- Data cached by React Query
- Component re-renders with data
- Table displays roles

---

## Flow 2: Create Role (Mutation)

### Example: Creating a New Role

```
User clicks "Create" → Form Submit → useCreateRole → POST /api/roles → Service → Prisma → DB
```

### Step-by-Step Breakdown

#### Step 1: User Interaction
**File:** `src/features/roles/components/CreateRoleModal.tsx`

```typescript
export default function CreateRoleModal() {
    const [name, setName] = useState("")
    const { mutate, isPending } = useCreateRole()  // ← Mutation hook

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        mutate(name, {  // ← Trigger mutation
            onSuccess: () => {
                setIsOpen(false)
                setName("")
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Save</button>
        </form>
    )
}
```

---

#### Step 2: Mutation Hook
**File:** `src/features/roles/hooks/useRoles.tsx`

```typescript
export const useCreateRole = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createRole,  // ← API function
        onSuccess: () => {
            // Invalidate cache to refetch roles
            queryClient.invalidateQueries({ queryKey: ["roles"] })
        }
    })
}
```

**What happens:**
- Calls `createRole()` API function
- On success, invalidates `["roles"]` cache
- Triggers automatic refetch of roles

---

#### Step 3: API Function
**File:** `src/features/roles/api/roles.api.ts`

```typescript
export async function createRole(name: string) {
    const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    })

    return res.json()
}
```

---

#### Step 4: API Route Handler
**File:** `src/app/api/roles/route.ts`

```typescript
export async function POST(request: NextRequest) {
    const body = await request.json()
    const { name } = body

    const role = await createRole(name)  // ← Service layer

    return NextResponse.json(role, { status: 201 })
}
```

---

#### Step 5: Service Layer
**File:** `src/services/role.service.ts`

```typescript
export async function createRole(name: string) {
    return prisma.role.create({
        data: { name }
    })
}
```

---

#### Step 6: Database Insert

```
Component → Hook → API → Route → Service → Prisma → INSERT INTO role → DB
```

**After successful insert:**
1. New role returned to component
2. React Query invalidates cache
3. `useRoles()` automatically refetches
4. Table updates with new role

---

## Flow 3: Update Role

```
User clicks Edit → EditRoleModal → useUpdateRole → PUT /api/roles/[id] → Service → Prisma → DB
```

### API Route
**File:** `src/app/api/roles/route.ts`

```typescript
export async function PUT(request: NextRequest) {
    const body = await request.json()
    const { id, name } = body

    const role = await prisma.role.update({
        where: { id },
        data: { name },
    })

    return NextResponse.json(role)
}
```

---

## Flow 4: Delete Role

```
User clicks Delete → DeleteRoleModal → useDeleteRole → DELETE /api/roles/[id] → Service → Prisma → DB
```

---

## Complete Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Pages     │  │ Components  │  │    Hooks    │  │  API Func   │    │
│  │  (page.tsx) │  │  (.tsx)     │  │  (useX.tsx) │  │  (.api.ts)  │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
│         │                │                │                │            │
│         └────────────────┴────────────────┴────────────────┘            │
│                              │                                          │
│                    React Query Cache                                    │
└──────────────────────────────┼──────────────────────────────────────────┘
                               │ HTTP (fetch)
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         API ROUTE LAYER                                  │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    /api/roles/route.ts                          │   │
│  │  GET()  → GET handler                                           │   │
│  │  POST() → POST handler                                          │   │
│  │  PUT()  → PUT handler                                           │   │
│  │  DELETE() → DELETE handler (in [id]/route.ts)                   │   │
│  └────────────────────────────┬────────────────────────────────────┘   │
└───────────────────────────────┼─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         SERVICE LAYER                                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                  role.service.ts                                │   │
│  │  getRoles() → prisma.role.findMany()                            │   │
│  │  createRole() → prisma.role.create()                            │   │
│  │  updateRole() → prisma.role.update()                            │   │
│  │  deleteRole() → prisma.role.delete()                            │   │
│  └────────────────────────────┬────────────────────────────────────┘   │
└───────────────────────────────┼─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATA ACCESS LAYER                                │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    lib/prisma.ts                                │   │
│  │  - Prisma Client singleton                                      │   │
│  │  - Connection pooling (pg)                                      │   │
│  │  - Adapter pattern (PrismaPg)                                   │   │
│  └────────────────────────────┬────────────────────────────────────┘   │
└───────────────────────────────┼─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATABASE LAYER                                   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    PostgreSQL                                   │   │
│  │  Table: role                                                    │   │
│  │  - id (INT, PK, AUTO)                                           │   │
│  │  - name (STRING)                                                │   │
│  │  - createdAt (TIMESTAMP)                                        │   │
│  │  - updatedAt (TIMESTAMP)                                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## File Call Chain Summary

### Read Operation (GET /roles)

```
1. src/app/(dashboard)/roles/page.tsx
   ↓ renders
2. src/features/roles/components/RoleTable.tsx
   ↓ calls hook
3. src/features/roles/hooks/useRoles.tsx
   ↓ calls API function
4. src/features/roles/api/roles.api.ts
   ↓ HTTP GET /api/roles
5. src/app/api/roles/route.ts (GET handler)
   ↓ calls service
6. src/services/role.service.ts
   ↓ uses Prisma
7. src/lib/prisma.ts
   ↓ queries
8. PostgreSQL Database
```

### Write Operation (POST /roles)

```
1. src/features/roles/components/CreateRoleModal.tsx
   ↓ submits form
2. src/features/roles/hooks/useRoles.tsx (useCreateRole)
   ↓ calls API function
3. src/features/roles/api/roles.api.ts
   ↓ HTTP POST /api/roles
4. src/app/api/roles/route.ts (POST handler)
   ↓ calls service
5. src/services/role.service.ts
   ↓ uses Prisma
6. src/lib/prisma.ts
   ↓ inserts
7. PostgreSQL Database
   ↓ returns
8. React Query invalidates cache → refetches roles
```

---

## Key Concepts

### 1. **Separation of Concerns**
- **Components:** UI rendering only
- **Hooks:** State management and data fetching
- **API Functions:** HTTP communication
- **Routes:** Request handling
- **Services:** Business logic
- **Prisma:** Data access

### 2. **React Query Caching**
- Queries are cached by key (`["roles"]`)
- Mutations invalidate cache
- Automatic refetch on invalidation

### 3. **Singleton Pattern**
- Single Prisma instance prevents connection exhaustion
- Global variable stores instance in development

### 4. **Type Safety**
- TypeScript throughout entire stack
- Prisma generates types from schema
- End-to-end type safety

---

## Quick Reference

| Layer | Location | Purpose |
|-------|----------|---------|
| **Pages** | `src/app/(dashboard)/**/page.tsx` | Route entry points |
| **Components** | `src/features/**/components/` | UI elements |
| **Hooks** | `src/features/**/hooks/` | Custom React hooks |
| **API Functions** | `src/features/**/api/` | Client-side fetch calls |
| **API Routes** | `src/app/api/**/route.ts` | Server-side handlers |
| **Services** | `src/services/` | Business logic |
| **Prisma** | `src/lib/prisma.ts` | Database client |
| **Schema** | `prisma/schema.prisma` | Database models |
