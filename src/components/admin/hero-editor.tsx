"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Image } from 'lucide-react';
import { HeroSection } from '@/lib/cms';

interface HeroEditorProps {
  hero: HeroSection;
  onUpdate: (updates: Partial<HeroSection>) => void;
}

export function HeroEditor({ hero, onUpdate }: HeroEditorProps) {
  const updateField = (field: keyof HeroSection, value: unknown) => {
    onUpdate({ [field]: value });
  };

  const updateStat = (field: keyof typeof hero.stats, value: string) => {
    updateField('stats', { ...hero.stats, [field]: value });
  };

  const updateFeature = (featureKey: keyof typeof hero.features, field: 'title' | 'description', value: string) => {
    updateField('features', {
      ...hero.features,
      [featureKey]: {
        ...hero.features[featureKey],
        [field]: value
      }
    });
  };

  // Carousel management functions
  const addCarouselImage = () => {
    const newImage = {
      id: Date.now().toString(),
      url: '/api/placeholder/800/600',
      alt: 'Ново изображение',
      title: 'Заглавие на изображението'
    };
    const currentImages = hero.carousel?.images || [];
    updateField('carousel', { images: [...currentImages, newImage] });
  };

  const removeCarouselImage = (id: string) => {
    const currentImages = hero.carousel?.images || [];
    updateField('carousel', { images: currentImages.filter(img => img.id !== id) });
  };

  const updateCarouselImage = (id: string, field: string, value: string) => {
    const currentImages = hero.carousel?.images || [];
    const updatedImages = currentImages.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    );
    updateField('carousel', { images: updatedImages });
  };

  return (
    <div className="space-y-6">
      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Основно съдържание</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Главно заглавие</Label>
            <Input
              id="title"
              value={hero.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Въведете главното заглавие"
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle">Подзаглавие</Label>
            <Input
              id="subtitle"
              value={hero.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Въведете подзаглавие"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={hero.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Въведете описание"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ctaPrimary">Основен бутон</Label>
              <Input
                id="ctaPrimary"
                value={hero.ctaPrimary}
                onChange={(e) => updateField('ctaPrimary', e.target.value)}
                placeholder="Текст на основния бутон"
              />
            </div>
            <div>
              <Label htmlFor="ctaSecondary">Вторичен бутон</Label>
              <Input
                id="ctaSecondary"
                value={hero.ctaSecondary}
                onChange={(e) => updateField('ctaSecondary', e.target.value)}
                placeholder="Текст на вторичния бутон"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Background */}
      <Card>
        <CardHeader>
          <CardTitle>Фон</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="backgroundImage">URL на фоново изображение</Label>
            <Input
              id="backgroundImage"
              value={hero.backgroundImage}
              onChange={(e) => updateField('backgroundImage', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <Label htmlFor="backgroundImage">URL на фоново изображение</Label>
            <Input
              id="backgroundImage"
              value={hero.backgroundImage || ''}
              onChange={(e) => updateField('backgroundImage', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Статистики</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="stats-projects">Проекти</Label>
              <Input
                id="stats-projects"
                value={hero.stats.projects}
                onChange={(e) => updateStat('projects', e.target.value)}
                placeholder="500+"
              />
            </div>
            <div>
              <Label htmlFor="stats-experience">Опит</Label>
              <Input
                id="stats-experience"
                value={hero.stats.experience}
                onChange={(e) => updateStat('experience', e.target.value)}
                placeholder="30+"
              />
            </div>
            <div>
              <Label htmlFor="stats-clients">Клиенти</Label>
              <Input
                id="stats-clients"
                value={hero.stats.clients}
                onChange={(e) => updateStat('clients', e.target.value)}
                placeholder="100%"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Особености</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Equipment Feature */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">1</Badge>
                <span className="text-sm font-medium">Оборудване</span>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="equipment-title">Заглавие</Label>
                  <Input
                    id="equipment-title"
                    value={hero.features.equipment.title}
                    onChange={(e) => updateFeature('equipment', 'title', e.target.value)}
                    placeholder="Професионално оборудване"
                  />
                </div>
                <div>
                  <Label htmlFor="equipment-description">Описание</Label>
                  <Textarea
                    id="equipment-description"
                    value={hero.features.equipment.description}
                    onChange={(e) => updateFeature('equipment', 'description', e.target.value)}
                    placeholder="Модерни машини за прецизна обработка"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Quality Feature */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">2</Badge>
                <span className="text-sm font-medium">Качество</span>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="quality-title">Заглавие</Label>
                  <Input
                    id="quality-title"
                    value={hero.features.quality.title}
                    onChange={(e) => updateFeature('quality', 'title', e.target.value)}
                    placeholder="Гарантирано качество"
                  />
                </div>
                <div>
                  <Label htmlFor="quality-description">Описание</Label>
                  <Textarea
                    id="quality-description"
                    value={hero.features.quality.description}
                    onChange={(e) => updateFeature('quality', 'description', e.target.value)}
                    placeholder="Сертифицирани процеси и материали"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Speed Feature */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">3</Badge>
                <span className="text-sm font-medium">Скорост</span>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="speed-title">Заглавие</Label>
                  <Input
                    id="speed-title"
                    value={hero.features.speed.title}
                    onChange={(e) => updateFeature('speed', 'title', e.target.value)}
                    placeholder="Бързо изпълнение"
                  />
                </div>
                <div>
                  <Label htmlFor="speed-description">Описание</Label>
                  <Textarea
                    id="speed-description"
                    value={hero.features.speed.description}
                    onChange={(e) => updateFeature('speed', 'description', e.target.value)}
                    placeholder="Спазване на сроковете за доставка"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carousel Images */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Carousel изображения</CardTitle>
            <Button onClick={addCarouselImage} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Добави изображение
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hero.carousel?.images?.map((image, index) => (
              <div key={image.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Изображение #{index + 1}</span>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeCarouselImage(image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`carousel-url-${image.id}`}>URL на изображение</Label>
                    <Input
                      id={`carousel-url-${image.id}`}
                      value={image.url}
                      onChange={(e) => updateCarouselImage(image.id, 'url', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`carousel-title-${image.id}`}>Заглавие</Label>
                    <Input
                      id={`carousel-title-${image.id}`}
                      value={image.title}
                      onChange={(e) => updateCarouselImage(image.id, 'title', e.target.value)}
                      placeholder="Заглавие на изображението"
                    />
                  </div>
                </div>
                
                <div className="mt-3">
                  <Label htmlFor={`carousel-alt-${image.id}`}>Alt текст</Label>
                  <Input
                    id={`carousel-alt-${image.id}`}
                    value={image.alt}
                    onChange={(e) => updateCarouselImage(image.id, 'alt', e.target.value)}
                    placeholder="Описание на изображението"
                  />
                </div>

                {/* Image Preview */}
                {image.url && (
                  <div className="mt-3">
                    <Label>Преглед:</Label>
                    <div className="mt-2 border rounded-lg overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder/400/200';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {(!hero.carousel?.images || hero.carousel.images.length === 0) && (
              <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Няма изображения в carousel</h3>
                <p className="text-muted-foreground mb-4">
                  Добавете изображения за да създадете carousel
                </p>
                <Button onClick={addCarouselImage}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добави първото изображение
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
