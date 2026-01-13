# Implementation Plan: Production Admin Dashboard

## Overview

This implementation plan outlines the tasks to remove unused AdminJS code and deploy the existing custom admin dashboard to production. The custom admin panel is already built and working - we just need to clean up AdminJS remnants and make it live for staff access.

## Tasks

- [x] 1. Remove AdminJS implementation
  - Remove all AdminJS npm packages from package.json dependencies (adminjs, @adminjs/express, @adminjs/prisma)
  - Delete AdminJS server files (admin-server-*.js, admin-server-*.mjs, setup-adminjs.js)
  - Remove AdminJS scripts from package.json (admin, dev:admin)
  - Delete AdminJS redirect component (src/sections/admin/adminjs-redirect-view.js)
  - Remove AdminJS documentation (ADMINJS_SETUP.md)
  - Remove AdminJS environment variables from .env files (ADMIN_PORT, ADMIN_URL, etc.)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Update admin route to use existing custom dashboard
  - Modify src/app/admin/page.js to import and render SupabaseAdminDashboardView (instead of AdminJSRedirectView)
  - Test that /admin route displays the custom admin dashboard
  - Verify all existing functionality still works (document upload, blog management, banner management)
  - _Requirements: 1.2_

- [x] 3. Test existing admin dashboard functionality locally
  - [x] 3.1 Test authentication and authorization
    - Login as admin user and verify dashboard access
    - Try accessing as non-admin user (should be denied)
    - Try accessing without login (should redirect to login)
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 3.2 Test document management
    - Upload a PDF document with category selection
    - Edit document metadata
    - Delete a document
    - Verify all operations work correctly
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.6, 3.7, 3.8_

  - [x] 3.3 Test blog management
    - View blog list
    - Click edit on a blog post
    - Verify navigation works
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 3.4 Test banner management
    - View banner list
    - Verify banners display correctly
    - _Requirements: 5.1, 5.5_

  - [x] 3.5 Test category dropdowns
    - Select main category
    - Verify subcategories appear if they exist
    - Select subcategory
    - Verify sub-subcategories appear if they exist
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 3.6 Test error handling
    - Try uploading non-PDF file (should show error)
    - Try uploading file over 50MB (should show error)
    - Try uploading without category (should show error)
    - Verify all error messages are in Mongolian
    - _Requirements: 6.1, 6.2, 6.4_

- [x] 4. Checkpoint - Verify all existing functionality works
  - Ensure admin dashboard works correctly locally
  - Verify all CRUD operations function properly
  - Ask the user if questions arise

- [x] 5. Prepare production environment configuration
  - [x] 5.1 Review and update environment variables
    - Verify production Supabase URL is set
    - Verify production Supabase anon key is set
    - Remove any AdminJS-related environment variables
    - Document required environment variables for deployment
    - _Requirements: 8.2_

  - [x] 5.2 Configure CORS settings for production
    - Set allowed origins for production domain
    - Configure API route CORS headers if needed
    - _Requirements: 8.4_

  - [x] 5.3 Review session and security settings
    - Verify session timeout is appropriate for production
    - Ensure HTTPS will be used in production
    - _Requirements: 8.3, 8.5_

- [x] 6. Verify Supabase production setup
  - [x] 6.1 Verify database tables exist
    - Check documents table exists
    - Check blogs table exists
    - Check banners table exists
    - Check categories table exists
    - Check user_profiles table exists
    - _Requirements: 8.2_

  - [x] 6.2 Verify storage buckets exist
    - Check documents storage bucket exists
    - Check banners storage bucket exists
    - Verify storage policies are configured
    - _Requirements: 8.2_

  - [x] 6.3 Verify RLS policies are configured
    - Check admin users can read/write all tables
    - Check storage policies match table policies
    - Test with admin user account
    - _Requirements: 8.2_

  - [x] 6.4 Create admin user account if needed
    - Ensure at least one admin user exists in production
    - Test login with admin credentials
    - _Requirements: 2.3_

- [x] 7. Build application for production
  - Run `npm run build` to create production build
  - Verify build completes without errors
  - Test the built application locally with `npm start`
  - Verify admin dashboard works in production build
  - _Requirements: 8.1_

- [ ] 8. Deploy to production hosting
  - [ ] 8.1 Deploy to hosting platform (Vercel/Netlify/etc)
    - Push code to repository
    - Configure deployment settings
    - Set environment variables in hosting platform
    - Deploy application
    - _Requirements: 8.3_

  - [ ] 8.2 Configure custom domain and HTTPS
    - Set up custom domain if needed
    - Verify HTTPS is enabled
    - Test domain access
    - _Requirements: 8.3_

  - [ ] 8.3 Verify deployment
    - Access production URL
    - Test admin login
    - Test document upload
    - Test document edit and delete
    - Test blog management
    - Test banner management
    - Verify all functionality works in production
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 9. Post-deployment verification
  - [ ] 9.1 Test with staff members
    - Have staff members log in
    - Have them upload test documents
    - Verify they can perform all necessary operations
    - Gather feedback on any issues

  - [ ] 9.2 Monitor for errors
    - Check browser console for errors
    - Check server logs for errors
    - Verify error handling works correctly

  - [ ] 9.3 Document admin procedures
    - Create guide for staff on how to use admin dashboard
    - Document how to upload documents
    - Document how to manage blogs and banners
    - Document troubleshooting steps

- [ ] 10. Final checkpoint - Production is live
  - Verify admin dashboard is accessible online
  - Verify staff can log in and use all features
  - Verify all operations work correctly in production
  - Ask the user if questions arise or if additional features are needed

## Notes

- The custom admin dashboard is already built and working - we're just cleaning up AdminJS and deploying to production
- Focus on testing existing functionality to ensure it works correctly
- Most tasks are verification and deployment tasks, not new development
- Each task references specific requirements for traceability
- Checkpoints ensure everything works before moving to production
- Production deployment is the main goal - get the dashboard live for staff use
