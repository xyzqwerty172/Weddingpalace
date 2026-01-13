const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('🔍 Testing database connection...');
    console.log('📡 Connecting to:', process.env.DATABASE_URL.replace(/:[^:]*@/, ':***@'));
    
    await client.connect();
    console.log('✅ Successfully connected to database!');
    
    // Test a simple query
    const result = await client.query('SELECT version()');
    console.log('📊 Database version:', result.rows[0].version);
    
    await client.end();
    console.log('🎉 Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('');
    console.log('💡 Possible solutions:');
    console.log('1. Check if your IP is whitelisted in Supabase');
    console.log('2. Verify the database password is correct');
    console.log('3. Check if your firewall allows outbound connections to port 5432');
    console.log('4. Try connecting from Supabase dashboard to verify the connection string');
  }
}

testConnection();


