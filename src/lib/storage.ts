import { supabase, isSupabaseReady } from './supabase'
import { FallbackStorageService } from './fallback-storage'

export interface UploadResult {
  url: string
  path: string
  size: number
  type: string
  filename: string
}

export interface MediaFile {
  id: string
  url: string
  filename: string
  size: number
  type: string
  alt?: string
  isPrimary?: boolean
  orderIndex?: number
  createdAt: string
}

export class StorageService {
  // Upload file to Supabase Storage or fallback
  static async uploadFile(
    file: File, 
    bucket: string = 'media',
    folder: string = 'uploads'
  ): Promise<UploadResult> {
    // Use fallback storage if Supabase is not configured
    if (!isSupabaseReady) {
      console.log('Supabase not configured, using fallback storage')
      return FallbackStorageService.uploadFile(file, bucket, folder)
    }

    try {
      // Generate unique filename
      const timestamp = Date.now()
      const fileExt = file.name.split('.').pop()
      const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${folder}/${filename}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        throw new Error(`Upload failed: ${error.message}`)
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      return {
        url: urlData.publicUrl,
        path: filePath,
        size: file.size,
        type: file.type,
        filename
      }
    } catch (error) {
      console.error('Upload error:', error)
      // Fallback to local storage if Supabase fails
      console.log('Supabase upload failed, falling back to local storage')
      return FallbackStorageService.uploadFile(file, bucket, folder)
    }
  }

  // Upload multiple files
  static async uploadFiles(
    files: File[],
    bucket: string = 'media',
    folder: string = 'uploads'
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map(file => 
      this.uploadFile(file, bucket, folder)
    )
    return Promise.all(uploadPromises)
  }

  // Delete file from storage
  static async deleteFile(bucket: string, path: string): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path])

      if (error) {
        throw new Error(`Delete failed: ${error.message}`)
      }
    } catch (error) {
      console.error('Delete error:', error)
      throw new Error('Failed to delete file')
    }
  }

  // Get file URL
  static getFileUrl(bucket: string, path: string): string {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    return data.publicUrl
  }

  // Create storage bucket (admin only)
  static async createBucket(bucketName: string, isPublic: boolean = true): Promise<void> {
    try {
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: isPublic,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/gif',
          'video/mp4',
          'video/webm',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ],
        fileSizeLimit: 50 * 1024 * 1024 // 50MB
      })

      if (error) {
        throw new Error(`Bucket creation failed: ${error.message}`)
      }
    } catch (error) {
      console.error('Bucket creation error:', error)
      throw new Error('Failed to create bucket')
    }
  }

  // List files in bucket
  static async listFiles(bucket: string, folder?: string): Promise<MediaFile[]> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder)

      if (error) {
        throw new Error(`List failed: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('List error:', error)
      return []
    }
  }
}

// Media management for listings
export class MediaService {
  // Add image to listing
  static async addListingImage(
    listingId: string,
    imageData: {
      url: string
      alt?: string
      isPrimary?: boolean
      orderIndex?: number
    }
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('listing_images')
        .insert({
          listing_id: listingId,
          url: imageData.url,
          alt_text: imageData.alt,
          is_primary: imageData.isPrimary || false,
          order_index: imageData.orderIndex || 0
        })

      if (error) {
        throw new Error(`Image insert failed: ${error.message}`)
      }
    } catch (error) {
      console.error('Add image error:', error)
      throw new Error('Failed to add image to listing')
    }
  }

  // Add video to listing
  static async addListingVideo(
    listingId: string,
    videoData: {
      url: string
      title?: string
      thumbnailUrl?: string
      duration?: number
      orderIndex?: number
    }
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('listing_videos')
        .insert({
          listing_id: listingId,
          url: videoData.url,
          title: videoData.title,
          thumbnail_url: videoData.thumbnailUrl,
          duration: videoData.duration,
          order_index: videoData.orderIndex || 0
        })

      if (error) {
        throw new Error(`Video insert failed: ${error.message}`)
      }
    } catch (error) {
      console.error('Add video error:', error)
      throw new Error('Failed to add video to listing')
    }
  }

  // Get listing media
  static async getListingMedia(listingId: string): Promise<{
    images: MediaFile[]
    videos: MediaFile[]
  }> {
    try {
      const [imagesResult, videosResult] = await Promise.all([
        supabase
          .from('listing_images')
          .select('*')
          .eq('listing_id', listingId)
          .order('order_index'),
        supabase
          .from('listing_videos')
          .select('*')
          .eq('listing_id', listingId)
          .order('order_index')
      ])

      return {
        images: imagesResult.data || [],
        videos: videosResult.data || []
      }
    } catch (error) {
      console.error('Get media error:', error)
      return { images: [], videos: [] }
    }
  }

  // Delete listing media
  static async deleteListingMedia(mediaId: string, type: 'image' | 'video'): Promise<void> {
    try {
      const table = type === 'image' ? 'listing_images' : 'listing_videos'
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', mediaId)

      if (error) {
        throw new Error(`Delete media failed: ${error.message}`)
      }
    } catch (error) {
      console.error('Delete media error:', error)
      throw new Error('Failed to delete media')
    }
  }
}
