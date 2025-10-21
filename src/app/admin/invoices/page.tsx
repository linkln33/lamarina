"use client";

import { useState } from 'react';
import { InvoiceManager } from '@/components/admin/invoice-manager';
import { InvoiceForm } from '@/components/admin/invoice-form';
import { Invoice } from '@/lib/invoice';
import { Order } from '@/lib/ecommerce';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleInvoiceCreated = (invoice: Invoice) => {
    setInvoices(prev => [invoice, ...prev]);
    setIsCreating(false);
    setSelectedOrder(null);
  };

  // const handleCreateFromOrder = (order: Order) => {
  //   setSelectedOrder(order);
  //   setIsCreating(true);
  // };

  const handleCancel = () => {
    setIsCreating(false);
    setSelectedOrder(null);
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
        orders={[]} // In a real app, this would be fetched from the database
        onInvoiceCreated={handleInvoiceCreated}
      />
    </div>
  );
}
