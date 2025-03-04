import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { signToken, verifyToken } from '@/lib/auth/session';

const protectedRoutes = '/dashboard';
// Explicitly exclude the mentors page and mentors-redirect from protection
const publicPaths = ['/mentors', '/dashboard/mentors', '/dashboard/mentors-redirect'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');
  
  // Check if the current path is in the public paths list
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  // Only consider it a protected route if it's not a public path
  const isProtectedRoute = pathname.startsWith(protectedRoutes) && !isPublicPath;

  // Direct server-side redirect for mentors paths
  if (pathname === '/dashboard/mentors' || pathname === '/dashboard/mentors/') {
    return NextResponse.redirect(new URL('/mentors', request.url));
  }

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  let res = NextResponse.next();

  if (sessionCookie) {
    try {
      const parsed = await verifyToken(sessionCookie.value);
      const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.cookies.set({
        name: 'session',
        value: await signToken({
          ...parsed,
          expires: expiresInOneDay.toISOString(),
        }),
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: expiresInOneDay,
      });
    } catch (error) {
      console.error('Error updating session:', error);
      res.cookies.delete('session');
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
