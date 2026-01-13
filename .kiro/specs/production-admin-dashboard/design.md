# Design Document: Production Admin Dashboard

## Overview

This design document outlines the architecture and implementation approach for making the existing hard-coded Supabase admin dashboard production-ready. The system will remove all AdminJS dependencies and finalize the custom admin dashboard for online staff access. The dashboard provides comprehensive content management capabilities including document uploads, blog management, and banner management with proper authentication and authorization.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Next.js Frontend Application                  │  │
│  │  ┌────────────────┐  ┌──────────────────────────┐   │  │
│  │  │  Admin Route   │  │  Supabase Admin          │   │  │
│  │  │  /admin        │──│  Dashboard View          │   │  │
│  │  └────────────────┘  └──────────────────────────┘   │  │
│  │           │                      │                    │  │
│  │           ▼                      ▼                    │  │
│  │  ┌────────────────┐  ┌──────────────────────────┐   │  │
│  │  │  Auth Guard    │  │  Supabase Client         │   │  │
│  │  └────────────────┘  └──────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Backend                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Authentication Service                               │  │
│  │  - User authentication                                │  │
│  │  - Session management                                 │  │
│  │  - Role-based access control                          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Database (PostgreSQL)                                │  │
│  │  - documents table                                    │  │
│  │  - blogs table                                        │  │
│  │  - banners table                                      │  │
│  │  - categories table                                   │  │
│  │  - user_profiles table                                │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Storage Service                                      │  │
│  │  - PDF document storage                               │  │
│  │  - Image storage (banners)                            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
AdminPage (/admin/page.js)
    │
    ▼
SupabaseAdminDashboardView
    │
    ├─── Authentication Layer
    │    ├─── checkUser()
    │    ├─── User session validation
    │    └─── Admin role verification
    │
    ├─── Data Management Layer
    │    ├─── fetchDocuments()
    │    ├─── fetchBlogs()
    │    ├─── fetchBanners()
    │    └─── fetchCategories()
    │
    ├─── UI Components
    │    ├─── Tabs (Documents, Blogs, Banners)
    │    ├─── Document Upload Dialog
    │    │    ├─── MainCategoryDropdown
    │    │    ├─── SubCategoryDropdown
    │    │    └─── SubSubCategoryDropdown
    │    ├─── Document Table
    │    ├─── Blog Table
    │    └─── Banner Table
    │
    └─── State Management
         ├─── User state
         ├─── Content state (documents, blogs, banners)
         ├─── Category state (with caching)
         ├─── UI state (dialogs, tabs, loading)
         └─── Feedback state (errors, success messages)
```

## Components and Interfaces

### 1. Admin Page Component

**File:** `src/app/admin/page.js`

**Purpose:** Entry point for the admin dashboard route

**Current State:** Redirects to AdminJS (needs update)

**New Implementation:**
```javascript
import SupabaseAdminDashboardView from "src/sections/admin/supabase-admin-dashboard-view";

export default function AdminPage() {
  return <SupabaseAdminDashboardView />;
}
```

### 2. Supabase Admin Dashboard View

**File:** `src/sections/admin/supabase-admin-dashboard-view.js`

**Purpose:** Main admin dashboard component with all management functionality

**Key Features:**
- Multi-tab interface (Documents, Blogs, Banners)
- Document upload with category selection
- Document editing and deletion
- Blog post management
- Banner management
- Real-time feedback and error handling
- Performance-optimized category management

**State Management:**
```javascript
{
  // Authentication
  user: User | null,
  isAdmin: boolean,
  loading: boolean,
  
  // Content
  documents: Document[],
  blogs: Blog[],
  banners: Banner[],
  
  // Categories (with caching)
  categories: Category[],
  categoryTree: CategoryNode[],
  selectedMainCategory: string,
  selectedSubCategory: string,
  selectedSubSubCategory: string,
  
  // UI State
  tabValue: number,
  openDialog: boolean,
  editingDocument: Document | null,
  uploading: boolean,
  sortOrder: 'newest' | 'oldest',
  
  // Feedback
  feedback: { type: string, message: string },
  uploadError: string
}
```

### 3. Category Dropdown Components

**Components:**
- `MainCategoryDropdown` - Root level categories
- `SubCategoryDropdown` - Second level categories
- `SubSubCategoryDropdown` - Third level categories

**Optimization:** Memoized with React.memo to prevent unnecessary re-renders

**Features:**
- Loading states
- Error states
- Empty states
- Sorted by order_num
- Conditional rendering based on parent selection

### 4. Authentication Guard

**File:** `src/auth/guard/auth-guard.js`

**Purpose:** Protects routes requiring authentication

**Flow:**
1. Check if user is authenticated
2. If not, redirect to login with returnTo parameter
3. If authenticated, render children

**Note:** Admin role verification happens in the dashboard component itself

## Data Models

### Document Model
```typescript
interface Document {
  id: string;
  title: string;
  file_url: string;
  file_path: string;
  category_id: string;
  page_path: string;
  created_at: timestamp;
  updated_at: timestamp;
  file_size?: number;
}
```

### Blog Model
```typescript
interface Blog {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  type: number; // 0 = Information, 1 = News
  is_published: boolean;
  created_at: timestamp;
  updated_at: timestamp;
}
```

### Banner Model
```typescript
interface Banner {
  id: string;
  title: string;
  image_url: string;
  image_path: string;
  link_url?: string;
  created_at: timestamp;
  updated_at: timestamp;
}
```

### Category Model
```typescript
interface Category {
  id: string;
  name_mn: string;
  name_en: string;
  parent_id: string | null;
  order_num: number;
  created_at: timestamp;
}
```

### User Profile Model
```typescript
interface UserProfile {
  id: string; // matches auth.users.id
  role: 'admin' | 'user';
  created_at: timestamp;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Admin Access Control

*For any* authenticated user, if their role in user_profiles is not 'admin', then they should be redirected away from the admin dashboard and not be able to access any admin functionality.

**Validates: Requirements 2.2, 2.3**

### Property 2: File Type Validation

*For any* file upload attempt, if the file type is not 'application/pdf', then the upload should be rejected with an appropriate error message.

**Validates: Requirements 3.1**

### Property 3: File Size Validation

*For any* file upload attempt, if the file size exceeds 50MB, then the upload should be rejected with an appropriate error message.

**Validates: Requirements 3.2**

### Property 4: Category Selection Validation

*For any* document upload, if no category is selected (selectedMainCategory is empty), then the upload should be prevented and an error message should be displayed.

**Validates: Requirements 3.3**

### Property 5: Subcategory Visibility

*For any* main category selection, if that category has children in the categories table, then the subcategory dropdown should be displayed; otherwise it should be hidden.

**Validates: Requirements 7.2**

### Property 6: Authentication Session Expiry

*For any* admin dashboard operation, if the user's authentication token has expired, then the system should redirect to the login page with an appropriate message.

**Validates: Requirements 2.4**

### Property 7: Document Storage Consistency

*For any* successful document upload, both the file in Supabase storage and the database record in the documents table should exist; if either operation fails, both should be rolled back.

**Validates: Requirements 3.5**

### Property 8: Document Deletion Consistency

*For any* document deletion, both the file in Supabase storage and the database record should be removed; if either operation fails, an error should be reported.

**Validates: Requirements 3.7**

### Property 9: Category Cache Validity

*For any* category data access within 5 minutes of the last fetch, the system should use cached category data instead of making a new database query.

**Validates: Requirements 7.5, 9.4**

### Property 10: Error Message Localization

*For any* error that occurs in the admin dashboard, the error message displayed to the user should be in Mongolian language.

**Validates: Requirements 6.1, 6.2, 6.4**

### Property 11: Success Message Auto-Clear

*For any* success message displayed, the message should automatically clear after 3 seconds unless a new message replaces it.

**Validates: Requirements 6.6**

### Property 12: Concurrent Data Loading

*For any* initial dashboard load, documents, blogs, banners, and categories should be fetched concurrently (not sequentially) to minimize total loading time.

**Validates: Requirements 9.3**

### Property 13: Sort Order Persistence

*For any* document sort order change, the new sort order should be maintained when switching tabs and returning to the documents tab during the same session.

**Validates: Requirements 10.4**

## Error Handling

### Error Categories and Handling Strategy

#### 1. Network Errors
**Detection:** Error message contains 'network', 'connection', or 'fetch'
**User Message:** "Сүлжээний холболтод алдаа гарлаа. Интернет холболтоо шалгаад дахин оролдоно уу."
**Action:** Display error, allow retry

#### 2. Authentication Errors
**Detection:** Error message contains 'invalid_token', 'expired', or 'unauthorized'
**User Message:** "Нэвтрэх хугацаа дууссан байна. Дахин нэвтэрнэ үү."
**Action:** Redirect to login page after 3 seconds

#### 3. Permission Errors
**Detection:** Error message contains 'permission', 'access denied', or 'forbidden'
**User Message:** "[Context] хандах эрх байхгүй байна."
**Action:** Display error, redirect to home page

#### 4. Database Errors
**Detection:** Error codes 'PGRST116', '42P01'
**User Message:** "[Context] хүснэгт олдсонгүй/байхгүй байна. Системийн админтай холбогдоно уу."
**Action:** Display error, log to console

#### 5. Storage Errors
**Detection:** Error message contains 'storage' or 'bucket'
**User Message:** "Файл хадгалах сангад алдаа гарлаа. Системийн админтай холбогдоно уу."
**Action:** Display error, rollback any partial operations

#### 6. Validation Errors
**Detection:** Error message contains 'validation' or 'invalid'
**User Message:** "Оруулсан мэдээлэл буруу байна. Дахин шалгана уу."
**Action:** Display error, highlight invalid fields

### Error Handling Functions

```javascript
function getErrorMessage(error, context = '') {
  // Analyzes error and returns appropriate Mongolian message
  // Handles all error categories above
}

function showErrorNotification(error, context, setFeedback) {
  // Displays error to user with proper formatting
  // Logs error to console for debugging
}

function showSuccessNotification(message, setFeedback, autoClearMs = 3000) {
  // Displays success message
  // Auto-clears after specified time
}
```

## Testing Strategy

### Unit Tests

Unit tests will verify specific examples and edge cases:

1. **File Validation Tests**
   - Test PDF file type acceptance
   - Test non-PDF file rejection
   - Test file size limits (under 50MB, over 50MB, exactly 50MB)
   - Test minimum file size (1KB threshold)
   - Test invalid file names

2. **Authentication Tests**
   - Test admin role verification
   - Test non-admin user rejection
   - Test unauthenticated user redirection
   - Test session expiry handling

3. **Category Selection Tests**
   - Test main category selection
   - Test subcategory visibility logic
   - Test sub-subcategory visibility logic
   - Test category dropdown disabled states

4. **Error Message Tests**
   - Test each error category produces correct Mongolian message
   - Test error context is included in messages
   - Test success message auto-clear timing

5. **Data Fetching Tests**
   - Test concurrent data loading
   - Test individual fetch function error handling
   - Test empty data state handling

### Property-Based Tests

Property tests will verify universal properties across all inputs:

1. **Property Test: Admin Access Control**
   - Generate random user profiles with various roles
   - Verify only 'admin' role can access dashboard
   - **Validates: Requirements 2.2, 2.3**

2. **Property Test: File Type Validation**
   - Generate random file objects with various MIME types
   - Verify only 'application/pdf' is accepted
   - **Validates: Requirements 3.1**

3. **Property Test: File Size Validation**
   - Generate random file sizes from 0 to 100MB
   - Verify files over 50MB are rejected
   - Verify files under 1KB are rejected
   - **Validates: Requirements 3.2**

4. **Property Test: Category Hierarchy**
   - Generate random category trees
   - Verify subcategories only show when parent has children
   - Verify category selection clears child selections
   - **Validates: Requirements 7.2, 7.3**

5. **Property Test: Error Message Localization**
   - Generate various error types
   - Verify all error messages are in Mongolian
   - Verify no English error messages leak through
   - **Validates: Requirements 6.1, 6.2, 6.4**

6. **Property Test: Cache Validity**
   - Generate random timestamps
   - Verify cache is used within 5 minutes
   - Verify cache is invalidated after 5 minutes
   - **Validates: Requirements 7.5, 9.4**

### Integration Tests

1. **Document Upload Flow**
   - Test complete upload: file selection → category selection → upload → storage → database
   - Test upload failure scenarios and rollback
   - Test concurrent uploads

2. **Document Edit Flow**
   - Test document metadata update
   - Test file replacement
   - Test edit permission validation

3. **Document Delete Flow**
   - Test file and database record deletion
   - Test deletion failure handling
   - Test orphaned file cleanup

4. **Authentication Flow**
   - Test login → dashboard access → session expiry → re-login
   - Test role change during session
   - Test concurrent session handling

### Testing Framework

- **Unit Tests:** Jest with React Testing Library
- **Property Tests:** fast-check (JavaScript property-based testing library)
- **Integration Tests:** Playwright or Cypress for end-to-end testing
- **Minimum Iterations:** 100 iterations per property test

### Test Configuration

Each property test must include a comment tag:
```javascript
// Feature: production-admin-dashboard, Property 1: Admin Access Control
```

## Implementation Notes

### AdminJS Removal Steps

1. Remove AdminJS npm packages from package.json:
   - `adminjs`
   - `@adminjs/express`
   - `@adminjs/prisma`

2. Remove AdminJS server files:
   - `admin-server-simple.mjs`
   - `admin-server-supabase-api.js`
   - `admin-server-supabase-api.mjs`
   - `admin-server-supabase.js`
   - `admin-server.js`
   - `setup-adminjs.js`

3. Remove AdminJS scripts from package.json:
   - `admin` script
   - `dev:admin` script

4. Remove AdminJS component:
   - `src/sections/admin/adminjs-redirect-view.js`

5. Update admin page to use Supabase dashboard:
   - Modify `src/app/admin/page.js`

6. Remove AdminJS environment variables:
   - `ADMIN_PORT`
   - `ADMIN_URL`
   - `ADMIN_COOKIE_SECRET`
   - `ADMIN_SESSION_SECRET`
   - `NEXT_PUBLIC_ADMIN_URL`

7. Remove AdminJS documentation:
   - `ADMINJS_SETUP.md`

### Performance Optimizations

1. **Category Caching**
   - Cache duration: 5 minutes
   - Cache invalidation on category CRUD operations
   - Use useRef for cache storage to persist across re-renders

2. **Memoization**
   - Memoize category lookup maps with useMemo
   - Memoize category tree building with useMemo
   - Memoize dropdown components with React.memo
   - Memoize event handlers with useCallback

3. **Concurrent Loading**
   - Use Promise.allSettled for parallel data fetching
   - Handle partial failures gracefully
   - Show loading indicators per section

4. **Component Optimization**
   - Split large components into smaller memoized components
   - Use proper React keys for list rendering
   - Avoid inline function definitions in render

### Production Deployment Checklist

1. **Environment Variables**
   - Set production Supabase URL
   - Set production Supabase anon key
   - Configure session timeout
   - Set CORS allowed origins

2. **Security**
   - Enable HTTPS
   - Configure CSP headers
   - Set secure cookie flags
   - Enable rate limiting on API routes

3. **Database**
   - Verify all tables exist
   - Verify RLS policies are configured
   - Create indexes for performance
   - Set up database backups

4. **Storage**
   - Configure storage buckets
   - Set up storage policies
   - Configure file size limits
   - Set up CDN if needed

5. **Monitoring**
   - Set up error tracking (Sentry, etc.)
   - Configure logging
   - Set up uptime monitoring
   - Configure performance monitoring

6. **Testing**
   - Run all unit tests
   - Run all property tests
   - Run integration tests
   - Perform manual UAT

### File Sanitization

The system uses a `sanitizeFilename` function to ensure safe file names:
- Removes path components
- Converts to lowercase
- Replaces special characters with dashes
- Removes leading/trailing dashes
- Collapses multiple dashes
- Ensures only alphanumeric, dots, underscores, and dashes remain
- Provides fallback for empty filenames

### Supabase Configuration

**Required Tables:**
- `documents` - Document metadata
- `blogs` - Blog posts
- `banners` - Banner images
- `categories` - Hierarchical categories
- `user_profiles` - User roles and permissions

**Required Storage Buckets:**
- `documents` - PDF file storage
- `banners` - Banner image storage

**Required RLS Policies:**
- Admin users can read/write all tables
- Public users can read published content only
- Storage policies match table policies

## Deployment Architecture

### Production Environment

```
┌─────────────────────────────────────────────────────────────┐
│                    Vercel / Netlify                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Next.js Application (HTTPS)                   │  │
│  │  - Static pages                                       │  │
│  │  - API routes                                         │  │
│  │  - Admin dashboard                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Cloud                           │
│  - PostgreSQL Database                                      │
│  - Authentication Service                                   │
│  - Storage Service                                          │
│  - Real-time subscriptions (if needed)                      │
└─────────────────────────────────────────────────────────────┘
```

### Deployment Steps

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Deploy to Hosting Platform**
   - Configure environment variables
   - Set up custom domain
   - Enable HTTPS
   - Configure redirects

3. **Verify Deployment**
   - Test admin login
   - Test document upload
   - Test all CRUD operations
   - Verify error handling

4. **Post-Deployment**
   - Monitor error logs
   - Check performance metrics
   - Verify backup systems
   - Document admin procedures

## Security Considerations

### Authentication Security
- Use Supabase's built-in JWT authentication
- Implement proper session timeout
- Use secure, httpOnly cookies
- Implement CSRF protection

### Authorization Security
- Verify admin role on every request
- Use Row Level Security (RLS) in Supabase
- Implement proper API route protection
- Log all admin actions for audit trail

### File Upload Security
- Validate file types on client and server
- Scan uploaded files for malware (if possible)
- Limit file sizes
- Sanitize file names
- Store files in isolated storage bucket

### Data Security
- Use parameterized queries (Supabase handles this)
- Sanitize user inputs
- Implement rate limiting
- Use HTTPS for all communications
- Encrypt sensitive data at rest

## Maintenance and Monitoring

### Logging Strategy
- Log all admin actions (create, update, delete)
- Log authentication events
- Log errors with context
- Use structured logging format

### Monitoring Metrics
- Dashboard load time
- File upload success rate
- Authentication failure rate
- API response times
- Error rates by type

### Backup Strategy
- Daily database backups
- Weekly storage backups
- Backup retention: 30 days
- Test restore procedures monthly

### Update Procedures
- Test updates in staging environment
- Deploy during low-traffic periods
- Have rollback plan ready
- Monitor closely after deployment
- Document all changes
