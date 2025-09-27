"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  Plus, 
  Trash2, 
  Eye,
  Home,
  Wrench,
  Image,
  FileText,
  Users
} from 'lucide-react';
import { CMS, HomepageContent, HeroSection, Service, PortfolioItem, BlogPost, ContactInfo } from '@/lib/cms';
import toast from 'react-hot-toast';

export default function HomepageEditor() {
  const [content, setContent] = useState<HomepageContent>(CMS.getHomepageContent());
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    setContent(CMS.getHomepageContent());
  }, []);

  const handleSave = () => {
    CMS.saveHomepageContent(content);
    toast.success('Съдържанието е запазено успешно!');
  };

  const updateHero = (updates: Partial<HeroSection>) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, ...updates }
    }));
  };

  const updateServices = (services: Service[]) => {
    setContent(prev => ({ ...prev, services }));
  };

  const updatePortfolio = (portfolio: PortfolioItem[]) => {
    setContent(prev => ({ ...prev, portfolio }));
  };

  const updateBlog = (blog: BlogPost[]) => {
    setContent(prev => ({ ...prev, blog }));
  };

  const updateContact = (contact: ContactInfo) => {
    setContent(prev => ({ ...prev, contact }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Редактор на началната страница</h1>
          <p className="text-muted-foreground">
            Управлявайте съдържанието на вашата начална страница
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open('/', '_blank')}>
            <Eye className="h-4 w-4 mr-2" />
            Преглед
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Запази промените
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-max">
            <TabsTrigger value="hero" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all">
              <Home className="h-4 w-4 mr-2" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="services" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all">
              <Wrench className="h-4 w-4 mr-2" />
              Услуги
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all">
              <Image className="h-4 w-4 mr-2" />
              Портфолио
            </TabsTrigger>
            <TabsTrigger value="blog" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all">
              <FileText className="h-4 w-4 mr-2" />
              Блог
            </TabsTrigger>
            <TabsTrigger value="contact" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all">
              <Users className="h-4 w-4 mr-2" />
              Контакти
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Hero Section Editor */}
        <TabsContent value="hero" className="space-y-4">
          <HeroEditor hero={content.hero} onUpdate={updateHero} />
        </TabsContent>

        {/* Services Editor */}
        <TabsContent value="services" className="space-y-4">
          <ServicesEditor services={content.services} onUpdate={updateServices} />
        </TabsContent>

        {/* Portfolio Editor */}
        <TabsContent value="portfolio" className="space-y-4">
          <PortfolioEditor portfolio={content.portfolio} onUpdate={updatePortfolio} />
        </TabsContent>

        {/* Blog Editor */}
        <TabsContent value="blog" className="space-y-4">
          <BlogEditor blog={content.blog} onUpdate={updateBlog} />
        </TabsContent>

        {/* Contact Editor */}
        <TabsContent value="contact" className="space-y-4">
          <ContactEditor contact={content.contact} onUpdate={updateContact} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Hero Section Editor Component
function HeroEditor({ hero, onUpdate }: { hero: HeroSection; onUpdate: (updates: Partial<HeroSection>) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero секция</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hero-title">Заглавие</Label>
            <Input
              id="hero-title"
              value={hero.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="hero-subtitle">Подзаглавие</Label>
            <Input
              id="hero-subtitle"
              value={hero.subtitle}
              onChange={(e) => onUpdate({ subtitle: e.target.value })}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="hero-description">Описание</Label>
          <Textarea
            id="hero-description"
            value={hero.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hero-experience">Опит</Label>
            <Input
              id="hero-experience"
              value={hero.experience}
              onChange={(e) => onUpdate({ experience: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="hero-cta-primary">Основен CTA</Label>
            <Input
              id="hero-cta-primary"
              value={hero.ctaPrimary}
              onChange={(e) => onUpdate({ ctaPrimary: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="hero-cta-secondary">Вторичен CTA</Label>
          <Input
            id="hero-cta-secondary"
            value={hero.ctaSecondary}
            onChange={(e) => onUpdate({ ctaSecondary: e.target.value })}
          />
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Статистики</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="stats-projects">Проекти</Label>
              <Input
                id="stats-projects"
                value={hero.stats.projects}
                onChange={(e) => onUpdate({ 
                  stats: { ...hero.stats, projects: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="stats-experience">Опит</Label>
              <Input
                id="stats-experience"
                value={hero.stats.experience}
                onChange={(e) => onUpdate({ 
                  stats: { ...hero.stats, experience: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="stats-clients">Клиенти</Label>
              <Input
                id="stats-clients"
                value={hero.stats.clients}
                onChange={(e) => onUpdate({ 
                  stats: { ...hero.stats, clients: e.target.value }
                })}
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Особености</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>Оборудване</Label>
              <Input
                value={hero.features.equipment.title}
                onChange={(e) => onUpdate({
                  features: {
                    ...hero.features,
                    equipment: { ...hero.features.equipment, title: e.target.value }
                  }
                })}
                className="mb-2"
              />
              <Textarea
                value={hero.features.equipment.description}
                onChange={(e) => onUpdate({
                  features: {
                    ...hero.features,
                    equipment: { ...hero.features.equipment, description: e.target.value }
                  }
                })}
                rows={2}
              />
            </div>
            <div>
              <Label>Качество</Label>
              <Input
                value={hero.features.quality.title}
                onChange={(e) => onUpdate({
                  features: {
                    ...hero.features,
                    quality: { ...hero.features.quality, title: e.target.value }
                  }
                })}
                className="mb-2"
              />
              <Textarea
                value={hero.features.quality.description}
                onChange={(e) => onUpdate({
                  features: {
                    ...hero.features,
                    quality: { ...hero.features.quality, description: e.target.value }
                  }
                })}
                rows={2}
              />
            </div>
            <div>
              <Label>Скорост</Label>
              <Input
                value={hero.features.speed.title}
                onChange={(e) => onUpdate({
                  features: {
                    ...hero.features,
                    speed: { ...hero.features.speed, title: e.target.value }
                  }
                })}
                className="mb-2"
              />
              <Textarea
                value={hero.features.speed.description}
                onChange={(e) => onUpdate({
                  features: {
                    ...hero.features,
                    speed: { ...hero.features.speed, description: e.target.value }
                  }
                })}
                rows={2}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Services Editor Component
function ServicesEditor({ services, onUpdate }: { services: Service[]; onUpdate: (services: Service[]) => void }) {
  const addService = () => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      title: 'Нова услуга',
      description: 'Описание на услугата',
      features: ['Особеност 1', 'Особеност 2', 'Особеност 3'],
      icon: 'Wrench',
      color: 'bg-primary/10 text-primary border-primary/20',
      order: services.length + 1
    };
    onUpdate([...services, newService]);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    onUpdate(services.map(service => 
      service.id === id ? { ...service, ...updates } : service
    ));
  };

  const deleteService = (id: string) => {
    onUpdate(services.filter(service => service.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Услуги</CardTitle>
          <Button onClick={addService}>
            <Plus className="h-4 w-4 mr-2" />
            Добави услуга
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.map((service, index) => (
          <Card key={service.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">Услуга {index + 1}</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteService(service.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label>Заглавие</Label>
                <Input
                  value={service.title}
                  onChange={(e) => updateService(service.id, { title: e.target.value })}
                />
              </div>
              <div>
                <Label>Икона</Label>
                <Input
                  value={service.icon}
                  onChange={(e) => updateService(service.id, { icon: e.target.value })}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Label>Описание</Label>
              <Textarea
                value={service.description}
                onChange={(e) => updateService(service.id, { description: e.target.value })}
                rows={2}
              />
            </div>
            
            <div className="mt-4">
              <Label>Особености (по една на ред)</Label>
              <Textarea
                value={service.features.join('\n')}
                onChange={(e) => updateService(service.id, { 
                  features: e.target.value.split('\n').filter(f => f.trim())
                })}
                rows={3}
                placeholder="Особеност 1&#10;Особеност 2&#10;Особеност 3"
              />
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

// Portfolio Editor Component
function PortfolioEditor({ portfolio, onUpdate }: { portfolio: PortfolioItem[]; onUpdate: (portfolio: PortfolioItem[]) => void }) {
  const addPortfolioItem = () => {
    const newItem: PortfolioItem = {
      id: `portfolio-${Date.now()}`,
      title: 'Нов проект',
      description: 'Описание на проекта',
      image: '/api/placeholder/400/300',
      category: 'General',
      count: '1+ projects',
      order: portfolio.length + 1
    };
    onUpdate([...portfolio, newItem]);
  };

  const updatePortfolioItem = (id: string, updates: Partial<PortfolioItem>) => {
    onUpdate(portfolio.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deletePortfolioItem = (id: string) => {
    onUpdate(portfolio.filter(item => item.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Портфолио</CardTitle>
          <Button onClick={addPortfolioItem}>
            <Plus className="h-4 w-4 mr-2" />
            Добави проект
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {portfolio.map((item, index) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">Проект {index + 1}</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deletePortfolioItem(item.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Заглавие</Label>
                <Input
                  value={item.title}
                  onChange={(e) => updatePortfolioItem(item.id, { title: e.target.value })}
                />
              </div>
              <div>
                <Label>Категория</Label>
                <Input
                  value={item.category}
                  onChange={(e) => updatePortfolioItem(item.id, { category: e.target.value })}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Label>Описание</Label>
              <Textarea
                value={item.description}
                onChange={(e) => updatePortfolioItem(item.id, { description: e.target.value })}
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label>URL на изображение</Label>
                <Input
                  value={item.image}
                  onChange={(e) => updatePortfolioItem(item.id, { image: e.target.value })}
                />
              </div>
              <div>
                <Label>Брой проекти</Label>
                <Input
                  value={item.count}
                  onChange={(e) => updatePortfolioItem(item.id, { count: e.target.value })}
                />
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

// Blog Editor Component
function BlogEditor({ blog, onUpdate }: { blog: BlogPost[]; onUpdate: (blog: BlogPost[]) => void }) {
  const addBlogPost = () => {
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: 'Нова статия',
      description: 'Описание на статията',
      image: '/api/placeholder/400/300',
      date: new Date().toISOString().split('T')[0],
      author: 'LAMARINA BG Team',
      order: blog.length + 1
    };
    onUpdate([...blog, newPost]);
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    onUpdate(blog.map(post => 
      post.id === id ? { ...post, ...updates } : post
    ));
  };

  const deleteBlogPost = (id: string) => {
    onUpdate(blog.filter(post => post.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Блог статии</CardTitle>
          <Button onClick={addBlogPost}>
            <Plus className="h-4 w-4 mr-2" />
            Добави статия
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {blog.map((post, index) => (
          <Card key={post.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">Статия {index + 1}</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteBlogPost(post.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Заглавие</Label>
                <Input
                  value={post.title}
                  onChange={(e) => updateBlogPost(post.id, { title: e.target.value })}
                />
              </div>
              <div>
                <Label>Автор</Label>
                <Input
                  value={post.author}
                  onChange={(e) => updateBlogPost(post.id, { author: e.target.value })}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Label>Описание</Label>
              <Textarea
                value={post.description}
                onChange={(e) => updateBlogPost(post.id, { description: e.target.value })}
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label>URL на изображение</Label>
                <Input
                  value={post.image}
                  onChange={(e) => updateBlogPost(post.id, { image: e.target.value })}
                />
              </div>
              <div>
                <Label>Дата</Label>
                <Input
                  type="date"
                  value={post.date}
                  onChange={(e) => updateBlogPost(post.id, { date: e.target.value })}
                />
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

// Contact Editor Component
function ContactEditor({ contact, onUpdate }: { contact: ContactInfo; onUpdate: (contact: ContactInfo) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Контактна информация</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="contact-address">Адрес</Label>
          <Textarea
            id="contact-address"
            value={contact.address}
            onChange={(e) => onUpdate({ ...contact, address: e.target.value })}
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contact-phone">Телефон</Label>
            <Input
              id="contact-phone"
              value={contact.phone}
              onChange={(e) => onUpdate({ ...contact, phone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="contact-email">Имейл</Label>
            <Input
              id="contact-email"
              type="email"
              value={contact.email}
              onChange={(e) => onUpdate({ ...contact, email: e.target.value })}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="contact-hours">Работно време</Label>
          <Input
            id="contact-hours"
            value={contact.workingHours}
            onChange={(e) => onUpdate({ ...contact, workingHours: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
