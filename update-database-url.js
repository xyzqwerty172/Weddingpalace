const fs = require('fs');
const readline = require('readline');

console.log('🔧 Supabase Database URL Setup');
console.log('==============================\n');

console.log('To get your Supabase database connection string:');
console.log('1. Go to https://app.supabase.com');
console.log('2. Select your project');
console.log('3. Go to Settings → Database');
console.log('4. Scroll down to "Connection string"');
console.log('5. Copy the URI connection string');
console.log('');

console.log('The connection string should look like:');
console.log('postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres');
console.log('');

console.log('Current .env file:');
try {
  const envContent = fs.readFileSync('.env', 'utf8');
  console.log(envContent);
} catch (error) {
  console.log('❌ Could not read .env file');
}

console.log('\n📝 To update the DATABASE_URL:');
console.log('1. Open .env file in your editor');
console.log('2. Replace the placeholder DATABASE_URL with your actual Supabase connection string');
console.log('3. Save the file');
console.log('4. Run: npx prisma db push');
console.log('5. Run: node scripts/create-admin-user.js');
console.log('6. Run: npm run dev:admin');


