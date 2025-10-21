"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Eye, ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { DatabaseService } from '@/lib/database-service';
import type { PortfolioItem } from '@/lib/cms';

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPortfolioItems(DatabaseService.getPortfolioItems());
  }, []);

  const filteredItems = portfolioItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteItem = (id: string) => {
    if (confirm('Сигурни ли сте, че искате да изтриете този проект?')) {
      DatabaseService.deletePortfolioItem(id);
      setPortfolioItems(DatabaseService.getPortfolioItems());
      toast.success('Проектът беше изтрит успешно');
    }
  };

  const handleCreateItem = () => {
    DatabaseService.createPortfolioItem({
      title: 'Нов проект',
      description: 'Описание на проекта...',
      image: '',
      category: 'Индустриални',
      count: '1',
      order: portfolioItems.length
    });
    setPortfolioItems(DatabaseService.getPortfolioItems());
    toast.success('Проектът беше създаден успешно');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Портфолио</h1>
          <p className="text-muted-foreground">Управление на проекти и галерии</p>
        </div>
        <Button onClick={handleCreateItem}>
          <Plus className="mr-2 h-4 w-4" />
          Нов проект
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Търсене</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Търси проекти..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Няма проекти</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Няма намерени проекти с този търсен термин' : 'Създайте първия си проект'}
            </p>
            <Button onClick={handleCreateItem}>
              <Plus className="h-4 w-4 mr-2" />
              Създай проект
            </Button>
          </div>
        ) : (
          filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">{item.count} проекта</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <Badge variant="secondary">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.category}</span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
