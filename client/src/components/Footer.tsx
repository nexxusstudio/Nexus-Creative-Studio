import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Twitter, Github, Linkedin } from "lucide-react";
import { SiFiverr, SiUpwork } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import nexusLogo from "@assets/lg_1756703260455.jpg";

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
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
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={nexusLogo} alt="Nexus Creative Studio" className="w-10 h-10 rounded-lg" />
              <span className="text-xl font-bold">Nexus Creative Studio</span>
            </div>
            <p className="text-muted-foreground text-sm" data-testid="footer-description">
              Building world-class digital systems from the ground up. Early-stage agency focused on AI MVPs, automation, and growth systems.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Email:</strong>{" "}
              <a href="mailto:nexxusstudio.agency@gmail.com" className="hover:text-primary theme-transition">
                nexxusstudio.agency@gmail.com
              </a>
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a 
                href="https://x.com/nexuscrativeio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary theme-transition"
                data-testid="footer-social-twitter"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://github.com/nexxusstudio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary theme-transition"
                data-testid="footer-social-github"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://pro.fiverr.com/nexusstudioagen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary theme-transition"
                data-testid="footer-social-fiverr"
                aria-label="Fiverr Pro"
              >
                <SiFiverr size={20} />
              </a>
              <a 
                href="https://www.upwork.com/NexusStudio/" 
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
            <h4 className="font-semibold mb-4" data-testid="footer-links-title">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => scrollToSection('portfolio')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-link-portfolio"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <a 
                  href="https://nexuscreativestudio.notion.site/Nexus-Creative-Studio-28676083f2a4812eb694fa9dde05b381"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary theme-transition"
                  data-testid="footer-link-notion"
                >
                  Notion Portfolio
                </a>
              </li>
              <li>
                <a 
                  href="https://nexuscreativestudio.notion.site/Client-Portal-22176083f2a4800cbe19d83a87e0671d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary theme-transition"
                  data-testid="footer-link-client-portal"
                >
                  Client Portal
                </a>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-link-contact"
                >
                  Get Started
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
