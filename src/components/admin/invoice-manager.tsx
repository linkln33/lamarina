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
import { Invoice, InvoiceService } from '@/lib/invoice';
import { PDFInvoiceGenerator } from '@/lib/pdf-invoice-generator';
import { Order } from '@/lib/ecommerce';

interface InvoiceManagerProps {
  orders?: Order[];
  onInvoiceCreated?: (invoice: Invoice) => void;
}

export function InvoiceManager({ orders = [], onInvoiceCreated }: InvoiceManagerProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  // const [isCreating, setIsCreating] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isViewing, setIsViewing] = useState(false);

  // Load invoices on component mount
  useEffect(() => {
    loadInvoices();
  }, []);

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

  const loadInvoices = async () => {
    try {
      // In a real app, this would fetch from the database
      const mockInvoices: Invoice[] = [
        {
          id: '1',
          invoiceNumber: 'INV20241201001',
          orderNumber: 'ORD001',
          issueDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'sent',
          company: InvoiceService.getDefaultCompany(),
          customer: {
            name: 'Иван Петров',
            company: 'Петров и Син ООД',
            address: {
              street: 'ул. Витоша 15',
              city: 'София',
              postalCode: '1000',
              country: 'България'
            },
            taxNumber: '987654321',
            vatNumber: 'BG987654321',
            phone: '+359 888 999 888',
            email: 'ivan@petrov.bg'
          },
          items: [
            {
              id: '1',
              name: 'Ламарина за покрив',
              description: 'Поцинкована ламарина 0.5мм',
              quantity: 100,
              unit: 'кв.м',
              unitPrice: 25.50,
              totalPrice: 2550.00,
              vatRate: 20,
              vatAmount: 510.00
            }
          ],
          subtotal: 2550.00,
          vatAmount: 510.00,
          total: 3060.00,
          currency: 'BGN',
          paymentTerms: '30_days',
          notes: 'Доставка до 7 дни',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'admin'
        }
      ];
      
      setInvoices(mockInvoices);
    } catch (error) {
      console.error('Error loading invoices:', error);
      toast.error('Грешка при зареждане на фактурите');
    }
  };

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
      const { InvoiceTemplateService } = await import('@/lib/invoice');
      const template = InvoiceTemplateService.getDefaultTemplate();
      const generator = new PDFInvoiceGenerator(invoice, template);
      
      generator.downloadPDF();
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
      paid: { label: 'Платена', variant: 'success' as const },
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
        <Button onClick={() => setIsCreating(true)}>
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
            <Button onClick={() => setIsCreating(true)}>
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
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Преглед на фактура</h2>
              <Button variant="outline" onClick={() => setIsViewing(false)}>
                Затвори
              </Button>
            </div>
            
            {/* Invoice Preview Content */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Данни за доставчика</h3>
                  <p className="text-sm">{selectedInvoice.company.name}</p>
                  <p className="text-sm">{selectedInvoice.company.address.street}</p>
                  <p className="text-sm">{selectedInvoice.company.address.city}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Данни за получателя</h3>
                  <p className="text-sm">{selectedInvoice.customer.name}</p>
                  <p className="text-sm">{selectedInvoice.customer.address.street}</p>
                  <p className="text-sm">{selectedInvoice.customer.address.city}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Артикули</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Описание</th>
                        <th className="px-4 py-2 text-left">Кол.</th>
                        <th className="px-4 py-2 text-left">Ед.цена</th>
                        <th className="px-4 py-2 text-left">Общо</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2">{item.quantity}</td>
                          <td className="px-4 py-2">{InvoiceService.formatCurrency(item.unitPrice)}</td>
                          <td className="px-4 py-2">{InvoiceService.formatCurrency(item.totalPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-semibold">
                  Общо: {InvoiceService.formatCurrency(selectedInvoice.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
