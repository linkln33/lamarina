"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'bg' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  bg: {
    // Navigation
    'nav.about': 'За нас',
    'nav.portfolio': 'Портфолио',
    'nav.services': 'Услуги',
    'nav.blog': 'News Room',
    'nav.products.title': 'Продукти',
    'nav.products.roofing': 'Покривни системи',
    'nav.products.structures': 'Метални конструкции',
    'nav.products.bending': 'Огъване на метали',
    'nav.products.cutting': 'Лазерно рязане',
    'nav.products.welding': 'Заваръчни работи',
    'nav.products.custom': 'Персонализирани решения',
    'nav.products.services': 'Услуги',
    'nav.shop': 'Посетете нашия магазин',
    'nav.news': 'Актуално',
    'about.description': 'ЛАМАРИНА БГ е водеща компания в България, специализирана в металообработка, огъване, рязане и заваръчни работи. С над 30 години опит в индустрията, ние предлагаме висококачествени решения за индустриални и частни клиенти.',
    'news.title': 'Актуално',
    'news.description': 'Последни новини и актуални събития от индустрията и нашата компания',
    'news.imagePlaceholder': 'Новости изображение',
    'news.article1.title': 'Нови технологии в металообработката',
    'news.article1.description': 'Въвеждаме нови CNC машини за по-прецизна обработка...',
    'news.article1.date': '15 Декември 2024',
    'news.article2.title': 'Специални цени за зимен сезон',
    'news.article2.description': 'Отстъпки до 20% на всички покривни системи...',
    'news.article2.date': '10 Декември 2024',
    'news.article3.title': 'Завършен проект в София',
    'news.article3.description': 'Успешно завършихме покривна система за индустриален обект...',
    'news.article3.date': '5 Декември 2024',
    'shop.description': 'Последни обяви и продукти от нашата галерия',
    'shop.imagePlaceholder': 'Изображение',
    'shop.product1.title': 'Метални покривни панели',
    'shop.product1.price': '45 лв/м²',
    'shop.product1.description': 'Висококачествени покривни панели',
    'shop.product2.title': 'Огъване на ламарина',
    'shop.product2.price': '12 лв/м',
    'shop.product2.description': 'Професионално огъване на различни дебелини',
    'shop.product3.title': 'Улуци и водосточни системи',
    'shop.product3.price': '25 лв/м',
    'shop.product3.description': 'Модерни водосточни системи',
    'shop.product4.title': 'Сандвич панели',
    'shop.product4.price': '38 лв/м²',
    'shop.product4.description': 'Термоизолационни сандвич панели',
    'shop.viewAll': 'Виж всички обяви',
    'services.service1.title': 'Огъване на листов метал',
    'services.service1.description': 'Точно огъване на различни дебелини и материали с модерно оборудване',
    'services.service1.feature1': 'До 6мм дебелина',
    'services.service1.feature2': 'Всички метали',
    'services.service1.feature3': 'Прецизност ±0.1мм',
    'services.service2.title': 'Рязане и обработка',
    'services.service2.description': 'Прецизно рязане с лазерни и плазмени машини за най-добро качество',
    'services.service2.feature1': 'Лазерно рязане',
    'services.service2.feature2': 'Плазмено рязане',
    'services.service2.feature3': 'Газово рязане',
    'services.service3.title': 'Заваръчни работи',
    'services.service3.description': 'Професионални заваръчни работи от сертифицирани специалисти',
    'services.service3.feature1': 'TIG заваряване',
    'services.service3.feature2': 'MIG заваряване',
    'services.service3.feature3': 'Дъгово заваряване',
    'services.service4.title': 'Персонализирани решения',
    'services.service4.description': 'Индивидуални проекти според вашите специфични нужди и изисквания',
    'services.service4.feature1': 'Консултации',
    'services.service4.feature2': '3D дизайн',
    'services.service4.feature3': 'Прототипиране',
    'services.learnMore': 'Научи повече',
    'contact.addressDetails': 'С. БОЛЯРЦИ п.к.4114\nОбл. Пловдивска, Общ. Садово\nСтопански Двор № 2\nGPS: N 42.0710533, E 24.9521083',
    
        // Hero
        'hero.title': 'LAMARINA BG',
        'hero.subtitle': 'Метални покривни системи',
        'hero.description': 'Фаворит в производството на метални покривни системи. Символ на новаторство, съчетано с професионализъм.',
    'hero.experience': '30+ години опит',
    'hero.cta.primary': 'Направи запитване',
    'hero.cta.secondary': 'Нашите услуги',
    
    // About
    'about.title': 'ЛАМАРИНА БГ',
    'about.history': 'Нашата история',
    'about.values': 'Нашите ценности',
    'about.team': 'Нашият екип',
    'about.story': 'Фирмата е създадена през 1989 година и е фаворит в производството на метални покривни системи. В страната и зад граница е символ на новаторство, съчетано с професионализъм.',
    'about.quality': 'Строго специализираната насоченост на фирмата обуславя и гарантира прецизната изработка и перфектното качество на продуктите. То, съчетано с добрата ценова политика е извоювало сигурност у партньорите ни.',
    'about.capacity': 'Производствените мощности са с капацитет 4000 - 6000 кв.м, което предполага и кратките срокове за доставка. Производствената база и пласмент на фирмата се намират в северозападната промишлена зона на с. Болярци, обл. Пловдивска.',
    
        // Services
        'services.title': 'Професионални услуги за металообработка',
        'services.description': 'Предлагаме пълен спектър от услуги за металообработка с над 30 години опит в индустрията',
        'services.bending': 'Огъване на листов метал',
        'services.bending.desc': 'Точно огъване на различни дебелини и материали с модерно оборудване',
        'services.bending.feature1': 'До 6мм дебелина',
        'services.bending.feature2': 'Всички метали',
        'services.bending.feature3': 'Прецизност ±0.1мм',
        'services.cutting': 'Рязане и обработка',
        'services.cutting.desc': 'Прецизно рязане с лазерни и плазмени машини за най-добро качество',
        'services.cutting.feature1': 'Лазерно рязане',
        'services.cutting.feature2': 'Плазмено рязане',
        'services.cutting.feature3': 'Газово рязане',
        'services.welding': 'Заваръчни работи',
        'services.welding.desc': 'Професионални заваръчни работи от сертифицирани специалисти',
        'services.welding.feature1': 'TIG заваряване',
        'services.welding.feature2': 'MIG заваряване',
        'services.welding.feature3': 'Дъгово заваряване',
        'services.custom': 'Персонализирани решения',
        'services.custom.desc': 'Индивидуални проекти според вашите специфични нужди и изисквания',
        'services.custom.feature1': 'Консултации',
        'services.custom.feature2': '3D дизайн',
        'services.custom.feature3': 'Прототипиране',
    
    // Portfolio
    'portfolio.title': 'Нашето портфолио',
    'portfolio.description': 'Разгледайте някои от нашите успешни проекти и вижте качеството на работата ни',
    'portfolio.all': 'Всички',
    'portfolio.featured': 'Избрано',
    
    // Blog
    'blog.title': 'Блог',
    'blog.description': 'Бъдете в течение с новостите в индустрията и нашата компания',
    'blog.search': 'Търси статии...',
    'blog.featured': 'Избрани статии',
    'blog.all': 'Всички статии',
    'blog.newsletter': 'Абонирайте се за нашия бюлетин',
    'blog.newsletter.desc': 'Получавайте най-новите статии и новости от индустрията директно в пощенската си кутия',
    'blog.subscribe': 'Абонирай се',
    
    // Contact
    'contact.title': 'Свържете се с нас',
    'contact.description': 'Имате въпроси или нужда от оферта? Свържете се с нас днес!',
    'contact.form.name': 'Име',
    'contact.form.lastname': 'Фамилия',
    'contact.form.email': 'Имейл',
    'contact.form.phone': 'Телефон',
    'contact.form.company': 'Компания',
    'contact.form.subject': 'Тема',
    'contact.form.message': 'Съобщение',
    'contact.form.send': 'Изпрати съобщение',
    'contact.info': 'Контактна информация',
    'contact.address': 'Адрес',
    'contact.phone': 'Телефон',
    'contact.email': 'Имейл',
    'contact.hours': 'Работно време',
    'contact.quick': 'Бърз контакт',
    'contact.call': 'Позвъни сега',
    'contact.email_btn': 'Изпрати имейл',
    'contact.whatsapp': 'WhatsApp',
    'contact.faq': 'Често задавани въпроси',
    'contact.faq.desc': 'Отговори на най-често задаваните въпроси от нашите клиенти',
    
    // Stats
    'stats.projects': 'Завършени проекта',
    'stats.experience': 'Години опит',
    'stats.clients': 'Доволни клиенти',
    
    // Features
    'features.equipment': 'Професионално оборудване',
    'features.equipment.desc': 'Модерни машини за прецизна обработка',
    'features.quality': 'Гарантирано качество',
    'features.quality.desc': 'Сертифицирани процеси и материали',
    'features.speed': 'Бързо изпълнение',
    'features.speed.desc': 'Спазване на сроковете за доставка',
    
    // Portfolio
    'portfolio.viewAll': 'Виж всички проекти',
    'portfolio.project1': 'Индустриален проект',
    'portfolio.project1.desc': 'Метална конструкция за производствена сграда',
    'portfolio.project2': 'Жилищен проект',
    'portfolio.project2.desc': 'Персонализирана метална ограда',
    'portfolio.project3': 'Комерсиален проект',
    'portfolio.project3.desc': 'Покривна конструкция за търговски център',
    
    // Blog
    'blog.readMore': 'Прочети повече',
    'blog.article1': 'Предимства на лазерното рязане',
    'blog.article1.desc': 'Защо лазерното рязане е най-добрият избор за вашия проект',
    'blog.article2': 'Избор на правилния метал',
    'blog.article2.desc': 'Ръководство за избор на подходящ материал',
    'blog.article3': 'Поддръжка на метални конструкции',
    'blog.article3.desc': 'Как да поддържате вашите метални изделия',
    
        // Footer
        'footer.description': 'Фаворит в производството на метални покривни системи. Символ на новаторство, съчетано с професионализъм.',
        'footer.quickLinks': 'Бързи връзки',
        'footer.services': 'Услуги',
        'footer.contact': 'Контакти',
        'footer.copyright': '© 2024 ЛАМАРИНА БГ. Всички права запазени.',
        'footer.privacy': 'Политика за поверителност',
        'footer.terms': 'Условия за ползване',

        // Admin Panel
        'admin.title': 'Административен панел',
        'admin.search': 'Търси...',
        'admin.profile': 'Профил',
        'admin.settings': 'Настройки',
        'admin.logout': 'Изход',
        'admin.dashboard': 'Табло',
        'admin.homepage': 'Начална страница',
        'admin.listings': 'Обяви',
        'admin.products': 'Продукти',
        'admin.orders': 'Поръчки',
        'admin.invoices': 'Фактури',
        'admin.blog': 'Блог',
        'admin.portfolio': 'Портфолио',
        'admin.users': 'Потребители',
        'admin.pages': 'Страници',
        'admin.analytics': 'Аналитика',
        'admin.messages': 'Съобщения',
        'admin.security': 'Сигурност'
  },
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.portfolio': 'Portfolio',
    'nav.services': 'Services',
    'nav.blog': 'News Room',
    'nav.products.title': 'Products',
    'nav.products.roofing': 'Roofing Systems',
    'nav.products.structures': 'Metal Structures',
    'nav.products.bending': 'Metal Bending',
    'nav.products.cutting': 'Laser Cutting',
    'nav.products.welding': 'Welding Services',
    'nav.products.custom': 'Custom Solutions',
    'nav.products.services': 'Services',
    'nav.shop': 'Visit our Shop',
    'nav.news': 'News',
    'about.description': 'LAMARINA BG is a leading company in Bulgaria, specialized in metalworking, bending, cutting and welding work. With over 30 years of experience in the industry, we offer high-quality solutions for industrial and private clients.',
    'news.title': 'News Room',
    'news.description': 'Latest news and current events from the industry and our company',
    'news.imagePlaceholder': 'News Image',
    'news.article1.title': 'New Technologies in Metalworking',
    'news.article1.description': 'We are introducing new CNC machines for more precise processing...',
    'news.article1.date': 'December 15, 2024',
    'news.article2.title': 'Special Winter Season Prices',
    'news.article2.description': 'Discounts up to 20% on all roofing systems...',
    'news.article2.date': 'December 10, 2024',
    'news.article3.title': 'Completed Project in Sofia',
    'news.article3.description': 'Successfully completed roofing system for industrial facility...',
    'news.article3.date': 'December 5, 2024',
    'shop.description': 'Latest listings and products from our gallery',
    'shop.imagePlaceholder': 'Image',
    'shop.product1.title': 'Metal Roofing Panels',
    'shop.product1.price': '45 BGN/m²',
    'shop.product1.description': 'High-quality roofing panels',
    'shop.product2.title': 'Metal Sheet Bending',
    'shop.product2.price': '12 BGN/m',
    'shop.product2.description': 'Professional bending of various thicknesses',
    'shop.product3.title': 'Gutters and Drainage Systems',
    'shop.product3.price': '25 BGN/m',
    'shop.product3.description': 'Modern drainage systems',
    'shop.product4.title': 'Sandwich Panels',
    'shop.product4.price': '38 BGN/m²',
    'shop.product4.description': 'Thermal insulation sandwich panels',
    'shop.viewAll': 'View All Listings',
    'services.service1.title': 'Sheet Metal Bending',
    'services.service1.description': 'Precise bending of various thicknesses and materials with modern equipment',
    'services.service1.feature1': 'Up to 6mm thickness',
    'services.service1.feature2': 'All metals',
    'services.service1.feature3': 'Precision ±0.1mm',
    'services.service2.title': 'Cutting and Processing',
    'services.service2.description': 'Precise cutting with laser and plasma machines for the best quality',
    'services.service2.feature1': 'Laser cutting',
    'services.service2.feature2': 'Plasma cutting',
    'services.service2.feature3': 'Gas cutting',
    'services.service3.title': 'Welding Services',
    'services.service3.description': 'Professional welding work by certified specialists',
    'services.service3.feature1': 'TIG welding',
    'services.service3.feature2': 'MIG welding',
    'services.service3.feature3': 'Arc welding',
    'services.service4.title': 'Custom Solutions',
    'services.service4.description': 'Individual projects according to your specific needs and requirements',
    'services.service4.feature1': 'Consultations',
    'services.service4.feature2': '3D design',
    'services.service4.feature3': 'Prototyping',
    'services.learnMore': 'Learn More',
    'contact.addressDetails': 'S. BOLYARTSI p.k.4114\nPlovdiv Region, Sadovo Municipality\nBusiness Yard No. 2\nGPS: N 42.0710533, E 24.9521083',
    
        // Hero
        'hero.title': 'LAMARINA BG',
        'hero.subtitle': 'Metal Roofing Systems',
        'hero.description': 'Leader in metal roofing systems production. A symbol of innovation combined with professionalism.',
    'hero.experience': '30+ years experience',
    'hero.cta.primary': 'Get Quote',
    'hero.cta.secondary': 'Our Services',
    
    // About
    'about.title': 'About LAMARINA BG',
    'about.history': 'Our History',
    'about.values': 'Our Values',
    'about.team': 'Our Team',
    'about.story': 'The company was founded in 1989 and is a leader in metal roofing systems production. In the country and abroad, it is a symbol of innovation combined with professionalism.',
    'about.quality': 'The strictly specialized focus of the company determines and guarantees precise manufacturing and perfect product quality. This, combined with good pricing policy, has won trust among our partners.',
    'about.capacity': 'Production facilities have a capacity of 4000 - 6000 sq.m, which suggests short delivery times. The production base and placement of the company are located in the northwestern industrial zone of Bolyartsi village, Plovdiv region.',
    
        // Services
        'services.title': 'Professional Metalworking Services',
        'services.description': 'We offer a full range of metalworking services with over 30 years of industry experience',
        'services.bending': 'Sheet Metal Bending',
        'services.bending.desc': 'Precise bending of various thicknesses and materials with modern equipment',
        'services.bending.feature1': 'Up to 6mm thickness',
        'services.bending.feature2': 'All metals',
        'services.bending.feature3': 'Precision ±0.1mm',
        'services.cutting': 'Cutting and Processing',
        'services.cutting.desc': 'Precise cutting with laser and plasma machines for best quality',
        'services.cutting.feature1': 'Laser cutting',
        'services.cutting.feature2': 'Plasma cutting',
        'services.cutting.feature3': 'Gas cutting',
        'services.welding': 'Welding Works',
        'services.welding.desc': 'Professional welding works by certified specialists',
        'services.welding.feature1': 'TIG welding',
        'services.welding.feature2': 'MIG welding',
        'services.welding.feature3': 'Arc welding',
        'services.custom': 'Custom Solutions',
        'services.custom.desc': 'Individual projects according to your specific needs and requirements',
        'services.custom.feature1': 'Consultations',
        'services.custom.feature2': '3D design',
        'services.custom.feature3': 'Prototyping',
    
    // Portfolio
    'portfolio.title': 'Our Portfolio',
    'portfolio.description': 'Browse some of our successful projects and see the quality of our work',
    'portfolio.all': 'All',
    'portfolio.featured': 'Featured',
    
    // Blog
    'blog.title': 'Blog',
    'blog.description': 'Stay up to date with industry news and our company',
    'blog.search': 'Search articles...',
    'blog.featured': 'Featured Articles',
    'blog.all': 'All Articles',
    'blog.newsletter': 'Subscribe to our newsletter',
    'blog.newsletter.desc': 'Get the latest articles and industry news directly in your inbox',
    'blog.subscribe': 'Subscribe',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.description': 'Have questions or need a quote? Contact us today!',
    'contact.form.name': 'First Name',
    'contact.form.lastname': 'Last Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.company': 'Company',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.info': 'Contact Information',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Working Hours',
    'contact.quick': 'Quick Contact',
    'contact.call': 'Call Now',
    'contact.email_btn': 'Send Email',
    'contact.whatsapp': 'WhatsApp',
    'contact.faq': 'Frequently Asked Questions',
    'contact.faq.desc': 'Answers to the most frequently asked questions from our customers',
    
    // Stats
    'stats.projects': 'Completed Projects',
    'stats.experience': 'Years Experience',
    'stats.clients': 'Satisfied Clients',
    
    // Features
    'features.equipment': 'Professional Equipment',
    'features.equipment.desc': 'Modern machines for precise processing',
    'features.quality': 'Guaranteed Quality',
    'features.quality.desc': 'Certified processes and materials',
    'features.speed': 'Fast Execution',
    'features.speed.desc': 'Meeting delivery deadlines',
    
    // Portfolio
    'portfolio.viewAll': 'View All Projects',
    'portfolio.project1': 'Industrial Project',
    'portfolio.project1.desc': 'Metal structure for industrial building',
    'portfolio.project2': 'Residential Project',
    'portfolio.project2.desc': 'Custom metal fence',
    'portfolio.project3': 'Commercial Project',
    'portfolio.project3.desc': 'Roof structure for shopping center',
    
    // Blog
    'blog.readMore': 'Read More',
    'blog.article1': 'Benefits of Laser Cutting',
    'blog.article1.desc': 'Why laser cutting is the best choice for your project',
    'blog.article2': 'Choosing the Right Metal',
    'blog.article2.desc': 'Guide to selecting the right material',
    'blog.article3': 'Metal Structure Maintenance',
    'blog.article3.desc': 'How to maintain your metal products',
    
        // Footer
        'footer.description': 'Leader in metal roofing systems production. A symbol of innovation combined with professionalism.',
        'footer.quickLinks': 'Quick Links',
        'footer.services': 'Services',
        'footer.contact': 'Contact',
        'footer.copyright': '© 2024 LAMARINA BG. All rights reserved.',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',

        // Admin Panel
        'admin.title': 'Admin Panel',
        'admin.search': 'Search...',
        'admin.profile': 'Profile',
        'admin.settings': 'Settings',
        'admin.logout': 'Logout',
        'admin.dashboard': 'Dashboard',
        'admin.homepage': 'Homepage',
        'admin.listings': 'Ads',
        'admin.products': 'Products',
        'admin.orders': 'Orders',
        'admin.invoices': 'Invoices',
        'admin.blog': 'Blog',
        'admin.portfolio': 'Portfolio',
        'admin.users': 'Users',
        'admin.pages': 'Pages',
        'admin.analytics': 'Analytics',
        'admin.messages': 'Messages',
        'admin.security': 'Security'
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('bg')

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && (savedLang === 'bg' || savedLang === 'en')) {
      setLanguage(savedLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
