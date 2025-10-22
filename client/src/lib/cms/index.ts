// CMS Integration Index
// This file exports all CMS providers and utilities

export * from './types';
export { SanityCMSProvider } from './sanity';
export { StrapiCMSProvider } from './strapi';
export { NotionCMSProvider } from './notion';

// Future CMS providers can be added here:
// export { ContentfulCMSProvider } from './contentful';
// export { DirectusCMSProvider } from './directus';
// export { KeystoneCMSProvider } from './keystone';

// CMS Configuration Hook
import { CMSFactory } from './types';

export function useCMS() {
  return CMSFactory.getProvider();
}

// Initialize CMS based on environment variables
export function initializeCMS() {
  // Check which CMS is configured and initialize accordingly
  
  if (process.env.SANITY_PROJECT_ID) {
    const { SanityCMSProvider } = require('./sanity');
    CMSFactory.setProvider(new SanityCMSProvider());
    console.log('🎨 Sanity CMS initialized');
    return;
  }
  
  if (process.env.STRAPI_URL) {
    const { StrapiCMSProvider } = require('./strapi');
    CMSFactory.setProvider(new StrapiCMSProvider());
    console.log('🚀 Strapi CMS initialized');
    return;
  }
  
  if (process.env.NOTION_TOKEN) {
    const { NotionCMSProvider } = require('./notion');
    CMSFactory.setProvider(new NotionCMSProvider());
    console.log('📝 Notion CMS initialized');
    return;
  }
  
  // Default to static data if no CMS is configured
  console.log('📊 Using static data provider (no CMS configured)');
}