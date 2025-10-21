"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  ShoppingCart, 
  Heart,
  Eye,
  Star,
  Truck,
  Shield,
  Award
} from 'lucide-react'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { Product, PRODUCT_CATEGORIES, formatPrice } from '@/lib/ecommerce'

interface ProductCatalogProps {
  className?: string
}

export function ProductCatalog({ className = '' }: ProductCatalogProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')

  // Mock data for demonstration
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Трапецови профили за покриви',
        nameEn: 'Trapezoidal Roofing Profiles',
        description: 'Висококачествени трапецови профили за покривни системи',
        descriptionEn: 'High-quality trapezoidal profiles for roofing systems',
        category: 'roofing-systems',
        subcategory: 'profiles',
        sku: 'TP-001',
        price: 25.50,
        currency: 'BGN',
        unit: 'м²',
        specifications: [
          { name: 'Дебелина', value: '0.5', unit: 'мм', type: 'number' },
          { name: 'Ширина', value: '1000', unit: 'мм', type: 'number' },
          { name: 'Материал', value: 'Поцинкована стомана', type: 'text' }
        ],
        images: [
          {
            id: '1',
            url: '/api/placeholder/400/300',
            alt: 'Трапецови профили',
            isPrimary: true,
            order: 0
          }
        ],
        features: [
          'Корозионна устойчивост',
          'Лека конструкция',
          'Лесно монтаж'
        ],
        tags: ['покриви', 'профили', 'метал'],
        status: 'active',
        stock: 100,
        weight: 5.2,
        seo: {
          title: 'Трапецови профили за покриви | LaMarina.bg',
          description: 'Висококачествени трапецови профили за покривни системи',
          keywords: ['трапецови профили', 'покриви', 'метални профили']
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Сандвич панели',
        nameEn: 'Sandwich Panels',
        description: 'Топлоизолационни сандвич панели за покриви и стени',
        descriptionEn: 'Thermal insulation sandwich panels for roofs and walls',
        category: 'thermal-panels',
        sku: 'SP-002',
        price: 45.00,
        currency: 'BGN',
        unit: 'м²',
        specifications: [
          { name: 'Дебелина', value: '100', unit: 'мм', type: 'number' },
          { name: 'Изолация', value: 'Полиуретан', type: 'text' },
          { name: 'Покритие', value: 'Полиестер', type: 'text' }
        ],
        images: [
          {
            id: '2',
            url: '/api/placeholder/400/300',
            alt: 'Сандвич панели',
            isPrimary: true,
            order: 0
          }
        ],
        features: [
          'Отлична топлоизолация',
          'Бърз монтаж',
          'Дълготрайност'
        ],
        tags: ['сандвич панели', 'изолация', 'покриви'],
        status: 'active',
        stock: 50,
        weight: 12.5,
        seo: {
          title: 'Сандвич панели | LaMarina.bg',
          description: 'Топлоизолационни сандвич панели за покриви и стени',
          keywords: ['сандвич панели', 'изолация', 'термопанели']
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
    setLoading(false)
  }, [])

  // Filter and search products
  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, sortBy])

  const handleAddToCart = (product: Product) => {
    // Implementation would add to cart
    console.log('Add to cart:', product.id)
  }

  const handleViewProduct = (product: Product) => {
    // Implementation would navigate to product page
    console.log('View product:', product.id)
  }

  const handleToggleFavorite = (product: Product) => {
    // Implementation would toggle favorite
    console.log('Toggle favorite:', product.id)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Продукти</h2>
          <p className="text-muted-foreground">
            Висококачествени метални продукти и покривни системи
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Търси продукти..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Всички категории" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Всички категории</SelectItem>
                {PRODUCT_CATEGORIES.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Сортирай по" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Име</SelectItem>
                <SelectItem value="price-low">Цена (ниска → висока)</SelectItem>
                <SelectItem value="price-high">Цена (висока → ниска)</SelectItem>
                <SelectItem value="newest">Най-нови</SelectItem>
              </SelectContent>
            </Select>

            {/* Results count */}
            <div className="flex items-center text-sm text-muted-foreground">
              {filteredProducts.length} продукта
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid/List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="aspect-square bg-muted rounded mb-4" />
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                {viewMode === 'grid' ? (
                  <div className="space-y-4">
                    {/* Product Image */}
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                      <OptimizedImage
                        src={product.images[0]?.url || '/api/placeholder/400/300'}
                        alt={product.images[0]?.alt || product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleToggleFavorite(product)}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(product.price, product.currency)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          / {product.unit}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleViewProduct(product)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Преглед
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        В кошницата
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 relative overflow-hidden rounded-lg flex-shrink-0">
                      <OptimizedImage
                        src={product.images[0]?.url || '/api/placeholder/400/300'}
                        alt={product.images[0]?.alt || product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {product.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {formatPrice(product.price, product.currency)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            / {product.unit}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex flex-wrap gap-1">
                          {product.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 ml-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProduct(product)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Преглед
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            В кошницата
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Няма намерени продукти</h3>
                <p className="text-muted-foreground">
                  Опитайте с различни критерии за търсене
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('')
                }}
              >
                Изчисти филтрите
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
