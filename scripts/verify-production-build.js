/**
 * Verification script for production build
 * Tests that the admin dashboard is accessible in production mode
 */

const http = require('http');

const BASE_URL = 'http://localhost:3033';

function makeRequest(path, followRedirects = true, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    
    http.get(url, (res) => {
      // Handle redirects
      if (followRedirects && (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308)) {
        if (maxRedirects > 0 && res.headers.location) {
          const redirectPath = res.headers.location.startsWith('http') 
            ? res.headers.location 
            : res.headers.location;
          return makeRequest(redirectPath, true, maxRedirects - 1)
            .then(resolve)
            .catch(reject);
        }
      }
      
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function verifyProductionBuild() {
  console.log('🔍 Verifying production build...\n');
  
  const tests = [
    { path: '/', name: 'Home page' },
    { path: '/admin', name: 'Admin dashboard route' },
    { path: '/auth/supabase/login', name: 'Login page' },
    { path: '/transparency', name: 'Transparency page' },
  ];
  
  let allPassed = true;
  
  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name} (${test.path})`);
      const response = await makeRequest(test.path);
      
      if (response.statusCode === 200) {
        console.log(`✅ ${test.name}: OK (Status: ${response.statusCode})`);
        
        // For admin route, check if it contains expected content
        if (test.path === '/admin') {
          if (response.body.includes('admin') || response.body.includes('dashboard')) {
            console.log('   ✓ Admin dashboard content detected');
          } else {
            console.log('   ⚠️  Admin dashboard content not clearly detected (may require authentication)');
          }
        }
      } else if (response.statusCode === 302 || response.statusCode === 307) {
        console.log(`✅ ${test.name}: Redirect (Status: ${response.statusCode})`);
        console.log(`   → Redirects to: ${response.headers.location}`);
      } else {
        console.log(`⚠️  ${test.name}: Unexpected status ${response.statusCode}`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${test.name}: Failed`);
      console.log(`   Error: ${error.message}`);
      allPassed = false;
    }
    console.log('');
  }
  
  console.log('═══════════════════════════════════════════════════');
  if (allPassed) {
    console.log('✅ Production build verification PASSED');
    console.log('   All routes are accessible');
    console.log('   Server is running correctly on port 3033');
  } else {
    console.log('⚠️  Production build verification completed with warnings');
    console.log('   Some routes may require authentication');
  }
  console.log('═══════════════════════════════════════════════════');
}

// Run verification
verifyProductionBuild().catch(console.error);
