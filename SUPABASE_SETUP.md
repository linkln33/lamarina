# Supabase Setup Guide

## Current Status
The application is currently using **fallback storage** (local data URLs) because Supabase is not properly configured.

## To Enable Supabase Storage

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready

### 2. Get Your Credentials
1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **Anon Key** (public key)
   - **Service Role Key** (secret key)

### 3. Update Environment Variables
Create or update `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 4. Create Storage Buckets
Run this SQL in your Supabase SQL Editor:

```sql
-- Create media bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Public read access for media" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload to media" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update media" ON storage.objects
FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete media" ON storage.objects
FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
```

### 5. Restart Development Server
```bash
npm run dev
```

### 6. Test Upload
1. Go to `/admin/homepage`
2. Navigate to **Hero** tab
3. Try uploading an image
4. You should see "Supabase" badge instead of "Local Storage"

## Current Fallback Behavior

### What Works Now:
- ✅ **Image Upload**: Drag & drop and file selection
- ✅ **Image Preview**: See uploaded images immediately
- ✅ **Image Management**: Remove, set primary, edit alt text
- ✅ **Multiple Files**: Upload multiple images at once
- ✅ **File Validation**: Type and size checking

### Limitations:
- ❌ **Persistence**: Images are stored as data URLs (lost on refresh)
- ❌ **Performance**: Large images as data URLs can be slow
- ❌ **Sharing**: Images can't be shared between sessions
- ❌ **Storage**: No permanent cloud storage

## Benefits of Supabase Storage:
- ✅ **Permanent Storage**: Images persist across sessions
- ✅ **Performance**: Optimized cloud storage
- ✅ **Sharing**: Images can be shared and accessed publicly
- ✅ **Scalability**: Handle large amounts of media
- ✅ **Security**: Proper authentication and access control

## Troubleshooting

### Upload Still Fails:
1. Check that environment variables are correct
2. Verify Supabase project is active
3. Check browser console for errors
4. Ensure storage buckets exist

### Images Not Displaying:
1. Check that bucket is set to public
2. Verify storage policies are correct
3. Check network tab for failed requests

### Permission Errors:
1. Ensure user is authenticated
2. Check storage policies allow uploads
3. Verify service role key is correct

## Development vs Production

### Development (Current):
- Uses local data URLs
- Images lost on page refresh
- Good for testing functionality

### Production (With Supabase):
- Uses cloud storage
- Images persist permanently
- Better performance and scalability