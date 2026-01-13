const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envFile = path.join(__dirname, '..', '.env.local');

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

async function setupServiceKey() {
  log('🔑 Supabase Service Role Key Setup', 'bright');
  log('====================================', 'bright');
  
  logInfo('This script will help you add the Supabase service role key to your environment file.');
  logInfo('The service role key is needed for admin operations like bulk PDF imports.');
  
  logWarning('⚠️  SECURITY WARNING: The service role key bypasses all RLS policies.');
  logWarning('Keep it secure and never expose it in client-side code.');
  
  // Check if service key already exists
  if (fs.existsSync(envFile)) {
    const envContent = fs.readFileSync(envFile, 'utf8');
    if (envContent.includes('SUPABASE_SERVICE_ROLE_KEY=')) {
      logSuccess('Service role key already exists in .env.local');
      logInfo('If you need to update it, please edit the file manually.');
      rl.close();
      return;
    }
  }
  
  logInfo('\nTo get your service role key:');
  logInfo('1. Go to your Supabase project dashboard');
  logInfo('2. Navigate to Settings → API');
  logInfo('3. Copy the "service_role" key (not the anon key)');
  
  const serviceKey = await new Promise((resolve) => {
    rl.question('\nEnter your Supabase service role key: ', (answer) => {
      resolve(answer.trim());
    });
  });
  
  if (!serviceKey) {
    logError('No service key provided. Setup cancelled.');
    rl.close();
    return;
  }
  
  if (!serviceKey.startsWith('eyJ')) {
    logWarning('The service key should start with "eyJ". Please verify you copied the correct key.');
    const confirm = await new Promise((resolve) => {
      rl.question('Continue anyway? (y/N): ', (answer) => {
        resolve(answer.trim().toLowerCase());
      });
    });
    
    if (confirm !== 'y' && confirm !== 'yes') {
      logInfo('Setup cancelled.');
      rl.close();
      return;
    }
  }
  
  // Read existing env file
  let envContent = '';
  if (fs.existsSync(envFile)) {
    envContent = fs.readFileSync(envFile, 'utf8');
  }
  
  // Add service key
  const newEnvContent = envContent + `\nSUPABASE_SERVICE_ROLE_KEY=${serviceKey}\n`;
  
  try {
    fs.writeFileSync(envFile, newEnvContent);
    logSuccess('Service role key added to .env.local successfully!');
    logInfo('You can now run the bulk import script.');
  } catch (error) {
    logError(`Failed to write to .env.local: ${error.message}`);
  }
  
  rl.close();
}

setupServiceKey().catch(error => {
  logError(`Setup failed: ${error.message}`);
  rl.close();
}); 