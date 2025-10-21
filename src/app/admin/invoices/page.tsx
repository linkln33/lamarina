"use client";

import { useState, useEffect } from 'react';
import { InvoiceManager } from '@/components/admin/invoice-manager';
import { InvoiceForm } from '@/components/admin/invoice-form';
import { Invoice, InvoiceService } from '@/lib/invoice';
import { Order } from '@/lib/ecommerce';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined);

  // Demo invoices following Bulgarian standards
  useEffect(() => {
    const demoInvoices: Invoice[] = [
      {
        id: 'demo-invoice-1',
        invoiceNumber: '20241201001',
        orderNumber: 'ORD-2024-001',
        issueDate: '2024-12-01T00:00:00.000Z',
        dueDate: '2024-12-31T00:00:00.000Z',
        supplyDate: '2024-12-15T00:00:00.000Z',
        status: 'sent',
        company: {
          name: 'LAMARINA BG ООД',
          address: {
            street: 'Стопански Двор № 2',
            city: 'С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово',
            postalCode: '4114',
            country: 'България'
          },
          taxNumber: '123456789',
          vatNumber: 'BG123456789',
          phone: '+359 888 123 456',
          email: 'info@lamarina.bg',
          website: 'https://lamarina.bg',
          bankDetails: {
            bank: 'УниКредит Булбанк АД',
            iban: 'BG18UNCR70001523123123',
            swift: 'UNCRBGSF'
          }
        },
        customer: {
          name: 'Иван Петров',
          company: 'Строителна фирма "Петров" ООД',
          address: {
            street: 'ул. Витоша 15',
            city: 'София',
            postalCode: '1000',
            country: 'България'
          },
          taxNumber: '987654321',
          vatNumber: 'BG987654321',
          phone: '+359 888 987 654',
          email: 'ivan.petrov@example.com'
        },
        items: [
          {
            id: 'item-1',
            name: 'Ламарина за покрив',
            description: 'Висококачествена ламарина за покривни системи',
            quantity: 100,
            unit: 'кв.м',
            unitPrice: 25.50,
            unitPriceEUR: 13.04,
            totalPrice: 2550.00,
            totalPriceEUR: 1304.00,
            vatRate: 20,
            vatAmount: 510.00,
            vatAmountEUR: 260.80
          },
          {
            id: 'item-2',
            name: 'Монтажни елементи',
            description: 'Комплект монтажни елементи за покривна система',
            quantity: 50,
            unit: 'бр',
            unitPrice: 12.00,
            unitPriceEUR: 6.14,
            totalPrice: 600.00,
            totalPriceEUR: 306.80,
            vatRate: 20,
            vatAmount: 120.00,
            vatAmountEUR: 61.36
          }
        ],
        subtotal: 3150.00,
        subtotalEUR: 1610.80,
        vatAmount: 630.00,
        vatAmountEUR: 322.16,
        total: 3780.00,
        totalEUR: 1933.00,
        currency: 'BGN',
        exchangeRate: 1.95583,
        paymentTerms: '30_days',
        notes: 'Доставката се извършва в срок от 14 дни от потвърждаването на поръчката.'
      },
      {
        id: 'demo-invoice-2',
        invoiceNumber: '20241201002',
        orderNumber: 'ORD-2024-002',
        issueDate: '2024-12-01T00:00:00.000Z',
        dueDate: '2024-12-15T00:00:00.000Z',
        status: 'paid',
        company: {
          name: 'LAMARINA BG ООД',
          address: {
            street: 'Стопански Двор № 2',
            city: 'С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово',
            postalCode: '4114',
            country: 'България'
          },
          taxNumber: '123456789',
          vatNumber: 'BG123456789',
          phone: '+359 888 123 456',
          email: 'info@lamarina.bg',
          website: 'https://lamarina.bg',
          bankDetails: {
            bank: 'УниКредит Булбанк АД',
            iban: 'BG18UNCR70001523123123',
            swift: 'UNCRBGSF'
          }
        },
        customer: {
          name: 'Мария Георгиева',
          address: {
            street: 'ул. Цариградско шосе 25',
            city: 'Варна',
            postalCode: '9000',
            country: 'България'
          },
          phone: '+359 888 555 777',
          email: 'maria.georgieva@example.com'
        },
        items: [
          {
            id: 'item-3',
            name: 'Металообработка',
            description: 'Огъване и рязане на метални листове',
            quantity: 200,
            unit: 'кв.м',
            unitPrice: 18.75,
            unitPriceEUR: 9.58,
            totalPrice: 3750.00,
            totalPriceEUR: 1916.00,
            vatRate: 20,
            vatAmount: 750.00,
            vatAmountEUR: 383.20
          }
        ],
        subtotal: 3750.00,
        subtotalEUR: 1916.00,
        vatAmount: 750.00,
        vatAmountEUR: 383.20,
        total: 4500.00,
        totalEUR: 2299.20,
        currency: 'BGN',
        exchangeRate: 1.95583,
        paymentTerms: '14_days',
        notes: 'Работата се извършва в съответствие с техническите изисквания на клиента.'
      }
    ];

    setInvoices(demoInvoices);
  }, []);

  const handleInvoiceCreated = (invoice: Invoice) => {
    setInvoices(prev => [invoice, ...prev]);
    setIsCreating(false);
    setSelectedOrder(undefined);
  };

  // const handleCreateFromOrder = (order: Order) => {
  //   setSelectedOrder(order);
  //   setIsCreating(true);
  // };

  const handleCancel = () => {
    setIsCreating(false);
    setSelectedOrder(undefined);
  };

  if (isCreating) {
    return (
      <div className="container mx-auto py-6">
        <InvoiceForm
          order={selectedOrder}
          onSave={handleInvoiceCreated}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <InvoiceManager
        invoices={invoices}
        orders={[]} // In a real app, this would be fetched from the database
        onInvoiceCreated={handleInvoiceCreated}
      />
    </div>
  );
}
