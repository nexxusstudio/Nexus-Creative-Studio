import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ParticleBackground } from "./ParticleBackground";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import founderHeroImage from "@assets/JH1_1756704209882.png";
import nexusStudioCover from "@assets/NCS1_1756703260455.jpg";

export function Hero() {
  const heroRef = useScrollAnimation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden particle-field">
      <ParticleBackground />
      
      {/* Enhanced Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${nexusStudioCover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 z-1"></div>
      <div className="absolute inset-0 holographic-pattern z-2"></div>

      <div className="content-layer max-w-7xl mx-auto px-6 py-20 z-10" ref={heroRef}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" data-testid="status-indicator"></div>
                <span className="text-sm text-muted-foreground">Available for Strategic Partnerships</span>
              </div>

              <h1 className="text-5xl lg:text-8xl font-bold leading-tight" data-testid="hero-title">
                Where{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-glow">
                  Vision
                </span>
                <br />
                Meets Innovation
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed" data-testid="hero-description">
                Multi-brand digital agency specializing in Web3, design, and strategic technology leadership. From blockchain solutions to MVP development - we build the future.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/founder">
                <Button 
                  className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:opacity-90 theme-transition btn-ripple"
                  data-testid="button-meet-founder"
                >
                  Meet the Founder
                </Button>
              </Link>
              <Button 
                onClick={() => scrollToSection('brands')}
                variant="outline"
                className="border border-border px-8 py-4 text-lg font-semibold hover:bg-secondary theme-transition"
                data-testid="button-explore-brands"
              >
                Explore Our Brands
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              <div className="text-center" data-testid="stat-projects">
                <div className="text-3xl font-bold text-primary animate-neon-pulse">50+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center" data-testid="stat-brands">
                <div className="text-3xl font-bold text-primary animate-neon-pulse">3</div>
                <div className="text-sm text-muted-foreground">Brands</div>
              </div>
              <div className="text-center" data-testid="stat-satisfaction">
                <div className="text-3xl font-bold text-primary animate-neon-pulse">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
              <div className="text-center" data-testid="stat-value">
                <div className="text-3xl font-bold text-primary animate-neon-pulse">$4M+</div>
                <div className="text-sm text-muted-foreground">Value Created</div>
              </div>
            </div>
          </div>

          <div className="relative transform-3d">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl transform rotate-3 animate-morphing"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-secondary/20 to-muted/20 rounded-3xl transform -rotate-6 animate-float"></div>
              <div className="relative bg-card/90 backdrop-blur-sm rounded-3xl p-2 shadow-2xl card-3d">
                <img 
                  src={founderHeroImage} 
                  alt="Jobayer Hoque Siddique - Founder & Visionary" 
                  className="w-full h-auto rounded-2xl"
                  data-testid="hero-image"
                />
              </div>
            </div>

            {/* Enhanced Floating Elements */}
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-r from-green-500/30 to-cyan-500/30 rounded-full animate-float animate-glow"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 -right-12 w-12 h-12 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            
            {/* Brand Icons Floating */}
            <div className="absolute top-8 -left-8 w-14 h-14 bg-card/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg animate-float border border-border" style={{ animationDelay: '0.5s' }}>
              <span className="text-primary font-bold">₿</span>
            </div>
            <div className="absolute bottom-8 -right-8 w-14 h-14 bg-card/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg animate-float border border-border" style={{ animationDelay: '1.5s' }}>
              <span className="text-primary font-bold">Ⓑ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
