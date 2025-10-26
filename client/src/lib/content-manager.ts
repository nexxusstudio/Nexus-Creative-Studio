import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the canonical site content
let siteContent: any = null;

function loadSiteContent() {
  if (!siteContent) {
    try {
      const contentPath = join(__dirname, '../data/site-content.json');
      const contentFile = readFileSync(contentPath, 'utf-8');
      siteContent = JSON.parse(contentFile);
    } catch (error) {
      console.error('Failed to load site content:', error);
      // Fallback to hardcoded content if file doesn't exist
      siteContent = getDefaultContent();
    }
  }
  return siteContent;
}

function getDefaultContent() {
  return {
    agency: {
      name: "Nexus Creative Studio",
      tagline: "Where Vision Meets Innovation",
      founded: 2024,
      identity: {
        revenue: 13000,
        revenueFormatted: "$13K",
        clients: 13,
        projects: 20,
        satisfaction: 100,
        founded: 2024
      }
    },
    pages: {
      home: {
        hero: {
          headline: "Where Vision Meets Innovation",
          subheading: "Building Digital Excellence",
          description: "Nexus Creative Studio - The creative technology agency for ambitious startups and forward-thinking businesses.",
          status: "Early Growth Stage • Founded 2024"
        }
      }
    }
  };
}

// Content accessor functions
export function getAgencyInfo() {
  const content = loadSiteContent();
  return content.agency;
}

export function getPageContent(pageName: string) {
  const content = loadSiteContent();
  return content.pages[pageName] || {};
}

export function getComponentContent(componentName: string) {
  const content = loadSiteContent();
  return content.components[componentName] || {};
}

export function getSEOContent(pageName: string = 'default') {
  const content = loadSiteContent();
  const pageContent = content.pages[pageName];
  const defaultSEO = content.seo;
  
  return {
    title: pageContent?.seo?.title || defaultSEO?.defaultTitle || 'Nexus Creative Studio',
    description: pageContent?.seo?.description || defaultSEO?.defaultDescription || 'Creative technology agency founded in 2024',
    keywords: pageContent?.seo?.keywords || [],
    jsonLd: defaultSEO?.jsonLd || {}
  };
}

export function getMicrocopy(category: string) {
  const content = loadSiteContent();
  return content.microcopy[category] || {};
}

export function getTestimonials() {
  const content = loadSiteContent();
  return content.testimonials || [];
}

export function getLegacyKeywords() {
  const content = loadSiteContent();
  return content.legacyKeywords || [];
}

// Metrics accessor with database integration
export function getCanonicalMetrics() {
  const content = loadSiteContent();
  return content.agency.identity;
}

// Content validation
export function validateContent() {
  const content = loadSiteContent();
  const legacyKeywords = content.legacyKeywords || [];
  const contentString = JSON.stringify(content).toLowerCase();
  
  const foundLegacyKeywords = legacyKeywords.filter((keyword: string) => 
    contentString.includes(keyword.toLowerCase())
  );
  
  if (foundLegacyKeywords.length > 0) {
    console.warn('⚠️  Legacy keywords found in content:', foundLegacyKeywords);
    return false;
  }
  
  return true;
}

// Content replacement helpers
export function replaceContentTokens(text: string, data: Record<string, any> = {}) {
  const agency = getAgencyInfo();
  const mergedData = { ...agency.identity, ...agency, ...data };
  
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return mergedData[key]?.toString() || match;
  });
}

export function formatMetric(value: number, type: 'currency' | 'number' | 'percentage' = 'number') {
  switch (type) {
    case 'currency':
      return value >= 1000 ? `$${(value / 1000).toFixed(0)}K` : `$${value}`;
    case 'percentage':
      return `${value}%`;
    default:
      return value >= 1000 ? `${(value / 1000).toFixed(0)}K+` : `${value}+`;
  }
}

export default {
  getAgencyInfo,
  getPageContent,
  getComponentContent,
  getSEOContent,
  getMicrocopy,
  getTestimonials,
  getLegacyKeywords,
  getCanonicalMetrics,
  validateContent,
  replaceContentTokens,
  formatMetric,
  loadSiteContent
};