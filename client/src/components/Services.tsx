import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Brain, Code, Zap, TrendingUp, Check, ArrowRight, Crown, Rocket, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pricingTiers = [
  {
    tier: "CORE",
    name: "Digital Foundation",
    subtitle: "Essential solutions for ambitious startups",
    icon: Rocket,
    gradient: "from-blue-500 to-cyan-500",
    priceRange: "$2,000 - $8,000",
    popular: false,
    features: [
      "Professional website development",
      "Basic AI chatbot integration", 
      "Workflow automation setup",
      "Growth analytics foundation",
      "30-day support included"
    ],
    services: [
      {
        name: "AI-Powered Solutions",
        description: "Custom chatbots and basic automation systems",
        price: "$3,000 - $6,000"
      },
      {
        name: "Web Development", 
        description: "Professional websites and landing pages",
        price: "$2,000 - $5,000"
      },
      {
        name: "Strategic Automation",
        description: "Workflow optimization and CRM setup",
        price: "$2,500 - $7,000"
      },
      {
        name: "Growth Engineering",
        description: "Basic analytics and conversion optimization",
        price: "$3,000 - $8,000"
      }
    ]
  },
  {
    tier: "GROWTH",
    name: "Innovation Engine",
    subtitle: "Advanced capabilities for scaling businesses",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500",
    priceRange: "$8,000 - $25,000",
    popular: true,
    features: [
      "Advanced AI applications & ML integration",
      "Complex web applications",
      "Enterprise automation systems",
      "Advanced analytics & marketing automation",
      "Dedicated project manager",
      "90-day extended support"
    ],
    services: [
      {
        name: "AI-Powered Solutions",
        description: "Advanced AI applications and ML integration",
        price: "$8,000 - $18,000"
      },
      {
        name: "Web Development",
        description: "Complex web apps and e-commerce platforms", 
        price: "$10,000 - $20,000"
      },
      {
        name: "Strategic Automation",
        description: "Enterprise automation and API development",
        price: "$8,000 - $15,000"
      },
      {
        name: "Growth Engineering", 
        description: "Advanced analytics and marketing automation",
        price: "$8,000 - $25,000"
      }
    ]
  },
  {
    tier: "ENTERPRISE",
    name: "Digital Transformation",
    subtitle: "Industry-leading solutions for market leaders",
    icon: Crown,
    gradient: "from-yellow-500 to-orange-500",
    priceRange: "$25,000 - $100,000+",
    popular: false,
    features: [
      "Custom AI platforms & enterprise ML",
      "Enterprise applications & microservices",
      "Enterprise-wide automation",
      "Complete growth stack & data infrastructure",
      "Dedicated team allocation",
      "White-glove support & priority access"
    ],
    services: [
      {
        name: "AI-Powered Solutions",
        description: "Custom AI platforms and enterprise ML systems",
        price: "$25,000 - $75,000"
      },
      {
        name: "Web Development",
        description: "Enterprise applications and microservices architecture",
        price: "$30,000 - $100,000"
      },
      {
        name: "Strategic Automation",
        description: "Enterprise-wide automation and legacy integration",
        price: "$25,000 - $60,000"
      },
      {
        name: "Growth Engineering",
        description: "Complete growth stack and data infrastructure",
        price: "$35,000 - $80,000"
      }
    ]
  }
];

export function Services() {
  const servicesRef = useScrollAnimation();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6" ref={servicesRef}>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="services-title">
            Service Excellence & Investment Tiers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-description">
            Three expertly crafted service tiers designed to accelerate your business growth, from startup foundation to enterprise transformation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={tier.tier} 
              className={`group hover-lift bg-card rounded-2xl border theme-transition hover:shadow-lg relative ${
                tier.popular ? 'border-primary scale-105 shadow-lg' : 'border-border'
              }`}
              data-testid={`pricing-tier-${index}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-6 py-1">
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
                  
                  <h3 className="text-2xl font-bold mb-2" data-testid={`tier-name-${index}`}>
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
                      data-testid={`tier-feature-${index}-${featureIndex}`}
                    >
                      <Check className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={scrollToContact}
                  className={`w-full transition-all duration-300 group ${
                    tier.popular 
                      ? 'bg-primary text-primary-foreground hover:opacity-90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                  }`}
                  data-testid={`tier-cta-${index}`}
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Details Section */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Detailed Service Offerings</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each tier includes our four core service verticals, scaled to match your business needs and growth objectives.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* AI-Powered Solutions */}
            <div className="bg-background/50 rounded-xl p-6 border border-border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <Brain className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold">AI-Powered Solutions</h4>
                  <p className="text-sm text-muted-foreground">Intelligent automation & machine learning</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm">Core: Custom chatbots & basic automation</span>
                  <span className="text-sm font-semibold text-primary">$3K - $6K</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm">Growth: Advanced AI apps & ML integration</span>
                  <span className="text-sm font-semibold text-primary">$8K - $18K</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm">Enterprise: Custom AI platforms</span>
                  <span className="text-sm font-semibold text-primary">$25K - $75K</span>
                </div>
              </div>
            </div>

            {/* Web Development */}
            <div className="bg-background/50 rounded-xl p-6 border border-border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                  <Code className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Web Development</h4>
                  <p className="text-sm text-muted-foreground">Modern web applications & platforms</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm">Core: Professional websites & landing pages</span>
                  <span className="text-sm font-semibold text-primary">$2K - $5K</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm">Growth: Complex web apps & e-commerce</span>
                  <span className="text-sm font-semibold text-primary">$10K - $20K</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm">Enterprise: Enterprise applications</span>
                  <span className="text-sm font-semibold text-primary">$30K - $100K</span>
                </div>
              </div>
            </div>

            {/* Strategic Automation */}
            <div className="bg-background/50 rounded-xl p-6 border border-border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                  <Zap className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Strategic Automation</h4>
                  <p className="text-sm text-muted-foreground">Process optimization & system integration</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm">Core: Workflow optimization & CRM setup</span>
                  <span className="text-sm font-semibold text-primary">$2.5K - $7K</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm">Growth: Enterprise automation & APIs</span>
                  <span className="text-sm font-semibold text-primary">$8K - $15K</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm">Enterprise: Enterprise-wide automation</span>
                  <span className="text-sm font-semibold text-primary">$25K - $60K</span>
                </div>
              </div>
            </div>

            {/* Growth Engineering */}
            <div className="bg-background/50 rounded-xl p-6 border border-border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Growth Engineering</h4>
                  <p className="text-sm text-muted-foreground">Analytics, optimization & growth systems</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm">Core: Basic analytics & conversion optimization</span>
                  <span className="text-sm font-semibold text-primary">$3K - $8K</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm">Growth: Advanced analytics & marketing automation</span>
                  <span className="text-sm font-semibold text-primary">$8K - $25K</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm">Enterprise: Complete growth stack</span>
                  <span className="text-sm font-semibold text-primary">$35K - $80K</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Ready to Accelerate Your Growth?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join industry leaders who've chosen Nexus Creative Studio to architect their digital future. From concept to market leadership, we deliver solutions that scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:opacity-90"
              >
                Start Your Transformation
              </Button>
              <Button 
                onClick={() => {
                  const element = document.getElementById('calculator');
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold"
              >
                Calculate Investment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
