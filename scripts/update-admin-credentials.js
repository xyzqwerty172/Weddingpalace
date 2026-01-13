/**
 * Script to update admin user credentials in Supabase
 * This will update the existing admin user's email and password
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase credentials');
  console.error('   Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

// Create Supabase client with service role key (has admin privileges)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// New admin credentials
const NEW_ADMIN_EMAIL = 'weddingpalace@gmail.com';
const NEW_ADMIN_PASSWORD = 'WeddingZxC172-';

async function updateAdminCredentials() {
  console.log('🔐 Updating admin credentials...\n');

  try {
    // Step 1: Find existing admin user
    console.log('1️⃣ Finding existing admin user...');
    const { data: profiles, error: profileError } = await supabase
      .from('user_profiles')
      .select('id, role')
      .eq('role', 'admin');

    if (profileError) {
      throw new Error(`Failed to fetch admin profiles: ${profileError.message}`);
    }

    if (!profiles || profiles.length === 0) {
      console.log('⚠️  No existing admin user found.');
      console.log('   Creating new admin user...\n');
      
      // Create new admin user
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: NEW_ADMIN_EMAIL,
        password: NEW_ADMIN_PASSWORD,
        email_confirm: true
      });

      if (createError) {
        throw new Error(`Failed to create admin user: ${createError.message}`);
      }

      console.log(`✅ Created new admin user: ${NEW_ADMIN_EMAIL}`);
      console.log(`   User ID: ${newUser.user.id}\n`);

      // Create admin profile
      const { error: insertError } = await supabase
        .from('user_profiles')
        .insert({
          id: newUser.user.id,
          role: 'admin'
        });

      if (insertError) {
        throw new Error(`Failed to create admin profile: ${insertError.message}`);
      }

      console.log('✅ Created admin profile');
      console.log('\n✅ Admin user created successfully!');
      console.log(`   Email: ${NEW_ADMIN_EMAIL}`);
      console.log(`   Password: ${NEW_ADMIN_PASSWORD}`);
      return;
    }

    // Step 2: Update existing admin user
    const adminProfile = profiles[0];
    console.log(`✅ Found existing admin user (ID: ${adminProfile.id})\n`);

    console.log('2️⃣ Updating admin email and password...');
    
    const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
      adminProfile.id,
      {
        email: NEW_ADMIN_EMAIL,
        password: NEW_ADMIN_PASSWORD,
        email_confirm: true
      }
    );

    if (updateError) {
      throw new Error(`Failed to update admin user: ${updateError.message}`);
    }

    console.log('✅ Admin credentials updated successfully!\n');

    // Step 3: Verify the update
    console.log('3️⃣ Verifying update...');
    const { data: verifyUser, error: verifyError } = await supabase.auth.admin.getUserById(adminProfile.id);

    if (verifyError) {
      throw new Error(`Failed to verify update: ${verifyError.message}`);
    }

    console.log(`✅ Verified: Email is now ${verifyUser.user.email}\n`);

    // Step 4: Remove any other admin users (security measure)
    if (profiles.length > 1) {
      console.log('4️⃣ Found multiple admin users. Removing extras...');
      for (let i = 1; i < profiles.length; i++) {
        const extraAdmin = profiles[i];
        console.log(`   Removing admin user: ${extraAdmin.id}`);
        
        // Delete from user_profiles
        await supabase
          .from('user_profiles')
          .delete()
          .eq('id', extraAdmin.id);
        
        // Delete from auth.users
        await supabase.auth.admin.deleteUser(extraAdmin.id);
      }
      console.log(`✅ Removed ${profiles.length - 1} extra admin user(s)\n`);
    }

    console.log('═══════════════════════════════════════════════════');
    console.log('✅ ADMIN CREDENTIALS UPDATE COMPLETE');
    console.log('═══════════════════════════════════════════════════');
    console.log('');
    console.log('New Admin Credentials:');
    console.log(`  Email:    ${NEW_ADMIN_EMAIL}`);
    console.log(`  Password: ${NEW_ADMIN_PASSWORD}`);
    console.log('');
    console.log('⚠️  IMPORTANT SECURITY NOTES:');
    console.log('  1. Only ONE admin user exists now');
    console.log('  2. Signup functionality has been removed from login page');
    console.log('  3. Non-admin users cannot access /admin');
    console.log('  4. Keep these credentials secure!');
    console.log('');
    console.log('You can now login at:');
    console.log('  Local:      http://localhost:3033/auth/supabase/login');
    console.log('  Production: https://yourwebsite.com/auth/supabase/login');
    console.log('═══════════════════════════════════════════════════');

  } catch (error) {
    console.error('\n❌ Error updating admin credentials:');
    console.error(`   ${error.message}`);
    console.error('\nPlease check:');
    console.error('  1. SUPABASE_SERVICE_ROLE_KEY is set in .env.local');
    console.error('  2. Supabase connection is working');
    console.error('  3. user_profiles table exists');
    process.exit(1);
  }
}

// Run the update
updateAdminCredentials();
