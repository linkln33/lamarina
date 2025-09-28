"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, X } from 'lucide-react';
import { Listing } from '@/types/listing';
import { LocalDatabase } from '@/lib/local-database';
import { toast } from 'react-hot-toast';

// Import form components
import { BasicInfoForm } from './listing-forms/basic-info-form';
import { MediaForm } from './listing-forms/media-form';
import { SpecificationsForm } from './listing-forms/specifications-form';
import { PricingForm } from './listing-forms/pricing-form';
import { SEOForm } from './listing-forms/seo-form';
import { ContactForm } from './listing-forms/contact-form';

interface ListingBuilderProps {
  listing: Listing | null;
  onSave: (listing: Listing) => void;
  onCancel: () => void;
}

export function ListingBuilderRefactored({ listing, onSave, onCancel }: ListingBuilderProps) {
  const [formData, setFormData] = useState<Listing>(listing || {
    id: '',
    title: '',
    description: '',
    shortDescription: '',
    category: 'Покривни системи',
    tags: [],
    status: 'draft',
    isFeatured: false,
    images: [],
    videos: [],
    specifications: [],
    features: [],
    pricing: {
      basePrice: 0,
      currency: 'BGN',
      bulkPricing: {
        '10-49': 0,
        '50-99': 0,
        '100+': 0
      },
      sizeVariants: [],
      discountPercentage: 0,
      discountFixed: 0,
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      slug: '',
    },
    contact: {
      name: '',
      phone: '',
      email: '',
      website: '',
      address: '',
    },
    createdAt: '',
    updatedAt: '',
    views: 0,
    likes: 0
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    // Use default categories for local database
    setCategories([
      'Покривни системи',
      'Метални конструкции',
      'Огъване на метали',
      'Лазерно рязане',
      'Заваръчни работи',
      'Персонализирани решения'
    ]);
  };

  const handleUpdate = (updates: Partial<Listing>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Моля, попълнете задължителните полета (Заглавие, Описание, Категория).');
      return;
    }

    setIsLoading(true);
    try {
      if (listing) {
        LocalDatabase.updateListing(formData.id, formData);
        toast.success('Обявата беше обновена успешно');
      } else {
        const newListing = {
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        LocalDatabase.addListing(newListing);
        toast.success('Обявата беше създадена успешно');
        onSave(newListing);
      }
    } catch (error) {
      console.error('Error saving listing:', error);
      toast.error('Грешка при запазване на обявата');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {listing ? 'Редактирай обява' : 'Създай нова обява'}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Отказ
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Запазване...' : 'Запази'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="basic">Основно</TabsTrigger>
          <TabsTrigger value="media">Медия</TabsTrigger>
          <TabsTrigger value="specs">Характеристики</TabsTrigger>
          <TabsTrigger value="pricing">Цени</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="contact">Контакт</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <BasicInfoForm 
            formData={formData} 
            onUpdate={handleUpdate} 
            categories={categories} 
          />
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <MediaForm 
            formData={formData} 
            onUpdate={handleUpdate} 
          />
        </TabsContent>

        <TabsContent value="specs" className="space-y-4">
          <SpecificationsForm 
            formData={formData} 
            onUpdate={handleUpdate} 
          />
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <PricingForm 
            formData={formData} 
            onUpdate={handleUpdate} 
          />
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <SEOForm 
            formData={formData} 
            onUpdate={handleUpdate} 
          />
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <ContactForm 
            formData={formData} 
            onUpdate={handleUpdate} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
