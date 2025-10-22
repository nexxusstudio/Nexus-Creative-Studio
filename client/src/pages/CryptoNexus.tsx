import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BRAND_SPECIFIC_METRICS, CASE_STUDY_METRICS } from "@/data/unified-metrics";
import { BRAND_CONFIGS, QUICK_LINKS } from "@/data/brand-links";
import { 
  Shield, 
  Zap, 
  Target, 
  TrendingUp, 
  Lock,
  Coins,
  Network,
  Database,
  ArrowRight,
  CheckCircle,
  Building2,
  Crown,
  Rocket
} from "lucide-react";
import cryptoLogo from "@assets/CN1_1756704209882.jpg";
import cryptoCover from "@assets/CN11_1756704209882.jpg";

const pricingTiers = [
  {
    tier: "CORE",
    name: "Web3 Foundation",
    subtitle: "Essential blockchain solutions for emerging projects",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
    priceRange: "$5,000 - $15,000",
    popular: false,
    features: [
      "Basic smart contract development",
      "Token creation & deployment",
      "Simple NFT collections",
      "Basic security audit",
      "Multi-chain compatibility",
      "30-day technical support"
    ],
    services: [
      { name: "Smart Contract Development", price: "$5,000 - $10,000" },
      { name: "Token & NFT Creation", price: "$8,000 - $12,000" },
      { name: "Basic DeFi Components", price: "$10,000 - $15,000" }
    ]
  },
  {
    tier: "GROWTH", 
    name: "DeFi Innovation",
    subtitle: "Advanced protocols for scaling Web3 businesses",
    icon: Zap,
    gradient: "from-green-500 to-emerald-500",
    priceRange: "$15,000 - $50,000",
    popular: true,
    features: [
      "Complex smart contract architecture",
      "Advanced DeFi protocol development",
      "Sophisticated NFT platforms",
      "Comprehensive security audits",
      "Cross-chain bridge development",
      "Governance token implementation",
      "90-day support & optimization"
    ],
    services: [
      { name: "DeFi Protocol Development", price: "$25,000 - $50,000" },
      { name: "Advanced NFT Platforms", price: "$20,000 - $35,000" },
      { name: "Cross-chain Solutions", price: "$15,000 - $30,000" }
    ]
  },
  {
    tier: "ENTERPRISE",
    name: "Institutional Web3", 
    subtitle: "Enterprise-grade blockchain infrastructure",
    icon: Building2,
    gradient: "from-yellow-500 to-orange-500",
    priceRange: "$50,000 - $250,000+",
    popular: false,
    features: [
      "Custom blockchain development",
      "Institutional DeFi infrastructure",
      "Enterprise custody solutions", 
      "Advanced compliance integration",
      "Custom consensus mechanisms",
      "Institutional APIs & analytics",
      "White-glove support & SLA guarantees"
    ],
    services: [
      { name: "Custom Blockchain Networks", price: "$75,000 - $200,000" },
      { name: "Institutional DeFi Infrastructure", price: "$100,000 - $250,000" },
      { name: "Enterprise Web3 Integration", price: "$50,000 - $150,000" }
    ]
  }
];

const services = [
  {
    title: "Enterprise Smart Contracts",
    description: "Institutional-grade smart contract development with comprehensive security audits and gas optimization for maximum efficiency",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
    features: ["Security-First Development", "Gas Optimization", "Multi-chain Deployment"],
    pricing: "Starting at $12,000"
  },
  {
    title: "DeFi Protocol Architecture",
    description: "Complete DeFi ecosystem development including advanced AMMs, yield aggregators, and governance mechanisms",
    icon: Zap,
    gradient: "from-green-500 to-emerald-500", 
    features: ["Custom AMM Design", "Yield Optimization", "DAO Governance"],
    pricing: "Starting at $50,000"
  },
  {
    title: "NFT & Tokenization Platforms",
    description: "Sophisticated NFT marketplaces, fractional ownership systems, and tokenization platforms with advanced utility features",
    icon: Target,
    gradient: "from-purple-500 to-pink-500",
    features: ["Advanced Metadata", "Royalty Distribution", "Utility Integration"],
    pricing: "Starting at $25,000"
  },
  {
    title: "Blockchain Infrastructure",
    description: "Enterprise blockchain analytics, cross-chain bridges, and infrastructure solutions for institutional adoption",
    icon: TrendingUp,
    gradient: "from-orange-500 to-red-500",
    features: ["Cross-chain Solutions", "Enterprise Analytics", "Institutional APIs"],
    pricing: "Starting at $30,000"
  }
];

const caseStudies = [
  {
    title: "DeFi Yield Aggregator",
    description: "Built a yield farming aggregator that automatically optimizes returns across multiple protocols",
    metrics: { 
      tvl: CASE_STUDY_METRICS.deFiYieldAggregator.tvl, 
      apy: CASE_STUDY_METRICS.deFiYieldAggregator.apy, 
      users: CASE_STUDY_METRICS.deFiYieldAggregator.users 
    },
    technologies: ["Solidity", "React", "Node.js", "Web3.js"],
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "NFT Gaming Platform",
    description: "Developed play-to-earn gaming ecosystem with marketplace and token economics",
    metrics: { 
      volume: CASE_STUDY_METRICS.nftGamingPlatform.volume, 
      nfts: CASE_STUDY_METRICS.nftGamingPlatform.nfts, 
      players: CASE_STUDY_METRICS.nftGamingPlatform.players 
    },
    technologies: ["Unity", "Solidity", "IPFS", "Polygon"],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Cross-chain Bridge",
    description: "Secure bridge protocol enabling asset transfers between Ethereum and BSC",
    metrics: { 
      volume: CASE_STUDY_METRICS.crossChainBridge.volume, 
      transactions: CASE_STUDY_METRICS.crossChainBridge.transactions, 
      chains: CASE_STUDY_METRICS.crossChainBridge.chains 
    },
    technologies: ["Solidity", "ChainLink", "React", "TypeScript"],
    gradient: "from-blue-500 to-cyan-500"
  }
];

export default function CryptoNexus() {
  const heroRef = useScrollAnimation();
  const servicesRef = useScrollAnimation();
  const caseStudiesRef = useScrollAnimation();
  const statsRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <ParticleBackground />
        
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${cryptoCover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/80 z-1"></div>

        <div className="content-layer max-w-7xl mx-auto px-6 py-20 z-10" ref={heroRef}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <img 
                    src={cryptoLogo} 
                    alt="Crypto Nexus Logo" 
                    className="w-16 h-16 rounded-2xl"
                    data-testid="crypto-nexus-logo"
                  />
                  <div>
                    <h1 className="text-3xl font-bold">Crypto Nexus</h1>
                    <p className="text-muted-foreground">Web3 & Blockchain Division</p>
                  </div>
                </div>

                <h2 className="text-5xl lg:text-7xl font-bold leading-tight" data-testid="crypto-title">
                  Next-Gen{" "}
                  <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent animate-glow">
                    Web3
                  </span>
                  <br />
                  Solutions
                </h2>

                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed" data-testid="crypto-description">
                  Premium Web3 development division specializing in enterprise-grade DeFi protocols, institutional-level smart contracts, and revolutionary blockchain infrastructure that powers the future of finance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-gradient-to-r from-green-500 to-cyan-500 text-white px-8 py-4 text-lg font-semibold hover:opacity-90 theme-transition btn-ripple"
                  data-testid="button-start-defi-project"
                  onClick={() => window.open(QUICK_LINKS.contactAgency, '_blank')}
                >
                  <Coins className="mr-2" size={20} />
                  Start DeFi Project
                </Button>
                <Button 
                  variant="outline"
                  className="border border-border px-8 py-4 text-lg font-semibold hover:bg-secondary theme-transition"
                  data-testid="button-smart-contract-audit"
                  onClick={() => window.open(QUICK_LINKS.contactAgency, '_blank')}
                >
                  <Shield className="mr-2" size={20} />
                  Smart Contract Audit
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-3xl transform -rotate-3 animate-morphing"></div>
              <Card className="relative bg-card/80 backdrop-blur-sm border border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center" data-testid="blockchain-stats-title">Blockchain Metrics</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Value Locked</span>
                      <span className="text-2xl font-bold text-green-500">{BRAND_SPECIFIC_METRICS.crypto.totalValueLocked}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Smart Contracts Deployed</span>
                      <span className="text-2xl font-bold text-cyan-500">{BRAND_SPECIFIC_METRICS.crypto.contractsDeployed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Transaction Volume</span>
                      <span className="text-2xl font-bold text-blue-500">{BRAND_SPECIFIC_METRICS.crypto.transactionVolume}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Security Rating</span>
                      <span className="text-2xl font-bold text-purple-500">A+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Tiers */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6" ref={servicesRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="crypto-pricing-title">
              Web3 Investment Tiers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="crypto-pricing-description">
              Three specialized service tiers engineered for Web3 innovation, from emerging projects to institutional-grade blockchain infrastructure.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={tier.tier} 
                className={`group hover-lift bg-card rounded-2xl border theme-transition hover:shadow-lg relative ${
                  tier.popular ? 'border-primary scale-105 shadow-lg' : 'border-border'
                }`}
                data-testid={`crypto-pricing-tier-${index}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-green-500 to-cyan-500 text-white px-6 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${tier.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <tier.icon className="text-white" size={32} />
                    </div>
                    
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {tier.tier} TIER
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2" data-testid={`crypto-tier-name-${index}`}>
                      {tier.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4">
                      {tier.subtitle}
                    </p>
                    
                    <div className="mb-6">
                      <div className="text-primary font-bold text-2xl">{tier.priceRange}</div>
                      <div className="text-xs text-muted-foreground">Project investment range</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li 
                        key={feature} 
                        className="flex items-start text-sm"
                        data-testid={`crypto-tier-feature-${index}-${featureIndex}`}
                      >
                        <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full transition-all duration-300 group ${
                      tier.popular 
                        ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white hover:opacity-90' 
                        : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                    }`}
                    data-testid={`crypto-tier-cta-${index}`}
                  >
                    Get Quote
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Service Breakdown */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Service Breakdown by Tier</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each tier includes specialized Web3 services scaled to match your project complexity and institutional requirements.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {pricingTiers.map((tier, tierIndex) => (
                <div key={tier.tier} className="bg-background/50 rounded-xl p-6 border border-border">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${tier.gradient} rounded-xl flex items-center justify-center mr-4`}>
                      <tier.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{tier.name}</h4>
                      <p className="text-sm text-muted-foreground">{tier.tier} Tier</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {tier.services.map((service, serviceIndex) => (
                      <div key={service.name} className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm">{service.name}</span>
                        <span className="text-sm font-semibold text-primary">{service.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Services Section for backward compatibility */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="crypto-services-title">
              Specialized Web3 Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="crypto-services-description">
              Four core competencies that power our comprehensive Web3 development services across all investment tiers.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.title}
                className="group hover-lift bg-card border border-border theme-transition"
                data-testid={`crypto-service-${index}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center`}>
                      <service.icon className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" data-testid={`crypto-service-title-${index}`}>
                        {service.title}
                      </h3>
                      <div className="text-primary font-semibold">{service.pricing}</div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6" data-testid={`crypto-service-description-${index}`}>
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div 
                        key={feature}
                        className="flex items-center space-x-2"
                        data-testid={`crypto-service-feature-${index}-${featureIndex}`}
                      >
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-white hover:opacity-90 theme-transition"
                    data-testid={`crypto-service-cta-${index}`}
                  >
                    Get Quote <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6" ref={caseStudiesRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="crypto-case-studies-title">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="crypto-case-studies-description">
              Real-world blockchain solutions that have generated millions in value and thousands of users.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card 
                key={study.title}
                className="group hover-lift bg-card border border-border theme-transition overflow-hidden"
                data-testid={`crypto-case-study-${index}`}
              >
                <div className={`h-2 bg-gradient-to-r ${study.gradient}`}></div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4" data-testid={`crypto-case-study-title-${index}`}>
                    {study.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6" data-testid={`crypto-case-study-description-${index}`}>
                    {study.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(study.metrics).map(([key, value], metricIndex) => (
                      <div key={key} className="text-center" data-testid={`crypto-case-study-metric-${index}-${metricIndex}`}>
                        <div className="text-lg font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground uppercase">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={tech}
                        variant="secondary"
                        className="bg-secondary"
                        data-testid={`crypto-case-study-tech-${index}-${techIndex}`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    variant="outline"
                    className="w-full border border-border hover:bg-secondary"
                    data-testid={`crypto-case-study-details-${index}`}
                  >
                    View Full Case Study <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6" ref={statsRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="crypto-tech-stack-title">
              Technology Stack
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="crypto-tech-stack-description">
              Cutting-edge tools and frameworks that power our blockchain solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <Card className="bg-card border border-border hover-lift text-center">
              <CardContent className="p-8">
                <Network className="text-blue-500 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2" data-testid="tech-blockchain-title">Blockchain</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Ethereum</div>
                  <div>Polygon</div>
                  <div>Arbitrum</div>
                  <div>Binance Smart Chain</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover-lift text-center">
              <CardContent className="p-8">
                <Lock className="text-green-500 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2" data-testid="tech-smart-contracts-title">Smart Contracts</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Solidity</div>
                  <div>Hardhat</div>
                  <div>OpenZeppelin</div>
                  <div>Foundry</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover-lift text-center">
              <CardContent className="p-8">
                <Database className="text-purple-500 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2" data-testid="tech-infrastructure-title">Infrastructure</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>IPFS</div>
                  <div>The Graph</div>
                  <div>Alchemy</div>
                  <div>Infura</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover-lift text-center">
              <CardContent className="p-8">
                <Zap className="text-orange-500 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2" data-testid="tech-frontend-title">Frontend</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>React</div>
                  <div>Web3.js</div>
                  <div>Ethers.js</div>
                  <div>Wagmi</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold" data-testid="crypto-cta-title">
              Ready to Enter{" "}
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Web3?
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="crypto-cta-description">
              Let's build your blockchain solution with security, scalability, and innovation at the core.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-green-500 to-cyan-500 text-white px-8 py-4 text-lg font-semibold hover:opacity-90 theme-transition btn-ripple"
                data-testid="button-crypto-consultation"
              >
                Free Web3 Consultation
              </Button>
              <Button 
                variant="outline"
                className="border border-border px-8 py-4 text-lg font-semibold hover:bg-secondary theme-transition"
                data-testid="button-crypto-portfolio"
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}