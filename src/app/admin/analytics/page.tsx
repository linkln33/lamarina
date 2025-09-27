"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, Eye, MousePointer, TrendingUp } from 'lucide-react';

export default function AnalyticsPage() {
  const stats = [
    {
      title: "Общо посетители",
      value: "12,456",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Прегледи на страници",
      value: "45,789",
      change: "+8%",
      icon: Eye,
      color: "text-green-600"
    },
    {
      title: "Време на сайта",
      value: "3:24",
      change: "+15%",
      icon: MousePointer,
      color: "text-purple-600"
    },
    {
      title: "Конверсия",
      value: "4.2%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const topPages = [
    { page: "Начало", views: 1234, change: "+5%" },
    { page: "Услуги", views: 856, change: "+12%" },
    { page: "За нас", views: 567, change: "+3%" },
    { page: "Контакти", views: 234, change: "+8%" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Аналитика</h1>
        <p className="text-muted-foreground">Статистики и анализи на сайта</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change} от миналия месец
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-muted`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Най-посещавани страници</CardTitle>
            <CardDescription>Топ страници за последния месец</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{page.page}</p>
                      <p className="text-sm text-muted-foreground">{page.views} гледания</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    {page.change}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Последна активност</CardTitle>
            <CardDescription>Най-новите действия на сайта</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Нова статия публикувана</p>
                  <p className="text-xs text-muted-foreground">преди 2 часа</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Портфолио елемент обновен</p>
                  <p className="text-xs text-muted-foreground">преди 4 часа</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Нов листинг създаден</p>
                  <p className="text-xs text-muted-foreground">преди 6 часа</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Тренд на посещения</CardTitle>
          <CardDescription>График на посещенията за последните 30 дни</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">График ще бъде интегриран тук</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
