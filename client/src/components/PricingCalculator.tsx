import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, Clock, Star } from "lucide-react";

const projectTypes = [
  { name: "AI + Automation MVP", base: 3000, multiplier: 1.0, duration: "2-4 weeks", category: "ai-mvp" },
  { name: "Landing Page", base: 1000, multiplier: 0.8, duration: "1-2 weeks", category: "web-dev" },
  { name: "Multi-page Website", base: 2500, multiplier: 1.0, duration: "2-3 weeks", category: "web-dev" },
  { name: "Web Application", base: 5000, multiplier: 1.2, duration: "3-6 weeks", category: "web-dev" },
  { name: "System Integration", base: 800, multiplier: 1.0, duration: "1-3 weeks", category: "automation" },
  { name: "Growth Systems Setup", base: 1500, multiplier: 1.1, duration: "2-4 weeks", category: "growth" },
];

const features = [
  { name: "AI Chatbot Integration", price: 800 },
  { name: "Payment Processing", price: 500 },
  { name: "Admin Dashboard", price: 1000 },
  { name: "Mobile Optimization", price: 600 },
  { name: "SEO Optimization", price: 400 },
  { name: "Analytics Setup", price: 300 },
  { name: "Email Automation", price: 500 },
  { name: "Social Media Integration", price: 350 },
];

export function PricingCalculator() {
  const [projectType, setProjectType] = useState<string>("");
  const [complexity, setComplexity] = useState<number[]>([1]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showEstimate, setShowEstimate] = useState(false);

  const selectedProject = projectTypes.find(p => p.name === projectType);
  const basePrice = selectedProject?.base || 0;
  const complexityMultiplier = complexity[0];
  const featuresPrice = features
    .filter(f => selectedFeatures.includes(f.name))
    .reduce((sum, f) => sum + f.price, 0);
  
  const totalPrice = Math.round((basePrice * complexityMultiplier * (selectedProject?.multiplier || 1)) + featuresPrice);
  const duration = selectedProject?.duration || "";

  const handleFeatureToggle = (featureName: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureName) 
        ? prev.filter(f => f !== featureName)
        : [...prev, featureName]
    );
  };

  const generateEstimate = () => {
    setShowEstimate(true);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-card px-4 py-2 rounded-full border border-border mb-6">
            <Calculator className="text-primary" size={20} />
            <span className="text-sm font-semibold">Project Estimator</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="calculator-title">
            Investment Calculator
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="calculator-description">
            Get an instant estimate for your project. Early-stage agency pricing designed for startups and small businesses looking to scale fast.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="text-primary" size={24} />
                <span>Configure Your Project</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <label className="block text-sm font-semibold mb-3">Project Type</label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger data-testid="select-project-type">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map(type => (
                      <SelectItem key={type.name} value={type.name}>
                        {type.name} - From ${type.base.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">
                  Complexity Level: {complexity[0]}x
                </label>
                <Slider
                  value={complexity}
                  onValueChange={setComplexity}
                  min={0.5}
                  max={3}
                  step={0.1}
                  className="w-full"
                  data-testid="slider-complexity"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Simple</span>
                  <span>Standard</span>
                  <span>Complex</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Additional Features</label>
                <div className="grid grid-cols-2 gap-3">
                  {features.map(feature => (
                    <div key={feature.name} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedFeatures.includes(feature.name)}
                        onCheckedChange={() => handleFeatureToggle(feature.name)}
                        data-testid={`checkbox-${feature.name.toLowerCase().replace(/ /g, '-')}`}
                      />
                      <label className="text-sm">
                        {feature.name} 
                        <span className="text-muted-foreground"> (+${feature.price.toLocaleString()})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={generateEstimate}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!projectType}
                data-testid="button-generate-estimate"
              >
                Generate Estimate <Calculator className="ml-2" size={16} />
              </Button>
            </CardContent>
          </Card>

          <Card className="card-3d bg-gradient-to-br from-primary/10 to-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="text-primary" size={24} />
                <span>Project Estimate</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showEstimate || !projectType ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Calculator className="mx-auto mb-4 opacity-50" size={48} />
                  <p>Configure your project to see estimate</p>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2" data-testid="estimate-total">
                      ${totalPrice.toLocaleString()}
                    </div>
                    <p className="text-muted-foreground">Investment Range</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Base Price:</span>
                      <span className="font-semibold">${basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Complexity ({complexity[0]}x):</span>
                      <span className="font-semibold">${Math.round(basePrice * (complexityMultiplier - 1) * (selectedProject?.multiplier || 1)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Features ({selectedFeatures.length}):</span>
                      <span className="font-semibold">${featuresPrice.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>Total Investment:</span>
                      <span className="text-primary">${totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-4 border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="text-primary" size={16} />
                      <span className="font-semibold">Timeline</span>
                    </div>
                    <p className="text-muted-foreground">{duration}</p>
                  </div>

                  <div className="space-y-2">
                    <Badge variant="secondary" className="w-full justify-center py-2">
                      ✓ Free Consultation Included
                    </Badge>
                    <Badge variant="secondary" className="w-full justify-center py-2">
                      ✓ 30-Day Post-Launch Support
                    </Badge>
                    <Badge variant="secondary" className="w-full justify-center py-2">
                      ✓ Source Code & Documentation
                    </Badge>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent text-white"
                    data-testid="button-book-consultation"
                  >
                    Book Free Consultation
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}