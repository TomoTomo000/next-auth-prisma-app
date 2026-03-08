import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authRoutes, publicRoutes } from "@/route";

const NEXTAUTH_COOKIE = "next-auth.session-token";

export default function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;

  // cookie があれば簡易ログイン済み判定
  const isLoggedIn = !!cookies.get(NEXTAUTH_COOKIE)?.value;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // 認証ページ（/login, /signup）は未ログインなら通す
  if (isAuthRoute) {
    if (isLoggedIn) {
      // ログイン済みならトップへリダイレクト
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next();
  }

  // 保護ページで未ログインなら login へ
  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // それ以外は通す
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};