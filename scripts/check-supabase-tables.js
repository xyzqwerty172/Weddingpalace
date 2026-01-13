const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTables() {
  try {
    console.log('🔍 Checking Supabase database structure...');
    console.log('📡 Connected to:', supabaseUrl);
    console.log('');

    // Try different table name variations
    const tableNames = ['User', 'user', 'Blog', 'blog', 'Banner', 'banner'];
    
    for (const tableName of tableNames) {
      try {
        console.log(`🔍 Checking table: ${tableName}`);
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`   ❌ ${tableName}: ${error.message}`);
        } else {
          console.log(`   ✅ ${tableName}: Found ${data.length} records`);
          if (data.length > 0) {
            console.log(`   📝 Sample record:`, Object.keys(data[0]));
          }
        }
      } catch (err) {
        console.log(`   ❌ ${tableName}: ${err.message}`);
      }
    }

    console.log('');
    console.log('💡 If no tables are found, you may need to:');
    console.log('1. Create the tables in your Supabase database');
    console.log('2. Check the table names (case-sensitive)');
    console.log('3. Verify your Supabase project has the right permissions');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkTables();


