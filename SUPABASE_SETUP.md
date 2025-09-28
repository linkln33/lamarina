# Supabase Database Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `lamarina-bg`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your location
6. Click "Create new project"
7. Wait for the project to be ready (2-3 minutes)

## Step 2: Get Project Credentials

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-ref.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`)

## Step 3: Create Environment File

Create `.env.local` in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Next.js Configuration
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=development

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=LAMARINA BG
```

## Step 4: Set Up Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Click "New Query"
3. Copy and paste the entire content from `supabase-schema.sql`
4. Click "Run" to execute the schema

## Step 5: Set Up Storage

1. Go to **Storage** in your Supabase dashboard
2. Click "Create a new bucket"
3. Enter bucket name: `images`
4. Make it **Public**
5. Click "Create bucket"

## Step 6: Configure Storage Policies

1. Go to **Storage** → **Policies**
2. Click "New Policy" for the `images` bucket
3. Add these policies:

### Policy 1: Allow public read access
```sql
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
```

### Policy 2: Allow authenticated uploads
```sql
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
```

### Policy 3: Allow authenticated updates
```sql
CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
```

### Policy 4: Allow authenticated deletes
```sql
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
```

## Step 7: Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/admin/listings`

3. Try creating a new listing and uploading images

## Troubleshooting

### Images not uploading?
- Check that the `images` bucket exists and is public
- Verify storage policies are set correctly
- Check browser console for errors

### Database connection issues?
- Verify environment variables are correct
- Check that the database schema was applied
- Ensure RLS policies are configured

### Still having issues?
- Check the Supabase logs in the dashboard
- Verify your project is not paused
- Make sure you're using the correct region

## Quick Test Commands

```bash
# Check if environment variables are loaded
echo $NEXT_PUBLIC_SUPABASE_URL

# Test the application
curl http://localhost:3000/admin/listings
```


