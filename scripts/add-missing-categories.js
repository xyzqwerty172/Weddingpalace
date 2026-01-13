const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addMissingCategories() {
  try {
    console.log('🔧 Adding missing categories to Supabase...');
    console.log('📡 Connected to:', supabaseUrl);
    console.log('');

    // First, get the parent category IDs we need
    const { data: parentCategories, error: parentError } = await supabase
      .from('categories')
      .select('id, name_mn, path')
      .in('path', ['/transparency/company', '/transparency/financial']);

    if (parentError) {
      console.error('❌ Error fetching parent categories:', parentError);
      return;
    }

    const companyCategory = parentCategories.find(c => c.path === '/transparency/company');
    const financialCategory = parentCategories.find(c => c.path === '/transparency/financial');

    if (!companyCategory) {
      console.error('❌ Could not find "Байгууллагын ил тод байдал" category');
      return;
    }

    if (!financialCategory) {
      console.error('❌ Could not find "Санхүүгийн ил тод байдал" category');
      return;
    }

    console.log('✅ Found parent categories:');
    console.log(`   - ${companyCategory.name_mn} (${companyCategory.id})`);
    console.log(`   - ${financialCategory.name_mn} (${financialCategory.id})`);
    console.log('');

    // Check if "Тайлан" already exists under company
    const { data: existingReport } = await supabase
      .from('categories')
      .select('*')
      .eq('path', '/transparency/company/report')
      .single();

    if (existingReport) {
      console.log('ℹ️  "Тайлан" category already exists under Байгууллагын ил тод байдал');
    } else {
      // Add "Тайлан" under "Байгууллагын ил тод байдал"
      console.log('📝 Adding "Тайлан" under "Байгууллагын ил тод байдал"...');
      const { data: reportCategory, error: reportError } = await supabase
        .from('categories')
        .insert({
          name_mn: 'Тайлан',
          path: '/transparency/company/report',
          parent_id: companyCategory.id,
          order_num: 30
        })
        .select()
        .single();

      if (reportError) {
        console.error('❌ Error adding Тайлан category:', reportError);
      } else {
        console.log('✅ Successfully added "Тайлан" category');
        console.log(`   ID: ${reportCategory.id}`);
        console.log(`   Path: ${reportCategory.path}`);
      }
    }

    console.log('');

    // Check if "ТЕНДЕР" already exists under financial
    const { data: existingTender } = await supabase
      .from('categories')
      .select('*')
      .eq('path', '/transparency/financial/tender')
      .single();

    if (existingTender) {
      console.log('ℹ️  "ТЕНДЕР" category already exists under Санхүүгийн ил тод байдал');
    } else {
      // Add "ТЕНДЕР" under "Санхүүгийн ил тод байдал"
      console.log('📝 Adding "ТЕНДЕР" under "Санхүүгийн ил тод байдал"...');
      const { data: tenderCategory, error: tenderError } = await supabase
        .from('categories')
        .insert({
          name_mn: 'ТЕНДЕР',
          path: '/transparency/financial/tender',
          parent_id: financialCategory.id,
          order_num: 3
        })
        .select()
        .single();

      if (tenderError) {
        console.error('❌ Error adding ТЕНДЕР category:', tenderError);
      } else {
        console.log('✅ Successfully added "ТЕНДЕР" category');
        console.log(`   ID: ${tenderCategory.id}`);
        console.log(`   Path: ${tenderCategory.path}`);
      }
    }

    console.log('');
    console.log('🎯 Summary:');
    console.log('✅ Categories have been added to the database');
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. The categories are now available in the admin panel');
    console.log('2. Frontend pages will be created for these categories');
    console.log('3. Navigation menu will be updated');
    console.log('');
    console.log('🔍 Verify in admin panel:');
    console.log('   - Go to http://localhost:3033/admin');
    console.log('   - Upload a document');
    console.log('   - You should see "Тайлан" under "Байгууллагын ил тод байдал"');
    console.log('   - You should see "ТЕНДЕР" under "Санхүүгийн ил тод байдал"');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

addMissingCategories();
