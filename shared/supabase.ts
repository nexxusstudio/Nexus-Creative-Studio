
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// For browser/client-side usage, Vite exposes env vars via import.meta.env
const isBrowser = typeof window !== 'undefined';

// Use provided Nexus Creative Studio Supabase credentials
const supabaseUrl = 'https://guarhoiykpmngfptntxt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1YXJob2l5a3BtbmdmcHRudHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNDU3MjksImV4cCI6MjA3NjYyMTcyOX0.CHvQ4WJIv_kcmy6dMlSUKC8q2VbscsWcORmCNkxVm8c';

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase connected successfully');
} else {
  console.warn('⚠️  Supabase credentials not configured. Database features will be unavailable.');
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
