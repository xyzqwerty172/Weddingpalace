/**
 * Script to create the missing 'banners' storage bucket in Supabase
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

async function createBannersBucket() {
  console.log('🔧 Creating banners storage bucket...\n');
  
  try {
    // Create the banners bucket
    const { data, error } = await supabase.storage.createBucket('banners', {
      public: true, // Make bucket public so banner images can be accessed
      fileSizeLimit: 10485760, // 10MB limit for banner images
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    });
    
    if (error) {
      if (error.message.includes('already exists')) {
        console.log('✓ Bucket "banners" already exists');
        return true;
      }
      console.error('❌ Failed to create banners bucket:', error.message);
      return false;
    }
    
    console.log('✓ Successfully created banners bucket');
    
    // Verify the bucket was created
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('⚠ Warning: Could not verify bucket creation:', listError.message);
      return true;
    }
    
    const bannersExists = buckets.some(b => b.name === 'banners');
    
    if (bannersExists) {
      console.log('✓ Verified: banners bucket exists');
      return true;
    } else {
      console.error('❌ Bucket was created but not found in list');
      return false;
    }
    
  } catch (err) {
    console.error('❌ Error creating banners bucket:', err.message);
    return false;
  }
}

async function main() {
  console.log('📍 Supabase URL:', supabaseUrl);
  console.log('');
  
  const success = await createBannersBucket();
  
  console.log('\n' + '='.repeat(60));
  if (success) {
    console.log('✓ Banners bucket setup complete!');
    console.log('\nYou can now run: node scripts/verify-production-setup.js');
  } else {
    console.log('❌ Failed to create banners bucket');
    console.log('\nPlease create the bucket manually in Supabase dashboard:');
    console.log('1. Go to Storage in Supabase dashboard');
    console.log('2. Click "New bucket"');
    console.log('3. Name: banners');
    console.log('4. Public: Yes');
    console.log('5. File size limit: 10MB');
  }
  console.log('='.repeat(60) + '\n');
  
  process.exit(success ? 0 : 1);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
