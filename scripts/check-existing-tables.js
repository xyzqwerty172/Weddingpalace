const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTables() {
  try {
    console.log('🔍 Checking what tables exist in your Supabase database...');
    console.log('📡 Connected to:', supabaseUrl);
    console.log('');

    // Try to query information_schema to get table names
    const { data: tables, error } = await supabase
      .rpc('exec_sql', {
        sql: `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          ORDER BY table_name;
        `
      });

    if (error) {
      console.log('❌ Could not query table information:', error.message);
      console.log('');
      console.log('💡 Let me try a different approach...');
      
      // Try to list tables using a different method
      const { data: altTables, error: altError } = await supabase
        .from('_sql')
        .select('*')
        .eq('query', `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public';
        `);
      
      if (altError) {
        console.log('❌ Alternative method also failed:', altError.message);
        console.log('');
        console.log('🎯 Let\'s try to test the User table directly...');
        
        // Try to query the User table directly
        console.log('🔍 Testing User table access...');
        const { data: userData, error: userError } = await supabase
          .from('User')
          .select('*')
          .limit(1);
        
        if (userError) {
          console.log('❌ User table error:', userError.message);
          
          // Try lowercase
          console.log('🔍 Testing user table (lowercase)...');
          const { data: userDataLower, error: userErrorLower } = await supabase
            .from('user')
            .select('*')
            .limit(1);
          
          if (userErrorLower) {
            console.log('❌ user table (lowercase) error:', userErrorLower.message);
          } else {
            console.log('✅ Found user table (lowercase)!');
          }
        } else {
          console.log('✅ Found User table!');
          console.log('📊 Sample data:', userData);
        }
      } else {
        console.log('✅ Found tables:', altTables);
      }
    } else {
      console.log('✅ Found tables:', tables);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkTables();


