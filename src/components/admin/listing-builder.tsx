"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Image as ImageIcon, 
  Video, 
  Package, 
  DollarSign
} from 'lucide-react';
import { Listing, ListingFormData } from '@/types/listing';

interface ListingBuilderProps {
  listing: Listing | null;
  onSave: (listing: Listing) => void;
  onCancel: () => void;
}

export function ListingBuilder({ listing, onSave, onCancel }: ListingBuilderProps) {
  const categories = [
    'Покривни системи',
    'Метални конструкции',
    'Огъване на метали',
    'Лазерно рязане',
    'Заваръчни работи',
    'Персонализирани решения'
  ];

  const [formData, setFormData] = useState<ListingFormData>(listing ? {
    title: listing.title,
    description: listing.description,
    shortDescription: listing.shortDescription,
    category: listing.category,
    tags: listing.tags,
    status: listing.status,
    isFeatured: listing.isFeatured,
    images: listing.images,
    videos: listing.videos,
    specifications: listing.specifications,
    features: listing.features,
    pricing: listing.pricing,
    seo: listing.seo,
    contact: listing.contact
  } : {
    title: '',
    description: '',
    shortDescription: '',
    category: categories[0],
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
      bulkPricing: { '10-49': 0, '50-99': 0, '100+': 0 },
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
    }
  });

  const handleSave = () => {
    const listingData: Listing = {
      ...formData,
      id: listing?.id || Date.now().toString(),
      createdAt: listing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: listing?.views || 0,
      likes: listing?.likes || 0
    };
    onSave(listingData);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="basic">Основно</TabsTrigger>
          <TabsTrigger value="media">Медия</TabsTrigger>
          <TabsTrigger value="specs">Характеристики</TabsTrigger>
          <TabsTrigger value="pricing">Цени</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="contact">Контакт</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Заглавие *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Въведете заглавие на обявата"
              />
            </div>
            <div>
              <Label htmlFor="category">Категория *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Изберете категория" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="shortDescription">Кратко описание</Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Кратко описание за прегледа"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="description">Описание *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Подробно описание на продукта/услугата"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Статус</Label>
              <Select value={formData.status} onValueChange={(value: 'draft' | 'published' | 'archived') => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Чернова</SelectItem>
                  <SelectItem value="published">Публикуван</SelectItem>
                  <SelectItem value="archived">Архивиран</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="featured">Избрана обява</Label>
            </div>
          </div>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-4">
          <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Галерия с изображения</h3>
            <p className="text-muted-foreground mb-4">
              Добавете изображения на вашия продукт
            </p>
            <Button variant="outline">
              <ImageIcon className="h-4 w-4 mr-2" />
              Качи изображения
            </Button>
          </div>
          
          <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Видео галерия</h3>
            <p className="text-muted-foreground mb-4">
              Добавете видео на вашия продукт
            </p>
            <Button variant="outline">
              <Video className="h-4 w-4 mr-2" />
              Качи видео
            </Button>
          </div>
        </TabsContent>

        {/* Specifications Tab */}
        <TabsContent value="specs" className="space-y-4">
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Характеристики и спецификации</h3>
            <p className="text-muted-foreground mb-4">
              Добавете технически характеристики на продукта
            </p>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Добави характеристика
            </Button>
          </div>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="basePrice">Основна цена</Label>
              <Input
                id="basePrice"
                type="number"
                value={formData.pricing.basePrice}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  pricing: { ...formData.pricing, basePrice: parseFloat(e.target.value) || 0 }
                })}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="currency">Валута</Label>
              <Select value={formData.pricing.currency} onValueChange={(value) => setFormData({ 
                ...formData, 
                pricing: { ...formData.pricing, currency: value }
              })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BGN">BGN</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Размерни варианти и цени</h3>
            <p className="text-muted-foreground mb-4">
              Добавете различни размери и цени за вашия продукт
            </p>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Добави размер
            </Button>
          </div>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-4">
          <div>
            <Label htmlFor="metaTitle">SEO заглавие</Label>
            <Input
              id="metaTitle"
              value={formData.seo.metaTitle}
              onChange={(e) => setFormData({ 
                ...formData, 
                seo: { ...formData.seo, metaTitle: e.target.value }
              })}
              placeholder="SEO оптимизирано заглавие"
            />
          </div>
          <div>
            <Label htmlFor="metaDescription">SEO описание</Label>
            <Textarea
              id="metaDescription"
              value={formData.seo.metaDescription}
              onChange={(e) => setFormData({ 
                ...formData, 
                seo: { ...formData.seo, metaDescription: e.target.value }
              })}
              placeholder="SEO описание за търсачките"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="keywords">Ключови думи</Label>
            <Input
              id="keywords"
              value={formData.seo.keywords}
              onChange={(e) => setFormData({ 
                ...formData, 
                seo: { ...formData.seo, keywords: e.target.value }
              })}
              placeholder="ключова дума 1, ключова дума 2, ключова дума 3"
            />
          </div>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactName">Име на контакт</Label>
              <Input
                id="contactName"
                value={formData.contact.name}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  contact: { ...formData.contact, name: e.target.value }
                })}
                placeholder="Име на контакта"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Телефон</Label>
              <Input
                id="contactPhone"
                value={formData.contact.phone}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  contact: { ...formData.contact, phone: e.target.value }
                })}
                placeholder="+359 32 123 456"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="contactEmail">Имейл</Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contact.email}
              onChange={(e) => setFormData({ 
                ...formData, 
                contact: { ...formData.contact, email: e.target.value }
              })}
              placeholder="info@lamarina.bg"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Отказ
        </Button>
        <Button onClick={handleSave}>
          Запази обява
        </Button>
      </div>
    </div>
  );
}


