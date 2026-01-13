const fs = require('fs');
const path = require('path');

const PDF_DIR = path.join(__dirname, 'Code', 'public', 'assets', 'documents', 'pdf');
const OUTPUT_FILE = path.join(__dirname, 'pdfsToImportTemplate.json');

function main() {
  const files = fs.readdirSync(PDF_DIR).filter(f => f.endsWith('.pdf'));
  const template = files.map(filename => ({
    filePath: path.join(PDF_DIR, filename),
    displayName: '', // Fill this in
    pagePath: '',    // Fill this in
  }));

  // Output to console
  console.log('PDFs to import template:');
  console.log(JSON.stringify(template, null, 2));

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(template, null, 2));
  console.log(`Template written to ${OUTPUT_FILE}`);
}

main(); 