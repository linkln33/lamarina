"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Edit, Trash2, UserPlus, Shield, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { DatabaseService, User as UserType } from '@/lib/database-service';

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setUsers(DatabaseService.getUsers());
  }, []);

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (id: string) => {
    if (confirm('Сигурни ли сте, че искате да изтриете този потребител?')) {
      DatabaseService.deleteUser(id);
      setUsers(DatabaseService.getUsers());
      toast.success('Потребителят беше изтрит успешно');
    }
  };

  const handleCreateUser = () => {
    const newUser = DatabaseService.createUser({
      email: 'new@lamarina.bg',
      firstName: 'Нов',
      lastName: 'Потребител',
      role: 'user',
      phone: '',
      bio: ''
    });
    setUsers(DatabaseService.getUsers());
    toast.success('Потребителят беше създаден успешно');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Потребители</h1>
          <p className="text-muted-foreground">Управление на потребители и роли</p>
        </div>
        <Button onClick={handleCreateUser}>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Няма потребители</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Няма намерени потребители с този търсен термин' : 'Създайте първия потребител'}
                </p>
                <Button onClick={handleCreateUser}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Създай потребител
                </Button>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <Shield className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role === 'admin' ? 'Администратор' : 
                           user.role === 'editor' ? 'Редактор' : 'Потребител'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{user.email}</span>
                        </div>
                        {user.phone && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{user.phone}</span>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>Създаден: {new Date(user.createdAt).toLocaleDateString('bg-BG')}</span>
                        <span>•</span>
                        <span>Обновен: {new Date(user.updatedAt).toLocaleDateString('bg-BG')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
