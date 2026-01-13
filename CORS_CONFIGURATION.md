# CORS Configuration Documentation

This document describes the Cross-Origin Resource Sharing (CORS) configuration for the production admin dashboard.

## Overview

CORS is configured at two levels:
1. **Next.js Security Headers** - Applied to all routes via `next.config.js`
2. **API Route Middleware** - Applied to API routes via `src/middleware.js`

## Configuration Files

### 1. next.config.js

Security headers are configured in `next.config.js` and apply to all routes:

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ];
}
```

**Security Headers Explained:**

- **X-DNS-Prefetch-Control**: Enables DNS prefetching for better performance
- **Strict-Transport-Security (HSTS)**: Forces HTTPS connections for 2 years
- **X-Frame-Options**: Prevents clickjacking by disallowing iframe embedding from other domains
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-XSS-Protection**: Enables browser XSS protection
- **Referrer-Policy**: Controls referrer information sent with requests

### 2. src/middleware.js

API route CORS configuration is handled by Next.js middleware:

```javascript
const getAllowedOrigins = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    return [
      'http://localhost:3033',
      'http://localhost:3000',
      // ... other localhost variants
    ];
  }
  
  return [
    process.env.NEXT_PUBLIC_SITE_URL,
    // Add production domains here
  ];
};
```

## Environment-Specific Configuration

### Development

In development mode, CORS allows requests from:
- `http://localhost:3033` (default dev server)
- `http://localhost:3000` (alternative port)
- `http://127.0.0.1:3033`
- `http://127.0.0.1:3000`

### Production

In production mode, CORS allows requests from:
- The domain specified in `NEXT_PUBLIC_SITE_URL` environment variable
- Additional domains configured in the `getAllowedOrigins()` function

## Adding Production Domains

To add production domains to the CORS allowlist:

1. **Option 1: Environment Variable (Recommended)**
   
   Set the `NEXT_PUBLIC_SITE_URL` environment variable in your hosting platform:
   ```env
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

2. **Option 2: Hardcode in middleware.js**
   
   Edit `src/middleware.js` and add domains to the production origins array:
   ```javascript
   const productionOrigins = [
     process.env.NEXT_PUBLIC_SITE_URL,
     'https://yourdomain.com',
     'https://www.yourdomain.com',
     'https://admin.yourdomain.com',
   ].filter(Boolean);
   ```

## CORS Headers

The middleware sets the following CORS headers for allowed origins:

- **Access-Control-Allow-Origin**: The requesting origin (if allowed)
- **Access-Control-Allow-Credentials**: `true` (allows cookies and authentication)
- **Access-Control-Allow-Methods**: `GET, POST, PUT, DELETE, OPTIONS`
- **Access-Control-Allow-Headers**: `Content-Type, Authorization, X-Requested-With`
- **Access-Control-Max-Age**: `86400` (24 hours for preflight cache)

## Preflight Requests

The middleware handles OPTIONS preflight requests automatically:

1. Browser sends OPTIONS request before actual request
2. Middleware checks if origin is allowed
3. If allowed, returns appropriate CORS headers
4. Browser proceeds with actual request

## Testing CORS Configuration

### Development Testing

```bash
# Test from allowed origin (should succeed)
curl -H "Origin: http://localhost:3033" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:3033/api/upload

# Test from disallowed origin (should fail)
curl -H "Origin: http://evil.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:3033/api/upload
```

### Production Testing

```bash
# Test from production domain
curl -H "Origin: https://yourdomain.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://yourdomain.com/api/upload
```

## Security Considerations

### 1. Origin Validation
- Only explicitly allowed origins can make cross-origin requests
- Wildcards (`*`) are NOT used to prevent unauthorized access
- Origin checking is case-sensitive

### 2. Credentials
- `Access-Control-Allow-Credentials: true` allows cookies and authentication headers
- This is required for Supabase authentication to work
- Only use with trusted origins

### 3. HTTPS Enforcement
- Production should ALWAYS use HTTPS
- HSTS header forces HTTPS for 2 years
- Mixed content (HTTP/HTTPS) is blocked

### 4. Content Security Policy (CSP)
- Consider adding CSP headers for additional security
- Can be added to `next.config.js` headers configuration

## Troubleshooting

### CORS Error: "No 'Access-Control-Allow-Origin' header"

**Cause**: The requesting origin is not in the allowed origins list

**Solution**: 
1. Check the origin in browser dev tools (Network tab)
2. Add the origin to `getAllowedOrigins()` in `src/middleware.js`
3. Restart the server

### CORS Error: "Credentials flag is true, but Access-Control-Allow-Credentials is not"

**Cause**: Credentials are being sent but CORS is not configured to allow them

**Solution**: 
- Ensure `Access-Control-Allow-Credentials: true` is set (already configured in middleware)
- Verify the origin is in the allowed list

### CORS Error: "Method not allowed"

**Cause**: The HTTP method is not in the allowed methods list

**Solution**: 
- Add the method to `Access-Control-Allow-Methods` in `src/middleware.js`
- Current allowed methods: GET, POST, PUT, DELETE, OPTIONS

### Preflight Request Failing

**Cause**: OPTIONS request is not being handled correctly

**Solution**: 
- Verify middleware is running (check `src/middleware.js` config matcher)
- Check browser dev tools Network tab for OPTIONS request details
- Ensure origin is in allowed list

## Deployment Checklist

Before deploying to production:

- [ ] Set `NEXT_PUBLIC_SITE_URL` environment variable
- [ ] Add all production domains to allowed origins
- [ ] Test CORS with production domain
- [ ] Verify HTTPS is enabled
- [ ] Test authentication with CORS
- [ ] Check browser console for CORS errors
- [ ] Verify security headers are present (use browser dev tools)
- [ ] Test from different subdomains if applicable

## Additional Resources

- [MDN CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [Next.js Middleware](https://nextjs.org/docs/advanced-features/middleware)
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
