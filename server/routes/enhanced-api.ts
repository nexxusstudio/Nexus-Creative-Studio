import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { env } from '../env.js';
import { insertAdvancedContactSubmissionSchema, insertAutomationRuleSchema, insertEmailTemplateSchema, insertAnalyticsEventSchema } from '../../shared/enhanced-schema.js';

const router = express.Router();

// Create Supabase client
const supabase = createClient(
  env.SUPABASE_URL || '',
  env.SUPABASE_ANON_KEY || ''
);

// Database wrapper to provide a consistent interface
const db = {
  contactSubmissions: {
    async create(data: any) {
      const { data: result, error } = await supabase
        .from('contact_submissions')
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    
    async findMany(filters: any = {}) {
      let query = supabase.from('contact_submissions').select('*');
      
      if (filters.status) query = query.eq('status', filters.status);
      if (filters.lead_priority) query = query.eq('lead_priority', filters.lead_priority);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
      }
      if (filters.limit) query = query.limit(filters.limit);
      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    
    async update(id: string, data: any) {
      const { data: result, error } = await supabase
        .from('contact_submissions')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    
    async count(filters: any = {}) {
      let query = supabase.from('contact_submissions').select('*', { count: 'exact', head: true });
      
      if (filters.status) query = query.eq('status', filters.status);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
      }
      
      const { count, error } = await query;
      if (error) throw error;
      return count || 0;
    }
  },
  
  automationRules: {
    async findMany() {
      const { data, error } = await supabase
        .from('automation_rules')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    
    async create(data: any) {
      const { data: result, error } = await supabase
        .from('automation_rules')
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    
    async update(id: string, data: any) {
      const { data: result, error } = await supabase
        .from('automation_rules')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    
    async delete(id: string) {
      const { error } = await supabase
        .from('automation_rules')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    }
  },
  
  emailTemplates: {
    async findMany() {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    
    async create(data: any) {
      const { data: result, error } = await supabase
        .from('email_templates')
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    
    async update(id: string, data: any) {
      const { data: result, error } = await supabase
        .from('email_templates')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    }
  },
  
  tasks: {
    async findMany(filters: any = {}) {
      let query = supabase.from('tasks').select('*');
      
      if (filters.status) query = query.eq('status', filters.status);
      if (filters.priority) query = query.eq('priority', filters.priority);
      if (filters.assigned_to) query = query.eq('assigned_to', filters.assigned_to);
      
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    
    async create(data: any) {
      const { data: result, error } = await supabase
        .from('tasks')
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    }
  },
  
  analytics: {
    async create(data: any) {
      const { data: result, error } = await supabase
        .from('analytics')
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    }
  }
};

// Enhanced Contact Management
router.post('/contacts/advanced', async (req: Request, res: Response) => {
  try {
    const validatedData = insertAdvancedContactSubmissionSchema.parse(req.body);
    
    const leadScore = await calculateLeadScore(validatedData);
    
    const contact = await db.contactSubmissions.create({
      ...validatedData,
      lead_score: leadScore,
      lead_priority: leadScore >= 80 ? 'HIGH' : leadScore >= 50 ? 'MEDIUM' : 'LOW',
      source: 'advanced_lead_form'
    });

    await triggerAutomationRules('contact_form_submitted', contact);

    res.json({ success: true, data: contact });
  } catch (error) {
    console.error('Error creating advanced contact:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
  }
});

router.get('/contacts', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, status, priority, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    const filters = {
      status,
      lead_priority: priority,
      search,
      limit: Number(limit),
      offset
    };
    
    const contacts = await db.contactSubmissions.findMany(filters);
    const total = await db.contactSubmissions.count(filters);
    
    res.json({
      data: contacts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

router.put('/contacts/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const contact = await db.contactSubmissions.update(id, updates);
    res.json({ success: true, data: contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Automation Rules Management
router.get('/automation/rules', async (req: Request, res: Response) => {
  try {
    const rules = await db.automationRules.findMany();
    res.json({ data: rules });
  } catch (error) {
    console.error('Error fetching automation rules:', error);
    res.status(500).json({ error: 'Failed to fetch automation rules' });
  }
});

router.post('/automation/rules', async (req: Request, res: Response) => {
  try {
    const validatedData = insertAutomationRuleSchema.parse(req.body);
    const rule = await db.automationRules.create(validatedData);
    res.json({ success: true, data: rule });
  } catch (error) {
    console.error('Error creating automation rule:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
  }
});

router.put('/automation/rules/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const rule = await db.automationRules.update(id, updates);
    res.json({ success: true, data: rule });
  } catch (error) {
    console.error('Error updating automation rule:', error);
    res.status(500).json({ error: 'Failed to update automation rule' });
  }
});

router.delete('/automation/rules/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.automationRules.delete(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting automation rule:', error);
    res.status(500).json({ error: 'Failed to delete automation rule' });
  }
});

// Email Templates Management
router.get('/email/templates', async (req: Request, res: Response) => {
  try {
    const templates = await db.emailTemplates.findMany();
    res.json({ data: templates });
  } catch (error) {
    console.error('Error fetching email templates:', error);
    res.status(500).json({ error: 'Failed to fetch email templates' });
  }
});

router.post('/email/templates', async (req: Request, res: Response) => {
  try {
    const validatedData = insertEmailTemplateSchema.parse(req.body);
    const template = await db.emailTemplates.create(validatedData);
    res.json({ success: true, data: template });
  } catch (error) {
    console.error('Error creating email template:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
  }
});

router.put('/email/templates/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const template = await db.emailTemplates.update(id, updates);
    res.json({ success: true, data: template });
  } catch (error) {
    console.error('Error updating email template:', error);
    res.status(500).json({ error: 'Failed to update email template' });
  }
});

// Analytics Endpoints
router.post('/analytics/events', async (req: Request, res: Response) => {
  try {
    const validatedData = insertAnalyticsEventSchema.parse(req.body);
    const event = await db.analytics.create(validatedData);
    res.json({ success: true, data: event });
  } catch (error) {
    console.error('Error creating analytics event:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
  }
});

router.get('/analytics/overview', async (req: Request, res: Response) => {
  try {
    const overview = {
      pageViews: { count: 1250, unique_sessions: 892 },
      contactSubmissions: 47,
      conversionRate: 3.76,
      trafficSources: [
        { source: 'google', count: 580 },
        { source: 'direct', count: 312 },
        { source: 'linkedin', count: 89 },
        { source: 'twitter', count: 45 }
      ],
      deviceBreakdown: [
        { device: 'desktop', count: 721 },
        { device: 'mobile', count: 432 },
        { device: 'tablet', count: 97 }
      ]
    };
    
    res.json(overview);
  } catch (error) {
    console.error('Error fetching analytics overview:', error);
    res.status(500).json({ error: 'Failed to fetch analytics overview' });
  }
});

router.get('/analytics/performance', async (req: Request, res: Response) => {
  try {
    const performanceData = {
      dailyMetrics: [
        { date: '2024-01-01', page_views: 180, unique_visitors: 125, contact_forms: 3 },
        { date: '2024-01-02', page_views: 195, unique_visitors: 138, contact_forms: 5 },
        { date: '2024-01-03', page_views: 167, unique_visitors: 119, contact_forms: 2 },
        { date: '2024-01-04', page_views: 203, unique_visitors: 152, contact_forms: 7 },
        { date: '2024-01-05', page_views: 189, unique_visitors: 142, contact_forms: 4 }
      ],
      topPages: [
        { page: '/', views: 423 },
        { page: '/portfolio', views: 287 },
        { page: '/services', views: 198 },
        { page: '/about', views: 156 },
        { page: '/contact', views: 134 }
      ],
      bounceRate: 42.3,
      totalSessions: 892
    };
    
    res.json(performanceData);
  } catch (error) {
    console.error('Error fetching performance analytics:', error);
    res.status(500).json({ error: 'Failed to fetch performance analytics' });
  }
});

// Business Metrics
router.get('/analytics/business', async (req: Request, res: Response) => {
  try {
    const { data: leadFunnelData } = await supabase
      .from('contact_submissions')
      .select('status');
    
    const leadFunnel = (leadFunnelData || []).reduce((acc: any, item: any) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    
    const leadFunnelArray = Object.entries(leadFunnel).map(([status, count]) => ({ status, count }));
    
    const { data: siteMetrics } = await supabase
      .from('site_metrics')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();
    
    const leadScoreDistribution = [
      { score_range: '80-100', count: 5 },
      { score_range: '60-79', count: 12 },
      { score_range: '40-59', count: 18 },
      { score_range: '20-39', count: 8 },
      { score_range: '0-19', count: 3 }
    ];
    
    const monthlyGrowth = [
      { month: '2024-01', leads: 15 },
      { month: '2024-02', leads: 22 },
      { month: '2024-03', leads: 18 },
      { month: '2024-04', leads: 28 },
      { month: '2024-05', leads: 35 }
    ];
    
    res.json({
      leadFunnel: leadFunnelArray,
      revenue: siteMetrics || { revenue_total: 0, projects_total: 0, clients_total: 0 },
      leadScoreDistribution,
      monthlyGrowth
    });
  } catch (error) {
    console.error('Error fetching business metrics:', error);
    res.status(500).json({ error: 'Failed to fetch business metrics' });
  }
});

// Tasks Management
router.get('/tasks', async (req: Request, res: Response) => {
  try {
    const { status, priority, assigned_to } = req.query;
    const filters = { status, priority, assigned_to };
    const tasks = await db.tasks.findMany(filters);
    res.json({ data: tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.post('/tasks', async (req: Request, res: Response) => {
  try {
    const task = await db.tasks.create(req.body);
    res.json({ success: true, data: task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Helper Functions
async function calculateLeadScore(contactData: any): Promise<number> {
  let score = 0;
  
  if (contactData.budget_range) {
    switch (contactData.budget_range) {
      case '$50,000+': score += 30; break;
      case '$25,000 - $49,999': score += 25; break;
      case '$10,000 - $24,999': score += 20; break;
      case '$5,000 - $9,999': score += 15; break;
      case '$1,000 - $4,999': score += 10; break;
      default: score += 5;
    }
  }
  
  if (contactData.job_title) {
    const title = contactData.job_title.toLowerCase();
    if (title.includes('ceo') || title.includes('founder') || title.includes('owner')) {
      score += 20;
    } else if (title.includes('director') || title.includes('manager') || title.includes('head')) {
      score += 15;
    } else if (title.includes('vp') || title.includes('vice president')) {
      score += 18;
    }
  }
  
  if (contactData.urgency) {
    switch (contactData.urgency) {
      case 'ASAP': score += 20; break;
      case 'Within 1 month': score += 15; break;
      case 'Within 3 months': score += 10; break;
      case 'Within 6 months': score += 5; break;
    }
  }
  
  if (contactData.project_type) {
    switch (contactData.project_type) {
      case 'Full Website Development': score += 15; break;
      case 'E-commerce Development': score += 18; break;
      case 'Mobile App Development': score += 20; break;
      case 'Custom Software': score += 22; break;
      case 'Website Redesign': score += 12; break;
      default: score += 8;
    }
  }
  
  if (contactData.company) score += 10;
  if (contactData.website) score += 8;
  if (contactData.phone) score += 5;
  
  return Math.min(score, 100);
}

async function triggerAutomationRules(event: string, contactData: any) {
  try {
    console.log(`Automation triggered for event: ${event}`, contactData);
    
    if (event === 'contact_form_submitted') {
      await db.tasks.create({
        title: `Follow up with ${contactData.name}`,
        description: `New lead from ${contactData.source || 'contact form'}. Lead score: ${contactData.lead_score}`,
        type: 'follow_up',
        priority: contactData.lead_score >= 80 ? 'HIGH' : contactData.lead_score >= 50 ? 'MEDIUM' : 'LOW',
        contact_id: contactData.id,
        due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });
    }
  } catch (error) {
    console.error('Error triggering automation rules:', error);
  }
}

export default router;