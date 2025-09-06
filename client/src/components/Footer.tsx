import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-xl font-bold">Nexus Creative Studio</span>
            </div>
            <p className="text-muted-foreground" data-testid="footer-description">
              Building the future of digital experiences through innovation, creativity, and technical excellence.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-services-title">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-service-web"
                >
                  Web Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-service-ai"
                >
                  AI Solutions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-service-blockchain"
                >
                  Blockchain
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-service-design"
                >
                  Design
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-brands-title">Brands</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button 
                  onClick={() => scrollToSection('brands')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-brand-nexus"
                >
                  Nexus Creative Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('brands')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-brand-crypto"
                >
                  Crypto Nexus
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('brands')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-brand-byte"
                >
                  Byte Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('brands')} 
                  className="hover:text-primary theme-transition"
                  data-testid="footer-brand-founder"
                >
                  Jobayer H. Siddique
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
            © 2024 Nexus Creative Studio. All rights reserved.
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
