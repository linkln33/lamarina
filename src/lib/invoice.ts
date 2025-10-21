// Invoice system for Bulgarian e-commerce

export interface InvoiceItem {
  id: string
  name: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  unitPriceEUR: number // Price in EUR
  totalPrice: number
  totalPriceEUR: number // Total price in EUR
  vatRate: number // VAT rate in percentage (20% for Bulgaria)
  vatAmount: number
  vatAmountEUR: number // VAT amount in EUR
}

import { Order, CartItem } from './ecommerce';

export interface Invoice {
  id: string
  invoiceNumber: string
  orderNumber: string
  issueDate: string
  dueDate: string
  supplyDate?: string // Date of supply (Bulgarian requirement)
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  
  // Company information
  company: {
    name: string
    address: {
      street: string
      city: string
      postalCode: string
      country: string
    }
    taxNumber: string // ЕИК (Единен идентификационен код)
    vatNumber: string // VAT номер
    phone: string
    email: string
    website: string
    bankDetails: {
      bank: string
      iban: string
      swift: string
    }
  }
  
  // Customer information
  customer: {
    name: string
    company?: string
    address: {
      street: string
      city: string
      postalCode: string
      country: string
    }
    taxNumber?: string
    vatNumber?: string
    phone?: string
    email?: string
  }
  
  // Invoice details
  items: InvoiceItem[]
  subtotal: number
  subtotalEUR: number // Subtotal in EUR
  vatAmount: number
  vatAmountEUR: number // VAT amount in EUR
  total: number
  totalEUR: number // Total in EUR
  currency: 'BGN'
  exchangeRate: number // EUR to BGN exchange rate
  
  // Payment terms
  paymentTerms: string
  notes?: string
  
  // Metadata
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface InvoiceTemplate {
  id: string
  name: string
  description: string
  isDefault: boolean
  template: {
    header: {
      logo?: string
      companyName: string
      companyAddress: string
      contactInfo: string
    }
    footer: {
      terms: string
      bankDetails: string
      additionalInfo?: string
    }
    styling: {
      primaryColor: string
      secondaryColor: string
      fontFamily: string
    }
  }
}

// Bulgarian VAT rates
export const VAT_RATES = {
  STANDARD: 20, // Standard VAT rate in Bulgaria
  REDUCED: 9,   // Reduced VAT rate for certain goods
  ZERO: 0       // Zero VAT rate
} as const

// Invoice statuses
export const INVOICE_STATUSES = {
  DRAFT: 'draft',
  SENT: 'sent',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled'
} as const

// Payment terms options
export const PAYMENT_TERMS = [
  { value: 'immediate', label: 'Веднага' },
  { value: '7_days', label: '7 дни' },
  { value: '14_days', label: '14 дни' },
  { value: '30_days', label: '30 дни' },
  { value: '60_days', label: '60 дни' },
  { value: '90_days', label: '90 дни' }
] as const

// Invoice service class
export class InvoiceService {
  // Generate invoice number
  static generateInvoiceNumber(): string {
    // Bulgarian compliant: 10-digit sequential number
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const sequence = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    
    // Format: YYYYMMDDXXX (10 digits total)
    return `${year}${month}${day}${sequence}`
  }

  // Calculate invoice totals
  static calculateTotals(items: InvoiceItem[]): {
    subtotal: number
    subtotalEUR: number
    vatAmount: number
    vatAmountEUR: number
    total: number
    totalEUR: number
  } {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
    const subtotalEUR = items.reduce((sum, item) => sum + item.totalPriceEUR, 0)
    const vatAmount = items.reduce((sum, item) => sum + item.vatAmount, 0)
    const vatAmountEUR = items.reduce((sum, item) => sum + item.vatAmountEUR, 0)
    const total = subtotal + vatAmount
    const totalEUR = subtotalEUR + vatAmountEUR

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      subtotalEUR: Math.round(subtotalEUR * 100) / 100,
      vatAmount: Math.round(vatAmount * 100) / 100,
      vatAmountEUR: Math.round(vatAmountEUR * 100) / 100,
      total: Math.round(total * 100) / 100,
      totalEUR: Math.round(totalEUR * 100) / 100
    }
  }

  // Calculate VAT amount for an item
  static calculateVAT(price: number, vatRate: number): number {
    return Math.round((price * vatRate / 100) * 100) / 100
  }

  // Format Bulgarian currency
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: 'BGN',
      minimumFractionDigits: 2
    }).format(amount)
  }

  // Format Euro currency
  static formatCurrencyEUR(amount: number): string {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  // Convert EUR to BGN (approximate rate: 1 EUR = 1.95583 BGN)
  static convertEURToBGN(eurAmount: number): number {
    const exchangeRate = 1.95583 // Fixed rate for consistency
    return eurAmount * exchangeRate
  }

  // Convert BGN to EUR
  static convertBGNToEUR(bgnAmount: number): number {
    const exchangeRate = 1.95583
    return bgnAmount / exchangeRate
  }

  // Get current exchange rate
  static getExchangeRate(): number {
    return 1.95583 // Fixed rate for consistency
  }

  // Format Bulgarian date
  static formatDate(date: string | Date): string {
    const d = new Date(date)
    return d.toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  // Calculate due date
  static calculateDueDate(issueDate: string, paymentTerms: string): string {
    const issue = new Date(issueDate)
    let days = 0

    switch (paymentTerms) {
      case 'immediate':
        days = 0
        break
      case '7_days':
        days = 7
        break
      case '14_days':
        days = 14
        break
      case '30_days':
        days = 30
        break
      case '60_days':
        days = 60
        break
      case '90_days':
        days = 90
        break
      default:
        days = 30
    }

    const dueDate = new Date(issue)
    dueDate.setDate(issue.getDate() + days)
    return dueDate.toISOString()
  }

  // Validate invoice data
  static validateInvoice(invoice: Partial<Invoice>): string[] {
    const errors: string[] = []

    if (!invoice.customer?.name) {
      errors.push('Име на клиента е задължително')
    }

    if (!invoice.customer?.address?.street) {
      errors.push('Адрес на клиента е задължителен')
    }

    if (!invoice.customer?.address?.city) {
      errors.push('Град на клиента е задължителен')
    }

    if (!invoice.items || invoice.items.length === 0) {
      errors.push('Фактурата трябва да съдържа поне един артикул')
    }

    if (!invoice.paymentTerms) {
      errors.push('Условията за плащане са задължителни')
    }

    return errors
  }

  // Get default company information
  static getDefaultCompany(): Invoice['company'] {
    return {
      name: 'LAMARINA BG ООД',
      address: {
        street: 'Стопански Двор № 2',
        city: 'С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово',
        postalCode: '4114',
        country: 'България'
      },
      taxNumber: '123456789', // BULSTAT/UIC (Единен идентификационен код)
      vatNumber: 'BG123456789', // VAT номер (ДДС номер)
      phone: '+359 888 123 456',
      email: 'info@lamarina.bg',
      website: 'https://lamarina.bg',
      bankDetails: {
        bank: 'УниКредит Булбанк АД',
        iban: 'BG18UNCR70001523123123',
        swift: 'UNCRBGSF'
      }
    }
  }

  // Create invoice from order
  static createInvoiceFromOrder(order: Order, company: Invoice['company']): Invoice {
    const invoiceNumber = this.generateInvoiceNumber()
    const issueDate = new Date().toISOString()
    const dueDate = this.calculateDueDate(issueDate, '30_days')

    // Convert order items to invoice items
    const exchangeRate = this.getExchangeRate()
    const items: InvoiceItem[] = order.items.map((item: CartItem) => {
      const totalPrice = item.price * item.quantity
      const totalPriceEUR = this.convertBGNToEUR(totalPrice)
      const vatAmount = this.calculateVAT(totalPrice, VAT_RATES.STANDARD)
      const vatAmountEUR = this.convertBGNToEUR(vatAmount)
      
      return {
        id: item.productId,
        name: `Продукт ${item.productId}`, // This should be fetched from product data
        description: 'Описание на продукта',
        quantity: item.quantity,
        unit: 'бр',
        unitPrice: item.price,
        unitPriceEUR: this.convertBGNToEUR(item.price),
        totalPrice: totalPrice,
        totalPriceEUR: totalPriceEUR,
        vatRate: VAT_RATES.STANDARD,
        vatAmount: vatAmount,
        vatAmountEUR: vatAmountEUR
      }
    })

    const totals = this.calculateTotals(items)

    return {
      id: `invoice-${Date.now()}`,
      invoiceNumber,
      orderNumber: order.orderNumber,
      issueDate,
      dueDate,
      status: INVOICE_STATUSES.DRAFT,
      company,
      customer: {
        name: order.customer.name,
        company: order.customer.company,
        address: order.customer.address,
        taxNumber: order.customer.taxNumber,
        vatNumber: order.customer.vatNumber,
        phone: order.customer.phone,
        email: order.customer.email
      },
      items,
      subtotal: totals.subtotal,
      subtotalEUR: totals.subtotalEUR,
      vatAmount: totals.vatAmount,
      vatAmountEUR: totals.vatAmountEUR,
      total: totals.total,
      totalEUR: totals.totalEUR,
      currency: 'BGN',
      exchangeRate: exchangeRate,
      paymentTerms: '30_days',
      notes: order.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin'
    }
  }
}

// Invoice template service
export class InvoiceTemplateService {
  static getDefaultTemplate(): InvoiceTemplate {
    return {
      id: 'default',
      name: 'Стандартна фактура',
      description: 'Стандартен шаблон за фактури',
      isDefault: true,
      template: {
        header: {
          logo: '/logo.png',
          companyName: 'LAMARINA BG ООД',
          companyAddress: 'Стопански Двор № 2, С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово',
          contactInfo: 'тел: +359 888 123 456 | email: info@lamarina.bg'
        },
        footer: {
          terms: 'Условия за плащане: 30 дни от датата на фактурата',
          bankDetails: 'Банка: УниКредит Булбанк АД | IBAN: BG18UNCR70001523123123',
          additionalInfo: 'ДДС номер: BG123456789 | ЕИК: 123456789'
        },
        styling: {
          primaryColor: '#1e40af',
          secondaryColor: '#64748b',
          fontFamily: 'Arial, sans-serif'
        }
      }
    }
  }
}
