import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Building2, 
  Rocket, 
  Users, 
  Target, 
  TrendingUp, 
  Globe,
  Code,
  Palette,
  Shield,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";
import nexusLogo from "@assets/NCS11_1756704209883.jpg";
import nexusCover from "@assets/NCS1_1756703260455.jpg";

const brands = [
  {
    name: "Crypto Nexus",
    description: "Web3 & Blockchain Solutions",
    icon: Shield,
    color: "from-green-500 to-cyan-500",
    link: "/crypto-nexus",
    specialties: ["Smart Contracts", "DeFi", "NFT Platforms"],
    clients: "15+ Projects"
  },
  {
    name: "Byte Studio",
    description: "Design & MVP Development",
    icon: Palette,
    color: "from-purple-500 to-pink-500", 
    link: "/byte-studio",
    specialties: ["UI/UX Design", "Rapid Prototyping", "Mobile Apps"],
    clients: "25+ MVPs"
  },
  {
    name: "Jobayer Hoque",
    description: "Strategic Leadership",
    icon: Users,
    color: "from-blue-500 to-indigo-500",
    link: "/founder",
    specialties: ["Technical Strategy", "Team Building", "Product Vision"],
    clients: "50+ Consultations"
  }
];

const serviceFramework = [
  {
    category: "AI Solutions",
    description: "Intelligent automation and AI-powered applications",
    icon: Target,
    services: ["AI Integration", "Machine Learning", "Automation", "Chatbots"],
    gradient: "from-orange-500 to-red-500"
  },
  {
    category: "Web Development", 
    description: "Modern web applications with cutting-edge technology",
    icon: Code,
    services: ["React/Next.js", "Full-Stack", "API Development", "Database Design"],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    category: "Blockchain & Crypto",
    description: "Decentralized applications and Web3 solutions",
    icon: Shield,
    services: ["Smart Contracts", "DeFi Platforms", "NFT Systems", "Tokenization"],
    gradient: "from-green-500 to-emerald-500"
  },
  {
    category: "Add-ons",
    description: "Enhanced features and integrations for complete solutions",
    icon: Globe,
    services: ["Payment Integration", "Analytics", "SEO Optimization", "Security"],
    gradient: "from-purple-500 to-pink-500"
  }
];

const companyStats = [
  {
    metric: "50+",
    label: "Projects Completed",
    description: "Successful deliveries across all verticals"
  },
  {
    metric: "3",
    label: "Specialized Brands",
    description: "Focused expertise in key technology areas"
  },
  {
    metric: "98%",
    label: "Client Satisfaction",
    description: "Consistent high-quality delivery"
  },
  {
    metric: "5+",
    label: "Years of Innovation",
    description: "Proven track record in emerging technologies"
  }
];

const engagementProcess = [
  {
    phase: "Discovery & Strategy",
    description: "Free consultation to understand your vision and requirements",
    duration: "30-60 min call",
    icon: Target,
    cta: "Book Free Call"
  },
  {
    phase: "Transparent Proposal",
    description: "Detailed roadmap with timeline, deliverables, and transparent pricing",
    duration: "1-2 business days",
    icon: Building2,
    cta: "Review Proposal"
  },
  {
    phase: "Build & Deliver",
    description: "Agile development with regular updates and milestone reviews",
    duration: "2-12 weeks",
    icon: Rocket,
    cta: "Track Progress"
  },
  {
    phase: "Support & Scale",
    description: "Ongoing maintenance, updates, and scaling support packages",
    duration: "Ongoing",
    icon: TrendingUp,
    cta: "Explore Retainers"
  }
];

export default function NexusStudio() {
  const heroRef = useScrollAnimation();
  const brandsRef = useScrollAnimation();
  const servicesRef = useScrollAnimation();
  const processRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <ParticleBackground />
        
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${nexusCover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70 z-1"></div>

        <div className="content-layer max-w-7xl mx-auto px-6 py-20 z-10" ref={heroRef}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <img 
                    src={nexusLogo} 
                    alt="Nexus Creative Studio Logo" 
                    className="w-16 h-16 rounded-2xl"
                    data-testid="nexus-studio-logo"
                  />
                  <div>
                    <h1 className="text-3xl font-bold">Nexus Creative Studio</h1>
                    <p className="text-muted-foreground">Multi-Brand Digital Agency</p>
                  </div>
                </div>

                <h2 className="text-5xl lg:text-7xl font-bold leading-tight" data-testid="nexus-title">
                  Where{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-glow">
                    Innovation
                  </span>
                  <br />
                  Meets Excellence
                </h2>

                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed" data-testid="nexus-description">
                  A comprehensive digital agency with specialized brands serving Web3, design, and strategic technology leadership across multiple verticals.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:opacity-90 theme-transition btn-ripple"
                  data-testid="button-explore-brands"
                >
                  <Building2 className="mr-2" size={20} />
                  Explore Our Brands
                </Button>
                <Button 
                  variant="outline"
                  className="border border-border px-8 py-4 text-lg font-semibold hover:bg-secondary theme-transition"
                  data-testid="button-portfolio-nexus"
                >
                  <Globe className="mr-2" size={20} />
                  View Portfolio
                </Button>
              </div>

              {/* Company Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {companyStats.map((stat, index) => (
                  <div key={stat.label} className="text-center" data-testid={`nexus-stat-${index}`}>
                    <div className="text-3xl font-bold text-primary animate-neon-pulse">{stat.metric}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl transform -rotate-3 animate-morphing"></div>
              <Card className="relative bg-card/80 backdrop-blur-sm border border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center" data-testid="nexus-vision-title">Our Vision</h3>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">Digital Transformation</div>
                      <div className="text-muted-foreground">Through Innovation</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span>Future-Ready Technology</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span>Scalable Solutions</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span>Strategic Partnership</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Portfolio */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6" ref={brandsRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="nexus-brands-title">
              Our Specialized Brands
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="nexus-brands-description">
              Each brand represents deep expertise in its respective domain, delivering specialized solutions with proven results.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <Card 
                key={brand.name}
                className="group hover-lift bg-card border border-border theme-transition overflow-hidden"
                data-testid={`nexus-brand-${index}`}
              >
                <div className={`h-2 bg-gradient-to-r ${brand.color}`}></div>
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${brand.color} rounded-2xl flex items-center justify-center`}>
                      <brand.icon className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" data-testid={`nexus-brand-title-${index}`}>
                        {brand.name}
                      </h3>
                      <p className="text-muted-foreground">{brand.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Specializations:</span>
                      <span className="font-semibold">{brand.specialties.length} Areas</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {brand.specialties.map((specialty, specialtyIndex) => (
                        <Badge 
                          key={specialty}
                          variant="secondary"
                          className="bg-secondary"
                          data-testid={`nexus-brand-specialty-${index}-${specialtyIndex}`}
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 text-sm">
                      <Star className="text-yellow-500" size={16} />
                      <span className="text-muted-foreground">{brand.clients}</span>
                    </div>
                  </div>

                  <Link href={brand.link}>
                    <Button 
                      className={`w-full bg-gradient-to-r ${brand.color} text-white hover:opacity-90 theme-transition`}
                      data-testid={`nexus-brand-cta-${index}`}
                    >
                      Explore {brand.name} <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Framework */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6" ref={servicesRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="nexus-services-title">
              Complete Service Framework
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="nexus-services-description">
              End-to-end technology solutions across all major digital transformation areas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {serviceFramework.map((framework, index) => (
              <Card 
                key={framework.category}
                className="group hover-lift bg-card border border-border theme-transition"
                data-testid={`nexus-service-framework-${index}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${framework.gradient} rounded-2xl flex items-center justify-center`}>
                      <framework.icon className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" data-testid={`nexus-service-framework-title-${index}`}>
                        {framework.category}
                      </h3>
                      <p className="text-muted-foreground">{framework.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {framework.services.map((service, serviceIndex) => (
                      <div 
                        key={service}
                        className="flex items-center space-x-2"
                        data-testid={`nexus-service-framework-item-${index}-${serviceIndex}`}
                      >
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-sm text-muted-foreground">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Process */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6" ref={processRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="nexus-process-title">
              Our Engagement Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="nexus-process-description">
              A transparent, step-by-step approach that ensures project success from concept to deployment.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {engagementProcess.map((phase, index) => (
              <Card 
                key={phase.phase}
                className="bg-card border border-border hover-lift text-center theme-transition"
                data-testid={`nexus-process-phase-${index}`}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <phase.icon className="text-white" size={32} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4" data-testid={`nexus-process-phase-title-${index}`}>
                    {phase.phase}
                  </h3>
                  <p className="text-muted-foreground mb-4" data-testid={`nexus-process-phase-description-${index}`}>
                    {phase.description}
                  </p>
                  <div className="text-sm text-primary font-semibold mb-6">{phase.duration}</div>
                  
                  <Button 
                    variant="outline"
                    className="border border-border hover:bg-secondary w-full"
                    data-testid={`nexus-process-phase-cta-${index}`}
                  >
                    {phase.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Master Directory & Contact */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="nexus-directory-title">
              Master Directory
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="nexus-directory-description">
              Connect with us across all platforms and communication channels.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* HQ & Communication */}
            <Card className="bg-card border border-border hover-lift">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6" data-testid="nexus-hq-title">Headquarters & Communication</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-secondary rounded-lg">
                    <Building2 className="text-primary" size={20} />
                    <div>
                      <div className="font-semibold">Digital HQ</div>
                      <div className="text-sm text-muted-foreground">Global Remote Operations</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline"
                      className="border border-border hover:bg-secondary"
                      data-testid="button-whatsapp-contact"
                    >
                      WhatsApp
                    </Button>
                    <Button 
                      variant="outline"
                      className="border border-border hover:bg-secondary"
                      data-testid="button-slack-contact"
                    >
                      Slack
                    </Button>
                    <Button 
                      variant="outline"
                      className="border border-border hover:bg-secondary"
                      data-testid="button-discord-contact"
                    >
                      Discord
                    </Button>
                    <Button 
                      variant="outline"
                      className="border border-border hover:bg-secondary"
                      data-testid="button-zoom-contact"
                    >
                      Zoom
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Brand Profiles Grid */}
            <Card className="bg-card border border-border hover-lift">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6" data-testid="nexus-social-title">Social & Professional Profiles</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: "LinkedIn", color: "text-blue-500", platform: "linkedin" },
                    { name: "GitHub", color: "text-gray-400", platform: "github" },
                    { name: "Twitter", color: "text-blue-400", platform: "twitter" },
                    { name: "Medium", color: "text-green-500", platform: "medium" },
                    { name: "Fiverr", color: "text-green-600", platform: "fiverr" },
                    { name: "Upwork", color: "text-green-700", platform: "upwork" }
                  ].map((social, socialIndex) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      className="border border-border hover:bg-secondary text-center p-4 h-auto flex flex-col items-center space-y-2"
                      data-testid={`nexus-social-${socialIndex}`}
                    >
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center ${social.color}`}>
                        <div className="w-4 h-4 bg-current rounded"></div>
                      </div>
                      <div className="text-xs font-semibold">{social.name}</div>
                    </Button>
                  ))}
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
            <h2 className="text-4xl lg:text-5xl font-bold" data-testid="nexus-cta-title">
              Ready to Build the{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Future?
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="nexus-cta-description">
              Whether you need Web3 solutions, design expertise, or strategic leadership - we have the specialized brand for your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:opacity-90 theme-transition btn-ripple"
                data-testid="button-nexus-consultation"
              >
                Start Free Consultation
              </Button>
              <Button 
                variant="outline"
                className="border border-border px-8 py-4 text-lg font-semibold hover:bg-secondary theme-transition"
                data-testid="button-nexus-portfolio"
              >
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}