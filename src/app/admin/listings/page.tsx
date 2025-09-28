"use client";

import { useState, useEffect } from 'react';
import { LocalDatabase } from '@/lib/local-database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Plus, 
  Search, 
  Filter, 
  Package
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Listing } from '@/types/listing';
import { ListingCard } from '@/components/admin/listing-card';
import { ListingBuilderRefactored } from '@/components/admin/listing-builder-refactored';
import { ListingViewer } from '@/components/admin/listing-viewer';

// Sample Data
const initialListings: Listing[] = [
  {
    id: '1',
    title: 'Метални покривни сандвич панели',
    shortDescription: 'Висококачествени сандвич панели за покриви с отлична топлоизолация.',
    description: 'Нашите метални покривни сандвич панели са идеалното решение за индустриални, търговски и селскостопански сгради. Те предлагат изключителна топлоизолация, дълготрайност и лесен монтаж. Предлагат се в различни дебелини и цветове, за да отговорят на специфичните нужди на всеки проект.',
    category: 'Покривни системи',
    tags: ['сандвич панели', 'покриви', 'топлоизолация', 'метални'],
    status: 'published',
    isFeatured: true,
    images: [
      { id: 'img1', url: '/api/placeholder/400/300', alt: 'Сандвич панел 1', isPrimary: true, order: 1 },
      { id: 'img2', url: '/api/placeholder/400/300', alt: 'Сандвич панел 2', isPrimary: false, order: 2 },
    ],
    videos: [
      { id: 'vid1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Сандвич панели', thumbnail: '/api/placeholder/120/90', duration: 222 },
    ],
    specifications: [
      { id: 'spec1', name: 'Дебелина', value: '50-200', unit: 'мм' },
      { id: 'spec2', name: 'Ширина', value: '1000', unit: 'мм' },
      { id: 'spec3', name: 'Материал', value: 'Поцинкована стомана', unit: '' },
      { id: 'spec4', name: 'Покритие', value: 'Полиестер', unit: '' },
    ],
    features: [
      { id: 'feat1', name: 'Отлична топлоизолация', description: 'Високи изолационни свойства за енергийна ефективност.', icon: 'Thermometer' },
      { id: 'feat2', name: 'Бърз монтаж', description: 'Лесен и бърз монтаж, спестяващ време и разходи.', icon: 'Zap' },
      { id: 'feat3', name: 'Дълъг живот', description: 'Устойчиви на атмосферни влияния и корозия.', icon: 'Shield' },
    ],
    pricing: {
      basePrice: 35.00,
      currency: 'BGN',
      bulkPricing: {
        '10-49': 33.00,
        '50-99': 31.00,
        '100+': 29.00,
      },
      sizeVariants: [
        { size: '50мм', price: 35.00, stock: 1000 },
        { size: '80мм', price: 42.00, stock: 800 },
        { size: '100мм', price: 48.00, stock: 600 },
      ],
      discountPercentage: 0,
      discountFixed: 0,
    },
    seo: {
      metaTitle: 'Метални покривни сандвич панели - LAMARINA BG',
      metaDescription: 'Купете висококачествени метални покривни сандвич панели от LAMARINA BG. Отлична топлоизолация и дълготрайност.',
      keywords: 'сандвич панели, покриви, метални панели, топлоизолация, LAMARINA BG',
      slug: 'metalni-pokrivni-sandwich-paneli',
    },
    contact: {
      name: 'LAMARINA BG',
      phone: '+359 888 123 456',
      email: 'sales@lamarina.bg',
      website: 'https://lamarina.bg',
      address: 'с. Болярци, обл. Пловдивска',
    },
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-07-20T14:30:00Z',
    views: 1250,
    likes: 85,
  },
  {
    id: '2',
    title: 'Огъване на метални профили по поръчка',
    shortDescription: 'Прецизно огъване на различни метални профили според вашите изисквания.',
    description: 'Предлагаме услуги за огъване на метални профили с висока точност и качество. Работим с различни видове метали като стомана, алуминий и неръждаема стомана. Можем да изпълним както единични бройки, така и големи серии, съобразени с вашите чертежи и спецификации.',
    category: 'Огъване на метали',
    tags: ['огъване', 'метални профили', 'по поръчка', 'стомана', 'алуминий'],
    status: 'draft',
    isFeatured: false,
    images: [
      { id: 'img3', url: '/api/placeholder/400/300', alt: 'Огънат профил 1', isPrimary: true, order: 1 },
    ],
    videos: [],
    specifications: [
      { id: 'spec5', name: 'Макс. дебелина', value: '6', unit: 'мм' },
      { id: 'spec6', name: 'Макс. дължина', value: '3000', unit: 'мм' },
      { id: 'spec7', name: 'Точност', value: '±0.1', unit: 'мм' },
    ],
    features: [
      { id: 'feat4', name: 'Висока прецизност', description: 'Гарантирана точност на огъване.', icon: 'Target' },
      { id: 'feat5', name: 'Гъвкавост', description: 'Изпълнение на сложни форми и дизайни.', icon: 'Settings' },
    ],
    pricing: {
      basePrice: 15.00,
      currency: 'BGN',
      bulkPricing: {
        '10-49': 14.00,
        '50-99': 13.00,
        '100+': 12.00,
      },
      sizeVariants: [],
      discountPercentage: 0,
      discountFixed: 0,
    },
    seo: {
      metaTitle: 'Огъване на метални профили по поръчка - LAMARINA BG',
      metaDescription: 'Прецизно огъване на метални профили от стомана, алуминий и неръждаема стомана. Индивидуални решения.',
      keywords: 'огъване на метали, метални профили, поръчково огъване, LAMARINA BG',
      slug: 'oguvane-metalni-profili-poruchka',
    },
    contact: {
      name: 'LAMARINA BG',
      phone: '+359 888 123 456',
      email: 'sales@lamarina.bg',
      website: 'https://lamarina.bg',
      address: 'с. Болярци, обл. Пловдивска',
    },
    createdAt: '2023-03-01T09:00:00Z',
    updatedAt: '2024-07-19T11:00:00Z',
    views: 800,
    likes: 50,
  },
];

export default function AdminListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  
  useEffect(() => {
    // Load listings from local database
    setListings(LocalDatabase.getListings());
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const categories = [
    'Всички',
    'Покривни системи',
    'Метални конструкции',
    'Огъване на метали',
    'Лазерно рязане',
    'Заваръчни работи',
    'Персонализирани решения'
  ];

  const statuses = ['all', 'draft', 'published', 'archived'];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = 
      filterCategory === 'all' || listing.category === filterCategory;

    const matchesStatus = 
      filterStatus === 'all' || listing.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDeleteListing = (id: string) => {
    if (confirm('Сигурни ли сте, че искате да изтриете тази обява?')) {
      LocalDatabase.deleteListing(id);
      setListings(LocalDatabase.getListings());
      toast.success('Обявата беше изтрита успешно');
    }
  };

  const handleEditListing = (listing: Listing) => {
    setSelectedListing(listing);
    setIsEditDialogOpen(true);
  };

  const handleViewListing = (listing: Listing) => {
    setSelectedListing(listing);
    setIsViewDialogOpen(true);
  };

  const handleSaveListing = (listing: Listing) => {
    if (isEditDialogOpen && selectedListing) {
      LocalDatabase.updateListing(listing.id, listing);
      setListings(LocalDatabase.getListings());
      toast.success('Обявата беше обновена успешно');
    } else {
      const newListing = {
        ...listing,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likes: 0
      };
      LocalDatabase.addListing(newListing);
      setListings(LocalDatabase.getListings());
      toast.success('Обявата беше създадена успешно');
    }
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedListing(null);
  };

  const handleCancel = () => {
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsViewDialogOpen(false);
    setSelectedListing(null);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <SelectTrigger id="category">
              <SelectValue placeholder="Избери категория" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Статус</Label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Избери статус" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status === 'all' ? 'Всички' :
                  status === 'draft' ? 'Чернова' :
                  status === 'published' ? 'Публикувана' : 'Архивирана'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button variant="outline" onClick={() => { setSearchTerm(''); setFilterCategory('all'); setFilterStatus('all'); }} className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            Изчисти филтри
          </Button>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map(listing => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onEdit={handleEditListing}
            onDelete={handleDeleteListing}
          />
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

      {/* Create/Edit Listing Dialog */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) handleCancel();
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
          
              <ListingBuilderRefactored
            listing={selectedListing}
            onSave={handleSaveListing}
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>

      {/* View Listing Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={(open) => {
        if (!open) handleCancel();
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Преглед на обява</DialogTitle>
            <DialogDescription>
              Детайлна информация за обявата
            </DialogDescription>
          </DialogHeader>
          
          {selectedListing && <ListingViewer listing={selectedListing} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}