const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  try {
    console.log('🔍 Checking for existing admin user...');
    
    // Check if admin user already exists
    const { data: existingUsers, error: fetchError } = await supabase
      .from('user')
      .select('*')
      .eq('role', 1)
      .limit(1);

    if (fetchError) {
      console.error('❌ Error checking existing users:', fetchError);
      return;
    }

    if (existingUsers && existingUsers.length > 0) {
      console.log('✅ Admin user already exists:', existingUsers[0].username);
      return;
    }

    console.log('👤 Creating admin user...');
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const { data, error } = await supabase
      .from('user')
      .insert([
        {
          username: 'admin',
          password: hashedPassword,
          role: 1, // Admin role
        }
      ])
      .select();

    if (error) {
      console.error('❌ Error creating admin user:', error);
      return;
    }

    console.log('✅ Admin user created successfully!');
    console.log('📝 Login credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('   ⚠️  Please change the password after first login!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createAdminUser();
