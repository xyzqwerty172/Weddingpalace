const fs = require('fs');

console.log('🔧 Fixing DATABASE_URL in .env file...');

// Read current .env file
let envContent = fs.readFileSync('.env', 'utf8');

// Fix the DATABASE_URL line
const correctDatabaseUrl = 'DATABASE_URL="postgresql://postgres:CtUZrWk85nFtuMzO@db.bcmtvifodfragxpphkyl.supabase.co:5432/postgres"';

// Replace the malformed DATABASE_URL line
envContent = envContent.replace(/DATABASE_URL="[^"]*\\?\s*[^"]*\\?\s*[^"]*"/, correctDatabaseUrl);

// Write the fixed content back
fs.writeFileSync('.env', envContent, 'utf8');

console.log('✅ DATABASE_URL fixed!');
console.log('📝 Fixed DATABASE_URL:', correctDatabaseUrl);
console.log('');
console.log('🎯 Now you can run:');
console.log('npx prisma db push');


