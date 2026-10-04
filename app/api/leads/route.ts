import {randomUUID} from 'node:crypto';
import {NextResponse} from 'next/server'; import fs from 'node:fs'; import path from 'node:path';
const file=path.join(process.env.GREENWAY_DATA_DIR || path.join(process.cwd(),'data'),'leads.json');
export async function POST(req:Request){const body=await req.json().catch(()=>({})); if(!body.type||!body.email)return NextResponse.json({error:'Email and type are required'},{status:400}); const entry={id:randomUUID(),type:body.type,createdAt:new Date().toISOString(),data:body}; fs.mkdirSync(path.dirname(file),{recursive:true}); let list:any[]=[];try{list=JSON.parse(fs.readFileSync(file,'utf8'))}catch{};list.unshift(entry);fs.writeFileSync(file,JSON.stringify(list,null,2));return NextResponse.json({ok:true});}
