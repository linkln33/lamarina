"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  Eye,
  Home,
  Wrench,
  Image,
  FileText,
  Users
} from 'lucide-react';
import { CMS, HomepageContent } from '@/lib/cms';
import toast from 'react-hot-toast';
import { HeroEditor } from '@/components/admin/hero-editor';
import { ServicesEditor } from '@/components/admin/services-editor';
import { PortfolioEditor } from '@/components/admin/portfolio-editor';
import { BlogEditor } from '@/components/admin/blog-editor';

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

  const updateHero = (updates: Partial<typeof content.hero>) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, ...updates }
    }));
  };

  const updateServices = (services: typeof content.services) => {
    setContent(prev => ({ ...prev, services }));
  };

  const updatePortfolio = (portfolio: typeof content.portfolio) => {
    setContent(prev => ({ ...prev, portfolio }));
  };

  const updateBlog = (blog: typeof content.blog) => {
    setContent(prev => ({ ...prev, blog }));
  };

  const updateContact = (contact: typeof content.contact) => {
    setContent(prev => ({ ...prev, contact }));
  };

  return (
    <div className="space-y-6 min-w-0 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold break-words leading-tight">Редактор на началната страница</h1>
          <p className="text-muted-foreground text-sm lg:text-base break-words mt-1">
            Управлявайте съдържанието на вашата начална страница
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button variant="outline" onClick={() => window.open('/', '_blank')} size="sm" className="lg:h-10 lg:px-4 text-xs sm:text-sm">
            <Eye className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Преглед</span>
            <span className="sm:hidden">👁</span>
          </Button>
          <Button onClick={handleSave} size="sm" className="lg:h-10 lg:px-4 text-xs sm:text-sm">
            <Save className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Запази промените</span>
            <span className="sm:hidden">Запази</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 w-full min-w-0">
        <div className="overflow-x-auto -mx-1 px-1">
          <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-max min-w-full sm:min-w-0">
            <TabsTrigger value="hero" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all">
              <Home className="h-4 w-4 mr-1 sm:mr-2" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="services" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all">
              <Wrench className="h-4 w-4 mr-1 sm:mr-2" />
              Услуги
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all">
              <Image className="h-4 w-4 mr-1 sm:mr-2" />
              Портфолио
            </TabsTrigger>
            <TabsTrigger value="blog" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all">
              <FileText className="h-4 w-4 mr-1 sm:mr-2" />
              Блог
            </TabsTrigger>
            <TabsTrigger value="contact" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all">
              <Users className="h-4 w-4 mr-1 sm:mr-2" />
              Контакт
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="hero" className="space-y-4">
          <HeroEditor hero={content.hero} onUpdate={updateHero} />
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <ServicesEditor services={content.services} onUpdate={updateServices} />
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <PortfolioEditor portfolio={content.portfolio} onUpdate={updatePortfolio} />
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <BlogEditor blog={content.blog} onUpdate={updateBlog} />
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Контактна информация</h3>
            <p className="text-muted-foreground">
              Контактната информация се управлява от настройките на сайта.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}