import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  Wrench,
  Scissors,
  Zap,
  Settings,
  ArrowRight,
  Star,
  Award
} from 'lucide-react'

export const metadata = {
  title: 'Огъване на ламарина в Пловдив | LaMarina.bg - Професионални услуги',
  description: 'Професионално огъване на ламарина в Пловдив. Покривни системи, обшивки и металообработка. Безплатна консултация и оферта. Работим в Пловдив и околностите.',
  keywords: 'огъване ламарина Пловдив, покривни системи Пловдив, металообработка Пловдив, обшивки Пловдив, покривни панели Пловдив, заваръчни работи Пловдив',
  openGraph: {
    title: 'Огъване на ламарина в Пловдив | LaMarina.bg',
    description: 'Професионални услуги за огъване на ламарина в Пловдив и околностите.',
    locale: 'bg_BG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lamarina.bg/огъване-ламарина-пловдив',
    languages: {
      'bg': 'https://lamarina.bg/огъване-ламарина-пловдив',
      'en': 'https://lamarina.bg/en/metal-bending-plovdiv'
    }
  }
}

export default function PlovdivMetalBendingPage() {
  const services = [
    {
      icon: Wrench,
      title: 'Огъване на листов метал',
      description: 'Точно огъване на различни дебелини и материали в Пловдив',
      features: ['До 6мм дебелина', 'Всички метали', 'Прецизност ±0.1мм'],
      price: 'от 25 лв/м²',
      color: 'warning'
    },
    {
      icon: Scissors,
      title: 'Рязане и обработка',
      description: 'Прецизно рязане с лазерни и плазмени машини в Пловдив',
      features: ['Лазерно рязане', 'Плазмено рязане', 'Газово рязане'],
      price: 'от 15 лв/м²',
      color: 'accent'
    },
    {
      icon: Zap,
      title: 'Заваръчни работи',
      description: 'Професионални заваръчни работи в Пловдив от сертифицирани специалисти',
      features: ['TIG заваряване', 'MIG заваряване', 'Дъгово заваряване'],
      price: 'от 45 лв/час',
      color: 'success'
    },
    {
      icon: Settings,
      title: 'Покривни системи',
      description: 'Метални покривни системи и обшивки за Пловдив',
      features: ['Трапецови профили', 'Сандвич панели', 'Улуци и водосточни системи'],
      price: 'от 35 лв/м²',
      color: 'primary'
    }
  ]

  const plovdivAreas = [
    'Център', 'Тракия', 'Коматево', 'Студентски град', 'Мараша',
    'Изгрев', 'Западен', 'Южен', 'Северен', 'Източен'
  ]

  const advantages = [
    {
      icon: MapPin,
      title: 'Локално присъствие',
      description: 'Работим директно в Пловдив и околностите'
    },
    {
      icon: Clock,
      title: 'Бързо обслужване',
      description: 'Безплатна консултация и оферта в рамките на 24 часа'
    },
    {
      icon: Award,
      title: '30+ години опит',
      description: 'Дългогодишен опит в металообработката в Пловдив'
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
                Пловдив
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Огъване на ламарина в
                <span className="block text-blue-400">Пловдив</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Професионални услуги за огъване на ламарина, покривни системи и металообработка 
                в Пловдив и околностите. Безплатна консултация и оферта.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Phone className="mr-2 h-5 w-5" />
                  +359 2 123 4567
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                  Направи запитване
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Нашите услуги в Пловдив
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Пълна гама от услуги за металообработка в Пловдив
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 bg-${service.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <service.icon className={`h-8 w-8 text-${service.color}-600`} />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-lg font-semibold text-primary mb-4">
                      {service.price}
                    </div>
                    <Button className="w-full" variant="outline">
                      Направи запитване
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Plovdiv Areas */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Обслужвани райони в Пловдив
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Работим във всички квартали на Пловдив
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {plovdivAreas.map((area, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">{area}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Защо да изберете нас в Пловдив
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Предимства на работата с нас в Пловдив
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <advantage.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{advantage.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{advantage.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Готови за проект в Пловдив?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Свържете се с нас за безплатна консултация и оферта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Phone className="mr-2 h-5 w-5" />
                +359 2 123 4567
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                <Mail className="mr-2 h-5 w-5" />
                info@lamarina.bg
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                4.9/5 рейтинг
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                30+ години опит
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                100% доволни клиенти
              </Badge>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
