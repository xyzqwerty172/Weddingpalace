# Environment Variables Documentation

This document describes all environment variables required for the production admin dashboard deployment.

## Required Environment Variables

### Supabase Configuration

#### `NEXT_PUBLIC_SUPABASE_URL`
- **Description**: The URL of your Supabase project
- **Required**: Yes
- **Example**: `https://your-project.supabase.co`
- **Where to find**: Supabase Dashboard → Project Settings → API → Project URL
- **Used in**: Client-side and server-side code
- **Security**: Public (safe to expose in client-side code)

#### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Description**: The anonymous/public API key for Supabase
- **Required**: Yes
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Where to find**: Supabase Dashboard → Project Settings → API → Project API keys → anon/public
- **Used in**: Client-side authentication and API calls
- **Security**: Public (safe to expose, has Row Level Security protection)

#### `SUPABASE_SERVICE_ROLE_KEY`
- **Description**: The service role key for server-side operations with elevated privileges
- **Required**: Yes (for admin operations)
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Where to find**: Supabase Dashboard → Project Settings → API → Project API keys → service_role
- **Used in**: Server-side API routes for admin operations
- **Security**: **CRITICAL - KEEP SECRET!** Never expose in client-side code or commit to version control

#### `DATABASE_URL`
- **Description**: PostgreSQL connection string for Prisma
- **Required**: Yes (if using Prisma)
- **Format**: `postgresql://postgres:password@host:port/database`
- **Example**: `postgresql://postgres:your_password@db.your-project.supabase.co:5432/postgres`
- **Where to find**: Supabase Dashboard → Project Settings → Database → Connection string → URI
- **Used in**: Prisma database operations
- **Security**: **SECRET** - Contains database password

### Production Configuration

#### `NEXT_PUBLIC_SITE_URL`
- **Description**: The public URL of your production website
- **Required**: Yes (for CORS configuration)
- **Example**: `https://yourdomain.com`
- **Used in**: CORS middleware to allow cross-origin requests from your domain
- **Security**: Public (safe to expose)
- **Note**: Do not include trailing slash

## Environment-Specific Configuration

### Development (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_dev_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_dev_service_role_key
DATABASE_URL="postgresql://postgres:dev_password@db.your-dev-project.supabase.co:5432/postgres"
NEXT_PUBLIC_SITE_URL=http://localhost:3033
```

### Production (Hosting Platform Environment Variables)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_prod_service_role_key
DATABASE_URL="postgresql://postgres:prod_password@db.your-prod-project.supabase.co:5432/postgres"
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Deployment Checklist

### Before Deployment

- [ ] Verify production Supabase project is created
- [ ] Copy production Supabase URL from dashboard
- [ ] Copy production anon key from dashboard
- [ ] Copy production service role key from dashboard (keep secure!)
- [ ] Copy production database connection string
- [ ] Set production site URL (NEXT_PUBLIC_SITE_URL)
- [ ] Verify all environment variables are set in hosting platform
- [ ] Ensure `.env.local` and `.env` are in `.gitignore`
- [ ] Never commit actual credentials to version control

### Hosting Platform Configuration

#### Vercel
1. Go to Project Settings → Environment Variables
2. Add each variable with appropriate scope (Production/Preview/Development)
3. Redeploy after adding variables

#### Netlify
1. Go to Site Settings → Build & Deploy → Environment
2. Add each variable
3. Trigger new deployment

#### Other Platforms
Consult your hosting platform's documentation for setting environment variables.

## Security Best Practices

1. **Never commit `.env` or `.env.local` files** - They are in `.gitignore` for a reason
2. **Use `.env.example`** - Commit this file with placeholder values as a template
3. **Rotate keys regularly** - Especially if they may have been exposed
4. **Use different credentials** - Use separate Supabase projects for dev/staging/production
5. **Limit service role key usage** - Only use in server-side code, never client-side
6. **Monitor access logs** - Check Supabase logs for suspicious activity
7. **Enable RLS policies** - Ensure Row Level Security is properly configured
8. **Use HTTPS only** - Never send credentials over unencrypted connections

## Troubleshooting

### "Supabase configuration missing" warning
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Verify the variable names are exactly as shown (case-sensitive)
- Restart your development server after adding variables

### Authentication errors
- Verify the anon key matches your Supabase project
- Check that the Supabase URL is correct
- Ensure your Supabase project is not paused

### Database connection errors
- Verify the `DATABASE_URL` format is correct
- Check that the password doesn't contain special characters that need URL encoding
- Ensure your IP is allowed in Supabase database settings (or connection pooling is enabled)

### Admin access denied
- Verify the user has `role = 'admin'` in the `user_profiles` table
- Check that RLS policies allow admin users to access tables
- Ensure the service role key is set for server-side operations

## Removed Variables

The following AdminJS-related variables have been removed and are no longer needed:

- ~~`ADMIN_PORT`~~ - Removed (AdminJS server port)
- ~~`ADMIN_URL`~~ - Removed (AdminJS URL)
- ~~`ADMIN_COOKIE_SECRET`~~ - Removed (AdminJS cookie secret)
- ~~`ADMIN_SESSION_SECRET`~~ - Removed (AdminJS session secret)
- ~~`NEXT_PUBLIC_ADMIN_URL`~~ - Removed (AdminJS public URL)

These variables were part of the AdminJS implementation that has been removed in favor of the custom Supabase admin dashboard.
