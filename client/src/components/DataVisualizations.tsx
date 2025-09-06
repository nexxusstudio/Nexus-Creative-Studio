import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { TrendingUp, DollarSign, Users, Globe, BarChart3, PieChart as PieChartIcon } from "lucide-react";

const revenueData = [
  { month: 'Jan', revenue: 45000, projects: 8 },
  { month: 'Feb', revenue: 52000, projects: 9 },
  { month: 'Mar', revenue: 48000, projects: 7 },
  { month: 'Apr', revenue: 61000, projects: 11 },
  { month: 'May', revenue: 73000, projects: 13 },
  { month: 'Jun', revenue: 68000, projects: 12 },
];

const serviceDistribution = [
  { name: 'Web Development', value: 35, color: '#3b82f6' },
  { name: 'Blockchain/Web3', value: 25, color: '#10b981' },
  { name: 'Design & UX', value: 20, color: '#8b5cf6' },
  { name: 'Consulting', value: 20, color: '#f59e0b' },
];

const skillRadarData = [
  { skill: 'Frontend', fullMark: 100, value: 95 },
  { skill: 'Backend', fullMark: 100, value: 92 },
  { skill: 'Blockchain', fullMark: 100, value: 88 },
  { skill: 'Design', fullMark: 100, value: 85 },
  { skill: 'DevOps', fullMark: 100, value: 90 },
  { skill: 'Strategy', fullMark: 100, value: 96 },
];

const clientGrowth = [
  { quarter: 'Q1 2023', clients: 12, retention: 85 },
  { quarter: 'Q2 2023', clients: 18, retention: 89 },
  { quarter: 'Q3 2023', clients: 24, retention: 92 },
  { quarter: 'Q4 2023', clients: 31, retention: 95 },
  { quarter: 'Q1 2024', clients: 42, retention: 97 },
  { quarter: 'Q2 2024', clients: 58, retention: 98 },
];

export function DataVisualizations() {
  const [activeChart, setActiveChart] = useState("revenue");

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-card px-4 py-2 rounded-full border border-border mb-6">
            <BarChart3 className="text-primary" size={20} />
            <span className="text-sm font-semibold">Performance Analytics</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="visualizations-title">
            Data-Driven Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="visualizations-description">
            Transparent metrics and performance data showcasing consistent growth, client success, and technical excellence across all our brands.
          </p>
        </div>

        <Tabs value={activeChart} onValueChange={setActiveChart} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="revenue" data-testid="tab-revenue">
              <DollarSign className="mr-2" size={16} />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="services" data-testid="tab-services">
              <PieChartIcon className="mr-2" size={16} />
              Services
            </TabsTrigger>
            <TabsTrigger value="skills" data-testid="tab-skills">
              <BarChart3 className="mr-2" size={16} />
              Skills
            </TabsTrigger>
            <TabsTrigger value="growth" data-testid="tab-growth">
              <TrendingUp className="mr-2" size={16} />
              Growth
            </TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="text-green-500" size={24} />
                  <span>Revenue & Project Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-500">$347K</div>
                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-500">60</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-500">$5.8K</div>
                    <div className="text-sm text-muted-foreground">Avg Project</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChartIcon className="text-purple-500" size={24} />
                  <span>Service Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={serviceDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {serviceDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    {serviceDistribution.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: service.color }}
                          />
                          <span className="font-semibold">{service.name}</span>
                        </div>
                        <Badge variant="secondary">{service.value}%</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="text-blue-500" size={24} />
                  <span>Technical Expertise</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={skillRadarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="skill" tick={{ fill: 'hsl(var(--foreground))' }} />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]} 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Radar
                        name="Skills"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="text-green-500" size={24} />
                  <span>Client Growth & Retention</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={clientGrowth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="quarter" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="clients" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="retention" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--accent))', r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">58</div>
                    <div className="text-sm text-muted-foreground">Active Clients</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent">98%</div>
                    <div className="text-sm text-muted-foreground">Retention Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}