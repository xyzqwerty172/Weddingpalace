const fs = require('fs');

console.log('🔧 Supabase Database URL Helper');
console.log('===============================\n');

console.log('Your Supabase project details:');
console.log('- Project URL: https://bcmtvifodfragxpphkyl.supabase.co');
console.log('- Project Ref: bcmtvifodfragxpphkyl');
console.log('');

console.log('To get your DATABASE_URL:');
console.log('1. Go to https://app.supabase.com/project/bcmtvifodfragxpphkyl');
console.log('2. Go to Settings → Database');
console.log('3. Scroll down to "Connection string"');
console.log('4. Copy the URI connection string');
console.log('');

console.log('The connection string should look like:');
console.log('postgresql://postgres:[YOUR-ACTUAL-PASSWORD]@db.bcmtvifodfragxpphkyl.supabase.co:5432/postgres');
console.log('');

console.log('Once you have the connection string:');
console.log('1. Open .env file in your editor');
console.log('2. Replace the DATABASE_URL line with your actual connection string');
console.log('3. Save the file');
console.log('4. Run: npx prisma db push');
console.log('');

console.log('Current .env file:');
try {
  const envContent = fs.readFileSync('.env', 'utf8');
  console.log(envContent);
} catch (error) {
  console.log('❌ Could not read .env file');
}


