"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Listing } from '@/types/listing';

interface SEOFormProps {
  formData: Listing;
  onUpdate: (updates: Partial<Listing>) => void;
}

export function SEOForm({ formData, onUpdate }: SEOFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO настройки</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="metaTitle">Meta заглавие</Label>
          <Input
            id="metaTitle"
            value={formData.seo.metaTitle}
            onChange={(e) => onUpdate({
              seo: { ...formData.seo, metaTitle: e.target.value }
            })}
            placeholder="SEO заглавие"
          />
        </div>
        <div>
          <Label htmlFor="metaDescription">Meta описание</Label>
          <Textarea
            id="metaDescription"
            value={formData.seo.metaDescription}
            onChange={(e) => onUpdate({
              seo: { ...formData.seo, metaDescription: e.target.value }
            })}
            placeholder="SEO описание"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="slug">URL slug</Label>
          <Input
            id="slug"
            value={formData.seo.slug}
            onChange={(e) => onUpdate({
              seo: { ...formData.seo, slug: e.target.value }
            })}
            placeholder="url-slug"
          />
        </div>
        <div>
          <Label htmlFor="keywords">Ключови думи (разделени със запетая)</Label>
          <Input
            id="keywords"
            value={formData.seo.keywords}
            onChange={(e) => onUpdate({
              seo: { 
                ...formData.seo, 
                keywords: e.target.value
              }
            })}
            placeholder="метал, покриви, сандвич панели"
          />
        </div>
      </CardContent>
    </Card>
  );
}


