# Git Deployment Commands

## 🚀 Quick Deployment Guide

Follow these commands to deploy to production via GitHub and Vercel.

---

## Step 1: Check Current Status

```bash
git status
```

**Expected:** You should see modified files listed in red.

---

## Step 2: Stage All Changes

```bash
git add .
```

**What this does:** Stages all modified files for commit.

---

## Step 3: Commit Changes

```bash
git commit -m "feat: production-ready deployment

- fix: remove admin signup and secure authentication
- fix: improve service images display (full width, no cropping)  
- fix: change Google Maps language from Korean to English
- feat: production build verified and tested
- security: admin access control implemented"
```

**What this does:** Creates a commit with a descriptive message.

---

## Step 4: Push to GitHub

```bash
git push origin main
```

**What this does:** Pushes your changes to GitHub main branch.

**Note:** If you're on a different branch, replace `main` with your branch name.

---

## Step 5: Wait for Vercel Deployment

After pushing to GitHub:

1. **Vercel Auto-Detects** - Vercel automatically detects your push
2. **Build Starts** - Build process begins (2-5 minutes)
3. **Deployment** - Automatically deploys to production
4. **Notification** - You'll receive a deployment notification

**Check Deployment:**
- Go to your Vercel dashboard
- Check deployment status
- View build logs if needed

---

## Step 6: Verify Production Deployment

After Vercel completes deployment:

### Test 1: Homepage
```
Visit: https://yourwebsite.com
Expected: Homepage loads correctly
```

### Test 2: Service Images
```
Visit: https://yourwebsite.com/service/wedding
Visit: https://yourwebsite.com/service/arrangement
Expected: Images display at full width, no cropping
```

### Test 3: Google Maps
```
Visit: https://yourwebsite.com (Мэдлээлэл section)
Expected: Google Maps displays in English (not Korean)
```

### Test 4: Admin Login
```
Visit: https://yourwebsite.com/auth/supabase/login
Login: weddingpalace@gmail.com / WeddingZxC172-
Expected: Successfully logs in to admin dashboard
```

### Test 5: Admin Dashboard
```
Visit: https://yourwebsite.com/admin
Expected: Admin dashboard loads with all features
Test: Upload a document, edit, delete
```

### Test 6: Security
```
Try: Access /admin without login
Expected: Redirects to login page

Try: Login with non-admin account (if you have one)
Expected: Shows error and blocks access
```

---

## Alternative: Create a Pull Request

If you want to review changes before merging to main:

### Step 1: Create a New Branch
```bash
git checkout -b production-deployment
```

### Step 2: Commit Changes
```bash
git add .
git commit -m "feat: production-ready deployment

- fix: remove admin signup and secure authentication
- fix: improve service images display (full width, no cropping)
- fix: change Google Maps language from Korean to English
- feat: production build verified and tested
- security: admin access control implemented"
```

### Step 3: Push Branch
```bash
git push origin production-deployment
```

### Step 4: Create PR on GitHub
1. Go to your GitHub repository
2. Click "Pull requests" tab
3. Click "New pull request"
4. Select `production-deployment` branch
5. Review changes
6. Click "Create pull request"
7. Add description
8. Click "Create pull request"

### Step 5: Merge PR
1. Review the PR
2. Click "Merge pull request"
3. Confirm merge
4. Vercel will auto-deploy

---

## Troubleshooting

### Issue: Git push rejected
```bash
# Pull latest changes first
git pull origin main

# Then push again
git push origin main
```

### Issue: Merge conflicts
```bash
# Check which files have conflicts
git status

# Resolve conflicts in your editor
# Then:
git add .
git commit -m "fix: resolve merge conflicts"
git push origin main
```

### Issue: Vercel build fails
1. Check Vercel dashboard for error logs
2. Common issues:
   - Missing environment variables
   - Build errors (check logs)
   - Dependency issues

### Issue: Admin login doesn't work
1. Check Supabase environment variables in Vercel
2. Verify admin user exists in Supabase
3. Check browser console for errors

---

## Quick Reference

### Check what changed
```bash
git status
git diff
```

### See commit history
```bash
git log --oneline
```

### Undo last commit (keep changes)
```bash
git reset --soft HEAD~1
```

### Undo all changes (DANGEROUS)
```bash
git reset --hard HEAD
```

---

## Summary

**Simple Deployment (Recommended):**
```bash
git add .
git commit -m "feat: production-ready deployment"
git push origin main
```

**Then wait for Vercel to deploy (2-5 minutes)**

**Your site will be live! 🎉**
