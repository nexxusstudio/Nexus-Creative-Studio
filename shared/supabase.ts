import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('⚠️  Supabase credentials not configured. Database features will be unavailable.');
  console.warn('   Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables to enable Supabase.');
}

export { supabase };

export type Database = {
  brands: {
    Row: {
      id: string;
      name: string;
      slug: string;
      summary: string | null;
      description: string | null;
      logo_url: string | null;
      website_url: string | null;
      tagline: string | null;
      metrics: Record<string, any>;
      social_links: Record<string, any>;
      color_primary: string | null;
      color_secondary: string | null;
      is_active: boolean;
      display_order: number;
      created_at: string;
      updated_at: string;
    };
    Insert: Omit<Database['brands']['Row'], 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Database['brands']['Insert']>;
  };
  services: {
    Row: {
      id: string;
      title: string;
      slug: string;
      description: string | null;
      category: string;
      price_base: number | null;
      price_complexity_multiplier: Record<string, number>;
      features: string[];
      deliverables: string[];
      timeline_days: number | null;
      icon_name: string | null;
      is_featured: boolean;
      brand_id: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: Omit<Database['services']['Row'], 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Database['services']['Insert']>;
  };
  projects: {
    Row: {
      id: string;
      title: string;
      slug: string;
      year: number;
      client_name: string | null;
      categories: string[];
      technologies: string[];
      case_study_url: string | null;
      cover_image_url: string | null;
      gallery_images: string[];
      excerpt: string | null;
      description: string | null;
      metrics: Record<string, any>;
      testimonial: Record<string, any> | null;
      brand_id: string | null;
      service_id: string | null;
      is_featured: boolean;
      published: boolean;
      created_at: string;
      updated_at: string;
    };
    Insert: Omit<Database['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Database['projects']['Insert']>;
  };
  site_metrics: {
    Row: {
      id: number;
      revenue_total: number;
      projects_total: number;
      clients_total: number;
      months_in_business: number;
      satisfaction_pct: number;
      success_rate_pct: number;
      quality_score: number;
      active_clients: number;
      repeat_clients: number;
      avg_project_value: number;
      updated_at: string;
    };
    Insert: Partial<Database['site_metrics']['Row']>;
    Update: Partial<Database['site_metrics']['Row']>;
  };
  contact_submissions: {
    Row: {
      id: string;
      name: string;
      email: string;
      company: string | null;
      phone: string | null;
      message: string;
      service_interest: string | null;
      budget_range: string | null;
      metadata: Record<string, any>;
      status: string;
      created_at: string;
    };
    Insert: Omit<Database['contact_submissions']['Row'], 'id' | 'created_at'>;
    Update: Partial<Database['contact_submissions']['Insert']>;
  };
};