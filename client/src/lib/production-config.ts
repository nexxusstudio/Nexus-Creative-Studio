/**
 * Production Configuration
 * Handles environment-specific settings and optimizations
 */

export interface ProductionConfig {
  apiUrl: string;
  environment: 'development' | 'production' | 'preview';
  enableAnalytics: boolean;
  enableErrorReporting: boolean;
  cacheEnabled: boolean;
  debugMode: boolean;
}

// Get environment from Vite or fallback
function getEnvironment(): 'development' | 'production' | 'preview' {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env.PROD) return 'production';
    if (import.meta.env.DEV) return 'development';
  }
  
  // Fallback to NODE_ENV if available
  if (typeof process !== 'undefined' && process.env?.NODE_ENV) {
    return process.env.NODE_ENV as 'development' | 'production' | 'preview';
  }
  
  return 'production'; // Safe default
}

// Production configuration
export const productionConfig: ProductionConfig = {
  apiUrl: import.meta.env?.VITE_API_URL || '/api',
  environment: getEnvironment(),
  enableAnalytics: getEnvironment() === 'production',
  enableErrorReporting: getEnvironment() === 'production',
  cacheEnabled: getEnvironment() === 'production',
  debugMode: getEnvironment() === 'development',
};

// Safe environment variable access
export function getEnvVar(key: string, defaultValue = ''): string {
  try {
    // Vite environment variables
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      const value = import.meta.env[key];
      if (value !== undefined) return value;
    }
    
    // Fallback for server-side or different environments
    if (typeof process !== 'undefined' && process.env) {
      const value = process.env[key];
      if (value !== undefined) return value;
    }
    
    return defaultValue;
  } catch (error) {
    console.warn(`Failed to access environment variable ${key}:`, error);
    return defaultValue;
  }
}

// Performance monitoring
export const performanceConfig = {
  enableMetrics: productionConfig.environment === 'production',
  enableWebVitals: productionConfig.environment === 'production',
  reportingEndpoint: getEnvVar('VITE_ANALYTICS_ENDPOINT'),
};

// Feature flags for progressive deployment
export const featureFlags = {
  newNavigation: true,
  enhancedMetrics: true,
  realTimeUpdates: productionConfig.environment === 'production',
  experimentalFeatures: productionConfig.environment === 'development',
};

// Cache configuration
export const cacheConfig = {
  enabled: productionConfig.cacheEnabled,
  duration: 5 * 60 * 1000, // 5 minutes
  maxSize: 100, // Maximum cached items
};

export default productionConfig;