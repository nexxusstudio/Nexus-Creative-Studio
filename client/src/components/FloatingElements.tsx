import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, MessageCircle } from "lucide-react";

export function FloatingElements() {
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  const openWhatsApp = () => {
    // TODO: Replace with actual WhatsApp link
    window.open("https://wa.me/8801234567890", "_blank");
  };

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

      {/* Floating WhatsApp Widget */}
      <Button
        onClick={openWhatsApp}
        className="fixed bottom-8 left-8 bg-green-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-green-600 theme-transition animate-pulse-slow z-40"
        data-testid="whatsapp-widget"
      >
        <MessageCircle size={24} />
      </Button>
    </>
  );
}
