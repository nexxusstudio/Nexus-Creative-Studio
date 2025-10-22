import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Brands } from "@/components/Brands";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingElements } from "@/components/FloatingElements";
import { PricingCalculator } from "@/components/PricingCalculator";
import { InteractiveRoadmap } from "@/components/InteractiveRoadmap";
import { InteractiveMetrics } from "@/components/InteractiveMetrics";
import { DataVisualizations } from "@/components/DataVisualizations";
import { VisionStatement } from "@/components/VisionStatement";
import { EcosystemNavigation } from "@/components/EcosystemNavigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground theme-transition">
      <Navigation />
      <main>
        <Hero />
        <Brands />
        <InteractiveMetrics />
        <Services />
        <DataVisualizations />
        <PricingCalculator />
        <EcosystemNavigation />
        <InteractiveRoadmap />
        <VisionStatement />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <FloatingElements />
    </div>
  );
}
