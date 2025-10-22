
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@shared/supabase';
import type { Database } from '@shared/supabase';

type Brand = Database['brands']['Row'];
type Service = Database['services']['Row'];
type Project = Database['projects']['Row'];
type SiteMetrics = Database['site_metrics']['Row'];
type ContactSubmission = Database['contact_submissions']['Insert'];

export function useSupabase() {
  const queryClient = useQueryClient();
  
  // Check if Supabase is available
  const isSupabaseAvailable = supabase !== null;

  // Brands
  const { data: brands = [], isLoading: brandsLoading } = useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (error) throw error;
      return data || [];
    },
    enabled: isSupabaseAvailable,
  });

  // Services
  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: isSupabaseAvailable,
  });

  // Projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('year', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: isSupabaseAvailable,
  });

  // Site Metrics
  const { data: metrics } = useQuery<SiteMetrics>({
    queryKey: ['site-metrics'],
    queryFn: async () => {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from('site_metrics')
        .select('*')
        .single();
      if (error) throw error;
      return data;
    },
    enabled: isSupabaseAvailable,
  });

  // Contact Form Submission
  const submitContact = useMutation({
    mutationFn: async (submission: ContactSubmission) => {
      if (!supabase) throw new Error('Supabase not available');
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([submission])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_submissions'] });
    },
  });

  return {
    brands,
    services,
    projects,
    metrics,
    brandsLoading,
    servicesLoading,
    projectsLoading,
    submitContact,
    isSupabaseAvailable,
  };
}
