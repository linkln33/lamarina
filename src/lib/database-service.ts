// Comprehensive database service for all admin features
import { LocalDatabase } from './local-database';
import { NetlifyStorage } from './netlify-storage';
import { Listing } from '@/types/listing';
import {
  BlogPost,
  PortfolioItem,
  Page,
  Message,
  Settings,
  AnalyticsEvent,
  User,
} from '@/lib/cms';

// Main database service class
export class DatabaseService {
  
  // ===== USERS MANAGEMENT =====
  static getUsers(): User[] {
    return LocalDatabase.getUsers();
  }

  static getUser(id: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  // ===== LISTINGS MANAGEMENT =====
  static getListings(): Listing[] {
    return LocalDatabase.getListings();
  }

  static createListing(listing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>): Listing {
    const newListing: Listing = {
      ...listing,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0
    };
    LocalDatabase.addListing(newListing);
    return newListing;
  }

  static updateListing(id: string, updates: Partial<Listing>): void {
    LocalDatabase.updateListing(id, updates);
  }

  static deleteListing(id: string): void {
    LocalDatabase.deleteListing(id);
  }

  static createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    LocalDatabase.addUser(newUser);
    return newUser;
  }

  static updateUser(id: string, updates: Partial<User>): void {
    LocalDatabase.updateUser(id, updates);
  }

  static deleteUser(id: string): void {
    LocalDatabase.deleteUser(id);
  }

  // ===== BLOG MANAGEMENT =====
  static getBlogPosts(): BlogPost[] {
    return LocalDatabase.getBlogPosts();
  }

  static getBlogPost(id: string): BlogPost | null {
    const posts = this.getBlogPosts();
    return posts.find(p => p.id === id) || null;
  }

  static createBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>): BlogPost {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0
    } as BlogPost;
    LocalDatabase.addBlogPost(newPost);
    return newPost;
  }

  static updateBlogPost(id: string, updates: Partial<BlogPost>): void {
    LocalDatabase.updateBlogPost(id, updates);
  }

  static deleteBlogPost(id: string): void {
    LocalDatabase.deleteBlogPost(id);
  }

  // ===== PORTFOLIO MANAGEMENT =====
  static getPortfolioItems(): PortfolioItem[] {
    return LocalDatabase.getPortfolioItems();
  }

  static getPortfolioItem(id: string): PortfolioItem | null {
    const items = this.getPortfolioItems();
    return items.find(i => i.id === id) || null;
  }

  static createPortfolioItem(item: Omit<PortfolioItem, 'id'>): PortfolioItem {
    const newItem: PortfolioItem = {
      ...item,
      id: Date.now().toString()
    };
    LocalDatabase.addPortfolioItem(newItem);
    return newItem;
  }

  static updatePortfolioItem(id: string, updates: Partial<PortfolioItem>): void {
    LocalDatabase.updatePortfolioItem(id, updates);
  }

  static deletePortfolioItem(id: string): void {
    LocalDatabase.deletePortfolioItem(id);
  }

  // ===== PAGES MANAGEMENT =====
  static getPages(): Page[] {
    return LocalDatabase.getPages();
  }

  static getPage(id: string): Page | null {
    const pages = this.getPages();
    return pages.find(p => p.id === id) || null;
  }

  static createPage(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Page {
    const newPage: Page = {
      ...page,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    LocalDatabase.addPage(newPage);
    return newPage;
  }

  static updatePage(id: string, updates: Partial<Page>): void {
    LocalDatabase.updatePage(id, updates);
  }

  static deletePage(id: string): void {
    LocalDatabase.deletePage(id);
  }

  // ===== MESSAGES MANAGEMENT =====
  static getMessages(): Message[] {
    return LocalDatabase.getMessages();
  }

  static getMessage(id: string): Message | null {
    const messages = this.getMessages();
    return messages.find(m => m.id === id) || null;
  }

  static createMessage(message: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>): Message {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    LocalDatabase.addMessage(newMessage);
    return newMessage;
  }

  static updateMessage(id: string, updates: Partial<Message>): void {
    LocalDatabase.updateMessage(id, updates);
  }

  static deleteMessage(id: string): void {
    LocalDatabase.deleteMessage(id);
  }

  // ===== ANALYTICS =====
  static getAnalytics(): AnalyticsEvent[] {
    return LocalDatabase.getAnalytics();
  }

  static trackEvent(eventType: string, entityType?: string, entityId?: string, metadata?: Record<string, unknown>): void {
    LocalDatabase.trackEvent(eventType, entityType, entityId, metadata);
  }

  // ===== SETTINGS =====
  static getSettings(): Settings[] {
    return LocalDatabase.getSettings();
  }

  static getSetting(key: string): Settings | null {
    const settings = this.getSettings();
    return settings.find(s => s.key === key) || null;
  }

  static setSetting(key: string, value: unknown, type: Settings['type'], category: string = 'general'): void {
    LocalDatabase.setSetting(key, value, type, category);
  }

  // ===== HOMEPAGE CONTENT =====
  static getHomepageContent(): Record<string, unknown> {
    return LocalDatabase.getHomepageContent();
  }

  static updateHomepageContent(section: string, content: Record<string, unknown>): void {
    LocalDatabase.updateHomepageContent(section, content);
  }

  // ===== FILE UPLOAD =====
  static async uploadFile(file: File, folder: string = 'uploads'): Promise<string> {
    return await NetlifyStorage.uploadFile(file, folder);
  }

  static async deleteFile(url: string): Promise<void> {
    return await NetlifyStorage.deleteFile(url);
  }
}


