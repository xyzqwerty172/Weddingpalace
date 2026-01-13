# Requirements Document

## Introduction

This specification defines the requirements for making the existing hard-coded admin dashboard production-ready and removing the AdminJS implementation. The system currently has a functional Supabase-based admin dashboard that needs to be finalized for production use, allowing staff members to access it online securely.

## Glossary

- **Admin_Dashboard**: The hard-coded administrative interface built with Supabase for managing documents, blogs, and banners
- **AdminJS**: Third-party admin framework that will be removed from the system
- **Supabase**: Backend-as-a-Service platform used for authentication and database operations
- **Staff_User**: An authenticated user with admin role who can access the admin dashboard
- **Production_Environment**: The live deployment environment accessible online by staff members
- **Document**: PDF files uploaded and managed through the admin dashboard
- **Blog**: News articles and posts managed through the admin dashboard
- **Banner**: Homepage banner images managed through the admin dashboard
- **Category**: Hierarchical classification system for organizing documents

## Requirements

### Requirement 1: Remove AdminJS Implementation

**User Story:** As a system administrator, I want to remove all AdminJS dependencies and code, so that the system only uses the hard-coded admin dashboard.

#### Acceptance Criteria

1. WHEN the system is deployed, THE System SHALL NOT include any AdminJS npm packages in the dependencies
2. WHEN a user navigates to /admin, THE System SHALL display the Supabase admin dashboard instead of redirecting to AdminJS
3. THE System SHALL NOT contain any AdminJS server files or configuration files
4. THE System SHALL NOT have any AdminJS-related scripts in package.json
5. THE System SHALL remove all AdminJS-related environment variables from configuration files

### Requirement 2: Secure Admin Access

**User Story:** As a staff member, I want to securely access the admin dashboard online, so that I can manage content from anywhere.

#### Acceptance Criteria

1. WHEN an unauthenticated user attempts to access /admin, THE System SHALL redirect them to the login page
2. WHEN an authenticated non-admin user attempts to access /admin, THE System SHALL deny access and redirect to the home page
3. WHEN an authenticated admin user accesses /admin, THE System SHALL display the admin dashboard
4. WHEN a user's session expires, THE System SHALL redirect them to the login page with an appropriate message
5. THE System SHALL validate admin role from the user_profiles table in Supabase

### Requirement 3: Document Management

**User Story:** As an admin user, I want to upload, edit, and delete PDF documents with proper categorization, so that I can maintain the document library.

#### Acceptance Criteria

1. WHEN an admin uploads a PDF file, THE System SHALL validate the file type is PDF
2. WHEN an admin uploads a file larger than 50MB, THE System SHALL reject the upload with an error message
3. WHEN an admin uploads a document, THE System SHALL require title and category selection
4. WHEN an admin selects a category, THE System SHALL display appropriate subcategories if they exist
5. WHEN an admin uploads a document, THE System SHALL store it in Supabase storage and create a database record
6. WHEN an admin edits a document, THE System SHALL update the document metadata in the database
7. WHEN an admin deletes a document, THE System SHALL remove both the file from storage and the database record
8. WHEN displaying documents, THE System SHALL show title, category, upload date, and file size

### Requirement 4: Blog Management

**User Story:** As an admin user, I want to manage blog posts and news articles, so that I can keep the website content up to date.

#### Acceptance Criteria

1. WHEN an admin views the blogs tab, THE System SHALL display all blog posts sorted by creation date
2. WHEN an admin clicks edit on a blog post, THE System SHALL navigate to the blog editor page
3. WHEN displaying blog posts, THE System SHALL show title, subtitle, type, published status, and creation date
4. THE System SHALL distinguish between news posts and information posts with visual indicators

### Requirement 5: Banner Management

**User Story:** As an admin user, I want to manage homepage banners, so that I can update the website's visual content.

#### Acceptance Criteria

1. WHEN an admin views the banners tab, THE System SHALL display all banners sorted by creation date
2. WHEN an admin uploads a banner image, THE System SHALL validate the file is an image format
3. WHEN an admin edits a banner, THE System SHALL allow updating the banner image and metadata
4. WHEN an admin deletes a banner, THE System SHALL remove both the image file and database record
5. WHEN displaying banners, THE System SHALL show preview image, title, and creation date

### Requirement 6: Error Handling and User Feedback

**User Story:** As an admin user, I want clear error messages and feedback, so that I understand what actions succeeded or failed.

#### Acceptance Criteria

1. WHEN a network error occurs, THE System SHALL display a user-friendly error message in Mongolian
2. WHEN an authentication error occurs, THE System SHALL prompt the user to log in again
3. WHEN a file upload succeeds, THE System SHALL display a success message with file details
4. WHEN a file upload fails, THE System SHALL display a specific error message explaining the failure reason
5. WHEN data is loading, THE System SHALL display loading indicators
6. WHEN an operation succeeds, THE System SHALL auto-clear success messages after 3 seconds

### Requirement 7: Category Management

**User Story:** As an admin user, I want to select from hierarchical categories when uploading documents, so that documents are properly organized.

#### Acceptance Criteria

1. WHEN an admin opens the upload dialog, THE System SHALL load and display all root categories
2. WHEN an admin selects a main category with subcategories, THE System SHALL display the subcategories
3. WHEN an admin selects a subcategory with sub-subcategories, THE System SHALL display the sub-subcategories
4. WHEN categories are loading, THE System SHALL display a loading indicator in the dropdown
5. WHEN category loading fails, THE System SHALL display an error message and allow retry
6. THE System SHALL cache category data for 5 minutes to improve performance

### Requirement 8: Production Deployment

**User Story:** As a system administrator, I want the admin dashboard deployed to production, so that staff can access it online.

#### Acceptance Criteria

1. WHEN the application is built for production, THE System SHALL include all admin dashboard dependencies
2. WHEN deployed to production, THE System SHALL use production Supabase credentials
3. WHEN accessed in production, THE System SHALL serve the admin dashboard over HTTPS
4. THE System SHALL configure proper CORS settings for production API endpoints
5. THE System SHALL set appropriate session timeout values for production security

### Requirement 9: Performance Optimization

**User Story:** As an admin user, I want the dashboard to load quickly and respond smoothly, so that I can work efficiently.

#### Acceptance Criteria

1. WHEN loading the admin dashboard, THE System SHALL use memoized category lookups for O(1) access
2. WHEN rendering category dropdowns, THE System SHALL use React.memo to prevent unnecessary re-renders
3. WHEN fetching data, THE System SHALL load documents, blogs, and banners concurrently
4. WHEN category data is cached, THE System SHALL reuse cached data instead of refetching
5. THE System SHALL implement proper React hooks dependencies to prevent infinite re-renders

### Requirement 10: Data Sorting and Filtering

**User Story:** As an admin user, I want to sort and filter content, so that I can find specific items quickly.

#### Acceptance Criteria

1. WHEN viewing documents, THE System SHALL allow sorting by newest or oldest first
2. WHEN the sort order changes, THE System SHALL refetch documents with the new sort order
3. WHEN displaying documents, THE System SHALL show the most recently uploaded documents first by default
4. THE System SHALL maintain sort preferences during the admin session
5. WHEN switching between tabs, THE System SHALL preserve the current tab selection
