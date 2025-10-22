// Sanity CMS Provider
// Uncomment and configure when ready to integrate Sanity CMS

import type { CMSProvider, Project, Service, BlogPost, Page } from './types';

export class SanityCMSProvider implements CMSProvider {
  name = 'Sanity CMS';
  
  private client: any; // Replace with actual Sanity client type
  
  constructor() {
    // Initialize Sanity client when ready
    // this.client = createClient({
    //   projectId: process.env.SANITY_PROJECT_ID,
    //   dataset: process.env.SANITY_DATASET || 'production',
    //   token: process.env.SANITY_API_TOKEN,
    //   useCdn: false,
    // });
  }

  async getProjects(): Promise<Project[]> {
    try {
      // Example Sanity query for projects
      // const query = `*[_type == "project"] | order(year desc) {
      //   _id,
      //   title,
      //   slug,
      //   description,
      //   longDescription,
      //   "image": image.asset->url,
      //   "images": images[].asset->url,
      //   category,
      //   tags,
      //   technologies,
      //   client,
      //   year,
      //   status,
      //   featured,
      //   metrics,
      //   testimonial,
      //   liveUrl,
      //   githubUrl,
      //   _createdAt,
      //   _updatedAt
      // }`;
      
      // const projects = await this.client.fetch(query);
      // return projects.map(this.transformProject);
      
      return [];
    } catch (error) {
      console.error('Error fetching projects from Sanity:', error);
      return [];
    }
  }

  async getServices(): Promise<Service[]> {
    try {
      // Example Sanity query for services
      // const query = `*[_type == "service"] | order(featured desc, title asc) {
      //   _id,
      //   title,
      //   slug,
      //   description,
      //   longDescription,
      //   icon,
      //   category,
      //   pricing,
      //   deliverables,
      //   timeline,
      //   featured,
      //   _createdAt,
      //   _updatedAt
      // }`;
      
      // const services = await this.client.fetch(query);
      // return services.map(this.transformService);
      
      return [];
    } catch (error) {
      console.error('Error fetching services from Sanity:', error);
      return [];
    }
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      // Example Sanity query for blog posts
      // const query = `*[_type == "post"] | order(publishedAt desc) {
      //   _id,
      //   title,
      //   slug,
      //   excerpt,
      //   content,
      //   "image": mainImage.asset->url,
      //   author->{
      //     name,
      //     "image": image.asset->url,
      //     bio
      //   },
      //   categories[]->title,
      //   tags,
      //   publishedAt,
      //   _updatedAt,
      //   readTime,
      //   featured
      // }`;
      
      // const posts = await this.client.fetch(query);
      // return posts.map(this.transformBlogPost);
      
      return [];
    } catch (error) {
      console.error('Error fetching blog posts from Sanity:', error);
      return [];
    }
  }

  async getPage(slug: string): Promise<Page | null> {
    try {
      // Example Sanity query for a specific page
      // const query = `*[_type == "page" && slug.current == $slug][0] {
      //   _id,
      //   title,
      //   slug,
      //   content,
      //   seoTitle,
      //   seoDescription,
      //   "image": image.asset->url,
      //   _createdAt,
      //   _updatedAt
      // }`;
      
      // const page = await this.client.fetch(query, { slug });
      // return page ? this.transformPage(page) : null;
      
      return null;
    } catch (error) {
      console.error('Error fetching page from Sanity:', error);
      return null;
    }
  }

  // Transform methods to convert Sanity data to our interface
  private transformProject(sanityProject: any): Project {
    return {
      id: sanityProject._id,
      title: sanityProject.title,
      slug: sanityProject.slug?.current || '',
      description: sanityProject.description || '',
      longDescription: sanityProject.longDescription,
      image: sanityProject.image || '',
      images: sanityProject.images || [],
      category: sanityProject.category || '',
      tags: sanityProject.tags || [],
      technologies: sanityProject.technologies || [],
      client: sanityProject.client,
      year: sanityProject.year || new Date().getFullYear(),
      status: sanityProject.status || 'completed',
      featured: sanityProject.featured || false,
      metrics: sanityProject.metrics,
      testimonial: sanityProject.testimonial,
      liveUrl: sanityProject.liveUrl,
      githubUrl: sanityProject.githubUrl,
      createdAt: new Date(sanityProject._createdAt),
      updatedAt: new Date(sanityProject._updatedAt),
    };
  }

  private transformService(sanityService: any): Service {
    return {
      id: sanityService._id,
      title: sanityService.title,
      slug: sanityService.slug?.current || '',
      description: sanityService.description || '',
      longDescription: sanityService.longDescription,
      icon: sanityService.icon || '',
      category: sanityService.category || '',
      pricing: sanityService.pricing || { starting: 0, currency: 'USD' },
      deliverables: sanityService.deliverables || [],
      timeline: sanityService.timeline || '',
      featured: sanityService.featured || false,
      createdAt: new Date(sanityService._createdAt),
      updatedAt: new Date(sanityService._updatedAt),
    };
  }

  private transformBlogPost(sanityPost: any): BlogPost {
    return {
      id: sanityPost._id,
      title: sanityPost.title,
      slug: sanityPost.slug?.current || '',
      excerpt: sanityPost.excerpt || '',
      content: sanityPost.content || '',
      image: sanityPost.image || '',
      author: sanityPost.author || { name: '', image: '', bio: '' },
      categories: sanityPost.categories || [],
      tags: sanityPost.tags || [],
      publishedAt: new Date(sanityPost.publishedAt),
      updatedAt: new Date(sanityPost._updatedAt),
      readTime: sanityPost.readTime || 5,
      featured: sanityPost.featured || false,
    };
  }

  private transformPage(sanityPage: any): Page {
    return {
      id: sanityPage._id,
      title: sanityPage.title,
      slug: sanityPage.slug?.current || '',
      content: sanityPage.content || '',
      seoTitle: sanityPage.seoTitle,
      seoDescription: sanityPage.seoDescription,
      image: sanityPage.image,
      createdAt: new Date(sanityPage._createdAt),
      updatedAt: new Date(sanityPage._updatedAt),
    };
  }
}