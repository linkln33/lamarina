"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ListingsPage() {
  const listings = [
    {
      id: 1,
      title: "Метални покривни панели",
      category: "Покривни системи",
      price: "45.00 лв/м²",
      status: "Активен",
      createdAt: "2024-01-15",
      views: 156
    },
    {
      id: 2,
      title: "Огъване на листов метал",
      category: "Услуги",
      price: "По договаряне",
      status: "Активен",
      createdAt: "2024-01-10",
      views: 89
    },
    {
      id: 3,
      title: "Лазерно рязане",
      category: "Услуги",
      price: "2.50 лв/м",
      status: "Чернова",
      createdAt: "2024-01-08",
      views: 23
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Листинги</h1>
          <p className="text-muted-foreground">Управление на продукти и услуги</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Нов листинг
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Филтри и търсене</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Търси листинги..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Филтри
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Listings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Всички листинги</CardTitle>
          <CardDescription>
            Управление на всички продукти и услуги
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {listings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{listing.title}</h3>
                    <Badge variant={listing.status === 'Активен' ? 'default' : 'secondary'}>
                      {listing.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{listing.category}</span>
                    <span>•</span>
                    <span>{listing.price}</span>
                    <span>•</span>
                    <span>{listing.views} гледания</span>
                    <span>•</span>
                    <span>Създаден: {listing.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}