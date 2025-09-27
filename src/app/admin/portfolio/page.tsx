"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Eye, Image } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "Индустриален проект",
      description: "Метална конструкция за производствена сграда",
      category: "Индустриални",
      status: "Завършен",
      images: 5,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Жилищен проект",
      description: "Персонализирана метална ограда",
      category: "Жилищни",
      status: "В процес",
      images: 3,
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      title: "Комерсиален проект",
      description: "Покривна конструкция за търговски център",
      category: "Комерсиални",
      status: "Завършен",
      images: 8,
      createdAt: "2024-01-05"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Портфолио</h1>
          <p className="text-muted-foreground">Управление на проекти и галерии</p>
        </div>
        <Button>
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
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center">
                <Image className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">{project.images} снимки</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{project.title}</h3>
                <Badge variant={project.status === 'Завършен' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{project.category}</span>
                <div className="flex items-center gap-1">
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
