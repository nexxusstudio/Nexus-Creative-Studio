// CMS Integration Types and Interfaces
// This file provides a unified interface for different CMS providers

export interface CMSProvider {
  name: string;
  getProjects(): Promise<Project[]>;
  getServices(): Promise<Service[]>;
  getBlogPosts(): Promise<BlogPost[]>;
  getPage(slug: string): Promise<Page | null>;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  category: string;
  tags: string[];
  technologies: string[];
  client?: string;
  year: number;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  metrics?: {
    [key: string]: string | number;
  };
  testimonial?: {
    content: string;
    author: string;
    position: string;
    company: string;
  };
  liveUrl?: string;
  githubUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  icon: string;
  category: string;
  pricing: {
    starting: number;
    currency: string;
  };
  deliverables: string[];
  timeline: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    image: string;
    bio: string;
  };
  categories: string[];
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  readTime: number;
  featured: boolean;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Abstract CMS Factory
export class CMSFactory {
  private static provider: CMSProvider | null = null;

  static setProvider(provider: CMSProvider) {
    this.provider = provider;
  }

  static getProvider(): CMSProvider {
    if (!this.provider) {
      // Fallback to static data if no CMS is configured
      return new StaticDataProvider();
    }
    return this.provider;
  }
}

// Static data provider for MVP/pre-CMS implementation
class StaticDataProvider implements CMSProvider {
  name = 'Static Data';

  async getProjects(): Promise<Project[]> {
    // Return static project data
    return [];
  }

  async getServices(): Promise<Service[]> {
    // Return static service data
    return [];
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    // Return static blog data
    return [];
  }

  async getPage(slug: string): Promise<Page | null> {
    // Return static page data
    return null;
  }
}