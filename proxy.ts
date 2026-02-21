import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';

import { authConfig } from '@/auth.config';
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from '@/route';

const { auth } = NextAuth(authConfig);

/* =========================
  Basic Auth
========================= */

function isBasicAuthenticated(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return false;

  const [type, encoded] = authHeader.split(' ');
  if (type !== 'Basic' || !encoded) return false;

  const decoded = Buffer.from(encoded, 'base64').toString();
  const [user, pwd] = decoded.split(':');

  return (
    user === process.env.BASIC_AUTH_USER &&
    pwd === process.env.BASIC_AUTH_PASS
  );
}

export default auth((req) => {
  /* =========================
    ① Basic Auth
  ========================= */

  const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
  const isAuthEnabled = process.env.NEXT_PUBLIC_BASIC_AUTH_ENABLED === 'true';

  if (isAuthEnabled && appEnv !== 'local') {
    if (!isBasicAuthenticated(req)) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      });
    }
  }

  /* =========================
    ② NextAuth Guard
  ========================= */

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};