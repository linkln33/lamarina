import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  canonical?: string
  ogImage?: string
  noindex?: boolean
  locale?: string
  alternateLocales?: Record<string, string>
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords,
    canonical,
    ogImage = '/og-image.jpg',
    noindex = false,
    locale = 'bg_BG',
    alternateLocales = {}
  } = config

  const fullTitle = title.includes('LaMarina.bg') ? title : `${title} | LaMarina.bg`
  
  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    robots: noindex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title: fullTitle,
      description,
      locale,
      type: 'website',
      url: canonical,
      siteName: 'LaMarina.bg',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage]
    },
    alternates: {
      canonical,
      languages: alternateLocales
    }
  }
}

// Bulgarian SEO configurations for main pages
export const seoConfigs = {
  home: {
    title: 'LaMarina.bg - Огъване на ламарина и покривни системи',
    description: 'Професионално огъване на ламарина, производство на обшивки и монтаж на покривни системи в Пловдив, Асеновград и цяла България. Високо качество и точност от LaMarina.bg.',
    keywords: ['ламарина', 'огъване', 'покривни системи', 'обшивки', 'Пловдив', 'Асеновград', 'металообработка'],
    canonical: 'https://lamarina.bg',
    alternateLocales: {
      'bg': 'https://lamarina.bg',
      'en': 'https://lamarina.bg/en'
    }
  },
  about: {
    title: 'За нас - LaMarina.bg | Специалисти в огъването на ламарина',
    description: 'LaMarina.bg – специалисти в огъването на ламарина и изграждането на покривни системи. Над 30+ години опит и стотици доволни клиенти в Пловдив и Асеновград.',
    keywords: ['за нас', 'фирма ламарина', 'покривни обшивки', 'опит', 'Пловдив', 'Асеновград', 'огъване ламарина'],
    canonical: 'https://lamarina.bg/за-нас',
    alternateLocales: {
      'bg': 'https://lamarina.bg/за-нас',
      'en': 'https://lamarina.bg/en/about'
    }
  },
  services: {
    title: 'Услуги - Огъване на ламарина, обшивки, улуци и панели | LaMarina.bg',
    description: 'Разгледайте всички услуги: огъване на ламарина, производство на обшивки, монтаж на улуци, покривни системи и сандвич панели в Пловдив и цяла България.',
    keywords: ['огъване на ламарина', 'улуци', 'покривни панели', 'Пловдив', 'обшивки', 'сандвич панели', 'покривни системи', 'металообработка'],
    canonical: 'https://lamarina.bg/услуги',
    alternateLocales: {
      'bg': 'https://lamarina.bg/услуги',
      'en': 'https://lamarina.bg/en/services'
    }
  },
  metalRoofing: {
    title: 'Метални покриви - Покривни системи и обшивки | LaMarina.bg',
    description: 'Професионални метални покриви, покривни системи и обшивки в Пловдив, Асеновград и цяла България. Високо качество и дългогодишна гаранция.',
    keywords: ['метални покриви', 'покривни системи', 'обшивки', 'Пловдив', 'Асеновград', 'покривни панели', 'сандвич панели', 'покривни материали'],
    canonical: 'https://lamarina.bg/метални-покриви',
    alternateLocales: {
      'bg': 'https://lamarina.bg/метални-покриви',
      'en': 'https://lamarina.bg/en/metal-roofing'
    }
  },
  contact: {
    title: 'Контакт - LaMarina.bg | Огъване на ламарина в Пловдив и Асеновград',
    description: 'Свържете се с нас за оферта или консултация. Работим в Пловдив, Асеновград и цяла България. Телефон, имейл, адрес и работно време.',
    keywords: ['контакт', 'оферта', 'телефон', 'ламарина Пловдив', 'огъване ламарина Асеновград', 'металообработка България'],
    canonical: 'https://lamarina.bg/контакт',
    alternateLocales: {
      'bg': 'https://lamarina.bg/контакт',
      'en': 'https://lamarina.bg/en/contact'
    }
  }
}

// City-specific SEO configurations
export const citySeoConfigs = {
  plovdiv: {
    title: 'Огъване на ламарина в Пловдив | LaMarina.bg',
    description: 'Професионално огъване на ламарина в Пловдив. Покривни системи, обшивки и металообработка. Безплатна консултация и оферта.',
    keywords: ['огъване ламарина Пловдив', 'покривни системи Пловдив', 'металообработка Пловдив', 'обшивки Пловдив'],
    canonical: 'https://lamarina.bg/огъване-ламарина-пловдив'
  },
  asenovgrad: {
    title: 'Огъване на ламарина в Асеновград | LaMarina.bg',
    description: 'Огъване на ламарина и покривни системи в Асеновград. Професионални услуги за металообработка и покривни обшивки.',
    keywords: ['огъване ламарина Асеновград', 'покривни системи Асеновград', 'металообработка Асеновград', 'обшивки Асеновград'],
    canonical: 'https://lamarina.bg/огъване-ламарина-асеновград'
  },
  sofia: {
    title: 'Огъване на ламарина в София | LaMarina.bg',
    description: 'Метални покриви и покривни системи в София. Огъване на ламарина, обшивки и металообработка за столицата.',
    keywords: ['огъване ламарина София', 'покривни системи София', 'метални покриви София', 'обшивки София'],
    canonical: 'https://lamarina.bg/огъване-ламарина-софия'
  },
  varna: {
    title: 'Огъване на ламарина във Варна | LaMarina.bg',
    description: 'Морски покриви и обшивки във Варна. Специализирани решения за приморски условия. Огъване на ламарина и покривни системи.',
    keywords: ['огъване ламарина Варна', 'морски покриви Варна', 'покривни системи Варна', 'обшивки Варна'],
    canonical: 'https://lamarina.bg/огъване-ламарина-варна'
  }
}

// Generate structured data for LocalBusiness
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LaMarina.bg",
    "description": "Професионално огъване на ламарина, покривни системи и металообработка в България",
    "url": "https://lamarina.bg",
    "telephone": "+359-2-123-4567",
    "email": "info@lamarina.bg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "с. Болярци",
      "addressLocality": "Пловдив",
      "addressRegion": "Пловдивска област",
      "addressCountry": "BG",
      "postalCode": "4114"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "42.1354",
      "longitude": "24.7453"
    },
    "openingHours": [
      "Mo-Fr 08:00-17:00",
      "Sa 09:00-13:00"
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Пловдив"
      },
      {
        "@type": "City", 
        "name": "Асеновград"
      },
      {
        "@type": "Country",
        "name": "България"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "42.1354",
        "longitude": "24.7453"
      },
      "geoRadius": "300000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги за металообработка",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Огъване на ламарина",
            "description": "Точно огъване на различни дебелини и материали"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Покривни системи",
            "description": "Метални покривни системи и обшивки"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Заваръчни работи",
            "description": "Професионални заваръчни работи"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    },
    "sameAs": [
      "https://www.facebook.com/lamarina.bg",
      "https://www.linkedin.com/company/lamarina-bg"
    ]
  }
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}
