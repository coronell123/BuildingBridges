import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define protected paths by role
const adminOnlyPaths = [
  '/dashboard/admin',
  '/dashboard/settings/users'
];

const mentorOnlyPaths = [
  '/dashboard/mentor'
];

const studentOnlyPaths = [
  '/dashboard/student'
];

// Public paths that don't require authentication
const publicPaths = [
  '/',
  '/sign-in',
  '/sign-up',
  '/mentors',
  '/vision',
  '/workshops',
  '/activity',
  '/roadmap',
  '/privacy-policy',
  '/tos',
  '/corporate-design',
  '/design-system',
  '/onboarding',
  '/reset-password',
];

const isPublicPath = (path: string) => {
  return publicPaths.some(publicPath => 
    path === publicPath || 
    path.startsWith(`${publicPath}/`) ||
    path.match(/\.(jpg|jpeg|png|webp|svg|ico|css|js)$/)
  );
};

const isAdminOnlyPath = (path: string) => {
  return adminOnlyPaths.some(adminPath => 
    path === adminPath || 
    path.startsWith(`${adminPath}/`)
  );
};

const isMentorOnlyPath = (path: string) => {
  return mentorOnlyPaths.some(mentorPath => 
    path === mentorPath || 
    path.startsWith(`${mentorPath}/`)
  );
};

const isStudentOnlyPath = (path: string) => {
  return studentOnlyPaths.some(studentPath => 
    path === studentPath || 
    path.startsWith(`${studentPath}/`)
  );
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow files in /public and framework files to pass
  if (pathname.includes('.') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
  
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // If no token, and it's not a public path, redirect to sign-in
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/sign-in';
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  
  // Role-based access control for authenticated users
  const userRole = token.role as string;
  
  if (pathname.startsWith('/dashboard/admin') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  if (pathname.startsWith('/dashboard/mentor') && userRole !== 'MENTOR') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
