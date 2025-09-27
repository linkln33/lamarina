"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Edit, Trash2, UserPlus, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "Иван Петров",
      email: "ivan.petrov@lamarina.bg",
      role: "Администратор",
      status: "Активен",
      lastLogin: "2024-01-15 14:30",
      createdAt: "2023-12-01"
    },
    {
      id: 2,
      name: "Мария Георгиева",
      email: "maria.georgieva@lamarina.bg",
      role: "Редактор",
      status: "Активен",
      lastLogin: "2024-01-14 09:15",
      createdAt: "2024-01-05"
    },
    {
      id: 3,
      name: "Петър Стоянов",
      email: "petar.stoyanov@lamarina.bg",
      role: "Редактор",
      status: "Неактивен",
      lastLogin: "2024-01-10 16:45",
      createdAt: "2024-01-08"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Потребители</h1>
          <p className="text-muted-foreground">Управление на потребители и роли</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Нов потребител
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Търсене</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Търси потребители..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Всички потребители</CardTitle>
          <CardDescription>
            Управление на потребители и техните роли
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold">{user.name}</h3>
                      <Badge variant={user.status === 'Активен' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                      <Badge variant="outline">
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>Последен вход: {user.lastLogin}</span>
                      <span>•</span>
                      <span>Създаден: {user.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
