import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware is used to check session cookie presence.
export const middleware = (req: NextRequest) => {
  const sessionId = req.cookies.get('sid');
  if (!sessionId) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - /auth/login (login page)
     */
    '/!/auth/login',
  ],
};
