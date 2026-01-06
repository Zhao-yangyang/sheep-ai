# Core API Contracts

## Status: Initial Setup

Currently, `packages/core` provides a foundational health check export. The full tRPC router architecture described in [Architecture Design](./architecture-design.md) is pending implementation.

## Exported Functions

### `coreHealthCheck`

- **Type**: `async function(): Promise<string>`
- **Description**: Basic operational verification.
- **Usage**:
  ```typescript
  import { coreHealthCheck } from "@sheepgpt/core";
  const status = await coreHealthCheck();
  ```

## Planned API Structure (Reference)

_To be implemented in `packages/core/src/api/trpc`_

- **appRouter**: Main tRPC entry point.
- **Context**: Auth context with Supabase user.
- **Routers**:
  - `ai`: LLM interaction (streamText).
  - `user`: Profile and quota management.
  - `content`: Video/text content operations.
