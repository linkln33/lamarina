"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Upload, 
  Trash2, 
  Edit, 
  Eye, 
  Download,
  Image as ImageIcon,
  Video,
  FileText,
  Folder,
  Calendar,
  HardDrive,
  CheckCircle,
  X
} from 'lucide-react'
import Image from 'next/image'
import { StorageService, MediaService, MediaFile } from '@/lib/storage'

interface MediaManagerProps {
  onSelect?: (files: MediaFile[]) => void
  multiSelect?: boolean
  acceptedTypes?: string[]
  className?: string
}

export function MediaManager({ 
  onSelect, 
  multiSelect = false, 
  acceptedTypes = ['image/*', 'video/*', 'application/pdf'],
  className = ''
}: MediaManagerProps) {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([])
  const [selectedFiles, setSelectedFiles] = useState<MediaFile[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Load files on component mount
  useEffect(() => {
    loadFiles()
  }, [])

  // Filter files based on search and type
  useEffect(() => {
    let filtered = files

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(file => 
        file.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.alt?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(file => {
        if (filterType === 'images') return file.type.startsWith('image/')
        if (filterType === 'videos') return file.type.startsWith('video/')
        if (filterType === 'documents') return file.type.includes('pdf') || file.type.includes('document')
        return true
      })
    }

    setFilteredFiles(filtered)
  }, [files, searchTerm, filterType])

  const loadFiles = async () => {
    setLoading(true)
    try {
      // In a real implementation, you'd fetch from your database
      // For now, we'll use a mock implementation
      const mockFiles: MediaFile[] = [
        {
          id: '1',
          url: '/api/placeholder/400/300',
          filename: 'roofing-system-1.jpg',
          size: 1024000,
          type: 'image/jpeg',
          alt: 'Метална покривна система',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          url: '/api/placeholder/400/300',
          filename: 'metal-bending-video.mp4',
          size: 5120000,
          type: 'video/mp4',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          url: '/api/placeholder/400/300',
          filename: 'catalog-2024.pdf',
          size: 2048000,
          type: 'application/pdf',
          createdAt: new Date().toISOString()
        }
      ]
      setFiles(mockFiles)
    } catch (error) {
      console.error('Error loading files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (file: MediaFile) => {
    if (multiSelect) {
      const isSelected = selectedFiles.some(f => f.id === file.id)
      if (isSelected) {
        setSelectedFiles(selectedFiles.filter(f => f.id !== file.id))
      } else {
        setSelectedFiles([...selectedFiles, file])
      }
    } else {
      setSelectedFiles([file])
      onSelect?.([file])
    }
  }

  const handleUpload = async (uploadedFiles: MediaFile[]) => {
    setUploading(true)
    try {
      setFiles(prev => [...prev, ...uploadedFiles])
      if (multiSelect) {
        setSelectedFiles(prev => [...prev, ...uploadedFiles])
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (fileId: string) => {
    try {
      // In a real implementation, you'd delete from storage and database
      setFiles(prev => prev.filter(f => f.id !== fileId))
      setSelectedFiles(prev => prev.filter(f => f.id !== fileId))
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />
    if (type.startsWith('video/')) return <Video className="h-4 w-4" />
    if (type.includes('pdf')) return <FileText className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bg-BG')
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Медия мениджър</h2>
          <p className="text-muted-foreground">
            Управление на изображения, видеа и документи
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <HardDrive className="h-3 w-3" />
            {files.length} файла
          </Badge>
          {selectedFiles.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              {selectedFiles.length} избрани
            </Badge>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Търси файлове..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">Всички типове</option>
            <option value="images">Изображения</option>
            <option value="videos">Видеа</option>
            <option value="documents">Документи</option>
          </select>
        </div>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Качване на файлове
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">
              Драг & дроп файлове тук или кликни за избор
            </p>
            <p className="text-sm text-muted-foreground">
              Поддържани формати: JPG, PNG, WebP, MP4, PDF (до 50MB)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="aspect-square bg-muted rounded mb-3" />
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))
        ) : (
          filteredFiles.map((file) => {
            const isSelected = selectedFiles.some(f => f.id === file.id)
            
            return (
              <Card 
                key={file.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleFileSelect(file)}
              >
                <CardContent className="p-4">
                  {/* File Preview */}
                  <div className="aspect-square relative rounded overflow-hidden mb-3">
                    {file.type.startsWith('image/') ? (
                      <Image
                        src={file.url}
                        alt={file.alt || file.filename}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium truncate" title={file.filename}>
                      {file.filename}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{formatDate(file.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {file.type.split('/')[1].toUpperCase()}
                      </Badge>
                      {file.alt && (
                        <Badge variant="secondary" className="text-xs">
                          SEO
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 mt-3">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Преглед
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Изтегли
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(file.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Selected Files Summary */}
      {selectedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Избрани файлове ({selectedFiles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedFiles.map(file => (
                <Badge key={file.id} variant="secondary" className="gap-1">
                  {getFileIcon(file.type)}
                  {file.filename}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => handleFileSelect(file)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="mt-4">
              <Button onClick={() => onSelect?.(selectedFiles)}>
                Използвай избраните файлове
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
