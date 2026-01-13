# Admin Dashboard Testing Guide

## Overview
This document provides step-by-step instructions for manually testing the admin dashboard functionality. The development server is running at **http://localhost:3033**.

## Prerequisites
- Development server running on port 3033
- Access to Supabase admin credentials
- Test PDF files (various sizes)
- Test non-PDF files for validation testing

---

## Test 3.1: Authentication and Authorization

### Test Case 3.1.1: Unauthenticated Access
**Objective:** Verify that unauthenticated users are redirected to login

**Steps:**
1. Open a new incognito/private browser window
2. Navigate to http://localhost:3033/admin
3. Observe the behavior

**Expected Result:**
- User should be redirected to the login page (/auth/supabase/login)
- Should see message: "Нэвтрээгүй байна. Нэвтрэх хуудас руу шилжүүлж байна..."
- No admin dashboard content should be visible

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

### Test Case 3.1.2: Non-Admin User Access
**Objective:** Verify that authenticated non-admin users are denied access

**Steps:**
1. Log in with a non-admin user account
2. Navigate to http://localhost:3033/admin
3. Observe the behavior

**Expected Result:**
- User should see error message: "Админ эрх шаардлагатай. Хандах эрхгүй байна."
- User should be redirected to home page (/) after 3 seconds
- No admin dashboard content should be visible

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

### Test Case 3.1.3: Admin User Access
**Objective:** Verify that authenticated admin users can access the dashboard

**Steps:**
1. Log in with an admin user account
2. Navigate to http://localhost:3033/admin
3. Observe the behavior

**Expected Result:**
- User should see success message: "Админ эрх баталгаажлаа. Мэдээлэл ачаалж байна..."
- Admin dashboard should load with three tabs: Documents, Blogs, Banners
- Should see document list, blog list, or banner list depending on active tab
- No error messages should appear

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

### Test Case 3.1.4: Session Expiry
**Objective:** Verify that expired sessions are handled correctly

**Steps:**
1. Log in as admin user
2. Access the admin dashboard
3. Wait for session to expire (or manually invalidate the session token in browser dev tools)
4. Try to perform an action (e.g., upload a document)

**Expected Result:**
- User should see message: "Нэвтрэх хугацаа дууссан байна. Дахин нэвтэрнэ үү."
- User should be redirected to login page after 3 seconds
- Action should not be completed

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

## Test 3.2: Document Management

### Test Case 3.2.1: Upload PDF Document
**Objective:** Verify that PDF documents can be uploaded successfully

**Steps:**
1. Log in as admin user
2. Navigate to admin dashboard
3. Click "Documents" tab
4. Click "Upload Document" button
5. Fill in the title field
6. Select a main category from dropdown
7. If subcategories appear, select appropriate subcategory
8. If sub-subcategories appear, select appropriate sub-subcategory
9. Click "Choose File" and select a valid PDF file (under 50MB)
10. Click "Upload" button

**Expected Result:**
- File should upload successfully
- Success message should appear: "Баримт амжилттай байршлаа. Ангилал: [category path]"
- Document should appear in the document list
- Document should show: title, category, upload date, file size

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

### Test Case 3.2.2: Edit Document Metadata
**Objective:** Verify that document metadata can be edited

**Steps:**
1. From the document list, click the "Edit" button on a document
2. Modify the title
3. Change the category selection
4. Click "Update" button (without selecting a new file)

**Expected Result:**
- Success message should appear: "Баримтын мэдээлэл амжилттай шинэчлэгдлээ. Ангилал: [new category path]"
- Document list should refresh
- Document should show updated title and category
- Original file should remain unchanged

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

### Test Case 3.2.3: Replace Document File
**Objective:** Verify that document files can be replaced

**Steps:**
1. From the document list, click the "Edit" button on a document
2. Keep the title the same or modify it
3. Click "Choose File" and select a different PDF file
4. Click "Update" button

**Expected Result:**
- Success message should appear: "Баримт амжилттай солигдлоо. Ангилал: [category path]"
- Document list should refresh
- Document should show updated file
- Old file should be removed from storage

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

### Test Case 3.2.4: Delete Document
**Objective:** Verify that documents can be deleted

**Steps:**
1. From the document list, click the "Delete" button on a document
2. Confirm the deletion in the confirmation dialog

**Expected Result:**
- Confirmation dialog should show document details (title, filename, upload date)
- After confirmation, success message should appear: "[Document title] амжилттай устгагдлаа."
- Document should be removed from the list
- File should be removed from storage
- Database record should be deleted

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

## Test 3.3: Blog Management

### Test Case 3.3.1: View Blog List
**Objective:** Verify that blog list displays correctly

**Steps:**
1. Log in as admin user
2. Navigate to admin dashboard
3. Click "Blogs" tab

**Expected Result:**
- Blog list should display
- Each blog should show: title, subtitle, type (News/Information), published status, creation date
- Blogs should be sorted by creation date (newest first)
- Type should be visually distinguished (News vs Information)

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

### Test Case 3.3.2: Navigate to Blog Editor
**Objective:** Verify that clicking edit navigates to blog editor

**Steps:**
1. From the blog list, click the "Edit" button on a blog post
2. Observe the navigation

**Expected Result:**
- Should navigate to the blog editor page
- URL should change to /news/update/[blog-id] or similar
- Blog editor should load with the selected blog's content

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

## Test 3.4: Banner Management

### Test Case 3.4.1: View Banner List
**Objective:** Verify that banner list displays correctly

**Steps:**
1. Log in as admin user
2. Navigate to admin dashboard
3. Click "Banners" tab

**Expected Result:**
- Banner list should display
- Each banner should show: preview image, title, creation date
- Banners should be sorted by creation date (newest first)
- Images should be displayed correctly

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

## Test 3.5: Category Dropdowns

### Test Case 3.5.1: Main Category Selection
**Objective:** Verify that main categories load and can be selected

**Steps:**
1. Open the document upload dialog
2. Observe the main category dropdown
3. Click on the main category dropdown
4. Select a category that has subcategories

**Expected Result:**
- Main category dropdown should load with all root categories
- Categories should be sorted by order_num
- After selection, feedback message should appear
- If category has children, message should indicate number of subcategories
- Subcategory dropdown should appear if children exist

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

### Test Case 3.5.2: Subcategory Visibility
**Objective:** Verify that subcategories appear when parent is selected

**Steps:**
1. Select a main category that has subcategories
2. Observe the subcategory dropdown

**Expected Result:**
- Subcategory dropdown should appear
- Should be populated with children of selected main category
- Should be sorted by order_num
- Should show Mongolian names (name_mn)

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

### Test Case 3.5.3: Sub-Subcategory Visibility
**Objective:** Verify that sub-subcategories appear when subcategory is selected

**Steps:**
1. Select a main category
2. Select a subcategory that has sub-subcategories
3. Observe the sub-subcategory dropdown

**Expected Result:**
- Sub-subcategory dropdown should appear
- Should be populated with children of selected subcategory
- Should be sorted by order_num
- Should show Mongolian names (name_mn)

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

### Test Case 3.5.4: Category Selection Reset
**Objective:** Verify that child selections are cleared when parent changes

**Steps:**
1. Select main category, subcategory, and sub-subcategory
2. Change the main category selection
3. Observe the subcategory and sub-subcategory dropdowns

**Expected Result:**
- Subcategory selection should be cleared
- Sub-subcategory selection should be cleared
- Subcategory dropdown should update with new children
- Sub-subcategory dropdown should disappear if no longer applicable

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

## Test 3.6: Error Handling

### Test Case 3.6.1: Upload Non-PDF File
**Objective:** Verify that non-PDF files are rejected

**Steps:**
1. Open the document upload dialog
2. Fill in required fields
3. Select a non-PDF file (e.g., .jpg, .docx, .txt)
4. Observe the behavior

**Expected Result:**
- Error message should appear in Mongolian: "Зөвхөн PDF файл байршуулах боломжтой. Сонгосон файлын төрөл: [file type]"
- File should not be uploaded
- Upload button should remain disabled or show error state

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

### Test Case 3.6.2: Upload File Over 50MB
**Objective:** Verify that files over 50MB are rejected

**Steps:**
1. Open the document upload dialog
2. Fill in required fields
3. Select a PDF file larger than 50MB
4. Observe the behavior

**Expected Result:**
- Error message should appear in Mongolian: "Файлын хэмжээ 50MB-аас их байж болохгүй. Сонгосон файлын хэмжээ: [size]MB"
- File should not be uploaded
- Upload button should remain disabled or show error state

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

### Test Case 3.6.3: Upload Without Category
**Objective:** Verify that uploads without category selection are prevented

**Steps:**
1. Open the document upload dialog
2. Fill in the title
3. Select a valid PDF file
4. Do NOT select any category
5. Click "Upload" button

**Expected Result:**
- Error message should appear in Mongolian indicating category is required
- Upload should be prevented
- Error should be displayed near the category dropdown

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

### Test Case 3.6.4: Error Messages in Mongolian
**Objective:** Verify that all error messages are displayed in Mongolian

**Steps:**
1. Trigger various errors:
   - Network error (disconnect internet)
   - Authentication error (invalid token)
   - Permission error (non-admin access)
   - Validation error (invalid file type)
   - Database error (if possible)

**Expected Result:**
- All error messages should be in Mongolian language
- No English error messages should leak through
- Error messages should be user-friendly and descriptive

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

**Notes:**
```
[Record observations here]
```

---

## Test Summary

### Test Results Overview
- Total Test Cases: 19
- Passed: ___
- Failed: ___
- Not Tested: ___

### Critical Issues Found
```
[List any critical issues discovered during testing]
```

### Non-Critical Issues Found
```
[List any minor issues or improvements needed]
```

### Recommendations
```
[List any recommendations for improvements or fixes]
```

---

## Testing Checklist

Use this checklist to track overall progress:

- [ ] 3.1.1 - Unauthenticated Access
- [ ] 3.1.2 - Non-Admin User Access
- [ ] 3.1.3 - Admin User Access
- [ ] 3.1.4 - Session Expiry
- [ ] 3.2.1 - Upload PDF Document
- [ ] 3.2.2 - Edit Document Metadata
- [ ] 3.2.3 - Replace Document File
- [ ] 3.2.4 - Delete Document
- [ ] 3.3.1 - View Blog List
- [ ] 3.3.2 - Navigate to Blog Editor
- [ ] 3.4.1 - View Banner List
- [ ] 3.5.1 - Main Category Selection
- [ ] 3.5.2 - Subcategory Visibility
- [ ] 3.5.3 - Sub-Subcategory Visibility
- [ ] 3.5.4 - Category Selection Reset
- [ ] 3.6.1 - Upload Non-PDF File
- [ ] 3.6.2 - Upload File Over 50MB
- [ ] 3.6.3 - Upload Without Category
- [ ] 3.6.4 - Error Messages in Mongolian

---

## Notes for Tester

### Important URLs
- Admin Dashboard: http://localhost:3033/admin
- Login Page: http://localhost:3033/auth/supabase/login
- Home Page: http://localhost:3033/

### Test Data Needed
- Admin user credentials
- Non-admin user credentials
- Test PDF files (various sizes: <1MB, ~10MB, ~50MB, >50MB)
- Test non-PDF files (.jpg, .docx, .txt, etc.)

### Browser Testing
It's recommended to test in multiple browsers:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)

### Console Monitoring
Keep browser developer console open during testing to observe:
- Console logs
- Network requests
- Error messages
- Performance metrics
