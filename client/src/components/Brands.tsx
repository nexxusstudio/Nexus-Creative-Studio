import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Box, ArrowRight, Building2, User } from "lucide-react";
import nexusLogo from "@assets/NCS11_1756704209883.jpg";
import founderImage from "@assets/JH1_1756704209882.png";

const brands = [
  {
    name: "Nexus Creative Studio",
    subtitle: "Early-Stage Creative Agency",
    description: "Founded in 2026, we're a lean creative agency specializing in AI-powered MVPs, automation systems, and growth-focused web development for startups and small businesses. Our mission: building world-class digital systems from the ground up.",
    icon: Building2,
    gradient: "from-blue-500 to-cyan-500",
    tags: ["Early-Stage", "AI-Powered", "Growth-Focused"],
    logo: nexusLogo,
    link: "/nexus-studio",
    stats: "$12K+ Revenue"
  },
  {
    name: "Jobayer Hoque Siddique",
    subtitle: "Founder & CEO",
    description: "Full-stack developer and entrepreneur building an automation-heavy creative agency. Founded Nexus Creative Studio in 2024, achieved $13K revenue with 13 clients and 20 projects through systematic execution and AI-augmented workflows.",
    icon: User,
    gradient: "from-orange-500 to-red-500",
    tags: ["Founder", "Full-Stack", "MS Student"],
    logo: founderImage,
    link: "/founder", 
    stats: "8 Months Operating"
  }
];

export function Brands() {
  const brandsRef = useScrollAnimation();

  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-6" ref={brandsRef}>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="brands-title">
            About Our Agency
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="brands-description">
            Meet Nexus Creative Studio and our founder - an early-stage agency built for the future of digital transformation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {brands.map((brand, index) => (
            <Card 
              key={brand.name}
              className="group hover-lift bg-card/80 backdrop-blur-sm rounded-3xl border border-border theme-transition card-3d overflow-hidden"
              data-testid={`brand-card-${index}`}
            >
              <div className={`h-2 bg-gradient-to-r ${brand.gradient}`}></div>
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className={`w-20 h-20 bg-gradient-to-r ${brand.gradient} rounded-2xl flex items-center justify-center p-1`}>
                      {brand.logo ? (
                        <img 
                          src={brand.logo} 
                          alt={`${brand.name} logo`}
                          className="w-full h-full rounded-xl object-cover"
                          data-testid={`brand-logo-${index}`}
                        />
                      ) : (
                        <brand.icon className="text-white" size={32} />
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-card border border-border rounded-lg px-2 py-1">
                      <span className="text-xs font-semibold text-primary">{brand.stats}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold" data-testid={`brand-name-${index}`}>
                      {brand.name}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`brand-subtitle-${index}`}>
                      {brand.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`brand-description-${index}`}>
                  {brand.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {brand.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="bg-secondary hover:bg-secondary/80 transition-colors"
                      data-testid={`brand-tag-${index}-${tagIndex}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Link href={brand.link}>
                  <Button 
                    className={`w-full bg-gradient-to-r ${brand.gradient} text-white hover:opacity-90 theme-transition`}
                    data-testid={`brand-cta-${index}`}
                  >
                    Explore {brand.name.split(' ')[0]} <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
