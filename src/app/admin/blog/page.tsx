"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Предимства на лазерното рязане",
      excerpt: "Защо лазерното рязане е най-добрият избор за вашия проект...",
      status: "Публикуван",
      author: "Иван Петров",
      createdAt: "2024-01-15",
      views: 234
    },
    {
      id: 2,
      title: "Избор на правилния метал",
      excerpt: "Ръководство за избор на подходящ материал за вашия проект...",
      status: "Чернова",
      author: "Мария Георгиева",
      createdAt: "2024-01-12",
      views: 0
    },
    {
      id: 3,
      title: "Поддръжка на метални конструкции",
      excerpt: "Как да поддържате вашите метални изделия в отлично състояние...",
      status: "Публикуван",
      author: "Петър Стоянов",
      createdAt: "2024-01-10",
      views: 156
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Блог</h1>
          <p className="text-muted-foreground">Управление на статии и новини</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Нова статия
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
              placeholder="Търси статии..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Всички статии</CardTitle>
          <CardDescription>
            Управление на блог статии и новини
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{post.title}</h3>
                    <Badge variant={post.status === 'Публикуван' ? 'default' : 'secondary'}>
                      {post.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Автор: {post.author}</span>
                    <span>•</span>
                    <span>{post.views} гледания</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.createdAt}</span>
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
