const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const unwantedIds = [
  'ebd6c53f-1659-42fb-9fa8-ec002d8780ca', // Ургудуул гомдлын тайлан
  'dc31a4e0-de9d-4739-88fa-3aa34c10ce57'  // Судалгаа
];

async function forceDeleteById() {
  console.log('🗑️ Deleting unwanted documents by ID...');
  for (const id of unwantedIds) {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);
    if (error) {
      console.error(`❌ Error deleting ID ${id}:`, error.message);
    } else {
      console.log(`✅ Deleted document with ID ${id}`);
    }
  }
  // Show remaining docs for verification
  const { data: remaining, error: err2 } = await supabase
    .from('documents')
    .select('id,title,is_active')
    .eq('page_path', '/transparency/hr');
  if (err2) {
    console.error('❌ Error fetching remaining docs:', err2.message);
  } else {
    console.log('📋 Remaining docs for /transparency/hr:');
    remaining.forEach(doc => {
      console.log(`- ${doc.title} (is_active: ${doc.is_active})`);
    });
  }
}

forceDeleteById(); 