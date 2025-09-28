// CMS Data Types
export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  experience: string;
  ctaPrimary: string;
  ctaSecondary: string;
  backgroundImage?: string;
  stats: {
    projects: string;
    experience: string;
    clients: string;
  };
  features: {
    equipment: {
      title: string;
      description: string;
    };
    quality: {
      title: string;
      description: string;
    };
    speed: {
      title: string;
      description: string;
    };
  };
  carousel: {
    images: {
      id: string;
      url: string;
      alt: string;
      title: string;
    }[];
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  order: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  count: string;
  order: number;
}

export interface BlogPost extends Record<string, unknown> {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  slug: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
}

export interface HomepageContent {
  hero: HeroSection;
  services: Service[];
  portfolio: PortfolioItem[];
  blog: BlogPost[];
  contact: ContactInfo;
}

// Mock data - in production this would come from a database
export const defaultHomepageContent: HomepageContent = {
  hero: {
    id: "hero-1",
    title: "LAMARINA BG",
    subtitle: "Метални покривни системи",
    description: "Фаворит в производството на метални покривни системи. Символ на новаторство, съчетано с професионализъм.",
    experience: "30+ години опит",
    ctaPrimary: "Направи запитване",
    ctaSecondary: "Нашите услуги",
    stats: {
      projects: "500+",
      experience: "30+",
      clients: "100%"
    },
    features: {
      equipment: {
        title: "Професионално оборудване",
        description: "Модерни машини за прецизна обработка"
      },
      quality: {
        title: "Гарантирано качество",
        description: "Сертифицирани процеси и материали"
      },
      speed: {
        title: "Бързо изпълнение",
        description: "Спазване на сроковете за доставка"
      }
    },
    carousel: {
      images: [
        {
          id: "carousel-1",
          url: "/api/placeholder/800/600",
          alt: "Професионално оборудване",
          title: "Модерни машини за прецизна обработка"
        },
        {
          id: "carousel-2", 
          url: "/api/placeholder/800/600",
          alt: "Гарантирано качество",
          title: "Сертифицирани процеси и материали"
        },
        {
          id: "carousel-3",
          url: "/api/placeholder/800/600", 
          alt: "Бързо изпълнение",
          title: "Спазване на сроковете за доставка"
        }
      ]
    }
  },
  services: [
    {
      id: "service-1",
      title: "Огъване на листов метал",
      description: "Точно огъване на различни дебелини и материали с модерно оборудване",
      features: ["До 6мм дебелина", "Всички метали", "Прецизност ±0.1мм"],
      icon: "Wrench",
      color: "bg-warning/10 text-warning border-warning/20",
      order: 1
    },
    {
      id: "service-2",
      title: "Рязане и обработка",
      description: "Прецизно рязане с лазерни и плазмени машини за най-добро качество",
      features: ["Лазерно рязане", "Плазмено рязане", "Газово рязане"],
      icon: "Scissors",
      color: "bg-accent/10 text-accent border-accent/20",
      order: 2
    },
    {
      id: "service-3",
      title: "Заваръчни работи",
      description: "Професионални заваръчни работи от сертифицирани специалисти",
      features: ["TIG заваряване", "MIG заваряване", "Дъгово заваряване"],
      icon: "Zap",
      color: "bg-success/10 text-success border-success/20",
      order: 3
    },
    {
      id: "service-4",
      title: "Персонализирани решения",
      description: "Индивидуални проекти според вашите специфични нужди и изисквания",
      features: ["Консултации", "3D дизайн", "Прототипиране"],
      icon: "Settings",
      color: "bg-primary/10 text-primary border-primary/20",
      order: 4
    }
  ],
  portfolio: [
    {
      id: "portfolio-1",
      title: "Индустриален проект",
      description: "Метална конструкция за производствена сграда",
      image: "/api/placeholder/400/300",
      category: "Industrial",
      count: "50+ projects",
      order: 1
    },
    {
      id: "portfolio-2",
      title: "Жилищен проект",
      description: "Персонализирана метална ограда",
      image: "/api/placeholder/400/300",
      category: "Residential",
      count: "200+ projects",
      order: 2
    },
    {
      id: "portfolio-3",
      title: "Комерсиален проект",
      description: "Покривна конструкция за търговски център",
      image: "/api/placeholder/400/300",
      category: "Commercial",
      count: "150+ projects",
      order: 3
    }
  ],
  blog: [
    {
      id: "blog-1",
      title: "Предимства на лазерното рязане",
      content: "Лазерното рязане е модерна технология, която предлага множество предимства...",
      excerpt: "Защо лазерното рязане е най-добрият избор за вашия проект",
      author: "LAMARINA BG Team",
      authorId: "1",
      category: "Технологии",
      tags: ["лазер", "рязване", "метал"],
      slug: "predimstva-lazerno-ryazane",
      status: "published",
      views: 150,
      likes: 12,
      order: 1,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "blog-2",
      title: "Избор на правилния метал",
      content: "Изборът на подходящ метал е критичен за успеха на вашия проект...",
      excerpt: "Ръководство за избор на подходящ материал",
      author: "LAMARINA BG Team",
      authorId: "1",
      category: "Материали",
      tags: ["метал", "избор", "материали"],
      slug: "izbor-pravilen-metal",
      status: "published",
      views: 89,
      likes: 7,
      order: 2,
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z"
    },
    {
      id: "blog-3",
      title: "Поддръжка на метални конструкции",
      content: "Правилната поддръжка на метални конструкции е от съществено значение...",
      excerpt: "Как да поддържате вашите метални изделия",
      author: "LAMARINA BG Team",
      authorId: "1",
      category: "Поддръжка",
      tags: ["поддръжка", "конструкции", "метал"],
      slug: "poddrzhka-metallni-konstrukcii",
      status: "published",
      views: 203,
      likes: 18,
      order: 3,
      createdAt: "2024-01-05T10:00:00Z",
      updatedAt: "2024-01-05T10:00:00Z"
    }
  ],
  contact: {
    address: "С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово",
    phone: "+359 2 123 4567",
    email: "info@lamarina.bg",
    workingHours: "Понеделник - Петък: 8:00 - 17:00"
  }
};

// Local storage key for CMS data
const CMS_STORAGE_KEY = 'lamarina-cms-data';

// CMS API functions
export class CMS {
  static getHomepageContent(): HomepageContent {
    if (typeof window === 'undefined') {
      return defaultHomepageContent;
    }
    
    const stored = localStorage.getItem(CMS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing CMS data:', error);
        return defaultHomepageContent;
      }
    }
    return defaultHomepageContent;
  }

  static saveHomepageContent(content: HomepageContent): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(content));
    } catch (error) {
      console.error('Error saving CMS data:', error);
    }
  }

  static updateHeroSection(hero: HeroSection): void {
    const content = this.getHomepageContent();
    content.hero = hero;
    this.saveHomepageContent(content);
  }

  static updateServices(services: Service[]): void {
    const content = this.getHomepageContent();
    content.services = services;
    this.saveHomepageContent(content);
  }

  static updatePortfolio(portfolio: PortfolioItem[]): void {
    const content = this.getHomepageContent();
    content.portfolio = portfolio;
    this.saveHomepageContent(content);
  }

  static updateBlog(blog: BlogPost[]): void {
    const content = this.getHomepageContent();
    content.blog = blog;
    this.saveHomepageContent(content);
  }

  static updateContact(contact: ContactInfo): void {
    const content = this.getHomepageContent();
    content.contact = contact;
    this.saveHomepageContent(content);
  }
}

// Additional types needed for the application
export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'user';
  phone?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  id: string;
  key: string;
  value: unknown;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  category: string;
  updatedAt: string;
}

export interface AnalyticsEvent {
  id: string;
  eventType: string;
  entityType?: string;
  entityId?: string;
  userId?: string;
  metadata: Record<string, unknown>;
  timestamp: string;
}
