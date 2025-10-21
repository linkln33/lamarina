// PDF Invoice Generator using pdfmake for Cyrillic support
import PdfPrinter from 'pdfmake/src/printer'
import { Invoice } from './invoice'

// Define fonts with Cyrillic support
const fonts = {
  Roboto: {
    normal: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2',
    bold: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.woff2',
    italics: 'https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu4WxKKz1l.woff2',
    bolditalics: 'https://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu4WxKKz1l.woff2'
  }
}

export class PDFInvoiceGeneratorPdfMake {
  private invoice: Invoice

  constructor(invoice: Invoice) {
    this.invoice = invoice
  }

  public generatePDF(): Promise<Buffer> {
    const docDefinition = this.createDocumentDefinition()
    const printer = new PdfPrinter(fonts)
    
    return new Promise((resolve, reject) => {
      const pdfDoc = printer.createPdfKitDocument(docDefinition)
      const chunks: Buffer[] = []
      
      pdfDoc.on('data', (chunk: Buffer) => chunks.push(chunk))
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)))
      pdfDoc.on('error', reject)
      
      pdfDoc.end()
    })
  }

  private createDocumentDefinition() {
    return {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      defaultStyle: {
        font: 'Roboto',
        fontSize: 10
      },
      content: [
        this.createHeader(),
        this.createCompanyInfo(),
        this.createCustomerInfo(),
        this.createInvoiceDetails(),
        this.createItemsTable(),
        this.createTotals(),
        this.createFooter()
      ]
    }
  }

  private createHeader() {
    return {
      columns: [
        {
          width: '*',
          stack: [
            { text: 'LAMARINA BG Logo', fontSize: 16, bold: true, margin: [0, 0, 0, 10] },
            { text: 'LAMARINA BG ООД', fontSize: 14, bold: true },
            { text: 'Металообработка и покривни системи', fontSize: 10, margin: [0, 5, 0, 10] },
            { text: 'Адрес: Стопански Двор № 2', fontSize: 9 },
            { text: 'Град: С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово, 4114', fontSize: 9 },
            { text: 'ЕИК: 123456789', fontSize: 9 },
            { text: 'ДДС номер: BG123456789', fontSize: 9 },
            { text: 'Телефон: +359 888 123 456', fontSize: 9 },
            { text: 'Имейл: info@lamarina.bg', fontSize: 9 }
          ]
        },
        {
          width: 200,
          stack: [
            { text: 'ФАКТУРА', fontSize: 18, bold: true, alignment: 'right', margin: [0, 0, 0, 10] },
            { text: 'Номер на фактурата', fontSize: 10, alignment: 'right' },
            { text: this.invoice.invoiceNumber, fontSize: 12, bold: true, alignment: 'right', margin: [0, 5, 0, 10] },
            { text: 'Дата на издаване', fontSize: 10, alignment: 'right' },
            { text: this.formatDate(this.invoice.issueDate), fontSize: 10, alignment: 'right', margin: [0, 5, 0, 10] },
            { text: 'Падеж', fontSize: 10, alignment: 'right' },
            { text: this.formatDate(this.invoice.dueDate), fontSize: 10, alignment: 'right', margin: [0, 5, 0, 10] },
            ...(this.invoice.supplyDate ? [
              { text: 'Дата на доставка', fontSize: 10, alignment: 'right' },
              { text: this.formatDate(this.invoice.supplyDate), fontSize: 10, alignment: 'right' }
            ] : [])
          ]
        }
      ],
      margin: [0, 0, 0, 20]
    }
  }

  private createCompanyInfo() {
    return {
      columns: [
        {
          width: '*',
          stack: [
            { text: 'Данни за доставчика', fontSize: 10, bold: true, margin: [0, 0, 0, 10] },
            { text: 'LAMARINA BG ООД', fontSize: 10, bold: true },
            { text: 'Стопански Двор № 2', fontSize: 9 },
            { text: 'С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово, 4114', fontSize: 9 },
            { text: 'България', fontSize: 9 },
            { text: 'ЕИК: 123456789', fontSize: 9 },
            { text: 'ДДС номер: BG123456789', fontSize: 9 },
            { text: 'тел: +359 888 123 456', fontSize: 9 },
            { text: 'email: info@lamarina.bg', fontSize: 9 }
          ]
        },
        {
          width: '*',
          stack: [
            { text: 'Данни за получателя', fontSize: 10, bold: true, margin: [0, 0, 0, 10] },
            { text: 'Иван Петров', fontSize: 10, bold: true },
            { text: 'Строителна фирма "Петров" ООД', fontSize: 9 },
            { text: 'ул. Витоша 15', fontSize: 9 },
            { text: 'София, 1000', fontSize: 9 },
            { text: 'България', fontSize: 9 },
            { text: 'ЕИК: 987654321', fontSize: 9 },
            { text: 'ДДС номер: BG987654321', fontSize: 9 },
            { text: 'тел: +359 888 987 654', fontSize: 9 },
            { text: 'email: ivan.petrov@example.com', fontSize: 9 }
          ]
        }
      ],
      margin: [0, 0, 0, 20]
    }
  }

  private createCustomerInfo() {
    return {
      columns: [
        {
          width: '*',
          stack: [
            { text: 'Поръчка №', fontSize: 10 },
            { text: this.invoice.orderNumber, fontSize: 10, bold: true, margin: [0, 5, 0, 10] },
            { text: 'Статус', fontSize: 10 },
            { text: this.getStatusText(this.invoice.status), fontSize: 10, bold: true, margin: [0, 5, 0, 10] },
            { text: 'Условия за плащане', fontSize: 10 },
            { text: '30 дни', fontSize: 10, bold: true }
          ]
        }
      ],
      margin: [0, 0, 0, 20]
    }
  }

  private createInvoiceDetails() {
    return {
      text: 'Артикули',
      fontSize: 12,
      bold: true,
      margin: [0, 0, 0, 10]
    }
  }

  private createItemsTable() {
    const tableBody = [
      [
        { text: '№', style: 'tableHeader' },
        { text: 'Описание', style: 'tableHeader' },
        { text: 'Кол.', style: 'tableHeader' },
        { text: 'М.ед.', style: 'tableHeader' },
        { text: 'Ед.цена (BGN)', style: 'tableHeader' },
        { text: 'Ед.цена (EUR)', style: 'tableHeader' },
        { text: 'ДДС %', style: 'tableHeader' },
        { text: 'Общо (BGN)', style: 'tableHeader' },
        { text: 'Общо (EUR)', style: 'tableHeader' }
      ]
    ]

    this.invoice.items.forEach((item, index) => {
      tableBody.push([
        { text: (index + 1).toString() },
        { 
          stack: [
            { text: item.name, bold: true },
            ...(item.description ? [{ text: item.description, fontSize: 8, color: '#666' }] : [])
          ]
        },
        { text: item.quantity.toString() },
        { text: item.unit },
        { text: this.formatCurrency(item.unitPrice) },
        { text: this.formatCurrencyEUR(item.unitPriceEUR) },
        { text: `${item.vatRate}%` },
        { text: this.formatCurrency(item.totalPrice), bold: true },
        { text: this.formatCurrencyEUR(item.totalPriceEUR), bold: true }
      ])
    })

    return {
      table: {
        headerRows: 1,
        widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: tableBody
      },
      layout: {
        hLineWidth: (i: number, node: any) => i === 0 || i === node.table.body.length ? 1 : 0.5,
        vLineWidth: () => 0.5,
        hLineColor: () => '#cccccc',
        vLineColor: () => '#cccccc'
      },
      margin: [0, 0, 0, 20]
    }
  }

  private createTotals() {
    return {
      columns: [
        { width: '*', text: '' },
        {
          width: 200,
          stack: [
            {
              columns: [
                { text: 'Междинна сума (BGN):', width: '*' },
                { text: this.formatCurrency(this.invoice.subtotal), alignment: 'right' }
              ]
            },
            {
              columns: [
                { text: 'Междинна сума (EUR):', width: '*' },
                { text: this.formatCurrencyEUR(this.invoice.subtotalEUR), alignment: 'right' }
              ]
            },
            {
              columns: [
                { text: 'ДДС (20%) BGN:', width: '*' },
                { text: this.formatCurrency(this.invoice.vatAmount), alignment: 'right' }
              ]
            },
            {
              columns: [
                { text: 'ДДС (20%) EUR:', width: '*' },
                { text: this.formatCurrencyEUR(this.invoice.vatAmountEUR), alignment: 'right' }
              ]
            },
            { text: '', margin: [0, 5, 0, 5] },
            {
              columns: [
                { text: 'ОБЩО (BGN):', width: '*', bold: true, fontSize: 12 },
                { text: this.formatCurrency(this.invoice.total), alignment: 'right', bold: true, fontSize: 12 }
              ]
            },
            {
              columns: [
                { text: 'ОБЩО (EUR):', width: '*', bold: true, fontSize: 12 },
                { text: this.formatCurrencyEUR(this.invoice.totalEUR), alignment: 'right', bold: true, fontSize: 12 }
              ]
            },
            { text: `Курс: 1 EUR = ${this.invoice.exchangeRate} BGN`, fontSize: 8, color: '#666', alignment: 'right', margin: [0, 10, 0, 0] }
          ]
        }
      ],
      margin: [0, 0, 0, 20]
    }
  }

  private createFooter() {
    return {
      stack: [
        { text: 'Бележки', fontSize: 10, bold: true, margin: [0, 0, 0, 5] },
        { 
          text: this.invoice.notes || 'Доставката се извършва в срок от 14 дни от потвърждаването на поръчката.',
          fontSize: 9,
          margin: [0, 0, 0, 15]
        },
        { text: 'Банкови данни:', fontSize: 10, bold: true, margin: [0, 0, 0, 5] },
        { text: 'УниКредит Булбанк АД', fontSize: 9 },
        { text: 'IBAN: BG18UNCR70001523123123', fontSize: 9 },
        { text: 'SWIFT: UNCRBGSF', fontSize: 9, margin: [0, 0, 0, 15] },
        { text: 'Условия за плащане:', fontSize: 10, bold: true, margin: [0, 0, 0, 5] },
        { text: 'Плащането се извършва в срок от 30 дни от датата на фактурата.', fontSize: 9 },
        { text: 'При забавяне на плащането се начислява лихва съгласно действащото законодателство.', fontSize: 9 }
      ]
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
    return statusMap[status] || status
  }

  // Generate and download PDF
  public async downloadPDF(filename?: string): Promise<void> {
    try {
      const pdfBuffer = await this.generatePDF()
      const blob = new Blob([pdfBuffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = filename || `invoice-${this.invoice.invoiceNumber}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw error
    }
  }
}
