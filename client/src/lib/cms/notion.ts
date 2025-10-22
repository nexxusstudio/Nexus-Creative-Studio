// Notion CMS Provider
// Uncomment and configure when ready to integrate Notion API

import type { CMSProvider, Project, Service, BlogPost, Page } from './types';

export class NotionCMSProvider implements CMSProvider {
  name = 'Notion API';
  
  private apiToken?: string;
  private databaseId?: string;
  
  constructor() {
    this.apiToken = process.env.NOTION_TOKEN;
    this.databaseId = process.env.NOTION_DATABASE_ID;
  }

  private async fetchFromNotion(endpoint: string, options?: RequestInit) {
    try {
      if (!this.apiToken) {
        throw new Error('Notion API token not configured');
      }

      const response = await fetch(`https://api.notion.com/v1/${endpoint}`, {
        ...options,
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Notion API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching from Notion:', error);
      throw error;
    }
  }

  async getProjects(): Promise<Project[]> {
    try {
      // Example Notion API query for projects
      // if (!this.databaseId) {
      //   throw new Error('Notion database ID not configured');
      // }

      // const response = await this.fetchFromNotion(
      //   `databases/${this.databaseId}/query`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       filter: {
      //         property: 'Type',
      //         select: {
      //           equals: 'Project'
      //         }
      //       },
      //       sorts: [
      //         {
      //           property: 'Year',
      //           direction: 'descending'
      //         }
      //       ]
      //     })
      //   }
      // );
      
      // return response.results.map(this.transformProject);
      
      return [];
    } catch (error) {
      console.error('Error fetching projects from Notion:', error);
      return [];
    }
  }

  async getServices(): Promise<Service[]> {
    try {
      // Example Notion API query for services
      // if (!this.databaseId) {
      //   throw new Error('Notion database ID not configured');
      // }

      // const response = await this.fetchFromNotion(
      //   `databases/${this.databaseId}/query`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       filter: {
      //         property: 'Type',
      //         select: {
      //           equals: 'Service'
      //         }
      //       },
      //       sorts: [
      //         {
      //           property: 'Featured',
      //           direction: 'descending'
      //         }
      //       ]
      //     })
      //   }
      // );
      
      // return response.results.map(this.transformService);
      
      return [];
    } catch (error) {
      console.error('Error fetching services from Notion:', error);
      return [];
    }
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      // Example Notion API query for blog posts
      // if (!this.databaseId) {
      //   throw new Error('Notion database ID not configured');
      // }

      // const response = await this.fetchFromNotion(
      //   `databases/${this.databaseId}/query`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       filter: {
      //         property: 'Type',
      //         select: {
      //           equals: 'Blog Post'
      //         }
      //       },
      //       sorts: [
      //         {
      //           property: 'Published Date',
      //           direction: 'descending'
      //         }
      //       ]
      //     })
      //   }
      // );
      
      // return response.results.map(this.transformBlogPost);
      
      return [];
    } catch (error) {
      console.error('Error fetching blog posts from Notion:', error);
      return [];
    }
  }

  async getPage(slug: string): Promise<Page | null> {
    try {
      // Example Notion API query for a specific page
      // if (!this.databaseId) {
      //   throw new Error('Notion database ID not configured');
      // }

      // const response = await this.fetchFromNotion(
      //   `databases/${this.databaseId}/query`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       filter: {
      //         and: [
      //           {
      //             property: 'Type',
      //             select: {
      //               equals: 'Page'
      //             }
      //           },
      //           {
      //             property: 'Slug',
      //             rich_text: {
      //               equals: slug
      //             }
      //           }
      //         ]
      //       }
      //     })
      //   }
      // );
      
      // const page = response.results[0];
      // return page ? this.transformPage(page) : null;
      
      return null;
    } catch (error) {
      console.error('Error fetching page from Notion:', error);
      return null;
    }
  }

  // Helper method to extract text from Notion rich text property
  private extractText(richText: any[]): string {
    return richText?.map(text => text.plain_text).join('') || '';
  }

  // Transform methods to convert Notion data to our interface
  private transformProject(notionPage: any): Project {
    const { id, properties } = notionPage;
    
    return {
      id,
      title: this.extractText(properties.Title?.title || []),
      slug: this.extractText(properties.Slug?.rich_text || []),
      description: this.extractText(properties.Description?.rich_text || []),
      longDescription: this.extractText(properties['Long Description']?.rich_text || []),
      image: properties.Image?.files?.[0]?.file?.url || '',
      images: properties.Images?.files?.map((file: any) => file.file?.url || file.external?.url) || [],
      category: properties.Category?.select?.name || '',
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      technologies: properties.Technologies?.multi_select?.map((tech: any) => tech.name) || [],
      client: this.extractText(properties.Client?.rich_text || []),
      year: properties.Year?.number || new Date().getFullYear(),
      status: properties.Status?.select?.name as any || 'completed',
      featured: properties.Featured?.checkbox || false,
      metrics: properties.Metrics?.rich_text ? JSON.parse(this.extractText(properties.Metrics.rich_text)) : undefined,
      liveUrl: properties['Live URL']?.url,
      githubUrl: properties['GitHub URL']?.url,
      createdAt: new Date(notionPage.created_time),
      updatedAt: new Date(notionPage.last_edited_time),
    };
  }

  private transformService(notionPage: any): Service {
    const { id, properties } = notionPage;
    
    return {
      id,
      title: this.extractText(properties.Title?.title || []),
      slug: this.extractText(properties.Slug?.rich_text || []),
      description: this.extractText(properties.Description?.rich_text || []),
      longDescription: this.extractText(properties['Long Description']?.rich_text || []),
      icon: this.extractText(properties.Icon?.rich_text || []),
      category: properties.Category?.select?.name || '',
      pricing: {
        starting: properties['Starting Price']?.number || 0,
        currency: properties.Currency?.select?.name || 'USD',
      },
      deliverables: properties.Deliverables?.multi_select?.map((item: any) => item.name) || [],
      timeline: this.extractText(properties.Timeline?.rich_text || []),
      featured: properties.Featured?.checkbox || false,
      createdAt: new Date(notionPage.created_time),
      updatedAt: new Date(notionPage.last_edited_time),
    };
  }

  private transformBlogPost(notionPage: any): BlogPost {
    const { id, properties } = notionPage;
    
    return {
      id,
      title: this.extractText(properties.Title?.title || []),
      slug: this.extractText(properties.Slug?.rich_text || []),
      excerpt: this.extractText(properties.Excerpt?.rich_text || []),
      content: this.extractText(properties.Content?.rich_text || []),
      image: properties.Image?.files?.[0]?.file?.url || '',
      author: {
        name: this.extractText(properties['Author Name']?.rich_text || []),
        image: properties['Author Image']?.files?.[0]?.file?.url || '',
        bio: this.extractText(properties['Author Bio']?.rich_text || []),
      },
      categories: properties.Categories?.multi_select?.map((cat: any) => cat.name) || [],
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      publishedAt: new Date(properties['Published Date']?.date?.start || notionPage.created_time),
      updatedAt: new Date(notionPage.last_edited_time),
      readTime: properties['Read Time']?.number || 5,
      featured: properties.Featured?.checkbox || false,
    };
  }

  private transformPage(notionPage: any): Page {
    const { id, properties } = notionPage;
    
    return {
      id,
      title: this.extractText(properties.Title?.title || []),
      slug: this.extractText(properties.Slug?.rich_text || []),
      content: this.extractText(properties.Content?.rich_text || []),
      seoTitle: this.extractText(properties['SEO Title']?.rich_text || []),
      seoDescription: this.extractText(properties['SEO Description']?.rich_text || []),
      image: properties.Image?.files?.[0]?.file?.url,
      createdAt: new Date(notionPage.created_time),
      updatedAt: new Date(notionPage.last_edited_time),
    };
  }
}