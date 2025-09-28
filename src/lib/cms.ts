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

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
  order: number;
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
      description: "Защо лазерното рязане е най-добрият избор за вашия проект",
      image: "/api/placeholder/400/300",
      date: "2024-01-15",
      author: "LAMARINA BG Team",
      order: 1
    },
    {
      id: "blog-2",
      title: "Избор на правилния метал",
      description: "Ръководство за избор на подходящ материал",
      image: "/api/placeholder/400/300",
      date: "2024-01-10",
      author: "LAMARINA BG Team",
      order: 2
    },
    {
      id: "blog-3",
      title: "Поддръжка на метални конструкции",
      description: "Как да поддържате вашите метални изделия",
      image: "/api/placeholder/400/300",
      date: "2024-01-05",
      author: "LAMARINA BG Team",
      order: 3
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
