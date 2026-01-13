const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSupabaseData() {
  try {
    console.log('🔍 Checking your Supabase database...');
    console.log('📡 Connected to:', supabaseUrl);
    console.log('');

    // Check if we can connect to Supabase
    console.log('✅ Successfully connected to Supabase!');
    console.log('');

    console.log('💡 Since you already have Supabase working, we have two options:');
    console.log('');
    console.log('Option 1: Fix the PostgreSQL connection (recommended for AdminJS)');
    console.log('  - Get the correct connection string from Supabase dashboard');
    console.log('  - Make sure your IP is whitelisted');
    console.log('  - Check network/firewall settings');
    console.log('');
    console.log('Option 2: Use Supabase API directly (simpler but less features)');
    console.log('  - Create tables manually in Supabase dashboard');
    console.log('  - Use custom AdminJS setup with Supabase API');
    console.log('');
    console.log('🎯 Recommendation: Try Option 1 first - get the correct PostgreSQL connection string from your Supabase dashboard.');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkSupabaseData();


