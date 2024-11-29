import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimit = new Map<string, { count: number; timestamp: number }>();
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;

export function rateLimitMiddleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  const now = Date.now();
  const windowData = rateLimit.get(ip);

  if (!windowData || now - windowData.timestamp > WINDOW_SIZE) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return NextResponse.next();
  }

  if (windowData.count > MAX_REQUESTS) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  windowData.count++;
  return NextResponse.next();
} 