import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  Mail,
  DollarSign,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Target,
  Activity,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon
} from 'lucide-react';

interface AnalyticsData {
  pageViews: {
    total: number;
    unique: number;
    change: number;
  };
  visitors: {
    total: number;
    returning: number;
    new: number;
    change: number;
  };
  conversions: {
    total: number;
    rate: number;
    value: number;
    change: number;
  };
  sources: Array<{
    name: string;
    visitors: number;
    conversions: number;
    value: number;
    color: string;
  }>;
  devices: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  timeline: Array<{
    date: string;
    visitors: number;
    conversions: number;
    revenue: number;
  }>;
  topPages: Array<{
    page: string;
    views: number;
    conversions: number;
    rate: string;
  }>;
  leadFlow: Array<{
    stage: string;
    count: number;
    percentage: number;
  }>;
}

interface PerformanceMetrics {
  pageSpeed: {
    desktop: number;
    mobile: number;
    change: number;
  };
  seo: {
    score: number;
    issues: number;
    opportunities: number;
  };
  uptime: {
    percentage: number;
    downtime: number;
    incidents: number;
  };
  security: {
    threats: number;
    vulnerabilities: number;
    lastScan: string;
  };
}

interface BusinessMetrics {
  mrr: number;
  arr: number;
  churn: number;
  ltv: number;
  cac: number;
  pipeline: {
    prospects: number;
    qualified: number;
    proposals: number;
    negotiations: number;
    closed: number;
  };
}

const COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  accent: '#f59e0b',
  danger: '#ef4444',
  warning: '#f97316',
  info: '#06b6d4'
};

export function AnalyticsMonitoringDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'traffic' | 'conversions' | 'performance' | 'business'>('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading analytics data
    const mockAnalyticsData: AnalyticsData = {
      pageViews: { total: 12547, unique: 8934, change: 12.3 },
      visitors: { total: 8934, returning: 3421, new: 5513, change: 8.7 },
      conversions: { total: 127, rate: 1.42, value: 89500, change: 15.8 },
      sources: [
        { name: 'Organic Search', visitors: 4567, conversions: 67, value: 45200, color: COLORS.primary },
        { name: 'Direct', visitors: 2341, conversions: 28, value: 18900, color: COLORS.secondary },
        { name: 'Social Media', visitors: 1234, conversions: 15, value: 12400, color: COLORS.accent },
        { name: 'Referral', visitors: 567, conversions: 12, value: 8900, color: COLORS.warning },
        { name: 'Email', visitors: 225, conversions: 5, value: 4100, color: COLORS.info }
      ],
      devices: [
        { name: 'Desktop', value: 52, color: COLORS.primary },
        { name: 'Mobile', value: 41, color: COLORS.secondary },
        { name: 'Tablet', value: 7, color: COLORS.accent }
      ],
      timeline: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        visitors: Math.floor(Math.random() * 400) + 200,
        conversions: Math.floor(Math.random() * 10) + 2,
        revenue: Math.floor(Math.random() * 5000) + 1000
      })),
      topPages: [
        { page: '/', views: 4521, conversions: 45, rate: '1.0%' },
        { page: '/services', views: 2134, conversions: 32, rate: '1.5%' },
        { page: '/crypto-nexus', views: 1876, conversions: 18, rate: '1.0%' },
        { page: '/byte-studio', views: 1543, conversions: 15, rate: '1.0%' },
        { page: '/founder', views: 1234, conversions: 12, rate: '1.0%' }
      ],
      leadFlow: [
        { stage: 'Visitors', count: 8934, percentage: 100 },
        { stage: 'Leads', count: 1247, percentage: 14 },
        { stage: 'Qualified', count: 428, percentage: 34 },
        { stage: 'Proposals', count: 156, percentage: 36 },
        { stage: 'Customers', count: 43, percentage: 28 }
      ]
    };

    const mockPerformanceMetrics: PerformanceMetrics = {
      pageSpeed: { desktop: 94, mobile: 87, change: 2.1 },
      seo: { score: 92, issues: 3, opportunities: 7 },
      uptime: { percentage: 99.9, downtime: 43, incidents: 1 },
      security: { threats: 0, vulnerabilities: 2, lastScan: '2024-10-23T10:00:00Z' }
    };

    const mockBusinessMetrics: BusinessMetrics = {
      mrr: 12500,
      arr: 150000,
      churn: 2.1,
      ltv: 45000,
      cac: 1200,
      pipeline: {
        prospects: 45,
        qualified: 28,
        proposals: 12,
        negotiations: 8,
        closed: 5
      }
    };

    setAnalyticsData(mockAnalyticsData);
    setPerformanceMetrics(mockPerformanceMetrics);
    setBusinessMetrics(mockBusinessMetrics);
  }, [timeRange]);

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.pageViews.total.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {analyticsData && analyticsData.pageViews.change > 0 ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              {analyticsData?.pageViews.change}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.visitors.total.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              {analyticsData?.visitors.change}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.conversions.total}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              {analyticsData?.conversions.rate}% conversion rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData?.conversions.value.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              {analyticsData?.conversions.change}% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData?.timeline || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="visitors" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.1} />
                <Area type="monotone" dataKey="conversions" stroke={COLORS.secondary} fill={COLORS.secondary} fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData?.sources.map(source => ({
                    name: source.name,
                    value: source.visitors,
                    fill: source.color
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {analyticsData?.sources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Site Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Desktop Speed</span>
                <span>{performanceMetrics?.pageSpeed.desktop}/100</span>
              </div>
              <Progress value={performanceMetrics?.pageSpeed.desktop} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Mobile Speed</span>
                <span>{performanceMetrics?.pageSpeed.mobile}/100</span>
              </div>
              <Progress value={performanceMetrics?.pageSpeed.mobile} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>SEO Score</span>
                <span>{performanceMetrics?.seo.score}/100</span>
              </div>
              <Progress value={performanceMetrics?.seo.score} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Uptime</span>
              <div className="flex items-center">
                <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                <span className="font-bold">{performanceMetrics?.uptime.percentage}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Security Threats</span>
              <div className="flex items-center">
                <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                <span className="font-bold">{performanceMetrics?.security.threats}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Open Issues</span>
              <div className="flex items-center">
                <AlertTriangle className="mr-1 h-4 w-4 text-yellow-500" />
                <span className="font-bold">{performanceMetrics?.seo.issues}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analyticsData?.devices.map(device => (
              <div key={device.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  {device.name === 'Desktop' && <Monitor className="mr-2 h-4 w-4" />}
                  {device.name === 'Mobile' && <Smartphone className="mr-2 h-4 w-4" />}
                  {device.name === 'Tablet' && <Monitor className="mr-2 h-4 w-4" />}
                  <span className="text-sm">{device.name}</span>
                </div>
                <span className="font-bold">{device.value}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTrafficTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Traffic Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={analyticsData?.timeline || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visitors" stroke={COLORS.primary} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData?.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">{page.page}</p>
                    <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{page.conversions}</p>
                    <p className="text-sm text-muted-foreground">{page.rate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.sources.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{source.name}</span>
                    <span className="text-sm">{source.visitors.toLocaleString()} visitors</span>
                  </div>
                  <Progress 
                    value={(source.visitors / (analyticsData?.visitors.total || 1)) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{source.conversions} conversions</span>
                    <span>${source.value.toLocaleString()} revenue</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderConversionsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData?.leadFlow.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{stage.stage}</span>
                  <span>{stage.count.toLocaleString()}</span>
                </div>
                <Progress value={stage.percentage} className="h-3" />
                <div className="text-xs text-muted-foreground">
                  {stage.percentage}% of previous stage
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData?.timeline.slice(-7) || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="conversions" fill={COLORS.secondary} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderBusinessTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>MRR</span>
              <span className="font-bold">${businessMetrics?.mrr.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>ARR</span>
              <span className="font-bold">${businessMetrics?.arr.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Churn Rate</span>
              <span className="font-bold">{businessMetrics?.churn}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>LTV</span>
              <span className="font-bold">${businessMetrics?.ltv.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>CAC</span>
              <span className="font-bold">${businessMetrics?.cac.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>LTV:CAC Ratio</span>
              <span className="font-bold">{businessMetrics ? (businessMetrics.ltv / businessMetrics.cac).toFixed(1) : 0}:1</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sales Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {businessMetrics && Object.entries(businessMetrics.pipeline).map(([stage, count]) => (
              <div key={stage} className="flex justify-between">
                <span className="capitalize">{stage.replace('_', ' ')}</span>
                <span className="font-bold">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Monitoring</h1>
          <p className="text-muted-foreground">Real-time insights into your business performance</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="real-time"
              checked={realTimeEnabled}
              onCheckedChange={setRealTimeEnabled}
            />
            <Label htmlFor="real-time">Real-time</Label>
          </div>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {[
          { key: 'overview', label: 'Overview', icon: BarChart3 },
          { key: 'traffic', label: 'Traffic', icon: TrendingUp },
          { key: 'conversions', label: 'Conversions', icon: Target },
          { key: 'performance', label: 'Performance', icon: Activity },
          { key: 'business', label: 'Business', icon: DollarSign }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`flex items-center px-4 py-2 font-medium ${
              activeTab === key 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab(key as any)}
          >
            <Icon className="mr-2" size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'traffic' && renderTrafficTab()}
      {activeTab === 'conversions' && renderConversionsTab()}
      {activeTab === 'performance' && <div>Performance metrics coming soon...</div>}
      {activeTab === 'business' && renderBusinessTab()}
    </div>
  );
}