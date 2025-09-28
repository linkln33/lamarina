"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Eye, Globe, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { DatabaseService } from '@/lib/database-service';
import type { Page as PageType } from '@/lib/cms';

export default function PagesPage() {
  const [pages, setPages] = useState<PageType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPages(DatabaseService.getPages());
  }, []);

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeletePage = (id: string) => {
    if (confirm('Сигурни ли сте, че искате да изтриете тази страница?')) {
      DatabaseService.deletePage(id);
      setPages(DatabaseService.getPages());
      toast.success('Страницата беше изтрита успешно');
    }
  };

  const handleCreatePage = () => {
    const newPage = DatabaseService.createPage({
      title: 'Нова страница',
      slug: 'nova-stranitsa',
      content: 'Съдържание на страницата...',
      status: 'draft'
    });
    setPages(DatabaseService.getPages());
    toast.success('Страницата беше създадена успешно');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Страници</h1>
          <p className="text-muted-foreground">Управление на страници на сайта</p>
        </div>
        <Button onClick={handleCreatePage}>
          <Plus className="mr-2 h-4 w-4" />
          Нова страница
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
              placeholder="Търси страници..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Всички страници</CardTitle>
          <CardDescription>
            Управление на страници на сайта
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPages.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Няма страници</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Няма намерени страници с този търсен термин' : 'Създайте първата страница'}
                </p>
                <Button onClick={handleCreatePage}>
                  <Plus className="h-4 w-4 mr-2" />
                  Създай страница
                </Button>
              </div>
            ) : (
              filteredPages.map((page) => (
                <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <Globe className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{page.title}</h3>
                        <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                          {page.status === 'published' ? 'Публикувана' : page.status === 'draft' ? 'Чернова' : 'Архивирана'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">/{page.slug}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>Статус: {page.status}</span>
                        <span>•</span>
                        <span>Създадена: {new Date(page.createdAt).toLocaleDateString('bg-BG')}</span>
                        <span>•</span>
                        <span>Обновена: {new Date(page.updatedAt).toLocaleDateString('bg-BG')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
                      onClick={() => handleDeletePage(page.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
