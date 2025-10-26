// Import site content directly for browser compatibility
import siteContentData from '../data/site-content.json';
import { productionConfig } from './production-config';

// Cached site content
let siteContent: any = null;

function loadSiteContent() {
  if (!siteContent) {
    try {
      // Ensure the imported data is valid
      if (siteContentData && typeof siteContentData === 'object') {
        siteContent = siteContentData;
        
        if (productionConfig.debugMode) {
          console.log('✅ Site content loaded successfully');
        }
      } else {
        throw new Error('Invalid site content data');
      }
    } catch (error) {
      console.error('Failed to load site content:', error);
      // Fallback to hardcoded content if import fails
      siteContent = getDefaultContent();
      
      if (productionConfig.debugMode) {
        console.warn('🔄 Using fallback content due to load failure');
      }
    }
  }
  return siteContent;
}

// TypeScript interfaces for type safety
interface AgencyIdentity {
  revenue: number;
  revenueFormatted: string;
  clients: number;
  projects: number;
  satisfaction: number;
  founded: number;
}

interface AgencyInfo {
  name: string;
  tagline: string;
  founded: number;
  identity: AgencyIdentity;
  description?: string;
  mission?: string;
  contact?: {
    email: string;
    website: string;
  };
}

interface SiteContent {
  agency: AgencyInfo;
  pages: Record<string, any>;
  components?: Record<string, any>;
  seo?: Record<string, any>;
  microcopy?: Record<string, any>;
  testimonials?: any[];
  legacyKeywords?: string[];
}

function getDefaultContent(): SiteContent {
  return {
    agency: {
      name: "Nexus Creative Studio",
      tagline: "Where Vision Meets Innovation",
      founded: 2024,
      description: "The creative technology agency for ambitious startups and forward-thinking businesses.",
      mission: "Building Digital Excellence",
      identity: {
        revenue: 13000,
        revenueFormatted: "$13K",
        clients: 13,
        projects: 20,
        satisfaction: 100,
        founded: 2024
      },
      contact: {
        email: "jobayerhoquesiddique@gmail.com",
        website: "https://nexuscreativestudio.com"
      }
    },
    pages: {
      home: {
        hero: {
          headline: "Where Vision Meets Innovation",
          subheading: "Building Digital Excellence",
          description: "Nexus Creative Studio - The creative technology agency for ambitious startups and forward-thinking businesses.",
          status: "Founded 2024 • $13K Revenue • 13 Clients • 20 Projects"
        },
        seo: {
          title: "Nexus Creative Studio - Digital Innovation Agency | Founded 2024",
          description: "Founded 2024 creative agency with $13K revenue, 13 clients, 20 projects. AI-powered solutions, conversion optimization, and scalable automation.",
          keywords: ["creative agency", "digital innovation", "AI solutions", "web development", "startup technology"]
        }
      }
    },
    components: {},
    microcopy: {},
    testimonials: [],
    legacyKeywords: ["$22K", "22000", "17 projects", "14 clients", "2026-2027", "Early Growth Stage"]
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