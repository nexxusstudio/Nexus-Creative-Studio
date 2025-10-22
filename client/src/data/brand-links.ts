/**
 * Official Brand Links & Contact Information
 * Single source of truth for all links, emails, and social media URLs
 * across the entire Nexus Ecosystem
 */

// Core Contact Information
export const BRAND_CONTACTS = {
  // Jobayer Hoque Siddique (Founder)
  founder: {
    name: "Jobayer Hoque Siddique",
    title: "Founder & CEO",
    email: "jobayerhoquesiddique@gmail.com",
    phone: "+1 (XXX) XXX-XXXX", // Add when available
  },
  
  // Nexus Creative Studio (Main Agency)
  agency: {
    name: "Nexus Creative Studio", 
    email: "nexxusstudio.agency@gmail.com",
    phone: "+1 (XXX) XXX-XXXX", // Add when available
  }
};

// Social Media Links
export const SOCIAL_LINKS = {
  // Jobayer Hoque Siddique Social Links
  founder: {
    twitter: "https://x.com/jobayerhoquesid",
    github: "https://github.com/jobayerhoquesiddique", 
    linkedin: "https://www.linkedin.com/in/jobayer-hoque-siddique-58367a37a/",
    fiverr: "https://www.fiverr.com/s/m5vGDRZ",
    upwork: "https://www.upwork.com/freelancers/~012712dfc006df1367?mp_source=share",
    freelancer: "https://www.freelancer.com/u/jobayerhoques?sb=t",
    contra: "https://contra.com/jobayer_hoque_siddique_1hrc474w"
  },
  
  // Nexus Creative Studio Social Links
  agency: {
    twitter: "https://x.com/nexuscrativeio",
    github: "https://github.com/nexxusstudio",
    fiverr: "https://pro.fiverr.com/nexusstudioagen",
    upwork: "https://www.upwork.com/NexusStudio/",
    portfolio: "https://nexuscreativestudio.notion.site/Nexus-Creative-Studio-28676083f2a4812eb694fa9dde05b381",
    clientPortal: "https://nexuscreativestudio.notion.site/Client-Portal-22176083f2a4800cbe19d83a87e0671d"
  }
};

// Brand Asset Paths
export const BRAND_ASSETS = {
  logos: {
    nexus: "/attached_assets/lg_1756703260455.jpg",
    nexusStudio: "/attached_assets/NCS11_1756704209883.jpg", 
    cryptoNexus: "/attached_assets/CN1_1756704209882.jpg",
    byteStudio: "/attached_assets/BS1_1756704209882.jpg",
    founder: "/attached_assets/JH1_1756704209882.png"
  },
  covers: {
    nexus: "/attached_assets/NCS1_1756703260455.jpg",
    cryptoNexus: "/attached_assets/CN11_1756704209882.jpg", 
    byteStudio: "/attached_assets/BS_1756703260453.jpg",
    founder: "/attached_assets/JHS1_1756704209882.png"
  }
};

// Call-to-Action Destinations
export const CTA_DESTINATIONS = {
  // Contact & Booking
  contact: {
    email: BRAND_CONTACTS.agency.email,
    founderEmail: BRAND_CONTACTS.founder.email,
    contactForm: "#contact", // Internal form
    calendly: "https://calendly.com/jobayerhoquesiddique", // Add when available
    whatsapp: "https://wa.me/1234567890", // Add actual number when available
  },
  
  // Business Development
  business: {
    portfolio: SOCIAL_LINKS.agency.portfolio,
    clientPortal: SOCIAL_LINKS.agency.clientPortal,
    fiverr: SOCIAL_LINKS.agency.fiverr,
    upwork: SOCIAL_LINKS.agency.upwork
  },
  
  // Social & Community
  social: {
    twitter: SOCIAL_LINKS.agency.twitter,
    founderTwitter: SOCIAL_LINKS.founder.twitter,
    github: SOCIAL_LINKS.agency.github,
    founderGithub: SOCIAL_LINKS.founder.github,
    linkedin: SOCIAL_LINKS.founder.linkedin
  }
};

// Brand-Specific Configurations
export const BRAND_CONFIGS = {
  nexusCreativeStudio: {
    name: "Nexus Creative Studio",
    tagline: "Building World-Class Digital Systems From the Ground Up",
    email: BRAND_CONTACTS.agency.email,
    socialLinks: SOCIAL_LINKS.agency,
    logo: BRAND_ASSETS.logos.nexusStudio,
    cover: BRAND_ASSETS.covers.nexus,
    primaryColor: "#3B82F6",
    ctaDestinations: {
      primary: CTA_DESTINATIONS.contact.contactForm,
      portfolio: CTA_DESTINATIONS.business.portfolio,
      social: CTA_DESTINATIONS.social.twitter
    }
  },
  
  cryptoNexus: {
    name: "Crypto Nexus",
    tagline: "Web3 & Blockchain Innovation",
    email: BRAND_CONTACTS.agency.email, // Shared agency email
    socialLinks: SOCIAL_LINKS.agency, // Shared agency social
    logo: BRAND_ASSETS.logos.cryptoNexus,
    cover: BRAND_ASSETS.covers.cryptoNexus,
    primaryColor: "#10B981",
    ctaDestinations: {
      primary: CTA_DESTINATIONS.contact.contactForm,
      portfolio: CTA_DESTINATIONS.business.portfolio,
      social: CTA_DESTINATIONS.social.twitter
    }
  },
  
  byteStudio: {
    name: "Byte Studio", 
    tagline: "Design & MVP Development",
    email: BRAND_CONTACTS.agency.email, // Shared agency email
    socialLinks: SOCIAL_LINKS.agency, // Shared agency social
    logo: BRAND_ASSETS.logos.byteStudio,
    cover: BRAND_ASSETS.covers.byteStudio,
    primaryColor: "#8B5CF6",
    ctaDestinations: {
      primary: CTA_DESTINATIONS.contact.contactForm,
      portfolio: CTA_DESTINATIONS.business.portfolio,
      social: CTA_DESTINATIONS.social.twitter
    }
  },
  
  founder: {
    name: "Jobayer Hoque Siddique",
    tagline: "Founder & CEO, Nexus Creative Studio",
    email: BRAND_CONTACTS.founder.email,
    socialLinks: SOCIAL_LINKS.founder,
    logo: BRAND_ASSETS.logos.founder,
    cover: BRAND_ASSETS.covers.founder,
    primaryColor: "#F59E0B", 
    ctaDestinations: {
      primary: CTA_DESTINATIONS.contact.founderEmail,
      portfolio: CTA_DESTINATIONS.social.linkedin,
      social: CTA_DESTINATIONS.social.founderTwitter
    }
  }
};

// Utility Functions
export const getBrandConfig = (brandName: keyof typeof BRAND_CONFIGS) => {
  return BRAND_CONFIGS[brandName];
};

export const getContactEmail = (brand: 'agency' | 'founder' = 'agency') => {
  return BRAND_CONTACTS[brand].email;
};

export const getSocialLink = (platform: string, brand: 'agency' | 'founder' = 'agency') => {
  const links = SOCIAL_LINKS[brand] as Record<string, string>;
  return links[platform] || '#';
};

export const getMailtoLink = (brand: 'agency' | 'founder' = 'agency', subject?: string) => {
  const email = getContactEmail(brand);
  const subjectParam = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${email}${subjectParam}`;
};

// Export commonly used combinations
export const QUICK_LINKS = {
  // Main contact actions
  contactAgency: getMailtoLink('agency', 'New Project Inquiry'),
  contactFounder: getMailtoLink('founder', 'Consultation Request'),
  
  // Business development
  viewPortfolio: SOCIAL_LINKS.agency.portfolio,
  accessClientPortal: SOCIAL_LINKS.agency.clientPortal,
  
  // Social proof  
  agencyTwitter: SOCIAL_LINKS.agency.twitter,
  founderLinkedIn: SOCIAL_LINKS.founder.linkedin,
  agencyGitHub: SOCIAL_LINKS.agency.github,
  
  // Service platforms
  fiverr: SOCIAL_LINKS.agency.fiverr,
  upwork: SOCIAL_LINKS.agency.upwork
};

export default BRAND_CONFIGS;