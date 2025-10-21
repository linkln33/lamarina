// PDF Invoice Generator for Bulgarian e-commerce

import jsPDF from 'jspdf'
import { Invoice, InvoiceItem, InvoiceTemplate } from './invoice'

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
    // Set font
    this.doc.setFont('helvetica')
    
    // Set colors
    this.doc.setDrawColor(30, 64, 175) // Primary color
    this.doc.setTextColor(30, 64, 175)
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
    
    // Company logo (if available)
    if (header.logo) {
      // Add logo logic here
    }
    
    // Company name
    this.doc.setFontSize(24)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(header.companyName, 20, 30)
    
    // Company address
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(header.companyAddress, 20, 40)
    
    // Contact info
    this.doc.text(header.contactInfo, 20, 50)
    
    // Invoice title
    this.doc.setFontSize(20)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('ФАКТУРА', 150, 30)
    
    // Invoice number
    this.doc.setFontSize(12)
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(`№ ${this.invoice.invoiceNumber}`, 150, 40)
    
    // Issue date
    this.doc.text(`Дата: ${this.formatDate(this.invoice.issueDate)}`, 150, 50)
    
    // Due date
    this.doc.text(`Падеж: ${this.formatDate(this.invoice.dueDate)}`, 150, 60)
  }

  private addCompanyInfo() {
    const { company } = this.invoice
    
    // Company details box
    this.doc.setDrawColor(200, 200, 200)
    this.doc.rect(20, 70, 80, 40)
    
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Данни за доставчика:', 25, 80)
    
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(company.name, 25, 88)
    this.doc.text(company.address.street, 25, 94)
    this.doc.text(`${company.address.postalCode} ${company.address.city}`, 25, 100)
    this.doc.text(`ЕИК: ${company.taxNumber}`, 25, 106)
  }

  private addCustomerInfo() {
    const { customer } = this.invoice
    
    // Customer details box
    this.doc.setDrawColor(200, 200, 200)
    this.doc.rect(110, 70, 80, 40)
    
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Данни за получателя:', 115, 80)
    
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(customer.name, 115, 88)
    if (customer.company) {
      this.doc.text(customer.company, 115, 94)
    }
    this.doc.text(customer.address.street, 115, 100)
    this.doc.text(`${customer.address.postalCode} ${customer.address.city}`, 115, 106)
  }

  private addInvoiceDetails() {
    // Invoice details section
    this.doc.setFontSize(12)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Детайли за фактурата:', 20, 130)
    
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(`Поръчка №: ${this.invoice.orderNumber}`, 20, 140)
    this.doc.text(`Статус: ${this.getStatusText(this.invoice.status)}`, 20, 150)
    
    if (this.invoice.notes) {
      this.doc.text(`Бележки: ${this.invoice.notes}`, 20, 160)
    }
  }

  private addItemsTable() {
    const startY = 170
    
    // Table header
    this.doc.setFillColor(240, 240, 240)
    this.doc.rect(20, startY, 170, 15)
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor(0, 0, 0)
    
    // Column headers
    this.doc.text('№', 25, startY + 10)
    this.doc.text('Описание', 35, startY + 10)
    this.doc.text('Кол.', 120, startY + 10)
    this.doc.text('М.ед.', 135, startY + 10)
    this.doc.text('Ед.цена', 150, startY + 10)
    this.doc.text('Общо', 170, startY + 10)
    
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
        this.doc.rect(20, currentY, 170, 15)
      }
      
      // Row content
      this.doc.text((index + 1).toString(), 25, currentY + 10)
      this.doc.text(item.name, 35, currentY + 10)
      this.doc.text(item.quantity.toString(), 120, currentY + 10)
      this.doc.text(item.unit, 135, currentY + 10)
      this.doc.text(this.formatCurrency(item.unitPrice), 150, currentY + 10)
      this.doc.text(this.formatCurrency(item.totalPrice), 170, currentY + 10)
      
      currentY += 15
    })
  }

  private addTotals() {
    const startY = 280
    
    // Totals section
    this.doc.setFontSize(12)
    this.doc.setFont('helvetica', 'bold')
    
    // Subtotal
    this.doc.text('Междинна сума:', 120, startY)
    this.doc.text(this.formatCurrency(this.invoice.subtotal), 170, startY)
    
    // VAT
    this.doc.text('ДДС (20%):', 120, startY + 10)
    this.doc.text(this.formatCurrency(this.invoice.vatAmount), 170, startY + 10)
    
    // Total
    this.doc.setFontSize(14)
    this.doc.text('ОБЩО:', 120, startY + 25)
    this.doc.text(this.formatCurrency(this.invoice.total), 170, startY + 25)
    
    // Currency
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'normal')
    this.doc.text('Валута: BGN', 120, startY + 35)
  }

  private addFooter() {
    const { footer } = this.template.template
    
    // Footer line
    this.doc.setDrawColor(200, 200, 200)
    this.doc.line(20, 270, 190, 270)
    
    // Footer content
    this.doc.setFontSize(8)
    this.doc.setFont('helvetica', 'normal')
    this.doc.setTextColor(100, 100, 100)
    
    this.doc.text(footer.terms, 20, 280)
    this.doc.text(footer.bankDetails, 20, 285)
    if (footer.additionalInfo) {
      this.doc.text(footer.additionalInfo, 20, 290)
    }
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

  private getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      draft: 'Чернова',
      sent: 'Изпратена',
      paid: 'Платена',
      overdue: 'Просрочена',
      cancelled: 'Отказана'
    }
    return statusMap[status] || status
  }

  // Generate and download PDF
  public downloadPDF(filename?: string): void {
    const defaultFilename = `factura_${this.invoice.invoiceNumber}.pdf`
    this.doc.save(filename || defaultFilename)
  }

  // Generate PDF as blob
  public getPDFBlob(): Blob {
    return this.doc.output('blob')
  }

  // Generate PDF as data URL
  public getPDFDataURL(): string {
    return this.doc.output('dataurlstring')
  }
}

// Utility functions for invoice generation
export class InvoicePDFUtils {
  // Generate invoice PDF from order
  static async generateInvoiceFromOrder(order: any): Promise<jsPDF> {
    const { InvoiceService, InvoiceTemplateService } = await import('./invoice')
    
    const company = InvoiceService.getDefaultCompany()
    const invoice = InvoiceService.createInvoiceFromOrder(order, company)
    const template = InvoiceTemplateService.getDefaultTemplate()
    
    const generator = new PDFInvoiceGenerator(invoice, template)
    return generator.generatePDF()
  }

  // Generate multiple invoices
  static async generateMultipleInvoices(orders: any[]): Promise<jsPDF[]> {
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
