import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, ArrowRight, Calendar, Users, Code, Rocket } from "lucide-react";

const roadmapSteps = [
  {
    phase: "Discovery & Strategy",
    duration: "Week 1-2",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    tasks: [
      "Stakeholder interviews and requirements gathering",
      "Competitive analysis and market research", 
      "Technical architecture planning",
      "Project timeline and milestone definition"
    ],
    deliverables: ["Strategy Document", "Technical Roadmap", "Project Plan"]
  },
  {
    phase: "Design & Prototyping",
    duration: "Week 2-4",
    icon: Code,
    color: "from-purple-500 to-pink-500", 
    tasks: [
      "User experience design and wireframing",
      "Visual design and brand integration",
      "Interactive prototype development",
      "Stakeholder feedback and iterations"
    ],
    deliverables: ["Design System", "Interactive Prototype", "User Flows"]
  },
  {
    phase: "Development & Implementation",
    duration: "Week 4-8",
    icon: Code,
    color: "from-green-500 to-emerald-500",
    tasks: [
      "Frontend and backend development",
      "Database design and API creation",
      "Third-party integrations and services",
      "Quality assurance and testing"
    ],
    deliverables: ["MVP Release", "API Documentation", "Test Reports"]
  },
  {
    phase: "Launch & Optimization",
    duration: "Week 8-10",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    tasks: [
      "Production deployment and monitoring",
      "Performance optimization and security audit",
      "User training and documentation",
      "Post-launch support and maintenance setup"
    ],
    deliverables: ["Live Application", "Training Materials", "Support Plan"]
  }
];

export function InteractiveRoadmap() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  const markStepCompleted = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-card px-4 py-2 rounded-full border border-border mb-6">
            <Calendar className="text-primary" size={20} />
            <span className="text-sm font-semibold">Project Process</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="roadmap-title">
            Your Success Roadmap
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="roadmap-description">
            Our proven 4-phase methodology ensures your project succeeds from concept to launch. Transparent process, clear milestones.
          </p>
        </div>

        {/* Timeline Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4 bg-card rounded-full p-2 border border-border">
            {roadmapSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                  activeStep === index 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-secondary'
                }`}
                data-testid={`roadmap-nav-${index}`}
              >
                {completedSteps.includes(index) ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <Circle size={16} />
                )}
                <span className="text-sm font-semibold">Phase {index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Step Details */}
        <Card className="card-3d bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${roadmapSteps[activeStep].color}`}>
                    {(() => {
                      const IconComponent = roadmapSteps[activeStep].icon;
                      return <IconComponent className="text-white" size={32} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold" data-testid="active-phase-title">
                      {roadmapSteps[activeStep].phase}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={`bg-gradient-to-r ${roadmapSteps[activeStep].color} text-white`}>
                        {roadmapSteps[activeStep].duration}
                      </Badge>
                      <Badge variant="outline">
                        Phase {activeStep + 1} of {roadmapSteps.length}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Key Activities</h4>
                  <div className="space-y-2">
                    {roadmapSteps[activeStep].tasks.map((task, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Phase Deliverables</h4>
                  <div className="flex flex-wrap gap-2">
                    {roadmapSteps[activeStep].deliverables.map((deliverable, index) => (
                      <Badge 
                        key={index}
                        variant="secondary" 
                        className="bg-secondary hover:bg-secondary/80"
                      >
                        ✓ {deliverable}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  {activeStep > 0 && (
                    <Button 
                      variant="outline"
                      onClick={() => setActiveStep(activeStep - 1)}
                      data-testid="button-prev-phase"
                    >
                      Previous Phase
                    </Button>
                  )}
                  {activeStep < roadmapSteps.length - 1 ? (
                    <Button 
                      onClick={() => setActiveStep(activeStep + 1)}
                      className={`bg-gradient-to-r ${roadmapSteps[activeStep].color} text-white`}
                      data-testid="button-next-phase"
                    >
                      Next Phase <ArrowRight className="ml-2" size={16} />
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => markStepCompleted(activeStep)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      data-testid="button-complete-phase"
                    >
                      Complete Project <CheckCircle className="ml-2" size={16} />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-lg font-semibold">Project Overview</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-card/50 rounded-xl border border-border">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {activeStep + 1}/{roadmapSteps.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Current Phase
                    </div>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-xl border border-border">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {Math.round((activeStep + 1) / roadmapSteps.length * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Progress
                    </div>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-xl border border-border">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {completedSteps.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Completed
                    </div>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-xl border border-border">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {roadmapSteps[activeStep].tasks.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tasks
                    </div>
                  </div>
                </div>

                <h4 className="text-lg font-semibold">Process Benefits</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border">
                    <div>
                      <div className="font-semibold text-sm">Transparent Communication</div>
                      <div className="text-xs text-muted-foreground">Weekly progress updates</div>
                    </div>
                    <Badge variant="outline" className="text-xs">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border">
                    <div>
                      <div className="font-semibold text-sm">Quality Assurance</div>
                      <div className="text-xs text-muted-foreground">Continuous testing & review</div>
                    </div>
                    <Badge variant="outline" className="text-xs">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border">
                    <div>
                      <div className="font-semibold text-sm">Risk Mitigation</div>
                      <div className="text-xs text-muted-foreground">Proactive issue resolution</div>
                    </div>
                    <Badge variant="outline" className="text-xs">✓</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}