const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const fileName = 'arhiv-juram.pdf';

async function listArhivJuram() {
  const { data, error } = await supabase
    .from('documents')
    .select('id,title,page_path,is_active,file_url')
    .ilike('file_url', `%${fileName}`);

  if (error) {
    console.error('❌ Error searching for arhiv-juram.pdf:', error.message);
    return;
  }

  if (!data || data.length === 0) {
    console.log('arhiv-juram.pdf not found in database.');
    return;
  }

  data.forEach(doc => {
    console.log(`ID: ${doc.id}`);
    console.log(`  Title: ${doc.title}`);
    console.log(`  Page Path: ${doc.page_path}`);
    console.log(`  is_active: ${doc.is_active}`);
    console.log(`  File URL: ${doc.file_url}`);
    console.log('---');
  });
}

listArhivJuram(); 