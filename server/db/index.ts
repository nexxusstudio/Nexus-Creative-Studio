import { createClient } from '@supabase/supabase-js';
import { env } from '../env.js';

// Primary Supabase client for database operations
export const supabase = createClient(
  env.SUPABASE_URL || '',
  env.SUPABASE_ANON_KEY || ''
);

// Secondary Supabase client (if configured)
export const supabaseSecond = env.SUPABASE_SECOND_URL ? createClient(
  env.SUPABASE_SECOND_URL,
  env.SUPABASE_SECOND_ANON_KEY || ''
) : null;

// Service role client for admin operations (if configured)
export const supabaseAdmin = env.SUPABASE_SERVICE_ROLE_KEY ? createClient(
  env.SUPABASE_URL || '',
  env.SUPABASE_SERVICE_ROLE_KEY
) : null;

// Database wrapper to provide a consistent interface
export const db = {
  // Agency metrics
  agencyMetrics: {
    async getAll() {
      const client = getDatabaseClient('read');
      const { data, error } = await client
        .from('agency_metrics')
        .select('*')
        .eq('is_active', true)
        .order('metric_name');
      
      if (error) throw error;
      return data || [];
    },
    
    async getByName(metricName: string) {
      const client = getDatabaseClient('read');
      const { data, error } = await client
        .from('agency_metrics')
        .select('*')
        .eq('metric_name', metricName)
        .eq('is_active', true)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    
    async update(metricName: string, value: number, formatted?: string) {
      const client = getDatabaseClient('write');
      const { data, error } = await client
        .from('agency_metrics')
        .upsert({
          metric_name: metricName,
          metric_value: value,
          metric_formatted: formatted || value.toString(),
          last_updated: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  },

  // Site content
  siteContent: {
    async getByKey(contentKey: string) {
      const client = getDatabaseClient('read');
      const { data, error } = await client
        .from('site_content')
        .select('*')
        .eq('content_key', contentKey)
        .eq('is_active', true)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    
    async getAllByType(contentType: string) {
      const client = getDatabaseClient('read');
      const { data, error } = await client
        .from('site_content')
        .select('*')
        .eq('content_type', contentType)
        .eq('is_active', true)
        .order('content_key');
      
      if (error) throw error;
      return data || [];
    },
    
    async upsert(contentKey: string, contentValue: any, contentType: string, pageName?: string) {
      const client = getDatabaseClient('write');
      const { data, error } = await client
        .from('site_content')
        .upsert({
          content_key: contentKey,
          content_value: contentValue,
          content_type: contentType,
          page_name: pageName,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  },

  // Ecosystem brands
  ecosystemBrands: {
    async findMany() {
      const client = getDatabaseClient('read');
      const { data, error } = await client
        .from('ecosystem_brands')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw error;
      return data || [];
    },
    
    async findBySlug(slug: string) {
      const client = getDatabaseClient('read');
      const { data, error } = await client
        .from('ecosystem_brands')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    }
  },

  // Contacts
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
      
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.lead_priority) {
        query = query.eq('lead_priority', filters.lead_priority);
      }
      
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
      }
      
      if (filters.limit) {
        query = query.limit(filters.limit);
      }
      
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
      
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
      }
      
      const { count, error } = await query;
      
      if (error) throw error;
      return count || 0;
    }
  },
  
  // Analytics
  analytics: {
    async create(data: any) {
      const { data: result, error } = await supabase
        .from('analytics')
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    
    async getOverview(filters: any = {}) {
      // This would require custom SQL functions in Supabase or client-side aggregation
      // For now, return mock data structure
      return {
        pageViews: { count: 0, unique_sessions: 0 },
        contactSubmissions: 0,
        conversionRate: 0,
        trafficSources: [],
        deviceBreakdown: []
      };
    }
  },
  
  // Automation Rules
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
  
  // Email Templates
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
  
  // Tasks
  tasks: {
    async findMany(filters: any = {}) {
      let query = supabase.from('tasks').select('*');
      
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.priority) {
        query = query.eq('priority', filters.priority);
      }
      
      if (filters.assigned_to) {
        query = query.eq('assigned_to', filters.assigned_to);
      }
      
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
  }
};

// Health check functions
export async function checkDatabaseConnection(client = supabase): Promise<boolean> {
  try {
    const { data, error } = await client.from('agency_metrics').select('id').limit(1);
    return !error;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

export async function checkAllDatabaseConnections(): Promise<{
  primary: boolean;
  secondary: boolean | null;
  admin: boolean | null;
}> {
  const primary = await checkDatabaseConnection(supabase);
  const secondary = supabaseSecond ? await checkDatabaseConnection(supabaseSecond) : null;
  const admin = supabaseAdmin ? await checkDatabaseConnection(supabaseAdmin) : null;
  
  return { primary, secondary, admin };
}

// Get database client based on operation type
export function getDatabaseClient(operation: 'read' | 'write' | 'admin' = 'read') {
  switch (operation) {
    case 'admin':
      return supabaseAdmin || supabase;
    case 'write':
      return supabaseSecond || supabase;
    case 'read':
    default:
      return supabase;
  }
}