const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

function log(message, color = 'reset') {
  const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m'
  };
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

function main() {
  log('🔍 Supabase Keys Checker', 'bright');
  log('========================', 'bright');
  
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  logInfo(`Project URL: ${url || 'Not found'}`);
  
  if (anonKey) {
    logSuccess('✅ Anon key found');
    const anonPayload = decodeJWT(anonKey);
    if (anonPayload) {
      logInfo(`   Role: ${anonPayload.role || 'unknown'}`);
      logInfo(`   Issuer: ${anonPayload.iss || 'unknown'}`);
    }
  } else {
    logError('❌ Anon key not found');
  }
  
  if (serviceKey) {
    logSuccess('✅ Service role key found');
    const servicePayload = decodeJWT(serviceKey);
    if (servicePayload) {
      logInfo(`   Role: ${servicePayload.role || 'unknown'}`);
      logInfo(`   Issuer: ${servicePayload.iss || 'unknown'}`);
    }
  } else {
    logWarning('⚠️  Service role key not found');
    logInfo('You need to add SUPABASE_SERVICE_ROLE_KEY to your .env.local file');
  }
  
  log('\n📋 Next Steps:', 'bright');
  if (!serviceKey) {
    logInfo('1. Go to your Supabase dashboard');
    logInfo('2. Navigate to Settings → API');
    logInfo('3. Copy the "service_role" key (not the anon key)');
    logInfo('4. Run: node scripts/setup-service-key.js');
  } else {
    logSuccess('You have both keys! You can now run the bulk import.');
    logInfo('Run: node scripts/bulk-import-pdfs.js');
  }
}

main(); 