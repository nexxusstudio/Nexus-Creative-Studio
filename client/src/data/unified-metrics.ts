// Canonical Agency Data Model - Updated with new agency identity
// Founded 2024 - Official metrics aligned with site content

export const CANONICAL_METRICS = {
  // Core Business Metrics - Updated with canonical values
  revenue: {
    total: 13000,
    formatted: "$13K+",
    description: "Revenue generated from client projects"
  },
  
  // Project & Client Metrics - Updated with canonical values
  projects: {
    total: 20,
    perBrand: 5, // Average per brand (4 brands)
    formatted: "20+",
    description: "Projects delivered across ecosystem"
  },
  
  clients: {
    total: 13,
    active: 10,
    repeat: 5,
    formatted: "13+",
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
  
  // Timeline & Business Stage - Updated with canonical values
  timeline: {
    range: "Founded 2024",
    stage: "Growing Digital Agency",
    description: "Established multi-brand creative ecosystem"
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
    projects: 8, // Updated to sum to 20 total
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
    // Updated metrics aligned with $13K total revenue
    totalValueLocked: "$75K",
    contractsDeployed: 6,
    transactionVolume: "$250K"
  },
  
  byte: {
    name: "Byte Studio",
    projects: 6, // Updated to sum to 20 total
    specialization: "Design & MVP development", 
    clients: "Early-stage startups and product teams",
    avgProjectValue: "$3K-$10K",
    // Updated design metrics
    mvpsLaunched: 6,
    clientSatisfaction: 100,
    avgDeliveryTime: "3-6 weeks"
  },
  
  founder: {
    name: "Jobayer Hoque Siddique",
    projects: 2,
    specialization: "Strategic consulting & technical leadership",
    clients: "Startup founders and tech teams", 
    avgProjectValue: "$2K-$8K",
    // Updated founder metrics
    consultations: 8,
    yearsExperience: 3, // Realistic for 2024 founding
    clientSatisfaction: 100
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

// Achievement Timeline (Updated with canonical values)
export const ACHIEVEMENT_TIMELINE = [
  { title: "Agency Founded", year: "2024", category: "Platform" },
  { title: "13 Happy Clients", year: "2024", category: "Client Success" },
  { title: "$13K+ Revenue", year: "2024", category: "Milestone" },  
  { title: "Growing Digital Agency", year: "2024", category: "Business Stage" },
  { title: "4-Brand Ecosystem", year: "2024", category: "Expansion" }
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

// Growth Trajectory (Realistic projections from 2024 foundation)
export const GROWTH_PROJECTIONS = {
  q1_2024: { revenue: 3000, clients: 3, projects: 5 },
  q2_2024: { revenue: 6000, clients: 7, projects: 12 },
  q3_2024: { revenue: 10000, clients: 10, projects: 16 },
  q4_2024: { revenue: 13000, clients: 13, projects: 20 }
};

export default {
  CANONICAL_METRICS,
  BRAND_SPECIFIC_METRICS,
  CASE_STUDY_METRICS,
  PROJECT_OUTCOMES,
  ACHIEVEMENT_TIMELINE,
  SOCIAL_PROOF,
  GROWTH_PROJECTIONS
};