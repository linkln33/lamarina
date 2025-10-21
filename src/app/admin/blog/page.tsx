"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Eye, Calendar, User, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCrudOperations } from '@/hooks/admin/useCrudOperations';
import { useSearchAndFilter } from '@/hooks/admin/useSearchAndFilter';
import type { BlogPost } from '@/lib/cms';

export default function BlogPage() {
  const { items: blogPosts, searchTerm, setSearchTerm, createItem, deleteItem } = useCrudOperations<BlogPost>({
    entityType: 'blogPosts'
  });

  const { filteredItems: filteredPosts } = useSearchAndFilter({
    items: blogPosts,
    searchFields: ['title', 'content', 'tags']
  });

  const handleDeletePost = (id: string) => {
    deleteItem(id);
  };

  const handleCreatePost = () => {
    createItem({
      title: 'Нова статия',
      slug: 'nova-statiya',
      content: 'Съдържание на статията...',
      excerpt: 'Кратко описание...',
      author: 'Администратор',
      authorId: '1',
      category: 'Новини',
      tags: [],
      status: 'draft'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Блог</h1>
          <p className="text-muted-foreground">Управление на статии и новини</p>
        </div>
        <Button onClick={handleCreatePost}>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            {filteredPosts.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Няма статии</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Няма намерени статии с този търсен термин' : 'Създайте първата си статия'}
                </p>
                <Button onClick={handleCreatePost}>
                  <Plus className="h-4 w-4 mr-2" />
                  Създай статия
                </Button>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{post.title}</h3>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status === 'published' ? 'Публикувана' : 
                         post.status === 'draft' ? 'Чернова' : 'Архивирана'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>Автор</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views} гледания</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.createdAt).toLocaleDateString('bg-BG')}</span>
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
                      onClick={() => handleDeletePost(post.id)}
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
