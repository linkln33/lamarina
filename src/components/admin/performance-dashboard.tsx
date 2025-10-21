"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Activity, 
  Zap, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  BarChart3,
  Gauge
} from 'lucide-react'
import { performanceMonitor, PerformanceMetrics } from '@/lib/performance'

interface PerformanceDashboardProps {
  className?: string
}

export function PerformanceDashboard({ className = '' }: PerformanceDashboardProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    const updateMetrics = () => {
      const currentMetrics = performanceMonitor.getMetrics()
      setMetrics(currentMetrics)
      setLastUpdated(new Date())
      setIsLoading(false)
    }

    // Initial load
    updateMetrics()

    // Update every 5 seconds
    const interval = setInterval(updateMetrics, 5000)

    return () => clearInterval(interval)
  }, [])

  const getScore = () => performanceMonitor.getPerformanceScore()
  const getGrade = () => performanceMonitor.getPerformanceGrade()
  const getRecommendations = () => performanceMonitor.getRecommendations()

  const formatMetric = (value: number | undefined, unit: string = 'ms') => {
    if (value === undefined) return 'N/A'
    return `${value.toFixed(2)}${unit}`
  }

  const getMetricColor = (value: number | undefined, thresholds: { good: number; poor: number }) => {
    if (value === undefined) return 'muted'
    if (value <= thresholds.good) return 'success'
    if (value <= thresholds.poor) return 'warning'
    return 'destructive'
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    if (score >= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800 border-green-200'
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'D': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'F': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const score = getScore()
  const grade = getGrade()
  const recommendations = getRecommendations()

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-6 w-6" />
            Performance Dashboard
          </h2>
          <p className="text-muted-foreground">
            Real-time performance monitoring and optimization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsLoading(true)
              setTimeout(() => {
                const currentMetrics = performanceMonitor.getMetrics()
                setMetrics(currentMetrics)
                setLastUpdated(new Date())
                setIsLoading(false)
              }, 1000)
            }}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Badge variant="outline" className="text-xs">
            Updated: {lastUpdated.toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            Overall Performance Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl font-bold">
              <span className={getScoreColor(score)}>{score}</span>
              <span className="text-2xl text-muted-foreground">/100</span>
            </div>
            <Badge className={`text-lg px-4 py-2 ${getGradeColor(grade)}`}>
              Grade: {grade}
            </Badge>
          </div>
          <Progress value={score} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Poor</span>
            <span>Good</span>
            <span>Excellent</span>
          </div>
        </CardContent>
      </Card>

      {/* Core Web Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* LCP */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Largest Contentful Paint
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {formatMetric(metrics.lcp)}
            </div>
            <Badge 
              variant="outline" 
              className={getMetricColor(metrics.lcp, { good: 2500, poor: 4000 })}
            >
              {metrics.lcp && metrics.lcp <= 2500 ? 'Good' : 
               metrics.lcp && metrics.lcp <= 4000 ? 'Needs Improvement' : 'Poor'}
            </Badge>
            <div className="text-xs text-muted-foreground mt-2">
              Target: &lt; 2.5s
            </div>
          </CardContent>
        </Card>

        {/* FID */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="h-4 w-4" />
              First Input Delay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {formatMetric(metrics.fid)}
            </div>
            <Badge 
              variant="outline" 
              className={getMetricColor(metrics.fid, { good: 100, poor: 300 })}
            >
              {metrics.fid && metrics.fid <= 100 ? 'Good' : 
               metrics.fid && metrics.fid <= 300 ? 'Needs Improvement' : 'Poor'}
            </Badge>
            <div className="text-xs text-muted-foreground mt-2">
              Target: &lt; 100ms
            </div>
          </CardContent>
        </Card>

        {/* CLS */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Cumulative Layout Shift
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {formatMetric(metrics.cls, '')}
            </div>
            <Badge 
              variant="outline" 
              className={getMetricColor(metrics.cls, { good: 0.1, poor: 0.25 })}
            >
              {metrics.cls && metrics.cls <= 0.1 ? 'Good' : 
               metrics.cls && metrics.cls <= 0.25 ? 'Needs Improvement' : 'Poor'}
            </Badge>
            <div className="text-xs text-muted-foreground mt-2">
              Target: &lt; 0.1
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Time to First Byte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {formatMetric(metrics.ttfb)}
            </div>
            <div className="text-xs text-muted-foreground">
              Server response time
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">First Contentful Paint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {formatMetric(metrics.fcp)}
            </div>
            <div className="text-xs text-muted-foreground">
              First content render
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Optimization Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Image Optimization</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Use WebP/AVIF formats</li>
                <li>• Implement lazy loading</li>
                <li>• Add proper dimensions</li>
                <li>• Use responsive images</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Code Optimization</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Minimize JavaScript bundles</li>
                <li>• Use code splitting</li>
                <li>• Optimize critical CSS</li>
                <li>• Enable compression</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
