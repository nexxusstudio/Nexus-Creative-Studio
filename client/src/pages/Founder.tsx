import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Award, 
  Users, 
  Target, 
  TrendingUp, 
  Linkedin, 
  Github, 
  Twitter,
  Download,
  MessageCircle,
  Star,
  Building,
  Briefcase,
  GraduationCap,
  Rocket
} from "lucide-react";
import founderImage from "@assets/JH1_1756704209882.png";
import founderCover from "@assets/JHS1_1756704209882.png";

const timeline = [
  {
    year: "2019",
    title: "Tech Journey Begins",
    description: "Started learning programming and web development, focusing on modern JavaScript frameworks",
    icon: GraduationCap,
    type: "education"
  },
  {
    year: "2020",
    title: "First Client Projects",
    description: "Launched freelancing career, delivering web applications for local businesses",
    icon: Briefcase,
    type: "career"
  },
  {
    year: "2021", 
    title: "Blockchain Exploration",
    description: "Entered Web3 space, developed smart contracts and DeFi applications",
    icon: Target,
    type: "expansion"
  },
  {
    year: "2022",
    title: "Founded Nexus Creative Studio",
    description: "Established agency brand, scaling team and service offerings",
    icon: Building,
    type: "milestone"
  },
  {
    year: "2023",
    title: "Multi-Brand Strategy",
    description: "Launched Crypto Nexus and Byte Studio as specialized verticals",
    icon: Rocket,
    type: "growth"
  },
  {
    year: "2024",
    title: "Authority & Scale",
    description: "Established thought leadership, speaking engagements, and enterprise partnerships",
    icon: Award,
    type: "recognition"
  }
];

const skills = [
  { name: "Full-Stack Development", level: 95, color: "from-blue-500 to-cyan-500" },
  { name: "Blockchain Development", level: 90, color: "from-green-500 to-emerald-500" },
  { name: "AI/ML Integration", level: 85, color: "from-purple-500 to-pink-500" },
  { name: "Team Leadership", level: 92, color: "from-orange-500 to-red-500" },
  { name: "Strategic Planning", level: 88, color: "from-indigo-500 to-purple-500" },
  { name: "Client Relations", level: 96, color: "from-green-400 to-blue-500" }
];

const achievements = [
  {
    metric: "50+",
    label: "Projects Delivered",
    description: "Successfully completed projects across various industries"
  },
  {
    metric: "98%",
    label: "Client Satisfaction",
    description: "Consistent high-quality delivery and client relationships"
  },
  {
    metric: "5+",
    label: "Years Experience",
    description: "Deep expertise in modern web and blockchain technologies"
  },
  {
    metric: "3",
    label: "Successful Brands",
    description: "Built and scaled multiple specialized brand verticals"
  }
];

const testimonials = [
  {
    quote: "Jobayer transformed our vision into a reality. His technical expertise and strategic thinking are exceptional.",
    author: "Sarah Johnson",
    company: "TechStart Inc.",
    rating: 5
  },
  {
    quote: "Outstanding work on our DeFi platform. Delivered ahead of schedule with innovative features.",
    author: "Michael Chen",
    company: "CryptoFinance",
    rating: 5
  },
  {
    quote: "A true professional who understands both technical implementation and business strategy.",
    author: "Emma Davis",
    company: "Digital Ventures",
    rating: 5
  }
];

export default function Founder() {
  const heroRef = useScrollAnimation();
  const timelineRef = useScrollAnimation();
  const skillsRef = useScrollAnimation();
  const achievementsRef = useScrollAnimation();
  const testimonialsRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <ParticleBackground />
        
        {/* Background Cover Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${founderCover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70 z-1"></div>

        <div className="content-layer max-w-7xl mx-auto px-6 py-20 z-10" ref={heroRef}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" data-testid="availability-status"></div>
                  <span className="text-sm text-muted-foreground">Available for Strategic Consulting</span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight" data-testid="founder-title">
                  Jobayer Hoque{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-glow">
                    Siddique
                  </span>
                </h1>

                <h2 className="text-2xl lg:text-3xl text-muted-foreground font-medium" data-testid="founder-tagline">
                  Founder. Builder. Vision-Driven.
                </h2>

                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed" data-testid="founder-description">
                  On a mission to connect design, systems, and Web3 innovation. Building the future through strategic technology leadership and creative problem-solving.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:opacity-90 theme-transition btn-ripple"
                  data-testid="button-book-consultation"
                >
                  <Calendar className="mr-2" size={20} />
                  Book Consultation
                </Button>
                <Button 
                  variant="outline"
                  className="border border-border px-8 py-4 text-lg font-semibold hover:bg-secondary theme-transition"
                  data-testid="button-download-resume"
                >
                  <Download className="mr-2" size={20} />
                  Download Resume
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {achievements.map((achievement, index) => (
                  <div key={achievement.label} className="text-center" data-testid={`achievement-${index}`}>
                    <div className="text-3xl font-bold text-primary animate-neon-pulse">{achievement.metric}</div>
                    <div className="text-sm text-muted-foreground">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl transform rotate-3 animate-morphing"></div>
                <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl p-1 shadow-2xl">
                  <img 
                    src={founderImage} 
                    alt="Jobayer Hoque Siddique - Founder & CEO" 
                    className="w-full h-auto rounded-2xl"
                    data-testid="founder-profile-image"
                  />
                </div>
              </div>

              {/* Floating Achievement Badges */}
              <div className="absolute -top-6 -right-6 bg-card/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border animate-float">
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-500" size={20} />
                  <span className="text-sm font-semibold">Top Rated</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <Users className="text-blue-500" size={20} />
                  <span className="text-sm font-semibold">50+ Clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6" ref={timelineRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="timeline-title">
              My Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="timeline-description">
              From curious developer to founding multiple successful brands - here's how the vision evolved.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={item.year}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  data-testid={`timeline-item-${index}`}
                >
                  <div className={`w-full max-w-md ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Card className="bg-card/80 backdrop-blur-sm border border-border hover-lift theme-transition">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${
                            item.type === 'education' ? 'from-blue-500 to-cyan-500' :
                            item.type === 'career' ? 'from-green-500 to-emerald-500' :
                            item.type === 'expansion' ? 'from-purple-500 to-pink-500' :
                            item.type === 'milestone' ? 'from-orange-500 to-red-500' :
                            item.type === 'growth' ? 'from-indigo-500 to-purple-500' :
                            'from-yellow-500 to-orange-500'
                          }`}>
                            <item.icon className="text-white" size={20} />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-primary">{item.year}</div>
                            <div className="text-sm text-muted-foreground capitalize">{item.type}</div>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2" data-testid={`timeline-title-${index}`}>{item.title}</h3>
                        <p className="text-muted-foreground" data-testid={`timeline-description-${index}`}>{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6" ref={skillsRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="skills-title">
              Core Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="skills-description">
              Technical skills and leadership capabilities developed through years of hands-on experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2" data-testid={`skill-${index}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={skill.level} 
                      className="h-3"
                    />
                    <div 
                      className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="bg-card border border-border hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <TrendingUp className="text-primary" size={24} />
                    <h3 className="text-2xl font-bold" data-testid="impact-title">Business Impact</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Revenue Generated</span>
                      <span className="font-bold text-primary">$2M+</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Team Members Led</span>
                      <span className="font-bold text-primary">15+</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Industries Served</span>
                      <span className="font-bold text-primary">8+</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-muted-foreground">Startup Success Rate</span>
                      <span className="font-bold text-primary">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6" data-testid="specializations-title">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React/Next.js", "Node.js", "TypeScript", "Solidity", "Python", 
                      "AWS", "Docker", "PostgreSQL", "MongoDB", "Web3", "AI/ML",
                      "Team Leadership", "Product Strategy", "Agile/Scrum"
                    ].map((tech, index) => (
                      <Badge 
                        key={tech} 
                        variant="secondary"
                        className="bg-secondary hover:bg-secondary/80 transition-colors"
                        data-testid={`specialization-${index}`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Recognition */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6" ref={achievementsRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="achievements-title">
              Recognition & Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="achievements-description">
              Measurable results and industry recognition earned through consistent delivery and innovation.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 mb-16">
            {achievements.map((achievement, index) => (
              <Card 
                key={achievement.label}
                className="text-center bg-card border border-border hover-lift theme-transition"
                data-testid={`achievement-card-${index}`}
              >
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-primary mb-2 animate-neon-pulse">
                    {achievement.metric}
                  </div>
                  <div className="text-lg font-semibold mb-2">{achievement.label}</div>
                  <div className="text-sm text-muted-foreground">{achievement.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Signals */}
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-card border border-border hover-lift">
              <CardContent className="p-8 text-center">
                <Linkedin className="text-blue-500 mx-auto mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2" data-testid="linkedin-title">LinkedIn Authority</h3>
                <p className="text-muted-foreground mb-4">Thought leadership content and professional network</p>
                <Button 
                  variant="outline"
                  className="border border-border hover:bg-secondary"
                  data-testid="button-linkedin"
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover-lift">
              <CardContent className="p-8 text-center">
                <Award className="text-green-500 mx-auto mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2" data-testid="upwork-title">Top-Rated Freelancer</h3>
                <p className="text-muted-foreground mb-4">100% Job Success Score on Upwork</p>
                <Button 
                  variant="outline"
                  className="border border-border hover:bg-secondary"
                  data-testid="button-upwork"
                >
                  View Portfolio
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover-lift">
              <CardContent className="p-8 text-center">
                <Users className="text-purple-500 mx-auto mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2" data-testid="speaking-title">Speaking Engagements</h3>
                <p className="text-muted-foreground mb-4">Tech conferences and industry events</p>
                <Button 
                  variant="outline"
                  className="border border-border hover:bg-secondary"
                  data-testid="button-speaking"
                >
                  View Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6" ref={testimonialsRef}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="testimonials-title">
              What Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="testimonials-description">
              Real feedback from entrepreneurs and businesses who've trusted me with their vision.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="bg-card border border-border hover-lift theme-transition"
                data-testid={`testimonial-${index}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-500 fill-current" size={16} />
                    ))}
                  </div>
                  
                  <blockquote className="text-muted-foreground mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="border-t border-border pt-4">
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold" data-testid="cta-title">
              Ready to Build Something{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Extraordinary?
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="cta-description">
              Let's discuss your vision and create a strategic roadmap for turning your ideas into reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:opacity-90 theme-transition btn-ripple"
                data-testid="button-schedule-call"
              >
                <Calendar className="mr-2" size={20} />
                Schedule Strategy Call
              </Button>
              <Button 
                variant="outline"
                className="border border-border px-8 py-4 text-lg font-semibold hover:bg-secondary theme-transition"
                data-testid="button-start-project"
              >
                <MessageCircle className="mr-2" size={20} />
                Start a Project
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 pt-8 opacity-70">
              <div className="flex items-center space-x-2">
                <Linkedin className="text-blue-500" size={20} />
                <span className="text-sm text-muted-foreground">LinkedIn</span>
              </div>
              <div className="flex items-center space-x-2">
                <Github className="text-foreground" size={20} />
                <span className="text-sm text-muted-foreground">GitHub</span>
              </div>
              <div className="flex items-center space-x-2">
                <Twitter className="text-blue-400" size={20} />
                <span className="text-sm text-muted-foreground">Twitter</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}