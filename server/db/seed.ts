import { supabase } from '@shared/supabase';

export async function seedDatabase() {
  console.log('🌱 Seeding database...');

  // Seed Brands
  const { data: brands } = await supabase.from('brands').upsert([
    {
      slug: 'nexus-creative-studio',
      name: 'Nexus Creative Studio',
      tagline: 'Transforming Ideas into Digital Excellence',
      summary: 'Multi-brand creative agency specializing in web development, Web3 solutions, and design excellence',
      description: 'Nexus Creative Studio is your partner in digital transformation. We combine technical expertise with creative vision to build exceptional digital experiences.',
      logo_url: '/attached_assets/lg_1756703260455.jpg',
      is_active: true,
      display_order: 1,
      social_links: {
        email: 'nexxusstudio.agency@gmail.com',
        twitter: 'https://x.com/nexuscrativeio',
        github: 'https://github.com/nexxusstudio',
        fiverr: 'https://pro.fiverr.com/nexusstudioagen',
        portfolio: 'https://nexuscreativestudio.notion.site/Nexus-Creative-Studio-28676083f2a4812eb694fa9dde05b381'
      }
    },
    {
      slug: 'crypto-nexus',
      name: 'Crypto Nexus',
      tagline: 'Web3 & Blockchain Solutions',
      summary: 'Leading Web3 development services for decentralized applications and blockchain integration',
      logo_url: '/attached_assets/CN1_1756704209882.jpg',
      color_primary: '#06B6D4',
      is_active: true,
      display_order: 2
    },
    {
      slug: 'byte-studio',
      name: 'Byte Studio',
      tagline: 'Design & MVP Development',
      summary: 'Rapid prototyping and design excellence for startups and established brands',
      logo_url: '/attached_assets/BS1_1756704209882.jpg',
      color_primary: '#8B5CF6',
      is_active: true,
      display_order: 3
    }
  ], { onConflict: 'slug' }).select();

  // Seed Services
  await supabase.from('services').upsert([
    {
      slug: 'web-development',
      title: 'Web Development',
      category: 'Development',
      description: 'Full-stack web applications built with modern frameworks and best practices',
      price_base: 2500,
      timeline_days: 30,
      icon_name: 'Code',
      is_featured: true,
      features: ['React/Next.js', 'TypeScript', 'Database Design', 'API Integration', 'Responsive Design'],
      deliverables: ['Production-ready application', 'Source code', 'Documentation', '30-day support']
    },
    {
      slug: 'web3-blockchain',
      title: 'Web3 & Blockchain Development',
      category: 'Blockchain',
      description: 'Smart contracts, DeFi platforms, and decentralized applications',
      price_base: 5000,
      timeline_days: 45,
      icon_name: 'Shield',
      is_featured: true,
      features: ['Smart Contracts', 'DeFi Integration', 'NFT Platforms', 'Web3 Wallets'],
      deliverables: ['Deployed contracts', 'Frontend integration', 'Security audit', 'Documentation']
    },
    {
      slug: 'ui-ux-design',
      title: 'UI/UX Design',
      category: 'Design',
      description: 'Beautiful, user-centered designs that convert visitors into customers',
      price_base: 1500,
      timeline_days: 14,
      icon_name: 'Palette',
      is_featured: true,
      features: ['User Research', 'Wireframing', 'High-fidelity Mockups', 'Design System'],
      deliverables: ['Figma files', 'Design system', 'Assets', 'Style guide']
    },
    {
      slug: 'mvp-development',
      title: 'MVP Development',
      category: 'Development',
      description: 'Rapid prototyping to validate your ideas quickly and efficiently',
      price_base: 3500,
      timeline_days: 21,
      icon_name: 'Zap',
      features: ['Rapid Development', 'Core Features', 'User Testing', 'Iteration Support'],
      deliverables: ['Working MVP', 'User feedback report', 'Deployment', 'Handoff documentation']
    }
  ], { onConflict: 'slug' });

  // Seed Projects
  await supabase.from('projects').upsert([
    {
      slug: 'defi-trading-platform',
      title: 'DeFi Trading Platform',
      year: 2024,
      client_name: 'Confidential',
      categories: ['Web3', 'DeFi'],
      technologies: ['React', 'Solidity', 'Ethers.js', 'Tailwind CSS'],
      excerpt: 'Decentralized trading platform with automated market making',
      description: 'Built a fully functional DeFi trading platform with liquidity pools and yield farming capabilities.',
      cover_image_url: '/attached_assets/CN11_1756704209882.jpg',
      metrics: { users: 500, tvl: '$250K' },
      is_featured: true,
      published: true
    },
    {
      slug: 'saas-analytics-dashboard',
      title: 'SaaS Analytics Dashboard',
      year: 2024,
      client_name: 'TechStart Inc',
      categories: ['Web Development', 'SaaS'],
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Recharts'],
      excerpt: 'Real-time analytics dashboard for SaaS metrics tracking',
      description: 'Comprehensive analytics platform providing real-time insights into user behavior and business metrics.',
      cover_image_url: '/attached_assets/NCS1_1756703260455.jpg',
      metrics: { dataPoints: '10M+', responseTime: '<100ms' },
      is_featured: true,
      published: true
    },
    {
      slug: 'ecommerce-redesign',
      title: 'E-commerce Platform Redesign',
      year: 2024,
      categories: ['Design', 'Web Development'],
      technologies: ['React', 'Stripe', 'Tailwind CSS'],
      excerpt: 'Complete redesign and rebuild of e-commerce platform',
      description: 'Modernized user experience resulting in 40% increase in conversion rates.',
      cover_image_url: '/attached_assets/BS_1756703260453.jpg',
      metrics: { conversionIncrease: '+40%', revenue: '+$50K' },
      is_featured: true,
      published: true
    }
  ], { onConflict: 'slug' });

  // Seed Site Metrics (realistic early-stage numbers)
  await supabase.from('site_metrics').upsert({
    id: 1,
    revenue_total: 15000,
    projects_total: 20,
    clients_total: 13,
    months_in_business: 6,
    satisfaction_pct: 98.5,
    success_rate_pct: 100.0,
    quality_score: 4.8,
    active_clients: 5,
    repeat_clients: 3,
    avg_project_value: 1150
  });

  console.log('✅ Database seeded successfully!');
}

// Run seed if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch(console.error);
}
