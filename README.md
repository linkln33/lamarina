# La Marina - Metal Roofing Systems

A modern, responsive website for La Marina, a leading metal roofing systems company in Bulgaria.

## 🚀 Features

- **Modern Design**: Glassmorphism UI with industrial theme
- **Responsive**: Mobile-first design with Tailwind CSS
- **Multilingual**: Bulgarian (primary) and English support
- **Admin Panel**: Full CMS for content management
- **Portfolio**: Showcase projects and services
- **Blog**: News and articles section
- **Contact**: Interactive contact forms and maps

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui, Radix UI
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **File Uploads**: UploadThing
- **Deployment**: Netlify

## 📦 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd lamarina
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp env.example .env.local
```

4. Configure your environment variables in `.env.local`:
   - Supabase URL and keys
   - UploadThing credentials
   - Site URL

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment

### Netlify Deployment

1. **Connect to Netlify**:
   - Push your code to GitHub/GitLab
   - Connect your repository to Netlify
   - Netlify will automatically detect Next.js

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

3. **Environment Variables**:
   Set the following in Netlify dashboard:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id
   NEXT_PUBLIC_SITE_URL=https://your-domain.netlify.app
   ```

4. **Deploy**:
   - Netlify will automatically build and deploy
   - Custom domain can be configured in Netlify dashboard

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── portfolio/         # Portfolio page
│   ├── blog/              # Blog page
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/            # Layout components
│   ├── sections/         # Page sections
│   └── ui/                # UI components
├── contexts/              # React contexts
├── lib/                   # Utility functions
└── messages/              # Translation files
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the database migrations
3. Configure Row Level Security (RLS)
4. Set up storage buckets for file uploads

### UploadThing Setup
1. Create an UploadThing account
2. Create a new app
3. Configure file upload limits and types
4. Set up API routes for file handling

## 📱 Features

### Admin Panel
- **Dashboard**: Overview of site statistics
- **Listings**: Manage products and services
- **Blog**: Create and manage blog posts
- **Media**: File upload and management
- **Users**: User management
- **Settings**: Site configuration

### Public Pages
- **Home**: Hero section with company info
- **About**: Company history and values
- **Services**: Detailed service offerings
- **Portfolio**: Project showcase
- **Blog**: News and articles
- **Contact**: Contact form and information

## 🌍 Internationalization

The site supports Bulgarian (primary) and English languages with:
- Automatic language detection
- Language toggle in navigation
- Translated content for all pages
- SEO-friendly URLs

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Optimized caching strategies

## 🔒 Security

- **HTTPS**: Enforced SSL/TLS
- **Headers**: Security headers configured
- **CSP**: Content Security Policy
- **Authentication**: Secure admin access
- **File Uploads**: Validated and sanitized

## 📞 Support

For technical support or questions:
- Email: info@lamarina.bg
- Phone: +359 2 123 4567
- Address: С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска

## 📄 License

© 2024 La Marina. All rights reserved.