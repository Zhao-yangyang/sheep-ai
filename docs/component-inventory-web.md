# Web Component Inventory

## Status: Scaffold

The web application is initialized with Next.js 16 App Router.

## Pages

### `app/page.tsx` (Home)

- **Route**: `/`
- **Description**: Landing page with calling `coreHealthCheck`.
- **Interactions**:
  - Button: Triggers server-side logic from Core.
  - State: Basic local state for displaying results.

### `app/layout.tsx` (Root Layout)

- **Description**: Global layout wrapper.
- **Dependencies**: Tailwind CSS (planned).

## UI Library (Planned)

_To be implemented in `packages/ui` and imported here._

- **Design System**: Shadcn UI
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
