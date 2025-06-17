// /app/api/static/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { readFile }                 from 'fs/promises';
import { existsSync }               from 'fs';
import { join }                     from 'path';

// Ensure this runs in Node.js (so fs works)
export const runtime = 'nodejs';

// Context where params.path is delivered as a Promise
type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    const { path: segments } = await params;
    const filePath = join(
      process.cwd(),
      'public',
      'uploads',
      ...segments
    );

    if (!existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = await readFile(filePath);

    // Determine content type
    const ext = segments[segments.length - 1].split('.').pop()?.toLowerCase();
    let contentType = 'application/octet-stream';
    switch (ext) {
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
      case 'png':
        contentType = 'image/png';
        break;
      case 'gif':
        contentType = 'image/gif';
        break;
      case 'webp':
        contentType = 'image/webp';
        break;
      case 'svg':
        contentType = 'image/svg+xml';
        break;
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving static file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
