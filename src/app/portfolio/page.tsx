import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ExternalLink, 
  Calendar, 
  User, 
  Clock,
  Wrench,
  Scissors,
  Zap,
  Settings
} from 'lucide-react'

export default function PortfolioPage() {
  // Move large data to separate file or database
  const portfolioItems = [
    {
      id: 1,
      title: 'Индустриална конструкция за фабрика',
      description: 'Изработка на сложна метална конструкция за нов производствен цех',
      image: '/api/placeholder/600/400',
      category: 'Конструкции',
      client: 'Техно Инвест ООД',
      date: '2024-08-15',
      duration: '3 седмици',
      technologies: ['TIG заваряване', 'Огъване', 'Лазерно рязане'],
      icon: Wrench,
      featured: true
    },
    {
      id: 2,
      title: 'Персонализирана ограда за вила',
      description: 'Дизайн и изработка на уникална метална ограда с декоративни елементи',
      image: '/api/placeholder/600/400',
      category: 'Декоративни елементи',
      client: 'Частен клиент',
      date: '2024-07-22',
      duration: '2 седмици',
      technologies: ['MIG заваряване', 'Полиране', 'Покриване'],
      icon: Settings,
      featured: true
    },
    {
      id: 3,
      title: 'Автомобилни части за реставрация',
      description: 'Възстановяване на редки автомобилни части с оригинални размери',
      image: '/api/placeholder/600/400',
      category: 'Автомобилни части',
      client: 'Класик Карс',
      date: '2024-06-10',
      duration: '4 седмици',
      technologies: ['Точно копиране', 'TIG заваряване', 'Шлифоване'],
      icon: Zap,
      featured: false
    },
    {
      id: 4,
      title: 'Метален мебел за офис',
      description: 'Съвременен офисен мебел с метална основа и дървени елементи',
      image: '/api/placeholder/600/400',
      category: 'Мебели',
      client: 'Креатив Студио',
      date: '2024-05-28',
      duration: '2 седмици',
      technologies: ['Лазерно рязане', 'Огъване', 'Покриване'],
      icon: Scissors,
      featured: false
    },
    {
      id: 5,
      title: 'Специализирано оборудване',
      description: 'Изработка на уникално оборудване за производствени процеси',
      image: '/api/placeholder/600/400',
      category: 'Оборудване',
      client: 'Метал Про ООД',
      date: '2024-04-12',
      duration: '6 седмици',
      technologies: ['3D дизайн', 'Прототипиране', 'TIG заваряване'],
      icon: Settings,
      featured: true
    },
    {
      id: 6,
      title: 'Декоративни елементи за ресторант',
      description: 'Метални декоративни елементи за модерен ресторант',
      image: '/api/placeholder/600/400',
      category: 'Декорация',
      client: 'Гурме Ресторант',
      date: '2024-03-20',
      duration: '3 седмици',
      technologies: ['Художествено заваряване', 'Полиране', 'Покриване'],
      icon: Zap,
      featured: false
    }
  ]

  const categories = ['Всички', 'Конструкции', 'Декоративни елементи', 'Автомобилни части', 'Мебели', 'Оборудване', 'Декорация']

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
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                Нашето портфолио
              </h1>
              
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Разгледайте някои от нашите успешни проекти и вижте качеството на работата ни
              </p>
            </div>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                      <item.icon className="h-16 w-16 text-muted-foreground" />
                    </div>
                    {item.featured && (
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        Избрано
                      </Badge>
                    )}
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{item.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {item.date}
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                    
                    <p className="text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Клиент:</span>
                        <span className="ml-1 font-medium">{item.client}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Продължителност:</span>
                        <span className="ml-1 font-medium">{item.duration}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {item.technologies.slice(0, 2).map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {item.technologies.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.technologies.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Виж детайли
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Нашите постижения</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Цифри, които говорят за качеството и опита ни
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">Завършени проекта</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">30+</div>
                  <div className="text-muted-foreground">Години опит</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">Доволни клиенти</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-muted-foreground">Поддръжка</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Искате да работим заедно?</h2>
            <p className="text-xl mb-8 opacity-90">
              Свържете се с нас за безплатна консултация по вашия проект
            </p>
            <Button size="lg" variant="secondary">
              Направи запитване
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
