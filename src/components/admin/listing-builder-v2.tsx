"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Trash2, 
  Video, 
  Package, 
  DollarSign,
  Ruler,
  Shield,
  Save,
  X
} from 'lucide-react';
import { Listing } from '@/types/listing';
import { ImageUpload, UploadedImage } from '@/components/ui/image-upload';
import { SupabaseAdminService } from '@/lib/supabase-admin';
import { toast } from 'react-hot-toast';

interface ListingBuilderProps {
  listing: Listing | null;
  onSave: (listing: Listing) => void;
  onCancel: () => void;
}

export function ListingBuilderV2({ listing, onSave, onCancel }: ListingBuilderProps) {
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

  const loadCategories = async () => {
    try {
      const cats = await SupabaseAdminService.getCategories();
      setCategories(cats.map(cat => cat.name));
    } catch (error) {
      console.error('Error loading categories:', error);
      // Fallback to default categories
      setCategories([
        'Покривни системи',
        'Метални конструкции',
        'Огъване на метали',
        'Лазерно рязане',
        'Заваръчни работи',
        'Персонализирани решения'
      ]);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Моля, попълнете задължителните полета (Заглавие, Описание, Категория).');
      return;
    }

    setIsLoading(true);
    try {
      if (listing) {
        await SupabaseAdminService.updateListing(listing.id, formData);
        toast.success('Обявата беше обновена успешно');
      } else {
        const newListing = await SupabaseAdminService.createListing(formData);
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

  // Image Management
  const handleImagesChange = (images: UploadedImage[]) => {
    setFormData(prev => ({
      ...prev,
      images: images.map(img => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
        isPrimary: img.isPrimary,
        order: img.order
      }))
    }));
  };

  // Video Management
  const addVideo = () => {
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, { 
        id: Date.now().toString(), 
        url: '', 
        title: '', 
        thumbnail: '', 
        duration: 0 
      }]
    }));
  };

  const updateVideo = (id: string, field: keyof Listing['videos'][0], value: string | number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.map(vid => vid.id === id ? { ...vid, [field]: value } : vid)
    }));
  };

  const removeVideo = (id: string) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter(vid => vid.id !== id)
    }));
  };

  // Specification Management
  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { 
        id: Date.now().toString(), 
        name: '', 
        value: '', 
        unit: '' 
      }]
    }));
  };

  const updateSpecification = (id: string, field: keyof Listing['specifications'][0], value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map(spec => 
        spec.id === id ? { ...spec, [field]: value } : spec
      )
    }));
  };

  const removeSpecification = (id: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter(spec => spec.id !== id)
    }));
  };

  // Feature Management
  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { 
        id: Date.now().toString(), 
        name: '', 
        description: '', 
        icon: 'Star' 
      }]
    }));
  };

  const updateFeature = (id: string, field: keyof Listing['features'][0], value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map(feat => 
        feat.id === id ? { ...feat, [field]: value } : feat
      )
    }));
  };

  const removeFeature = (id: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(feat => feat.id !== id)
    }));
  };

  // Bulk Pricing Management
  const updateBulkPricing = (field: keyof Listing['pricing']['bulkPricing'], value: number) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        bulkPricing: {
          ...prev.pricing.bulkPricing,
          [field]: value
        }
      }
    }));
  };

  // Size Variant Management
  const addSizeVariant = () => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        sizeVariants: [...prev.pricing.sizeVariants, { size: '', price: 0, stock: 0 }]
      }
    }));
  };

  const updateSizeVariant = (index: number, field: keyof Listing['pricing']['sizeVariants'][0], value: string | number) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        sizeVariants: prev.pricing.sizeVariants.map((sv, i) => 
          i === index ? { ...sv, [field]: value } : sv
        )
      }
    }));
  };

  const removeSizeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        sizeVariants: prev.pricing.sizeVariants.filter((_, i) => i !== index)
      }
    }));
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

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Основна информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div>
                <Label htmlFor="tags">Тагове (разделени със запетая)</Label>
                <Input
                  id="tags"
                  value={formData.tags.join(', ')}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) })}
                  placeholder="метал, огъване, рязане"
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
                      <SelectItem value="published">Публикувана</SelectItem>
                      <SelectItem value="archived">Архивирана</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="isFeatured">Избрана обява</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Изображения</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                images={formData.images}
                onImagesChange={handleImagesChange}
                maxImages={10}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Видеоклипове</CardTitle>
                <Button onClick={addVideo} size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Добави видео
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {formData.videos.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Няма видеоклипове</h3>
                  <p className="text-muted-foreground mb-4">
                    Добавете видеоклипове за вашата обява
                  </p>
                  <Button onClick={addVideo}>
                    <Plus className="h-4 w-4 mr-2" /> Добави първи видеоклип
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.videos.map((video) => (
                    <div key={video.id} className="relative border rounded-lg overflow-hidden">
                      <img src={video.thumbnail || '/api/placeholder/400/225'} alt={video.title} className="w-full h-32 object-cover" />
                      <div className="p-2 space-y-2">
                        <div>
                          <Label htmlFor={`video-url-${video.id}`}>URL</Label>
                          <Input 
                            id={`video-url-${video.id}`} 
                            value={video.url} 
                            onChange={(e) => updateVideo(video.id, 'url', e.target.value)} 
                            placeholder="URL на видео (YouTube/Vimeo)" 
                          />
                        </div>
                        <div>
                          <Label htmlFor={`video-title-${video.id}`}>Заглавие</Label>
                          <Input 
                            id={`video-title-${video.id}`} 
                            value={video.title} 
                            onChange={(e) => updateVideo(video.id, 'title', e.target.value)} 
                            placeholder="Заглавие на видеото" 
                          />
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => removeVideo(video.id)} className="w-full">
                          <Trash2 className="h-4 w-4 mr-2" /> Изтрий
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Specifications Tab */}
        <TabsContent value="specs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Спецификации</CardTitle>
                <Button onClick={addSpecification} size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Добави спецификация
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {formData.specifications.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <Ruler className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Няма спецификации</h3>
                  <p className="text-muted-foreground mb-4">
                    Добавете технически спецификации за продукта
                  </p>
                  <Button onClick={addSpecification}>
                    <Plus className="h-4 w-4 mr-2" /> Добави първа спецификация
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.specifications.map((spec) => (
                    <div key={spec.id} className="p-4 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <Input
                          value={spec.name}
                          onChange={(e) => updateSpecification(spec.id, 'name', e.target.value)}
                          placeholder="Име на спецификацията"
                        />
                        <Input
                          value={spec.value}
                          onChange={(e) => updateSpecification(spec.id, 'value', e.target.value)}
                          placeholder="Стойност"
                        />
                        <div className="flex gap-2">
                          <Input
                            value={spec.unit}
                            onChange={(e) => updateSpecification(spec.id, 'unit', e.target.value)}
                            placeholder="Мерна единица"
                          />
                          <Button variant="destructive" size="sm" onClick={() => removeSpecification(spec.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Особености</CardTitle>
                <Button onClick={addFeature} size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Добави особеност
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {formData.features.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Няма особености</h3>
                  <p className="text-muted-foreground mb-4">
                    Добавете особености и предимства на продукта
                  </p>
                  <Button onClick={addFeature}>
                    <Plus className="h-4 w-4 mr-2" /> Добави първа особеност
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.features.map((feature) => (
                    <div key={feature.id} className="p-4 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Input
                          value={feature.name}
                          onChange={(e) => updateFeature(feature.id, 'name', e.target.value)}
                          placeholder="Име на особеността"
                        />
                        <div className="flex gap-2">
                          <Input
                            value={feature.icon}
                            onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                            placeholder="Икона (Lucide)"
                          />
                          <Button variant="destructive" size="sm" onClick={() => removeFeature(feature.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={feature.description}
                        onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                        placeholder="Описание на особеността"
                        rows={2}
                        className="mt-2"
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ценообразуване</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="basePrice">Основна цена *</Label>
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
                  <Select 
                    value={formData.pricing.currency} 
                    onValueChange={(value) => setFormData({
                      ...formData,
                      pricing: { ...formData.pricing, currency: value }
                    })}
                  >
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discountPercentage">Отстъпка (%)</Label>
                  <Input
                    id="discountPercentage"
                    type="number"
                    value={formData.pricing.discountPercentage}
                    onChange={(e) => setFormData({
                      ...formData,
                      pricing: { ...formData.pricing, discountPercentage: parseFloat(e.target.value) || 0 }
                    })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="discountFixed">Фиксирана отстъпка</Label>
                  <Input
                    id="discountFixed"
                    type="number"
                    value={formData.pricing.discountFixed}
                    onChange={(e) => setFormData({
                      ...formData,
                      pricing: { ...formData.pricing, discountFixed: parseFloat(e.target.value) || 0 }
                    })}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Обемни цени</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bulk-10-49">10-49 броя</Label>
                    <Input
                      id="bulk-10-49"
                      type="number"
                      value={formData.pricing.bulkPricing['10-49']}
                      onChange={(e) => updateBulkPricing('10-49', parseFloat(e.target.value) || 0)}
                      placeholder="Цена за 10-49 броя"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bulk-50-99">50-99 броя</Label>
                    <Input
                      id="bulk-50-99"
                      type="number"
                      value={formData.pricing.bulkPricing['50-99']}
                      onChange={(e) => updateBulkPricing('50-99', parseFloat(e.target.value) || 0)}
                      placeholder="Цена за 50-99 броя"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bulk-100-plus">100+ броя</Label>
                    <Input
                      id="bulk-100-plus"
                      type="number"
                      value={formData.pricing.bulkPricing['100+']}
                      onChange={(e) => updateBulkPricing('100+', parseFloat(e.target.value) || 0)}
                      placeholder="Цена за 100+ броя"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Размерни варианти</CardTitle>
                <Button onClick={addSizeVariant} size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Добави размер
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {formData.pricing.sizeVariants.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Няма размерни варианти</h3>
                  <p className="text-muted-foreground mb-4">
                    Добавете различни размери с различни цени
                  </p>
                  <Button onClick={addSizeVariant}>
                    <Plus className="h-4 w-4 mr-2" /> Добави размер
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.pricing.sizeVariants.map((variant, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <Input
                          value={variant.size}
                          onChange={(e) => updateSizeVariant(index, 'size', e.target.value)}
                          placeholder="Размер"
                        />
                        <Input
                          type="number"
                          value={variant.price}
                          onChange={(e) => updateSizeVariant(index, 'price', parseFloat(e.target.value) || 0)}
                          placeholder="Цена"
                        />
                        <Input
                          type="number"
                          value={variant.stock}
                          onChange={(e) => updateSizeVariant(index, 'stock', parseInt(e.target.value) || 0)}
                          placeholder="Наличност"
                        />
                        <Button variant="destructive" size="sm" onClick={() => removeSizeVariant(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO настройки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta заглавие</Label>
                <Input
                  id="metaTitle"
                  value={formData.seo.metaTitle}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaTitle: e.target.value }
                  })}
                  placeholder="SEO заглавие"
                />
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta описание</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.seo.metaDescription}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaDescription: e.target.value }
                  })}
                  placeholder="SEO описание"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="slug">URL slug</Label>
                <Input
                  id="slug"
                  value={formData.seo.slug}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, slug: e.target.value }
                  })}
                  placeholder="url-slug"
                />
              </div>
              <div>
                <Label htmlFor="keywords">Ключови думи (разделени със запетая)</Label>
                <Input
                  id="keywords"
                  value={formData.seo.keywords}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { 
                      ...formData.seo, 
                      keywords: e.target.value
                    }
                  })}
                  placeholder="метал, покриви, сандвич панели"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Контактна информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    placeholder="Име на отговорно лице"
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
                    placeholder="+359 888 123 456"
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
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <Label htmlFor="contactWebsite">Уебсайт</Label>
                <Input
                  id="contactWebsite"
                  value={formData.contact.website}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, website: e.target.value }
                  })}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="contactAddress">Адрес</Label>
                <Textarea
                  id="contactAddress"
                  value={formData.contact.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, address: e.target.value }
                  })}
                  placeholder="Пълен адрес"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


