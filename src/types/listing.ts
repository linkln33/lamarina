// Types for industrial listings
export interface ListingImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ListingVideo {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  duration: number;
  order?: number;
}

export interface ListingSpecification {
  id: string;
  name: string;
  value: string;
  unit: string;
  order?: number;
}

export interface ListingFeature {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  order?: number;
}

export interface ListingPricing {
  basePrice: number;
  currency: string;
  bulkPricing: {
    '10-49': number;
    '50-99': number;
    '100+': number;
  };
  sizeVariants: {
    size: string;
    price: number;
    stock: number;
  }[];
  discountPercentage: number;
  discountFixed: number;
}

export interface ListingSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  slug: string;
}

export interface ListingContact {
  name: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  images: ListingImage[];
  videos: ListingVideo[];
  specifications: ListingSpecification[];
  features: ListingFeature[];
  pricing: ListingPricing;
  seo: ListingSEO;
  contact: ListingContact;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
}

export interface ListingFormData {
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  images: ListingImage[];
  videos: ListingVideo[];
  specifications: ListingSpecification[];
  features: ListingFeature[];
  pricing: ListingPricing;
  seo: ListingSEO;
  contact: ListingContact;
}


