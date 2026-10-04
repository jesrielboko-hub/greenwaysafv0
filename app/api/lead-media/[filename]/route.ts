import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ filename: string }> };

export async function GET(_req: Request, context: RouteContext) {
  const { filename } = await context.params;
  const safe = path.basename(filename);
  const root = process.env.GREENWAY_DATA_DIR;
  if (!root) {
    return NextResponse.json({ error: 'Persistent media storage is not configured.' }, { status: 404 });
  }

  const file = path.join(root, 'lead-uploads', safe);
  if (!fs.existsSync(file)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const ext = path.extname(safe).toLowerCase();
  const types: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  };

  return new NextResponse(fs.readFileSync(file), {
    headers: {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Cache-Control': 'private, max-age=3600',
    },
  });
}
