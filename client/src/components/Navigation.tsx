import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";

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
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border theme-transition">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
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
                data-testid="nav-brands-dropdown"
              >
                <span>Brands</span>
                <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/nexus-studio" className="w-full">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                      <span>Nexus Creative Studio</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/founder" className="w-full">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                      <span>Jobayer Hoque Siddique</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/crypto-nexus" className="w-full">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"></div>
                      <span>Crypto Nexus</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/byte-studio" className="w-full">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <span>Byte Studio</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
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
                <div className="text-sm font-semibold text-muted-foreground">Brands</div>
                <Link href="/nexus-studio">
                  <button 
                    className={`text-left hover:text-primary theme-transition w-full ${location === '/nexus-studio' ? 'text-primary font-semibold' : ''}`}
                    data-testid="mobile-nav-nexus"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Nexus Creative Studio
                  </button>
                </Link>
                <Link href="/founder">
                  <button 
                    className={`text-left hover:text-primary theme-transition w-full ${location === '/founder' ? 'text-primary font-semibold' : ''}`}
                    data-testid="mobile-nav-founder"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Jobayer Hoque Siddique
                  </button>
                </Link>
                <Link href="/crypto-nexus">
                  <button 
                    className={`text-left hover:text-primary theme-transition w-full ${location === '/crypto-nexus' ? 'text-primary font-semibold' : ''}`}
                    data-testid="mobile-nav-crypto"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Crypto Nexus
                  </button>
                </Link>
                <Link href="/byte-studio">
                  <button 
                    className={`text-left hover:text-primary theme-transition w-full ${location === '/byte-studio' ? 'text-primary font-semibold' : ''}`}
                    data-testid="mobile-nav-byte"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Byte Studio
                  </button>
                </Link>
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
  );
}
