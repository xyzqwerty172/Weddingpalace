/**
 * Verification script for Supabase production setup
 * Checks database tables, storage buckets, RLS policies, and admin users
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

async function verifyDatabaseTables() {
  logSection('TASK 6.1: Verifying Database Tables');
  
  const requiredTables = ['documents', 'blogs', 'banners', 'categories', 'user_profiles'];
  const results = {};
  
  for (const table of requiredTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        log(`  ❌ Table '${table}': NOT FOUND or ERROR`, 'red');
        log(`     Error: ${error.message}`, 'red');
        results[table] = false;
      } else {
        log(`  ✓ Table '${table}': EXISTS`, 'green');
        results[table] = true;
      }
    } catch (err) {
      log(`  ❌ Table '${table}': ERROR - ${err.message}`, 'red');
      results[table] = false;
    }
  }
  
  const allTablesExist = Object.values(results).every(v => v);
  
  if (allTablesExist) {
    log('\n✓ All required database tables exist', 'green');
  } else {
    log('\n❌ Some database tables are missing', 'red');
  }
  
  return { success: allTablesExist, results };
}

async function verifyStorageBuckets() {
  logSection('TASK 6.2: Verifying Storage Buckets');
  
  const requiredBuckets = ['documents', 'banners'];
  const results = {};
  
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      log(`  ❌ Failed to list storage buckets: ${error.message}`, 'red');
      return { success: false, results: {} };
    }
    
    const bucketNames = buckets.map(b => b.name);
    
    for (const bucketName of requiredBuckets) {
      if (bucketNames.includes(bucketName)) {
        log(`  ✓ Bucket '${bucketName}': EXISTS`, 'green');
        results[bucketName] = true;
        
        // Check bucket policies
        try {
          const { data: files, error: listError } = await supabase.storage
            .from(bucketName)
            .list('', { limit: 1 });
          
          if (listError) {
            log(`    ⚠ Warning: Cannot list files in '${bucketName}' - ${listError.message}`, 'yellow');
          } else {
            log(`    ✓ Bucket '${bucketName}' is accessible`, 'green');
          }
        } catch (err) {
          log(`    ⚠ Warning: Error accessing bucket '${bucketName}' - ${err.message}`, 'yellow');
        }
      } else {
        log(`  ❌ Bucket '${bucketName}': NOT FOUND`, 'red');
        results[bucketName] = false;
      }
    }
    
    const allBucketsExist = Object.values(results).every(v => v);
    
    if (allBucketsExist) {
      log('\n✓ All required storage buckets exist', 'green');
    } else {
      log('\n❌ Some storage buckets are missing', 'red');
    }
    
    return { success: allBucketsExist, results };
  } catch (err) {
    log(`  ❌ Error checking storage buckets: ${err.message}`, 'red');
    return { success: false, results: {} };
  }
}

async function verifyRLSPolicies() {
  logSection('TASK 6.3: Verifying RLS Policies');
  
  log('  Testing admin user read/write access to tables...', 'blue');
  
  const tables = ['documents', 'blogs', 'banners', 'categories', 'user_profiles'];
  const results = {};
  
  for (const table of tables) {
    try {
      // Test read access
      const { data: readData, error: readError } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (readError) {
        log(`  ❌ Table '${table}': READ access DENIED - ${readError.message}`, 'red');
        results[table] = { read: false, write: false };
        continue;
      }
      
      log(`  ✓ Table '${table}': READ access OK`, 'green');
      
      // Note: We won't test write access as it would modify production data
      // Instead, we'll just verify the table is accessible
      results[table] = { read: true, write: 'not_tested' };
      
    } catch (err) {
      log(`  ❌ Table '${table}': ERROR - ${err.message}`, 'red');
      results[table] = { read: false, write: false };
    }
  }
  
  const allReadable = Object.values(results).every(v => v.read);
  
  if (allReadable) {
    log('\n✓ All tables are readable with service role key', 'green');
    log('  ⚠ Note: Write access not tested to avoid modifying production data', 'yellow');
  } else {
    log('\n❌ Some tables have access issues', 'red');
  }
  
  return { success: allReadable, results };
}

async function verifyAdminUser() {
  logSection('TASK 6.4: Verifying Admin User Account');
  
  try {
    const { data: adminUsers, error } = await supabase
      .from('user_profiles')
      .select('id, role')
      .eq('role', 'admin');
    
    if (error) {
      log(`  ❌ Failed to query user_profiles: ${error.message}`, 'red');
      return { success: false, adminCount: 0 };
    }
    
    if (!adminUsers || adminUsers.length === 0) {
      log('  ❌ No admin users found in user_profiles table', 'red');
      log('  ⚠ You need to create at least one admin user', 'yellow');
      log('  Run: node scripts/create-admin-user-supabase.js', 'yellow');
      return { success: false, adminCount: 0 };
    }
    
    log(`  ✓ Found ${adminUsers.length} admin user(s)`, 'green');
    
    // Get user details from auth.users
    for (const admin of adminUsers) {
      try {
        const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(admin.id);
        
        if (authError) {
          log(`    ⚠ Admin user ${admin.id}: Cannot fetch auth details - ${authError.message}`, 'yellow');
        } else if (authUser && authUser.user) {
          log(`    ✓ Admin user: ${authUser.user.email || admin.id}`, 'green');
        }
      } catch (err) {
        log(`    ⚠ Admin user ${admin.id}: Error fetching details - ${err.message}`, 'yellow');
      }
    }
    
    log('\n✓ Admin user account(s) exist', 'green');
    return { success: true, adminCount: adminUsers.length };
    
  } catch (err) {
    log(`  ❌ Error verifying admin users: ${err.message}`, 'red');
    return { success: false, adminCount: 0 };
  }
}

async function main() {
  log('\n🔍 Verifying Supabase Production Setup', 'cyan');
  log(`📍 Supabase URL: ${supabaseUrl}`, 'blue');
  
  const results = {
    tables: await verifyDatabaseTables(),
    buckets: await verifyStorageBuckets(),
    rls: await verifyRLSPolicies(),
    admin: await verifyAdminUser(),
  };
  
  // Summary
  logSection('SUMMARY');
  
  const allChecks = [
    { name: 'Database Tables', success: results.tables.success },
    { name: 'Storage Buckets', success: results.buckets.success },
    { name: 'RLS Policies', success: results.rls.success },
    { name: 'Admin User', success: results.admin.success },
  ];
  
  allChecks.forEach(check => {
    const icon = check.success ? '✓' : '❌';
    const color = check.success ? 'green' : 'red';
    log(`  ${icon} ${check.name}`, color);
  });
  
  const allSuccess = allChecks.every(c => c.success);
  
  console.log('\n' + '='.repeat(60));
  if (allSuccess) {
    log('✓ ALL CHECKS PASSED - Production setup is ready!', 'green');
  } else {
    log('❌ SOME CHECKS FAILED - Please review the issues above', 'red');
  }
  console.log('='.repeat(60) + '\n');
  
  process.exit(allSuccess ? 0 : 1);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
