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
  Clock,
  Shield,
  Award
} from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      icon: Wrench,
      title: 'Огъване на листов метал',
      description: 'Точно огъване на различни дебелини и материали с модерно оборудване',
      features: ['До 6мм дебелина', 'Всички метали', 'Прецизност ±0.1мм'],
      price: 'от 25 лв/м²',
      color: 'warning'
    },
    {
      icon: Scissors,
      title: 'Рязане и обработка',
      description: 'Прецизно рязане с лазерни и плазмени машини за най-добро качество',
      features: ['Лазерно рязане', 'Плазмено рязане', 'Газово рязане'],
      price: 'от 15 лв/м²',
      color: 'accent'
    },
    {
      icon: Zap,
      title: 'Заваръчни работи',
      description: 'Професионални заваръчни работи от сертифицирани специалисти',
      features: ['TIG заваряване', 'MIG заваряване', 'Дъгово заваряване'],
      price: 'от 45 лв/час',
      color: 'success'
    },
    {
      icon: Settings,
      title: 'Персонализирани решения',
      description: 'Индивидуални проекти според вашите специфични нужди и изисквания',
      features: ['Консултации', '3D дизайн', 'Прототипиране'],
      price: 'По договаряне',
      color: 'primary'
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Консултация',
      description: 'Обсъждаме вашите нужди и изисквания за проекта'
    },
    {
      step: '02',
      title: 'Оферта',
      description: 'Подготвяме детайлна оферта с цени и срокове'
    },
    {
      step: '03',
      title: 'Производство',
      description: 'Изпълняваме проекта с най-високи стандарти на качество'
    },
    {
      step: '04',
      title: 'Доставка',
      description: 'Доставяме готовия продукт в срок'
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="w-fit bg-white/10 text-white border-white/20 hover:bg-white/20 mb-6">
                <Award className="w-4 h-4 mr-2" />
                Нашите услуги
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                Професионални услуги за металообработка
              </h1>
              
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Предлагаме пълен спектър от услуги за металообработка с над 30 години опит в индустрията
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-${service.color}/10 text-${service.color} border-${service.color}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-primary">{service.price}</span>
                      <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Научи повече
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Нашият процес</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Как работим с вас от първоначалната идея до готовия продукт
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Защо да изберете нас?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Нашите предимства, които ни правят най-добрият избор за вашия проект
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary border-primary/20 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <CardTitle>Гарантирано качество</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Всички наши продукти са с гарантирано качество и сертификати.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-success/10 text-success border-success/20 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <CardTitle>Бързо изпълнение</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Спазваме сроковете за доставка и винаги информираме за напредъка.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-warning/10 text-warning border-warning/20 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <CardTitle>30+ години опит</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Над три десетилетия опит в металообработката и хиляди успешни проекта.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Готови за следващия си проект?</h2>
            <p className="text-xl mb-8 opacity-90">
              Свържете се с нас днес за безплатна консултация и оферта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Направи запитване
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Позвъни сега
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
