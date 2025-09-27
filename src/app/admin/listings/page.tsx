"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Image as ImageIcon, 
  Video, 
  Package, 
  DollarSign,
  Star,
  Phone,
  Mail
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Types for industrial listings
interface ListingImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

interface ListingVideo {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  duration: number;
}

interface ListingSpecification {
  id: string;
  name: string;
  value: string;
  unit?: string;
}

interface ListingFeature {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

interface ListingSize {
  id: string;
  name: string;
  dimensions: string;
  price: number;
  stock: number;
  isAvailable: boolean;
}

interface ListingPricing {
  basePrice: number;
  currency: string;
  bulkPricing: {
    minQuantity: number;
    maxQuantity: number;
    price: number;
  }[];
  discounts: {
    type: 'percentage' | 'fixed';
    value: number;
    condition: string;
  }[];
}

interface Listing {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  subcategory?: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  images: ListingImage[];
  videos: ListingVideo[];
  specifications: ListingSpecification[];
  features: ListingFeature[];
  sizes: ListingSize[];
  pricing: ListingPricing;
  tags: string[];
  materials: string[];
  colors: string[];
  certifications: string[];
  location: {
    address: string;
    city: string;
    region: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    name: string;
    phone: string;
    email: string;
    website?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
}

// Sample data
const sampleListings: Listing[] = [
  {
    id: '1',
    title: 'Метални покривни панели - Сандвич панели',
    description: 'Висококачествени сандвич панели за покривни конструкции. Изработени от стомана с полиуретанова изолация.',
    shortDescription: 'Сандвич панели за покривни конструкции',
    category: 'Покривни системи',
    subcategory: 'Сандвич панели',
    status: 'published',
    featured: true,
    images: [
      { id: '1', url: '/api/placeholder/400/300', alt: 'Сандвич панели', isPrimary: true, order: 1 },
      { id: '2', url: '/api/placeholder/400/300', alt: 'Детайл на панела', isPrimary: false, order: 2 }
    ],
    videos: [],
    specifications: [
      { id: '1', name: 'Дебелина', value: '40-200', unit: 'мм' },
      { id: '2', name: 'Ширина', value: '1000', unit: 'мм' },
      { id: '3', name: 'Дължина', value: 'до 12000', unit: 'мм' }
    ],
    features: [
      { id: '1', name: 'Висококачествена изолация', description: 'Полиуретанова изолация с отлични топлоизолационни свойства' },
      { id: '2', name: 'Корозионна устойчивост', description: 'Покритие с цинк и полимерно покритие' },
      { id: '3', name: 'Лека конструкция', description: 'Оптимално съотношение тегло/здравина' }
    ],
    sizes: [
      { id: '1', name: 'Стандарт', dimensions: '1000x6000x40', price: 45.50, stock: 100, isAvailable: true },
      { id: '2', name: 'Голям', dimensions: '1000x12000x80', price: 89.90, stock: 50, isAvailable: true }
    ],
    pricing: {
      basePrice: 45.50,
      currency: 'BGN',
      bulkPricing: [
        { minQuantity: 10, maxQuantity: 49, price: 42.00 },
        { minQuantity: 50, maxQuantity: 99, price: 38.50 },
        { minQuantity: 100, maxQuantity: 999, price: 35.00 }
      ],
      discounts: [
        { type: 'percentage', value: 5, condition: 'При поръчка над 50 броя' }
      ]
    },
    tags: ['покривни панели', 'сандвич панели', 'изолация', 'метални конструкции'],
    materials: ['стомана', 'полиуретан', 'цинк'],
    colors: ['бел', 'сив', 'кафяв', 'зелен'],
    certifications: ['CE', 'ISO 9001', 'EN 14509'],
    location: {
      address: 'ул. Индустриална 15',
      city: 'Пловдив',
      region: 'Пловдивска област',
      country: 'България'
    },
    contact: {
      name: 'LAMARINA BG',
      phone: '+359 32 123 456',
      email: 'info@lamarina.bg',
      website: 'https://lamarina.bg'
    },
    seo: {
      metaTitle: 'Метални покривни панели - Сандвич панели | LAMARINA BG',
      metaDescription: 'Висококачествени сандвич панели за покривни конструкции. Изработени от стомана с полиуретанова изолация.',
      keywords: ['покривни панели', 'сандвич панели', 'метални конструкции', 'изолация']
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    views: 245,
    likes: 12
  }
];

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>(sampleListings);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const categories = [
    'Покривни системи',
    'Метални конструкции',
    'Огъване на метали',
    'Лазерно рязане',
    'Заваръчни работи',
    'Персонализирани решения'
  ];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || listing.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || listing.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDeleteListing = (id: string) => {
    if (confirm('Сигурни ли сте, че искате да изтриете тази обява?')) {
      setListings(listings.filter(listing => listing.id !== id));
      toast.success('Обявата беше изтрита успешно');
    }
  };

  const handleToggleFeatured = (id: string) => {
    setListings(listings.map(listing => 
      listing.id === id ? { ...listing, featured: !listing.featured } : listing
    ));
    toast.success('Статусът на обявата беше обновен');
  };

  const handleToggleStatus = (id: string) => {
    setListings(listings.map(listing => 
      listing.id === id ? { 
        ...listing, 
        status: listing.status === 'published' ? 'draft' : 'published' 
      } : listing
    ));
    toast.success('Статусът на обявата беше обновен');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold break-words">Управление на обяви</h1>
          <p className="text-muted-foreground text-sm lg:text-base break-words">
            Създавайте и управлявайте вашите продукти и услуги
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button onClick={() => setIsCreateDialogOpen(true)} size="sm" className="lg:h-10 lg:px-4">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Нова обява</span>
            <span className="sm:hidden">Нова</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Търсене</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Търси обяви..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Категория</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Всички категории" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всички категории</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Статус</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Всички статуси" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всички статуси</SelectItem>
                  <SelectItem value="published">Публикувани</SelectItem>
                  <SelectItem value="draft">Чернови</SelectItem>
                  <SelectItem value="archived">Архивирани</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Филтри
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="group hover:shadow-lg transition-all duration-300">
            <div className="relative">
              {listing.images.length > 0 && (
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={listing.images.find(img => img.isPrimary)?.url || listing.images[0].url}
                    alt={listing.images.find(img => img.isPrimary)?.alt || listing.images[0].alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                {listing.featured && (
                  <Badge variant="secondary" className="bg-yellow-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Избрано
                  </Badge>
                )}
                <Badge variant={listing.status === 'published' ? 'default' : 'secondary'}>
                  {listing.status === 'published' ? 'Публикуван' : 'Чернова'}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-2">{listing.title}</CardTitle>
              <CardDescription className="line-clamp-2">{listing.shortDescription}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Package className="h-4 w-4 mr-1" />
                  {listing.category}
                </span>
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {listing.views}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">
                  {listing.pricing.basePrice} {listing.pricing.currency}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedListing(listing)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedListing(listing);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteListing(listing.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleToggleFeatured(listing.id)}
                >
                  {listing.featured ? 'Премахни от избрано' : 'Добави в избрано'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleToggleStatus(listing.id)}
                >
                  {listing.status === 'published' ? 'Скрий' : 'Публикувай'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Няма намерени обяви</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
                ? 'Опитайте с различни филтри'
                : 'Създайте първата си обява'
              }
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Създай обява
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        setIsCreateDialogOpen(false);
        setIsEditDialogOpen(false);
        if (!open) setSelectedListing(null);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreateDialogOpen ? 'Създай нова обява' : 'Редактирай обява'}
            </DialogTitle>
            <DialogDescription>
              {isCreateDialogOpen 
                ? 'Попълнете информацията за новата обява'
                : 'Редактирайте информацията за обявата'
              }
            </DialogDescription>
          </DialogHeader>
          
          <ListingBuilder
            listing={selectedListing}
            onSave={(listing) => {
              if (isCreateDialogOpen) {
                const newListing = {
                  ...listing,
                  id: Date.now().toString(),
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  views: 0,
                  likes: 0
                };
                setListings([newListing, ...listings]);
                toast.success('Обявата беше създадена успешно');
              } else {
                setListings(listings.map(l => l.id === listing.id ? { ...listing, updatedAt: new Date().toISOString() } : l));
                toast.success('Обявата беше обновена успешно');
              }
              setIsCreateDialogOpen(false);
              setIsEditDialogOpen(false);
              setSelectedListing(null);
            }}
            onCancel={() => {
              setIsCreateDialogOpen(false);
              setIsEditDialogOpen(false);
              setSelectedListing(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      {selectedListing && !isEditDialogOpen && (
        <Dialog open={!!selectedListing} onOpenChange={() => setSelectedListing(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedListing.title}</DialogTitle>
              <DialogDescription>{selectedListing.shortDescription}</DialogDescription>
            </DialogHeader>
            
            <ListingViewer listing={selectedListing} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Listing Builder Component
function ListingBuilder({ 
  listing, 
  onSave, 
  onCancel 
}: { 
  listing: Listing | null; 
  onSave: (listing: Listing) => void; 
  onCancel: () => void; 
}) {
  const categories = [
    'Покривни системи',
    'Метални конструкции',
    'Огъване на метали',
    'Лазерно рязане',
    'Заваръчни работи',
    'Персонализирани решения'
  ];
  const [formData, setFormData] = useState<Listing>(listing || {
    id: '',
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    subcategory: '',
    status: 'draft',
    featured: false,
    images: [],
    videos: [],
    specifications: [],
    features: [],
    sizes: [],
    pricing: {
      basePrice: 0,
      currency: 'BGN',
      bulkPricing: [],
      discounts: []
    },
    tags: [],
    materials: [],
    colors: [],
    certifications: [],
    location: {
      address: '',
      city: '',
      region: '',
      country: 'България'
    },
    contact: {
      name: 'LAMARINA BG',
      phone: '+359 32 123 456',
      email: 'info@lamarina.bg'
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    },
    createdAt: '',
    updatedAt: '',
    views: 0,
    likes: 0
  });

  const [activeTab, setActiveTab] = useState('basic');

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Моля, попълнете всички задължителни полета');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="basic">Основни</TabsTrigger>
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
                placeholder="Въведете заглавие на листинга"
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
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="featured">Избран листинг</Label>
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
              value={formData.seo.keywords.join(', ')}
              onChange={(e) => setFormData({ 
                ...formData, 
                seo: { ...formData.seo, keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k) }
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
          Запази листинг
        </Button>
      </div>
    </div>
  );
}

// Listing Viewer Component
function ListingViewer({ listing }: { listing: Listing }) {
  return (
    <div className="space-y-6">
      {/* Images */}
      {listing.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listing.images.map((image) => (
            <div key={image.id} className="relative">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-48 object-cover rounded-lg"
              />
              {image.isPrimary && (
                <Badge className="absolute top-2 left-2">Основно</Badge>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Основна информация</h3>
          <div className="space-y-2">
            <div><strong>Категория:</strong> {listing.category}</div>
            <div><strong>Статус:</strong> 
              <Badge variant={listing.status === 'published' ? 'default' : 'secondary'} className="ml-2">
                {listing.status === 'published' ? 'Публикуван' : 'Чернова'}
              </Badge>
            </div>
            <div><strong>Избран:</strong> {listing.featured ? 'Да' : 'Не'}</div>
            <div><strong>Прегледи:</strong> {listing.views}</div>
            <div><strong>Харесвания:</strong> {listing.likes}</div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Цена</h3>
          <div className="text-2xl font-bold text-primary">
            {listing.pricing.basePrice} {listing.pricing.currency}
          </div>
          {listing.pricing.bulkPricing.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium mb-1">Обемни цени:</p>
              {listing.pricing.bulkPricing.map((bulk, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  {bulk.minQuantity}-{bulk.maxQuantity} бр.: {bulk.price} {listing.pricing.currency}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Описание</h3>
        <p className="text-muted-foreground">{listing.description}</p>
      </div>

      {/* Specifications */}
      {listing.specifications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Характеристики</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {listing.specifications.map((spec) => (
              <div key={spec.id} className="flex justify-between py-2 border-b">
                <span className="font-medium">{spec.name}</span>
                <span className="text-muted-foreground">
                  {spec.value} {spec.unit && spec.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {listing.features.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Особености</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listing.features.map((feature) => (
              <div key={feature.id} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium">{feature.name}</div>
                  {feature.description && (
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Контактна информация</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{listing.contact.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{listing.contact.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}