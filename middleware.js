import { NextResponse } from 'next/server';

export function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  if (/shapbot/i.test(userAgent)) {
    return new NextResponse(null, { status: 403 });
  }
}

export const config = {
  matcher: ['/((?!_next/static|robots.txt).*)'],
};
