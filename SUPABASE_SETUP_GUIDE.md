# Supabase Database Setup for AdminJS

## Step 1: Get Your Supabase Database Connection String

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll down to **Connection string**
5. Copy the **URI** connection string
6. It should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`

## Step 2: Update .env File

Replace the DATABASE_URL in your .env file with your actual Supabase connection string:

```env
DATABASE_URL="postgresql://postgres:[YOUR-ACTUAL-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

## Step 3: Test Database Connection

Run these commands to test the connection:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Create admin user
node scripts/create-admin-user.js
```

## Step 4: Start AdminJS

```bash
# Start both servers
npm run dev:admin
```

## Step 5: Access AdminJS

- AdminJS Panel: http://localhost:3001/admin
- Login: admin / admin123

## Troubleshooting

### If you get connection errors:
1. Make sure your Supabase project is active
2. Check that your database password is correct
3. Verify the connection string format
4. Ensure your IP is not blocked (check Supabase dashboard)

### If you get permission errors:
1. Make sure you're using the correct database password
2. Check that your Supabase project has the right permissions
3. Verify the database URL format

## Next Steps After Setup

1. ✅ Test AdminJS functionality
2. ✅ Create/edit blog posts
3. ✅ Manage users
4. ✅ Update banners
5. ✅ Customize AdminJS interface if needed


