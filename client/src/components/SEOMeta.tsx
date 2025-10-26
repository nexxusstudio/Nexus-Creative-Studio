import { useEffect } from 'react';
import { getSEOContent, getAgencyInfo } from '@/lib/content-manager';

interface SEOMetaProps {
  pageName?: string;
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  structuredData?: any;
}

export function SEOMeta({ 
  pageName = 'home', 
  title, 
  description, 
  keywords, 
  ogImage,
  canonical,
  structuredData 
}: SEOMetaProps) {
  const seoContent = getSEOContent(pageName);
  const agencyInfo = getAgencyInfo();
  
  const finalTitle = title || seoContent.title;
  const finalDescription = description || seoContent.description;
  const finalKeywords = keywords || seoContent.keywords;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = canonical || currentUrl;
  
  useEffect(() => {
    // Update document title
    document.title = finalTitle;
    
    // Update meta description
    updateMetaTag('name', 'description', finalDescription);
    
    // Update keywords
    if (finalKeywords?.length > 0) {
      updateMetaTag('name', 'keywords', finalKeywords.join(', '));
    }
    
    // Update Open Graph tags
    updateMetaTag('property', 'og:title', finalTitle);
    updateMetaTag('property', 'og:description', finalDescription);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:site_name', agencyInfo.name);
    
    if (ogImage) {
      updateMetaTag('property', 'og:image', ogImage);
    }
    
    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', finalTitle);
    updateMetaTag('name', 'twitter:description', finalDescription);
    
    if (ogImage) {
      updateMetaTag('name', 'twitter:image', ogImage);
    }
    
    // Update canonical link
    updateCanonicalLink(canonicalUrl);
    
    // Update structured data
    const jsonLd = structuredData || seoContent.jsonLd;
    if (jsonLd) {
      updateStructuredData(jsonLd);
    }
    
  }, [finalTitle, finalDescription, finalKeywords, canonicalUrl, ogImage, structuredData]);
  
  return null; // This component doesn't render anything
}

function updateMetaTag(attribute: string, name: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
}

function updateCanonicalLink(url: string) {
  let element = document.querySelector('link[rel="canonical"]');
  
  if (element) {
    element.setAttribute('href', url);
  } else {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
    document.head.appendChild(element);
  }
}

function updateStructuredData(data: any) {
  // Remove existing structured data
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => script.remove());
  
  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Hook for programmatic SEO updates
export function useSEO(options: SEOMetaProps) {
  useEffect(() => {
    const seoComponent = SEOMeta(options);
    return () => {
      // Cleanup if needed
    };
  }, [options]);
}

// Utility function to generate structured data for different page types
export function generateStructuredData(type: 'Organization' | 'WebPage' | 'Article' | 'BreadcrumbList', data: any) {
  const agencyInfo = getAgencyInfo();
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://nexuscreativestudio.com';
  
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type
  };
  
  switch (type) {
    case 'Organization':
      return {
        ...baseStructure,
        name: agencyInfo.name,
        description: agencyInfo.description,
        foundingDate: agencyInfo.founded.toString(),
        url: baseUrl,
        email: agencyInfo.contact?.email,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          bestRating: '5.0',
          ratingCount: agencyInfo.identity?.clients?.toString() || '13'
        },
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          value: '1-5'
        },
        ...data
      };
      
    case 'WebPage':
      return {
        ...baseStructure,
        name: data.title,
        description: data.description,
        url: data.url || baseUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: agencyInfo.name,
          url: baseUrl
        },
        about: {
          '@type': 'Organization',
          name: agencyInfo.name
        },
        ...data
      };
      
    case 'Article':
      return {
        ...baseStructure,
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Organization',
          name: agencyInfo.name
        },
        publisher: {
          '@type': 'Organization',
          name: agencyInfo.name
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        ...data
      };
      
    case 'BreadcrumbList':
      return {
        ...baseStructure,
        itemListElement: data.items?.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        })) || []
      };
      
    default:
      return { ...baseStructure, ...data };
  }
}

export default SEOMeta;