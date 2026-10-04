import {NextResponse} from 'next/server'; import fs from 'node:fs'; import path from 'node:path'; import {isAdmin} from '../../../../lib/admin';
const file=path.join(process.env.GREENWAY_DATA_DIR || path.join(process.cwd(),'data'),'leads.json');
export async function GET(){if(!await isAdmin())return NextResponse.json({error:'Unauthorized'},{status:401}); try{return NextResponse.json(JSON.parse(fs.readFileSync(file,'utf8')))}catch{return NextResponse.json([])}}
