# Production Deployment Guide - Admin Dashboard

## 🎯 Quick Answer

**Yes, everything will work online after you merge your PR to Vercel!**

### Admin Panel Access
- **URL:** `https://yourwebsite.com/admin`
- **Who can access:** Only users with admin credentials (username/password)
- **Authentication:** Supabase authentication with role-based access control

---

## 🔐 How Authentication Works

### Access Flow
1. User visits `https://yourwebsite.com/admin`
2. System checks if user is logged in
3. If not logged in → Redirects to `/auth/supabase/login`
4. User enters credentials (email/password)
5. System verifies credentials with Supabase
6. System checks if user has `role = 'admin'` in `user_profiles` table
7. If admin → Shows admin dashboard
8. If not admin → Redirects to home page with error message

### Security Features
✅ **Authentication Required:** Must be logged in to access `/admin`
✅ **Role-Based Access:** Only users with `role = 'admin'` can access
✅ **Session Management:** Automatic session expiry and re-authentication
✅ **Secure Redirects:** Non-admin users are redirected away
✅ **Error Handling:** All error messages in Mongolian

---

## 📋 Pre-Deployment Checklist

### 1. Verify Environment Variables in Vercel

Make sure these are set in your Vercel project settings:

```bash
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database URL (if using Prisma)
DATABASE_URL=postgresql://...

# Optional: Session Configuration
SESSION_TIMEOUT=3600000  # 1 hour in milliseconds
```

**How to check in Vercel:**
1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Verify all variables are set for "Production" environment

### 2. Verify Supabase Production Setup

**Database Tables Required:**
- ✅ `user_profiles` - Contains user roles
- ✅ `documents` - Document metadata
- ✅ `blogs` - Blog posts
- ✅ `banners` - Banner images
- ✅ `categories` - Document categories

**Storage Buckets Required:**
- ✅ `documents` - PDF storage
- ✅ `banners` - Image storage

**Admin User Required:**
- ✅ At least one user with `role = 'admin'` in `user_profiles` table

### 3. Verify Admin User Exists

Run this query in Supabase SQL Editor:

```sql
-- Check if admin user exists
SELECT 
  up.id,
  up.role,
  au.email,
  au.created_at
FROM user_profiles up
JOIN auth.users au ON au.id = up.id
WHERE up.role = 'admin';
```

**Expected Result:** Should return at least one row with `role = 'admin'`

If no admin user exists, create one:

```sql
-- First, get the user ID from auth.users
SELECT id, email FROM auth.users WHERE email = 'your-admin-email@example.com';

-- Then insert into user_profiles
INSERT INTO user_profiles (id, role)
VALUES ('user-id-from-above', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

---

## 🚀 Deployment Steps

### Step 1: Commit Your Changes

```bash
# Make sure all changes are committed
git add .
git commit -m "feat: production-ready admin dashboard"
```

### Step 2: Push to GitHub

```bash
# Push to your main branch or create a PR
git push origin main
# OR
git push origin your-feature-branch
```

### Step 3: Merge PR (if applicable)

If you created a PR, merge it on GitHub. Vercel will automatically:
1. Detect the merge
2. Start building your application
3. Deploy to production
4. Update your live site

### Step 4: Wait for Deployment

- Vercel typically takes 2-5 minutes to build and deploy
- You'll receive a notification when deployment is complete
- Check the Vercel dashboard for deployment status

---

## ✅ Post-Deployment Verification

### Test 1: Access Admin Panel

1. Open your browser
2. Go to `https://yourwebsite.com/admin`
3. **Expected:** Should redirect to login page if not logged in

### Test 2: Login as Admin

1. Go to `https://yourwebsite.com/auth/supabase/login`
2. Enter admin credentials (email/password)
3. Click login
4. **Expected:** Should redirect to admin dashboard

### Test 3: Verify Admin Dashboard

Once logged in, verify these features work:

**Documents Tab:**
- ✅ Can see list of documents
- ✅ Can upload new PDF document
- ✅ Can select categories (main, sub, sub-sub)
- ✅ Can edit document metadata
- ✅ Can delete documents

**Blogs Tab:**
- ✅ Can see list of blog posts
- ✅ Can click "Edit" to edit a blog
- ✅ Can see blog type (News/Information)

**Banners Tab:**
- ✅ Can see list of banners
- ✅ Can view banner images

### Test 4: Verify Non-Admin Access

1. Open incognito/private browser window
2. Go to `https://yourwebsite.com/admin`
3. **Expected:** Should redirect to login page
4. Try logging in with a non-admin account (if you have one)
5. **Expected:** Should show error and redirect to home page

---

## 🔍 How to Check Everything Works

### Quick Verification Script

You can test your production site with this simple check:

```bash
# Test if admin route exists
curl -I https://yourwebsite.com/admin

# Expected: HTTP 200 or 307/308 (redirect)
```

### Browser DevTools Check

1. Open `https://yourwebsite.com/admin` in browser
2. Open DevTools (F12)
3. Go to "Network" tab
4. Refresh page
5. Check for:
   - ✅ No 404 errors
   - ✅ Redirects to login if not authenticated
   - ✅ No JavaScript errors in Console

### Manual Testing Checklist

- [ ] Admin URL works: `https://yourwebsite.com/admin`
- [ ] Login page works: `https://yourwebsite.com/auth/supabase/login`
- [ ] Can login with admin credentials
- [ ] Admin dashboard loads after login
- [ ] Can upload a test document
- [ ] Can edit document metadata
- [ ] Can delete test document
- [ ] Can view blogs list
- [ ] Can view banners list
- [ ] Non-admin users cannot access dashboard
- [ ] Logout works correctly

---

## 🎯 Admin Panel URLs

### Main URLs
- **Admin Dashboard:** `https://yourwebsite.com/admin`
- **Login Page:** `https://yourwebsite.com/auth/supabase/login`
- **Home Page:** `https://yourwebsite.com/`

### Admin Features
Once logged in at `/admin`, you'll see three tabs:
1. **Баримт бичиг (Documents)** - Upload and manage PDF documents
2. **Мэдээ (Blogs)** - Manage blog posts and news
3. **Баннер (Banners)** - Manage homepage banners

---

## 🔧 Troubleshooting

### Issue: "Admin route not found (404)"

**Solution:**
1. Check that `src/app/admin/page.js` exists in your repository
2. Verify the file is committed and pushed to GitHub
3. Check Vercel build logs for any errors
4. Rebuild and redeploy in Vercel dashboard

### Issue: "Redirects to login but can't login"

**Solution:**
1. Verify Supabase environment variables in Vercel
2. Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
3. Test Supabase connection in Supabase dashboard
4. Verify admin user exists in `user_profiles` table

### Issue: "Login works but shows 'No admin access'"

**Solution:**
1. Check user role in Supabase:
   ```sql
   SELECT * FROM user_profiles WHERE id = 'your-user-id';
   ```
2. Update role to admin:
   ```sql
   UPDATE user_profiles SET role = 'admin' WHERE id = 'your-user-id';
   ```
3. Logout and login again

### Issue: "Can't upload documents"

**Solution:**
1. Verify Supabase storage buckets exist
2. Check storage policies allow admin uploads
3. Verify file size is under 50MB
4. Check browser console for specific errors

### Issue: "Categories not loading"

**Solution:**
1. Verify `categories` table exists in Supabase
2. Check that categories have proper parent-child relationships
3. Run the category setup script if needed:
   ```bash
   node scripts/add-missing-categories.js
   ```

---

## 📊 Monitoring After Deployment

### What to Monitor

1. **Vercel Dashboard**
   - Check for deployment errors
   - Monitor function execution times
   - Check for any runtime errors

2. **Supabase Dashboard**
   - Monitor database queries
   - Check storage usage
   - Review authentication logs

3. **Browser Console**
   - Check for JavaScript errors
   - Monitor network requests
   - Verify API responses

### Expected Behavior

✅ **Normal Operation:**
- Admin dashboard loads in < 3 seconds
- Document uploads complete in < 10 seconds
- No console errors
- All images and assets load correctly
- Categories load without errors

❌ **Issues to Watch For:**
- 500 errors (server errors)
- Authentication failures
- Slow page loads (> 5 seconds)
- Failed file uploads
- Missing images or assets

---

## 🎉 Success Criteria

Your admin panel is working correctly if:

✅ You can access `https://yourwebsite.com/admin`
✅ Login redirects work correctly
✅ Admin users can access the dashboard
✅ Non-admin users are blocked
✅ Document upload works
✅ Document edit/delete works
✅ Blog management works
✅ Banner management works
✅ All error messages are in Mongolian
✅ No console errors in browser

---

## 📞 Getting Help

If you encounter issues:

1. **Check Vercel Logs:**
   - Go to Vercel dashboard → Your project → Deployments
   - Click on latest deployment → View Function Logs

2. **Check Supabase Logs:**
   - Go to Supabase dashboard → Your project → Logs
   - Check for authentication or database errors

3. **Check Browser Console:**
   - Open DevTools (F12) → Console tab
   - Look for red error messages

4. **Verify Environment Variables:**
   - Vercel dashboard → Settings → Environment Variables
   - Make sure all required variables are set

---

## 🔒 Security Notes

### Important Security Considerations

1. **Keep Admin Credentials Safe:**
   - Use strong passwords
   - Don't share credentials
   - Change passwords regularly

2. **Monitor Access:**
   - Check Supabase auth logs regularly
   - Review who has admin access
   - Remove admin access for former staff

3. **Regular Backups:**
   - Supabase automatically backs up your database
   - Consider exporting important data regularly

4. **HTTPS Only:**
   - Vercel automatically provides HTTPS
   - Never access admin panel over HTTP

---

## 📝 Summary

**After merging your PR to Vercel:**

1. ✅ Your admin panel will be live at `https://yourwebsite.com/admin`
2. ✅ Only users with admin credentials can access it
3. ✅ All features (documents, blogs, banners) will work online
4. ✅ Authentication is secure with Supabase
5. ✅ Non-admin users will be blocked automatically

**To verify it works:**
- Visit `https://yourwebsite.com/admin`
- Login with your admin credentials
- Test uploading a document
- Test editing and deleting
- Verify all tabs work correctly

**Your admin panel is production-ready! 🚀**
