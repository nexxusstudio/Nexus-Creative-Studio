import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, Users, Globe } from "lucide-react";

export function VisionStatement() {
  const visionRef = useScrollAnimation();

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-6" ref={visionRef}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-card px-4 py-2 rounded-full border border-border mb-6">
            <Target className="text-primary" size={20} />
            <span className="text-sm font-semibold">2027 Vision</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="vision-title">
            Authority & Excellence
          </h2>
        </div>

        <Card className="card-3d bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm">
          <CardContent className="p-12">
            <blockquote className="text-center space-y-6">
              <p className="text-2xl lg:text-3xl font-semibold leading-relaxed" data-testid="vision-quote">
                "By 2027, Nexus Creative Studio aims to become the most trusted AI-driven creative partner for startups and small businesses worldwide — empowering{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  100+ brands
                </span>
                {" "}to scale with automation and intelligence."
              </p>
              <div className="pt-6">
                <p className="text-muted-foreground text-lg">
                  — Jobayer Hoque Siddique, Founder & CEO
                </p>
              </div>
            </blockquote>

            <div className="grid md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-border">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500">
                    <TrendingUp className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="font-bold text-lg">Growth-Focused</h3>
                <p className="text-sm text-muted-foreground">
                  Scaling from early-stage to market leader through systematic execution
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500">
                    <Users className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="font-bold text-lg">Client-Centric</h3>
                <p className="text-sm text-muted-foreground">
                  Building long-term partnerships with startups and growing businesses
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500">
                    <Globe className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="font-bold text-lg">Global Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Serving clients across 10+ countries with AI and automation solutions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
