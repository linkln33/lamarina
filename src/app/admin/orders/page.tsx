"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Eye,
  Edit,
  Truck,
  CreditCard,
  User,
  Calendar,
  DollarSign,
  Package
} from 'lucide-react'
import { Order, formatPrice } from '@/lib/ecommerce'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  // Mock data
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: 'order-1',
        orderNumber: 'LM20241201001',
        customer: {
          name: 'Иван Петров',
          email: 'ivan.petrov@email.com',
          phone: '+359 888 123 456',
          company: 'Петров и Син ООД',
          address: {
            street: 'ул. Главна 123',
            city: 'Пловдив',
            postalCode: '4000',
            country: 'BG'
          }
        },
        items: [
          {
            productId: '1',
            quantity: 2,
            price: 25.50
          },
          {
            productId: '2',
            quantity: 1,
            price: 45.00
          }
        ],
        shipping: {
          method: {
            id: 'econt-standard',
            name: 'Еконт - Стандартна доставка',
            nameEn: 'Econt - Standard Delivery',
            carrier: 'econt',
            type: 'standard',
            price: 8.50,
            estimatedDays: 2,
            description: 'Доставка до офис на Еконт',
            descriptionEn: 'Delivery to Econt office',
            isActive: true
          },
          address: {
            street: 'ул. Главна 123',
            city: 'Пловдив',
            postalCode: '4000',
            country: 'BG',
            notes: 'Доставка до офиса'
          }
        },
        payment: {
          method: {
            id: 'bank-transfer',
            name: 'Банков превод',
            nameEn: 'Bank Transfer',
            type: 'bank_transfer',
            isActive: true,
            description: 'Плащане чрез банков превод',
            descriptionEn: 'Payment via bank transfer',
            instructions: 'Плащането се извършва чрез банков превод на посочените реквизити.'
          },
          status: 'pending',
          bankDetails: {
            bank: 'УниКредит Булбанк АД',
            iban: 'BG18UNCR70001523123123',
            swift: 'UNCRBGSF',
            reference: 'LM20241201001'
          }
        },
        status: 'pending',
        subtotal: 96.00,
        tax: 0,
        shippingCost: 8.50,
        total: 104.50,
        currency: 'BGN',
        notes: 'Поръчка за покривни профили',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'order-2',
        orderNumber: 'LM20241201002',
        customer: {
          name: 'Мария Георгиева',
          email: 'maria.georgieva@email.com',
          phone: '+359 888 987 654',
          address: {
            street: 'ул. Централна 456',
            city: 'София',
            postalCode: '1000',
            country: 'BG'
          }
        },
        items: [
          {
            productId: '2',
            quantity: 3,
            price: 45.00
          }
        ],
        shipping: {
          method: {
            id: 'speedy-express',
            name: 'Спиди - Експресна доставка',
            nameEn: 'Speedy - Express Delivery',
            carrier: 'speedy',
            type: 'express',
            price: 15.00,
            estimatedDays: 1,
            description: 'Доставка до адрес',
            descriptionEn: 'Delivery to address',
            isActive: true
          },
          address: {
            street: 'ул. Централна 456',
            city: 'София',
            postalCode: '1000',
            country: 'BG'
          }
        },
        payment: {
          method: {
            id: 'bank-transfer',
            name: 'Банков превод',
            nameEn: 'Bank Transfer',
            type: 'bank_transfer',
            isActive: true,
            description: 'Плащане чрез банков превод',
            descriptionEn: 'Payment via bank transfer',
            instructions: 'Плащането се извършва чрез банков превод на посочените реквизити.'
          },
          status: 'paid',
          bankDetails: {
            bank: 'УниКредит Булбанк АД',
            iban: 'BG18UNCR70001523123123',
            swift: 'UNCRBGSF',
            reference: 'LM20241201002'
          }
        },
        status: 'confirmed',
        subtotal: 135.00,
        tax: 0,
        shippingCost: 15.00,
        total: 150.00,
        currency: 'BGN',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      }
    ]

    setOrders(mockOrders)
    setFilteredOrders(mockOrders)
    setLoading(false)
  }, [])

  // Filter orders
  useEffect(() => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedStatus) {
      filtered = filtered.filter(order => order.status === selectedStatus)
    }

    setFilteredOrders(filtered)
  }, [orders, searchTerm, selectedStatus])

  const handleViewOrder = (order: Order) => {
    console.log('View order:', order.id)
  }

  const handleEditOrder = (order: Order) => {
    console.log('Edit order:', order.id)
  }

  const handleUpdateStatus = (order: Order, newStatus: Order['status']) => {
    console.log('Update order status:', order.id, newStatus)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Чака потвърждение'
      case 'confirmed':
        return 'Потвърдена'
      case 'processing':
        return 'В обработка'
      case 'shipped':
        return 'Изпратена'
      case 'delivered':
        return 'Доставена'
      case 'cancelled':
        return 'Отказана'
      default:
        return 'Неизвестен'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'refunded':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Чака плащане'
      case 'paid':
        return 'Платена'
      case 'failed':
        return 'Неуспешна'
      case 'refunded':
        return 'Възстановена'
      default:
        return 'Неизвестен'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Поръчки</h1>
          <p className="text-muted-foreground">
            Управление на поръчки и плащания
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Търси поръчки..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="">Всички статуси</option>
              <option value="pending">Чака потвърждение</option>
              <option value="confirmed">Потвърдена</option>
              <option value="processing">В обработка</option>
              <option value="shipped">Изпратена</option>
              <option value="delivered">Доставена</option>
              <option value="cancelled">Отказана</option>
            </select>
            <div className="flex items-center text-sm text-muted-foreground">
              {filteredOrders.length} поръчки
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Поръчки</CardTitle>
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
              {filteredOrders.map((order) => (
                <div key={order.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  {/* Order Info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{order.orderNumber}</h3>
                      <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </Badge>
                      <Badge className={`text-xs ${getPaymentStatusColor(order.payment.status)}`}>
                        {getPaymentStatusText(order.payment.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {order.customer.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(order.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {formatPrice(order.total, order.currency)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {order.items.length} продукта
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        {order.shipping.method.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-3 w-3" />
                        {order.payment.method.name}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditOrder(order)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order, e.target.value as Order['status'])}
                      className="px-2 py-1 text-xs border border-input rounded bg-background"
                    >
                      <option value="pending">Чака потвърждение</option>
                      <option value="confirmed">Потвърдена</option>
                      <option value="processing">В обработка</option>
                      <option value="shipped">Изпратена</option>
                      <option value="delivered">Доставена</option>
                      <option value="cancelled">Отказана</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Няма намерени поръчки</h3>
              <p className="text-muted-foreground">
                Опитайте с различни критерии за търсене
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
