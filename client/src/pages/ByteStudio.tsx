import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Laptop, 
  Smartphone, 
  Zap, 
  Eye,
  Layers,
  Figma,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";
import byteStudioLogo from "@assets/BS1_1756704209882.jpg";
import byteStudioCover from "@assets/BS_1756704209881.jpg";

const designServices = [
  {
    title: "MVP Development",
    description: "Rapid prototyping and MVP development to validate your ideas quickly and efficiently",
    icon: Zap,
    gradient: "from-purple-500 to-pink-500",
    timeline: "2-4 weeks",
    pricing: "Starting at $3,000",
    features: ["User Research", "Wireframing", "Prototype", "Testing"]
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, user-centered designs that convert visitors into customers",
    icon: Palette,
    gradient: "from-blue-500 to-cyan-500",
    timeline: "1-3 weeks", 
    pricing: "Starting at $2,000",
    features: ["Design System", "Responsive Design", "User Testing", "Style Guide"]
  },
  {
    title: "Web Applications",
    description: "Custom web applications built with modern frameworks and best practices",
    icon: Laptop,
    gradient: "from-green-500 to-emerald-500",
    timeline: "4-8 weeks",
    pricing: "Starting at $5,000",
    features: ["React/Next.js", "Database Design", "API Integration", "Deployment"]
  },
  {
    title: "Mobile Design",
    description: "Native and responsive mobile designs optimized for iOS and Android",
    icon: Smartphone,
    gradient: "from-orange-500 to-red-500",
    timeline: "3-6 weeks",
    pricing: "Starting at $4,000",
    features: ["iOS Guidelines", "Material Design", "Responsive", "App Store Ready"]
  }
];

const portfolio = [
  {
    title: "E-commerce Dashboard",
    description: "Complete admin dashboard for online store management with real-time analytics",
    image: "gradient-1",
    tags: ["React", "Dashboard", "E-commerce"],
    metrics: { conversion: "+45%", users: "2K+", rating: "4.9/5" }
  },
  {
    title: "Fitness App MVP",
    description: "Mobile-first fitness tracking application with social features and progress analytics",
    image: "gradient-2", 
    tags: ["Mobile", "MVP", "Fitness"],
    metrics: { downloads: "10K+", retention: "78%", rating: "4.7/5" }
  },
  {
    title: "SaaS Landing Page",
    description: "High-converting landing page for B2B SaaS with interactive demos and pricing",
    image: "gradient-3",
    tags: ["Landing Page", "SaaS", "Conversion"],
    metrics: { conversion: "+120%", leads: "500+", ctr: "12%" }
  }
];

const designProcess = [
  {
    step: 1,
    title: "Discovery & Research",
    description: "Understanding your vision, users, and market requirements",
    icon: Eye,
    duration: "1-2 days"
  },
  {
    step: 2,
    title: "Wireframing & Planning",
    description: "Creating user flows and wireframes for optimal user experience",
    icon: Layers,
    duration: "2-3 days"
  },
  {
    step: 3,
    title: "Design & Prototype",
    description: "High-fidelity designs with interactive prototypes for testing",
    icon: Figma,
    duration: "1-2 weeks"
  },
  {
    step: 4,
    title: "Development & Testing",
    description: "Building and testing the final product with quality assurance",
    icon: Laptop,
    duration: "2-4 weeks"
  }
];

export default function ByteStudio() {
  const heroRef = useScrollAnimation();
  const servicesRef = useScrollAnimation();
  const portfolioRef = useScrollAnimation();
  const processRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <ParticleBackground />
        
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${byteStudioCover})`,
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
                    src={byteStudioLogo} 
                    alt="Byte Studio Logo" 
                    className="w-16 h-16 rounded-2xl"
                    data-testid="byte-studio-logo"
                  />
                  <div>
                    <h1 className="text-3xl font-bold">Byte Studio</h1>
                    <p className="text-muted-foreground">Design & MVP Development</p>
                  </div>
                </div>

                <h2 className="text-5xl lg:text-7xl font-bold leading-tight" data-testid="byte-title">
                  Design{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-glow">
                    Meets
                  </span>
                  <br />
                  Innovation
                </h2>

                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed" data-testid="byte-description">
                  Rapid MVP development and stunning design solutions that help startups and businesses validate ideas and scale quickly.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 text-lg font-semibold hover:opacity-90 theme-transition btn-ripple"
                  data-testid="button-start-mvp"
                >
                  <Zap className="mr-2" size={20} />
                  Start MVP Project
                </Button>
                <Button 
                  variant="outline"
                  className="border border-border px-8 py-4 text-lg font-semibold hover:bg-secondary theme-transition"
                  data-testid="button-design-consultation"
                >
                  <Palette className="mr-2" size={20} />
                  Design Consultation
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center" data-testid="byte-stat-mvps">
                  <div className="text-3xl font-bold text-primary animate-neon-pulse">25+</div>
                  <div className="text-sm text-muted-foreground">MVPs Built</div>
                </div>
                <div className="text-center" data-testid="byte-stat-time">
                  <div className="text-3xl font-bold text-primary animate-neon-pulse">2-4</div>
                  <div className="text-sm text-muted-foreground">Weeks Avg</div>
                </div>
                <div className="text-center" data-testid="byte-stat-success">
                  <div className="text-3xl font-bold text-primary animate-neon-pulse">92%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl transform rotate-3 animate-morphing"></div>
              <Card className="relative bg-card/80 backdrop-blur-sm border border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center" data-testid="design-process-preview-title">Design Process</h3>
                  <div className="space-y-4">
                    {designProcess.slice(0, 3).map((step, index) => (
                      <div key={step.step} className="flex items-center space-x-3" data-testid={`design-process-preview-${index}`}>
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {step.step}
                        </div>
                        <div>
                          <div className="font-semibold">{step.title}</div>
                          <div className="text-sm text-muted-foreground">{step.duration}</div>
                        </div>
                      </div>
                    ))}
                    <div className="text-center pt-4">
                      <Button variant="ghost" className="text-primary" data-testid="button-full-process">
                        View Full Process <ArrowRight className="ml-1" size={16} />
                      </Button>
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
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="byte-services-title">
              Design & Development Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="byte-services-description">
              From initial concept to fully functional MVP - we handle the entire design and development journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {designServices.map((service, index) => (
              <Card 
                key={service.title}
                className="group hover-lift bg-card border border-border theme-transition"
                data-testid={`byte-service-${index}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center`}>
                      <service.icon className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" data-testid={`byte-service-title-${index}`}>
                        {service.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{service.timeline}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign size={14} />
                          <span>{service.pricing}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6" data-testid={`byte-service-description-${index}`}>
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div 
                        key={feature}
                        className="flex items-center space-x-2"
                        data-testid={`byte-service-feature-${index}-${featureIndex}`}
                      >
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full bg-gradient-to-r ${service.gradient} text-white hover:opacity-90 theme-transition`}
                    data-testid={`byte-service-cta-${index}`}
                  >
                    Get Started <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6" ref={portfolioRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="byte-portfolio-title">
              Recent Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="byte-portfolio-description">
              Successful MVPs and design projects that have helped startups launch and scale their businesses.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <Card 
                key={project.title}
                className="group hover-lift bg-card border border-border theme-transition overflow-hidden"
                data-testid={`byte-portfolio-${index}`}
              >
                <div className={`aspect-video bg-gradient-to-r ${
                  project.image === 'gradient-1' ? 'from-blue-500 to-cyan-500' :
                  project.image === 'gradient-2' ? 'from-purple-500 to-pink-500' :
                  'from-green-500 to-emerald-500'
                } flex items-center justify-center`}>
                  <div className="text-white text-6xl font-bold opacity-20">
                    {project.title.charAt(0)}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2" data-testid={`byte-portfolio-title-${index}`}>
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4" data-testid={`byte-portfolio-description-${index}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tag}
                        variant="secondary"
                        className="bg-secondary"
                        data-testid={`byte-portfolio-tag-${index}-${tagIndex}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                      <div key={key} data-testid={`byte-portfolio-metric-${index}-${metricIndex}`}>
                        <div className="text-sm font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant="outline"
                    className="w-full border border-border hover:bg-secondary"
                    data-testid={`byte-portfolio-case-study-${index}`}
                  >
                    View Case Study <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6" ref={processRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="byte-process-title">
              Our Design Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="byte-process-description">
              A proven methodology that ensures your project is delivered on time, on budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {designProcess.map((step, index) => (
              <Card 
                key={step.step}
                className="bg-card border border-border hover-lift text-center theme-transition"
                data-testid={`byte-process-step-${index}`}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="text-white" size={32} />
                  </div>
                  
                  <div className="text-sm text-primary font-semibold mb-2">Step {step.step}</div>
                  <h3 className="text-xl font-bold mb-4" data-testid={`byte-process-step-title-${index}`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-4" data-testid={`byte-process-step-description-${index}`}>
                    {step.description}
                  </p>
                  <div className="text-sm text-primary font-semibold">{step.duration}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold" data-testid="byte-cta-title">
              Turn Your Idea Into{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Reality
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="byte-cta-description">
              Ready to validate your concept? Let's build an MVP that gets you to market fast.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 text-lg font-semibold hover:opacity-90 theme-transition btn-ripple"
                data-testid="button-byte-consultation"
              >
                Free MVP Consultation
              </Button>
              <Button 
                variant="outline"
                className="border border-border px-8 py-4 text-lg font-semibold hover:bg-secondary theme-transition"
                data-testid="button-byte-portfolio"
              >
                View Full Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}