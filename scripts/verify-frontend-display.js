const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

async function testFileAccess(fileUrl, title) {
  try {
    const response = await fetch(fileUrl, { method: 'HEAD' });
    if (response.ok) {
      return { accessible: true, status: response.status };
    } else {
      return { accessible: false, status: response.status };
    }
  } catch (error) {
    return { accessible: false, error: error.message };
  }
}

async function verifyFrontendDisplay() {
  log('🔍 Verifying Frontend Display', 'bright');
  log('==============================', 'bright');
  
  try {
    // Fetch all imported documents
    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      logError(`Failed to fetch documents: ${error.message}`);
      return;
    }

    if (!documents || documents.length === 0) {
      logError('No documents found in database');
      return;
    }

    logSuccess(`Found ${documents.length} documents in database`);

    // Group documents by page path
    const documentsByPage = {};
    documents.forEach(doc => {
      if (!documentsByPage[doc.page_path]) {
        documentsByPage[doc.page_path] = [];
      }
      documentsByPage[doc.page_path].push(doc);
    });

    // Display page distribution
    log('', 'bright');
    log('📄 Page Distribution', 'bright');
    log('====================', 'bright');
    
    Object.keys(documentsByPage).forEach(pagePath => {
      const count = documentsByPage[pagePath].length;
      logInfo(`${pagePath}: ${count} document${count > 1 ? 's' : ''}`);
    });

    // Test file accessibility
    log('', 'bright');
    log('🔗 Testing File Accessibility', 'bright');
    log('==============================', 'bright');

    const accessibilityResults = {
      accessible: 0,
      inaccessible: 0,
      errors: []
    };

    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      logInfo(`Testing ${i + 1}/${documents.length}: ${doc.title}`);
      
      const result = await testFileAccess(doc.file_url, doc.title);
      
      if (result.accessible) {
        logSuccess(`✅ ${doc.title} - Accessible (${result.status})`);
        accessibilityResults.accessible++;
      } else {
        logError(`❌ ${doc.title} - Inaccessible (${result.status || result.error})`);
        accessibilityResults.inaccessible++;
        accessibilityResults.errors.push({
          title: doc.title,
          url: doc.file_url,
          error: result.error || `HTTP ${result.status}`
        });
      }

      // Small delay to avoid overwhelming the server
      if (i < documents.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Summary
    log('', 'bright');
    log('📊 Accessibility Summary', 'bright');
    log('========================', 'bright');
    logSuccess(`Accessible files: ${accessibilityResults.accessible}`);
    
    if (accessibilityResults.inaccessible > 0) {
      logError(`Inaccessible files: ${accessibilityResults.inaccessible}`);
      logInfo('Inaccessible files:');
      accessibilityResults.errors.forEach(error => {
        logError(`  - ${error.title}: ${error.error}`);
      });
    }

    // Frontend URL examples
    log('', 'bright');
    log('🌐 Frontend URLs to Test', 'bright');
    log('========================', 'bright');
    
    const testPages = [
      '/transparency/company',
      '/transparency/hr', 
      '/transparency/law',
      '/about/activity',
      '/about/structure'
    ];

    testPages.forEach(pagePath => {
      if (documentsByPage[pagePath]) {
        logInfo(`${pagePath} - ${documentsByPage[pagePath].length} documents`);
      }
    });

    // Recommendations
    log('', 'bright');
    log('💡 Next Steps', 'bright');
    log('==============', 'bright');
    
    if (accessibilityResults.inaccessible === 0) {
      logSuccess('All files are accessible! Frontend should work perfectly.');
      logInfo('Test these pages in your browser:');
      testPages.forEach(pagePath => {
        if (documentsByPage[pagePath]) {
          logInfo(`  • http://localhost:3000${pagePath}`);
        }
      });
    } else {
      logWarning('Some files are not accessible. Check storage permissions.');
      logInfo('• Verify Supabase storage bucket is public');
      logInfo('• Check RLS policies for storage access');
      logInfo('• Ensure file URLs are correct');
    }

    // Sample document data for frontend testing
    log('', 'bright');
    log('📋 Sample Document Data', 'bright');
    log('=======================', 'bright');
    
    if (documents.length > 0) {
      const sampleDoc = documents[0];
      logInfo('Sample document structure:');
      console.log(JSON.stringify({
        id: sampleDoc.id,
        title: sampleDoc.title,
        page_path: sampleDoc.page_path,
        file_url: sampleDoc.file_url,
        is_active: sampleDoc.is_active
      }, null, 2));
    }

  } catch (error) {
    logError(`Verification failed: ${error.message}`);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  logWarning('\nVerification process interrupted by user');
  process.exit(0);
});

// Run verification
verifyFrontendDisplay().catch(error => {
  logError(`Fatal error: ${error.message}`);
  process.exit(1);
}); 