import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export async function createTRPCContext(opts?: FetchCreateContextFnOptions): Promise<{ headers: Headers }> {
  return {
    headers: opts?.req.headers ?? new Headers(),
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
