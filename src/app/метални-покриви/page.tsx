import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  Building, 
  Factory, 
  ArrowRight, 
  CheckCircle,
  Shield,
  Award,
  MapPin,
  Phone,
  Mail,
  Star
} from 'lucide-react'

export const metadata = {
  title: 'Метални покриви - Покривни системи и обшивки | LaMarina.bg',
  description: 'Професионални метални покриви, покривни системи и обшивки в Пловдив, Асеновград и цяла България. Високо качество и дългогодишна гаранция.',
  keywords: 'метални покриви, покривни системи, обшивки, Пловдив, Асеновград, покривни панели, сандвич панели, покривни материали',
  openGraph: {
    title: 'Метални покриви и покривни системи | LaMarina.bg',
    description: 'Професионални метални покриви и покривни системи в България.',
    locale: 'bg_BG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lamarina.bg/метални-покриви',
    languages: {
      'bg': 'https://lamarina.bg/метални-покриви',
      'en': 'https://lamarina.bg/en/metal-roofing'
    }
  }
}

export default function MetalRoofingPage() {
  const roofingTypes = [
    {
      icon: Home,
      title: 'Жилищни покриви',
      description: 'Модерни метални покриви за частни домове и вили',
      features: ['Трапецови профили', 'Вълнообразни листове', 'Сандвич панели'],
      price: 'от 35 лв/м²',
      color: 'primary',
      cities: ['Пловдив', 'Асеновград', 'София', 'Варна']
    },
    {
      icon: Building,
      title: 'Търговски покриви',
      description: 'Покривни системи за търговски и офисни сгради',
      features: ['Голям обхват', 'Бърз монтаж', 'Енергийна ефективност'],
      price: 'от 28 лв/м²',
      color: 'success',
      cities: ['Пловдив', 'Асеновград', 'Бургас', 'Русе']
    },
    {
      icon: Factory,
      title: 'Индустриални покриви',
      description: 'Специализирани покривни системи за производствени сгради',
      features: ['Високи натоварвания', 'Дълготрайност', 'Лесно поддържане'],
      price: 'от 32 лв/м²',
      color: 'warning',
      cities: ['Пловдив', 'Асеновград', 'Плевен', 'Стара Загора']
    }
  ]

  const materials = [
    {
      name: 'Трапецови профили',
      description: 'Класически профил за покриви и обшивки',
      thickness: '0.5-1.0мм',
      coating: 'Цинк, полиестер',
      price: 'от 18 лв/м²'
    },
    {
      name: 'Вълнообразни листове',
      description: 'Традиционен профил с вълнообразна форма',
      thickness: '0.4-0.8мм',
      coating: 'Цинк, полиестер, PVDF',
      price: 'от 15 лв/м²'
    },
    {
      name: 'Сандвич панели',
      description: 'Топлоизолационни панели за покриви и стени',
      thickness: '40-200мм',
      coating: 'Метал + изолация',
      price: 'от 45 лв/м²'
    },
    {
      name: 'Метални керемиди',
      description: 'Модерни метални керемиди с дълготрайност',
      thickness: '0.5-0.7мм',
      coating: 'Полиестер, PVDF',
      price: 'от 25 лв/м²'
    }
  ]

  const advantages = [
    {
      icon: Shield,
      title: 'Дълготрайност',
      description: 'Металните покриви издържат над 50 години при правилно поддържане'
    },
    {
      icon: Award,
      title: 'Качество',
      description: 'Използваме само висококачествени материали от проверени производители'
    },
    {
      icon: Star,
      title: 'Естетика',
      description: 'Модерен и привлекателен външен вид за всяка сграда'
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
                Метални покриви
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Метални покриви и
                <span className="block text-blue-400">покривни системи</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Професионални метални покриви, покривни системи и обшивки 
                в Пловдив, Асеновград и цяла България. Високо качество и дългогодишна гаранция.
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

        {/* Roofing Types */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Типове покривни системи
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Специализирани решения за различни типове сгради и нужди
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {roofingTypes.map((type, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 bg-${type.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <type.icon className={`h-8 w-8 text-${type.color}-600`} />
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    <ul className="space-y-2 mb-4">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-lg font-semibold text-primary mb-4">
                      {type.price}
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Работим в:</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {type.cities.map((city, idx) => (
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

        {/* Materials */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Материали и профили
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Широк избор от висококачествени материали за всеки проект
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {materials.map((material, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{material.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{material.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Дебелина:</span>
                        <span className="text-sm text-muted-foreground">{material.thickness}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Покритие:</span>
                        <span className="text-sm text-muted-foreground">{material.coating}</span>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-primary mb-4">
                      {material.price}
                    </div>
                    <Button className="w-full" variant="outline">
                      Запитване
                    </Button>
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
                Предимства на металните покриви
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Защо да изберете метални покриви за вашия проект
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

        {/* Local SEO Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Работим в цяла България
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Специализирани услуги за метални покриви в основните градове
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Пловдив</h3>
                <p className="opacity-90">Метални покриви и покривни системи</p>
              </div>
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Асеновград</h3>
                <p className="opacity-90">Покривни обшивки и панели</p>
              </div>
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">София</h3>
                <p className="opacity-90">Индустриални покривни системи</p>
              </div>
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Варна</h3>
                <p className="opacity-90">Морски покриви и обшивки</p>
              </div>
            </div>

            <div className="text-center mt-12">
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
