// Early-Stage Agency Data Model - Unified across all Nexus Ecosystem brands
// 2026-2027 Vision - Consistent metrics for emerging multi-brand ecosystem

export const EARLY_STAGE_METRICS = {
  // Core Business Metrics
  revenue: {
    total: 22000,
    formatted: "$22K+",
    description: "Revenue generated from client projects"
  },
  
  // Project & Client Metrics  
  projects: {
    total: 17,
    perBrand: 6, // Average per brand (4 brands)
    formatted: "17+",
    description: "Projects delivered across ecosystem"
  },
  
  clients: {
    total: 14,
    active: 8,
    repeat: 5,
    formatted: "14+",
    description: "Happy clients served"
  },
  
  // Performance Metrics
  satisfaction: {
    percentage: 100,
    formatted: "100%",
    description: "Perfect client satisfaction rate"
  },
  
  successRate: {
    percentage: 100,
    formatted: "100%", 
    description: "Project completion success rate"
  },
  
  qualityScore: {
    score: 4.9,
    max: 5.0,
    formatted: "4.9/5",
    description: "Quality rating across all projects"
  },
  
  // Timeline & Business Stage
  timeline: {
    range: "2026-2027",
    stage: "Early Growth Stage",
    description: "Emerging multi-brand ecosystem"
  },
  
  // Geographic & Market Reach
  countries: {
    count: 4,
    formatted: "4 Countries",
    description: "International client reach"
  },
  
  // Business Operations
  monthsInBusiness: 8,
  avgProjectValue: 1300,
  avgProjectTimeline: "3-6 weeks"
};

// Brand-Specific Metrics (maintaining consistency while allowing specialization)
export const BRAND_SPECIFIC_METRICS = {
  nexus: {
    name: "Nexus Creative Studio",
    projects: 6,
    specialization: "Full-stack digital solutions",
    clients: "Technology startups and SMBs",
    avgProjectValue: "$2K-$8K"
  },
  
  crypto: {
    name: "Crypto Nexus", 
    projects: 4,
    specialization: "Web3 & blockchain development",
    clients: "DeFi protocols and Web3 startups",
    avgProjectValue: "$5K-$15K",
    // Realistic early-stage Web3 metrics
    totalValueLocked: "$125K", // Scaled down from $8.5M
    contractsDeployed: 8, // Scaled down from 247
    transactionVolume: "$450K" // Scaled down from $25.2M
  },
  
  byte: {
    name: "Byte Studio",
    projects: 5,
    specialization: "Design & MVP development", 
    clients: "Early-stage startups and product teams",
    avgProjectValue: "$3K-$10K",
    // Realistic early-stage design metrics
    mvpsLaunched: 8, // Scaled down from 50+
    clientSatisfaction: 100, // Maintained high standard
    avgDeliveryTime: "3-6 weeks" // Realistic timeline
  },
  
  founder: {
    name: "Jobayer Hoque Siddique",
    projects: 2, // Personal consulting projects
    specialization: "Strategic consulting & technical leadership",
    clients: "Startup founders and tech teams", 
    avgProjectValue: "$2K-$8K",
    // Realistic founder metrics
    consultations: 12, // Scaled down from 50+
    yearsExperience: 5, // Realistic for early-stage
    clientSatisfaction: 100 // Maintained high standard
  }
};

// Case Study Metrics (Realistic for early-stage agency)
export const CASE_STUDY_METRICS = {
  deFiYieldAggregator: {
    tvl: "$35K", // Scaled down from $2.5M
    apy: "12.5%", // Realistic for smaller protocol
    users: "85+" // Scaled down from 1,200+
  },
  
  nftGamingPlatform: {
    volume: "$18K", // Scaled down from $800K
    nfts: "250+", // Scaled down from 5,000+
    players: "180+" // Scaled down from 3,500+
  },
  
  crossChainBridge: {
    volume: "$28K", // Scaled down from $1.2M
    transactions: "320+", // Scaled down from 15K+
    chains: 2 // Reduced from 3
  },
  
  ecommerceDashboard: {
    conversion: "+35%", // Scaled down from +45%
    users: "450+", // Scaled down from 2K+
    rating: "4.8/5" // Slightly reduced from 4.9/5
  },
  
  fitnessAppMvp: {
    downloads: "1.2K+", // Scaled down from 10K+
    retention: "72%", // Slightly reduced from 78%
    rating: "4.6/5" // Slightly reduced from 4.7/5
  },
  
  saasLandingPage: {
    conversion: "+85%", // Scaled down from +120%
    leads: "180+", // Scaled down from 500+
    ctr: "8.5%" // Reduced from 12%
  }
};

// Portfolio Project Outcomes (Realistic early-stage results)
export const PROJECT_OUTCOMES = {
  freelanceDashboard: "45% time saved on admin tasks",
  startupLandingPage: "35% increase in conversions", 
  clientPortalSystem: "100% client satisfaction",
  aiContentEngine: "2.5x faster content creation",
  ecommerceIntegration: "25% increase in sales efficiency"
};

// Achievement Timeline (Consistent 2026-2027 focus)
export const ACHIEVEMENT_TIMELINE = [
  { title: "Fiverr Pro Verified", year: "2026", category: "Platform" },
  { title: "14 Happy Clients", year: "2026-2027", category: "Client Success" },
  { title: "$22K+ Revenue", year: "2026-2027", category: "Milestone" },
  { title: "Early Growth Stage", year: "2026-2027", category: "Business Stage" },
  { title: "4-Brand Ecosystem", year: "2026-2027", category: "Expansion" }
];

// Social Proof Elements
export const SOCIAL_PROOF = {
  platforms: {
    fiverr: "Pro Verified",
    upwork: "Top Rated",
    contra: "Featured", 
    freelancer: "Preferred"
  },
  
  testimonialMetrics: {
    averageRating: 4.9,
    totalReviews: 28,
    repeatClientRate: "60%"
  }
};

// Growth Trajectory (Early-stage realistic projections)
export const GROWTH_PROJECTIONS = {
  q1_2026: { revenue: 8000, clients: 5, projects: 6 },
  q2_2026: { revenue: 15000, clients: 9, projects: 11 },
  q3_2026: { revenue: 22000, clients: 14, projects: 17 },
  q4_2026: { revenue: 30000, clients: 18, projects: 22 }
};

export default {
  EARLY_STAGE_METRICS,
  BRAND_SPECIFIC_METRICS,
  CASE_STUDY_METRICS,
  PROJECT_OUTCOMES,
  ACHIEVEMENT_TIMELINE,
  SOCIAL_PROOF,
  GROWTH_PROJECTIONS
};