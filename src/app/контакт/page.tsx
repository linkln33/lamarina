import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle,
  Building,
  Users,
  Award
} from 'lucide-react'

export const metadata = {
  title: 'Контакт - LaMarina.bg | Огъване на ламарина в Пловдив и Асеновград',
  description: 'Свържете се с нас за оферта или консултация. Работим в Пловдив, Асеновград и цяла България. Телефон, имейл, адрес и работно време.',
  keywords: 'контакт, оферта, телефон, ламарина Пловдив, огъване ламарина Асеновград, металообработка България',
  openGraph: {
    title: 'Контакт с LaMarina.bg',
    description: 'Свържете се с нас за професионални услуги по металообработка.',
    locale: 'bg_BG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lamarina.bg/контакт',
    languages: {
      'bg': 'https://lamarina.bg/контакт',
      'en': 'https://lamarina.bg/en/contact'
    }
  }
}

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Адрес',
      details: [
        'с. Болярци п.к.4114',
        'Обл. Пловдивска',
        'България'
      ],
      color: 'primary'
    },
    {
      icon: Phone,
      title: 'Телефон',
      details: [
        '+359 2 123 4567',
        '+359 2 123 4568',
        'Работно време: 8:00-17:00'
      ],
      color: 'success'
    },
    {
      icon: Mail,
      title: 'Имейл',
      details: [
        'info@lamarina.bg',
        'sales@lamarina.bg',
        'support@lamarina.bg'
      ],
      color: 'warning'
    },
    {
      icon: Clock,
      title: 'Работно време',
      details: [
        'Понеделник - Петък: 8:00-17:00',
        'Събота: 9:00-13:00',
        'Неделя: Почивен ден'
      ],
      color: 'accent'
    }
  ]

  const serviceAreas = [
    {
      city: 'Пловдив',
      description: 'Огъване на ламарина, покривни системи и обшивки',
      distance: '15 км',
      status: 'Активен'
    },
    {
      city: 'Асеновград',
      description: 'Метални покриви, покривни панели и улуци',
      distance: '8 км',
      status: 'Активен'
    },
    {
      city: 'София',
      description: 'Индустриални покривни системи и обшивки',
      distance: '120 км',
      status: 'Активен'
    },
    {
      city: 'Варна',
      description: 'Морски покриви и специализирани обшивки',
      distance: '200 км',
      status: 'Активен'
    },
    {
      city: 'Бургас',
      description: 'Покривни системи и металообработка',
      distance: '180 км',
      status: 'Активен'
    },
    {
      city: 'Русе',
      description: 'Покривни панели и обшивки',
      distance: '250 км',
      status: 'Активен'
    }
  ]

  const companyStats = [
    {
      icon: Building,
      title: '30+ години опит',
      description: 'В металообработката и покривните системи'
    },
    {
      icon: Users,
      title: '500+ проекта',
      description: 'Успешно завършени в цяла България'
    },
    {
      icon: Award,
      title: '100% доволни клиенти',
      description: 'Гарантираме качество и надежност'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">
                Контакт
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Свържете се с нас
                <span className="block text-blue-400">за безплатна консултация</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Работим в Пловдив, Асеновград и цяла България. 
                Свържете се с нас за оферта или консултация по вашия проект.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Контактна информация
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Различни начини да се свържете с нас
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-${info.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <info.icon className={`h-8 w-8 text-${info.color}-600`} />
                    </div>
                    <CardTitle>{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground mb-1">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Изпратете запитване
                </h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Име *</Label>
                      <Input id="firstName" placeholder="Вашето име" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input id="lastName" placeholder="Вашата фамилия" required />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Имейл *</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" placeholder="+359 2 123 4567" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Тема *</Label>
                    <Input id="subject" placeholder="Тема на запитването" required />
                  </div>

                  <div>
                    <Label htmlFor="message">Съобщение *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Опишете вашия проект или нужди..." 
                      className="min-h-[120px]"
                      required 
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-5 w-5" />
                    Изпрати запитване
                  </Button>
                </form>
              </div>

              {/* Map Placeholder */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Нашето местоположение
                </h2>
                <div className="aspect-video bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">с. Болярци</h3>
                    <p className="text-blue-200">Обл. Пловдивска, България</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Безплатна консултация</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Бърза оферта в рамките на 24 часа</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Професионален съвет</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Обслужвани райони
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Работим в основните градове на България
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceAreas.map((area, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{area.city}</CardTitle>
                      <Badge variant="secondary">{area.distance}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{area.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Статус:</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {area.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Защо да изберете нас
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Над 30 години опит в металообработката
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {companyStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                  <p className="opacity-90">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
