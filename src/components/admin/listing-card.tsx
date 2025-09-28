"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Edit, 
  Trash2, 
  Image as ImageIcon, 
  DollarSign,
  Star
} from 'lucide-react';
import { Listing } from '@/types/listing';

interface ListingCardProps {
  listing: Listing;
  onEdit: (listing: Listing) => void;
  onDelete: (id: string) => void;
}

export function ListingCard({ listing, onEdit, onDelete }: ListingCardProps) {
  return (
    <Card className="flex flex-col">
      <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
        {listing.images.length > 0 ? (
          <img 
            src={listing.images.find(img => img.isPrimary)?.url || listing.images[0].url} 
            alt={listing.images.find(img => img.isPrimary)?.alt || listing.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
          </div>
        )}
        {listing.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
            <Star className="h-3 w-3 mr-1" /> Избрана
          </Badge>
        )}
        <Badge className={`absolute top-2 right-2 
          ${listing.status === 'published' ? 'bg-green-500' : 
            listing.status === 'draft' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}>
          {listing.status === 'published' ? 'Публикувана' : 
          listing.status === 'draft' ? 'Чернова' : 'Архивирана'}
        </Badge>
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className="text-lg line-clamp-2">{listing.title}</CardTitle>
        <CardDescription className="line-clamp-3">{listing.shortDescription}</CardDescription>
        <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
          <Badge variant="secondary">{listing.category}</Badge>
          <span className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1" /> {listing.pricing.basePrice.toFixed(2)} {listing.pricing.currency}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(listing)}>
          <Edit className="h-4 w-4 mr-2" />
          Редактирай
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(listing.id)}>
          <Trash2 className="h-4 w-4 mr-2" />
          Изтрий
        </Button>
      </CardContent>
    </Card>
  );
}


