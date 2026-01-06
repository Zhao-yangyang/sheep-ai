import { createTRPCReact } from '@trpc/react-query';
import { type AppRouter } from '@sheepgpt/core';

export const trpc = createTRPCReact<AppRouter>();
