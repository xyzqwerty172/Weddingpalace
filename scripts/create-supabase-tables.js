const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTables() {
  try {
    console.log('🔧 Creating tables in Supabase database...');
    console.log('📡 Connected to:', supabaseUrl);
    console.log('');

    // Create User table
    console.log('👤 Creating User table...');
    const { error: userError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS "User" (
          username TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          password TEXT NOT NULL,
          role INTEGER NOT NULL DEFAULT 0
        );
      `
    });

    if (userError) {
      console.log('   ⚠️  User table might already exist or need manual creation');
      console.log('   Error:', userError.message);
    } else {
      console.log('   ✅ User table created successfully');
    }

    // Create Blog table
    console.log('📝 Creating Blog table...');
    const { error: blogError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS "Blog" (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          subtitle TEXT,
          body TEXT,
          thumbnail_url TEXT NOT NULL,
          is_published INTEGER NOT NULL DEFAULT 0,
          "createdDate" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          type INTEGER NOT NULL DEFAULT 0
        );
      `
    });

    if (blogError) {
      console.log('   ⚠️  Blog table might already exist or need manual creation');
      console.log('   Error:', blogError.message);
    } else {
      console.log('   ✅ Blog table created successfully');
    }

    // Create Banner table
    console.log('🖼️  Creating Banner table...');
    const { error: bannerError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS "Banner" (
          id SERIAL PRIMARY KEY,
          url TEXT NOT NULL
        );
      `
    });

    if (bannerError) {
      console.log('   ⚠️  Banner table might already exist or need manual creation');
      console.log('   Error:', bannerError.message);
    } else {
      console.log('   ✅ Banner table created successfully');
    }

    console.log('');
    console.log('🎯 Next steps:');
    console.log('1. If tables were created successfully, run: node scripts/create-admin-user-supabase.js');
    console.log('2. Then run: npm run admin');
    console.log('3. Access AdminJS at: http://localhost:3001/admin');
    console.log('');
    console.log('💡 If you got errors, you may need to create the tables manually in your Supabase dashboard:');
    console.log('   Go to: https://app.supabase.com/project/bcmtvifodfragxpphkyl');
    console.log('   Navigate to: Table Editor → New Table');
    console.log('   Create tables: User, Blog, Banner');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createTables();


