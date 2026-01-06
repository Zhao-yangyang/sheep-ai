/**
 * sheepGPT Core Package
 */

export const version = '1.0.0';
export const name = 'sheepGPT Core';

// Export tRPC
export { appRouter, type AppRouter } from './trpc/root';
export { createTRPCContext } from './trpc/context';

// Placeholder for future core logic
export async function coreHealthCheck(): Promise<string> {
  return 'sheepGPT Core is operational';
}
