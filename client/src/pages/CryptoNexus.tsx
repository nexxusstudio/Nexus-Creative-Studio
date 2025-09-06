import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  CheckCircle
} from "lucide-react";
import cryptoLogo from "@assets/CN1_1756704209882.jpg";
import cryptoCover from "@assets/CN11_1756704209882.jpg";

const services = [
  {
    title: "Smart Contract Development",
    description: "Custom smart contracts for DeFi, NFTs, and tokenization with full audit support",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
    features: ["Security Audits", "Gas Optimization", "Multi-chain Support"],
    pricing: "Starting at $5,000"
  },
  {
    title: "DeFi Platform Development",
    description: "Complete DeFi ecosystems including DEX, yield farming, and liquidity pools",
    icon: Zap,
    gradient: "from-green-500 to-emerald-500", 
    features: ["AMM Integration", "Yield Strategies", "Governance"],
    pricing: "Starting at $25,000"
  },
  {
    title: "NFT Marketplace & Minting",
    description: "End-to-end NFT solutions with custom marketplaces and minting platforms",
    icon: Target,
    gradient: "from-purple-500 to-pink-500",
    features: ["Custom Metadata", "Royalty System", "Rarity Engine"],
    pricing: "Starting at $15,000"
  },
  {
    title: "Blockchain Analytics",
    description: "Advanced on-chain analytics and dashboard solutions for data-driven decisions",
    icon: TrendingUp,
    gradient: "from-orange-500 to-red-500",
    features: ["Real-time Data", "Custom Metrics", "API Integration"],
    pricing: "Starting at $8,000"
  }
];

const caseStudies = [
  {
    title: "DeFi Yield Aggregator",
    description: "Built a yield farming aggregator that automatically optimizes returns across multiple protocols",
    metrics: { tvl: "$2.5M", apy: "18.5%", users: "1,200+" },
    technologies: ["Solidity", "React", "Node.js", "Web3.js"],
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "NFT Gaming Platform",
    description: "Developed play-to-earn gaming ecosystem with marketplace and token economics",
    metrics: { volume: "$800K", nfts: "5,000+", players: "3,500+" },
    technologies: ["Unity", "Solidity", "IPFS", "Polygon"],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Cross-chain Bridge",
    description: "Secure bridge protocol enabling asset transfers between Ethereum and BSC",
    metrics: { volume: "$1.2M", transactions: "15K+", chains: "3" },
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
                  Decentralized{" "}
                  <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent animate-glow">
                    Future
                  </span>
                </h2>

                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed" data-testid="crypto-description">
                  Leading Web3 innovation through secure smart contracts, DeFi protocols, and next-generation blockchain solutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-gradient-to-r from-green-500 to-cyan-500 text-white px-8 py-4 text-lg font-semibold hover:opacity-90 theme-transition btn-ripple"
                  data-testid="button-start-defi-project"
                >
                  <Coins className="mr-2" size={20} />
                  Start DeFi Project
                </Button>
                <Button 
                  variant="outline"
                  className="border border-border px-8 py-4 text-lg font-semibold hover:bg-secondary theme-transition"
                  data-testid="button-smart-contract-audit"
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
                      <span className="text-2xl font-bold text-green-500">$4.2M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Smart Contracts Deployed</span>
                      <span className="text-2xl font-bold text-cyan-500">127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Transaction Volume</span>
                      <span className="text-2xl font-bold text-blue-500">$12.8M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Security Audits</span>
                      <span className="text-2xl font-bold text-purple-500">100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6" ref={servicesRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="crypto-services-title">
              Web3 Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="crypto-services-description">
              Comprehensive blockchain solutions from smart contract development to full DeFi ecosystems.
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