"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  Save, 
  X,
  Calculator
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Invoice, InvoiceItem, InvoiceService, PAYMENT_TERMS } from '@/lib/invoice';
import { Order, CartItem } from '@/lib/ecommerce';

interface InvoiceFormProps {
  order?: Order;
  onSave: (invoice: Invoice) => void;
  onCancel: () => void;
}

export function InvoiceForm({ order, onSave, onCancel }: InvoiceFormProps) {
  const [formData, setFormData] = useState({
    // Customer information
    customerName: order?.customer?.name || '',
    customerCompany: order?.customer?.company || '',
    customerStreet: order?.customer?.address?.street || '',
    customerCity: order?.customer?.address?.city || '',
    customerPostalCode: order?.customer?.address?.postalCode || '',
    customerCountry: order?.customer?.address?.country || 'България',
    customerTaxNumber: order?.customer?.taxNumber || '',
    customerVatNumber: order?.customer?.vatNumber || '',
    customerPhone: order?.customer?.phone || '',
    customerEmail: order?.customer?.email || '',
    
    // Invoice details
    paymentTerms: '30_days',
    notes: order?.notes || '',
    
    // Items
    items: order?.items?.map((item: CartItem) => ({
      id: item.productId,
      name: `Продукт ${item.productId}`,
      description: 'Описание на продукта',
      quantity: item.quantity,
      unit: 'бр',
      unitPrice: item.price,
      totalPrice: item.price * item.quantity,
      vatRate: 20,
      vatAmount: InvoiceService.calculateVAT(item.price * item.quantity, 20)
    })) || []
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setFormData(prev => {
      const newItems = [...prev.items];
      newItems[index] = {
        ...newItems[index],
        [field]: value
      };

      // Recalculate totals if price or quantity changed
      if (field === 'unitPrice' || field === 'quantity') {
        const unitPrice = field === 'unitPrice' ? value as number : newItems[index].unitPrice;
        const quantity = field === 'quantity' ? value as number : newItems[index].quantity;
        const totalPrice = unitPrice * quantity;
        const vatAmount = InvoiceService.calculateVAT(totalPrice, newItems[index].vatRate);
        
        newItems[index] = {
          ...newItems[index],
          unitPrice,
          quantity,
          totalPrice,
          vatAmount
        };
      }

      return {
        ...prev,
        items: newItems
      };
    });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      name: '',
      description: '',
      quantity: 1,
      unit: 'бр',
      unitPrice: 0,
      totalPrice: 0,
      vatRate: 20,
      vatAmount: 0
    };

    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateTotals = () => {
    const totals = InvoiceService.calculateTotals(formData.items);
    return totals;
  };

  const handleSave = async () => {
    try {
      setIsCalculating(true);

      // Validate form
      if (!formData.customerName) {
        toast.error('Име на клиента е задължително');
        return;
      }

      if (!formData.customerStreet) {
        toast.error('Адрес на клиента е задължителен');
        return;
      }

      if (!formData.customerCity) {
        toast.error('Град на клиента е задължителен');
        return;
      }

      if (formData.items.length === 0) {
        toast.error('Фактурата трябва да съдържа поне един артикул');
        return;
      }

      // Create invoice
      const totals = calculateTotals();
      const company = InvoiceService.getDefaultCompany();
      const invoiceNumber = InvoiceService.generateInvoiceNumber();
      const issueDate = new Date().toISOString();
      const dueDate = InvoiceService.calculateDueDate(issueDate, formData.paymentTerms);

      const invoice: Invoice = {
        id: `invoice-${Date.now()}`,
        invoiceNumber,
        orderNumber: order?.orderNumber || `ORD${Date.now()}`,
        issueDate,
        dueDate,
        status: 'draft',
        company,
        customer: {
          name: formData.customerName,
          company: formData.customerCompany,
          address: {
            street: formData.customerStreet,
            city: formData.customerCity,
            postalCode: formData.customerPostalCode,
            country: formData.customerCountry
          },
          taxNumber: formData.customerTaxNumber,
          vatNumber: formData.customerVatNumber,
          phone: formData.customerPhone,
          email: formData.customerEmail
        },
        items: formData.items,
        subtotal: totals.subtotal,
        vatAmount: totals.vatAmount,
        total: totals.total,
        currency: 'BGN',
        paymentTerms: formData.paymentTerms,
        notes: formData.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin'
      };

      onSave(invoice);
      toast.success('Фактурата е създадена успешно');

    } catch (error) {
      console.error('Error saving invoice:', error);
      toast.error('Грешка при създаване на фактурата');
    } finally {
      setIsCalculating(false);
    }
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Създаване на фактура</h2>
          <p className="text-muted-foreground">
            Попълнете данните за новата фактура
          </p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Отказ
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Данни за клиента</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="customerName">Име *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                placeholder="Име на клиента"
              />
            </div>

            <div>
              <Label htmlFor="customerCompany">Фирма</Label>
              <Input
                id="customerCompany"
                value={formData.customerCompany}
                onChange={(e) => handleInputChange('customerCompany', e.target.value)}
                placeholder="Име на фирмата"
              />
            </div>

            <div>
              <Label htmlFor="customerStreet">Адрес *</Label>
              <Input
                id="customerStreet"
                value={formData.customerStreet}
                onChange={(e) => handleInputChange('customerStreet', e.target.value)}
                placeholder="Улица и номер"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerCity">Град *</Label>
                <Input
                  id="customerCity"
                  value={formData.customerCity}
                  onChange={(e) => handleInputChange('customerCity', e.target.value)}
                  placeholder="Град"
                />
              </div>
              <div>
                <Label htmlFor="customerPostalCode">Пощенски код</Label>
                <Input
                  id="customerPostalCode"
                  value={formData.customerPostalCode}
                  onChange={(e) => handleInputChange('customerPostalCode', e.target.value)}
                  placeholder="Пощенски код"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerPhone">Телефон</Label>
                <Input
                  id="customerPhone"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                  placeholder="+359 888 123 456"
                />
              </div>
              <div>
                <Label htmlFor="customerEmail">Имейл</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerTaxNumber">ЕИК</Label>
                <Input
                  id="customerTaxNumber"
                  value={formData.customerTaxNumber}
                  onChange={(e) => handleInputChange('customerTaxNumber', e.target.value)}
                  placeholder="ЕИК номер"
                />
              </div>
              <div>
                <Label htmlFor="customerVatNumber">VAT номер</Label>
                <Input
                  id="customerVatNumber"
                  value={formData.customerVatNumber}
                  onChange={(e) => handleInputChange('customerVatNumber', e.target.value)}
                  placeholder="BG123456789"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Details */}
        <Card>
          <CardHeader>
            <CardTitle>Детайли за фактурата</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="paymentTerms">Условия за плащане</Label>
              <Select value={formData.paymentTerms} onValueChange={(value) => handleInputChange('paymentTerms', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_TERMS.map(term => (
                    <SelectItem key={term.value} value={term.value}>
                      {term.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Бележки</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Допълнителни бележки..."
                rows={3}
              />
            </div>

            {/* Totals Preview */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Общо</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Междинна сума:</span>
                  <span>{InvoiceService.formatCurrency(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ДДС (20%):</span>
                  <span>{InvoiceService.formatCurrency(totals.vatAmount)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>ОБЩО:</span>
                  <span>{InvoiceService.formatCurrency(totals.total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Артикули</CardTitle>
            <Button onClick={addItem} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Добави артикул
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">Артикул {index + 1}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`item-name-${index}`}>Наименование *</Label>
                    <Input
                      id={`item-name-${index}`}
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      placeholder="Наименование на артикула"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`item-quantity-${index}`}>Количество *</Label>
                    <Input
                      id={`item-quantity-${index}`}
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                      placeholder="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`item-unit-${index}`}>Мерна единица</Label>
                    <Input
                      id={`item-unit-${index}`}
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                      placeholder="бр"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`item-price-${index}`}>Единична цена *</Label>
                    <Input
                      id={`item-price-${index}`}
                      type="number"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor={`item-description-${index}`}>Описание</Label>
                  <Textarea
                    id={`item-description-${index}`}
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Описание на артикула..."
                    rows={2}
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Общо: {InvoiceService.formatCurrency(item.totalPrice)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ДДС: {InvoiceService.formatCurrency(item.vatAmount)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {formData.items.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Няма артикули</h3>
                <p className="text-muted-foreground mb-4">
                  Добавете артикули за да създадете фактурата
                </p>
                <Button onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добави първия артикул
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel}>
          Отказ
        </Button>
        <Button onClick={handleSave} disabled={isCalculating}>
          <Save className="h-4 w-4 mr-2" />
          {isCalculating ? 'Запазване...' : 'Запази фактурата'}
        </Button>
      </div>
    </div>
  );
}
