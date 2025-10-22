import { supabase } from "@shared/supabase";
import type {
  Project,
  InsertProject,
  Service,
  InsertService,
  ContactSubmission,
  InsertContactSubmission,
  SiteMetrics,
  InsertSiteMetrics,
  PricingTier,
  InsertPricingTier,
} from "@shared/schema";

export class SupabaseStorageError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = "SupabaseStorageError";
  }
}

export interface ISupabaseStorage {
  projects: {
    getAll(filters?: { published?: boolean; featured?: boolean }): Promise<Project[]>;
    getBySlug(slug: string): Promise<Project | null>;
    create(data: InsertProject): Promise<Project>;
    update(id: string, data: Partial<InsertProject>): Promise<Project>;
    delete(id: string): Promise<void>;
  };
  
  services: {
    getAll(filters?: { featured?: boolean; category?: string }): Promise<Service[]>;
    getById(id: string): Promise<Service | null>;
    create(data: InsertService): Promise<Service>;
    update(id: string, data: Partial<InsertService>): Promise<Service>;
    delete(id: string): Promise<void>;
  };
  
  contactSubmissions: {
    getAll(filters?: { status?: string }): Promise<ContactSubmission[]>;
    getById(id: string): Promise<ContactSubmission | null>;
    create(data: InsertContactSubmission): Promise<ContactSubmission>;
    updateStatus(id: string, status: string): Promise<ContactSubmission>;
  };
  
  siteMetrics: {
    get(): Promise<SiteMetrics | null>;
    update(data: Partial<InsertSiteMetrics>): Promise<SiteMetrics>;
  };
  
  pricingTiers: {
    getAll(filters?: { active?: boolean; serviceType?: string }): Promise<PricingTier[]>;
    getById(id: string): Promise<PricingTier | null>;
    create(data: InsertPricingTier): Promise<PricingTier>;
    update(id: string, data: Partial<InsertPricingTier>): Promise<PricingTier>;
    delete(id: string): Promise<void>;
  };
}

class SupabaseStorage implements ISupabaseStorage {
  private ensureSupabase() {
    if (!supabase) {
      throw new SupabaseStorageError(
        "Supabase client is not initialized. Please configure SUPABASE_URL and SUPABASE_ANON_KEY environment variables.",
        "SUPABASE_NOT_CONFIGURED"
      );
    }
    return supabase;
  }

  private handleError(error: any, operation: string): never {
    const message = error?.message || `Failed to ${operation}`;
    const code = error?.code;
    const details = error?.details;
    throw new SupabaseStorageError(message, code, details);
  }

  projects = {
    getAll: async (filters?: { published?: boolean; featured?: boolean }): Promise<Project[]> => {
      try {
        const client = this.ensureSupabase();
        let query = client.from('projects').select('*');
        
        if (filters?.published !== undefined) {
          query = query.eq('published', filters.published);
        }
        if (filters?.featured !== undefined) {
          query = query.eq('is_featured', filters.featured);
        }
        
        query = query.order('year', { ascending: false });
        
        const { data, error } = await query;
        
        if (error) this.handleError(error, 'fetch projects');
        return data as Project[] || [];
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'fetch projects');
      }
    },

    getBySlug: async (slug: string): Promise<Project | null> => {
      try {
        const client = this.ensureSupabase();
        const { data, error } = await client
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          this.handleError(error, 'fetch project by slug');
        }
        
        return data as Project || null;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'fetch project by slug');
      }
    },

    create: async (data: InsertProject): Promise<Project> => {
      try {
        const client = this.ensureSupabase();
        const { data: project, error } = await client
          .from('projects')
          .insert(data)
          .select()
          .single();
        
        if (error) this.handleError(error, 'create project');
        return project as Project;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'create project');
      }
    },

    update: async (id: string, data: Partial<InsertProject>): Promise<Project> => {
      try {
        const client = this.ensureSupabase();
        const { data: project, error } = await client
          .from('projects')
          .update(data)
          .eq('id', id)
          .select()
          .single();
        
        if (error) this.handleError(error, 'update project');
        return project as Project;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'update project');
      }
    },

    delete: async (id: string): Promise<void> => {
      try {
        const client = this.ensureSupabase();
        const { error } = await client
          .from('projects')
          .delete()
          .eq('id', id);
        
        if (error) this.handleError(error, 'delete project');
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'delete project');
      }
    },
  };

  services = {
    getAll: async (filters?: { featured?: boolean; category?: string }): Promise<Service[]> => {
      try {
        const client = this.ensureSupabase();
        let query = client.from('services').select('*');
        
        if (filters?.featured !== undefined) {
          query = query.eq('is_featured', filters.featured);
        }
        if (filters?.category) {
          query = query.eq('category', filters.category);
        }
        
        query = query.order('title');
        
        const { data, error } = await query;
        
        if (error) this.handleError(error, 'fetch services');
        return data as Service[] || [];
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'fetch services');
      }
    },

    getById: async (id: string): Promise<Service | null> => {
      try {
        const client = this.ensureSupabase();
        const { data, error } = await client
          .from('services')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          this.handleError(error, 'fetch service by id');
        }
        
        return data as Service || null;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'fetch service by id');
      }
    },

    create: async (data: InsertService): Promise<Service> => {
      try {
        const client = this.ensureSupabase();
        const { data: service, error } = await client
          .from('services')
          .insert(data)
          .select()
          .single();
        
        if (error) this.handleError(error, 'create service');
        return service as Service;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'create service');
      }
    },

    update: async (id: string, data: Partial<InsertService>): Promise<Service> => {
      try {
        const client = this.ensureSupabase();
        const { data: service, error } = await client
          .from('services')
          .update(data)
          .eq('id', id)
          .select()
          .single();
        
        if (error) this.handleError(error, 'update service');
        return service as Service;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'update service');
      }
    },

    delete: async (id: string): Promise<void> => {
      try {
        const client = this.ensureSupabase();
        const { error } = await client
          .from('services')
          .delete()
          .eq('id', id);
        
        if (error) this.handleError(error, 'delete service');
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'delete service');
      }
    },
  };

  contactSubmissions = {
    getAll: async (filters?: { status?: string }): Promise<ContactSubmission[]> => {
      try {
        const client = this.ensureSupabase();
        let query = client.from('contact_submissions').select('*');
        
        if (filters?.status) {
          query = query.eq('status', filters.status);
        }
        
        query = query.order('created_at', { ascending: false });
        
        const { data, error } = await query;
        
        if (error) this.handleError(error, 'fetch contact submissions');
        return data as ContactSubmission[] || [];
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'fetch contact submissions');
      }
    },

    getById: async (id: string): Promise<ContactSubmission | null> => {
      try {
        const client = this.ensureSupabase();
        const { data, error } = await client
          .from('contact_submissions')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          this.handleError(error, 'fetch contact submission by id');
        }
        
        return data as ContactSubmission || null;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'fetch contact submission by id');
      }
    },

    create: async (data: InsertContactSubmission): Promise<ContactSubmission> => {
      try {
        const client = this.ensureSupabase();
        const { data: submission, error } = await client
          .from('contact_submissions')
          .insert(data)
          .select()
          .single();
        
        if (error) this.handleError(error, 'create contact submission');
        return submission as ContactSubmission;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'create contact submission');
      }
    },

    updateStatus: async (id: string, status: string): Promise<ContactSubmission> => {
      try {
        const client = this.ensureSupabase();
        const { data: submission, error } = await client
          .from('contact_submissions')
          .update({ status })
          .eq('id', id)
          .select()
          .single();
        
        if (error) this.handleError(error, 'update contact submission status');
        return submission as ContactSubmission;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'update contact submission status');
      }
    },
  };

  siteMetrics = {
    get: async (): Promise<SiteMetrics | null> => {
      try {
        const client = this.ensureSupabase();
        const { data, error } = await client
          .from('site_metrics')
          .select('*')
          .eq('id', 1)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          this.handleError(error, 'fetch site metrics');
        }
        
        return data as SiteMetrics || null;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'fetch site metrics');
      }
    },

    update: async (data: Partial<InsertSiteMetrics>): Promise<SiteMetrics> => {
      try {
        const client = this.ensureSupabase();
        const { data: metrics, error } = await client
          .from('site_metrics')
          .update(data)
          .eq('id', 1)
          .select()
          .single();
        
        if (error) this.handleError(error, 'update site metrics');
        return metrics as SiteMetrics;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'update site metrics');
      }
    },
  };

  pricingTiers = {
    getAll: async (filters?: { active?: boolean; serviceType?: string }): Promise<PricingTier[]> => {
      try {
        const client = this.ensureSupabase();
        let query = client.from('pricing_tiers').select('*');
        
        if (filters?.active !== undefined) {
          query = query.eq('is_active', filters.active);
        }
        if (filters?.serviceType) {
          query = query.eq('service_type', filters.serviceType);
        }
        
        query = query.order('price_min');
        
        const { data, error } = await query;
        
        if (error) this.handleError(error, 'fetch pricing tiers');
        return data as PricingTier[] || [];
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'fetch pricing tiers');
      }
    },

    getById: async (id: string): Promise<PricingTier | null> => {
      try {
        const client = this.ensureSupabase();
        const { data, error } = await client
          .from('pricing_tiers')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          this.handleError(error, 'fetch pricing tier by id');
        }
        
        return data as PricingTier || null;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'fetch pricing tier by id');
      }
    },

    create: async (data: InsertPricingTier): Promise<PricingTier> => {
      try {
        const client = this.ensureSupabase();
        const { data: tier, error } = await client
          .from('pricing_tiers')
          .insert(data)
          .select()
          .single();
        
        if (error) this.handleError(error, 'create pricing tier');
        return tier as PricingTier;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'create pricing tier');
      }
    },

    update: async (id: string, data: Partial<InsertPricingTier>): Promise<PricingTier> => {
      try {
        const client = this.ensureSupabase();
        const { data: tier, error } = await client
          .from('pricing_tiers')
          .update(data)
          .eq('id', id)
          .select()
          .single();
        
        if (error) this.handleError(error, 'update pricing tier');
        return tier as PricingTier;
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'update pricing tier');
      }
    },

    delete: async (id: string): Promise<void> => {
      try {
        const client = this.ensureSupabase();
        const { error } = await client
          .from('pricing_tiers')
          .delete()
          .eq('id', id);
        
        if (error) this.handleError(error, 'delete pricing tier');
      } catch (error) {
        if (error instanceof SupabaseStorageError) throw error;
        this.handleError(error, 'delete pricing tier');
      }
    },
  };
}

export const supabaseStorage = new SupabaseStorage();
