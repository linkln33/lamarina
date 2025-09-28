"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Listing } from '@/types/listing';

interface ContactFormProps {
  formData: Listing;
  onUpdate: (updates: Partial<Listing>) => void;
}

export function ContactForm({ formData, onUpdate }: ContactFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Контактна информация</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactName">Име на контакт</Label>
            <Input
              id="contactName"
              value={formData.contact.name}
              onChange={(e) => onUpdate({
                contact: { ...formData.contact, name: e.target.value }
              })}
              placeholder="Име на отговорно лице"
            />
          </div>
          <div>
            <Label htmlFor="contactPhone">Телефон</Label>
            <Input
              id="contactPhone"
              value={formData.contact.phone}
              onChange={(e) => onUpdate({
                contact: { ...formData.contact, phone: e.target.value }
              })}
              placeholder="+359 888 123 456"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="contactEmail">Имейл</Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.contact.email}
            onChange={(e) => onUpdate({
              contact: { ...formData.contact, email: e.target.value }
            })}
            placeholder="contact@example.com"
          />
        </div>
        <div>
          <Label htmlFor="contactWebsite">Уебсайт</Label>
          <Input
            id="contactWebsite"
            value={formData.contact.website}
            onChange={(e) => onUpdate({
              contact: { ...formData.contact, website: e.target.value }
            })}
            placeholder="https://example.com"
          />
        </div>
        <div>
          <Label htmlFor="contactAddress">Адрес</Label>
          <Textarea
            id="contactAddress"
            value={formData.contact.address}
            onChange={(e) => onUpdate({
              contact: { ...formData.contact, address: e.target.value }
            })}
            placeholder="Пълен адрес"
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
}


