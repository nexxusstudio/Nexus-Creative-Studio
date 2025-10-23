import { createClient } from '@supabase/supabase-js';
import { env } from '../env.js';
import * as schema from '../../shared/enhanced-schema.js';

// Create Supabase client for database operations
export const supabase = createClient(
  env.SUPABASE_URL || '',
  env.SUPABASE_ANON_KEY || ''
);

// Database wrapper to provide a consistent interface
export const db = {
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

// Health check function
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase.from('contact_submissions').select('id').limit(1);
    return !error;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}