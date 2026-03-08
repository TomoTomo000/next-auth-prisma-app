import { auth } from '@/auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from '@/route'

function isBasicAuthenticated(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader) return false

  const [type, encoded] = authHeader.split(' ')
  if (type !== 'Basic' || !encoded) return false

  const decoded = Buffer.from(encoded, 'base64').toString()
  const [user, pwd] = decoded.split(':')

  return user === process.env.BASIC_AUTH_USER &&
    pwd === process.env.BASIC_AUTH_PASS
}

export default auth(async (req: NextRequest) => {
  // Basic Auth
  if (process.env.NEXT_PUBLIC_BASIC_AUTH_ENABLED === 'true'
      && process.env.NEXT_PUBLIC_APP_ENV !== 'local'
      && !isBasicAuthenticated(req)) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    })
  }

  // 認証
  const session = await auth()
  const isLoggedIn = !!session?.user

  const { nextUrl } = req
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return null
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};