// Temporarily disable Clerk middleware for development
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)','/settings(.*)','/profile(.*)','/activity(.*)','/security(.*)'])

// Simple middleware for development without authentication
export default function middleware() {
  // No authentication required during development
  return;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}


