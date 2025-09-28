import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'uploads';
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // For development, we'll use a simple file system approach
    // In production with Netlify, this would be handled by Netlify Functions
    
    // Create a unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    // For now, return a placeholder URL
    // In a real Netlify setup, you'd save to the file system or use Netlify's storage
    const url = `/uploads/${folder}/${filename}`;
    
    return NextResponse.json({ 
      url,
      filename,
      size: file.size,
      type: file.type
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}


