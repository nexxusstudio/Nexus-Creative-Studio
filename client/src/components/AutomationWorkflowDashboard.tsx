import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Play,
  Pause,
  Settings,
  Mail,
  Clock,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  MessageSquare,
  Send,
  User,
  Building,
  DollarSign,
  BarChart3
} from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  conditions: Array<{
    field: string;
    operator: string;
    value: string;
  }>;
  actions: Array<{
    type: string;
    config: Record<string, any>;
  }>;
  isActive: boolean;
  totalRuns: number;
  lastRun?: string;
  createdAt: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'follow_up' | 'proposal' | 'thank_you' | 'custom';
  variables: string[];
  isActive: boolean;
}

interface LeadNurturingSequence {
  id: string;
  name: string;
  description: string;
  triggerEvent: string;
  steps: Array<{
    delay: number; // in hours
    action: string;
    templateId: string;
    conditions?: Array<{
      field: string;
      operator: string;
      value: string;
    }>;
  }>;
  isActive: boolean;
  enrolledLeads: number;
  completionRate: number;
}

interface AutomationMetrics {
  totalRules: number;
  activeRules: number;
  totalRuns: number;
  successRate: number;
  emailsSent: number;
  leadsNurtured: number;
  conversions: number;
}

const triggerTypes = [
  { value: 'contact_form_submitted', label: 'Contact Form Submitted' },
  { value: 'project_inquiry', label: 'Project Inquiry Received' },
  { value: 'lead_score_threshold', label: 'Lead Score Threshold Met' },
  { value: 'email_opened', label: 'Email Opened' },
  { value: 'email_clicked', label: 'Email Link Clicked' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'contract_signed', label: 'Contract Signed' },
  { value: 'payment_received', label: 'Payment Received' },
  { value: 'project_completed', label: 'Project Completed' },
  { value: 'follow_up_due', label: 'Follow-up Due' }
];

const actionTypes = [
  { value: 'send_email', label: 'Send Email' },
  { value: 'update_lead_score', label: 'Update Lead Score' },
  { value: 'assign_to_team', label: 'Assign to Team Member' },
  { value: 'create_task', label: 'Create Task' },
  { value: 'update_status', label: 'Update Contact Status' },
  { value: 'schedule_follow_up', label: 'Schedule Follow-up' },
  { value: 'send_slack_notification', label: 'Send Slack Notification' },
  { value: 'create_calendar_event', label: 'Create Calendar Event' },
  { value: 'webhook', label: 'Send Webhook' }
];

const defaultTemplates: EmailTemplate[] = [
  {
    id: 'welcome_new_lead',
    name: 'Welcome New Lead',
    subject: 'Thanks for reaching out to Nexus Creative Studio!',
    content: `Hi {{firstName}},

Thank you for reaching out to Nexus Creative Studio! We're excited about the possibility of working together on your {{projectType}} project.

We've received your inquiry and here's what happens next:

1. **Review & Analysis** (24 hours): Our team will review your requirements and analyze your project scope
2. **Custom Proposal** (2-3 business days): We'll prepare a detailed proposal with timeline and transparent pricing
3. **Discovery Call** (After proposal review): We'll schedule a call to discuss your vision and answer any questions

**Your Project Summary:**
- Project Type: {{projectType}}
- Budget Range: {{budgetRange}}
- Timeline: {{timeline}}
- Primary Goal: {{primaryGoal}}

If you have any urgent questions, feel free to reply to this email or schedule a quick call here: [Calendar Link]

Best regards,
The Nexus Creative Studio Team

P.S. Follow our journey and latest work on LinkedIn: [LinkedIn Link]`,
    type: 'welcome',
    variables: ['firstName', 'lastName', 'projectType', 'budgetRange', 'timeline', 'primaryGoal', 'company'],
    isActive: true
  },
  {
    id: 'follow_up_day_3',
    name: '3-Day Follow-up',
    subject: 'Quick follow-up on your {{projectType}} project',
    content: `Hi {{firstName}},

I wanted to follow up on your {{projectType}} project inquiry from a few days ago.

Have you had a chance to review our proposal? I'd love to answer any questions you might have and discuss how we can bring your vision to life.

Here are a few quick wins we could implement immediately:
- {{quickWin1}}
- {{quickWin2}}
- {{quickWin3}}

Would you be available for a 15-minute call this week? You can book directly here: [Calendar Link]

Looking forward to hearing from you!

Best,
{{teamMember}}
Nexus Creative Studio`,
    type: 'follow_up',
    variables: ['firstName', 'projectType', 'quickWin1', 'quickWin2', 'quickWin3', 'teamMember'],
    isActive: true
  },
  {
    id: 'proposal_sent',
    name: 'Proposal Sent',
    subject: 'Your custom proposal for {{projectType}} is ready!',
    content: `Hi {{firstName}},

Great news! Your custom proposal for the {{projectType}} project is ready.

**Proposal Highlights:**
- Investment Range: {{proposalAmount}}
- Timeline: {{proposalTimeline}}
- Key Deliverables: {{keyDeliverables}}
- Support Included: {{supportIncluded}}

**Next Steps:**
1. Review the attached proposal
2. Schedule a discussion call: [Calendar Link]
3. Ask any questions you might have
4. Move forward when you're ready

This proposal is valid for 30 days and reflects our current availability. To secure your project slot, we'll need a 50% deposit to begin.

Questions? Reply to this email or call me directly at {{phone}}.

Excited to potentially work together!

Best regards,
{{teamMember}}
Nexus Creative Studio`,
    type: 'proposal',
    variables: ['firstName', 'projectType', 'proposalAmount', 'proposalTimeline', 'keyDeliverables', 'supportIncluded', 'teamMember', 'phone'],
    isActive: true
  }
];

export function AutomationWorkflowDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'templates' | 'sequences' | 'analytics'>('overview');
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>(defaultTemplates);
  const [nurturingSequences, setNurturingSequences] = useState<LeadNurturingSequence[]>([]);
  const [metrics, setMetrics] = useState<AutomationMetrics>({
    totalRules: 0,
    activeRules: 0,
    totalRuns: 0,
    successRate: 0,
    emailsSent: 0,
    leadsNurtured: 0,
    conversions: 0
  });
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading automation data
    const mockRules: AutomationRule[] = [
      {
        id: '1',
        name: 'Welcome Email for New Leads',
        description: 'Send welcome email immediately when contact form is submitted',
        trigger: 'contact_form_submitted',
        conditions: [],
        actions: [
          {
            type: 'send_email',
            config: { templateId: 'welcome_new_lead', delay: 0 }
          },
          {
            type: 'update_lead_score',
            config: { points: 10, reason: 'Initial contact' }
          }
        ],
        isActive: true,
        totalRuns: 47,
        lastRun: '2024-10-23T10:30:00Z',
        createdAt: '2024-10-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'High-Value Lead Alert',
        description: 'Notify team when lead score exceeds 70 points',
        trigger: 'lead_score_threshold',
        conditions: [
          { field: 'leadScore', operator: 'greater_than', value: '70' }
        ],
        actions: [
          {
            type: 'send_slack_notification',
            config: { channel: '#sales', message: 'High-value lead detected: {{firstName}} {{lastName}} from {{company}}' }
          },
          {
            type: 'assign_to_team',
            config: { assignee: 'senior_consultant' }
          }
        ],
        isActive: true,
        totalRuns: 12,
        lastRun: '2024-10-22T15:45:00Z',
        createdAt: '2024-10-01T00:00:00Z'
      },
      {
        id: '3',
        name: 'Follow-up Sequence',
        description: 'Send follow-up emails if no response within 3 days',
        trigger: 'follow_up_due',
        conditions: [
          { field: 'daysSinceLastContact', operator: 'greater_than', value: '3' },
          { field: 'status', operator: 'equals', value: 'new' }
        ],
        actions: [
          {
            type: 'send_email',
            config: { templateId: 'follow_up_day_3' }
          },
          {
            type: 'schedule_follow_up',
            config: { days: 7 }
          }
        ],
        isActive: true,
        totalRuns: 23,
        lastRun: '2024-10-23T09:15:00Z',
        createdAt: '2024-10-01T00:00:00Z'
      }
    ];

    setAutomationRules(mockRules);
    setMetrics({
      totalRules: mockRules.length,
      activeRules: mockRules.filter(r => r.isActive).length,
      totalRuns: mockRules.reduce((sum, r) => sum + r.totalRuns, 0),
      successRate: 94.2,
      emailsSent: 156,
      leadsNurtured: 47,
      conversions: 8
    });
  }, []);

  const toggleRule = (ruleId: string) => {
    setAutomationRules(prev => 
      prev.map(rule => 
        rule.id === ruleId 
          ? { ...rule, isActive: !rule.isActive }
          : rule
      )
    );
    toast({
      title: 'Automation rule updated',
      description: 'The rule status has been changed successfully.'
    });
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeRules}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.totalRules} total rules
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalRuns}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.successRate}%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversions}</div>
            <p className="text-xs text-muted-foreground">
              From {metrics.leadsNurtured} nurtured leads
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {automationRules.slice(0, 5).map(rule => (
            <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${rule.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                <div>
                  <p className="font-medium">{rule.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Last run: {rule.lastRun ? new Date(rule.lastRun).toLocaleString() : 'Never'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{rule.totalRuns} runs</p>
                <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                  {rule.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderRulesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Automation Rules</h3>
          <p className="text-muted-foreground">Configure automated workflows for lead management</p>
        </div>
        <Button onClick={() => { setEditingRule(null); setIsDialogOpen(true); }}>
          <Play className="mr-2" size={16} />
          Create Rule
        </Button>
      </div>

      <div className="grid gap-4">
        {automationRules.map(rule => (
          <Card key={rule.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{rule.name}</h4>
                    <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                      {rule.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Trigger: {triggerTypes.find(t => t.value === rule.trigger)?.label}</span>
                    <span>•</span>
                    <span>Total runs: {rule.totalRuns}</span>
                    <span>•</span>
                    <span>Last run: {rule.lastRun ? new Date(rule.lastRun).toLocaleDateString() : 'Never'}</span>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-1">Actions:</p>
                    <div className="flex flex-wrap gap-1">
                      {rule.actions.map((action, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {actionTypes.find(a => a.value === action.type)?.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    checked={rule.isActive}
                    onCheckedChange={() => toggleRule(rule.id)}
                  />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => { setEditingRule(rule); setIsDialogOpen(true); }}
                  >
                    <Settings size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTemplatesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Email Templates</h3>
          <p className="text-muted-foreground">Manage automated email templates</p>
        </div>
        <Button>
          <Mail className="mr-2" size={16} />
          Create Template
        </Button>
      </div>

      <div className="grid gap-4">
        {emailTemplates.map(template => (
          <Card key={template.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{template.name}</h4>
                    <Badge variant="outline">{template.type}</Badge>
                    <Badge variant={template.isActive ? 'default' : 'secondary'}>
                      {template.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm font-medium mb-2">Subject: {template.subject}</p>
                  
                  <div className="text-sm text-muted-foreground mb-3 max-w-2xl">
                    {template.content.substring(0, 200)}...
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.variables.map(variable => (
                      <Badge key={variable} variant="outline" className="text-xs">
                        {`{{${variable}}}`}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Mail size={16} />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings size={16} />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Automation Analytics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Email Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Emails Sent</span>
              <span className="font-bold">{metrics.emailsSent}</span>
            </div>
            <div className="flex justify-between">
              <span>Open Rate</span>
              <span className="font-bold">68.2%</span>
            </div>
            <div className="flex justify-between">
              <span>Click Rate</span>
              <span className="font-bold">23.4%</span>
            </div>
            <div className="flex justify-between">
              <span>Response Rate</span>
              <span className="font-bold">12.8%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lead Nurturing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Leads Nurtured</span>
              <span className="font-bold">{metrics.leadsNurtured}</span>
            </div>
            <div className="flex justify-between">
              <span>Conversion Rate</span>
              <span className="font-bold">17.0%</span>
            </div>
            <div className="flex justify-between">
              <span>Avg. Nurture Time</span>
              <span className="font-bold">12 days</span>
            </div>
            <div className="flex justify-between">
              <span>Revenue Generated</span>
              <span className="font-bold">$84,500</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Automation ROI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Time Saved</span>
              <span className="font-bold">24 hrs/week</span>
            </div>
            <div className="flex justify-between">
              <span>Cost per Lead</span>
              <span className="font-bold">$12.40</span>
            </div>
            <div className="flex justify-between">
              <span>ROI</span>
              <span className="font-bold text-green-600">340%</span>
            </div>
            <div className="flex justify-between">
              <span>Payback Period</span>
              <span className="font-bold">2.1 months</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rule Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automationRules.map(rule => (
              <div key={rule.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{rule.name}</p>
                  <p className="text-sm text-muted-foreground">{rule.totalRuns} executions</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">98%</p>
                  <p className="text-xs text-muted-foreground">Success rate</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Automation & Workflow Management</h1>
        <p className="text-muted-foreground">Automate your lead management and client communication</p>
      </div>

      <div className="flex border-b mb-6">
        {[
          { key: 'overview', label: 'Overview', icon: TrendingUp },
          { key: 'rules', label: 'Rules', icon: Zap },
          { key: 'templates', label: 'Templates', icon: Mail },
          { key: 'sequences', label: 'Sequences', icon: Users },
          { key: 'analytics', label: 'Analytics', icon: BarChart3 }
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

      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'rules' && renderRulesTab()}
      {activeTab === 'templates' && renderTemplatesTab()}
      {activeTab === 'sequences' && <div>Nurturing sequences coming soon...</div>}
      {activeTab === 'analytics' && renderAnalyticsTab()}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRule ? 'Edit Automation Rule' : 'Create New Automation Rule'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Rule Name</Label>
              <Input placeholder="Enter rule name..." />
            </div>
            
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Describe what this rule does..." />
            </div>
            
            <div>
              <Label>Trigger Event</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select trigger..." />
                </SelectTrigger>
                <SelectContent>
                  {triggerTypes.map(trigger => (
                    <SelectItem key={trigger.value} value={trigger.value}>
                      {trigger.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button>
                {editingRule ? 'Update' : 'Create'} Rule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}