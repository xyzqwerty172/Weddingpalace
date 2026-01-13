const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// Configuration
const TEMPLATE_FILE = path.join(__dirname, 'pdfsToImportTemplate.json');

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

async function validateTemplate() {
  log('🔍 Validating PDF Import Template', 'bright');
  log('==================================', 'bright');
  
  // Read template file
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
  
  logSuccess(`Found ${pdfsToImport.length} PDFs in template`);
  
  // Validation results
  const results = {
    valid: [],
    missingFiles: [],
    invalidPaths: [],
    missingFields: []
  };
  
  // Validate each entry
  for (let i = 0; i < pdfsToImport.length; i++) {
    const entry = pdfsToImport[i];
    const entryNumber = i + 1;
    
    logInfo(`Validating ${entryNumber}/${pdfsToImport.length}: ${entry.displayName || 'Unknown'}`);
    
    // Check for required fields
    if (!entry.displayName || !entry.pagePath || !entry.filePath) {
      results.missingFields.push({
        index: i,
        entry,
        missing: []
      });
      
      if (!entry.displayName) results.missingFields[results.missingFields.length - 1].missing.push('displayName');
      if (!entry.pagePath) results.missingFields[results.missingFields.length - 1].missing.push('pagePath');
      if (!entry.filePath) results.missingFields[results.missingFields.length - 1].missing.push('filePath');
      
      continue;
    }
    
    // Check if file exists
    if (!fs.existsSync(entry.filePath)) {
      results.missingFiles.push({
        index: i,
        entry,
        filePath: entry.filePath
      });
      continue;
    }
    
    // Check if file is a PDF
    const fileExtension = path.extname(entry.filePath).toLowerCase();
    if (fileExtension !== '.pdf') {
      results.invalidPaths.push({
        index: i,
        entry,
        reason: `Not a PDF file (extension: ${fileExtension})`
      });
      continue;
    }
    
    // Check file size
    const stats = fs.statSync(entry.filePath);
    const fileSizeMB = stats.size / (1024 * 1024);
    
    if (fileSizeMB > 50) {
      logWarning(`Large file detected: ${entry.displayName} (${fileSizeMB.toFixed(2)} MB)`);
    }
    
    // Validate page path format
    if (!entry.pagePath.startsWith('/')) {
      results.invalidPaths.push({
        index: i,
        entry,
        reason: 'Page path must start with /'
      });
      continue;
    }
    
    if (entry.pagePath.endsWith('/')) {
      results.invalidPaths.push({
        index: i,
        entry,
        reason: 'Page path should not end with /'
      });
      continue;
    }
    
    // All validations passed
    results.valid.push({
      index: i,
      entry,
      fileSize: fileSizeMB
    });
  }
  
  // Summary
  log('', 'bright');
  log('📊 Validation Summary', 'bright');
  log('====================', 'bright');
  logSuccess(`Valid entries: ${results.valid.length}`);
  
  if (results.missingFiles.length > 0) {
    logError(`Missing files: ${results.missingFiles.length}`);
    logInfo('Missing files:');
    results.missingFiles.forEach(item => {
      logError(`  - ${item.entry.displayName}: ${item.filePath}`);
    });
  }
  
  if (results.invalidPaths.length > 0) {
    logError(`Invalid paths: ${results.invalidPaths.length}`);
    logInfo('Invalid paths:');
    results.invalidPaths.forEach(item => {
      logError(`  - ${item.entry.displayName}: ${item.reason}`);
    });
  }
  
  if (results.missingFields.length > 0) {
    logError(`Missing fields: ${results.missingFields.length}`);
    logInfo('Missing fields:');
    results.missingFields.forEach(item => {
      logError(`  - Entry ${item.index + 1}: Missing ${item.missing.join(', ')}`);
    });
  }
  
  // File size analysis
  if (results.valid.length > 0) {
    const totalSize = results.valid.reduce((sum, item) => sum + item.fileSize, 0);
    const avgSize = totalSize / results.valid.length;
    const maxSize = Math.max(...results.valid.map(item => item.fileSize));
    
    logInfo(`Total size: ${totalSize.toFixed(2)} MB`);
    logInfo(`Average size: ${avgSize.toFixed(2)} MB`);
    logInfo(`Largest file: ${maxSize.toFixed(2)} MB`);
  }
  
  // Recommendations
  log('', 'bright');
  log('💡 Recommendations', 'bright');
  log('==================', 'bright');
  
  if (results.valid.length === pdfsToImport.length) {
    logSuccess('All entries are valid! You can proceed with the bulk import.');
    logInfo('Run: node scripts/bulk-import-pdfs.js');
  } else {
    logWarning('Please fix the issues above before running the bulk import.');
    
    if (results.missingFiles.length > 0) {
      logInfo('• Check file paths and ensure all PDF files exist');
    }
    
    if (results.invalidPaths.length > 0) {
      logInfo('• Fix page path formatting (remove trailing slashes)');
    }
    
    if (results.missingFields.length > 0) {
      logInfo('• Add missing required fields to template entries');
    }
  }
  
  return results;
}

// Handle process termination
process.on('SIGINT', () => {
  logWarning('\nValidation process interrupted by user');
  process.exit(0);
});

// Run validation
validateTemplate().catch(error => {
  logError(`Fatal error: ${error.message}`);
  process.exit(1);
}); 