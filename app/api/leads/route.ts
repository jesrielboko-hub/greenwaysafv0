import {randomUUID} from 'node:crypto';
import {NextResponse} from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export const runtime='nodejs';
export const dynamic='force-dynamic';

const file=path.join(process.env.GREENWAY_DATA_DIR || path.join(process.cwd(),'data'),'leads.json');

export async function POST(req:Request){
  try {
    const body=await req.json();
    if(!body?.type || !body?.email) return NextResponse.json({ok:false,error:'Email and type are required'},{status:400});
    const entry={id:randomUUID(),type:String(body.type),createdAt:new Date().toISOString(),data:body};
    fs.mkdirSync(path.dirname(file),{recursive:true});
    let list:any[]=[];
    try { list=JSON.parse(fs.readFileSync(file,'utf8')); if(!Array.isArray(list)) list=[]; } catch {}
    list.unshift(entry);
    fs.writeFileSync(file,JSON.stringify(list,null,2),'utf8');
    return NextResponse.json({ok:true,id:entry.id},{status:201});
  } catch (error) {
    console.error('Greenway lead submission failed:',error);
    return NextResponse.json({ok:false,error:'Unable to save the submission right now. Please try again.'},{status:500});
  }
}
