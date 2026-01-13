# Quick Deployment Checklist ✅

## Before Merging PR

### 1. Verify Environment Variables in Vercel
- [ ] Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- [ ] Check `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] Verify they match your production Supabase project

### 2. Verify Admin User Exists in Supabase
- [ ] Go to Supabase Dashboard → SQL Editor
- [ ] Run this query:
```sql
SELECT up.id, up.role, au.email 
FROM user_profiles up
JOIN auth.users au ON au.id = up.id
WHERE up.role = 'admin';
```
- [ ] Confirm at least one admin user exists
- [ ] Note down the admin email/password for testing

### 3. Verify Database Tables Exist
- [ ] Go to Supabase Dashboard → Table Editor
- [ ] Confirm these tables exist:
  - `user_profiles`
  - `documents`
  - `blogs`
  - `banners`
  - `categories`

### 4. Verify Storage Buckets Exist
- [ ] Go to Supabase Dashboard → Storage
- [ ] Confirm these buckets exist:
  - `documents`
  - `banners`

---

## After Merging PR

### 1. Wait for Vercel Deployment
- [ ] Check Vercel dashboard for deployment status
- [ ] Wait for "Deployment Complete" notification (2-5 minutes)
- [ ] Check for any build errors in Vercel logs

### 2. Test Admin Access
- [ ] Open browser (incognito mode recommended)
- [ ] Go to `https://yourwebsite.com/admin`
- [ ] Should redirect to login page
- [ ] Login with admin credentials
- [ ] Should see admin dashboard with 3 tabs

### 3. Test Document Upload
- [ ] Click "Баримт бичиг" (Documents) tab
- [ ] Click "Шинэ баримт нэмэх" (Add new document) button
- [ ] Select a test PDF file (under 50MB)
- [ ] Enter title
- [ ] Select category (main → sub → sub-sub if available)
- [ ] Click upload
- [ ] Verify document appears in list

### 4. Test Document Edit/Delete
- [ ] Click edit icon on test document
- [ ] Change title
- [ ] Save changes
- [ ] Verify changes saved
- [ ] Click delete icon
- [ ] Confirm deletion
- [ ] Verify document removed

### 5. Test Other Features
- [ ] Click "Мэдээ" (Blogs) tab → Verify blogs list loads
- [ ] Click "Баннер" (Banners) tab → Verify banners list loads
- [ ] Test logout → Verify redirects to home
- [ ] Try accessing `/admin` without login → Verify redirects to login

---

## Quick Test URLs

After deployment, test these URLs:

1. **Admin Dashboard:** `https://yourwebsite.com/admin`
   - Expected: Redirect to login if not logged in

2. **Login Page:** `https://yourwebsite.com/auth/supabase/login`
   - Expected: Shows login form

3. **Home Page:** `https://yourwebsite.com/`
   - Expected: Shows normal website

---

## If Something Doesn't Work

### Admin page shows 404
→ Check Vercel build logs for errors
→ Verify `src/app/admin/page.js` is in your repository

### Can't login
→ Check Supabase environment variables in Vercel
→ Verify admin user exists in Supabase

### Login works but shows "No admin access"
→ Run this in Supabase SQL Editor:
```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'your-admin-email@example.com');
```

### Can't upload documents
→ Check Supabase storage buckets exist
→ Verify file is PDF and under 50MB
→ Check browser console for errors

---

## Success! ✅

Your admin panel is working if:
- ✅ Can access `https://yourwebsite.com/admin`
- ✅ Can login with admin credentials
- ✅ Can see all 3 tabs (Documents, Blogs, Banners)
- ✅ Can upload, edit, and delete documents
- ✅ Non-admin users are blocked

**Your admin panel is live and ready for staff use! 🎉**
