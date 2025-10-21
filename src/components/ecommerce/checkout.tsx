"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  CreditCard,
  Banknote,
  CheckCircle,
  Copy,
  AlertCircle,
  Truck,
  Shield
} from 'lucide-react'
import { Cart, Order, EcommerceService, formatPrice } from '@/lib/ecommerce'
import { toast } from 'react-hot-toast'

interface CheckoutProps {
  cart: Cart
  onOrderComplete?: (order: Order) => void
  className?: string
}

export function Checkout({ cart, onOrderComplete, className = '' }: CheckoutProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<Order | null>(null)
  
  // Customer information
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'BG' as const
    }
  })

  // Shipping information
  const [shippingInfo, setShippingInfo] = useState({
    method: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'BG' as const,
      notes: ''
    }
  })

  // Payment information
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'bank-transfer',
    bankDetails: {
      bank: 'УниКредит Булбанк АД',
      iban: 'BG18UNCR70001523123123',
      swift: 'UNCRBGSF',
      accountHolder: 'LAMARINA BG ООД',
      reference: ''
    }
  })

  // Order notes
  const [orderNotes, setOrderNotes] = useState('')

  const handleCustomerInfoChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setCustomerInfo(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
    } else {
      setCustomerInfo(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleShippingInfoChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setShippingInfo(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
    } else {
      setShippingInfo(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleNextStep = () => {
    if (step === 1) {
      // Validate customer info
      if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
        toast.error('Моля, попълнете всички задължителни полета')
        return
      }
    }
    if (step === 2) {
      // Validate shipping info
      if (!shippingInfo.method || !shippingInfo.address.street || !shippingInfo.address.city) {
        toast.error('Моля, изберете метод на доставка и попълнете адреса')
        return
      }
    }
    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      // Generate order number
      const orderNumber = EcommerceService.generateOrderNumber()
      
      // Create order
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        orderNumber,
        customer: customerInfo,
        items: cart.items,
        shipping: {
          method: {
            id: shippingInfo.method,
            name: 'Избран метод',
            nameEn: 'Selected method',
            carrier: 'econt',
            type: 'standard',
            price: cart.shipping,
            estimatedDays: 2,
            description: 'Доставка',
            descriptionEn: 'Delivery',
            isActive: true
          },
          address: shippingInfo.address
        },
        payment: {
          method: {
            id: paymentInfo.method,
            name: 'Банков превод',
            nameEn: 'Bank Transfer',
            type: 'bank_transfer',
            isActive: true,
            description: 'Плащане чрез банков превод',
            descriptionEn: 'Payment via bank transfer',
            instructions: 'Плащането се извършва чрез банков превод на посочените реквизити.',
            instructionsEn: 'Payment is made via bank transfer to the specified details.'
          },
          status: 'pending',
          bankDetails: {
            ...paymentInfo.bankDetails,
            reference: orderNumber
          }
        },
        status: 'pending',
        subtotal: cart.subtotal,
        tax: cart.tax,
        shippingCost: cart.shipping,
        total: cart.total,
        currency: 'BGN',
        notes: orderNotes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      setOrder(newOrder)
      setStep(4)
      toast.success('Поръчката е създадена успешно!')
      
      if (onOrderComplete) {
        onOrderComplete(newOrder)
      }
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error('Възникна грешка при създаването на поръчката')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Копирано в клипборда!')
  }

  const steps = [
    { id: 1, title: 'Лични данни', icon: User },
    { id: 2, title: 'Доставка', icon: Truck },
    { id: 3, title: 'Плащане', icon: CreditCard },
    { id: 4, title: 'Потвърждение', icon: CheckCircle }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => {
              const Icon = stepItem.icon
              const isActive = step === stepItem.id
              const isCompleted = step > stepItem.id
              
              return (
                <div key={stepItem.id} className="flex items-center">
                  <div className={`flex items-center gap-2 ${
                    isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-primary text-primary-foreground' : 
                      isCompleted ? 'bg-green-100 text-green-600' : 'bg-muted'
                    }`}>
                      {isCompleted ? <CheckCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <span className="hidden sm:block font-medium">{stepItem.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      isCompleted ? 'bg-green-600' : 'bg-muted'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Customer Information */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Лични данни
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Име и фамилия *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                  placeholder="Въведете името си"
                />
              </div>
              <div>
                <Label htmlFor="email">Имейл *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                  placeholder="+359 888 123 456"
                />
              </div>
              <div>
                <Label htmlFor="company">Фирма (незадължително)</Label>
                <Input
                  id="company"
                  value={customerInfo.company}
                  onChange={(e) => handleCustomerInfoChange('company', e.target.value)}
                  placeholder="Име на фирмата"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Адрес за фактура</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="street">Адрес *</Label>
                  <Input
                    id="street"
                    value={customerInfo.address.street}
                    onChange={(e) => handleCustomerInfoChange('address.street', e.target.value)}
                    placeholder="ул. Примерна 123"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Град *</Label>
                  <Input
                    id="city"
                    value={customerInfo.address.city}
                    onChange={(e) => handleCustomerInfoChange('address.city', e.target.value)}
                    placeholder="Пловдив"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Пощенски код</Label>
                  <Input
                    id="postalCode"
                    value={customerInfo.address.postalCode}
                    onChange={(e) => handleCustomerInfoChange('address.postalCode', e.target.value)}
                    placeholder="4000"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Shipping Information */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Доставка
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Метод на доставка</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    shippingInfo.method === 'econt-standard'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setShippingInfo(prev => ({ ...prev, method: 'econt-standard' }))}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Еконт - Стандартна доставка</div>
                      <div className="text-sm text-muted-foreground">2 дни</div>
                    </div>
                    <div className="font-semibold">8.50 лв.</div>
                  </div>
                </div>
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    shippingInfo.method === 'local-pickup'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setShippingInfo(prev => ({ ...prev, method: 'local-pickup' }))}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Самовземане от офис</div>
                      <div className="text-sm text-muted-foreground">Пловдив</div>
                    </div>
                    <div className="font-semibold">Безплатно</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Адрес за доставка</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="shipping-street">Адрес *</Label>
                  <Input
                    id="shipping-street"
                    value={shippingInfo.address.street}
                    onChange={(e) => handleShippingInfoChange('address.street', e.target.value)}
                    placeholder="ул. Примерна 123"
                  />
                </div>
                <div>
                  <Label htmlFor="shipping-city">Град *</Label>
                  <Input
                    id="shipping-city"
                    value={shippingInfo.address.city}
                    onChange={(e) => handleShippingInfoChange('address.city', e.target.value)}
                    placeholder="Пловдив"
                  />
                </div>
                <div>
                  <Label htmlFor="shipping-postalCode">Пощенски код</Label>
                  <Input
                    id="shipping-postalCode"
                    value={shippingInfo.address.postalCode}
                    onChange={(e) => handleShippingInfoChange('address.postalCode', e.target.value)}
                    placeholder="4000"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="shipping-notes">Бележки за доставката</Label>
                  <Textarea
                    id="shipping-notes"
                    value={shippingInfo.address.notes}
                    onChange={(e) => handleShippingInfoChange('address.notes', e.target.value)}
                    placeholder="Допълнителни инструкции за доставката..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Payment Information */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Плащане
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label>Метод на плащане</Label>
              <div className="space-y-3">
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentInfo.method === 'bank-transfer'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setPaymentInfo(prev => ({ ...prev, method: 'bank-transfer' }))}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 rounded-full flex items-center justify-center">
                      {paymentInfo.method === 'bank-transfer' && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        Банков превод
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Плащане чрез банков превод на посочените реквизити
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Transfer Details */}
            {paymentInfo.method === 'bank-transfer' && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-3">Банкови реквизити</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Банка:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{paymentInfo.bankDetails.bank}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(paymentInfo.bankDetails.bank)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">IBAN:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{paymentInfo.bankDetails.iban}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(paymentInfo.bankDetails.iban)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">SWIFT:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{paymentInfo.bankDetails.swift}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(paymentInfo.bankDetails.swift)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Получател:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{paymentInfo.bankDetails.accountHolder}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(paymentInfo.bankDetails.accountHolder)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800">Важно:</p>
                      <p className="text-yellow-700">
                        Поръчката ще бъде обработена след потвърждение на плащането. 
                        Моля, изпратете копие от банковия превод на имейл: info@lamarina.bg
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Order Notes */}
            <div>
              <Label htmlFor="order-notes">Бележки за поръчката</Label>
              <Textarea
                id="order-notes"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Допълнителни инструкции или бележки..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Order Confirmation */}
      {step === 4 && order && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Поръчката е създадена успешно!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Поръчка №{order.orderNumber}</span>
              </div>
              <p className="text-green-700">
                Вашата поръчка е създадена успешно. Ще получите потвърждение на имейл.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Данни за плащане</h4>
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Сума:</span>
                    <span className="font-semibold">{formatPrice(order.total, order.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Метод:</span>
                    <span>Банков превод</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Референция:</span>
                    <span className="font-mono text-sm">{order.orderNumber}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Контакт</h4>
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Имейл:</span>
                    <span>info@lamarina.bg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Телефон:</span>
                    <span>+359 888 123 456</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      {step < 4 && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={step === 1}
          >
            Назад
          </Button>
          <Button
            onClick={step === 3 ? handlePlaceOrder : handleNextStep}
            disabled={loading}
          >
            {loading ? 'Обработка...' : step === 3 ? 'Поръчай сега' : 'Напред'}
          </Button>
        </div>
      )}
    </div>
  )
}
