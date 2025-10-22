import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Production-safe environment variable access
export function getEnvVar(key: string, defaultValue?: string): string {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env[key] || defaultValue || '';
  } else {
    // Client-side - only access VITE_ prefixed variables
    return (window as any).__ENV__?.[key] || import.meta.env[key] || defaultValue || '';
  }
}

// API URL configuration
export const API_BASE_URL = getEnvVar('VITE_API_URL', '/api');

// Safe URL construction
export function createApiUrl(endpoint: string): string {
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
}

// Input sanitization for client-side
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

// Format currency for display
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date for display
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

// Error handling helper
export function handleApiError(error: any): string {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
}

// Development mode check
export function isDevelopment(): boolean {
  return getEnvVar('VITE_ENVIRONMENT', 'development') === 'development' || 
         import.meta.env.DEV;
}

// Production mode check
export function isProduction(): boolean {
  return getEnvVar('VITE_ENVIRONMENT', 'development') === 'production' || 
         import.meta.env.PROD;
}
