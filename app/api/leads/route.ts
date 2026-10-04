import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const dataDir = process.env.GREENWAY_DATA_DIR || path.join(process.cwd(), 'data');
const file = path.join(dataDir, 'leads.json');
const uploadDir = path.join(process.env.GREENWAY_DATA_DIR || path.join(process.cwd(), 'public', 'uploads'), 'lead-uploads');

function clean(value: unknown) {
  return typeof value === 'string' ? value.slice(0, 5000) : '';
}

async function parseRequest(req: Request) {
  const contentType = req.headers.get('content-type') || '';
  const attachments: { name: string; url: string; size: number; type: string }[] = [];

  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData();
    const data: Record<string, string> = {};
    for (const [key, value] of form.entries()) {
      if (value instanceof File) {
        if (!value.size) continue;
        if (value.size > 10 * 1024 * 1024) throw new Error('Each uploaded image must be 10MB or smaller.');
        if (!value.type.startsWith('image/')) throw new Error('Only image files can be uploaded.');
        fs.mkdirSync(uploadDir, { recursive: true });
        const safeName = value.name.replace(/[^a-z0-9._-]/gi, '_');
        const filename = `${Date.now()}-${randomUUID()}-${safeName}`;
        const target = path.join(uploadDir, filename);
        fs.writeFileSync(target, Buffer.from(await value.arrayBuffer()));
        const url = process.env.GREENWAY_DATA_DIR
          ? `/api/lead-media/${filename}`
          : `/uploads/lead-uploads/${filename}`;
        attachments.push({ name: value.name, url, size: value.size, type: value.type });
      } else {
        data[key] = String(value);
      }
    }
    return { data, attachments };
  }

  const body = await req.json();
  return { data: Object.fromEntries(Object.entries(body || {}).map(([k, v]) => [k, String(v ?? '')])), attachments };
}

export async function POST(req: Request) {
  try {
    const { data, attachments } = await parseRequest(req);
    const type = clean(data.type);
    const email = clean(data.email);
    if (!type || !email) return NextResponse.json({ ok: false, error: 'Email and request type are required.' }, { status: 400 });

    const entry = {
      id: randomUUID(),
      type,
      createdAt: new Date().toISOString(),
      data: { ...data, type: undefined },
      attachments,
    };

    fs.mkdirSync(path.dirname(file), { recursive: true });
    let list: any[] = [];
    try {
      list = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (!Array.isArray(list)) list = [];
    } catch {}
    list.unshift(entry);
    fs.writeFileSync(file, JSON.stringify(list, null, 2), 'utf8');

    return NextResponse.json({ ok: true, id: entry.id }, { status: 201 });
  } catch (error: any) {
    console.error('Greenway lead submission failed:', error);
    return NextResponse.json({ ok: false, error: error?.message || 'Unable to save the submission right now. Please try again.' }, { status: 500 });
  }
}
