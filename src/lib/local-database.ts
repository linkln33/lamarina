// Local database using localStorage for development
import { Listing } from '@/types/listing';
import { BlogPost, PortfolioItem, Service, Message, User, Page, Settings, AnalyticsEvent } from '@/lib/cms';

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
  static getBlogPosts(): BlogPost[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('blog_posts'));
    return data ? JSON.parse(data) : [];
  }

  static saveBlogPosts(posts: BlogPost[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('blog_posts'), JSON.stringify(posts));
  }

  static addBlogPost(post: BlogPost): void {
    const posts = this.getBlogPosts();
    posts.unshift(post);
    this.saveBlogPosts(posts);
  }

  static updateBlogPost(id: string, updates: Partial<BlogPost>): void {
    const posts = this.getBlogPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...updates, updatedAt: new Date().toISOString() };
      this.saveBlogPosts(posts);
    }
  }

  static deleteBlogPost(id: string): void {
    const posts = this.getBlogPosts();
    const filteredPosts = posts.filter(p => p.id !== id);
    this.saveBlogPosts(filteredPosts);
  }

  // Portfolio Items
  static getPortfolioItems(): PortfolioItem[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('portfolio_items'));
    return data ? JSON.parse(data) : [];
  }

  static savePortfolioItems(items: PortfolioItem[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('portfolio_items'), JSON.stringify(items));
  }

  static addPortfolioItem(item: PortfolioItem): void {
    const items = this.getPortfolioItems();
    items.unshift(item);
    this.savePortfolioItems(items);
  }

  static updatePortfolioItem(id: string, updates: Partial<PortfolioItem>): void {
    const items = this.getPortfolioItems();
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      this.savePortfolioItems(items);
    }
  }

  static deletePortfolioItem(id: string): void {
    const items = this.getPortfolioItems();
    const filteredItems = items.filter(i => i.id !== id);
    this.savePortfolioItems(filteredItems);
  }

  // Services
  static getServices(): Service[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('services'));
    return data ? JSON.parse(data) : [];
  }

  static saveServices(services: Service[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('services'), JSON.stringify(services));
  }

  // Messages
  static getMessages(): Message[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('messages'));
    return data ? JSON.parse(data) : [];
  }

  static saveMessages(messages: Message[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('messages'), JSON.stringify(messages));
  }

  static addMessage(message: Message): void {
    const messages = this.getMessages();
    messages.unshift(message);
    this.saveMessages(messages);
  }

  static updateMessage(id: string, updates: Partial<Message>): void {
    const messages = this.getMessages();
    const index = messages.findIndex(m => m.id === id);
    if (index !== -1) {
      messages[index] = { ...messages[index], ...updates, updatedAt: new Date().toISOString() } as Message;
      this.saveMessages(messages);
    }
  }

  static deleteMessage(id: string): void {
    const messages = this.getMessages();
    const filtered = messages.filter(m => m.id !== id);
    this.saveMessages(filtered);
  }

  // Users
  static getUsers(): User[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('users'));
    return data ? JSON.parse(data) : [];
  }

  static saveUsers(users: User[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('users'), JSON.stringify(users));
  }

  static addUser(user: User): void {
    const users = this.getUsers();
    users.unshift(user);
    this.saveUsers(users);
  }

  static updateUser(id: string, updates: Partial<User>): void {
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
  static getPages(): Page[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('pages'));
    return data ? JSON.parse(data) : [];
  }

  static savePages(pages: Page[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('pages'), JSON.stringify(pages));
  }

  static addPage(page: Page): void {
    const pages = this.getPages();
    pages.unshift(page);
    this.savePages(pages);
  }

  static updatePage(id: string, updates: Partial<Page>): void {
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
  static getSettings(): Settings[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('settings'));
    return data ? JSON.parse(data) : [];
  }

  static saveSettings(settings: Settings[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('settings'), JSON.stringify(settings));
  }

  static setSetting(key: string, value: unknown, type: Settings['type'], category: string = 'general'): void {
    const settings = this.getSettings();
    const existingIndex = settings.findIndex(s => s.key === key);
    const setting: Settings = {
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
  static getHomepageContent(): Record<string, unknown> {
    if (typeof window === 'undefined') return {};
    const data = localStorage.getItem(this.getStorageKey('homepage_content'));
    return data ? JSON.parse(data) : {};
  }

  static updateHomepageContent(section: string, content: Record<string, unknown>): void {
    const homepageContent = this.getHomepageContent();
    const current = (homepageContent[section] as Record<string, unknown>) || {};
    homepageContent[section] = {
      ...current,
      ...content,
      updatedAt: new Date().toISOString()
    } as Record<string, unknown>;
    localStorage.setItem(this.getStorageKey('homepage_content'), JSON.stringify(homepageContent));
  }

  // Analytics
  static getAnalytics(): AnalyticsEvent[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.getStorageKey('analytics'));
    return data ? JSON.parse(data) : [];
  }

  static saveAnalytics(analytics: AnalyticsEvent[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey('analytics'), JSON.stringify(analytics));
  }

  static trackEvent(eventType: string, entityType?: string, entityId?: string, metadata?: Record<string, unknown>): void {
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
