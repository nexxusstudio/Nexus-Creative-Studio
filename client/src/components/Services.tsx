import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Brain, Code, Bitcoin, Plus, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Custom AI integrations, automation, and intelligent systems that enhance your business operations.",
    gradient: "from-purple-500 to-pink-500",
    features: ["AI Chatbots", "Process Automation", "Data Analytics"]
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Modern, responsive websites and web applications built with cutting-edge technologies.",
    gradient: "from-blue-500 to-cyan-500",
    features: ["React/Next.js", "Full-Stack Apps", "API Development"]
  },
  {
    icon: Bitcoin,
    title: "Blockchain & Crypto",
    description: "Web3 applications, smart contracts, and decentralized solutions for the future of finance.",
    gradient: "from-green-500 to-emerald-500",
    features: ["Smart Contracts", "DeFi Platforms", "NFT Marketplaces"]
  },
  {
    icon: Plus,
    title: "Add-ons",
    description: "Additional services to complement your project and maximize its potential.",
    gradient: "from-orange-500 to-red-500",
    features: ["SEO Optimization", "Performance Audit", "Maintenance"]
  }
];

export function Services() {
  const servicesRef = useScrollAnimation();

  return (
    <section id="services" className="py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6" ref={servicesRef}>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="services-title">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-description">
            From AI-powered solutions to blockchain development, we offer comprehensive digital services that scale with your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="group hover-lift bg-card rounded-2xl border border-border theme-transition"
              data-testid={`service-card-${index}`}
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <service.icon className="text-white" size={32} />
                </div>
                
                <h3 className="text-xl font-bold mb-4" data-testid={`service-title-${index}`}>
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6" data-testid={`service-description-${index}`}>
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={feature} 
                      className="flex items-center text-sm text-muted-foreground"
                      data-testid={`service-feature-${index}-${featureIndex}`}
                    >
                      <Check className="text-green-500 mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
