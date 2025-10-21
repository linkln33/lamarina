"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Truck, 
  CreditCard,
  Banknote,
  CheckCircle,
  AlertCircle,
  Shield
} from 'lucide-react'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { Cart, CartItem, Product, SHIPPING_METHODS, PAYMENT_METHODS, formatPrice } from '@/lib/ecommerce'

interface ShoppingCartProps {
  className?: string
}

export function ShoppingCartComponent({ className = '' }: ShoppingCartProps) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedShipping, setSelectedShipping] = useState<string>('')
  const [selectedPayment, setSelectedPayment] = useState<string>('')

  // Mock cart data
  useEffect(() => {
    const mockCart: Cart = {
      id: 'cart-1',
      items: [
        {
          productId: '1',
          quantity: 2,
          price: 25.50,
          specifications: {
            'Дебелина': '0.5мм',
            'Ширина': '1000мм'
          }
        },
        {
          productId: '2',
          quantity: 1,
          price: 45.00
        }
      ],
      subtotal: 96.00,
      tax: 0,
      shipping: 0,
      total: 96.00,
      currency: 'BGN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setCart(mockCart)
    setLoading(false)
  }, [])

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (!cart) return

    if (newQuantity <= 0) {
      // Remove item
      const updatedItems = cart.items.filter(item => item.productId !== productId)
      const newSubtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newTotal = newSubtotal + cart.tax + cart.shipping

      setCart({
        ...cart,
        items: updatedItems,
        subtotal: newSubtotal,
        total: newTotal
      })
    } else {
      // Update quantity
      const updatedItems = cart.items.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
      const newSubtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newTotal = newSubtotal + cart.tax + cart.shipping

      setCart({
        ...cart,
        items: updatedItems,
        subtotal: newSubtotal,
        total: newTotal
      })
    }
  }

  const handleRemoveItem = (productId: string) => {
    if (!cart) return

    const updatedItems = cart.items.filter(item => item.productId !== productId)
    const newSubtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const newTotal = newSubtotal + cart.tax + cart.shipping

    setCart({
      ...cart,
      items: updatedItems,
      subtotal: newSubtotal,
      total: newTotal
    })
  }

  const handleShippingChange = (shippingId: string) => {
    if (!cart) return

    const shippingMethod = SHIPPING_METHODS.find(method => method.id === shippingId)
    const shippingCost = shippingMethod?.price || 0
    const newTotal = cart.subtotal + cart.tax + shippingCost

    setCart({
      ...cart,
      shipping: shippingCost,
      total: newTotal
    })
    setSelectedShipping(shippingId)
  }

  const handleCheckout = () => {
    if (!selectedShipping || !selectedPayment) {
      alert('Моля, изберете метод на доставка и плащане')
      return
    }

    // Implementation would proceed to checkout
    console.log('Proceed to checkout')
  }

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-1/3" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Кошницата е празна</h3>
                <p className="text-muted-foreground">
                  Добавете продукти в кошницата, за да продължите с поръчката
                </p>
              </div>
              <Button>
                Разгледай продуктите
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Cart Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Кошница
          </h2>
          <p className="text-muted-foreground">
            {cart.items.length} продукта в кошницата
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {formatPrice(cart.total, cart.currency)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item, index) => (
            <Card key={item.productId}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 relative overflow-hidden rounded-lg flex-shrink-0">
                    <OptimizedImage
                      src="/api/placeholder/400/300"
                      alt="Продукт"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">Продукт {item.productId}</h3>
                        <p className="text-sm text-muted-foreground">
                          SKU: PROD-{item.productId}
                        </p>
                        {item.specifications && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {Object.entries(item.specifications).map(([key, value]) => (
                              <Badge key={key} variant="secondary" className="text-xs">
                                {key}: {value}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {formatPrice(item.price * item.quantity, cart.currency)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatPrice(item.price, cart.currency)} × {item.quantity}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min="0"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveItem(item.productId)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          {/* Shipping Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Доставка
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {SHIPPING_METHODS.filter(method => method.isActive).map(method => (
                <div
                  key={method.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedShipping === method.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleShippingChange(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {method.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {method.estimatedDays === 0 ? 'Самовземане' : `${method.estimatedDays} дни`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {method.price === 0 ? 'Безплатно' : formatPrice(method.price, 'BGN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Плащане
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {PAYMENT_METHODS.filter(method => method.isActive).map(method => (
                <div
                  key={method.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedPayment === method.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 rounded-full flex items-center justify-center">
                      {selectedPayment === method.id && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {method.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Обобщение на поръчката</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Междинна сума:</span>
                <span>{formatPrice(cart.subtotal, cart.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка:</span>
                <span>
                  {cart.shipping === 0 ? 'Безплатно' : formatPrice(cart.shipping, cart.currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ДДС:</span>
                <span>{formatPrice(cart.tax, cart.currency)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Общо:</span>
                <span>{formatPrice(cart.total, cart.currency)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handleCheckout}
            disabled={!selectedShipping || !selectedPayment}
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Поръчай сега
          </Button>

          {/* Security Badges */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>Сигурно плащане</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              <span>Бърза доставка</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
