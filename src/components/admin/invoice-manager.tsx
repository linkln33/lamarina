"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Trash2, 
  Eye, 
  Download, 
  Send, 
  FileText,
  Calendar,
  Euro,
  User,
  Building
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Invoice, InvoiceService, PAYMENT_TERMS } from '@/lib/invoice';
import { PDFInvoiceGeneratorHTML } from '@/lib/pdf-invoice-generator-html';
import { Order } from '@/lib/ecommerce';

interface InvoiceManagerProps {
  invoices?: Invoice[];
  orders?: Order[];
  onInvoiceCreated?: (invoice: Invoice) => void;
}

export function InvoiceManager({ invoices: propInvoices = [], orders = [], onInvoiceCreated }: InvoiceManagerProps) {
  const [invoices, setInvoices] = useState<Invoice[]>(propInvoices);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(propInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  // const [isCreating, setIsCreating] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isViewing, setIsViewing] = useState(false);

  // Update local state when propInvoices changes
  useEffect(() => {
    setInvoices(propInvoices);
    setFilteredInvoices(propInvoices);
  }, [propInvoices]);

  // Filter invoices based on search and status
  useEffect(() => {
    let filtered = invoices;

    if (searchTerm) {
      filtered = filtered.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === statusFilter);
    }

    setFilteredInvoices(filtered);
  }, [invoices, searchTerm, statusFilter]);


  // const handleCreateInvoice = async (orderId: string) => {
  //   try {
  //     setIsCreating(true);
  //     
  //     // Find the order
  //     const order = orders.find(o => o.id === orderId);
  //     if (!order) {
  //       toast.error('Поръчката не е намерена');
  //       return;
  //     }

  //     // Create invoice from order
  //     const company = InvoiceService.getDefaultCompany();
  //     const invoice = InvoiceService.createInvoiceFromOrder(order, company);
  //     
  //     // Add to invoices list
  //     setInvoices(prev => [invoice, ...prev]);
  //     
  //     toast.success('Фактурата е създадена успешно');
  //     onInvoiceCreated?.(invoice);
  //     
  //   } catch (error) {
  //     console.error('Error creating invoice:', error);
  //     toast.error('Грешка при създаване на фактурата');
  //   } finally {
  //     setIsCreating(false);
  //   }
  // };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsViewing(true);
  };

  const handleDownloadInvoice = async (invoice: Invoice) => {
    try {
      const generator = new PDFInvoiceGeneratorHTML(invoice);
      await generator.downloadPDF(`invoice-${invoice.invoiceNumber}.pdf`);
      toast.success('Фактурата е изтеглена');
    } catch (error) {
      console.error('Error downloading invoice:', error);
      toast.error('Грешка при изтегляне на фактурата');
    }
  };

  const handleSendInvoice = async (invoice: Invoice) => {
    try {
      // Update invoice status
      setInvoices(prev => prev.map(inv => 
        inv.id === invoice.id 
          ? { ...inv, status: 'sent' as const, updatedAt: new Date().toISOString() }
          : inv
      ));
      
      toast.success('Фактурата е изпратена');
    } catch (error) {
      console.error('Error sending invoice:', error);
      toast.error('Грешка при изпращане на фактурата');
    }
  };

  const handleDeleteInvoice = async (invoiceId: string) => {
    if (!confirm('Сигурни ли сте, че искате да изтриете тази фактура?')) {
      return;
    }

    try {
      setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
      toast.success('Фактурата е изтрита');
    } catch (error) {
      console.error('Error deleting invoice:', error);
      toast.error('Грешка при изтриване на фактурата');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Чернова', variant: 'secondary' as const },
      sent: { label: 'Изпратена', variant: 'default' as const },
      paid: { label: 'Платена', variant: 'default' as const },
      overdue: { label: 'Просрочена', variant: 'destructive' as const },
      cancelled: { label: 'Отказана', variant: 'outline' as const }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Управление на фактури</h1>
          <p className="text-muted-foreground">
            Създавайте, управлявайте и изпращайте фактури
          </p>
        </div>
        <Button disabled>
          <Plus className="h-4 w-4 mr-2" />
          Нова фактура
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Търсене</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Търсене по номер, клиент или поръчка..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Label htmlFor="status">Статус</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Всички статуси" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всички статуси</SelectItem>
                  <SelectItem value="draft">Чернова</SelectItem>
                  <SelectItem value="sent">Изпратена</SelectItem>
                  <SelectItem value="paid">Платена</SelectItem>
                  <SelectItem value="overdue">Просрочена</SelectItem>
                  <SelectItem value="cancelled">Отказана</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvoices.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Няма фактури</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Няма намерени фактури с този търсен термин' : 'Създайте първата си фактура'}
            </p>
            <Button disabled>
              <Plus className="h-4 w-4 mr-2" />
              Създай фактура
            </Button>
          </div>
        ) : (
          filteredInvoices.map((invoice) => (
            <Card key={invoice.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{invoice.invoiceNumber}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Поръчка: {invoice.orderNumber}
                    </p>
                  </div>
                  {getStatusBadge(invoice.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Customer Info */}
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{invoice.customer.name}</span>
                </div>
                
                {invoice.customer.company && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{invoice.customer.company}</span>
                  </div>
                )}

                {/* Dates */}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Издадена: {InvoiceService.formatDate(invoice.issueDate)}
                  </span>
                </div>

                {/* Total */}
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {InvoiceService.formatCurrency(invoice.total)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewInvoice(invoice)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadInvoice(invoice)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  {invoice.status === 'draft' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendInvoice(invoice)}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteInvoice(invoice.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Invoice Preview Modal */}
      {isViewing && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-6xl max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Преглед на фактура</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleDownloadInvoice(selectedInvoice)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Изтегли PDF
                </Button>
                <Button variant="outline" onClick={() => setIsViewing(false)}>
                  Затвори
                </Button>
              </div>
            </div>
            
            {/* Professional Invoice Layout */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-lg">
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border-2 border-blue-200">
                      <img 
                        src="/logo.png" 
                        alt="LAMARINA BG Logo" 
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          // Fallback to text logo if image fails to load
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm hidden">
                        LM
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-blue-600">{selectedInvoice.company.name}</h1>
                      <p className="text-sm text-gray-600">Металообработка и покривни системи</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Адрес:</strong> {selectedInvoice.company.address.street}</p>
                    <p><strong>Град:</strong> {selectedInvoice.company.address.city}, {selectedInvoice.company.address.postalCode}</p>
                    <p><strong>ЕИК:</strong> {selectedInvoice.company.taxNumber}</p>
                    <p><strong>ДДС номер:</strong> {selectedInvoice.company.vatNumber}</p>
                    <p><strong>Телефон:</strong> {selectedInvoice.company.phone}</p>
                    <p><strong>Имейл:</strong> {selectedInvoice.company.email}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <h2 className="text-3xl font-bold text-blue-600 mb-2">ФАКТУРА</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Номер на фактурата</p>
                    <p className="text-xl font-bold">{selectedInvoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-600 mt-2">Дата на издаване</p>
                    <p className="font-semibold">{InvoiceService.formatDate(selectedInvoice.issueDate)}</p>
                    <p className="text-sm text-gray-600 mt-2">Падеж</p>
                    <p className="font-semibold">{InvoiceService.formatDate(selectedInvoice.dueDate)}</p>
                    {selectedInvoice.supplyDate && (
                      <>
                        <p className="text-sm text-gray-600 mt-2">Дата на доставка</p>
                        <p className="font-semibold">{InvoiceService.formatDate(selectedInvoice.supplyDate)}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-3 text-blue-600">Данни за доставчика</h3>
                  <div className="text-sm space-y-1">
                    <p><strong>{selectedInvoice.company.name}</strong></p>
                    <p>{selectedInvoice.company.address.street}</p>
                    <p>{selectedInvoice.company.address.city}, {selectedInvoice.company.address.postalCode}</p>
                    <p>{selectedInvoice.company.address.country}</p>
                    <p>ЕИК: {selectedInvoice.company.taxNumber}</p>
                    <p>ДДС номер: {selectedInvoice.company.vatNumber}</p>
                    <p>тел: {selectedInvoice.company.phone}</p>
                    <p>email: {selectedInvoice.company.email}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-3 text-blue-600">Данни за получателя</h3>
                  <div className="text-sm space-y-1">
                    <p><strong>{selectedInvoice.customer.name}</strong></p>
                    {selectedInvoice.customer.company && <p>{selectedInvoice.customer.company}</p>}
                    <p>{selectedInvoice.customer.address.street}</p>
                    <p>{selectedInvoice.customer.address.city}, {selectedInvoice.customer.address.postalCode}</p>
                    <p>{selectedInvoice.customer.address.country}</p>
                    {selectedInvoice.customer.taxNumber && <p>ЕИК: {selectedInvoice.customer.taxNumber}</p>}
                    {selectedInvoice.customer.vatNumber && <p>ДДС номер: {selectedInvoice.customer.vatNumber}</p>}
                    {selectedInvoice.customer.phone && <p>тел: {selectedInvoice.customer.phone}</p>}
                    {selectedInvoice.customer.email && <p>email: {selectedInvoice.customer.email}</p>}
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Поръчка №</p>
                    <p className="font-semibold">{selectedInvoice.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Статус</p>
                    <p className="font-semibold">{getStatusBadge(selectedInvoice.status)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Условия за плащане</p>
                    <p className="font-semibold">{PAYMENT_TERMS.find(t => t.value === selectedInvoice.paymentTerms)?.label || '30 дни'}</p>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4 text-blue-600">Артикули</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left">№</th>
                        <th className="px-4 py-3 text-left">Описание</th>
                        <th className="px-4 py-3 text-center">Кол.</th>
                        <th className="px-4 py-3 text-center">М.ед.</th>
                        <th className="px-4 py-3 text-right">Ед.цена (BGN)</th>
                        <th className="px-4 py-3 text-right">Ед.цена (EUR)</th>
                        <th className="px-4 py-3 text-right">ДДС %</th>
                        <th className="px-4 py-3 text-right">Общо (BGN)</th>
                        <th className="px-4 py-3 text-right">Общо (EUR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-3 text-center">{index + 1}</td>
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">{item.quantity}</td>
                          <td className="px-4 py-3 text-center">{item.unit}</td>
                          <td className="px-4 py-3 text-right">{InvoiceService.formatCurrency(item.unitPrice)}</td>
                          <td className="px-4 py-3 text-right">{InvoiceService.formatCurrencyEUR(item.unitPriceEUR)}</td>
                          <td className="px-4 py-3 text-right">{item.vatRate}%</td>
                          <td className="px-4 py-3 text-right font-semibold">{InvoiceService.formatCurrency(item.totalPrice)}</td>
                          <td className="px-4 py-3 text-right font-semibold">{InvoiceService.formatCurrencyEUR(item.totalPriceEUR)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals Section */}
              <div className="flex justify-end mb-8">
                <div className="w-80">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Междинна сума (BGN):</span>
                        <span className="font-semibold">{InvoiceService.formatCurrency(selectedInvoice.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Междинна сума (EUR):</span>
                        <span className="font-semibold">{InvoiceService.formatCurrencyEUR(selectedInvoice.subtotalEUR)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ДДС (20%) BGN:</span>
                        <span className="font-semibold">{InvoiceService.formatCurrency(selectedInvoice.vatAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ДДС (20%) EUR:</span>
                        <span className="font-semibold">{InvoiceService.formatCurrencyEUR(selectedInvoice.vatAmountEUR)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between text-lg font-bold text-blue-600">
                          <span>ОБЩО (BGN):</span>
                          <span>{InvoiceService.formatCurrency(selectedInvoice.total)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-blue-600">
                          <span>ОБЩО (EUR):</span>
                          <span>{InvoiceService.formatCurrencyEUR(selectedInvoice.totalEUR)}</span>
                        </div>
                        <div className="text-sm text-gray-600 text-right">
                          Курс: 1 EUR = {selectedInvoice.exchangeRate} BGN
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes and Footer */}
              {selectedInvoice.notes && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-2 text-blue-600">Бележки</h3>
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-sm">{selectedInvoice.notes}</p>
                  </div>
                </div>
              )}

              {/* Footer Information */}
              <div className="border-t pt-6 text-xs text-gray-600">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p><strong>Банкови данни:</strong></p>
                    <p>{selectedInvoice.company.bankDetails?.bank}</p>
                    <p>IBAN: {selectedInvoice.company.bankDetails?.iban}</p>
                    <p>SWIFT: {selectedInvoice.company.bankDetails?.swift}</p>
                  </div>
                  <div>
                    <p><strong>Условия за плащане:</strong></p>
                    <p>Плащането се извършва в срок от {PAYMENT_TERMS.find(t => t.value === selectedInvoice.paymentTerms)?.label || '30 дни'} от датата на фактурата.</p>
                    <p>При забавяне на плащането се начислява лихва съгласно действащото законодателство.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
