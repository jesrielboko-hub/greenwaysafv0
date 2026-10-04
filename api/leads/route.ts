import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const dataDir = process.env.GREENWAY_DATA_DIR || path.join(process.cwd(), 'data');
const file = path.join(dataDir, 'leads.json');

function clean(value: unknown) {
  return typeof value === 'string' ? value.slice(0, 5000).trim() : '';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const type = clean(body?.type);
    const email = clean(body?.email);

    if (!type || !email) {
      return NextResponse.json({ ok: false, error: 'Email and request type are required.' }, { status: 400 });
    }

    const entry = {
      id: randomUUID(),
      type,
      createdAt: new Date().toISOString(),
      data: Object.fromEntries(
        Object.entries(body || {})
          .filter(([key]) => key !== 'type')
          .map(([key, value]) => [key, clean(value)])
      ),
    };

    fs.mkdirSync(dataDir, { recursive: true });
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
    return NextResponse.json(
      { ok: false, error: error?.message || 'Unable to save the submission right now. Please try again.' },
      { status: 500 }
    );
  }
}
