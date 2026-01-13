# PDF Import Scripts

This directory contains scripts for managing PDF document imports to Supabase.

## Files

- `bulk-list-pdfs.js` - Generates a template JSON file listing all PDFs in the documents directory
- `pdfsToImportTemplate.json` - Template file with PDF metadata (display names and page paths)
- `bulk-import-pdfs.js` - **Main import script** that uploads PDFs to Supabase and inserts metadata

## Usage

### 1. Generate Template (if needed)
```bash
node scripts/bulk-list-pdfs.js
```

### 2. Fill in Template
Edit `pdfsToImportTemplate.json` and add:
- `displayName`: Mongolian display name for the PDF
- `pagePath`: Frontend page path where the PDF should appear

### 3. Run Bulk Import
```bash
node scripts/bulk-import-pdfs.js
```

## Requirements

- Supabase project configured with `documents` storage bucket
- Environment variables set in `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (recommended for admin operations)
- PDF files in `public/assets/documents/pdf/` directory

## Getting the Service Role Key

For admin operations (bypassing RLS policies), you need the service role key:

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the **service_role** key (not the anon key)
4. Add it to your `.env.local` file:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

**⚠️ Security Note**: The service role key bypasses all RLS policies. Keep it secure and never expose it in client-side code.

## Features

- ✅ Validates Supabase connection
- ✅ Checks file existence before upload
- ✅ Generates unique filenames to avoid conflicts
- ✅ Sanitizes filenames (removes non-ASCII characters)
- ✅ Uploads to Supabase storage with proper content type
- ✅ Inserts metadata into database
- ✅ Provides detailed progress feedback
- ✅ Handles errors gracefully
- ✅ Generates import summary report
- ✅ Saves detailed results to `import-results.json`

## Output

After successful import:
- PDFs are available in Supabase storage bucket `documents`
- Metadata is stored in the `documents` table
- PDFs appear on the website using the `DynamicDocuments` component
- Detailed results saved to `import-results.json`

## Troubleshooting

### RLS Policy Violations
If you get "new row violates row-level security policy" errors:

1. **Add service role key** to `.env.local` (recommended)
2. **Or** temporarily disable RLS on the storage bucket:
   ```sql
   ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
   ```
   (Remember to re-enable after import)

### Invalid Key Errors
If you get "Invalid key" errors:
- The script now automatically sanitizes filenames
- Non-ASCII characters are replaced with underscores

### Missing Environment Variables
- Check `.env.local` file exists and has correct values
- Restart terminal after adding new environment variables

### File Not Found
- Verify PDF paths in template are correct
- Check that files exist in `public/assets/documents/pdf/`

### Upload Failed
- Verify storage bucket `documents` exists
- Check bucket permissions and RLS policies
- Ensure you have sufficient storage quota 