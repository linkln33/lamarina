import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  Tag,
  Search
} from 'lucide-react'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'Нови технологии в металообработката',
      excerpt: 'Разглеждаме най-новите тенденции и технологии в областта на металообработката и как те влияят на индустрията.',
      content: 'Пълно съдържание на статията...',
      author: 'Инж. Петър Петров',
      date: '2024-09-25',
      readTime: '5 мин',
      category: 'Технологии',
      tags: ['технологии', 'иновации', 'металообработка'],
      featured: true,
      image: '/api/placeholder/600/300'
    },
    {
      id: 2,
      title: 'Как да изберем правилния материал за проекта',
      excerpt: 'Практически съвети за избор на подходящ метал за различни типове проекти и приложения.',
      content: 'Пълно съдържание на статията...',
      author: 'Инж. Мария Георгиева',
      date: '2024-09-22',
      readTime: '7 мин',
      category: 'Съвети',
      tags: ['материали', 'съвети', 'проекти'],
      featured: false,
      image: '/api/placeholder/600/300'
    },
    {
      id: 3,
      title: 'Поддръжка на метални конструкции',
      excerpt: 'Важни аспекти на поддръжката на метални конструкции за по-дълъг експлоатационен живот.',
      content: 'Пълно съдържание на статията...',
      author: 'Инж. Димитър Стоянов',
      date: '2024-09-20',
      readTime: '6 мин',
      category: 'Поддръжка',
      tags: ['поддръжка', 'конструкции', 'експлоатация'],
      featured: false,
      image: '/api/placeholder/600/300'
    },
    {
      id: 4,
      title: 'Екологични решения в металообработката',
      excerpt: 'Как можем да направим металообработката по-екологична и устойчива за бъдещето.',
      content: 'Пълно съдържание на статията...',
      author: 'Инж. Анна Иванова',
      date: '2024-09-18',
      readTime: '8 мин',
      category: 'Екология',
      tags: ['екология', 'устойчивост', 'зелена технология'],
      featured: true,
      image: '/api/placeholder/600/300'
    },
    {
      id: 5,
      title: 'Автоматизация в производствените процеси',
      excerpt: 'Ролята на автоматизацията в съвременната металообработка и нейните предимства.',
      content: 'Пълно съдържание на статията...',
      author: 'Инж. Георги Петров',
      date: '2024-09-15',
      readTime: '9 мин',
      category: 'Автоматизация',
      tags: ['автоматизация', 'производство', 'роботика'],
      featured: false,
      image: '/api/placeholder/600/300'
    },
    {
      id: 6,
      title: 'Безопасност в работилницата',
      excerpt: 'Основни правила и практики за безопасна работа в металообработващи работилници.',
      content: 'Пълно съдържание на статията...',
      author: 'Инж. Стоян Димитров',
      date: '2024-09-12',
      readTime: '4 мин',
      category: 'Безопасност',
      tags: ['безопасност', 'работилница', 'правила'],
      featured: false,
      image: '/api/placeholder/600/300'
    }
  ]

  const categories = ['Всички', 'Технологии', 'Съвети', 'Поддръжка', 'Екология', 'Автоматизация', 'Безопасност']

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
                Блог
              </h1>
              
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Бъдете в течение с новостите в индустрията и нашата компания
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Търси статии..."
                  className="pl-10 pr-4 py-2 w-full border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Избрани статии</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.filter(post => post.featured).map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                    <div className="text-muted-foreground">Изображение</div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <Badge className="bg-primary text-primary-foreground">Избрано</Badge>
                    </div>
                    
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    
                    <p className="text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Прочети статията
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Всички статии</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                    <div className="text-muted-foreground">Изображение</div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.featured && (
                        <Badge className="bg-primary text-primary-foreground">Избрано</Badge>
                      )}
                    </div>
                    
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {post.excerpt}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Прочети
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Абонирайте се за нашия бюлетин</h2>
            <p className="text-xl mb-8 opacity-90">
              Получавайте най-новите статии и новости от индустрията директно в пощенската си кутия
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Вашият имейл"
                className="flex-1 px-4 py-2 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
              />
              <Button variant="secondary" className="whitespace-nowrap">
                Абонирай се
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
