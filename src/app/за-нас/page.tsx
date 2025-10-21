import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Wrench, 
  Shield, 
  Award, 
  Users, 
  Clock, 
  MapPin,
  Phone,
  Mail,
  Globe
} from 'lucide-react'

export const metadata = {
  title: 'За нас - LaMarina.bg | Специалисти в огъването на ламарина',
  description: 'LaMarina.bg – специалисти в огъването на ламарина и изграждането на покривни системи. Над 30+ години опит и стотици доволни клиенти в Пловдив и Асеновград.',
  keywords: 'за нас, фирма ламарина, покривни обшивки, опит, Пловдив, Асеновград, огъване ламарина',
  openGraph: {
    title: 'За нас - LaMarina.bg',
    description: 'Специалисти в огъването на ламарина и покривните системи в България.',
    locale: 'bg_BG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lamarina.bg/за-нас',
    languages: {
      'bg': 'https://lamarina.bg/за-нас',
      'en': 'https://lamarina.bg/en/about'
    }
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">
                За нас
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                LaMarina.bg
                <span className="block text-blue-400">Специалисти в металообработката</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Над 30+ години опит в огъването на ламарина, производството на покривни системи и обшивки. 
                Работим в Пловдив, Асеновград и цяла България.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Нашата история
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  LaMarina.bg започва като малко семейно предприятие в Пловдив през 1990-те години. 
                  Специализирани в огъването на ламарина и производството на покривни системи, 
                  постепенно разрастваме дейността си и ставаме лидер в региона.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Днес обслужваме клиенти в цяла България, като предлагаме висококачествени 
                  решения за индустриални и жилищни сгради. Нашият опит и професионализъм 
                  са гаранция за отлично качество на всеки проект.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="outline" className="px-4 py-2">
                    <Award className="w-4 h-4 mr-2" />
                    30+ години опит
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <Users className="w-4 h-4 mr-2" />
                    500+ проекта
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <Shield className="w-4 h-4 mr-2" />
                    100% доволни клиенти
                  </Badge>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <Wrench className="h-24 w-24 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Нашите ценности
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Качество, надежност и професионализъм върху които градим доверието на нашите клиенти
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Качество</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Използваме само висококачествени материали и модерно оборудване 
                    за гарантиране на отлично качество на всеки проект.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Надежност</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Спазваме сроковете за изпълнение и предлагаме дългосрочни гаранции 
                    за всички нашите услуги и продукти.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Професионализъм</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Нашият екип се състои от опитни специалисти с дългогодишен опит 
                    в металообработката и покривните системи.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Свържете се с нас
              </h2>
              <p className="text-xl text-muted-foreground">
                Работим в Пловдив, Асеновград и цяла България
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Адрес</h3>
                  <p className="text-muted-foreground">
                    с. Болярци п.к.4114<br />
                    Обл. Пловдивска
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Телефон</h3>
                  <p className="text-muted-foreground">
                    +359 2 123 4567
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Имейл</h3>
                  <p className="text-muted-foreground">
                    info@lamarina.bg
                  </p>
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
