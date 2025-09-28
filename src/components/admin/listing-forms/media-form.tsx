"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Video } from 'lucide-react';
import { Listing } from '@/types/listing';
import { ImageUpload, UploadedImage } from '@/components/ui/image-upload';

interface MediaFormProps {
  formData: Listing;
  onUpdate: (updates: Partial<Listing>) => void;
}

export function MediaForm({ formData, onUpdate }: MediaFormProps) {
  const handleImagesChange = (images: UploadedImage[]) => {
    onUpdate({
      images: images.map(img => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
        isPrimary: img.isPrimary,
        order: img.order
      }))
    });
  };

  const addVideo = () => {
    onUpdate({
      videos: [...formData.videos, { 
        id: Date.now().toString(), 
        url: '', 
        title: '', 
        thumbnail: '', 
        duration: 0 
      }]
    });
  };

  const updateVideo = (id: string, field: keyof Listing['videos'][0], value: string | number) => {
    onUpdate({
      videos: formData.videos.map(vid => vid.id === id ? { ...vid, [field]: value } : vid)
    });
  };

  const removeVideo = (id: string) => {
    onUpdate({
      videos: formData.videos.filter(vid => vid.id !== id)
    });
  };

  return (
    <div className="space-y-4">
      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Изображения</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload
            images={formData.images}
            onImagesChange={handleImagesChange}
            maxImages={10}
          />
        </CardContent>
      </Card>

      {/* Videos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Видеоклипове</CardTitle>
            <Button onClick={addVideo} size="sm">
              <Plus className="h-4 w-4 mr-2" /> Добави видео
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.videos.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Няма видеоклипове</h3>
              <p className="text-muted-foreground mb-4">
                Добавете видеоклипове за вашата обява
              </p>
              <Button onClick={addVideo}>
                <Plus className="h-4 w-4 mr-2" /> Добави първи видеоклип
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.videos.map((video) => (
                <div key={video.id} className="relative border rounded-lg overflow-hidden">
                  <img src={video.thumbnail || '/api/placeholder/400/225'} alt={video.title} className="w-full h-32 object-cover" />
                  <div className="p-2 space-y-2">
                    <div>
                      <Label htmlFor={`video-url-${video.id}`}>URL</Label>
                      <Input 
                        id={`video-url-${video.id}`} 
                        value={video.url} 
                        onChange={(e) => updateVideo(video.id, 'url', e.target.value)} 
                        placeholder="URL на видео (YouTube/Vimeo)" 
                      />
                    </div>
                    <div>
                      <Label htmlFor={`video-title-${video.id}`}>Заглавие</Label>
                      <Input 
                        id={`video-title-${video.id}`} 
                        value={video.title} 
                        onChange={(e) => updateVideo(video.id, 'title', e.target.value)} 
                        placeholder="Заглавие на видеото" 
                      />
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => removeVideo(video.id)} className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" /> Изтрий
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


