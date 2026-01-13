const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local');
  process.exit(1);
}

// Use service role key for admin operations, fallback to anon key
const supabase = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

// Configuration
const TEMPLATE_FILE = path.join(__dirname, 'pdfsToImportTemplate.json');
const STORAGE_BUCKET = 'documents';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  console.error(`${colors.red}❌ ${message}${colors.reset}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function logInfo(message) {
  console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

// Sanitize filename for Supabase storage (remove non-ASCII characters)
function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace non-alphanumeric chars with underscore
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
}

async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('documents').select('count').limit(1);
    if (error) throw error;
    logSuccess('Supabase connection successful');
    return true;
  } catch (error) {
    logError(`Failed to connect to Supabase: ${error.message}`);
    return false;
  }
}

async function uploadFileToStorage(filePath, fileName) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    
    // Sanitize the filename
    const sanitizedFileName = sanitizeFilename(fileName);
    
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(sanitizedFileName, fileBuffer, {
        contentType: 'application/pdf',
        upsert: true // Overwrite if exists
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(sanitizedFileName);

    return urlData.publicUrl;
  } catch (error) {
    throw new Error(`Storage upload failed: ${error.message}`);
  }
}

async function insertDocumentMetadata(displayName, pagePath, fileUrl, fileName) {
  try {
    const { data, error } = await supabase
      .from('documents')
      .insert({
        title: displayName,
        filename: fileName,
        file_url: fileUrl,
        page_path: pagePath,
        is_active: true,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Database insert failed: ${error.message}`);
  }
}

async function processPdfFile(pdfData, index, total) {
  const { filePath, displayName, pagePath } = pdfData;
  
  logInfo(`Processing ${index + 1}/${total}: ${displayName}`);
  
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Generate unique filename with sanitization
    const originalFilename = path.basename(filePath);
    const sanitizedOriginalName = sanitizeFilename(originalFilename);
    const fileName = `${Date.now()}-${sanitizedOriginalName}`;
    
    // Upload to Supabase storage
    logInfo(`Uploading to storage: ${fileName}`);
    const fileUrl = await uploadFileToStorage(filePath, fileName);
    
    // Insert metadata into database
    logInfo(`Inserting metadata into database`);
    const document = await insertDocumentMetadata(displayName, pagePath, fileUrl, fileName);
    
    logSuccess(`Successfully imported: ${displayName}`);
    return { success: true, document };
    
  } catch (error) {
    logError(`Failed to import ${displayName}: ${error.message}`);
    return { success: false, error: error.message, displayName };
  }
}

async function main() {
  log('🚀 Starting PDF Bulk Import Process', 'bright');
  log('=====================================', 'bright');
  
  // Check if using service role key
  if (supabaseServiceKey) {
    logInfo('Using Supabase service role key for admin operations');
  } else {
    logWarning('No service role key found - using anon key (may cause RLS issues)');
    logInfo('Consider adding SUPABASE_SERVICE_ROLE_KEY to .env.local for admin operations');
  }
  
  // Check Supabase connection
  logInfo('Checking Supabase connection...');
  const isConnected = await checkSupabaseConnection();
  if (!isConnected) {
    process.exit(1);
  }
  
  // Read template file
  logInfo('Reading import template...');
  if (!fs.existsSync(TEMPLATE_FILE)) {
    logError(`Template file not found: ${TEMPLATE_FILE}`);
    process.exit(1);
  }
  
  let pdfsToImport;
  try {
    const templateContent = fs.readFileSync(TEMPLATE_FILE, 'utf8');
    pdfsToImport = JSON.parse(templateContent);
  } catch (error) {
    logError(`Failed to read template file: ${error.message}`);
    process.exit(1);
  }
  
  if (!Array.isArray(pdfsToImport) || pdfsToImport.length === 0) {
    logError('Template file is empty or invalid');
    process.exit(1);
  }
  
  logSuccess(`Found ${pdfsToImport.length} PDFs to import`);
  
  // Validate template data
  logInfo('Validating template data...');
  const invalidEntries = pdfsToImport.filter(entry => 
    !entry.displayName || !entry.pagePath || !entry.filePath
  );
  
  if (invalidEntries.length > 0) {
    logWarning(`Found ${invalidEntries.length} entries with missing data:`);
    invalidEntries.forEach(entry => {
      logWarning(`  - ${entry.filePath || 'No file path'}`);
    });
    
    const response = await new Promise(resolve => {
      process.stdout.write('Continue anyway? (y/N): ');
      process.stdin.once('data', data => {
        resolve(data.toString().trim().toLowerCase());
      });
    });
    
    if (response !== 'y' && response !== 'yes') {
      logInfo('Import cancelled by user');
      process.exit(0);
    }
  }
  
  // Process PDFs
  logInfo('Starting PDF import process...');
  const results = {
    successful: [],
    failed: []
  };
  
  for (let i = 0; i < pdfsToImport.length; i++) {
    const result = await processPdfFile(pdfsToImport[i], i, pdfsToImport.length);
    
    if (result.success) {
      results.successful.push(result.document);
    } else {
      results.failed.push(result);
    }
    
    // Small delay to avoid overwhelming the API
    if (i < pdfsToImport.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // Summary
  log('', 'bright');
  log('📊 Import Summary', 'bright');
  log('=================', 'bright');
  logSuccess(`Successfully imported: ${results.successful.length} PDFs`);
  
  if (results.failed.length > 0) {
    logError(`Failed to import: ${results.failed.length} PDFs`);
    logInfo('Failed imports:');
    results.failed.forEach(failure => {
      logError(`  - ${failure.displayName}: ${failure.error}`);
    });
  }
  
  // Save results to file
  const resultsFile = path.join(__dirname, 'import-results.json');
  const resultsData = {
    timestamp: new Date().toISOString(),
    total: pdfsToImport.length,
    successful: results.successful.length,
    failed: results.failed.length,
    successful_imports: results.successful,
    failed_imports: results.failed
  };
  
  fs.writeFileSync(resultsFile, JSON.stringify(resultsData, null, 2));
  logInfo(`Detailed results saved to: ${resultsFile}`);
  
  if (results.successful.length > 0) {
    logSuccess('🎉 Bulk import completed successfully!');
    logInfo('Your PDFs are now available on the website.');
  } else {
    logError('❌ No PDFs were successfully imported.');
  }
}

// Handle process termination
process.on('SIGINT', () => {
  logWarning('\nImport process interrupted by user');
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  logError(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

// Run the import
main().catch(error => {
  logError(`Fatal error: ${error.message}`);
  process.exit(1);
}); 