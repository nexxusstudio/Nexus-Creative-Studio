import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Twitter, Github, Linkedin, Building2 } from "lucide-react";
import { SiFiverr, SiUpwork } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { BRAND_CONFIGS, SOCIAL_LINKS, BRAND_CONTACTS, QUICK_LINKS } from "@/data/brand-links";
import nexusLogo from "@assets/lg_1756703260455.jpg";

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup integration for production
    // Integrate with email service provider (Mailchimp, ConvertKit, etc.)
    toast({
      title: "Newsletter Signup!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img src={nexusLogo} alt="Nexus Creative Studio" className="w-10 h-10 rounded-lg" />
              <span className="text-xl font-bold">Nexus Creative Studio</span>
            </div>
            <p className="text-muted-foreground text-sm" data-testid="footer-description">
              Building world-class digital systems from the ground up. Early-stage agency focused on AI MVPs, automation, and growth systems.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Email:</strong>{" "}
              <a href={QUICK_LINKS.contactAgency} className="hover:text-primary theme-transition">
                {BRAND_CONTACTS.agency.email}
              </a>
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a 
                href={SOCIAL_LINKS.agency.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary theme-transition"
                data-testid="footer-social-twitter"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href={SOCIAL_LINKS.agency.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary theme-transition"
                data-testid="footer-social-github"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href={SOCIAL_LINKS.agency.fiverr} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary theme-transition"
                data-testid="footer-social-fiverr"
                aria-label="Fiverr Pro"
              >
                <SiFiverr size={20} />
              </a>
              <a 
                href={SOCIAL_LINKS.agency.upwork} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary theme-transition"
                data-testid="footer-social-upwork"
                aria-label="Upwork"
              >
                <SiUpwork size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 flex items-center space-x-2" data-testid="footer-ecosystem-title">
              <Building2 size={16} />
              <span>Nexus Ecosystem</span>
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/nexus-studio">
                  <button className="hover:text-primary theme-transition" data-testid="footer-nexus-studio">
                    Nexus Creative Studio
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/crypto-nexus">
                  <button className="hover:text-primary theme-transition" data-testid="footer-crypto-nexus">
                    Crypto Nexus
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/byte-studio">
                  <button className="hover:text-primary theme-transition" data-testid="footer-byte-studio">
                    Byte Studio
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/founder">
                  <button className="hover:text-primary theme-transition" data-testid="footer-founder">
                    Jobayer Hoque Siddique
                  </button>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-services-title">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-service-ai"
                >
                  AI + Automation MVPs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-service-web"
                >
                  Web Design & Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-service-automation"
                >
                  System Integration
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-service-growth"
                >
                  Growth Systems
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-newsletter-title">Newsletter</h4>
            <p className="text-muted-foreground mb-4" data-testid="footer-newsletter-description">
              Stay updated with our latest projects and insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex space-x-2" data-testid="newsletter-form">
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring theme-transition"
                required
                data-testid="newsletter-email-input"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 theme-transition"
                data-testid="newsletter-submit-button"
              >
                <ArrowRight size={20} />
              </Button>
            </form>
            
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <a 
                href={SOCIAL_LINKS.agency.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-primary theme-transition"
                data-testid="footer-link-notion"
              >
                Notion Portfolio
              </a>
              <a 
                href={SOCIAL_LINKS.agency.clientPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-primary theme-transition"
                data-testid="footer-link-client-portal"
              >
                Client Portal
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm" data-testid="footer-copyright">
            © 2026-2027 Nexus Creative Studio. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <button className="text-muted-foreground hover:text-primary text-sm theme-transition" data-testid="footer-privacy">
              Privacy Policy
            </button>
            <button className="text-muted-foreground hover:text-primary text-sm theme-transition" data-testid="footer-terms">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
