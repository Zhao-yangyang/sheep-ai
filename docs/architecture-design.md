# SheepGPT Architecture Design Blueprint

Based on the "Next-Gen 2025 AI SaaS" reference architecture.

## 1. Core Philosophy

- **Unified Logic**: 90%+ code reuse via `packages/core`. All platforms (Web, Desktop, Mobile, Extension) are just "shells" consuming the Core.
- **Fail Fast**: Heavy reliance on TypeScript, tRPC, and Zod to catch errors at compile time.
- **Performance First**: Bun for dev, Tailwind 4 for style, Rust (Tauri) for desktop, Serverless for scale.
- **AI Native**: Vercel AI SDK 6.0 standardizes all LLM interactions; RAG/Vector built into the primary DB (Supabase).

## 2. Technology Stack

### Runtime & Build

- **Runtime**: Bun (Dev), Node.js 22 (Prod Docker)
- **Monorepo**: Bun Workspaces + Turborepo
- **CI/CD**: GitHub Actions (Matrix Builds for Desktop, EAS for Mobile)

### Backend & Data

- **API Framework**: tRPC v11 (Serverless) + React Query
- **Database**: Supabase (PostgreSQL + pgvector for RAG)
- **Queue/Async**: Upstash QStash (HTTP-based queue)
- **Caching/Rate Limit**: Upstash Redis
- **Auth**: Supabase Auth (SSR + PKCE flow)

### Frontend & UI

- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS v4
- **Components**: Shadcn UI (Radix based) + Framer Motion
- **State**: Zustand (Global UI), React Query (Server), nuqs (URL)

### AI Stack

- **Orchestration**: Vercel AI SDK 6.0
- **Observability**: Langfuse (Cost/Quality tracking)
- **Models**: Dynamic routing (GPT-4o/5, Gemini Pro depending on task)

### Platforms

- **Web**: Next.js App Router
- **Desktop**: Tauri v2 (Rust Sidecar for heavy lifting like FFmpeg)
- **Mobile**: Expo (React Native + Nativewind)
- **Extension**: WXT Framework (Chrome/Edge)

## 3. Architecture Structure (Monorepo)

```text
sheepgpt/
├── apps/
│   ├── web/          # Next.js (The primary SaaS interface)
│   ├── desktop/      # Tauri (Wraps web or custom views, local heavy tasks)
│   ├── mobile/       # Expo (iOS/Android native experience)
│   └── plugin/       # WXT (Browser extension for "Side Panel" experience)
├── packages/
│   ├── core/         # THE BRAIN. tRPC routers, AI logic, DB calls.
│   ├── db/           # Drizzle/Prisma schema, migrations, seed types.
│   └── ui/           # Shared Shadcn components, Tailwind config.
└── docker/           # Deployment configurations
```

## 4. Implementation Roadmap

### Phase 1: The Foundation (Infrastructure)

_Goal: A working "Hello World" that connects the full stack locally._

1.  **Monorepo Hygiene**: Ensure Bun workspaces and `packages/core` exports are correctly configured.
2.  **Database Ops**: Initialize Supabase locally, set up `packages/db` with schema push/pull scripts.
3.  **tRPC Backbone**: create the `appRouter` in `core` and expose it to `apps/web`.
4.  **UI System**: Setup Tailwind 4 and Shadcn in `packages/ui` to be consumable by apps.

### Phase 2: Common Service Layer (The "User" Logic)

_Goal: User management and basic SaaS scaffolding (since specific business logic is undecided)._

1.  **Auth Integration**: Implement Supabase SSR Auth in Next.js.
2.  **Commercialization Skeleton**: Setup Lemon Squeezy webhook handlers (even if generic).
3.  **User Quota System**: Implement the `users_time` or generic quota schema with Upstash Redis limiting.

### Phase 3: AI Gateway Integration

_Goal: Ready-to-use AI pipelines._

1.  **SDK Setup**: Configure Vercel AI SDK in `packages/core`.
2.  **Observability**: Connect Langfuse.
3.  **Generic Agent**: Create a "General Chat" agent to test the streaming pipeline.

### Phase 4: Platform Expansion

_Goal: Bring other apps online._

1.  **Desktop**: Initialize Tauri in `apps/desktop`, connect to Localhost core for dev.
2.  **Extension**: Initialize WXT in `apps/plugin`, setup auth sharing (cookies).

## 5. Next Immediate Steps (Actionable)

1.  **Analyze current code**: Verify if `packages/core` and `apps/web` are linked correctly.
2.  **Database**: Check if Supabase connection is valid.
3.  **Scaffold**: Populate the empty `ui` and `db` packages if they are empty.
