// PDF Invoice Generator using HTML template with Cyrillic support
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Invoice } from './invoice'

export class PDFInvoiceGeneratorHTML {
  private invoice: Invoice

  constructor(invoice: Invoice) {
    this.invoice = invoice
  }

  public async generatePDF(): Promise<jsPDF> {
    // Create HTML template
    const htmlContent = this.createHTMLTemplate()
    
    // Create a temporary element
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent
    tempDiv.style.position = 'absolute'
    tempDiv.style.left = '-9999px'
    tempDiv.style.top = '0'
    tempDiv.style.width = '210mm' // A4 width
    tempDiv.style.fontFamily = 'Arial, sans-serif'
    tempDiv.style.fontSize = '12px'
    tempDiv.style.lineHeight = '1.4'
    tempDiv.style.color = '#000'
    tempDiv.style.backgroundColor = '#fff'
    
    document.body.appendChild(tempDiv)

    try {
      // Wait for images to load
      const images = tempDiv.querySelectorAll('img')
      if (images.length > 0) {
        await Promise.all(Array.from(images).map(img => {
          return new Promise((resolve, reject) => {
            if (img.complete) {
              resolve(img)
            } else {
              img.onload = () => resolve(img)
              img.onerror = () => resolve(img) // Continue even if image fails to load
            }
          })
        }))
      }

      // Convert HTML to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123 // A4 height in pixels at 96 DPI
      })

      // Create PDF from canvas
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      return pdf
    } finally {
      // Clean up
      document.body.removeChild(tempDiv)
    }
  }

  private createHTMLTemplate(): string {
    return `
      <div style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; color: #000; background: #fff; padding: 20px; max-width: 210mm;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
          <div>
            <div style="margin-bottom: 10px;">
              <img src="/logo.png" alt="LAMARINA BG Logo" style="height: 40px; max-width: 120px; object-fit: contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
              <div style="font-size: 16px; font-weight: bold; display: none; color: #2563eb;">LAMARINA BG</div>
            </div>
            <div style="font-size: 14px; font-weight: bold;">LAMARINA BG ООД</div>
            <div style="font-size: 10px; margin: 5px 0;">Металообработка и покривни системи</div>
            <div style="font-size: 9px; margin: 2px 0;">Адрес: Стопански Двор № 2</div>
            <div style="font-size: 9px; margin: 2px 0;">Град: С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово, 4114</div>
            <div style="font-size: 9px; margin: 2px 0;">ЕИК: 123456789</div>
            <div style="font-size: 9px; margin: 2px 0;">ДДС номер: BG123456789</div>
            <div style="font-size: 9px; margin: 2px 0;">Телефон: +359 888 123 456</div>
            <div style="font-size: 9px; margin: 2px 0;">Имейл: info@lamarina.bg</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">ФАКТУРА</div>
            <div style="font-size: 10px;">Номер на фактурата</div>
            <div style="font-size: 12px; font-weight: bold; margin: 5px 0;">${this.invoice.invoiceNumber}</div>
            <div style="font-size: 10px;">Дата на издаване</div>
            <div style="font-size: 10px; margin: 5px 0;">${this.formatDate(this.invoice.issueDate)}</div>
            <div style="font-size: 10px;">Падеж</div>
            <div style="font-size: 10px; margin: 5px 0;">${this.formatDate(this.invoice.dueDate)}</div>
            ${this.invoice.supplyDate ? `
              <div style="font-size: 10px;">Дата на доставка</div>
              <div style="font-size: 10px; margin: 5px 0;">${this.formatDate(this.invoice.supplyDate)}</div>
            ` : ''}
          </div>
        </div>

        <!-- Company and Customer Info -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
          <div style="width: 48%; border: 1px solid #ccc; padding: 15px;">
            <div style="font-size: 10px; font-weight: bold; margin-bottom: 10px;">Данни за доставчика</div>
            <div style="font-size: 10px; font-weight: bold;">LAMARINA BG ООД</div>
            <div style="font-size: 9px; margin: 2px 0;">Стопански Двор № 2</div>
            <div style="font-size: 9px; margin: 2px 0;">С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово, 4114</div>
            <div style="font-size: 9px; margin: 2px 0;">България</div>
            <div style="font-size: 9px; margin: 2px 0;">ЕИК: 123456789</div>
            <div style="font-size: 9px; margin: 2px 0;">ДДС номер: BG123456789</div>
            <div style="font-size: 9px; margin: 2px 0;">тел: +359 888 123 456</div>
            <div style="font-size: 9px; margin: 2px 0;">email: info@lamarina.bg</div>
          </div>
          <div style="width: 48%; border: 1px solid #ccc; padding: 15px;">
            <div style="font-size: 10px; font-weight: bold; margin-bottom: 10px;">Данни за получателя</div>
            <div style="font-size: 10px; font-weight: bold;">Иван Петров</div>
            <div style="font-size: 9px; margin: 2px 0;">Строителна фирма "Петров" ООД</div>
            <div style="font-size: 9px; margin: 2px 0;">ул. Витоша 15</div>
            <div style="font-size: 9px; margin: 2px 0;">София, 1000</div>
            <div style="font-size: 9px; margin: 2px 0;">България</div>
            <div style="font-size: 9px; margin: 2px 0;">ЕИК: 987654321</div>
            <div style="font-size: 9px; margin: 2px 0;">ДДС номер: BG987654321</div>
            <div style="font-size: 9px; margin: 2px 0;">тел: +359 888 987 654</div>
            <div style="font-size: 9px; margin: 2px 0;">email: ivan.petrov@example.com</div>
          </div>
        </div>

        <!-- Invoice Details -->
        <div style="margin-bottom: 20px;">
          <div style="display: flex; gap: 40px;">
            <div>
              <div style="font-size: 10px;">Поръчка №</div>
              <div style="font-size: 10px; font-weight: bold;">${this.invoice.orderNumber}</div>
            </div>
            <div>
              <div style="font-size: 10px;">Статус</div>
              <div style="font-size: 10px; font-weight: bold;">${this.getStatusText(this.invoice.status)}</div>
            </div>
            <div>
              <div style="font-size: 10px;">Условия за плащане</div>
              <div style="font-size: 10px; font-weight: bold;">30 дни</div>
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 12px; font-weight: bold; margin-bottom: 10px;">Артикули</div>
          <table style="width: 100%; border-collapse: collapse; font-size: 9px;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="border: 1px solid #ccc; padding: 8px; text-align: center;">№</th>
                <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Описание</th>
                <th style="border: 1px solid #ccc; padding: 8px; text-align: center;">Кол.</th>
                <th style="border: 1px solid #ccc; padding: 8px; text-align: center;">М.ед.</th>
                <th style="border: 1px solid #ccc; padding: 8px; text-align: right;">Ед.цена (BGN)</th>
                <th style="border: 1px solid #ccc; padding: 8px; text-align: right;">Ед.цена (EUR)</th>
                <th style="border: 1px solid #ccc; padding: 8px; text-align: center;">ДДС %</th>
                <th style="border: 1px solid #ccc; padding: 8px; text-align: right;">Общо (BGN)</th>
                <th style="border: 1px solid #ccc; padding: 8px; text-align: right;">Общо (EUR)</th>
              </tr>
            </thead>
            <tbody>
              ${this.invoice.items.map((item, index) => `
                <tr style="background-color: ${index % 2 === 0 ? '#fff' : '#f9f9f9'};">
                  <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${index + 1}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;">
                    <div style="font-weight: bold;">${item.name}</div>
                    ${item.description ? `<div style="font-size: 8px; color: #666;">${item.description}</div>` : ''}
                  </td>
                  <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${item.quantity}</td>
                  <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${item.unit}</td>
                  <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${this.formatCurrency(item.unitPrice)}</td>
                  <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${this.formatCurrencyEUR(item.unitPriceEUR)}</td>
                  <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${item.vatRate}%</td>
                  <td style="border: 1px solid #ccc; padding: 8px; text-align: right; font-weight: bold;">${this.formatCurrency(item.totalPrice)}</td>
                  <td style="border: 1px solid #ccc; padding: 8px; text-align: right; font-weight: bold;">${this.formatCurrencyEUR(item.totalPriceEUR)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Totals -->
        <div style="display: flex; justify-content: flex-end; margin-bottom: 30px;">
          <div style="width: 300px; border: 1px solid #ccc; padding: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <span>Междинна сума (BGN):</span>
              <span>${this.formatCurrency(this.invoice.subtotal)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <span>Междинна сума (EUR):</span>
              <span>${this.formatCurrencyEUR(this.invoice.subtotalEUR)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <span>ДДС (20%) BGN:</span>
              <span>${this.formatCurrency(this.invoice.vatAmount)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <span>ДДС (20%) EUR:</span>
              <span>${this.formatCurrencyEUR(this.invoice.vatAmountEUR)}</span>
            </div>
            <div style="border-top: 1px solid #ccc; padding-top: 10px; margin-top: 10px;">
              <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; margin-bottom: 5px;">
                <span>ОБЩО (BGN):</span>
                <span>${this.formatCurrency(this.invoice.total)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; margin-bottom: 5px;">
                <span>ОБЩО (EUR):</span>
                <span>${this.formatCurrencyEUR(this.invoice.totalEUR)}</span>
              </div>
              <div style="font-size: 8px; color: #666; text-align: right;">
                Курс: 1 EUR = ${this.invoice.exchangeRate} BGN
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #ccc; padding-top: 20px;">
          <div style="margin-bottom: 15px;">
            <div style="font-size: 10px; font-weight: bold; margin-bottom: 5px;">Бележки</div>
            <div style="font-size: 9px;">
              ${this.invoice.notes || 'Доставката се извършва в срок от 14 дни от потвърждаването на поръчката.'}
            </div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <div style="font-size: 10px; font-weight: bold; margin-bottom: 5px;">Банкови данни:</div>
            <div style="font-size: 9px;">УниКредит Булбанк АД</div>
            <div style="font-size: 9px;">IBAN: BG18UNCR70001523123123</div>
            <div style="font-size: 9px;">SWIFT: UNCRBGSF</div>
          </div>
          
          <div>
            <div style="font-size: 10px; font-weight: bold; margin-bottom: 5px;">Условия за плащане:</div>
            <div style="font-size: 9px;">Плащането се извършва в срок от 30 дни от датата на фактурата.</div>
            <div style="font-size: 9px;">При забавяне на плащането се начислява лихва съгласно действащото законодателство.</div>
          </div>
        </div>
      </div>
    `
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
      const pdf = await this.generatePDF()
      pdf.save(filename || `invoice-${this.invoice.invoiceNumber}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw error
    }
  }
}
