# AGENTS.md

This file provides context and instructions for AI agents working in this repository.

## Project Overview

**sheepGPT** is a modern AI SaaS monorepo based on the [BibiGPT](https://github.com/bibigpt) architecture.
- **Goal**: Video transcription, summarization, and RAG-based Q&A.
- **Stack**: Next.js 16, React 19, tRPC v11, Supabase (Postgres + Vector), Vercel AI SDK 6.0.
- **Monorepo**: Managed by **Bun Workspaces**.

## Environment & Setup

- **Package Manager**: `bun` (v1.2+). DO NOT use `npm` or `yarn` or `pnpm`.
- **Node Version**: >= 22.0.0.
- **Setup**:
  1. `bun install`
  2. `cp .env.example .env` (Requires Supabase and OpenAI/Groq keys)
  3. `bun run db:push` (Push schema to Supabase)
  4. `bun run db:types` (Generate TS types)

## Commands

### Development
- `bun run dev`: Start Web app (default filter).
- `bun run dev:all`: Start all apps.
- `bun run --filter @sheepgpt/web dev`: Start specific app.

### Quality & Build
- `bun run lint`: Run Biome check.
- `bun run lint:fix`: Run Biome check and fix.
- `bun run typecheck`: Run TypeScript type checking.
- `bun run build`: Build all apps/packages.
- `bun run clean`: Clean build artifacts.

### Database (Supabase)
- `bun run db:push`: Push Drizzle schema changes to database.
- `bun run db:types`: Regenerate database types.

## Architecture & Structure

### Directory Structure
- `apps/`
  - `web`: Next.js 16 application (Main entry).
  - `desktop`: Tauri desktop app.
  - `plugin`: WXT browser extension.
  - `mobile`: Expo mobile app.
- `packages/`
  - `core`: Shared business logic, tRPC routers, AI services.
  - `ui`: Shared Shadcn UI components.
  - `db`: Database schema (Drizzle ORM) and client.

### Key Technologies
- **API**: tRPC v11 with React Query. strict type safety from DB to UI.
- **AI**: Vercel AI SDK 6.0 for streaming and tool calling.
- **Database**: Supabase with `pgvector` for semantic search.
- **Styling**: Tailwind CSS + Shadcn UI.

## Development Workflow

### Adding a New Feature
1. **Database**: Update `packages/db/schema` if needed, then run `bun run db:push`.
2. **Logic**: Implement core logic in `packages/core`.
3. **API**: Create/Update tRPC router in `packages/core/src/api/trpc`.
   - Define input/output with Zod.
   - Use `protectedProcedure` for auth-required endpoints.
4. **UI**: Consume in apps using `useTRPCQuery` or `useTRPCMutation`.

### Code Style Guidelines
- **Linting**: Follow Biome rules.
- **Types**: strict `noImplicitAny`. Use Zod for runtime validation.
- **Components**: Functional components with hooks.
- **Async**: Use `async/await` over raw promises.
- **Imports**: Use `@sheepgpt/*` aliases for internal packages.

## Security & Best Practices
- **Secrets**: Never commit `.env` files.
- **Validation**: Validate all inputs using Zod schemas at the tRPC boundary.
- **AI**: Stream AI responses where possible for better UX.
