import { useQuery } from '@tanstack/react-query';

const API_BASE = '/api';

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/brands`);
      if (!res.ok) throw new Error('Failed to fetch brands');
      return res.json();
    }
  });
}

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/services`);
      if (!res.ok) throw new Error('Failed to fetch services');
      return res.json();
    }
  });
}

export function useFeaturedServices() {
  return useQuery({
    queryKey: ['services', 'featured'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/services/featured`);
      if (!res.ok) throw new Error('Failed to fetch featured services');
      return res.json();
    }
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) throw new Error('Failed to fetch projects');
      return res.json();
    }
  });
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/projects/featured`);
      if (!res.ok) throw new Error('Failed to fetch featured projects');
      return res.json();
    }
  });
}

export function useSiteMetrics() {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/metrics`);
      if (!res.ok) throw new Error('Failed to fetch metrics');
      return res.json();
    }
  });
}

export async function submitContact(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  service_interest?: string;
  budget_range?: string;
}) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!res.ok) throw new Error('Failed to submit contact form');
  return res.json();
}
