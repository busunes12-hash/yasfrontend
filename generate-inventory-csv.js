/**
 * Yas Beads Inventory CSV Generator
 * Generates a complete CSV export of all products with validation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from './src/data/products.js';
import { collections } from './src/data/collections.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build collection name map
const collectionMap = {};
collections.forEach(c => {
  collectionMap[c.slug] = c.nameEn;
});

// CSV header
const csvHeader = [
  'Product Name',
  'Collection Name',
  'Product Price',
  'Product URL',
  'SKU / Product Number',
  'Inventory Quantity'
].join(',');

// Validate product data and collect issues
const validationIssues = [];

function validateProduct(product, index) {
  const issues = [];
  
  // Check for missing product name
  if (!product.nameEn || product.nameEn.trim() === '') {
    issues.push('Missing product name');
  }
  
  // Check for missing collection
  if (!product.collection || product.collection.trim() === '') {
    issues.push('Missing collection');
  }
  
  // Check for missing price
  if (product.price === null || product.price === undefined) {
    issues.push('Missing price');
  }
  
  // Check for missing slug (URL)
  if (!product.slug || product.slug.trim() === '') {
    issues.push('Missing product URL slug');
  }
  
  // Check inventory quantity
  if (product.stockCount === null || product.stockCount === undefined) {
    issues.push('Missing inventory quantity');
  } else if (product.stockCount < 0) {
    issues.push(`Invalid inventory quantity: ${product.stockCount}`);
  }
  
  return issues;
}

// Generate CSV content
function generateCSV() {
  let csvContent = csvHeader + '\n';
  const validProducts = [];
  
  products.forEach((product, index) => {
    const issues = validateProduct(product, index);
    
    if (issues.length > 0) {
      validationIssues.push({
        product: product.nameEn || `Product #${product.id}`,
        id: product.id,
        issues: issues
      });
    } else {
      validProducts.push(product);
    }
    
    // Get collection name
    const collectionName = collectionMap[product.collection] || product.collection || 'Unknown';
    
    // Build product URL
    const productUrl = `https://yasbeads.com/product/${product.slug}`;
    
    // Escape product name for CSV (handle commas and quotes)
    const productName = `"${(product.nameEn || '').replace(/"/g, '""')}"`;
    const collectionNameEscaped = `"${collectionName.replace(/"/g, '""')}"`;
    
    // Build CSV row
    const row = [
      productName,
      collectionNameEscaped,
      product.price || 0,
      productUrl,
      product.id || '',
      product.stockCount !== null && product.stockCount !== undefined ? product.stockCount : 0
    ].join(',');
    
    csvContent += row + '\n';
  });
  
  return {
    csvContent,
    validProducts,
    validationIssues
  };
}

// Generate the CSV
const result = generateCSV();

// Write CSV file
const csvPath = path.join(__dirname, 'inventory-export.csv');
fs.writeFileSync(csvPath, result.csvContent, 'utf8');

// Generate validation report
const reportPath = path.join(__dirname, 'inventory-validation-report.txt');
let reportContent = 'YAS BEADS INVENTORY VALIDATION REPORT\n';
reportContent += '='.repeat(60) + '\n\n';
reportContent += `Generated: ${new Date().toISOString()}\n`;
reportContent += `Total Products: ${products.length}\n`;
reportContent += `Valid Products: ${result.validProducts.length}\n`;
reportContent += `Products with Issues: ${result.validationIssues.length}\n\n`;

if (result.validationIssues.length > 0) {
  reportContent += 'ISSUES FOUND:\n';
  reportContent += '-'.repeat(40) + '\n\n';
  
  result.validationIssues.forEach(issue => {
    reportContent += `Product: ${issue.product} (ID: ${issue.id})\n`;
    issue.issues.forEach(issueDetail => {
      reportContent += `  - ${issueDetail}\n`;
    });
    reportContent += '\n';
  });
} else {
  reportContent += 'No validation issues found.\n';
}

reportContent += '\n' + '='.repeat(60) + '\n';
reportContent += 'CSV FILE READY FOR IMPORT/EXPORT\n';
reportContent += `Location: ${csvPath}\n`;

fs.writeFileSync(reportPath, reportContent, 'utf8');

console.log('CSV export generated successfully!');
console.log(`CSV file: ${csvPath}`);
console.log(`Validation report: ${reportPath}`);
console.log(`\nSummary:`);
console.log(`  Total products: ${products.length}`);
console.log(`  Valid products: ${result.validProducts.length}`);
console.log(`  Products with issues: ${result.validationIssues.length}`);
