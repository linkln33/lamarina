# Media Storage Setup Guide

## Supabase Storage Configuration

This project uses Supabase Storage for handling image uploads in the admin panel. Follow these steps to set up the storage buckets:

### 1. Access Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**

### 2. Create Storage Buckets

#### Media Bucket (for images and videos)
- **Bucket name**: `media`
- **Public bucket**: ✅ Yes
- **File size limit**: 10MB
- **Allowed MIME types**: 
  - `image/jpeg`
  - `image/png` 
  - `image/webp`
  - `image/gif`
  - `video/mp4`
  - `video/webm`

#### Documents Bucket (for PDFs and documents)
- **Bucket name**: `documents`
- **Public bucket**: ✅ Yes
- **File size limit**: 50MB
- **Allowed MIME types**:
  - `application/pdf`
  - `application/msword`
  - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

### 3. Set Up Storage Policies

Run the SQL script in `scripts/setup-storage.sql` in your Supabase SQL editor to create the necessary policies.

### 4. Environment Variables

Make sure your `.env.local` file contains the correct Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 5. Test the Setup

1. Start your development server: `npm run dev`
2. Go to `/admin/homepage`
3. Navigate to the **Hero** tab
4. Try uploading an image in the **Carousel изображения** section
5. The image should upload to Supabase Storage and display with a green "Supabase" badge

### 6. Features

- **Drag & Drop Upload**: Users can drag and drop images directly
- **Multiple File Upload**: Upload multiple images at once
- **Image Preview**: See uploaded images immediately
- **Alt Text Management**: Add alt text for accessibility
- **Primary Image Selection**: Mark one image as primary
- **File Management**: Remove images easily
- **Supabase Integration**: All images stored securely in Supabase Storage

### 7. Troubleshooting

#### Upload Fails
- Check that Supabase credentials are correct
- Verify storage buckets exist and are public
- Check browser console for error messages

#### Images Not Displaying
- Ensure the bucket is set to public
- Check that storage policies allow public read access
- Verify the image URLs are correct

#### Permission Errors
- Make sure storage policies are set up correctly
- Check that the user is authenticated (for admin uploads)

### 8. File Structure

```
src/
├── components/ui/
│   └── enhanced-image-upload.tsx    # Main upload component
├── lib/
│   └── storage.ts                   # Supabase storage service
└── scripts/
    └── setup-storage.sql           # Storage setup SQL
```

### 9. Usage in Components

```tsx
import { EnhancedImageUpload } from '@/components/ui/enhanced-image-upload';

<EnhancedImageUpload
  images={images}
  onImagesChange={setImages}
  maxImages={10}
  bucket="media"
  folder="hero-carousel"
/>
```

This setup provides a robust, scalable solution for handling media uploads in your admin panel.