# Source Tree Analysis

## Project Structure: Monorepo (Bun Workspaces)

The project follows a standard Turborepo-style structure optimized for code reuse across platforms.

```text
sheepgpt/
├── apps/
│   ├── web/                  # Next.js 16 Web Application [Active]
│   │   ├── app/              # App Router Pages
│   │   ├── public/           # Static Assets
│   │   └── package.json      # Web Dependencies
│   │
│   ├── desktop/              # Tauri Desktop App [Placeholder]
│   ├── mobile/               # Expo Mobile App [Placeholder]
│   └── plugin/               # WXT Browser Extension [Placeholder]
│
├── packages/
│   ├── core/                 # Business Logic Hub [Active]
│   │   ├── src/
│   │   │   ├── types/        # Shared Types
│   │   │   └── index.ts      # Main Entry Point
│   │   └── package.json      # Shared Dependencies (AI SDK, etc.)
│   │
│   ├── db/                   # Database Schema & Migrations [Empty]
│   └── ui/                   # Shared Design System [Empty]
│
├── docs/                     # Project Documentation
├── .agent/                   # AI Agent Workflows
└── package.json              # Root Configuration
```

## Critical Integration Points

- **`apps/web` → `packages/core`**: The Web app consumes business logic directly from Core. Currently implemented via direct function import (`coreHealthCheck`), but architected to use tRPC.
- **`packages/core` → `packages/db`**: (Planned) Core will own all database interactions.
- **`apps/*` → `packages/ui`**: (Planned) All apps will consume the shared component library.
