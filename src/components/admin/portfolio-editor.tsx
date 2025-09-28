"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2 } from 'lucide-react';
import { PortfolioItem } from '@/lib/cms';

interface PortfolioEditorProps {
  portfolio: PortfolioItem[];
  onUpdate: (portfolio: PortfolioItem[]) => void;
}

export function PortfolioEditor({ portfolio, onUpdate }: PortfolioEditorProps) {
  const addItem = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: 'Нов проект',
      description: 'Описание на проекта',
      image: '',
      category: 'Общо',
      count: '1',
      order: 0
    };
    onUpdate([...portfolio, newItem]);
  };

  const removeItem = (id: string) => {
    onUpdate(portfolio.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof PortfolioItem, value: string | string[]) => {
    onUpdate(portfolio.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };


  const categories = ['Общо', 'Покривни системи', 'Метални конструкции', 'Огъване', 'Заварка'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Портфолио</h3>
        <Button onClick={addItem}>
          <Plus className="h-4 w-4 mr-2" />
          Добави проект
        </Button>
      </div>

      <div className="space-y-6">
        {portfolio.map((item, index) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">#{index + 1}</Badge>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`portfolio-title-${item.id}`}>Заглавие</Label>
                  <Input
                    id={`portfolio-title-${item.id}`}
                    value={item.title}
                    onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                    placeholder="Заглавие на проекта"
                  />
                </div>
                <div>
                  <Label htmlFor={`portfolio-category-${item.id}`}>Категория</Label>
                  <select
                    id={`portfolio-category-${item.id}`}
                    value={item.category}
                    onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor={`portfolio-description-${item.id}`}>Описание</Label>
                <Textarea
                  id={`portfolio-description-${item.id}`}
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  placeholder="Описание на проекта"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`portfolio-image-${item.id}`}>URL на изображение</Label>
                  <Input
                    id={`portfolio-image-${item.id}`}
                    value={item.image}
                    onChange={(e) => updateItem(item.id, 'image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


