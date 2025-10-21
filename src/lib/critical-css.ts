// Critical CSS optimization for above-the-fold content

export const criticalCSS = `
/* Critical CSS for above-the-fold content */
* {
  box-sizing: border-box;
}

html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
}

body {
  margin: 0;
  font-family: inherit;
  line-height: inherit;
}

/* Layout utilities */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

/* Navigation critical styles */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  text-decoration: none;
}

/* Hero section critical styles */
.hero {
  padding-top: 6rem;
  padding-bottom: 6rem;
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  color: white;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.hero-cta:hover {
  background-color: #2563eb;
}

/* Button critical styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.btn-primary:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}

.btn-secondary {
  background-color: transparent;
  color: #6b7280;
  border-color: #d1d5db;
}

.btn-secondary:hover {
  background-color: #f9fafb;
  color: #374151;
}

/* Card critical styles */
.card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* Grid critical styles */
.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Image critical styles */
.img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.img-responsive {
  max-width: 100%;
  height: auto;
}

/* Loading states */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Utility classes */
.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.text-sm {
  font-size: 0.875rem;
}

.text-lg {
  font-size: 1.125rem;
}

.text-xl {
  font-size: 1.25rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.text-3xl {
  font-size: 1.875rem;
}

.text-4xl {
  font-size: 2.25rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.p-4 {
  padding: 1rem;
}

.p-6 {
  padding: 1.5rem;
}

.p-8 {
  padding: 2rem;
}

/* Responsive utilities */
.hidden {
  display: none;
}

@media (min-width: 640px) {
  .sm\\:block {
    display: block;
  }
}

@media (min-width: 768px) {
  .md\\:block {
    display: block;
  }
}

@media (min-width: 1024px) {
  .lg\\:block {
    display: block;
  }
}

/* Focus styles for accessibility */
.focus\\:ring-2:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px #3b82f6;
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
}
`

// Critical CSS injection function
export function injectCriticalCSS(): void {
  if (typeof document === 'undefined') return

  // Check if critical CSS is already injected
  if (document.getElementById('critical-css')) return

  const style = document.createElement('style')
  style.id = 'critical-css'
  style.textContent = criticalCSS
  document.head.insertBefore(style, document.head.firstChild)
}

// Preload critical resources
export function preloadCriticalResources(): void {
  if (typeof document === 'undefined') return

  // Preload critical fonts
  const fontPreloads = [
    { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
  ]

  fontPreloads.forEach(({ href, as, type, crossorigin }) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (type) link.type = type
    if (crossorigin) link.crossOrigin = crossorigin
    document.head.appendChild(link)
  })

  // Preload critical images
  const imagePreloads = [
    '/images/hero-bg.webp',
    '/images/logo.svg',
  ]

  imagePreloads.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = 'image'
    document.head.appendChild(link)
  })
}

// Resource hints for external domains
export function addResourceHints(): void {
  if (typeof document === 'undefined') return

  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'dns-prefetch', href: 'https://your-supabase-url.supabase.co' },
  ]

  hints.forEach(({ rel, href, crossorigin }) => {
    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    if (crossorigin) link.crossOrigin = crossorigin
    document.head.appendChild(link)
  })
}

// Initialize critical optimizations
export function initializeCriticalOptimizations(): void {
  injectCriticalCSS()
  preloadCriticalResources()
  addResourceHints()
}

// Auto-initialize on client side
if (typeof window !== 'undefined') {
  // Initialize immediately
  initializeCriticalOptimizations()
  
  // Also initialize on DOM ready as fallback
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCriticalOptimizations)
  }
}
