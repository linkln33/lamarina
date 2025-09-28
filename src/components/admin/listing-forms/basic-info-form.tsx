"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Listing } from '@/types/listing';

interface BasicInfoFormProps {
  formData: Listing;
  onUpdate: (updates: Partial<Listing>) => void;
  categories: string[];
}

export function BasicInfoForm({ formData, onUpdate, categories }: BasicInfoFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Основна информация</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Заглавие *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder="Въведете заглавие на обявата"
            />
          </div>
          <div>
            <Label htmlFor="category">Категория *</Label>
            <Select value={formData.category} onValueChange={(value) => onUpdate({ category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Изберете категория" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="shortDescription">Кратко описание</Label>
          <Textarea
            id="shortDescription"
            value={formData.shortDescription}
            onChange={(e) => onUpdate({ shortDescription: e.target.value })}
            placeholder="Кратко описание за прегледа"
            rows={2}
          />
        </div>
        
        <div>
          <Label htmlFor="description">Описание *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Подробно описание на продукта/услугата"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="tags">Тагове (разделени със запетая)</Label>
          <Input
            id="tags"
            value={formData.tags.join(', ')}
            onChange={(e) => onUpdate({ 
              tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
            })}
            placeholder="метал, огъване, рязане"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="status">Статус</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: 'draft' | 'published' | 'archived') => onUpdate({ status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Чернова</SelectItem>
                <SelectItem value="published">Публикувана</SelectItem>
                <SelectItem value="archived">Архивирана</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => onUpdate({ isFeatured: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="isFeatured">Избрана обява</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


