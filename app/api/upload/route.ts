import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';

// Allowed image types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'profile' or 'property'

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!type || !['profile', 'property'].includes(type)) {
      return NextResponse.json({ error: 'Invalid image type' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueId = uuidv4();
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `${uniqueId}.${extension}`;

    // Determine upload path based on type
    const uploadDir = type === 'profile' ? 'profiles' : 'properties';
    const uploadPath = join(process.cwd(), 'public', 'uploads', uploadDir);
    
    // Ensure directory exists
    if (!existsSync(uploadPath)) {
      await mkdir(uploadPath, { recursive: true });
    }

    // Write file
    const filePath = join(uploadPath, filename);
    await writeFile(filePath, buffer);

    // Return the public URL for the uploaded image
    const imageUrl = `/uploads/${uploadDir}/${filename}`;
    
    return NextResponse.json({ 
      success: true, 
      imageUrl,
      message: 'Image uploaded successfully' 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
} 