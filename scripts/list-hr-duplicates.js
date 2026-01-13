const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const unwantedTitles = [
  'Ургудуул гомдлын тайлан',
  'Судалгаа'
];

async function listDuplicates() {
  console.log('🔍 Listing all records for /transparency/hr with unwanted titles...');
  for (const title of unwantedTitles) {
    const { data, error } = await supabase
      .from('documents')
      .select('id,title,is_active,created_at')
      .eq('page_path', '/transparency/hr')
      .eq('title', title);
    if (error) {
      console.error(`❌ Error fetching ${title}:`, error.message);
    } else {
      console.log(`\nTitle: ${title}`);
      if (data.length === 0) {
        console.log('  No records found.');
      } else {
        data.forEach(doc => {
          console.log(`  - ID: ${doc.id}, is_active: ${doc.is_active}, created_at: ${doc.created_at}`);
        });
      }
    }
  }
}

listDuplicates(); 