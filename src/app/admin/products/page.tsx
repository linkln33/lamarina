"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  DollarSign,
  Tag,
  Image as ImageIcon
} from 'lucide-react'
import { Product, PRODUCT_CATEGORIES, formatPrice } from '@/lib/ecommerce'
import { OptimizedImage } from '@/components/ui/optimized-image'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Mock data
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

  // Filter products
  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory])

  const handleCreateProduct = () => {
    console.log('Create new product')
  }

  const handleEditProduct = (product: Product) => {
    console.log('Edit product:', product.id)
  }

  const handleDeleteProduct = (product: Product) => {
    if (confirm(`Сигурни ли сте, че искате да изтриете "${product.name}"?`)) {
      console.log('Delete product:', product.id)
    }
  }

  const handleViewProduct = (product: Product) => {
    console.log('View product:', product.id)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активен'
      case 'inactive':
        return 'Неактивен'
      case 'draft':
        return 'Чернова'
      default:
        return 'Неизвестен'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Продукти</h1>
          <p className="text-muted-foreground">
            Управление на продуктовия каталог
          </p>
        </div>
        <Button onClick={handleCreateProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Нов продукт
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Търси продукти..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="">Всички категории</option>
              {PRODUCT_CATEGORIES.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="flex items-center text-sm text-muted-foreground">
              {filteredProducts.length} продукта
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Продукти</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse flex items-center space-x-4">
                  <div className="w-16 h-16 bg-muted rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                  <div className="h-4 bg-muted rounded w-20" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  {/* Product Image */}
                  <div className="w-16 h-16 relative overflow-hidden rounded-lg flex-shrink-0">
                    <OptimizedImage
                      src={product.images[0]?.url || '/api/placeholder/400/300'}
                      alt={product.images[0]?.alt || product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{product.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {product.sku}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(product.status)}`}>
                        {getStatusText(product.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {formatPrice(product.price, product.currency)} / {product.unit}
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {product.stock} в наличност
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {product.tags.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProduct(product)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Няма намерени продукти</h3>
              <p className="text-muted-foreground mb-4">
                Опитайте с различни критерии за търсене или създайте нов продукт
              </p>
              <Button onClick={handleCreateProduct}>
                <Plus className="h-4 w-4 mr-2" />
                Нов продукт
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
