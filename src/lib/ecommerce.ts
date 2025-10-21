// E-commerce system for Bulgarian metal products business

export interface Product {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  category: string
  subcategory?: string
  sku: string
  price: number
  currency: 'BGN' | 'EUR'
  unit: 'м²' | 'м' | 'кг' | 'бр' | 'л'
  specifications: ProductSpecification[]
  images: ProductImage[]
  videos?: ProductVideo[]
  features: string[]
  tags: string[]
  status: 'active' | 'inactive' | 'draft'
  stock: number
  weight?: number // in kg
  dimensions?: {
    length?: number
    width?: number
    height?: number
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  createdAt: string
  updatedAt: string
}

export interface ProductSpecification {
  name: string
  value: string
  unit?: string
  type: 'text' | 'number' | 'boolean'
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

export interface ProductVideo {
  id: string
  url: string
  title: string
  thumbnail: string
  duration?: number
}

export interface CartItem {
  productId: string
  quantity: number
  price: number
  specifications?: Record<string, string>
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  currency: 'BGN'
  createdAt: string
  updatedAt: string
}

export interface ShippingMethod {
  id: string
  name: string
  nameEn: string
  carrier: 'econt' | 'speedy' | 'boxnow' | 'local'
  type: 'standard' | 'express' | 'same_day' | 'pickup'
  price: number
  estimatedDays: number
  description: string
  descriptionEn: string
  isActive: boolean
}

export interface PaymentMethod {
  id: string
  name: string
  nameEn: string
  type: 'bank_transfer' | 'cash_on_delivery' | 'card'
  isActive: boolean
  description: string
  descriptionEn: string
  instructions: string
  instructionsEn: string
}

export interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
    company?: string
    address: {
      street: string
      city: string
      postalCode: string
      country: 'BG'
    }
  }
  items: CartItem[]
  shipping: {
    method: ShippingMethod
    address: {
      street: string
      city: string
      postalCode: string
      country: 'BG'
      notes?: string
    }
  }
  payment: {
    method: PaymentMethod
    status: 'pending' | 'paid' | 'failed' | 'refunded'
    bankDetails?: {
      bank: string
      iban: string
      swift: string
      reference: string
    }
  }
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  subtotal: number
  tax: number
  shippingCost: number
  total: number
  currency: 'BGN'
  notes?: string
  createdAt: string
  updatedAt: string
}

// Bulgarian shipping carriers configuration
export const SHIPPING_METHODS: ShippingMethod[] = [
  {
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
  {
    id: 'econt-express',
    name: 'Еконт - Експресна доставка',
    nameEn: 'Econt - Express Delivery',
    carrier: 'econt',
    type: 'express',
    price: 12.00,
    estimatedDays: 1,
    description: 'Доставка до адрес',
    descriptionEn: 'Delivery to address',
    isActive: true
  },
  {
    id: 'speedy-standard',
    name: 'Спиди - Стандартна доставка',
    nameEn: 'Speedy - Standard Delivery',
    carrier: 'speedy',
    type: 'standard',
    price: 9.00,
    estimatedDays: 2,
    description: 'Доставка до офис на Спиди',
    descriptionEn: 'Delivery to Speedy office',
    isActive: true
  },
  {
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
  {
    id: 'boxnow',
    name: 'BoxNow - Доставка',
    nameEn: 'BoxNow - Delivery',
    carrier: 'boxnow',
    type: 'standard',
    price: 7.50,
    estimatedDays: 2,
    description: 'Доставка до BoxNow станция',
    descriptionEn: 'Delivery to BoxNow station',
    isActive: true
  },
  {
    id: 'local-pickup',
    name: 'Самовземане от офис',
    nameEn: 'Pickup from office',
    carrier: 'local',
    type: 'pickup',
    price: 0,
    estimatedDays: 0,
    description: 'Самовземане от офис в Пловдив',
    descriptionEn: 'Pickup from office in Plovdiv',
    isActive: true
  }
]

// Bulgarian payment methods
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'bank-transfer',
    name: 'Банков превод',
    nameEn: 'Bank Transfer',
    type: 'bank_transfer',
    isActive: true,
    description: 'Плащане чрез банков превод',
    descriptionEn: 'Payment via bank transfer',
    instructions: 'Плащането се извършва чрез банков превод на посочените реквизити. Поръчката се обработва след потвърждение на плащането.',
    instructionsEn: 'Payment is made via bank transfer to the specified details. The order is processed after payment confirmation.'
  },
  {
    id: 'cash-on-delivery',
    name: 'Наложен платеж',
    nameEn: 'Cash on Delivery',
    type: 'cash_on_delivery',
    isActive: true,
    description: 'Плащане при получаване на стоката',
    descriptionEn: 'Payment upon receipt of goods',
    instructions: 'Плащането се извършва при получаване на стоката от куриера.',
    instructionsEn: 'Payment is made upon receipt of goods from the courier.'
  }
]

// Product categories for metal products
export const PRODUCT_CATEGORIES = [
  {
    id: 'roofing-systems',
    name: 'Покривни системи',
    nameEn: 'Roofing Systems',
    slug: 'покривни-системи',
    description: 'Метални покривни системи и профили',
    descriptionEn: 'Metal roofing systems and profiles'
  },
  {
    id: 'metal-profiles',
    name: 'Метални профили',
    nameEn: 'Metal Profiles',
    slug: 'метални-профили',
    description: 'Трапецови, вълнообразни и касетъчни профили',
    descriptionEn: 'Trapezoidal, corrugated and cassette profiles'
  },
  {
    id: 'metal-sheets',
    name: 'Метални листове',
    nameEn: 'Metal Sheets',
    slug: 'метални-листове',
    description: 'Гладки и профилирани метални листове',
    descriptionEn: 'Smooth and profiled metal sheets'
  },
  {
    id: 'accessories',
    name: 'Аксесоари',
    nameEn: 'Accessories',
    slug: 'аксесоари',
    description: 'Окантващи профили и аксесоари',
    descriptionEn: 'Edge profiles and accessories'
  },
  {
    id: 'thermal-panels',
    name: 'Термопанели',
    nameEn: 'Thermal Panels',
    slug: 'термопанели',
    description: 'Сандвич панели и термоизолация',
    descriptionEn: 'Sandwich panels and thermal insulation'
  }
]

// E-commerce service class
export class EcommerceService {
  // Product management
  static async getProducts(filters?: {
    category?: string
    status?: string
    search?: string
    limit?: number
    offset?: number
  }): Promise<Product[]> {
    // Implementation would fetch from Supabase
    return []
  }

  static async getProduct(id: string): Promise<Product | null> {
    // Implementation would fetch from Supabase
    return null
  }

  static async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    // Implementation would create in Supabase
    throw new Error('Not implemented')
  }

  static async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    // Implementation would update in Supabase
    throw new Error('Not implemented')
  }

  static async deleteProduct(id: string): Promise<void> {
    // Implementation would delete from Supabase
    throw new Error('Not implemented')
  }

  // Cart management
  static async getCart(userId: string): Promise<Cart> {
    // Implementation would fetch from Supabase
    throw new Error('Not implemented')
  }

  static async addToCart(userId: string, item: CartItem): Promise<Cart> {
    // Implementation would update in Supabase
    throw new Error('Not implemented')
  }

  static async updateCartItem(userId: string, productId: string, quantity: number): Promise<Cart> {
    // Implementation would update in Supabase
    throw new Error('Not implemented')
  }

  static async removeFromCart(userId: string, productId: string): Promise<Cart> {
    // Implementation would update in Supabase
    throw new Error('Not implemented')
  }

  static async clearCart(userId: string): Promise<void> {
    // Implementation would clear in Supabase
    throw new Error('Not implemented')
  }

  // Order management
  static async createOrder(order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    // Implementation would create in Supabase
    throw new Error('Not implemented')
  }

  static async getOrder(id: string): Promise<Order | null> {
    // Implementation would fetch from Supabase
    throw new Error('Not implemented')
  }

  static async getOrdersByUser(userId: string): Promise<Order[]> {
    // Implementation would fetch from Supabase
    throw new Error('Not implemented')
  }

  static async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    // Implementation would update in Supabase
    throw new Error('Not implemented')
  }

  // Shipping and payment
  static getShippingMethods(): ShippingMethod[] {
    return SHIPPING_METHODS.filter(method => method.isActive)
  }

  static getPaymentMethods(): PaymentMethod[] {
    return PAYMENT_METHODS.filter(method => method.isActive)
  }

  static calculateShipping(weight: number, destination: string, method: string): number {
    // Implementation would calculate based on weight and destination
    const shippingMethod = SHIPPING_METHODS.find(m => m.id === method)
    return shippingMethod?.price || 0
  }

  static generateOrderNumber(): string {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `LM${year}${month}${day}${random}`
  }

  // Bank transfer details for Bulgaria
  static getBankDetails() {
    return {
      bank: 'УниКредит Булбанк АД',
      iban: 'BG18UNCR70001523123123', // Example IBAN
      swift: 'UNCRBGSF',
      accountHolder: 'LAMARINA BG ООД',
      reference: 'Поръчка №'
    }
  }
}

// Utility functions
export function formatPrice(price: number, currency: string = 'BGN'): string {
  return new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(price)
}

export function calculateCartTotal(items: CartItem[], shipping: number = 0, tax: number = 0): number {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  return subtotal + shipping + tax
}

export function validateOrder(order: Partial<Order>): string[] {
  const errors: string[] = []

  if (!order.customer?.name) errors.push('Име е задължително')
  if (!order.customer?.email) errors.push('Имейл е задължителен')
  if (!order.customer?.phone) errors.push('Телефон е задължителен')
  if (!order.customer?.address?.street) errors.push('Адрес е задължителен')
  if (!order.customer?.address?.city) errors.push('Град е задължителен')
  if (!order.items || order.items.length === 0) errors.push('Поръчката трябва да съдържа продукти')
  if (!order.shipping?.method) errors.push('Метод на доставка е задължителен')
  if (!order.payment?.method) errors.push('Метод на плащане е задължителен')

  return errors
}
