"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2 } from 'lucide-react';
import { BlogPost } from '@/lib/cms';

interface BlogEditorProps {
  blog: BlogPost[];
  onUpdate: (blog: BlogPost[]) => void;
}

export function BlogEditor({ blog, onUpdate }: BlogEditorProps) {
  const addPost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: 'Нова статия',
      excerpt: 'Кратко описание на статията',
      content: 'Съдържание на статията',
      author: 'Администратор',
      authorId: '1',
      category: 'Новини',
      tags: [],
      slug: 'nova-statia',
      status: 'draft',
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    onUpdate([...blog, newPost]);
  };

  const removePost = (id: string) => {
    onUpdate(blog.filter(post => post.id !== id));
  };

  const updatePost = (id: string, field: keyof BlogPost, value: string | string[]) => {
    onUpdate(blog.map(post => 
      post.id === id ? { ...post, [field]: value } : post
    ));
  };

  const addTag = (postId: string) => {
    const post = blog.find(p => p.id === postId);
    if (post) {
      updatePost(postId, 'tags', [...post.tags, 'нов таг']);
    }
  };

  const removeTag = (postId: string, tagIndex: number) => {
    const post = blog.find(p => p.id === postId);
    if (post) {
      const newTags = post.tags.filter((_, index) => index !== tagIndex);
      updatePost(postId, 'tags', newTags);
    }
  };

  const updateTag = (postId: string, tagIndex: number, value: string) => {
    const post = blog.find(p => p.id === postId);
    if (post) {
      const newTags = [...post.tags];
      newTags[tagIndex] = value;
      updatePost(postId, 'tags', newTags);
    }
  };

  const categories = ['Новини', 'Услуги', 'Проекти', 'Технологии', 'Общо'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Блог статии</h3>
        <Button onClick={addPost}>
          <Plus className="h-4 w-4 mr-2" />
          Добави статия
        </Button>
      </div>

      <div className="space-y-6">
        {blog.map((post, index) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">#{index + 1}</Badge>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removePost(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`blog-title-${post.id}`}>Заглавие</Label>
                  <Input
                    id={`blog-title-${post.id}`}
                    value={post.title}
                    onChange={(e) => updatePost(post.id, 'title', e.target.value)}
                    placeholder="Заглавие на статията"
                  />
                </div>
                <div>
                  <Label htmlFor={`blog-category-${post.id}`}>Категория</Label>
                  <select
                    id={`blog-category-${post.id}`}
                    value={post.category}
                    onChange={(e) => updatePost(post.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`blog-author-${post.id}`}>Автор</Label>
                  <Input
                    id={`blog-author-${post.id}`}
                    value={post.author}
                    onChange={(e) => updatePost(post.id, 'author', e.target.value)}
                    placeholder="Име на автора"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`blog-excerpt-${post.id}`}>Кратко описание</Label>
                <Textarea
                  id={`blog-excerpt-${post.id}`}
                  value={post.excerpt}
                  onChange={(e) => updatePost(post.id, 'excerpt', e.target.value)}
                  placeholder="Кратко описание на статията"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor={`blog-content-${post.id}`}>Съдържание</Label>
                <Textarea
                  id={`blog-content-${post.id}`}
                  value={post.content}
                  onChange={(e) => updatePost(post.id, 'content', e.target.value)}
                  placeholder="Пълно съдържание на статията"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`blog-slug-${post.id}`}>URL slug</Label>
                  <Input
                    id={`blog-slug-${post.id}`}
                    value={post.slug}
                    onChange={(e) => updatePost(post.id, 'slug', e.target.value)}
                    placeholder="url-slug"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Тагове</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addTag(post.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добави таг
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <div key={tagIndex} className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                      <Input
                        value={tag}
                        onChange={(e) => updateTag(post.id, tagIndex, e.target.value)}
                        className="h-6 text-sm border-0 bg-transparent p-0"
                        placeholder="Таг"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTag(post.id, tagIndex)}
                        className="h-4 w-4 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


