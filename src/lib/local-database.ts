// Local database using localStorage for development
import { Listing } from '@/types/listing';

export class LocalDatabase {
  private static getStorageKey(key: string) {
    return `lamarina_${key}`;
  }

  // Listings
  static getListings(): Listing[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('listings'));
    return data ? JSON.parse(data) : [];
  }

  static saveListings(listings: Listing[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('listings'), JSON.stringify(listings));
  }

  static addListing(listing: Listing): void {
    const listings = this.getListings();
    listings.unshift(listing);
    this.saveListings(listings);
  }

  static updateListing(id: string, updates: Partial<Listing>): void {
    const listings = this.getListings();
    const index = listings.findIndex(l => l.id === id);
    if (index !== -1) {
      listings[index] = { ...listings[index], ...updates };
      this.saveListings(listings);
    }
  }

  static deleteListing(id: string): void {
    const listings = this.getListings();
    const filtered = listings.filter(l => l.id !== id);
    this.saveListings(filtered);
  }

  // Blog Posts
  static getBlogPosts(): any[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('blog_posts'));
    return data ? JSON.parse(data) : [];
  }

  static saveBlogPosts(posts: any[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('blog_posts'), JSON.stringify(posts));
  }

  static addBlogPost(post: any): void {
    const posts = this.getBlogPosts();
    posts.unshift(post);
    this.saveBlogPosts(posts);
  }

  // Portfolio Items
  static getPortfolioItems(): any[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('portfolio_items'));
    return data ? JSON.parse(data) : [];
  }

  static savePortfolioItems(items: any[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('portfolio_items'), JSON.stringify(items));
  }

  static addPortfolioItem(item: any): void {
    const items = this.getPortfolioItems();
    items.unshift(item);
    this.savePortfolioItems(items);
  }

  // Services
  static getServices(): any[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('services'));
    return data ? JSON.parse(data) : [];
  }

  static saveServices(services: any[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('services'), JSON.stringify(services));
  }

  // Messages
  static getMessages(): any[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('messages'));
    return data ? JSON.parse(data) : [];
  }

  static saveMessages(messages: any[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('messages'), JSON.stringify(messages));
  }

  static addMessage(message: any): void {
    const messages = this.getMessages();
    messages.unshift(message);
    this.saveMessages(messages);
  }

  // Users
  static getUsers(): any[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('users'));
    return data ? JSON.parse(data) : [];
  }

  static saveUsers(users: any[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('users'), JSON.stringify(users));
  }

  static addUser(user: any): void {
    const users = this.getUsers();
    users.unshift(user);
    this.saveUsers(users);
  }

  static updateUser(id: string, updates: any): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
      this.saveUsers(users);
    }
  }

  static deleteUser(id: string): void {
    const users = this.getUsers();
    const filtered = users.filter(u => u.id !== id);
    this.saveUsers(filtered);
  }

  // Pages
  static getPages(): any[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('pages'));
    return data ? JSON.parse(data) : [];
  }

  static savePages(pages: any[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('pages'), JSON.stringify(pages));
  }

  static addPage(page: any): void {
    const pages = this.getPages();
    pages.unshift(page);
    this.savePages(pages);
  }

  static updatePage(id: string, updates: any): void {
    const pages = this.getPages();
    const index = pages.findIndex(p => p.id === id);
    if (index !== -1) {
      pages[index] = { ...pages[index], ...updates, updatedAt: new Date().toISOString() };
      this.savePages(pages);
    }
  }

  static deletePage(id: string): void {
    const pages = this.getPages();
    const filtered = pages.filter(p => p.id !== id);
    this.savePages(filtered);
  }

  // Settings
  static getSettings(): any[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('settings'));
    return data ? JSON.parse(data) : [];
  }

  static saveSettings(settings: any[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('settings'), JSON.stringify(settings));
  }

  static setSetting(key: string, value: any, type: string, category: string = 'general'): void {
    const settings = this.getSettings();
    const existingIndex = settings.findIndex(s => s.key === key);
    const setting = {
      id: Date.now().toString(),
      key,
      value,
      type,
      category,
      updatedAt: new Date().toISOString()
    };
    
    if (existingIndex !== -1) {
      settings[existingIndex] = setting;
    } else {
      settings.push(setting);
    }
    this.saveSettings(settings);
  }

  // Homepage Content
  static getHomepageContent(): any {
    if (typeof window === 'undefined') return {};
    const data = localStorage.getItem(this.getStorageKey('homepage_content'));
    return data ? JSON.parse(data) : {};
  }

  static updateHomepageContent(section: string, content: any): void {
    const homepageContent = this.getHomepageContent();
    homepageContent[section] = {
      ...homepageContent[section],
      ...content,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(this.getStorageKey('homepage_content'), JSON.stringify(homepageContent));
  }

  // Analytics
  static getAnalytics(): any[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('analytics'));
    return data ? JSON.parse(data) : [];
  }

  static saveAnalytics(analytics: any[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('analytics'), JSON.stringify(analytics));
  }

  static trackEvent(eventType: string, entityType?: string, entityId?: string, metadata?: any): void {
    const analytics = this.getAnalytics();
    analytics.push({
      id: Date.now().toString(),
      eventType,
      entityType,
      entityId,
      metadata: metadata || {},
      timestamp: new Date().toISOString()
    });
    this.saveAnalytics(analytics);
  }
}
