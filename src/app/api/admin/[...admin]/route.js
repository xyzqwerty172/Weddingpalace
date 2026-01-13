import { NextRequest } from 'next/server';

// This is a proxy route to integrate AdminJS with Next.js
// AdminJS will run on a separate Express server
export async function GET(request, { params }) {
  const adminPath = params.admin.join('/');
  const searchParams = request.nextUrl.searchParams.toString();
  const queryString = searchParams ? `?${searchParams}` : '';
  
  // Redirect to the AdminJS server
  const adminUrl = `${process.env.ADMIN_URL || 'http://localhost:3001'}/admin/${adminPath}${queryString}`;
  
  return Response.redirect(adminUrl);
}

export async function POST(request, { params }) {
  const adminPath = params.admin.join('/');
  const body = await request.text();
  
  // Proxy the request to AdminJS server
  const adminUrl = `${process.env.ADMIN_URL || 'http://localhost:3001'}/admin/${adminPath}`;
  
  const response = await fetch(adminUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': request.headers.get('cookie') || '',
    },
    body,
  });
  
  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}

