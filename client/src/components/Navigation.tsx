import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, Building2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { EcosystemNavigation } from "./EcosystemNavigation";
import nexusLogo from "@assets/lg_1756703260455.jpg";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Ecosystem Navigation Bar */}
      <div className="bg-primary/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <EcosystemNavigation variant="compact" className="justify-center" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border theme-transition">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={nexusLogo} alt="Nexus Creative Studio" className="w-10 h-10 rounded-lg" />
              <span className="text-xl font-bold">Nexus Creative Studio</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/">
                <button 
                  className={`hover:text-primary theme-transition ${location === '/' ? 'text-primary font-semibold' : ''}`}
                  data-testid="nav-home"
                >
                  Home
                </button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger 
                  className="flex items-center space-x-1 hover:text-primary theme-transition"
                  data-testid="nav-ecosystem-dropdown"
                >
                  <Building2 size={16} />
                  <span>Ecosystem</span>
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80">
                  <EcosystemNavigation variant="dropdown" />
                </DropdownMenuContent>
              </DropdownMenu>

              <button 
                onClick={() => scrollToSection('services')} 
                className="hover:text-primary theme-transition"
                data-testid="nav-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className="hover:text-primary theme-transition"
                data-testid="nav-portfolio"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="hover:text-primary theme-transition"
                data-testid="nav-contact"
              >
                Contact
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Switcher */}
              <Select value={theme} onValueChange={(value: any) => setTheme(value)}>
                <SelectTrigger className="w-[140px]" data-testid="theme-switcher">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="gradient">Gradient</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                  <SelectItem value="neon">Neon</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-primary text-primary-foreground hover:opacity-90 theme-transition btn-ripple"
                data-testid="button-get-started"
              >
                Get Started
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
                data-testid="button-mobile-menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                <Link href="/">
                  <button 
                    className={`text-left hover:text-primary theme-transition w-full ${location === '/' ? 'text-primary font-semibold' : ''}`}
                    data-testid="mobile-nav-home"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </button>
                </Link>
                
                <div className="border-l-2 border-border pl-4 space-y-3">
                  <div className="text-sm font-semibold text-muted-foreground">Nexus Ecosystem</div>
                  <EcosystemNavigation variant="dropdown" className="pl-0" />
                </div>
                
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-left hover:text-primary theme-transition"
                  data-testid="mobile-nav-services"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('portfolio')} 
                  className="text-left hover:text-primary theme-transition"
                  data-testid="mobile-nav-portfolio"
                >
                  Portfolio
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-left hover:text-primary theme-transition"
                  data-testid="mobile-nav-contact"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
