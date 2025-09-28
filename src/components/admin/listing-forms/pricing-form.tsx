"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, DollarSign, Package } from 'lucide-react';
import { Listing } from '@/types/listing';

interface PricingFormProps {
  formData: Listing;
  onUpdate: (updates: Partial<Listing>) => void;
}

export function PricingForm({ formData, onUpdate }: PricingFormProps) {
  const addBulkPricing = () => {
    onUpdate({
      pricing: {
        ...formData.pricing,
        bulkPricing: [...formData.pricing.bulkPricing, { minQuantity: 0, maxQuantity: 0, price: 0 }]
      }
    });
  };

  const updateBulkPricing = (index: number, field: keyof Listing['pricing']['bulkPricing'][0], value: any) => {
    onUpdate({
      pricing: {
        ...formData.pricing,
        bulkPricing: formData.pricing.bulkPricing.map((bp, i) => 
          i === index ? { ...bp, [field]: value } : bp
        )
      }
    });
  };

  const removeBulkPricing = (index: number) => {
    onUpdate({
      pricing: {
        ...formData.pricing,
        bulkPricing: formData.pricing.bulkPricing.filter((_, i) => i !== index)
      }
    });
  };

  const addSizeVariant = () => {
    onUpdate({
      pricing: {
        ...formData.pricing,
        sizeVariants: [...formData.pricing.sizeVariants, { size: '', price: 0, stock: 0 }]
      }
    });
  };

  const updateSizeVariant = (index: number, field: keyof Listing['pricing']['sizeVariants'][0], value: any) => {
    onUpdate({
      pricing: {
        ...formData.pricing,
        sizeVariants: formData.pricing.sizeVariants.map((sv, i) => 
          i === index ? { ...sv, [field]: value } : sv
        )
      }
    });
  };

  const removeSizeVariant = (index: number) => {
    onUpdate({
      pricing: {
        ...formData.pricing,
        sizeVariants: formData.pricing.sizeVariants.filter((_, i) => i !== index)
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Basic Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Ценообразуване</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="basePrice">Основна цена *</Label>
              <Input
                id="basePrice"
                type="number"
                value={formData.pricing.basePrice}
                onChange={(e) => onUpdate({
                  pricing: { ...formData.pricing, basePrice: parseFloat(e.target.value) || 0 }
                })}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="currency">Валута</Label>
              <Select 
                value={formData.pricing.currency} 
                onValueChange={(value) => onUpdate({
                  pricing: { ...formData.pricing, currency: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BGN">BGN</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="discountPercentage">Отстъпка (%)</Label>
              <Input
                id="discountPercentage"
                type="number"
                value={formData.pricing.discountPercentage}
                onChange={(e) => onUpdate({
                  pricing: { ...formData.pricing, discountPercentage: parseFloat(e.target.value) || 0 }
                })}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="discountFixed">Фиксирана отстъпка</Label>
              <Input
                id="discountFixed"
                type="number"
                value={formData.pricing.discountFixed}
                onChange={(e) => onUpdate({
                  pricing: { ...formData.pricing, discountFixed: parseFloat(e.target.value) || 0 }
                })}
                placeholder="0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Pricing */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Обемни цени</CardTitle>
            <Button onClick={addBulkPricing} size="sm">
              <Plus className="h-4 w-4 mr-2" /> Добави обемна цена
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.pricing.bulkPricing.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Няма обемни цени</h3>
              <p className="text-muted-foreground mb-4">
                Добавете обемни цени за по-големи количества
              </p>
              <Button onClick={addBulkPricing}>
                <Plus className="h-4 w-4 mr-2" /> Добави обемна цена
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.pricing.bulkPricing.map((bulk, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <Input
                      value={bulk.minQuantity}
                      onChange={(e) => updateBulkPricing(index, 'minQuantity', parseInt(e.target.value) || 0)}
                      placeholder="Мин. количество"
                    />
                    <Input
                      value={bulk.maxQuantity}
                      onChange={(e) => updateBulkPricing(index, 'maxQuantity', parseInt(e.target.value) || 0)}
                      placeholder="Макс. количество"
                    />
                    <Input
                      value={bulk.price}
                      onChange={(e) => updateBulkPricing(index, 'price', parseFloat(e.target.value) || 0)}
                      placeholder="Цена"
                    />
                    <Button variant="destructive" size="sm" onClick={() => removeBulkPricing(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Size Variants */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Размерни варианти</CardTitle>
            <Button onClick={addSizeVariant} size="sm">
              <Plus className="h-4 w-4 mr-2" /> Добави размер
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.pricing.sizeVariants.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Няма размерни варианти</h3>
              <p className="text-muted-foreground mb-4">
                Добавете различни размери с различни цени
              </p>
              <Button onClick={addSizeVariant}>
                <Plus className="h-4 w-4 mr-2" /> Добави размер
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.pricing.sizeVariants.map((variant, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <Input
                      value={variant.size}
                      onChange={(e) => updateSizeVariant(index, 'size', e.target.value)}
                      placeholder="Размер"
                    />
                    <Input
                      type="number"
                      value={variant.price}
                      onChange={(e) => updateSizeVariant(index, 'price', parseFloat(e.target.value) || 0)}
                      placeholder="Цена"
                    />
                    <Input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => updateSizeVariant(index, 'stock', parseInt(e.target.value) || 0)}
                      placeholder="Наличност"
                    />
                    <Button variant="destructive" size="sm" onClick={() => removeSizeVariant(index)}>
                      <Trash2 className="h-4 w-4" />
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


