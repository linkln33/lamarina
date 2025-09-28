"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2 } from 'lucide-react';
import { Service } from '@/lib/cms';

interface ServicesEditorProps {
  services: Service[];
  onUpdate: (services: Service[]) => void;
}

export function ServicesEditor({ services, onUpdate }: ServicesEditorProps) {
  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: 'Нова услуга',
      description: 'Описание на услугата',
      icon: 'Wrench',
      color: '#3B82F6',
      order: 0,
      features: [],
    };
    onUpdate([...services, newService]);
  };

  const removeService = (id: string) => {
    onUpdate(services.filter(service => service.id !== id));
  };

  const updateService = (id: string, field: keyof Service, value: string | Service['features']) => {
    onUpdate(services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ));
  };

  const addFeature = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      updateService(serviceId, 'features', [...service.features, 'Нова особеност']);
    }
  };

  const removeFeature = (serviceId: string, featureIndex: number) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      updateService(serviceId, 'features', service.features.filter((_, index) => index !== featureIndex));
    }
  };

  const updateFeature = (serviceId: string, featureIndex: number, value: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      const updatedFeatures = [...service.features];
      updatedFeatures[featureIndex] = value;
      updateService(serviceId, 'features', updatedFeatures);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Услуги</h3>
        <Button onClick={addService}>
          <Plus className="h-4 w-4 mr-2" />
          Добави услуга
        </Button>
      </div>

      <div className="space-y-6">
        {services.map((service, index) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">#{index + 1}</Badge>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeService(service.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`service-title-${service.id}`}>Заглавие</Label>
                  <Input
                    id={`service-title-${service.id}`}
                    value={service.title}
                    onChange={(e) => updateService(service.id, 'title', e.target.value)}
                    placeholder="Заглавие на услугата"
                  />
                </div>
                <div>
                  <Label htmlFor={`service-icon-${service.id}`}>Икона</Label>
                  <Input
                    id={`service-icon-${service.id}`}
                    value={service.icon}
                    onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                    placeholder="Wrench"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`service-description-${service.id}`}>Описание</Label>
                <Textarea
                  id={`service-description-${service.id}`}
                  value={service.description}
                  onChange={(e) => updateService(service.id, 'description', e.target.value)}
                  placeholder="Описание на услугата"
                  rows={3}
                />
              </div>


              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Особености</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addFeature(service.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добави особеност
                  </Button>
                </div>
                <div className="space-y-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(service.id, index, e.target.value)}
                        placeholder="Особеност"
                        className="flex-1"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFeature(service.id, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


