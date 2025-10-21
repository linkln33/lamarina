"use client";

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail } from 'lucide-react';
import { Listing } from '@/types/listing';

interface ListingViewerProps {
  listing: Listing;
}

export function ListingViewer({ listing }: ListingViewerProps) {
  return (
    <div className="space-y-6">
      {/* Images */}
      {listing.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listing.images.map((image) => (
            <div key={image.id} className="relative">
              <Image
                src={image.url}
                alt={image.alt}
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-lg"
              />
              {image.isPrimary && (
                <Badge className="absolute top-2 left-2">Основно</Badge>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Основна информация</h3>
          <div className="space-y-2">
            <div><strong>Категория:</strong> {listing.category}</div>
            <div><strong>Статус:</strong> 
              <Badge variant={listing.status === 'published' ? 'default' : 'secondary'} className="ml-2">
                {listing.status === 'published' ? 'Публикуван' : 'Чернова'}
              </Badge>
            </div>
            <div><strong>Избран:</strong> {listing.isFeatured ? 'Да' : 'Не'}</div>
            <div><strong>Прегледи:</strong> {listing.views}</div>
            <div><strong>Харесвания:</strong> {listing.likes}</div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Цена</h3>
          <div className="text-2xl font-bold text-primary">
            {listing.pricing.basePrice} {listing.pricing.currency}
          </div>
          {listing.pricing.sizeVariants.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium mb-1">Размерни варианти:</p>
              {listing.pricing.sizeVariants.map((variant, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  {variant.size}: {variant.price} {listing.pricing.currency}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Описание</h3>
        <p className="text-muted-foreground">{listing.description}</p>
      </div>

      {/* Specifications */}
      {listing.specifications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Характеристики</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {listing.specifications.map((spec) => (
              <div key={spec.id} className="flex justify-between py-2 border-b">
                <span className="font-medium">{spec.name}</span>
                <span className="text-muted-foreground">
                  {spec.value} {spec.unit && spec.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {listing.features.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Особености</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listing.features.map((feature) => (
              <div key={feature.id} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium">{feature.name}</div>
                  {feature.description && (
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Контактна информация</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{listing.contact.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{listing.contact.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


