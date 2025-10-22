// Strapi CMS Provider
// Uncomment and configure when ready to integrate Strapi CMS

import type { CMSProvider, Project, Service, BlogPost, Page } from './types';

export class StrapiCMSProvider implements CMSProvider {
  name = 'Strapi CMS';
  
  private baseUrl: string;
  private apiToken?: string;
  
  constructor() {
    this.baseUrl = process.env.STRAPI_URL || '';
    this.apiToken = process.env.STRAPI_API_TOKEN;
  }

  private async fetchFromStrapi(endpoint: string) {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (this.apiToken) {
        headers['Authorization'] = `Bearer ${this.apiToken}`;
      }

      const response = await fetch(`${this.baseUrl}/api/${endpoint}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching from Strapi:', error);
      throw error;
    }
  }

  async getProjects(): Promise<Project[]> {
    try {
      // Example Strapi query for projects
      // const response = await this.fetchFromStrapi(
      //   'projects?populate=*&sort=year:desc'
      // );
      
      // return response.data.map(this.transformProject);
      
      return [];
    } catch (error) {
      console.error('Error fetching projects from Strapi:', error);
      return [];
    }
  }

  async getServices(): Promise<Service[]> {
    try {
      // Example Strapi query for services
      // const response = await this.fetchFromStrapi(
      //   'services?populate=*&sort=featured:desc,title:asc'
      // );
      
      // return response.data.map(this.transformService);
      
      return [];
    } catch (error) {
      console.error('Error fetching services from Strapi:', error);
      return [];
    }
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      // Example Strapi query for blog posts
      // const response = await this.fetchFromStrapi(
      //   'posts?populate=*&sort=publishedAt:desc'
      // );
      
      // return response.data.map(this.transformBlogPost);
      
      return [];
    } catch (error) {
      console.error('Error fetching blog posts from Strapi:', error);
      return [];
    }
  }

  async getPage(slug: string): Promise<Page | null> {
    try {
      // Example Strapi query for a specific page
      // const response = await this.fetchFromStrapi(
      //   `pages?filters[slug][$eq]=${slug}&populate=*`
      // );
      
      // const page = response.data[0];
      // return page ? this.transformPage(page) : null;
      
      return null;
    } catch (error) {
      console.error('Error fetching page from Strapi:', error);
      return null;
    }
  }

  // Transform methods to convert Strapi data to our interface
  private transformProject(strapiProject: any): Project {
    const { id, attributes } = strapiProject;
    
    return {
      id: String(id),
      title: attributes.title || '',
      slug: attributes.slug || '',
      description: attributes.description || '',
      longDescription: attributes.longDescription,
      image: attributes.image?.data?.attributes?.url || '',
      images: attributes.images?.data?.map((img: any) => img.attributes.url) || [],
      category: attributes.category || '',
      tags: attributes.tags || [],
      technologies: attributes.technologies || [],
      client: attributes.client,
      year: attributes.year || new Date().getFullYear(),
      status: attributes.status || 'completed',
      featured: attributes.featured || false,
      metrics: attributes.metrics,
      testimonial: attributes.testimonial,
      liveUrl: attributes.liveUrl,
      githubUrl: attributes.githubUrl,
      createdAt: new Date(attributes.createdAt),
      updatedAt: new Date(attributes.updatedAt),
    };
  }

  private transformService(strapiService: any): Service {
    const { id, attributes } = strapiService;
    
    return {
      id: String(id),
      title: attributes.title || '',
      slug: attributes.slug || '',
      description: attributes.description || '',
      longDescription: attributes.longDescription,
      icon: attributes.icon || '',
      category: attributes.category || '',
      pricing: attributes.pricing || { starting: 0, currency: 'USD' },
      deliverables: attributes.deliverables || [],
      timeline: attributes.timeline || '',
      featured: attributes.featured || false,
      createdAt: new Date(attributes.createdAt),
      updatedAt: new Date(attributes.updatedAt),
    };
  }

  private transformBlogPost(strapiPost: any): BlogPost {
    const { id, attributes } = strapiPost;
    
    return {
      id: String(id),
      title: attributes.title || '',
      slug: attributes.slug || '',
      excerpt: attributes.excerpt || '',
      content: attributes.content || '',
      image: attributes.image?.data?.attributes?.url || '',
      author: attributes.author || { name: '', image: '', bio: '' },
      categories: attributes.categories?.data?.map((cat: any) => cat.attributes.title) || [],
      tags: attributes.tags || [],
      publishedAt: new Date(attributes.publishedAt),
      updatedAt: new Date(attributes.updatedAt),
      readTime: attributes.readTime || 5,
      featured: attributes.featured || false,
    };
  }

  private transformPage(strapiPage: any): Page {
    const { id, attributes } = strapiPage;
    
    return {
      id: String(id),
      title: attributes.title || '',
      slug: attributes.slug || '',
      content: attributes.content || '',
      seoTitle: attributes.seoTitle,
      seoDescription: attributes.seoDescription,
      image: attributes.image?.data?.attributes?.url,
      createdAt: new Date(attributes.createdAt),
      updatedAt: new Date(attributes.updatedAt),
    };
  }
}