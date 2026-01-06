import { type NextRequest } from 'next/server';
import { updateSession } from '@sheepgpt/core/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // This function will be created in core/utils/supabase/middleware
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
