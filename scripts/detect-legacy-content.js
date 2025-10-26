#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, readdirSync, statSync } from 'fs';
import { getLegacyKeywords } from '../client/src/lib/content-manager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Legacy keywords to detect
const LEGACY_KEYWORDS = [
  // Old metrics
  '22000', '22K', '$22K', '17 projects', '14 clients',
  '15+ Projects', '25+ MVPs', '50+ Consultations',
  // Old timeline
  '2026-2027', 'Early Growth Stage',
  // Old values that should be replaced
  '$8.5M', '247', '$25.2M', '50+', '1,200+', '5,000+', '3,500+',
  '15K+', '$2.5M', '$800K', '$1.2M', '2K+', '10K+', '500+',
  // Case study outdated metrics
  'totalValueLocked: "$125K"', 'contractsDeployed: 8', 'transactionVolume: "$450K"',
  'mvpsLaunched: 8', 'consultations: 12', 'yearsExperience: 5'
];

// File extensions to check
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.html'];

// Directories to skip
const SKIP_DIRS = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'];

function getAllFiles(dir, files = []) {
  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.includes(entry)) {
        getAllFiles(fullPath, files);
      }
    } else if (EXTENSIONS.some(ext => entry.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function checkFileForLegacyContent(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const foundKeywords = [];
    
    LEGACY_KEYWORDS.forEach(keyword => {
      if (content.toLowerCase().includes(keyword.toLowerCase())) {
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (line.toLowerCase().includes(keyword.toLowerCase())) {
            foundKeywords.push({
              keyword,
              line: index + 1,
              content: line.trim()
            });
          }
        });
      }
    });
    
    return foundKeywords;
  } catch (error) {
    console.warn(`Warning: Could not read file ${filePath}:`, error.message);
    return [];
  }
}

function main() {
  console.log('🔍 Scanning for legacy content...\n');
  
  const projectRoot = join(__dirname, '..');
  const allFiles = getAllFiles(projectRoot);
  
  let totalIssues = 0;
  const problemFiles = [];
  
  for (const filePath of allFiles) {
    const issues = checkFileForLegacyContent(filePath);
    
    if (issues.length > 0) {
      totalIssues += issues.length;
      const relativePath = filePath.replace(projectRoot, '');
      problemFiles.push({ path: relativePath, issues });
      
      console.log(`❌ ${relativePath}`);
      issues.forEach(issue => {
        console.log(`   Line ${issue.line}: "${issue.keyword}" found`);
        console.log(`   Content: ${issue.content}`);
      });
      console.log('');
    }
  }
  
  console.log('='.repeat(50));
  console.log(`📊 Scan Results:`);
  console.log(`   Files scanned: ${allFiles.length}`);
  console.log(`   Files with issues: ${problemFiles.length}`);
  console.log(`   Total issues found: ${totalIssues}`);
  
  if (totalIssues === 0) {
    console.log('✅ No legacy content found! Site is ready for deployment.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Legacy content found. Please update before deployment.');
    console.log('\nRequired Actions:');
    console.log('1. Replace all legacy metrics with canonical values:');
    console.log('   - Revenue: $13K (not $22K)');
    console.log('   - Projects: 20 (not 17)');
    console.log('   - Clients: 13 (not 14)');
    console.log('   - Founded: 2024 (not 2026-2027)');
    console.log('2. Update all component imports to use content-manager');
    console.log('3. Ensure all hardcoded strings are replaced with canonical content');
    
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { checkFileForLegacyContent, getAllFiles, LEGACY_KEYWORDS };