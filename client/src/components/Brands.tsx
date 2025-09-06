import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Box, ArrowRight, Shield, Palette, Building2, User } from "lucide-react";
import nexusLogo from "@assets/NCS11_1756704209883.jpg";
import cryptoLogo from "@assets/CN1_1756704209882.jpg";
import byteLogo from "@assets/BS1_1756704209882.jpg";
import founderImage from "@assets/JH1_1756704209882.png";

const brands = [
  {
    name: "Nexus Creative Studio",
    subtitle: "Multi-Brand Digital Agency",
    description: "Umbrella brand housing specialized technology verticals. Strategic leadership, comprehensive solutions, and cross-brand synergy for maximum client value.",
    icon: Building2,
    gradient: "from-blue-500 to-cyan-500",
    tags: ["Strategy", "Leadership", "Multi-Brand"],
    logo: nexusLogo,
    link: "/nexus-studio",
    stats: "50+ Projects"
  },
  {
    name: "Jobayer Hoque Siddique",
    subtitle: "Founder & Strategic Leader",
    description: "Authority-building personal brand focused on strategic consulting, technical leadership, and innovation. Trusted advisor for founders and enterprises.",
    icon: User,
    gradient: "from-orange-500 to-red-500",
    tags: ["Strategy", "Consulting", "Authority"],
    logo: founderImage,
    link: "/founder", 
    stats: "5+ Years Leading"
  },
  {
    name: "Crypto Nexus",
    subtitle: "Web3 & Blockchain Division",
    description: "Leading blockchain innovation through secure smart contracts, DeFi protocols, and next-generation Web3 applications. Future-focused and security-first.",
    icon: Shield,
    gradient: "from-green-500 to-emerald-500",
    tags: ["Smart Contracts", "DeFi", "Web3"],
    logo: cryptoLogo,
    link: "/crypto-nexus",
    stats: "$4M+ TVL"
  },
  {
    name: "Byte Studio",
    subtitle: "Design & MVP Development",
    description: "Rapid MVP development and premium design solutions. Helping startups validate ideas quickly with beautiful, functional prototypes and scalable systems.",
    icon: Palette,
    gradient: "from-purple-500 to-pink-500",
    tags: ["MVP Development", "Design", "Prototyping"],
    logo: byteLogo,
    link: "/byte-studio",
    stats: "25+ MVPs Built"
  }
];

export function Brands() {
  const brandsRef = useScrollAnimation();

  return (
    <section id="brands" className="py-24">
      <div className="max-w-7xl mx-auto px-6" ref={brandsRef}>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="brands-title">
            Our Brands
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="brands-description">
            A family of specialized brands delivering excellence across different verticals and technologies.
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
