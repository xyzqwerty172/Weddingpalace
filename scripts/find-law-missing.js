const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const titles = [
  'Хууль дүрэм журам',
  'Архивын цахим баримтын хадгалалт хамгаалалт ашиглалтын журам'
];

async function findMissingLawDocs() {
  for (const title of titles) {
    const { data, error } = await supabase
      .from('documents')
      .select('id,title,page_path,file_url,is_active')
      .eq('title', title);
    if (error) {
      console.error(`❌ Error searching for ${title}:`, error.message);
    } else {
      console.log(`\nResults for: ${title}`);
      if (!data || data.length === 0) {
        console.log('  Not found in database.');
      } else {
        data.forEach(doc => {
          console.log(`  - ID: ${doc.id}, page_path: ${doc.page_path}, is_active: ${doc.is_active}, file_url: ${doc.file_url}`);
        });
      }
    }
  }
}

findMissingLawDocs(); 