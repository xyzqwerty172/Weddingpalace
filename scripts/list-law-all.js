const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listLawAndArhiv() {
  // List all for /transparency/law
  const { data: lawDocs, error: lawError } = await supabase
    .from('documents')
    .select('id,title,page_path,is_active,file_url')
    .eq('page_path', '/transparency/law');

  console.log('--- All documents for /transparency/law ---');
  if (lawError) {
    console.error('❌ Error:', lawError.message);
  } else if (!lawDocs || lawDocs.length === 0) {
    console.log('No documents found.');
  } else {
    lawDocs.forEach(doc => {
      console.log(`ID: ${doc.id}`);
      console.log(`  Title: ${doc.title}`);
      console.log(`  is_active: ${doc.is_active}`);
      console.log(`  File URL: ${doc.file_url}`);
      console.log('---');
    });
  }

  // List all with arhiv in file_url
  const { data: arhivDocs, error: arhivError } = await supabase
    .from('documents')
    .select('id,title,page_path,is_active,file_url')
    .ilike('file_url', '%arhiv%');

  console.log('--- All documents with arhiv in file_url ---');
  if (arhivError) {
    console.error('❌ Error:', arhivError.message);
  } else if (!arhivDocs || arhivDocs.length === 0) {
    console.log('No documents found.');
  } else {
    arhivDocs.forEach(doc => {
      console.log(`ID: ${doc.id}`);
      console.log(`  Title: ${doc.title}`);
      console.log(`  Page Path: ${doc.page_path}`);
      console.log(`  is_active: ${doc.is_active}`);
      console.log(`  File URL: ${doc.file_url}`);
      console.log('---');
    });
  }
}

listLawAndArhiv(); 