"use client";

import Image from 'next/image';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Loader2, 
  Check,
  AlertCircle,
  Star
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { NetlifyStorage } from '@/lib/netlify-storage';

export interface UploadedImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

interface ImageUploadProps {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
  maxImages?: number;
  accept?: string;
  className?: string;
}

export function ImageUpload({ 
  images, 
  onImagesChange, 
  maxImages = 10,
  accept = "image/*",
  className = ""
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File): Promise<string> => {
    try {
      return await NetlifyStorage.uploadFile(file, 'listings');
    } catch (error) {
      console.error('Upload error:', error);
      // Fallback to placeholder URL
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      return `/api/placeholder/400/300?filename=${fileName}`;
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);
    const remainingSlots = maxImages - images.length;
    const filesToUpload = filesArray.slice(0, remainingSlots);

    if (filesToUpload.length < filesArray.length) {
      toast.error(`Можете да качите максимум ${maxImages} изображения. Пропуснати ${filesArray.length - filesToUpload.length} файла.`);
    }

    setIsUploading(true);

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} не е валидно изображение`);
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name} е твърде голям (максимум 5MB)`);
        }

        const url = await uploadImage(file);
        return {
          id: Date.now().toString() + Math.random().toString(36).substring(2),
          url,
          alt: file.name.split('.')[0],
          isPrimary: images.length === 0, // First image is primary
          order: images.length
        };
      });

      const newImages = await Promise.all(uploadPromises);
      onImagesChange([...images, ...newImages]);
      toast.success(`Успешно качени ${newImages.length} изображения`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Грешка при качване на изображения');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeImage = (id: string) => {
    const newImages = images.filter(img => img.id !== id);
    // If we removed the primary image, make the first remaining image primary
    if (images.find(img => img.id === id)?.isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }
    onImagesChange(newImages);
  };

  const setPrimaryImage = (id: string) => {
    const newImages = images.map(img => ({
      ...img,
      isPrimary: img.id === id
    }));
    onImagesChange(newImages);
  };

  const updateImageAlt = (id: string, alt: string) => {
    const newImages = images.map(img => 
      img.id === id ? { ...img, alt } : img
    );
    onImagesChange(newImages);
  };

  // const reorderImages = (fromIndex: number, toIndex: number) => {
  //   const newImages = [...images];
  //   const [movedImage] = newImages.splice(fromIndex, 1);
  //   newImages.splice(toIndex, 0, movedImage);
  //   
  //   // Update order indices
  //   const reorderedImages = newImages.map((img, index) => ({
  //     ...img,
  //     order: index
  //   }));
  //   
  //   onImagesChange(reorderedImages);
  // };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">
              {dragActive ? 'Пуснете изображенията тук' : 'Качете изображения'}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Drag & drop или кликнете за избор ({images.length}/{maxImages})
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="mb-2"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {isUploading ? 'Качване...' : 'Избери файлове'}
            </Button>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, WEBP до 5MB
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={accept}
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <Card key={image.id} className="relative group">
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Primary Badge */}
                  {image.isPrimary && (
                    <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Основно
                    </Badge>
                  )}

                  {/* Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      {!image.isPrimary && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setPrimaryImage(image.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeImage(image.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 space-y-2">
                  <div>
                    <Label htmlFor={`alt-${image.id}`} className="text-xs">
                      Alt текст
                    </Label>
                    <Input
                      id={`alt-${image.id}`}
                      value={image.alt}
                      onChange={(e) => updateImageAlt(image.id, e.target.value)}
                      placeholder="Описание на изображението"
                      className="text-xs"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>#{index + 1}</span>
                    {image.isPrimary && (
                      <Badge variant="secondary" className="text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Основно
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Status */}
      {isUploading && (
        <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          <span className="text-sm">Качване на изображения...</span>
        </div>
      )}

      {/* Help Text */}
      {images.length === 0 && !isUploading && (
        <div className="text-center py-4">
          <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Няма качени изображения
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Качете изображения за да покажете вашия продукт
          </p>
          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
            <AlertCircle className="h-4 w-4 inline mr-1" />
            Using Netlify storage for image uploads
          </div>
        </div>
      )}
    </div>
  );
}
