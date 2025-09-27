"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Mail, Reply, Trash2, Star, Archive } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function MessagesPage() {
  const messages = [
    {
      id: 1,
      from: "Иван Петров",
      email: "ivan.petrov@example.com",
      subject: "Запитване за метални покривни панели",
      message: "Здравейте, интересувам се от вашите метални покривни панели...",
      status: "Ново",
      date: "2024-01-15 14:30",
      priority: "Високо"
    },
    {
      id: 2,
      from: "Мария Георгиева",
      email: "maria.georgieva@example.com",
      subject: "Оферта за огъване на листов метал",
      message: "Моля за оферта за огъване на листов метал с дебелина 3мм...",
      status: "Прочетено",
      date: "2024-01-14 09:15",
      priority: "Средно"
    },
    {
      id: 3,
      from: "Петър Стоянов",
      email: "petar.stoyanov@example.com",
      subject: "Благодарност за отлична работа",
      message: "Благодаря за отличната работа по проекта...",
      status: "Отговорено",
      date: "2024-01-12 16:45",
      priority: "Ниско"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Високо":
        return "bg-red-100 text-red-800";
      case "Средно":
        return "bg-yellow-100 text-yellow-800";
      case "Ниско":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ново":
        return "bg-blue-100 text-blue-800";
      case "Прочетено":
        return "bg-gray-100 text-gray-800";
      case "Отговорено":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Съобщения</h1>
          <p className="text-muted-foreground">Управление на съобщения и запитвания</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Archive className="mr-2 h-4 w-4" />
            Архивирай
          </Button>
        </div>
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
              placeholder="Търси съобщения..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Всички съобщения</CardTitle>
          <CardDescription>
            Управление на съобщения и запитвания от клиенти
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{message.from}</h3>
                      <Badge className={getStatusColor(message.status)}>
                        {message.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(message.priority)}>
                        {message.priority}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-foreground mb-1">{message.subject}</h4>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{message.message}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{message.email}</span>
                      <span>•</span>
                      <span>{message.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Reply className="h-4 w-4" />
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
