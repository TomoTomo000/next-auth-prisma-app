import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authRoutes, publicRoutes } from "@/route";

export default auth((req: NextRequest, session) => {
  const { nextUrl } = req;
  console.log("Middleware: Checking auth for", nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isLoggedIn = !!session;

  // 認証ページ (e.g. /login, /signup) にログイン済みで来たら
  if (isAuthRoute && isLoggedIn) {
    // ログイン済みならリダイレクト（メインページ等）
    const redirectUrl = new URL("/", nextUrl);
    return NextResponse.redirect(redirectUrl);
  }

  // 保護されたページで未ログインならログインへ
  if (!isPublicRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    return NextResponse.redirect(loginUrl);
  }

  // それ以外はそのまま
  return NextResponse.next();
});

export const config = {
  matcher: [
    // middleware の対象を絞る（API/静的などは実行しない）
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};