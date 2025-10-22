import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Brain, Code, Bitcoin, Plus, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Brain,
    title: "AI + Automation MVPs",
    description: "SaaS tools, AI agents, and automation systems using OpenAI, Supabase, and modern frameworks.",
    gradient: "from-purple-500 to-pink-500",
    features: ["AI Chatbots & Agents", "Workflow Automation", "MVP Development"],
    priceRange: "$3K - $8K"
  },
  {
    icon: Code,
    title: "Web Design & Development",
    description: "Conversion-focused websites, landing pages, and portfolio systems built for growth.",
    gradient: "from-blue-500 to-cyan-500",
    features: ["Landing Pages", "Multi-page Websites", "Web Applications"],
    priceRange: "$1K - $5K"
  },
  {
    icon: Plus,
    title: "System Integration & Automation",
    description: "Zapier/Make workflows, Notion systems, Airtable setups, and CRM stack integrations.",
    gradient: "from-green-500 to-emerald-500",
    features: ["No-Code Automation", "System Integration", "CRM Setup"],
    priceRange: "$500 - $2K"
  },
  {
    icon: Bitcoin,
    title: "Growth Systems & Funnels",
    description: "Outbound systems, marketing automations, and brand positioning for early-stage growth.",
    gradient: "from-orange-500 to-red-500",
    features: ["Marketing Automation", "Brand Strategy", "Growth Systems"],
    priceRange: "$1K - $3K"
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
            Four core service pillars designed to help startups and small businesses scale fast with AI, automation, and modern technology.
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
                
                <p className="text-muted-foreground mb-4" data-testid={`service-description-${index}`}>
                  {service.description}
                </p>
                
                <div className="mb-6">
                  <div className="text-primary font-bold text-lg">{service.priceRange}</div>
                  <div className="text-xs text-muted-foreground">Average project range</div>
                </div>
                
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
