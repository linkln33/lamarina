import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Wrench, 
  Scissors, 
  Zap, 
  Settings, 
  ArrowRight, 
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react'

export const metadata = {
  title: 'Услуги - Огъване на ламарина, обшивки, улуци и панели | LaMarina.bg',
  description: 'Разгледайте всички услуги: огъване на ламарина, производство на обшивки, монтаж на улуци, покривни системи и сандвич панели в Пловдив и цяла България.',
  keywords: 'огъване на ламарина, улуци, покривни панели, Пловдив, обшивки, сандвич панели, покривни системи, металообработка',
  openGraph: {
    title: 'Услуги - Огъване на ламарина и покривни системи',
    description: 'Професионални услуги за огъване на ламарина, покривни системи и обшивки в България.',
    locale: 'bg_BG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lamarina.bg/услуги',
    languages: {
      'bg': 'https://lamarina.bg/услуги',
      'en': 'https://lamarina.bg/en/services'
    }
  }
}

export default function ServicesPage() {
  const services = [
    {
      icon: Wrench,
      title: 'Огъване на листов метал',
      description: 'Точно огъване на различни дебелини и материали с модерно оборудване',
      features: ['До 6мм дебелина', 'Всички метали', 'Прецизност ±0.1мм'],
      price: 'от 25 лв/м²',
      color: 'warning',
      keywords: 'огъване ламарина, огъване метал, листов метал'
    },
    {
      icon: Scissors,
      title: 'Рязане и обработка',
      description: 'Прецизно рязане с лазерни и плазмени машини за най-добро качество',
      features: ['Лазерно рязане', 'Плазмено рязане', 'Газово рязане'],
      price: 'от 15 лв/м²',
      color: 'accent',
      keywords: 'рязане метал, лазерно рязане, плазмено рязане'
    },
    {
      icon: Zap,
      title: 'Заваръчни работи',
      description: 'Професионални заваръчни работи от сертифицирани специалисти',
      features: ['TIG заваряване', 'MIG заваряване', 'Дъгово заваряване'],
      price: 'от 45 лв/час',
      color: 'success',
      keywords: 'заваръчни работи, TIG заваряване, MIG заваряване'
    },
    {
      icon: Settings,
      title: 'Персонализирани решения',
      description: 'Индивидуални проекти според вашите специфични изисквания',
      features: ['Дизайн по поръчка', 'Сложни форми', 'Бързо изпълнение'],
      price: 'по договаряне',
      color: 'primary',
      keywords: 'персонализирани решения, проекти по поръчка, метални конструкции'
    }
  ]

  const specializations = [
    {
      title: 'Покривни системи',
      description: 'Метални покривни системи, сандвич панели и обшивки',
      cities: ['Пловдив', 'Асеновград', 'София', 'Варна']
    },
    {
      title: 'Фасадни обшивки',
      description: 'Модерни фасадни обшивки за индустриални и жилищни сгради',
      cities: ['Пловдив', 'Асеновград', 'Плевен', 'Стара Загора']
    },
    {
      title: 'Улуци и водосточни системи',
      description: 'Производство и монтаж на улуци и водосточни системи',
      cities: ['Пловдив', 'Асеновград', 'Бургас', 'Русе']
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
                Нашите услуги
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Професионални услуги
                <span className="block text-blue-400">за металообработка</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Огъване на ламарина, покривни системи, обшивки и персонализирани решения 
                в Пловдив, Асеновград и цяла България.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Направи запитване
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                  Виж портфолио
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Основни услуги
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Пълна гама от услуги за металообработка и покривни системи
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

        {/* Specializations */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Специализации
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Фокусирани решения за различни типове проекти
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {specializations.map((spec, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{spec.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{spec.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Работим в:</h4>
                      <div className="flex flex-wrap gap-2">
                        {spec.cities.map((city, idx) => (
                          <Badge key={idx} variant="secondary">
                            {city}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Научи повече
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Как работим
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Стъпка по стъпка процес за осигуряване на най-доброто качество
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Консултация</h3>
                <p className="text-muted-foreground">
                  Обсъждаме вашите нужди и изисквания за проекта
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Оферта</h3>
                <p className="text-muted-foreground">
                  Подготвяме детайлна оферта с цени и срокове
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Изпълнение</h3>
                <p className="text-muted-foreground">
                  Професионално изпълнение с високо качество
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Гаранция</h3>
                <p className="text-muted-foreground">
                  Предоставяме гаранция за всички нашите услуги
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Готови за нов проект?
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
