import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, Image, Settings } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Общо потребители',
      value: '1,234',
      icon: Users,
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Блог статии',
      value: '45',
      icon: FileText,
      change: '+3',
      changeType: 'positive'
    },
    {
      title: 'Портфолио елементи',
      value: '28',
      icon: Image,
      change: '+2',
      changeType: 'positive'
    },
    {
      title: 'Листинги',
      value: '156',
      icon: Settings,
      change: '+8',
      changeType: 'positive'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Административен панел</h1>
        <p className="text-muted-foreground">
          Добре дошли в административния панел на La Marina
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`text-${stat.changeType === 'positive' ? 'green' : 'red'}-600`}>
                  {stat.change}
                </span>{' '}
                от последния месец
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Бързи действия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors">
                <div className="font-medium">Създай нова статия</div>
                <div className="text-sm text-muted-foreground">Добави нова блог статия</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors">
                <div className="font-medium">Добави в портфолио</div>
                <div className="text-sm text-muted-foreground">Нов проект в портфолиото</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors">
                <div className="font-medium">Създай листинг</div>
                <div className="text-sm text-muted-foreground">Нов продукт или услуга</div>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Последна активност</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Нова статия публикувана</div>
                  <div className="text-xs text-muted-foreground">преди 2 часа</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Портфолио елемент обновен</div>
                  <div className="text-xs text-muted-foreground">преди 4 часа</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Нов листинг създаден</div>
                  <div className="text-xs text-muted-foreground">преди 6 часа</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Системна информация</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Версия на системата</span>
                <span className="text-sm font-medium">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Последно обновяване</span>
                <span className="text-sm font-medium">27.09.2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Статус</span>
                <span className="text-sm font-medium text-green-600">Активна</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
