# La Marina - Модерен уебсайт за металообработване

## 🏭 За La Marina

**La Marina** е водеща компания в България, специализирана в металообработка, огъване, рязане и заваръчни работи. С над 30 години опит в индустрията, ние предлагаме висококачествени решения за индустриални и частни клиенти.

## 🎯 Цели на новия уебсайт

- **Модерен дизайн** с glassmorphism ефекти
- **Мобилно-ориентиран** подход
- **Лесно управление** на съдържанието
- **SEO оптимизация** за български търсачки
- **Интерактивни галерии** и карусели
- **Блог система** за новини и статии
- **Двуезичност** - български (основен) + английски
- **Пълен административен панел** за управление

## 📱 Структура на сайта

### 🏠 Начална страница (/)
```
Заглавие: "La Marina - Лидер в металообработката"
Подзаглавие: "Огъване, рязане, заваръчни работи и персонализирани решения"

Секции:
├── Hero секция (видео/слайдшоу)
├── Нашите услуги (преглед)
├── Избрани проекти
├── Защо да изберете нас
├── Последни новини
└── Контакти (кратко)
```

### 🔧 Услуги (/services)
```
├── Огъване на листов метал (/services/bending)
├── Рязане и обработка (/services/cutting)
├── Заваръчни работи (/services/welding)
├── Персонализирани решения (/services/custom)
├── Ремонт и поддръжка (/services/maintenance)
└── Консултации (/services/consultation)
```

### 📸 Портфолио (/portfolio)
```
├── Индустриални проекти (/portfolio/industrial)
├── Частни поръчки (/portfolio/private)
├── Преди/след галерия (/portfolio/before-after)
├── Оборудване (/portfolio/equipment)
└── Видео галерия (/portfolio/videos)
```

### 📰 Блог (/blog)
```
├── Индустриални новини (/blog/industry-news)
├── Компанийни събития (/blog/company-news)
├── Технически статии (/blog/technical)
├── Случаи на използване (/blog/case-studies)
└── Полезни съвети (/blog/tips)
```

### 📞 За нас (/about)
```
├── История на компанията
├── Нашият екип
├── Оборудване и технологии
├── Сертификати и награди
└── Партньори
```

### 📍 Контакти (/contact)
```
├── Информация за контакт
├── Работно време
├── Google Maps интеграция
├── Форма за запитване
└── Социални мрежи
```

## 🗺️ Google Maps интеграция

### Местоположение на фабриката
```javascript
// Google Maps конфигурация
const mapConfig = {
  center: {
    lat: 42.6977, // София координати (да се променят според реалното местоположение)
    lng: 23.3219
  },
  zoom: 15,
  markers: [
    {
      position: { lat: 42.6977, lng: 23.3219 },
      title: "La Marina - Фабрика за металообработка",
      infoWindow: {
        content: `
          <div>
            <h3>La Marina</h3>
            <p>Фабрика за металообработка</p>
            <p>Адрес: [Реален адрес]</p>
            <p>Телефон: [Телефон]</p>
            <p>Email: [Email]</p>
          </div>
        `
      }
    }
  ]
}
```

### Функционалности на картата
- **Интерактивна карта** с маркер на фабриката
- **Информационно прозорче** с контактни данни
- **Маршрути** до фабриката
- **Улична гледка** (Street View)
- **Мобилна оптимизация**

## 🎨 Дизайн система

### Цветова палитра
```css
:root {
  --primary: #1a365d;      /* Тъмно синьо (метал) */
  --secondary: #2d3748;     /* Сиво */
  --accent: #3182ce;        /* Синьо акцент */
  --warning: #ed8936;       /* Оранжево (огъване) */
  --success: #38a169;       /* Зелено (успех) */
  --text: #2d3748;          /* Основен текст */
  --text-light: #718096;    /* Светъл текст */
  --background: #f7fafc;    /* Фон */
  --glass: rgba(255, 255, 255, 0.1); /* Стоманено стъкло */
}
```

### Типография
```css
/* Заглавия */
.heading-1 { font-size: 3rem; font-weight: 700; }
.heading-2 { font-size: 2.25rem; font-weight: 600; }
.heading-3 { font-size: 1.875rem; font-weight: 600; }

/* Текст */
.body-large { font-size: 1.125rem; line-height: 1.75; }
.body-regular { font-size: 1rem; line-height: 1.5; }
.body-small { font-size: 0.875rem; line-height: 1.4; }
```

## 📱 Мобилна оптимизация

### Breakpoints
```css
/* Мобилни устройства */
@media (max-width: 768px) {
  .container { padding: 1rem; }
  .hero-title { font-size: 2rem; }
  .grid-cols-3 { grid-template-columns: 1fr; }
}

/* Планшети */
@media (min-width: 769px) and (max-width: 1024px) {
  .container { padding: 2rem; }
  .grid-cols-3 { grid-template-columns: repeat(2, 1fr); }
}

/* Десктоп */
@media (min-width: 1025px) {
  .container { padding: 3rem; }
  .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
}
```

## 🔧 Технически изисквания

### SEO оптимизация
- **Meta тагове** на български език
- **Open Graph** за социални мрежи
- **Schema.org** маркиране
- **Sitemap.xml** автоматично генериране
- **Robots.txt** конфигурация

### Производителност
- **Lazy loading** за изображения
- **Image optimization** (WebP формат)
- **Code splitting** за по-бързо зареждане
- **CDN** за статични файлове
- **Caching** стратегия

### Достъпност
- **ARIA** етикети
- **Keyboard navigation**
- **Screen reader** поддръжка
- **Color contrast** съответствие
- **Focus indicators**

## 🌐 Двуезичност (i18n)

### Езикова конфигурация
```javascript
// next-i18next конфигурация
const i18nConfig = {
  defaultLocale: 'bg',        // Български като основен език
  locales: ['bg', 'en'],      // Поддържани езици
  fallbackLng: 'bg',          // Fallback към български
  detection: {
    order: ['cookie', 'header', 'querystring'],
    caches: ['cookie']
  }
}
```

### Езиков превключвател
```jsx
// Компонент за превключване на език
const LanguageToggle = () => {
  const { i18n } = useTranslation()
  
  return (
    <div className="language-toggle">
      <button 
        onClick={() => i18n.changeLanguage('bg')}
        className={i18n.language === 'bg' ? 'active' : ''}
      >
        🇧🇬 БГ
      </button>
      <button 
        onClick={() => i18n.changeLanguage('en')}
        className={i18n.language === 'en' ? 'active' : ''}
      >
        🇬🇧 EN
      </button>
    </div>
  )
}
```

### Транслации структура
```
/locales/
├── bg/
│   ├── common.json      # Общи текстове
│   ├── navigation.json  # Навигация
│   ├── services.json    # Услуги
│   ├── portfolio.json   # Портфолио
│   └── blog.json        # Блог
└── en/
    ├── common.json
    ├── navigation.json
    ├── services.json
    ├── portfolio.json
    └── blog.json
```

## 📊 Пълен административен панел

### 🔐 Аутентификация и авторизация
```javascript
// Роли на потребители
const userRoles = {
  SUPER_ADMIN: 'super_admin',     // Пълен достъп
  ADMIN: 'admin',                 // Управление на съдържание
  EDITOR: 'editor',               // Редактиране на статии
  VIEWER: 'viewer'                // Само преглед
}

// Защитени маршрути
const protectedRoutes = [
  '/admin',
  '/admin/dashboard',
  '/admin/content',
  '/admin/media',
  '/admin/users',
  '/admin/settings'
]
```

### 📝 Управление на съдържание
```
📄 Страници (/admin/pages)
├── Създаване/редактиране на страници
├── SEO настройки (meta, keywords)
├── Двуезично съдържание
├── Публикуване/скриване
└── Версии и история

📰 Блог статии (/admin/blog)
├── Rich text редактор (TinyMCE/CKEditor)
├── Категории и тагове
├── Изображения и галерии
├── SEO оптимизация
├── Планиране на публикуване
└── Коментари и модерация

🔧 Услуги (/admin/services)
├── Управление на услуги
├── Цени и пакети
├── Технически спецификации
├── Изображения и документи
└── Поръчки и запитвания

📸 Портфолио (/admin/portfolio)
├── Проекти и галерии
├── Категоризиране
├── Преди/след снимки
├── Клиентски отзиви
└── Видео съдържание

🏷️ Листинги (/admin/listings)
├── Създаване/редактиране на листинги
├── Галерия с изображения
├── Видео галерия
├── Цени и пакети
├── Описания (двуезично)
├── Размери и спецификации
├── Материали и цветове
├── Тагове и категории
├── SEO оптимизация
├── Статус (активен/неактивен)
├── Поръчки и запитвания
└── Аналитика на листинги
```

### 🖼️ Медия библиотека (/admin/media)
```javascript
// Функционалности на медия библиотеката
const mediaFeatures = {
  upload: {
    types: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'pdf', 'doc', 'docx'],
    maxSize: '10MB',
    multiple: true,
    dragDrop: true
  },
  organization: {
    folders: true,
    tags: true,
    search: true,
    filters: ['type', 'date', 'size']
  },
  editing: {
    crop: true,
    resize: true,
    compress: true,
    watermark: true
  },
  optimization: {
    webp: true,
    lazy: true,
    responsive: true
  }
}
```

### 👥 Управление на потребители (/admin/users)
```
👤 Потребители
├── Списък с потребители
├── Създаване на нови акаунти
├── Роли и права
├── Активиране/деактивиране
└── История на активности

🔒 Безопасност
├── Двуфакторна автентификация
├── История на влизания
├── Блокиране на IP адреси
├── Логове за сигурност
└── Резервни копия
```

### 📈 Аналитика и отчети (/admin/analytics)
```javascript
// Метрики и отчети
const analyticsFeatures = {
  traffic: {
    visitors: 'Уникални посетители',
    pageViews: 'Прегледи на страници',
    bounceRate: 'Процент на отказ',
    sessionDuration: 'Продължителност на сесия'
  },
  content: {
    popularPages: 'Популярни страници',
    searchQueries: 'Търсения',
    downloads: 'Изтегляния',
    formSubmissions: 'Изпратени форми'
  },
  seo: {
    keywords: 'Ключови думи',
    backlinks: 'Обратни връзки',
    pageSpeed: 'Скорост на зареждане',
    mobileFriendly: 'Мобилна съвместимост'
  },
  business: {
    leads: 'Потенциални клиенти',
    conversions: 'Конверсии',
    contactForms: 'Контактни форми',
    quoteRequests: 'Заявки за оферти'
  }
}
```

### ⚙️ Настройки (/admin/settings)
```
🌐 Общи настройки
├── Информация за компанията
├── Контактни данни
├── Социални мрежи
├── Google Maps настройки
└── SEO глобални настройки

🎨 Дизайн настройки
├── Лого и брандинг
├── Цветова схема
├── Шрифтове
├── Лейаут опции
└── Кастомни CSS

📧 Email настройки
├── SMTP конфигурация
├── Email шаблони
├── Автоматични отговори
├── Newsletter настройки
└── Спам филтри

🔧 Технически настройки
├── Кеширане
├── CDN настройки
├── Резервни копия
├── Логове
└── Производителност
```

### 🏷️ Детайлно управление на листинги

#### Създаване на листинг
```jsx
// Форма за създаване на листинг
const CreateListingForm = () => {
  return (
    <form className="listing-form">
      {/* Основна информация */}
      <div className="form-section">
        <h3>Основна информация</h3>
        <input name="title_bg" placeholder="Заглавие (Български)" required />
        <input name="title_en" placeholder="Title (English)" required />
        <textarea name="description_bg" placeholder="Описание (Български)" />
        <textarea name="description_en" placeholder="Description (English)" />
      </div>

      {/* Галерия с изображения */}
      <div className="form-section">
        <h3>Галерия с изображения</h3>
        <ImageGalleryUpload 
          multiple={true}
          maxFiles={20}
          acceptedTypes={['jpg', 'jpeg', 'png', 'webp']}
          onUpload={handleImageUpload}
        />
      </div>

      {/* Видео галерия */}
      <div className="form-section">
        <h3>Видео галерия</h3>
        <VideoGalleryUpload 
          multiple={true}
          maxFiles={10}
          acceptedTypes={['mp4', 'webm', 'mov']}
          onUpload={handleVideoUpload}
        />
      </div>

      {/* Цени и пакети */}
      <div className="form-section">
        <h3>Цени и пакети</h3>
        <div className="pricing-grid">
          <input name="base_price" type="number" placeholder="Базова цена (лв.)" />
          <input name="price_per_unit" type="number" placeholder="Цена за единица" />
          <select name="currency">
            <option value="BGN">BGN (лв.)</option>
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
          </select>
          <input name="discount_percentage" type="number" placeholder="Отстъпка (%)" />
        </div>
      </div>

      {/* Размери и спецификации */}
      <div className="form-section">
        <h3>Размери и спецификации</h3>
        <div className="specifications-grid">
          <input name="length" placeholder="Дължина (мм)" />
          <input name="width" placeholder="Ширина (мм)" />
          <input name="height" placeholder="Височина (мм)" />
          <input name="thickness" placeholder="Дебелина (мм)" />
          <input name="weight" placeholder="Тегло (кг)" />
          <input name="tolerance" placeholder="Толеранс (±мм)" />
        </div>
      </div>

      {/* Материали и цветове */}
      <div className="form-section">
        <h3>Материали и цветове</h3>
        <div className="materials-colors">
          <select name="material" multiple>
            <option value="steel">Стомана</option>
            <option value="aluminum">Алуминий</option>
            <option value="stainless">Неръждаема стомана</option>
            <option value="copper">Мед</option>
            <option value="brass">Месинг</option>
          </select>
          <select name="colors" multiple>
            <option value="natural">Естествен</option>
            <option value="painted">Боядисан</option>
            <option value="galvanized">Галванизиран</option>
            <option value="powder_coated">Прахово покритие</option>
          </select>
        </div>
      </div>

      {/* Тагове и категории */}
      <div className="form-section">
        <h3>Тагове и категории</h3>
        <TagInput 
          placeholder="Добави тагове..."
          suggestions={['огъване', 'рязane', 'заваряване', 'персонализиран']}
        />
        <CategorySelect 
          categories={['индустриални', 'частни', 'ремонт', 'ново строителство']}
          multiple={true}
        />
      </div>

      {/* SEO оптимизация */}
      <div className="form-section">
        <h3>SEO оптимизация</h3>
        <input name="meta_title_bg" placeholder="Meta заглавие (БГ)" />
        <input name="meta_title_en" placeholder="Meta title (EN)" />
        <textarea name="meta_description_bg" placeholder="Meta описание (БГ)" />
        <textarea name="meta_description_en" placeholder="Meta description (EN)" />
        <input name="meta_keywords" placeholder="Ключови думи (разделени със запетая)" />
        <input name="slug_bg" placeholder="URL slug (БГ)" />
        <input name="slug_en" placeholder="URL slug (EN)" />
      </div>

      {/* Статус и видимост */}
      <div className="form-section">
        <h3>Статус и видимост</h3>
        <select name="status">
          <option value="draft">Чернова</option>
          <option value="published">Публикуван</option>
          <option value="archived">Архивиран</option>
        </select>
        <label>
          <input type="checkbox" name="featured" />
          Препоръчан листинг
        </label>
        <label>
          <input type="checkbox" name="show_pricing" />
          Показвай цени публично
        </label>
      </div>
    </form>
  )
}
```

#### Листинг модел в базата данни
```sql
-- Таблица за листинги
CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  title_bg VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  description_bg TEXT,
  description_en TEXT,
  slug_bg VARCHAR(255) UNIQUE,
  slug_en VARCHAR(255) UNIQUE,
  
  -- Цени
  base_price DECIMAL(10,2),
  price_per_unit DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'BGN',
  discount_percentage DECIMAL(5,2),
  
  -- Размери
  length DECIMAL(10,2),
  width DECIMAL(10,2),
  height DECIMAL(10,2),
  thickness DECIMAL(10,2),
  weight DECIMAL(10,2),
  tolerance DECIMAL(10,2),
  
  -- Материали и цветове
  materials JSON, -- ['steel', 'aluminum']
  colors JSON,    -- ['natural', 'painted']
  
  -- SEO
  meta_title_bg VARCHAR(255),
  meta_title_en VARCHAR(255),
  meta_description_bg TEXT,
  meta_description_en TEXT,
  meta_keywords TEXT,
  
  -- Статус
  status VARCHAR(20) DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  show_pricing BOOLEAN DEFAULT true,
  
  -- Мета данни
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by INTEGER REFERENCES users(id)
);

-- Таблица за изображения на листинги
CREATE TABLE listing_images (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  alt_text_bg VARCHAR(255),
  alt_text_en VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false
);

-- Таблица за видео на листинги
CREATE TABLE listing_videos (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
  video_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  title_bg VARCHAR(255),
  title_en VARCHAR(255),
  sort_order INTEGER DEFAULT 0
);

-- Таблица за тагове
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name_bg VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  color VARCHAR(7) DEFAULT '#3B82F6'
);

-- Таблица за категории
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name_bg VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  parent_id INTEGER REFERENCES categories(id),
  sort_order INTEGER DEFAULT 0
);

-- Свързване на листинги с тагове
CREATE TABLE listing_tags (
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (listing_id, tag_id)
);

-- Свързване на листинги с категории
CREATE TABLE listing_categories (
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (listing_id, category_id)
);
```

#### Функционалности на листинги
```javascript
// API endpoints за листинги
const listingEndpoints = {
  // CRUD операции
  GET: '/api/listings',                    // Списък с листинги
  POST: '/api/listings',                   // Създаване на листинг
  GET: '/api/listings/:id',                // Детайли за листинг
  PUT: '/api/listings/:id',                // Редактиране на листинг
  DELETE: '/api/listings/:id',             // Изтриване на листинг
  
  // Медия операции
  POST: '/api/listings/:id/images',        // Качване на изображения
  DELETE: '/api/listings/:id/images/:imageId', // Изтриване на изображение
  POST: '/api/listings/:id/videos',        // Качване на видео
  DELETE: '/api/listings/:id/videos/:videoId', // Изтриване на видео
  
  // SEO и оптимизация
  POST: '/api/listings/:id/seo',           // Обновяване на SEO данни
  GET: '/api/listings/:id/analytics',      // Аналитика за листинг
  
  // Публични endpoints
  GET: '/api/public/listings',             // Публични листинги
  GET: '/api/public/listings/:slug',        // Публичен листинг по slug
  POST: '/api/public/listings/:id/inquiry', // Запитване за листинг
}

// Филтри и търсене
const listingFilters = {
  search: 'Търсене по заглавие и описание',
  category: 'Филтър по категория',
  material: 'Филтър по материал',
  color: 'Филтър по цвят',
  priceRange: 'Филтър по ценови диапазон',
  size: 'Филтър по размери',
  tags: 'Филтър по тагове',
  featured: 'Само препоръчани',
  status: 'Статус на листинга'
}
```

### 📊 Dashboard главен екран
```jsx
// Главен dashboard компонент
const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="stats-grid">
        <StatCard title="Посетители днес" value="1,234" trend="+12%" />
        <StatCard title="Нови запитвания" value="8" trend="+25%" />
        <StatCard title="Публикувани статии" value="156" trend="+3%" />
        <StatCard title="Активни проекти" value="12" trend="+1%" />
        <StatCard title="Активни листинги" value="45" trend="+8%" />
        <StatCard title="Общо запитвания" value="234" trend="+15%" />
      </div>
      
      <div className="dashboard-content">
        <RecentActivity />
        <QuickActions />
        <AnalyticsChart />
        <RecentComments />
        <RecentListings />
        <TopPerformingListings />
      </div>
    </div>
  )
}
```

## 🚀 План за разработка

### Фаза 1: Основи (1-2 седмици)
- [ ] Настройка на Next.js проект с TypeScript
- [ ] Инсталиране на зависимости (i18n, admin panel)
- [ ] Създаване на основна структура
- [ ] Настройка на Tailwind CSS + glassmorphism
- [ ] Създаване на основни компоненти
- [ ] Настройка на двуезичност (bg/en)

### Фаза 2: Съдържание (2-3 седмици)
- [ ] Дизайн на страниците (мобилно-ориентиран)
- [ ] Интеграция на Google Maps
- [ ] Създаване на галерии и карусели
- [ ] Настройка на блог система
- [ ] SEO оптимизация за български търсачки
- [ ] Транслации на всички текстове

### Фаза 3: Административен панел (3-4 седмици)
- [ ] Аутентификация и авторизация
- [ ] Dashboard с аналитика
- [ ] CRUD операции за всички секции
- [ ] Медия библиотека с редактор
- [ ] Управление на потребители
- [ ] Настройки и конфигурация
- [ ] Rich text редактор за блог
- [ ] Email система за запитвания

### Фаза 4: Финализиране (1-2 седмици)
- [ ] Тестване на всички функции
- [ ] Оптимизация на производителността
- [ ] Мобилна оптимизация
- [ ] Деплойване и настройка
- [ ] Документация за администратори
- [ ] Обучение на екипа

## 📞 Контактна информация

**La Marina - Металообработка**
- 📍 Адрес: [Да се добави реалният адрес]
- 📞 Телефон: [Да се добави телефон]
- 📧 Email: [Да се добави email]
- 🌐 Уебсайт: [Да се добави домейн]
- 🕒 Работно време: Понеделник - Петък: 8:00 - 17:00

---

*Този документ служи като основа за разработката на модерния уебсайт на La Marina. Всички секции са проектирани да отговарят на нуждите на индустриална компания с фокус върху потребителския опит и лесното управление на съдържанието.*
