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

function logWarning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

function logInfo(message) {
  console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
}

async function removeUnwantedDocuments() {
  log('🗑️  Removing Unwanted Documents from /transparency/hr', 'bright');
  log('====================================================', 'bright');
  
  // Documents to remove from /transparency/hr
  const unwantedTitles = [
    'Ургудуул гомдлын тайлан',
    'Судалгаа'
  ];

  try {
    // First, let's see what documents are currently on /transparency/hr
    logInfo('Checking current documents on /transparency/hr...');
    
    const { data: currentDocs, error: fetchError } = await supabase
      .from('documents')
      .select('*')
      .eq('page_path', '/transparency/hr')
      .eq('is_active', true);

    if (fetchError) {
      throw new Error(`Failed to fetch documents: ${fetchError.message}`);
    }

    logInfo(`Found ${currentDocs.length} documents on /transparency/hr:`);
    currentDocs.forEach((doc, index) => {
      logInfo(`${index + 1}. ${doc.title}`);
    });

    // Find the unwanted documents
    const documentsToRemove = currentDocs.filter(doc => 
      unwantedTitles.includes(doc.title)
    );

    if (documentsToRemove.length === 0) {
      logWarning('No unwanted documents found to remove.');
      return;
    }

    logInfo(`Found ${documentsToRemove.length} unwanted document(s) to remove:`);
    documentsToRemove.forEach((doc, index) => {
      logWarning(`${index + 1}. ${doc.title} (ID: ${doc.id})`);
    });

    // Remove the unwanted documents by setting is_active to false
    for (const doc of documentsToRemove) {
      logInfo(`Removing "${doc.title}"...`);
      
      const { error: updateError } = await supabase
        .from('documents')
        .update({ is_active: false })
        .eq('id', doc.id);

      if (updateError) {
        logError(`Failed to remove "${doc.title}": ${updateError.message}`);
      } else {
        logSuccess(`Successfully removed "${doc.title}"`);
      }
    }

    // Verify the changes
    logInfo('Verifying changes...');
    
    const { data: remainingDocs, error: verifyError } = await supabase
      .from('documents')
      .select('*')
      .eq('page_path', '/transparency/hr')
      .eq('is_active', true);

    if (verifyError) {
      throw new Error(`Failed to verify changes: ${verifyError.message}`);
    }

    logSuccess(`✅ /transparency/hr now has ${remainingDocs.length} document(s):`);
    remainingDocs.forEach((doc, index) => {
      logInfo(`${index + 1}. ${doc.title}`);
    });

    log('', 'bright');
    log('🎯 Summary', 'bright');
    log('==========', 'bright');
    logSuccess(`Removed ${documentsToRemove.length} unwanted document(s) from /transparency/hr`);
    logInfo('The documents are still in the database but marked as inactive');
    logInfo('They will no longer appear on the frontend');

  } catch (error) {
    logError(`Fatal error: ${error.message}`);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  logWarning('\nProcess interrupted by user');
  process.exit(0);
});

// Run the script
removeUnwantedDocuments().catch(error => {
  logError(`Fatal error: ${error.message}`);
  process.exit(1);
}); 