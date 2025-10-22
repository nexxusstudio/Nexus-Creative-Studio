import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowUp, 
  MessageCircle, 
  Menu, 
  X, 
  Home, 
  User, 
  Briefcase, 
  FileText, 
  Mail,
  Calculator
} from "lucide-react";

export function FloatingElements() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsNavOpen(false);
  };

  const openWhatsApp = () => {
    // Production WhatsApp contact integration
    window.open("https://wa.me/8801234567890", "_blank");
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "portfolio", label: "Portfolio", icon: FileText },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Back to Top Button */}
      <Button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-primary text-primary-foreground w-12 h-12 rounded-full shadow-lg z-50 theme-transition hover:opacity-90 transition-all duration-300 ${
          showBackToTop 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
        data-testid="back-to-top-button"
      >
        <ArrowUp size={20} />
      </Button>

      {/* Floating Assistive Navigation Widget */}
      <div className="fixed bottom-8 left-8 z-40">
        {/* Navigation Menu */}
        <div className={`mb-4 space-y-2 transition-all duration-300 ${
          isNavOpen 
            ? "opacity-100 pointer-events-auto translate-y-0" 
            : "opacity-0 pointer-events-none translate-y-4"
        }`}>
          {navItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="w-12 h-12 bg-card/90 backdrop-blur-sm border border-border text-foreground rounded-full shadow-lg hover:bg-secondary hover:scale-110 transition-all duration-200"
              data-testid={`nav-${item.id}`}
              title={item.label}
            >
              <item.icon size={20} />
            </Button>
          ))}
          
          {/* Calculator shortcut */}
          <Button
            onClick={() => scrollToSection('pricing-calculator')}
            className="w-12 h-12 bg-card/90 backdrop-blur-sm border border-border text-foreground rounded-full shadow-lg hover:bg-secondary hover:scale-110 transition-all duration-200"
            data-testid="nav-calculator"
            title="Pricing Calculator"
          >
            <Calculator size={20} />
          </Button>
        </div>

        {/* Menu Toggle Button */}
        <Button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-110"
          data-testid="floating-nav-toggle"
        >
          {isNavOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Floating WhatsApp Widget */}
      <div className="fixed bottom-8 right-20 z-40">
        <Button
          size="lg"
          onClick={openWhatsApp}
          className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle size={24} />
        </Button>
      </div>
    </>
  );
}
