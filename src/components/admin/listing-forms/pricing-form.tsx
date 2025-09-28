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
  const updateBulkPricing = (field: keyof Listing['pricing']['bulkPricing'], value: number) => {
    onUpdate({
      pricing: {
        ...formData.pricing,
        bulkPricing: {
          ...formData.pricing.bulkPricing,
          [field]: value
        }
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

  const updateSizeVariant = (index: number, field: keyof Listing['pricing']['sizeVariants'][0], value: string | number) => {
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
          <CardTitle>Обемни цени</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bulk-10-49">10-49 броя</Label>
                <Input
                  id="bulk-10-49"
                  type="number"
                  value={formData.pricing.bulkPricing['10-49']}
                  onChange={(e) => updateBulkPricing('10-49', parseFloat(e.target.value) || 0)}
                  placeholder="Цена за 10-49 броя"
                />
              </div>
              <div>
                <Label htmlFor="bulk-50-99">50-99 броя</Label>
                <Input
                  id="bulk-50-99"
                  type="number"
                  value={formData.pricing.bulkPricing['50-99']}
                  onChange={(e) => updateBulkPricing('50-99', parseFloat(e.target.value) || 0)}
                  placeholder="Цена за 50-99 броя"
                />
              </div>
              <div>
                <Label htmlFor="bulk-100-plus">100+ броя</Label>
                <Input
                  id="bulk-100-plus"
                  type="number"
                  value={formData.pricing.bulkPricing['100+']}
                  onChange={(e) => updateBulkPricing('100+', parseFloat(e.target.value) || 0)}
                  placeholder="Цена за 100+ броя"
                />
              </div>
            </div>
          </div>
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


