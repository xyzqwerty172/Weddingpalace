const fs = require('fs');

console.log('🔧 Fixing .env file...');

const envContent = `# Database Configuration (Supabase)
# Replace with your actual Supabase database URL from your dashboard
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# AdminJS Configuration
ADMIN_PORT=3001
ADMIN_URL=http://localhost:3001

# Session Secrets (CHANGE THESE IN PRODUCTION!)
ADMIN_COOKIE_SECRET=super-secret-cookie-password-change-this
ADMIN_SESSION_SECRET=super-secret-session-password-change-this

# Next.js
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
`;

try {
  fs.writeFileSync('.env', envContent, 'utf8');
  console.log('✅ .env file created successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Update DATABASE_URL with your actual Supabase connection string');
  console.log('2. Run: npx prisma db push');
  console.log('3. Run: node scripts/create-admin-user.js');
  console.log('4. Run: npm run dev:admin');
} catch (error) {
  console.error('❌ Error creating .env file:', error);
}


