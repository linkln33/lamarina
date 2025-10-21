"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, Globe, Mail, Shield, Database } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Настройки</h1>
        <p className="text-muted-foreground">Конфигурация на системата</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Общи настройки
            </CardTitle>
            <CardDescription>Основни настройки на сайта</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Име на сайта</Label>
              <Input id="site-name" defaultValue="LAMARINA BG" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">Описание</Label>
              <Textarea 
                id="site-description" 
                defaultValue="Фаворит в производството на метални покривни системи"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-url">URL на сайта</Label>
              <Input id="site-url" defaultValue="https://lamarina.bg" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="maintenance" />
              <Label htmlFor="maintenance">Режим на поддръжка</Label>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Имейл настройки
            </CardTitle>
            <CardDescription>Конфигурация на имейл системата</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP хост</Label>
              <Input id="smtp-host" defaultValue="smtp.gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">SMTP порт</Label>
              <Input id="smtp-port" defaultValue="587" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-user">SMTP потребител</Label>
              <Input id="smtp-user" defaultValue="noreply@lamarina.bg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Контакт имейл</Label>
              <Input id="contact-email" defaultValue="info@lamarina.bg" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Безопасност
            </CardTitle>
            <CardDescription>Настройки за сигурност</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="two-factor" />
              <Label htmlFor="two-factor">Двуфакторна автентификация</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="login-notifications" />
              <Label htmlFor="login-notifications">Известия за вход</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="session-timeout" />
              <Label htmlFor="session-timeout">Автоматично излизане</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-duration">Продължителност на сесия (часове)</Label>
              <Input id="session-duration" defaultValue="8" />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              База данни
            </CardTitle>
            <CardDescription>Настройки на базата данни</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Честота на резервни копия</Label>
              <Input id="backup-frequency" defaultValue="Дневно" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="auto-backup" />
              <Label htmlFor="auto-backup">Автоматични резервни копия</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="retention-days">Запазване (дни)</Label>
              <Input id="retention-days" defaultValue="30" />
            </div>
            <Button variant="outline" className="w-full">
              Създай резервно копие
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          <Save className="mr-2 h-4 w-4" />
          Запази настройките
        </Button>
      </div>
    </div>
  );
}
