# Security Configuration Documentation

This document describes the security and session configuration for the production admin dashboard.

## Overview

The application implements multiple layers of security:
1. **Authentication** - Supabase Auth with JWT tokens
2. **Authorization** - Role-based access control (RBAC)
3. **Session Management** - Secure session handling with auto-refresh
4. **Transport Security** - HTTPS enforcement and security headers
5. **CORS Protection** - Cross-origin request validation

## Session Configuration

### Supabase Auth Settings

The Supabase client is configured in `src/lib/supabase.js` with the following settings:

```javascript
{
  auth: {
    persistSession: true,              // Enable session persistence
    storage: window.localStorage,      // Store session in localStorage
    autoRefreshToken: true,            // Auto-refresh tokens before expiry
    detectSessionInUrl: true,          // Detect session from URL
    flowType: 'pkce',                  // Use PKCE flow (more secure)
  }
}
```

### Session Settings Explained

#### `persistSession: true`
- **Purpose**: Keeps users logged in across browser sessions
- **Storage**: Uses localStorage to store session tokens
- **Security**: Tokens are encrypted by Supabase
- **User Experience**: Users don't need to log in every time they visit

#### `autoRefreshToken: true`
- **Purpose**: Automatically refreshes access tokens before they expire
- **Default Expiry**: Supabase tokens expire after 1 hour
- **Refresh Window**: Tokens are refreshed 10 seconds before expiry
- **Benefit**: Seamless user experience without interruptions

#### `flowType: 'pkce'`
- **Purpose**: Uses Proof Key for Code Exchange (PKCE) flow
- **Security**: More secure than implicit flow
- **Protection**: Prevents authorization code interception attacks
- **Standard**: OAuth 2.0 best practice for public clients

#### `detectSessionInUrl: true`
- **Purpose**: Detects authentication tokens in URL parameters
- **Use Case**: Magic links, OAuth callbacks, password reset links
- **Behavior**: Automatically extracts and stores session from URL

### Session Timeout

Supabase manages session timeout automatically:

- **Access Token Expiry**: 1 hour (default)
- **Refresh Token Expiry**: 30 days (default)
- **Auto-Refresh**: Happens automatically 10 seconds before expiry
- **Manual Refresh**: Can be triggered with `supabase.auth.refreshSession()`

To customize session timeout, configure in Supabase Dashboard:
1. Go to Authentication → Settings
2. Adjust "JWT expiry limit" (access token)
3. Adjust "Refresh token expiry" (refresh token)

**Recommended Production Settings:**
- Access Token: 1 hour (default) - Good balance of security and UX
- Refresh Token: 7-30 days - Depends on security requirements

## HTTPS Configuration

### Enforcement

HTTPS is enforced through multiple mechanisms:

#### 1. Strict-Transport-Security (HSTS) Header
```javascript
{
  key: 'Strict-Transport-Security',
  value: 'max-age=63072000; includeSubDomains; preload'
}
```

- **max-age=63072000**: Enforces HTTPS for 2 years
- **includeSubDomains**: Applies to all subdomains
- **preload**: Eligible for browser HSTS preload list

#### 2. Hosting Platform Configuration

Most hosting platforms (Vercel, Netlify) automatically:
- Provision SSL certificates (Let's Encrypt)
- Redirect HTTP to HTTPS
- Enable HTTP/2 and HTTP/3

#### 3. Supabase Configuration

Supabase enforces HTTPS for all API requests:
- All Supabase URLs use HTTPS
- HTTP requests are automatically rejected
- SSL/TLS certificates are managed by Supabase

### Verifying HTTPS

To verify HTTPS is properly configured:

1. **Check Certificate**
   - Visit your site in browser
   - Click padlock icon in address bar
   - Verify certificate is valid and issued by trusted CA

2. **Test HTTP Redirect**
   ```bash
   curl -I http://yourdomain.com
   # Should return 301/302 redirect to https://
   ```

3. **Check HSTS Header**
   ```bash
   curl -I https://yourdomain.com
   # Should include: Strict-Transport-Security header
   ```

4. **SSL Labs Test**
   - Visit: https://www.ssllabs.com/ssltest/
   - Enter your domain
   - Should receive A or A+ rating

## Security Headers

All security headers are configured in `next.config.js`:

### X-DNS-Prefetch-Control: on
- **Purpose**: Enables DNS prefetching for better performance
- **Security Impact**: Minimal
- **Benefit**: Faster page loads

### Strict-Transport-Security
- **Purpose**: Forces HTTPS connections
- **Value**: `max-age=63072000; includeSubDomains; preload`
- **Protection**: Prevents protocol downgrade attacks
- **Duration**: 2 years

### X-Frame-Options: SAMEORIGIN
- **Purpose**: Prevents clickjacking attacks
- **Value**: `SAMEORIGIN`
- **Protection**: Only allows framing from same origin
- **Alternative**: Can use `DENY` to block all framing

### X-Content-Type-Options: nosniff
- **Purpose**: Prevents MIME type sniffing
- **Value**: `nosniff`
- **Protection**: Prevents browser from interpreting files as different MIME type
- **Benefit**: Reduces XSS attack surface

### X-XSS-Protection: 1; mode=block
- **Purpose**: Enables browser XSS filter
- **Value**: `1; mode=block`
- **Protection**: Blocks page if XSS attack detected
- **Note**: Modern browsers have built-in XSS protection

### Referrer-Policy: origin-when-cross-origin
- **Purpose**: Controls referrer information
- **Value**: `origin-when-cross-origin`
- **Behavior**: 
  - Same-origin: Full URL
  - Cross-origin: Origin only
- **Privacy**: Reduces information leakage

## Authentication Security

### Password Requirements

Supabase enforces password requirements:
- Minimum length: 6 characters (default)
- Can be customized in Supabase Dashboard

**Recommended Production Settings:**
- Minimum length: 12 characters
- Require uppercase, lowercase, numbers, special characters
- Check against common password lists

To configure in Supabase Dashboard:
1. Go to Authentication → Settings
2. Scroll to "Password Requirements"
3. Adjust settings as needed

### Multi-Factor Authentication (MFA)

Supabase supports MFA (Time-based One-Time Password):

To enable MFA:
1. Go to Supabase Dashboard → Authentication → Settings
2. Enable "Multi-Factor Authentication"
3. Users can enable MFA in their account settings

**Recommended for Production:**
- Enable MFA for all admin users
- Consider requiring MFA for admin role

### Rate Limiting

Supabase provides built-in rate limiting:
- Login attempts: Limited per IP address
- API requests: Limited per user/IP
- Configurable in Supabase Dashboard

**Recommended Production Settings:**
- Login attempts: 5 per hour per IP
- API requests: 100 per minute per user

### Session Security

#### Token Storage
- **Location**: localStorage (client-side)
- **Encryption**: Tokens are JWT (signed, not encrypted)
- **Security**: Protected by same-origin policy
- **Risk**: Vulnerable to XSS attacks

#### XSS Protection
To protect against XSS:
1. Sanitize all user inputs
2. Use Content Security Policy (CSP)
3. Avoid `dangerouslySetInnerHTML`
4. Keep dependencies updated

#### CSRF Protection
- **Supabase**: Uses JWT tokens (not cookies)
- **Protection**: JWT in Authorization header is CSRF-resistant
- **Additional**: CORS configuration provides extra protection

## Role-Based Access Control (RBAC)

### Admin Role Verification

Admin access is verified at multiple levels:

#### 1. Client-Side (UI Protection)
```javascript
const isAdmin = await isAdmin();
if (!isAdmin) {
  router.push('/');
}
```

#### 2. Server-Side (API Protection)
```javascript
// In API routes
const user = await getCurrentUser();
const isAdmin = await checkAdminRole(user.id);
if (!isAdmin) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
}
```

#### 3. Database-Level (RLS Policies)
```sql
-- Example RLS policy
CREATE POLICY "Admin users can manage documents"
ON documents
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role = 'admin'
  )
);
```

### User Roles

The system supports the following roles:

- **admin**: Full access to admin dashboard and all operations
- **user**: Regular user with limited access

To add more roles:
1. Update `user_profiles` table schema
2. Update RLS policies
3. Update client-side role checks

## Database Security

### Row Level Security (RLS)

RLS policies must be enabled on all tables:

```sql
-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
```

### Service Role Key

The service role key bypasses RLS:
- **Use Case**: Server-side operations that need elevated privileges
- **Security**: NEVER expose in client-side code
- **Storage**: Environment variables only
- **Access**: Server-side API routes only

### Connection Security

Database connections are secured:
- **Encryption**: All connections use SSL/TLS
- **Authentication**: Password-based authentication
- **Network**: Supabase manages network security
- **Pooling**: Connection pooling enabled by default

## Monitoring and Logging

### Authentication Events

Monitor authentication events in Supabase Dashboard:
- Login attempts (successful and failed)
- Password reset requests
- Token refresh events
- Session creation/destruction

### Security Logs

Log security-relevant events:
- Admin access attempts
- Failed authorization checks
- Suspicious activity patterns
- API rate limit violations

### Recommended Monitoring

Set up alerts for:
- Multiple failed login attempts
- Unusual admin activity patterns
- API rate limit violations
- Database connection errors
- Token refresh failures

## Production Deployment Checklist

### Before Deployment

- [ ] Enable HTTPS on hosting platform
- [ ] Configure HSTS header (already in next.config.js)
- [ ] Set up production Supabase project
- [ ] Configure RLS policies on all tables
- [ ] Enable MFA for admin users
- [ ] Set strong password requirements
- [ ] Configure rate limiting
- [ ] Set appropriate session timeout
- [ ] Review and test CORS configuration
- [ ] Set up security monitoring
- [ ] Configure error logging
- [ ] Test authentication flow end-to-end

### After Deployment

- [ ] Verify HTTPS is working
- [ ] Test SSL certificate
- [ ] Verify security headers are present
- [ ] Test authentication flow
- [ ] Test admin access control
- [ ] Monitor authentication logs
- [ ] Set up security alerts
- [ ] Document security procedures
- [ ] Train staff on security best practices
- [ ] Schedule regular security reviews

## Security Best Practices

### For Developers

1. **Never commit secrets** - Use environment variables
2. **Validate all inputs** - Sanitize user inputs
3. **Use parameterized queries** - Prevent SQL injection (Supabase handles this)
4. **Keep dependencies updated** - Run `npm audit` regularly
5. **Review code for security issues** - Use linters and security scanners
6. **Test authentication flows** - Ensure proper access control
7. **Log security events** - Monitor for suspicious activity

### For Administrators

1. **Use strong passwords** - Minimum 12 characters, mixed case, numbers, symbols
2. **Enable MFA** - Require for all admin accounts
3. **Review access logs** - Check for suspicious activity
4. **Rotate credentials** - Change passwords and keys regularly
5. **Limit admin access** - Only grant admin role when necessary
6. **Monitor user activity** - Watch for unusual patterns
7. **Keep backups** - Regular database and storage backups

### For Users

1. **Use unique passwords** - Don't reuse passwords
2. **Enable MFA** - If available
3. **Log out when done** - Especially on shared computers
4. **Report suspicious activity** - Contact administrators
5. **Keep browser updated** - Use latest version
6. **Be cautious of phishing** - Verify URLs before logging in

## Incident Response

### If Credentials Are Compromised

1. **Immediately rotate all keys**
   - Generate new Supabase keys
   - Update environment variables
   - Redeploy application

2. **Review access logs**
   - Check for unauthorized access
   - Identify affected resources
   - Document timeline

3. **Notify affected users**
   - Force password reset if needed
   - Inform about potential breach
   - Provide guidance

4. **Investigate root cause**
   - How were credentials exposed?
   - What systems were affected?
   - How to prevent recurrence?

### If Unauthorized Access Detected

1. **Revoke access immediately**
   - Disable compromised accounts
   - Invalidate sessions
   - Block IP addresses if needed

2. **Assess damage**
   - What data was accessed?
   - What operations were performed?
   - What systems were affected?

3. **Restore from backup**
   - If data was modified or deleted
   - Verify backup integrity
   - Test restored data

4. **Strengthen security**
   - Review and update policies
   - Add additional monitoring
   - Implement lessons learned

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [PKCE Flow Specification](https://tools.ietf.org/html/rfc7636)
