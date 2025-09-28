import { supabase, isSupabaseReady } from './supabase';
import { Listing } from '@/types/listing';
import { BlogPost, PortfolioItem, Service } from '@/lib/cms';

// Database service layer for admin functions
export class SupabaseAdminService {
  
  private static checkSupabaseReady() {
    if (!isSupabaseReady) {
      throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
    }
  }
  
  // ===== LISTINGS MANAGEMENT =====
  
  static async getListings(): Promise<Listing[]> {
    this.checkSupabaseReady();

    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        categories(name, slug),
        listing_images(*),
        listing_videos(*),
        listing_specifications(*),
        listing_features(*),
        listing_tags(tags(name))
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getListing(id: string): Promise<Listing | null> {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        categories(name, slug),
        listing_images(*),
        listing_videos(*),
        listing_specifications(*),
        listing_features(*),
        listing_tags(tags(name))
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createListing(listing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>): Promise<Listing> {
    const { data: listingData, error: listingError } = await supabase
      .from('listings')
      .insert({
        title: listing.title,
        description: listing.description,
        short_description: listing.shortDescription,
        category_id: listing.category,
        status: listing.status,
        is_featured: listing.isFeatured,
        pricing: listing.pricing,
        seo: listing.seo,
        contact_info: listing.contact,
        views: listing.views,
        likes: listing.likes
      })
      .select()
      .single();

    if (listingError) throw listingError;

    // Insert images
    if (listing.images.length > 0) {
      const { error: imagesError } = await supabase
        .from('listing_images')
        .insert(listing.images.map(img => ({
          listing_id: listingData.id,
          url: img.url,
          alt_text: img.alt,
          is_primary: img.isPrimary,
          order_index: img.order
        })));

      if (imagesError) throw imagesError;
    }

    // Insert videos
    if (listing.videos.length > 0) {
      const { error: videosError } = await supabase
        .from('listing_videos')
        .insert(listing.videos.map(vid => ({
          listing_id: listingData.id,
          url: vid.url,
          title: vid.title,
          thumbnail_url: vid.thumbnail,
          duration: vid.duration,
          order_index: vid.order || 0
        })));

      if (videosError) throw videosError;
    }

    // Insert specifications
    if (listing.specifications.length > 0) {
      const { error: specsError } = await supabase
        .from('listing_specifications')
        .insert(listing.specifications.map(spec => ({
          listing_id: listingData.id,
          name: spec.name,
          value: spec.value,
          unit: spec.unit,
          order_index: spec.order || 0
        })));

      if (specsError) throw specsError;
    }

    // Insert features
    if (listing.features.length > 0) {
      const { error: featuresError } = await supabase
        .from('listing_features')
        .insert(listing.features.map(feat => ({
          listing_id: listingData.id,
          name: feat.name,
          description: feat.description,
          icon: feat.icon,
          order_index: feat.order || 0
        })));

      if (featuresError) throw featuresError;
    }

    return listingData;
  }

  static async updateListing(id: string, listing: Partial<Listing>): Promise<void> {
    const { error } = await supabase
      .from('listings')
      .update({
        title: listing.title,
        description: listing.description,
        short_description: listing.shortDescription,
        category_id: listing.category,
        status: listing.status,
        is_featured: listing.isFeatured,
        pricing: listing.pricing,
        seo: listing.seo,
        contact_info: listing.contact,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  }

  static async deleteListing(id: string): Promise<void> {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // ===== BLOG MANAGEMENT =====
  
  static async getBlogPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        profiles(first_name, last_name),
        blog_post_tags(tags(name))
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getBlogPost(id: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        profiles(first_name, last_name),
        blog_post_tags(tags(name))
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateBlogPost(id: string, post: Partial<BlogPost>) {
    const { error } = await supabase
      .from('blog_posts')
      .update({ ...post, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  }

  static async deleteBlogPost(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // ===== PORTFOLIO MANAGEMENT =====
  
  static async getPortfolioItems() {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async getPortfolioItem(id: string) {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createPortfolioItem(item: Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('portfolio_items')
      .insert(item)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updatePortfolioItem(id: string, item: Partial<PortfolioItem>) {
    const { error } = await supabase
      .from('portfolio_items')
      .update({ ...item, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  }

  static async deletePortfolioItem(id: string) {
    const { error } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // ===== SERVICES MANAGEMENT =====
  
  static async getServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async getService(id: string) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateService(id: string, service: Partial<Service>) {
    const { error } = await supabase
      .from('services')
      .update({ ...service, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  }

  static async deleteService(id: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // ===== HOMEPAGE CONTENT MANAGEMENT =====
  
  static async getHomepageContent() {
    const { data, error } = await supabase
      .from('homepage_content')
      .select('*');

    if (error) throw error;
    
    // Convert array to object
    const content: Record<string, unknown> = {};
    data?.forEach(item => {
      content[item.section] = item.content;
    });
    
    return content;
  }

  static async updateHomepageContent(section: string, content: Record<string, unknown>) {
    const { error } = await supabase
      .from('homepage_content')
      .upsert({
        section,
        content,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
  }

  // ===== MESSAGES MANAGEMENT =====
  
  static async getMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getMessage(id: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateMessageStatus(id: string, status: string) {
    const { error } = await supabase
      .from('messages')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  }

  static async deleteMessage(id: string) {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // ===== ANALYTICS =====
  
  static async getAnalytics() {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async trackEvent(eventType: string, entityType?: string, entityId?: string, metadata?: Record<string, unknown>) {
    const { error } = await supabase
      .from('analytics')
      .insert({
        event_type: eventType,
        entity_type: entityType,
        entity_id: entityId,
        metadata: metadata || {}
      });

    if (error) throw error;
  }

  // ===== CATEGORIES AND TAGS =====
  
  static async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  }

  static async getTags() {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  }

  // ===== FILE UPLOAD =====
  
  static async uploadFile(file: File, bucket: string = 'images', path?: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  static async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  }
}
