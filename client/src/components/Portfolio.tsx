import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Laptop, Coins, Smartphone, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "SaaS Platform Redesign",
    description: "Complete platform overhaul with AI-powered features resulting in 300% user engagement increase.",
    icon: Laptop,
    gradient: "from-blue-500 to-cyan-500",
    tags: ["Web Development", "AI Integration"],
    year: "2024"
  },
  {
    title: "DeFi Trading Platform",
    description: "Decentralized exchange with advanced trading features and yield farming capabilities.",
    icon: Coins,
    gradient: "from-green-500 to-emerald-500",
    tags: ["Blockchain", "DeFi"],
    year: "2024"
  },
  {
    title: "Fintech Mobile App",
    description: "Zero-to-one mobile banking solution with advanced security and intuitive UX design.",
    icon: Smartphone,
    gradient: "from-purple-500 to-pink-500",
    tags: ["Mobile App", "MVP"],
    year: "2023"
  }
];

const clientLogos = [
  { name: "Client 1", width: "w-32" },
  { name: "Client 2", width: "w-32" },
  { name: "Client 3", width: "w-32" },
  { name: "Client 4", width: "w-32" },
  { name: "Client 5", width: "w-32" },
  { name: "Client 6", width: "w-32" }
];

export function Portfolio() {
  const portfolioRef = useScrollAnimation();

  return (
    <section id="portfolio" className="py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6" ref={portfolioRef}>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="portfolio-title">
            Featured Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="portfolio-description">
            Explore our latest projects and case studies showcasing innovation, creativity, and technical excellence.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="group hover-lift bg-card rounded-2xl overflow-hidden border border-border theme-transition"
              data-testid={`project-card-${index}`}
            >
              <div className={`aspect-video bg-gradient-to-r ${project.gradient} flex items-center justify-center`}>
                <project.icon className="text-white" size={48} />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      data-testid={`project-tag-${index}-${tagIndex}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold mb-2" data-testid={`project-title-${index}`}>
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4" data-testid={`project-description-${index}`}>
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground" data-testid={`project-year-${index}`}>
                    {project.year}
                  </span>
                  <Button 
                    variant="ghost" 
                    className="text-primary hover:underline p-0"
                    data-testid={`project-case-study-${index}`}
                  >
                    View Case Study <ArrowRight className="ml-1" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Logos Carousel */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4" data-testid="clients-title">
              Trusted by Industry Leaders
            </h3>
            <p className="text-muted-foreground" data-testid="clients-description">
              Companies that trust us to deliver exceptional results
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="flex space-x-12 animate-pulse-slow justify-center">
              {clientLogos.map((client, index) => (
                <div 
                  key={client.name}
                  className={`flex-shrink-0 ${client.width} h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg`}
                  data-testid={`client-logo-${index}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
