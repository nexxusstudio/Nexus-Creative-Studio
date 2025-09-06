import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Code, Award, Globe, Shield } from "lucide-react";

const metrics = [
  {
    title: "Global Reach",
    value: 15,
    max: 20,
    unit: "Countries",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    description: "International client portfolio"
  },
  {
    title: "Client Satisfaction",
    value: 98,
    max: 100,
    unit: "%",
    icon: Award,
    color: "from-green-500 to-emerald-500",
    description: "Average satisfaction rating"
  },
  {
    title: "Code Quality",
    value: 95,
    max: 100,
    unit: "Score",
    icon: Code,
    color: "from-purple-500 to-pink-500",
    description: "Test coverage & best practices"
  },
  {
    title: "Security Rating",
    value: 99,
    max: 100,
    unit: "A+",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    description: "Security audit compliance"
  },
  {
    title: "Team Growth",
    value: 250,
    max: 300,
    unit: "%",
    icon: Users,
    color: "from-indigo-500 to-purple-500",
    description: "Year-over-year growth"
  },
  {
    title: "Revenue Growth",
    value: 340,
    max: 400,
    unit: "%",
    icon: TrendingUp,
    color: "from-pink-500 to-rose-500",
    description: "Annual revenue increase"
  }
];

const achievements = [
  { title: "Forbes 30 Under 30 Nominee", year: "2024", category: "Technology" },
  { title: "Blockchain Innovation Award", year: "2024", category: "DeFi" },
  { title: "Startup Accelerator Graduate", year: "2023", category: "Tech" },
  { title: "Industry Speaking Engagements", year: "2024", category: "Leadership" },
];

export function InteractiveMetrics() {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newValues: { [key: string]: number } = {};
      metrics.forEach(metric => {
        newValues[metric.title] = metric.value;
      });
      setAnimatedValues(newValues);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-card px-4 py-2 rounded-full border border-border mb-6">
            <TrendingUp className="text-primary" size={20} />
            <span className="text-sm font-semibold">Performance Metrics</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="metrics-title">
            Authority & Excellence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="metrics-description">
            Data-driven results and industry recognition that demonstrate our commitment to excellence and innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <Card 
              key={metric.title}
              className={`cursor-pointer transition-all duration-300 hover-lift card-3d ${
                selectedMetric === metric.title ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedMetric(selectedMetric === metric.title ? null : metric.title)}
              data-testid={`metric-card-${index}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color}`}>
                    <metric.icon className="text-white" size={24} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Live
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg" data-testid={`metric-title-${index}`}>
                    {metric.title}
                  </h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-primary" data-testid={`metric-value-${index}`}>
                      {animatedValues[metric.title] || 0}
                    </span>
                    <span className="text-muted-foreground">{metric.unit}</span>
                  </div>
                  <Progress 
                    value={(animatedValues[metric.title] || 0) / metric.max * 100} 
                    className="h-2"
                    data-testid={`metric-progress-${index}`}
                  />
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 card-3d">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4" data-testid="achievements-title">
                Industry Recognition & Achievements
              </h3>
              <p className="text-muted-foreground">
                Building authority through proven results and industry acknowledgment
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.title}
                  className="text-center p-4 bg-card/50 rounded-xl border border-border hover-lift"
                  data-testid={`achievement-${index}`}
                >
                  <div className="text-2xl font-bold text-primary mb-2">
                    {achievement.year}
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">
                    {achievement.title}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {achievement.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}