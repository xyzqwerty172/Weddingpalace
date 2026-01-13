# Manual Testing Instructions for Admin Dashboard

## Overview

Task 3 requires manual testing of the existing admin dashboard functionality. Since this involves user interface interactions, authentication flows, and file uploads, automated testing is not appropriate at this stage. Instead, comprehensive manual testing is required.

## Current Status

✅ **Development server is running** on http://localhost:3033

✅ **Testing guide has been created** at `.kiro/specs/production-admin-dashboard/TESTING_GUIDE.md`

## What You Need to Do

### Step 1: Review the Testing Guide

Open the file `.kiro/specs/production-admin-dashboard/TESTING_GUIDE.md` which contains:
- 19 detailed test cases covering all sub-tasks
- Step-by-step instructions for each test
- Expected results for verification
- Space to record observations and results

### Step 2: Prepare Test Data

Before starting testing, gather:

1. **User Accounts:**
   - Admin user credentials (for testing admin access)
   - Non-admin user credentials (for testing access denial)
   - Or create test accounts in Supabase if needed

2. **Test Files:**
   - Small PDF file (<1MB) - for successful upload testing
   - Medium PDF file (~10MB) - for successful upload testing
   - Large PDF file (~50MB) - for size limit testing
   - Very large PDF file (>50MB) - for rejection testing
   - Non-PDF files (.jpg, .docx, .txt) - for file type validation testing

### Step 3: Execute Test Cases

Work through each test case in the testing guide:

#### Sub-task 3.1: Authentication and Authorization (4 test cases)
- Test unauthenticated access
- Test non-admin user access
- Test admin user access
- Test session expiry handling

#### Sub-task 3.2: Document Management (4 test cases)
- Test PDF document upload
- Test document metadata editing
- Test document file replacement
- Test document deletion

#### Sub-task 3.3: Blog Management (2 test cases)
- Test blog list display
- Test navigation to blog editor

#### Sub-task 3.4: Banner Management (1 test case)
- Test banner list display

#### Sub-task 3.5: Category Dropdowns (4 test cases)
- Test main category selection
- Test subcategory visibility
- Test sub-subcategory visibility
- Test category selection reset

#### Sub-task 3.6: Error Handling (4 test cases)
- Test non-PDF file rejection
- Test file size limit enforcement
- Test upload without category
- Test error messages are in Mongolian

### Step 4: Document Results

For each test case:
1. Mark the status (✅ Passed, ❌ Failed, or ⬜ Not Tested)
2. Record observations in the Notes section
3. Document any issues found
4. Take screenshots if helpful

### Step 5: Report Findings

After completing all tests:
1. Fill in the Test Summary section
2. List any critical issues found
3. List any non-critical issues found
4. Provide recommendations for fixes or improvements

## Quick Start Guide

### Access the Admin Dashboard

1. Open your browser
2. Navigate to http://localhost:3033/admin
3. You should be redirected to login if not authenticated
4. Log in with admin credentials
5. You should see the admin dashboard with three tabs

### Test a Simple Upload

1. Click the "Documents" tab
2. Click "Upload Document" button
3. Fill in the title: "Test Document"
4. Select a category from the dropdown
5. Choose a small PDF file
6. Click "Upload"
7. Verify the document appears in the list

### Test Error Handling

1. Try uploading a .jpg file instead of PDF
2. Verify you see an error message in Mongolian
3. Try uploading without selecting a category
4. Verify you see an error message

## Important Notes

### Browser Console

Keep the browser developer console open (F12) during testing to:
- Monitor console logs
- Check for JavaScript errors
- Observe network requests
- View detailed error messages

### Network Tab

Monitor the Network tab to verify:
- API calls are successful
- File uploads complete
- Proper error responses are received

### Supabase Dashboard

You may want to check the Supabase dashboard to verify:
- Documents are actually stored in the database
- Files are uploaded to storage buckets
- User profiles and roles are correct

## Testing Tips

1. **Test in order**: Follow the test cases in sequence as some tests build on previous ones

2. **Clear browser cache**: If you encounter unexpected behavior, try clearing browser cache and cookies

3. **Use incognito mode**: For authentication tests, use incognito/private browsing to ensure clean sessions

4. **Test edge cases**: Don't just test the happy path - try unusual inputs and scenarios

5. **Document everything**: Even if a test passes, note any observations that might be useful

6. **Take breaks**: Manual testing can be tedious - take breaks to maintain focus

## Troubleshooting

### Server Not Running

If http://localhost:3033 doesn't load:
```bash
npm run dev
```

### Can't Log In

If you can't log in as admin:
- Check Supabase credentials in .env files
- Verify user exists in Supabase auth
- Verify user has 'admin' role in user_profiles table

### Categories Not Loading

If categories don't appear in dropdowns:
- Check Supabase connection
- Verify categories table has data
- Check browser console for errors

### Files Not Uploading

If file uploads fail:
- Check Supabase storage bucket exists
- Verify storage policies allow uploads
- Check file size and type
- Monitor network tab for errors

## Next Steps

After completing manual testing:

1. **Update task status**: Mark sub-tasks as complete in tasks.md
2. **Report to user**: Summarize findings and any issues discovered
3. **Fix issues**: If critical issues are found, they should be addressed before proceeding
4. **Proceed to Task 4**: Once all tests pass, move to the checkpoint task

## Questions?

If you encounter any issues or have questions during testing:
- Check the design document for expected behavior
- Review the requirements document for specifications
- Check browser console for detailed error messages
- Examine Supabase logs for backend issues

---

**Remember**: The goal is to verify that all existing functionality works correctly before deploying to production. Thorough testing now will prevent issues later!
