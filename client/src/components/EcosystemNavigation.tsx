import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Coins, 
  Cpu, 
  User, 
  ArrowRight,
  ExternalLink
} from "lucide-react";
import nexusLogo from "@assets/lg_1756703260455.jpg";
import cryptoLogo from "@assets/CN1_1756704209882.jpg";
import byteLogo from "@assets/BS1_1756704209882.jpg";
import founderImage from "@assets/JH1_1756704209882.png";

const ecosystemBrands = [
  {
    name: "Nexus Creative Studio",
    slug: "nexus-studio",
    route: "/nexus-studio",
    description: "Early-stage creative agency specializing in AI-powered MVPs and automation systems",
    tagline: "Building World-Class Digital Systems",
    logo: nexusLogo,
    icon: Building2,
    gradient: "from-blue-500 to-purple-500",
    status: "Active"
  },
  {
    name: "Crypto Nexus",
    slug: "crypto-nexus", 
    route: "/crypto-nexus",
    description: "Web3 & blockchain division focused on DeFi, smart contracts, and decentralized systems",
    tagline: "Intelligence for the next 100x crypto era",
    logo: cryptoLogo,
    icon: Coins,
    gradient: "from-green-500 to-cyan-500",
    status: "Active"
  },
  {
    name: "Byte Studio",
    slug: "byte-studio",
    route: "/byte-studio", 
    description: "AI SaaS incubator building intelligent products and agent systems",
    tagline: "Building intelligent products for tomorrow's internet",
    logo: byteLogo,
    icon: Cpu,
    gradient: "from-purple-500 to-pink-500",
    status: "Active"
  },
  {
    name: "Jobayer Hoque Siddique",
    slug: "founder",
    route: "/founder",
    description: "Founder & Visionary - MS Abroad student building the future of AI-powered agencies",
    tagline: "Building in Public, Scaling to $100K/month",
    logo: founderImage,
    icon: User,
    gradient: "from-orange-500 to-red-500",
    status: "Founder"
  }
];

interface EcosystemNavigationProps {
  currentBrand?: string;
  variant?: "full" | "compact" | "dropdown";
  className?: string;
}

export function EcosystemNavigation({ 
  currentBrand, 
  variant = "full", 
  className = "" 
}: EcosystemNavigationProps) {
  const [location] = useLocation();

  if (variant === "compact") {
    return (
      <div className={`flex items-center space-x-2 overflow-x-auto pb-2 ${className}`}>
        {ecosystemBrands.map((brand) => {
          const isActive = location === brand.route || currentBrand === brand.slug;
          return (
            <Link key={brand.slug} href={brand.route}>
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={`flex items-center space-x-2 whitespace-nowrap ${
                  isActive ? `bg-gradient-to-r ${brand.gradient} text-white` : ""
                }`}
                data-testid={`ecosystem-nav-${brand.slug}`}
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="w-4 h-4 rounded"
                />
                <span className="text-xs">{brand.name}</span>
                {brand.status === "Founder" && (
                  <Badge variant="secondary" className="text-xs">
                    {brand.status}
                  </Badge>
                )}
              </Button>
            </Link>
          );
        })}
      </div>
    );
  }

  if (variant === "dropdown") {
    return (
      <div className={`space-y-2 ${className}`}>
        {ecosystemBrands.map((brand) => {
          const isActive = location === brand.route || currentBrand === brand.slug;
          return (
            <Link key={brand.slug} href={brand.route}>
              <div
                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors ${
                  isActive ? "bg-secondary" : ""
                }`}
                data-testid={`ecosystem-dropdown-${brand.slug}`}
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="w-8 h-8 rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">{brand.name}</span>
                    {brand.status === "Founder" && (
                      <Badge variant="secondary" className="text-xs">
                        {brand.status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {brand.tagline}
                  </p>
                </div>
                <ArrowRight size={16} className="text-muted-foreground" />
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  // Full variant
  return (
    <section className={`py-16 bg-secondary/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="ecosystem-title">
            The Nexus Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="ecosystem-description">
            A unified ecosystem of brands focused on AI, automation, and digital innovation for the modern era.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {ecosystemBrands.map((brand) => {
            const isActive = location === brand.route || currentBrand === brand.slug;
            return (
              <Card 
                key={brand.slug}
                className={`group hover-lift transition-all duration-300 ${
                  isActive ? "ring-2 ring-primary" : ""
                }`}
                data-testid={`ecosystem-card-${brand.slug}`}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={brand.logo} 
                        alt={brand.name}
                        className="w-12 h-12 rounded-xl"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-sm">{brand.name}</h3>
                          <Badge 
                            variant={isActive ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {brand.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {brand.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {brand.description}
                    </p>

                    <Link href={brand.route}>
                      <Button 
                        className={`w-full bg-gradient-to-r ${brand.gradient} text-white hover:opacity-90 transition-all duration-300 group`}
                        data-testid={`ecosystem-cta-${brand.slug}`}
                      >
                        {isActive ? "Current Brand" : "Explore"}
                        {!isActive && (
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        )}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-bold mb-4">One Ecosystem, Multiple Solutions</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              From creative agencies to Web3 innovation and AI SaaS development - explore how our ecosystem can accelerate your business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground">
                  Get Started Today
                </Button>
              </Link>
              <a 
                href="https://nexuscreativestudio.notion.site/Nexus-Creative-Studio-28676083f2a4812eb694fa9dde05b381"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  <ExternalLink className="mr-2" size={16} />
                  View Portfolio
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EcosystemNavigation;