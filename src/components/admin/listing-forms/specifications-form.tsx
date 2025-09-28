"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Ruler, Shield } from 'lucide-react';
import { Listing } from '@/types/listing';

interface SpecificationsFormProps {
  formData: Listing;
  onUpdate: (updates: Partial<Listing>) => void;
}

export function SpecificationsForm({ formData, onUpdate }: SpecificationsFormProps) {
  const addSpecification = () => {
    onUpdate({
      specifications: [...formData.specifications, { 
        id: Date.now().toString(), 
        name: '', 
        value: '', 
        unit: '' 
      }]
    });
  };

  const updateSpecification = (id: string, field: keyof Listing['specifications'][0], value: string) => {
    onUpdate({
      specifications: formData.specifications.map(spec => 
        spec.id === id ? { ...spec, [field]: value } : spec
      )
    });
  };

  const removeSpecification = (id: string) => {
    onUpdate({
      specifications: formData.specifications.filter(spec => spec.id !== id)
    });
  };

  const addFeature = () => {
    onUpdate({
      features: [...formData.features, { 
        id: Date.now().toString(), 
        name: '', 
        description: '', 
        icon: 'Star' 
      }]
    });
  };

  const updateFeature = (id: string, field: keyof Listing['features'][0], value: string) => {
    onUpdate({
      features: formData.features.map(feat => 
        feat.id === id ? { ...feat, [field]: value } : feat
      )
    });
  };

  const removeFeature = (id: string) => {
    onUpdate({
      features: formData.features.filter(feat => feat.id !== id)
    });
  };

  return (
    <div className="space-y-4">
      {/* Specifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Спецификации</CardTitle>
            <Button onClick={addSpecification} size="sm">
              <Plus className="h-4 w-4 mr-2" /> Добави спецификация
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.specifications.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Ruler className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Няма спецификации</h3>
              <p className="text-muted-foreground mb-4">
                Добавете технически спецификации за продукта
              </p>
              <Button onClick={addSpecification}>
                <Plus className="h-4 w-4 mr-2" /> Добави първа спецификация
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.specifications.map((spec) => (
                <div key={spec.id} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Input
                      value={spec.name}
                      onChange={(e) => updateSpecification(spec.id, 'name', e.target.value)}
                      placeholder="Име на спецификацията"
                    />
                    <Input
                      value={spec.value}
                      onChange={(e) => updateSpecification(spec.id, 'value', e.target.value)}
                      placeholder="Стойност"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={spec.unit}
                        onChange={(e) => updateSpecification(spec.id, 'unit', e.target.value)}
                        placeholder="Мерна единица"
                      />
                      <Button variant="destructive" size="sm" onClick={() => removeSpecification(spec.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Особености</CardTitle>
            <Button onClick={addFeature} size="sm">
              <Plus className="h-4 w-4 mr-2" /> Добави особеност
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.features.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Няма особености</h3>
              <p className="text-muted-foreground mb-4">
                Добавете особености и предимства на продукта
              </p>
              <Button onClick={addFeature}>
                <Plus className="h-4 w-4 mr-2" /> Добави първа особеност
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.features.map((feature) => (
                <div key={feature.id} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      value={feature.name}
                      onChange={(e) => updateFeature(feature.id, 'name', e.target.value)}
                      placeholder="Име на особеността"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={feature.icon}
                        onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                        placeholder="Икона (Lucide)"
                      />
                      <Button variant="destructive" size="sm" onClick={() => removeFeature(feature.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                    placeholder="Описание на особеността"
                    rows={2}
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


