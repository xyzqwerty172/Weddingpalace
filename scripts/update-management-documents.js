/**
 * Script to update document page paths for management section
 * Moves documents from /about/activity to /about/management
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateManagementDocuments() {
  console.log('🔄 Updating document page paths for management section...');
  
  const documentsToUpdate = [
    '1752322635110-gerleh-yosloliin-ordnii-uil-ajillagaanii-chiglel.pdf',
    '1752322673207-uil-ajillagaanii-terguuleh-chiglel.pdf'
  ];

  try {
    // Update the documents
    const { data, error } = await supabase
      .from('documents')
      .update({ page_path: '/about/management' })
      .in('filename', documentsToUpdate)
      .select('id, title, filename, page_path');

    if (error) {
      console.error('❌ Error updating documents:', error);
      return;
    }

    console.log('✅ Successfully updated documents:');
    data.forEach(doc => {
      console.log(`  - ${doc.title} (${doc.filename})`);
      console.log(`    Page path: ${doc.page_path}`);
    });

    console.log('\n🎉 Update completed successfully!');
    console.log('📋 Documents are now available at: /about/management');

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

// Run the update
updateManagementDocuments();