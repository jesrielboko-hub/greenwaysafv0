import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    if (!name || !email) return NextResponse.json({ ok: false, error: 'Name and email are required.' }, { status: 400 });

    const dataDir = process.env.GREENWAY_DATA_DIR || path.join(process.cwd(), 'data');
    const file = path.join(dataDir, 'leads.json');
    fs.mkdirSync(dataDir, { recursive: true });

    let list: any[] = [];
    try {
      list = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (!Array.isArray(list)) list = [];
    } catch {}

    const entry = {
      id: randomUUID(),
      type: 'guide',
      createdAt: new Date().toISOString(),
      data: {
        name,
        organization: typeof body.organization === 'string' ? body.organization.trim() : '',
        email,
        phone: typeof body.phone === 'string' ? body.phone.trim() : '',
      },
      attachments: [],
    };

    list.unshift(entry);
    fs.writeFileSync(file, JSON.stringify(list, null, 2), 'utf8');
    return NextResponse.json({ ok: true, id: entry.id }, { status: 201 });
  } catch (error) {
    console.error('Greenway guide request failed:', error);
    return NextResponse.json({ ok: false, error: 'Unable to save the guide request right now. Please try again.' }, { status: 500 });
  }
}
