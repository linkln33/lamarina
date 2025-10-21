// PDF Invoice Generator for Bulgarian e-commerce

import jsPDF from 'jspdf'
import { Invoice, InvoiceTemplate } from './invoice'
import { convertCyrillicToLatin } from './font-loader'
import { Order } from './ecommerce'

export class PDFInvoiceGenerator {
  private doc: jsPDF
  private template: InvoiceTemplate
  private invoice: Invoice

  constructor(invoice: Invoice, template: InvoiceTemplate) {
    this.invoice = invoice
    this.template = template
    this.doc = new jsPDF('p', 'mm', 'a4')
    this.setupDocument()
  }

  private setupDocument() {
    // Set up document with proper font support
    this.setupCyrillicFont()
    
    // Set colors
    this.doc.setDrawColor(30, 64, 175) // Primary color
    this.doc.setTextColor(30, 64, 175)
  }

  private setupCyrillicFont() {
    // Set up font for better text handling
    this.doc.setFont('helvetica')
    this.doc.setFontSize(10)
    
    // Note: For production, you would embed a proper Cyrillic font like this:
    // this.doc.addFileToVFS('Roboto-Regular.ttf', fontData);
    // this.doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    // this.doc.setFont('Roboto');
  }

  // Add logo to PDF
  private async addLogo(logoPath: string, x: number, y: number) {
    try {
      // For now, we'll use a text-based logo since we need to handle image loading properly
      // In production, you would load the image and convert to base64
      this.doc.setFontSize(16)
      this.doc.setFont('helvetica', 'bold')
      this.doc.text('LAMARINA BG', x, y)
      
      // TODO: Implement proper image loading
      // const img = new Image();
      // img.onload = () => {
      //   const canvas = document.createElement('canvas');
      //   const ctx = canvas.getContext('2d');
      //   canvas.width = img.width;
      //   canvas.height = img.height;
      //   ctx.drawImage(img, 0, 0);
      //   const dataURL = canvas.toDataURL('image/png');
      //   this.doc.addImage(dataURL, 'PNG', x, y, 30, 30);
      // };
      // img.src = logoPath;
    } catch (error) {
      console.warn('Logo loading failed:', error)
      // Fallback to text
      this.doc.setFontSize(16)
      this.doc.setFont('helvetica', 'bold')
      this.doc.text('LAMARINA BG', x, y)
    }
  }

  // Convert Bulgarian Cyrillic text to Latin for PDF compatibility
  private convertText(text: string): string {
    return convertCyrillicToLatin(text)
  }

  public generatePDF(): jsPDF {
    this.addHeader()
    this.addCompanyInfo()
    this.addCustomerInfo()
    this.addInvoiceDetails()
    this.addItemsTable()
    this.addTotals()
    this.addFooter()
    
    return this.doc
  }

  private addHeader() {
    const { header } = this.template.template
    
    // Company logo placeholder
    this.doc.setFontSize(16)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('LAMARINA BG Logo', 20, 20)
    
    // Company name
    this.doc.setFontSize(14)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.convertText('LAMARINA BG ООД'), 20, 30)
    
    // Company description
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(this.convertText('Металообработка и покривни системи'), 20, 38)
    
    // Company address
    this.doc.text(this.convertText('Адрес: Стопански Двор № 2'), 20, 46)
    this.doc.text(this.convertText('Град: С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово, 4114'), 20, 54)
    
    // Company details
    this.doc.text(this.convertText('ЕИК: 123456789'), 20, 62)
    this.doc.text(this.convertText('ДДС номер: BG123456789'), 20, 70)
    this.doc.text(this.convertText('Телефон: +359 888 123 456'), 20, 78)
    this.doc.text(this.convertText('Имейл: info@lamarina.bg'), 20, 86)
    
    // Invoice section
    this.doc.setFontSize(18)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.convertText('ФАКТУРА'), 150, 30)
    
    // Invoice details
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(this.convertText('Номер на фактурата'), 150, 40)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.invoice.invoiceNumber, 150, 48)
    
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(this.convertText('Дата на издаване'), 150, 58)
    this.doc.text(this.formatDate(this.invoice.issueDate), 150, 66)
    
    this.doc.text(this.convertText('Падеж'), 150, 76)
    this.doc.text(this.formatDate(this.invoice.dueDate), 150, 84)
    
    if (this.invoice.supplyDate) {
      this.doc.text(this.convertText('Дата на доставка'), 150, 94)
      this.doc.text(this.formatDate(this.invoice.supplyDate), 150, 102)
    }
  }

  private addCompanyInfo() {
    const { company } = this.invoice
    const startY = 120
    
    // Company details box
    this.doc.setDrawColor(200, 200, 200)
    this.doc.rect(20, startY, 80, 50)
    
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.convertText('Данни за доставчика'), 25, startY + 10)
    
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(this.convertText('LAMARINA BG ООД'), 25, startY + 18)
    this.doc.text(this.convertText('Стопански Двор № 2'), 25, startY + 26)
    this.doc.text(this.convertText('С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово, 4114'), 25, startY + 34)
    this.doc.text(this.convertText('България'), 25, startY + 42)
    this.doc.text(this.convertText('ЕИК: 123456789'), 25, startY + 50)
    this.doc.text(this.convertText('ДДС номер: BG123456789'), 25, startY + 58)
    this.doc.text(this.convertText('тел: +359 888 123 456'), 25, startY + 66)
    this.doc.text(this.convertText('email: info@lamarina.bg'), 25, startY + 74)
  }

  private addCustomerInfo() {
    const { customer } = this.invoice
    const startY = 120
    
    // Customer details box
    this.doc.setDrawColor(200, 200, 200)
    this.doc.rect(110, startY, 80, 50)
    
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.convertText('Данни за получателя'), 115, startY + 10)
    
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(this.convertText('Иван Петров'), 115, startY + 18)
    this.doc.text(this.convertText('Строителна фирма "Петров" ООД'), 115, startY + 26)
    this.doc.text(this.convertText('ул. Витоша 15'), 115, startY + 34)
    this.doc.text(this.convertText('София, 1000'), 115, startY + 42)
    this.doc.text(this.convertText('България'), 115, startY + 50)
    this.doc.text(this.convertText('ЕИК: 987654321'), 115, startY + 58)
    this.doc.text(this.convertText('ДДС номер: BG987654321'), 115, startY + 66)
    this.doc.text(this.convertText('тел: +359 888 987 654'), 115, startY + 74)
    this.doc.text(this.convertText('email: ivan.petrov@example.com'), 115, startY + 82)
  }

  private addInvoiceDetails() {
    const startY = 190
    
    // Invoice details section
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(this.convertText('Поръчка №'), 20, startY)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.invoice.orderNumber, 20, startY + 8)
    
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(this.convertText('Статус'), 20, startY + 18)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.convertText(this.getStatusText(this.invoice.status)), 20, startY + 26)
    
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(this.convertText('Условия за плащане'), 20, startY + 36)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.convertText('30 дни'), 20, startY + 44)
  }

  private addItemsTable() {
    const startY = 170
    
    // Table header
    this.doc.setFillColor(240, 240, 240)
    this.doc.rect(20, startY, 200, 15)
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor(0, 0, 0)
    
    // Column headers
    this.doc.text(this.convertText('№'), 20, startY + 10)
    this.doc.text(this.convertText('Описание'), 30, startY + 10)
    this.doc.text(this.convertText('Кол.'), 100, startY + 10)
    this.doc.text(this.convertText('М.ед.'), 115, startY + 10)
    this.doc.text(this.convertText('Ед.цена (BGN)'), 130, startY + 10)
    this.doc.text(this.convertText('Ед.цена (EUR)'), 160, startY + 10)
    this.doc.text(this.convertText('ДДС %'), 190, startY + 10)
    this.doc.text(this.convertText('Общо (BGN)'), 210, startY + 10)
    this.doc.text(this.convertText('Общо (EUR)'), 240, startY + 10)
    
    // Table rows
    let currentY = startY + 15
    this.doc.setFont('helvetica', 'normal')
    
    this.invoice.items.forEach((item, index) => {
      if (currentY > 250) {
        // Add new page if needed
        this.doc.addPage()
        currentY = 20
      }
      
      // Row background
      if (index % 2 === 0) {
        this.doc.setFillColor(250, 250, 250)
        this.doc.rect(20, currentY, 200, 15)
      }
      
      // Row content
      this.doc.text((index + 1).toString(), 20, currentY + 10)
      this.doc.text(this.convertText(item.name), 30, currentY + 10)
      this.doc.text(item.quantity.toString(), 100, currentY + 10)
      this.doc.text(this.convertText(item.unit), 115, currentY + 10)
      this.doc.text(this.formatCurrency(item.unitPrice), 130, currentY + 10)
      this.doc.text(this.formatCurrencyEUR(item.unitPriceEUR), 160, currentY + 10)
      this.doc.text(`${item.vatRate}%`, 190, currentY + 10)
      this.doc.text(this.formatCurrency(item.totalPrice), 210, currentY + 10)
      this.doc.text(this.formatCurrencyEUR(item.totalPriceEUR), 240, currentY + 10)
      
      // Add description if available
      if (item.description) {
        this.doc.setFontSize(8)
        this.doc.text(this.convertText(item.description), 30, currentY + 15)
        this.doc.setFontSize(10)
        currentY += 8
      }
      
      currentY += 15
    })
  }

  private addTotals() {
    const startY = 280
    
    // Totals section
    this.doc.setFontSize(12)
    this.doc.setFont('helvetica', 'bold')
    
    // Subtotal BGN
    this.doc.text(this.convertText('Междинна сума (BGN):'), 120, startY)
    this.doc.text(this.formatCurrency(this.invoice.subtotal), 190, startY)
    
    // Subtotal EUR
    this.doc.text(this.convertText('Междинна сума (EUR):'), 120, startY + 10)
    this.doc.text(this.formatCurrencyEUR(this.invoice.subtotalEUR), 190, startY + 10)
    
    // VAT BGN
    this.doc.text(this.convertText('ДДС (20%) BGN:'), 120, startY + 20)
    this.doc.text(this.formatCurrency(this.invoice.vatAmount), 190, startY + 20)
    
    // VAT EUR
    this.doc.text(this.convertText('ДДС (20%) EUR:'), 120, startY + 30)
    this.doc.text(this.formatCurrencyEUR(this.invoice.vatAmountEUR), 190, startY + 30)
    
    // Total BGN
    this.doc.setFontSize(14)
    this.doc.text(this.convertText('ОБЩО (BGN):'), 120, startY + 45)
    this.doc.text(this.formatCurrency(this.invoice.total), 190, startY + 45)
    
    // Total EUR
    this.doc.text(this.convertText('ОБЩО (EUR):'), 120, startY + 55)
    this.doc.text(this.formatCurrencyEUR(this.invoice.totalEUR), 190, startY + 55)
    
    // Exchange rate
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(this.convertText(`Курс: 1 EUR = ${this.invoice.exchangeRate} BGN`), 120, startY + 70)
  }

  private addFooter() {
    const startY = 350
    
    // Notes section
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.convertText('Бележки'), 20, startY)
    
    this.doc.setFont('helvetica', 'normal')
    if (this.invoice.notes) {
      this.doc.text(this.convertText(this.invoice.notes), 20, startY + 10)
    } else {
      this.doc.text(this.convertText('Доставката се извършва в срок от 14 дни от потвърждаването на поръчката.'), 20, startY + 10)
    }
    
    // Bank details
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.convertText('Банкови данни:'), 20, startY + 30)
    
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(this.convertText('УниКредит Булбанк АД'), 20, startY + 40)
    this.doc.text(this.convertText('IBAN: BG18UNCR70001523123123'), 20, startY + 50)
    this.doc.text(this.convertText('SWIFT: UNCRBGSF'), 20, startY + 60)
    
    // Payment terms
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.convertText('Условия за плащане:'), 20, startY + 80)
    
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(this.convertText('Плащането се извършва в срок от 30 дни от датата на фактурата.'), 20, startY + 90)
    this.doc.text(this.convertText('При забавяне на плащането се начислява лихва съгласно действащото законодателство.'), 20, startY + 100)
  }

  private formatDate(date: string): string {
    return new Date(date).toLocaleDateString('bg-BG')
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: 'BGN',
      minimumFractionDigits: 2
    }).format(amount)
  }

  private formatCurrencyEUR(amount: number): string {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  private getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      draft: 'Чернова',
      sent: 'Изпратена',
      paid: 'Платена',
      overdue: 'Просрочена',
      cancelled: 'Отказана'
    }
    return this.convertText(statusMap[status] || status)
  }

  // Generate and download PDF
  public downloadPDF(filename?: string): void {
    // Generate the PDF content first
    this.generatePDF()
    
    const defaultFilename = `factura_${this.invoice.invoiceNumber}.pdf`
    this.doc.save(filename || defaultFilename)
  }

  // Generate PDF as blob
  public getPDFBlob(): Blob {
    this.generatePDF()
    return this.doc.output('blob')
  }

  // Generate PDF as data URL
  public getPDFDataURL(): string {
    this.generatePDF()
    return this.doc.output('dataurlstring')
  }
}

// Utility functions for invoice generation
export class InvoicePDFUtils {
  // Generate invoice PDF from order
  static async generateInvoiceFromOrder(order: Order): Promise<jsPDF> {
    const { InvoiceService, InvoiceTemplateService } = await import('./invoice')
    
    const company = InvoiceService.getDefaultCompany()
    const invoice = InvoiceService.createInvoiceFromOrder(order, company)
    const template = InvoiceTemplateService.getDefaultTemplate()
    
    const generator = new PDFInvoiceGenerator(invoice, template)
    return generator.generatePDF()
  }

  // Generate multiple invoices
  static async generateMultipleInvoices(orders: Order[]): Promise<jsPDF[]> {
    const results: jsPDF[] = []
    
    for (const order of orders) {
      const pdf = await this.generateInvoiceFromOrder(order)
      results.push(pdf)
    }
    
    return results
  }

  // Generate invoice preview
  static async generateInvoicePreview(invoice: Invoice): Promise<string> {
    const { InvoiceTemplateService } = await import('./invoice')
    
    const template = InvoiceTemplateService.getDefaultTemplate()
    const generator = new PDFInvoiceGenerator(invoice, template)
    
    return generator.getPDFDataURL()
  }
}
