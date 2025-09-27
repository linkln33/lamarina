"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Eye, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function PagesPage() {
  const pages = [
    {
      id: 1,
      title: "Начало",
      slug: "/",
      status: "Публикувана",
      lastModified: "2024-01-15",
      views: 1234
    },
    {
      id: 2,
      title: "За нас",
      slug: "/about",
      status: "Публикувана",
      lastModified: "2024-01-12",
      views: 567
    },
    {
      id: 3,
      title: "Услуги",
      slug: "/services",
      status: "Чернова",
      lastModified: "2024-01-10",
      views: 0
    },
    {
      id: 4,
      title: "Контакти",
      slug: "/contact",
      status: "Публикувана",
      lastModified: "2024-01-08",
      views: 234
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Страници</h1>
          <p className="text-muted-foreground">Управление на страници на сайта</p>
        </div>
        <Button>
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
            {pages.map((page) => (
              <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Globe className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold">{page.title}</h3>
                      <Badge variant={page.status === 'Публикувана' ? 'default' : 'secondary'}>
                        {page.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{page.slug}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{page.views} гледания</span>
                      <span>•</span>
                      <span>Последна промяна: {page.lastModified}</span>
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
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
