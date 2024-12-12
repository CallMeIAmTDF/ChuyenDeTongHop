
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/me', '/chat', '/dashboard', '/users', '/levels', '/topics', '/words']
const authPaths = ['/login', '/register', '/authenticate', '/verify']

export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  // Chưa đăng nhập thì không cho vào private paths 
  if (privatePaths.some((path) => pathname.startsWith(path)) && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  // Trường hợp đăng nhập rồi nhưng accessToken hết hạn
  if ( privatePaths.some((path) => pathname.startsWith(path)) && !accessToken && refreshToken) {
    const url =new URL('/refresh-token', request.url)
    url.searchParams.set('refreshToken', refreshToken)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: [ '/me', '/chat/:path*', '/login', '/register', '/authenticate', '/verify',
    '/dashboard/:path*', '/users/:path*', '/levels/:path*', '/topics/:path*', '/words/:path*'
  ]
}