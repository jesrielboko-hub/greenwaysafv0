import {NextResponse} from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import {randomUUID} from 'node:crypto';

export const runtime='nodejs';
export const dynamic='force-dynamic';
const file=path.join(process.env.GREENWAY_DATA_DIR || path.join(process.cwd(),'data'),'analytics.json');

export async function POST(req:Request){
  try {
    const body=await req.json().catch(()=>({}));
    const page=typeof body?.page==='string' ? body.page.slice(0,300) : '/';
    const referrer=typeof body?.referrer==='string' ? body.referrer.slice(0,500) : '';
    const sessionId=typeof body?.sessionId==='string' ? body.sessionId.slice(0,80) : randomUUID();
    const entry={id:randomUUID(),createdAt:new Date().toISOString(),page,referrer,sessionId};
    fs.mkdirSync(path.dirname(file),{recursive:true});
    let list:any[]=[];
    try { list=JSON.parse(fs.readFileSync(file,'utf8')); if(!Array.isArray(list)) list=[]; } catch {}
    list.push(entry);
    if(list.length>10000) list=list.slice(-10000);
    fs.writeFileSync(file,JSON.stringify(list,null,2),'utf8');
    return new NextResponse(null,{status:204});
  } catch (error) {
    console.error('Greenway analytics failed:',error);
    return new NextResponse(null,{status:204});
  }
}
