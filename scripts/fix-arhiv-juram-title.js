const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const correctTitle = 'Архивын цахим баримтын хадгалалт хамгаалалт ашиглалтын журам';
const correctPagePath = '/transparency/law';
const docId = 'e6ebe12d-1e26-42af-97ed-ba60ba692739';

async function fixArhivJuram() {
  const { error: updateError } = await supabase
    .from('documents')
    .update({ title: correctTitle, page_path: correctPagePath, is_active: true })
    .eq('id', docId);

  if (updateError) {
    console.error('❌ Error updating document:', updateError.message);
  } else {
    console.log(`✅ Updated arhiv-juram.pdf to title: ${correctTitle}, page_path: ${correctPagePath}`);
  }
}

fixArhivJuram(); 