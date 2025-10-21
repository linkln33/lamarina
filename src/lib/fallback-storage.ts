// Fallback storage service for development when Supabase is not configured
export interface UploadResult {
  url: string
  path: string
  size: number
  type: string
  filename: string
}

export class FallbackStorageService {
  // Convert file to data URL for local storage
  static async uploadFile(
    file: File, 
    bucket: string = 'media',
    folder: string = 'uploads'
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = () => {
        const dataUrl = reader.result as string
        const timestamp = Date.now()
        const fileExt = file.name.split('.').pop()
        const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`
        
        resolve({
          url: dataUrl,
          path: `${folder}/${filename}`,
          size: file.size,
          type: file.type,
          filename
        })
      }
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'))
      }
      
      reader.readAsDataURL(file)
    })
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

  // Delete file (no-op for fallback)
  static async deleteFile(bucket: string, path: string): Promise<void> {
    console.log(`Fallback: Would delete ${bucket}/${path}`)
  }

  // Get file URL (returns the data URL)
  static getFileUrl(bucket: string, path: string): string {
    return path // In fallback mode, path is the data URL
  }
}
