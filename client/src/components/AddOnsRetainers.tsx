import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, Clock, Users, Zap, Shield, Star, ArrowRight } from "lucide-react";

interface AddOn {
  name: string;
  description: string;
  price: string;
  icon: React.ComponentType<any>;
  gradient: string;
  features: string[];
  category: 'support' | 'delivery' | 'enhancement' | 'maintenance';
  popular?: boolean;
}

interface RetainerTier {
  name: string;
  description: string;
  hours: string;
  price: string;
  gradient: string;
  icon: React.ComponentType<any>;
  features: string[];
  popular?: boolean;
  idealFor: string[];
}

const universalAddOns: AddOn[] = [
  {
    name: "Priority Support",
    description: "24/7 priority support with faster response times and dedicated communication channel",
    price: "$500/month",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "24/7 priority support queue",
      "Dedicated Slack channel",
      "2-hour response time guarantee",
      "Direct phone line access",
      "Weekly status calls"
    ],
    category: 'support',
    popular: true
  },
  {
    name: "Rush Delivery",
    description: "Expedited project timeline with dedicated team allocation for faster delivery",
    price: "+25-50% of project fee",
    icon: Zap,
    gradient: "from-orange-500 to-red-500",
    features: [
      "50% faster delivery timeline",
      "Dedicated team allocation",
      "Daily progress updates",
      "Priority resource allocation",
      "Weekend work included"
    ],
    category: 'delivery'
  },
  {
    name: "Extended Revisions",
    description: "Additional revision rounds beyond standard project scope for perfect outcomes",
    price: "$1,000 - $3,000",
    icon: Plus,
    gradient: "from-purple-500 to-pink-500",
    features: [
      "3-5 additional revision rounds",
      "Extended feedback period",
      "Minor scope adjustments",
      "A/B testing options",
      "User feedback incorporation"
    ],
    category: 'enhancement'
  },
  {
    name: "Training & Documentation",
    description: "Comprehensive team training and detailed documentation for seamless handover",
    price: "$2,000 - $5,000",
    icon: Users,
    gradient: "from-green-500 to-emerald-500",
    features: [
      "Team training sessions (4-8 hours)",
      "Comprehensive documentation",
      "Video tutorials creation",
      "Best practices guide",
      "30-day post-training support"
    ],
    category: 'enhancement'
  },
  {
    name: "Maintenance & Updates",
    description: "Ongoing maintenance, security updates, and performance optimization",
    price: "$500 - $2,000/month",
    icon: Star,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Monthly security updates",
      "Performance monitoring",
      "Bug fixes & improvements",
      "Technology stack updates",
      "Analytics & reporting"
    ],
    category: 'maintenance',
    popular: true
  }
];

const retainerTiers: RetainerTier[] = [
  {
    name: "Starter Retainer",
    description: "Perfect for small businesses needing regular development support",
    hours: "20-30 hours/month",
    price: "$3,000 - $5,000/month",
    gradient: "from-blue-500 to-cyan-500",
    icon: Clock,
    features: [
      "20-30 development hours monthly",
      "Regular updates & maintenance",
      "Basic support & consultation",
      "Monthly progress reports",
      "Email support",
      "2-week notice for changes"
    ],
    idealFor: [
      "Small to medium businesses",
      "Regular website updates",
      "Basic feature development",
      "Ongoing maintenance needs"
    ]
  },
  {
    name: "Growth Retainer", 
    description: "Ideal for growing companies with evolving development needs",
    hours: "50-75 hours/month",
    price: "$8,000 - $15,000/month",
    gradient: "from-purple-500 to-pink-500",
    icon: Zap,
    features: [
      "50-75 development hours monthly",
      "Feature development & optimization",
      "Strategic consultation included",
      "Bi-weekly planning sessions",
      "Priority support & communication",
      "1-week notice for changes",
      "Quarterly strategy reviews"
    ],
    popular: true,
    idealFor: [
      "Scale-up companies",
      "Product development teams",
      "Regular feature rollouts",
      "Strategic growth initiatives"
    ]
  },
  {
    name: "Enterprise Retainer",
    description: "Comprehensive partnership for enterprise-level development needs",
    hours: "100+ hours/month",
    price: "$20,000 - $50,000/month",
    gradient: "from-yellow-500 to-orange-500", 
    icon: Shield,
    features: [
      "Dedicated team allocation",
      "Unlimited development hours",
      "Strategic partnership level",
      "Weekly executive reviews",
      "24/7 priority support",
      "Same-day response guarantee",
      "Custom SLA agreements",
      "Quarterly business reviews"
    ],
    idealFor: [
      "Enterprise organizations",
      "Mission-critical applications",
      "Complex development projects",
      "Long-term partnerships"
    ]
  }
];

interface AddOnsRetainersProps {
  brandName?: string;
  brandColor?: string;
  onContactClick?: () => void;
}

export function AddOnsRetainers({ 
  brandName = "Nexus Creative Studio", 
  brandColor = "primary",
  onContactClick
}: AddOnsRetainersProps) {
  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'support': return 'Support & Communication';
      case 'delivery': return 'Timeline & Delivery';
      case 'enhancement': return 'Scope & Enhancements';
      case 'maintenance': return 'Ongoing Maintenance';
      default: return 'Additional Services';
    }
  };

  const getCategoryAddOns = (category: string) => {
    return universalAddOns.filter(addon => addon.category === category);
  };

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Add-Ons Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Service Add-Ons & Enhancements
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enhance your project with premium add-ons designed to accelerate delivery, improve quality, and provide ongoing support.
            </p>
          </div>

          {/* Add-Ons by Category */}
          {['support', 'delivery', 'enhancement', 'maintenance'].map((category) => {
            const categoryAddOns = getCategoryAddOns(category);
            if (categoryAddOns.length === 0) return null;

            return (
              <div key={category} className="mb-16">
                <h3 className="text-2xl font-bold mb-8 text-center">
                  {getCategoryTitle(category)}
                </h3>
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {categoryAddOns.map((addon, index) => (
                    <Card 
                      key={addon.name}
                      className={`group hover-lift bg-card border theme-transition relative ${
                        addon.popular ? 'border-primary shadow-lg' : 'border-border'
                      }`}
                    >
                      {addon.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-primary text-primary-foreground px-4 py-1">
                            Popular
                          </Badge>
                        </div>
                      )}
                      
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${addon.gradient} rounded-xl flex items-center justify-center mr-4`}>
                            <addon.icon className="text-white" size={24} />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold">{addon.name}</h4>
                            <div className="text-primary font-semibold">{addon.price}</div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 text-sm">
                          {addon.description}
                        </p>
                        
                        <ul className="space-y-2 mb-6">
                          {addon.features.map((feature, featureIndex) => (
                            <li key={feature} className="flex items-start text-sm">
                              <Check className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={14} />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button 
                          onClick={handleContactClick}
                          className="w-full"
                          variant={addon.popular ? "default" : "outline"}
                        >
                          Add to Project
                          <Plus className="ml-2 w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Retainer Packages Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ongoing Partnership Retainers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Secure dedicated development capacity with our flexible retainer packages designed for long-term growth and success.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {retainerTiers.map((tier, index) => (
              <Card 
                key={tier.name}
                className={`group hover-lift bg-card rounded-2xl border theme-transition hover:shadow-lg relative ${
                  tier.popular ? 'border-primary scale-105 shadow-lg' : 'border-border'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-6 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${tier.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <tier.icon className="text-white" size={32} />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">
                      {tier.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4">
                      {tier.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="text-primary font-bold text-2xl">{tier.price}</div>
                      <div className="text-xs text-muted-foreground">{tier.hours}</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={feature} className="flex items-start text-sm">
                          <Check className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={14} />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Ideal For:</h4>
                    <ul className="space-y-1">
                      {tier.idealFor.map((item, itemIndex) => (
                        <li key={item} className="text-sm text-muted-foreground">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={handleContactClick}
                    className={`w-full transition-all duration-300 group ${
                      tier.popular 
                        ? 'bg-primary text-primary-foreground hover:opacity-90' 
                        : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                    }`}
                  >
                    Start Retainer
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Retainer CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20 text-center">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every business is unique. Let's design a custom retainer package that perfectly fits your specific needs and growth trajectory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleContactClick}
                size="lg"
                className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:opacity-90"
              >
                Discuss Custom Package
              </Button>
              <Button 
                onClick={() => {
                  const element = document.getElementById('calculator');
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold"
              >
                Calculate Investment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}