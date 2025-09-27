import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wrench, Award, Users, Clock, Shield, Target } from 'lucide-react'

export default function AboutPage() {
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
                30+ години опит
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                За La Marina
              </h1>
              
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Фаворит в производството на метални покривни системи. Символ на новаторство, съчетано с професионализъм в страната и зад граница.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Нашата история</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Фирмата е създадена през 1989 година и е фаворит в производството на метални покривни системи. В страната и зад граница е символ на новаторство, съчетано с професионализъм.
                  </p>
                  <p>
                    Строго специализираната насоченост на фирмата обуславя и гарантира прецизната изработка и перфектното качество на продуктите. То, съчетано с добрата ценова политика е извоювало сигурност у партньорите ни.
                  </p>
                  <p>
                    Производствените мощности са с капацитет 4000 - 6000 кв.м, което предполага и кратките срокове за доставка. Производствената база и пласмент на фирмата се намират в северозападната промишлена зона на с. Болярци, обл. Пловдивска.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <Card className="glass-card bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-primary/20 rounded-lg">
                          <Wrench className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Модерно оборудване</h3>
                          <p className="text-muted-foreground">Най-новите машини за прецизна обработка</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-success/20 rounded-lg">
                          <Shield className="h-6 w-6 text-success" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Сертифицирано качество</h3>
                          <p className="text-muted-foreground">ISO сертификати и гарантирано качество</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-warning/20 rounded-lg">
                          <Clock className="h-6 w-6 text-warning" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Бързо изпълнение</h3>
                          <p className="text-muted-foreground">Спазване на сроковете за доставка</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Нашите ценности</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Основните принципи, които ни водят в работата си всеки ден
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary border-primary/20 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6" />
                  </div>
                  <CardTitle>Качество</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Стремим се към най-високите стандарти на качество във всички наши проекти.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-success/10 text-success border-success/20 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle>Клиентска удовлетвореност</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Нашите клиенти са в центъра на всичко, което правим.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-warning/10 text-warning border-warning/20 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <CardTitle>Иновации</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Постоянно подобряваме процесите си с най-новите технологии.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Нашият екип</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Опитни специалисти, които правят възможно всичко
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Инженери</h3>
                  <p className="text-muted-foreground">15+ специалисти</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Wrench className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Техници</h3>
                  <p className="text-muted-foreground">25+ опитни майстори</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Контрол на качеството</h3>
                  <p className="text-muted-foreground">5+ сертифицирани инспектори</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
