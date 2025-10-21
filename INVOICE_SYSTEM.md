# Invoice System Documentation

## Overview

The invoice system provides comprehensive functionality for creating, managing, and generating PDF invoices for the Bulgarian e-commerce platform. It includes Bulgarian VAT compliance, local business requirements, and integration with the existing order system.

## Features

### ✅ Core Functionality
- **PDF Generation**: Create professional PDF invoices using jsPDF
- **Bulgarian VAT Compliance**: 20% standard VAT rate, 9% reduced rate, 0% zero rate
- **Local Business Format**: Bulgarian invoice format with required fields
- **Multi-language Support**: Bulgarian interface with proper formatting
- **Order Integration**: Create invoices directly from orders
- **Status Management**: Draft, sent, paid, overdue, cancelled statuses
- **Payment Terms**: Flexible payment terms (immediate, 7, 14, 30, 60, 90 days)

### ✅ Admin Panel Integration
- **Invoice Management**: Full CRUD operations for invoices
- **Search & Filter**: Find invoices by number, customer, or order
- **Status Tracking**: Monitor invoice status and payment status
- **PDF Download**: Download invoices as PDF files
- **Email Integration**: Send invoices via email (ready for implementation)

## File Structure

```
src/
├── lib/
│   ├── invoice.ts                    # Core invoice types and services
│   └── pdf-invoice-generator.ts      # PDF generation logic
├── components/admin/
│   ├── invoice-manager.tsx           # Invoice management interface
│   └── invoice-form.tsx              # Invoice creation form
└── app/admin/
    └── invoices/
        └── page.tsx                  # Admin invoices page
```

## Core Components

### 1. Invoice Types (`src/lib/invoice.ts`)

```typescript
interface Invoice {
  id: string
  invoiceNumber: string
  orderNumber: string
  issueDate: string
  dueDate: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  
  // Company information
  company: {
    name: string
    address: { street: string; city: string; postalCode: string; country: string }
    taxNumber: string // ЕИК
    vatNumber: string // VAT номер
    phone: string
    email: string
    website: string
    bankDetails: { bank: string; iban: string; swift: string }
  }
  
  // Customer information
  customer: {
    name: string
    company?: string
    address: { street: string; city: string; postalCode: string; country: string }
    taxNumber?: string
    vatNumber?: string
    phone?: string
    email?: string
  }
  
  // Invoice details
  items: InvoiceItem[]
  subtotal: number
  vatAmount: number
  total: number
  currency: 'BGN'
  
  // Payment terms
  paymentTerms: string
  notes?: string
}
```

### 2. Invoice Service (`src/lib/invoice.ts`)

```typescript
export class InvoiceService {
  // Generate unique invoice number
  static generateInvoiceNumber(): string
  
  // Calculate invoice totals
  static calculateTotals(items: InvoiceItem[]): { subtotal: number; vatAmount: number; total: number }
  
  // Calculate VAT amount
  static calculateVAT(price: number, vatRate: number): number
  
  // Format Bulgarian currency
  static formatCurrency(amount: number): string
  
  // Format Bulgarian date
  static formatDate(date: string | Date): string
  
  // Calculate due date
  static calculateDueDate(issueDate: string, paymentTerms: string): string
  
  // Validate invoice data
  static validateInvoice(invoice: Partial<Invoice>): string[]
  
  // Get default company information
  static getDefaultCompany(): Invoice['company']
  
  // Create invoice from order
  static createInvoiceFromOrder(order: any, company: Invoice['company']): Invoice
}
```

### 3. PDF Generator (`src/lib/pdf-invoice-generator.ts`)

```typescript
export class PDFInvoiceGenerator {
  constructor(invoice: Invoice, template: InvoiceTemplate)
  
  // Generate PDF document
  public generatePDF(): jsPDF
  
  // Download PDF file
  public downloadPDF(filename?: string): void
  
  // Get PDF as blob
  public getPDFBlob(): Blob
  
  // Get PDF as data URL
  public getPDFDataURL(): string
}
```

### 4. Invoice Manager (`src/components/admin/invoice-manager.tsx`)

- **Invoice List**: Display all invoices with search and filter
- **Status Management**: Update invoice status
- **PDF Download**: Download invoices as PDF
- **Email Sending**: Send invoices via email
- **Invoice Preview**: View invoice details before download

### 5. Invoice Form (`src/components/admin/invoice-form.tsx`)

- **Customer Information**: Name, company, address, tax details
- **Invoice Details**: Payment terms, notes, due date
- **Items Management**: Add, edit, remove invoice items
- **Real-time Calculation**: Automatic VAT and total calculation
- **Validation**: Form validation with error messages

## Bulgarian Compliance

### VAT Rates
- **Standard**: 20% (most goods and services)
- **Reduced**: 9% (certain goods like books, medicines)
- **Zero**: 0% (exports, certain services)

### Required Fields
- **Company**: Name, address, ЕИК (tax number), VAT number, bank details
- **Customer**: Name, address, tax number (if applicable)
- **Invoice**: Number, date, due date, items, totals, VAT breakdown

### Invoice Number Format
```
INV + YYYY + MM + DD + XXX
Example: INV20241201001
```

## Usage Examples

### 1. Create Invoice from Order

```typescript
import { InvoiceService } from '@/lib/invoice';

const order = {
  id: 'order-123',
  customer: { name: 'Иван Петров', address: { street: 'ул. Витоша 15', city: 'София' } },
  items: [{ productId: 'prod-1', quantity: 2, price: 100 }]
};

const company = InvoiceService.getDefaultCompany();
const invoice = InvoiceService.createInvoiceFromOrder(order, company);
```

### 2. Generate PDF Invoice

```typescript
import { PDFInvoiceGenerator } from '@/lib/pdf-invoice-generator';
import { InvoiceTemplateService } from '@/lib/invoice';

const template = InvoiceTemplateService.getDefaultTemplate();
const generator = new PDFInvoiceGenerator(invoice, template);
const pdf = generator.generatePDF();
generator.downloadPDF('factura_123.pdf');
```

### 3. Calculate Invoice Totals

```typescript
import { InvoiceService } from '@/lib/invoice';

const items = [
  { unitPrice: 100, quantity: 2, vatRate: 20, vatAmount: 40, totalPrice: 200 },
  { unitPrice: 50, quantity: 1, vatRate: 20, vatAmount: 10, totalPrice: 50 }
];

const totals = InvoiceService.calculateTotals(items);
// { subtotal: 250, vatAmount: 50, total: 300 }
```

## Admin Panel Integration

### Navigation
- **URL**: `/admin/invoices`
- **Icon**: Receipt
- **Translation**: `admin.invoices` → "Фактури"

### Features
- **Invoice List**: Grid view with search and filter
- **Create Invoice**: Form-based invoice creation
- **Edit Invoice**: Modify existing invoices
- **PDF Download**: Download individual or bulk invoices
- **Status Updates**: Change invoice status
- **Email Integration**: Send invoices via email

## Database Schema

The invoice system integrates with the existing Supabase schema:

```sql
-- Invoices table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  order_number VARCHAR(50),
  issue_date TIMESTAMP NOT NULL,
  due_date TIMESTAMP NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  
  -- Company data (JSON)
  company_data JSONB NOT NULL,
  
  -- Customer data (JSON)
  customer_data JSONB NOT NULL,
  
  -- Invoice items (JSON)
  items JSONB NOT NULL,
  
  -- Totals
  subtotal DECIMAL(10,2) NOT NULL,
  vat_amount DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'BGN',
  
  -- Payment terms
  payment_terms VARCHAR(20) NOT NULL,
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- Indexes
CREATE INDEX idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX idx_invoices_order_number ON invoices(order_number);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_issue_date ON invoices(issue_date);
```

## Future Enhancements

### Phase 1: Core Features ✅
- [x] PDF generation
- [x] Bulgarian VAT compliance
- [x] Admin panel integration
- [x] Order integration

### Phase 2: Advanced Features
- [ ] Email integration (SMTP)
- [ ] Bulk invoice generation
- [ ] Invoice templates
- [ ] Payment tracking
- [ ] Automated reminders

### Phase 3: Analytics
- [ ] Invoice analytics dashboard
- [ ] Revenue reporting
- [ ] Payment status tracking
- [ ] Customer payment history

### Phase 4: Automation
- [ ] Automated invoice generation
- [ ] Payment status updates
- [ ] Overdue invoice alerts
- [ ] Integration with accounting software

## Testing

### Unit Tests
```bash
npm test -- --testPathPattern=invoice
```

### Integration Tests
```bash
npm run test:integration -- --testPathPattern=invoice
```

### Manual Testing
1. **Create Invoice**: Test invoice creation from order
2. **PDF Generation**: Verify PDF format and content
3. **VAT Calculation**: Test different VAT rates
4. **Status Updates**: Test status change workflow
5. **Search & Filter**: Test admin panel functionality

## Troubleshooting

### Common Issues

1. **PDF Generation Fails**
   - Check jsPDF installation
   - Verify invoice data structure
   - Check browser compatibility

2. **VAT Calculation Errors**
   - Verify VAT rates are correct
   - Check number precision
   - Validate input data

3. **Invoice Number Conflicts**
   - Check uniqueness constraints
   - Verify date format
   - Check for concurrent creation

### Debug Mode

```typescript
// Enable debug logging
const debug = process.env.NODE_ENV === 'development';
if (debug) {
  console.log('Invoice data:', invoice);
  console.log('PDF generation:', pdf);
}
```

## Support

For issues or questions regarding the invoice system:

1. **Check Documentation**: Review this file and code comments
2. **Test Components**: Use the admin panel to test functionality
3. **Debug Logs**: Check browser console for errors
4. **Database**: Verify Supabase connection and data

## License

This invoice system is part of the LAMARINA BG project and follows the same licensing terms.
