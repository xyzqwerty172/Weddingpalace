import { NextResponse } from 'next/server';

// Define allowed origins for CORS
// In production, replace with your actual domain(s)
const getAllowedOrigins = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    // Allow localhost in development
    return [
      'http://localhost:3033',
      'http://localhost:3000',
      'http://127.0.0.1:3033',
      'http://127.0.0.1:3000',
    ];
  }
  
  // Production origins - update these with your actual production domains
  const productionOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    // Add additional production domains here
    // 'https://yourdomain.com',
    // 'https://www.yourdomain.com',
  ].filter(Boolean); // Remove undefined values
  
  return productionOrigins;
};

export function middleware(request) {
  const origin = request.headers.get('origin');
  const allowedOrigins = getAllowedOrigins();
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const preflightHeaders = {
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400', // 24 hours
    };
    
    // Check if origin is allowed
    if (origin && allowedOrigins.includes(origin)) {
      preflightHeaders['Access-Control-Allow-Origin'] = origin;
      preflightHeaders['Access-Control-Allow-Credentials'] = 'true';
    }
    
    return NextResponse.json({}, { headers: preflightHeaders });
  }
  
  // Handle actual requests
  const response = NextResponse.next();
  
  // Add CORS headers if origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  }
  
  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Match all API routes
    '/api/:path*',
    // Exclude static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
