# SheepGPT Documentation Index

## Project Overview

**SheepGPT** is a modernization learning project of the **BibiGPT/Next-Gen 2025 AI SaaS Architecture**. It aims to build a scalable, full-stack AI platform using the latest "bleeding edge" technologies for maximum developer productivity and user experience.

- **Status**: Infrastructure Initialization (Foundation Phase)
- **Primary Stack**: Next.js 16, React 19, Bun, TypeScript, tRPC
- **Architecture**: Monorepo with Shared Core Logic

## Quick Reference

### Technology Stack

| Category      | Technology    | Version     | Purpose                                           |
| :------------ | :------------ | :---------- | :------------------------------------------------ |
| **Runtime**   | Bun           | latest      | Ultra-fast local development & package management |
| **Framework** | Next.js       | 16 (Canary) | React 19 Server Components, App Router            |
| **Language**  | TypeScript    | 5.x         | End-to-end type safety                            |
| **API**       | tRPC          | v11         | Type-safe API without schema files                |
| **Core AI**   | Vercel AI SDK | 6.0         | Unified LLM interface (Stream, Tool calling)      |
| **Database**  | Supabase      | -           | PostgreSQL, Auth, Vector Search                   |
| **Styling**   | Tailwind CSS  | v4          | Atomic CSS engine                                 |

### Monorepo Structure

| Part ID     | Type      | Path            | Description                                                      | Status      |
| :---------- | :-------- | :-------------- | :--------------------------------------------------------------- | :---------- |
| **core**    | Library   | `packages/core` | **The Brain.** Shared business logic, tRPC routers, AI handling. | 🟢 Active   |
| **web**     | Web App   | `apps/web`      | **The Face.** Next.js SaaS application.                          | 🟢 Active   |
| **desktop** | Desktop   | `apps/desktop`  | Tauri wrapper for desktop experience.                            | ⚪️ Pending |
| **plugin**  | Extension | `apps/plugin`   | WXT Chrome/Edge browser extension.                               | ⚪️ Pending |
| **mobile**  | Mobile    | `apps/mobile`   | Expo React Native application.                                   | ⚪️ Pending |

## Documentation

### Core Documentation

- [Architecture Design Blueprint](./architecture-design.md) - **High-Level Roadmap & Philosophy**
- [Project Scan Report](./project-scan-report.json) - Machine-readable project status
- [Source Tree Analysis](./source-tree-analysis.md) - Directory structure and package relationships

### Technical Details (Generated)

- [API Contracts (Core)](./api-contracts-core.md) - Core library exports and tRPC router planning
- [Component Inventory (Web)](./component-inventory-web.md) - Web application pages and components
- [Database Models](./data-models.md) _(To be generated)_
- [Deployment Guide](./deployment-guide.md) _(To be generated)_
- [Contribution Guide](./contribution-guide.md) _(To be generated)_

### External References

- [BibiGPT Architecture Reference](https://twitter.com/BibiGPT)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Bun Documentation](https://bun.sh/docs)

## Getting Started

1.  **Install Bun**:

    ```bash
    curl -fsSL https://bun.sh/install | bash
    ```

2.  **Install Dependencies**:

    ```bash
    bun install
    ```

3.  **Start Development Server**:

    ```bash
    bun run dev
    # Starts web app at http://localhost:3000
    ```

4.  **Verify Core Link**:
    Click the "Test Core" button on the home page to verify `apps/web` calls `packages/core` successfully.
