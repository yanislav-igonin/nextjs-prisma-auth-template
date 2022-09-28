/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
/* eslint-enable @next/next/no-server-import-in-page */
import { db } from '@db';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const sessionId = req.cookies.sid;
  if (!sessionId) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  const session = await db.session.findFirst({
    where: { id: sessionId },
    include: { user: true },
  });
  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!/auth/login|static|favicon.ico).*)',
  ],
};
