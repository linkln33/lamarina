// Performance monitoring and optimization utilities

export interface PerformanceMetrics {
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  fcp?: number // First Contentful Paint
  ttfb?: number // Time to First Byte
  fmp?: number // First Meaningful Paint
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: PerformanceMetrics = {}
  private observers: PerformanceObserver[] = []

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers()
    }
  }

  private initializeObservers() {
    // LCP Observer
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          this.metrics.lcp = lastEntry.startTime
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        this.observers.push(lcpObserver)
      } catch (e) {
        console.warn('LCP observer not supported:', e)
      }

      // FID Observer
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            if (entry.entryType === 'first-input') {
              this.metrics.fid = entry.processingStart - entry.startTime
            }
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
        this.observers.push(fidObserver)
      } catch (e) {
        console.warn('FID observer not supported:', e)
      }

      // CLS Observer
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0
          for (const entry of list.getEntries()) {
            if (!(entry as PerformanceEntry & { hadRecentInput?: boolean }).hadRecentInput) {
              clsValue += (entry as PerformanceEntry & { value: number }).value
            }
          }
          this.metrics.cls = clsValue
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(clsObserver)
      } catch (e) {
        console.warn('CLS observer not supported:', e)
      }

      // Navigation timing
      this.measureNavigationTiming()
    }
  }

  private measureNavigationTiming() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
      
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0]
        this.metrics.ttfb = nav.responseStart - nav.requestStart
        this.metrics.fcp = nav.domContentLoadedEventEnd - nav.navigationStart
      }
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  getCoreWebVitals(): { lcp: number; fid: number; cls: number } {
    return {
      lcp: this.metrics.lcp || 0,
      fid: this.metrics.fid || 0,
      cls: this.metrics.cls || 0,
    }
  }

  getPerformanceScore(): number {
    const { lcp, fid, cls } = this.getCoreWebVitals()
    
    let score = 100
    
    // LCP scoring (0-2.5s is good)
    if (lcp > 2500) score -= 30
    else if (lcp > 4000) score -= 50
    
    // FID scoring (0-100ms is good)
    if (fid > 100) score -= 20
    else if (fid > 300) score -= 40
    
    // CLS scoring (0-0.1 is good)
    if (cls > 0.1) score -= 20
    else if (cls > 0.25) score -= 40
    
    return Math.max(0, score)
  }

  getPerformanceGrade(): 'A' | 'B' | 'C' | 'D' | 'F' {
    const score = this.getPerformanceScore()
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  }

  getRecommendations(): string[] {
    const recommendations: string[] = []
    const { lcp, fid, cls } = this.getCoreWebVitals()

    if (lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint - consider image optimization and critical CSS')
    }

    if (fid > 100) {
      recommendations.push('Reduce First Input Delay - minimize JavaScript execution time')
    }

    if (cls > 0.1) {
      recommendations.push('Improve Cumulative Layout Shift - ensure images have dimensions and avoid dynamic content')
    }

    if (this.metrics.ttfb && this.metrics.ttfb > 600) {
      recommendations.push('Optimize Time to First Byte - improve server response time')
    }

    return recommendations
  }

  reportMetrics(): void {
    const metrics = this.getMetrics()
    const score = this.getPerformanceScore()
    const grade = this.getPerformanceGrade()
    const recommendations = this.getRecommendations()

    console.group('🚀 Performance Metrics')
    console.log('Core Web Vitals:', this.getCoreWebVitals())
    console.log('Performance Score:', score)
    console.log('Performance Grade:', grade)
    console.log('Recommendations:', recommendations)
    console.groupEnd()

    // Send to analytics (if configured)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as Window & { gtag?: (command: string, eventName: string, parameters: Record<string, unknown>) => void }).gtag?.('event', 'performance_metrics', {
        lcp: metrics.lcp,
        fid: metrics.fid,
        cls: metrics.cls,
        score: score,
        grade: grade,
      })
    }
  }

  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Image optimization utilities
export class ImageOptimizer {
  static generateResponsiveSizes(baseWidth: number, baseHeight: number): Array<{width: number, height: number}> {
    const aspectRatio = baseHeight / baseWidth
    const breakpoints = [640, 768, 1024, 1280, 1536, 1920]
    
    return breakpoints
      .filter(width => width <= baseWidth * 2) // Don't upscale
      .map(width => ({
        width,
        height: Math.round(width * aspectRatio)
      }))
  }

  static generateSrcSet(src: string, sizes: Array<{width: number, height: number}>): string {
    return sizes
      .map(({ width, height }) => `${src}?w=${width}&h=${height} ${width}w`)
      .join(', ')
  }

  static generateSizes(breakpoints: number[]): string {
    return breakpoints
      .map((bp, index) => {
        const nextBp = breakpoints[index + 1]
        if (nextBp) {
          return `(max-width: ${bp}px) ${Math.round((bp / nextBp) * 100)}vw`
        }
        return `${Math.round((bp / 1920) * 100)}vw`
      })
      .join(', ')
  }

  static preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = src
    })
  }

  static preloadCriticalImages(urls: string[]): Promise<void[]> {
    return Promise.all(urls.map(url => this.preloadImage(url)))
  }
}

// Bundle size optimization
export class BundleOptimizer {
  static async loadComponent<T>(
    importFn: () => Promise<{ default: T }>,
    fallback?: T
  ): Promise<T> {
    try {
      const importedModule = await importFn()
      return importedModule.default
    } catch (error) {
      console.warn('Failed to load component:', error)
      if (fallback) {
        return fallback
      }
      throw error
    }
  }

  static createLazyComponent<T>(
    importFn: () => Promise<{ default: T }>,
    fallback?: T
  ) {
    return React.lazy(() => importFn().catch(() => ({ default: fallback || (() => null) })))
  }
}

// Resource hints
export class ResourceHints {
  static preconnect(url: string): void {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = url
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    }
  }

  static dnsPrefetch(url: string): void {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = url
      document.head.appendChild(link)
    }
  }

  static preload(href: string, as: string, type?: string): void {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = as
      if (type) link.type = type
      document.head.appendChild(link)
    }
  }
}

// Initialize performance monitoring
export const performanceMonitor = PerformanceMonitor.getInstance()

// Auto-report metrics after page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.reportMetrics()
    }, 2000) // Wait 2 seconds for all metrics to be collected
  })
}
