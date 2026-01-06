import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { createServerClient } from '@supabase/ssr';
import type { Database } from '@sheepgpt/db';
import type { User } from '@supabase/supabase-js';

export async function createTRPCContext(opts?: FetchCreateContextFnOptions): Promise<{ headers: Headers; user: User | null; db: ReturnType<typeof createServerClient<Database>> }> {
  const headers = opts?.req.headers ?? new Headers();

  const db = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // Pass cookies from the request headers
          const cookieHeader = headers.get('cookie');
          if (!cookieHeader) return [];
          
          return cookieHeader.split(';').map((cookie) => {
              const [name, ...value] = cookie.trim().split('=');
              return { name, value: value.join('=') };
          });
        },
        setAll(cookiesToSet) {
           // No-op for now in tRPC context, as we are reading mostly.
           // In a real app we might want to return set-cookie headers.
        }
      },
    }
  );

  const { data: { user } } = await db.auth.getUser();

  return {
    headers,
    user,
    db,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

