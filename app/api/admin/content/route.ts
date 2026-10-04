import {NextResponse} from 'next/server'; import {getContent,saveContent,SiteContent} from '../../../../lib/content'; import {isAdmin} from '../../../../lib/admin';
export async function GET(){if(!await isAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});return NextResponse.json(getContent());}
export async function PUT(req:Request){if(!await isAdmin())return NextResponse.json({error:'Unauthorized'},{status:401}); const body=await req.json(); saveContent(body as SiteContent); return NextResponse.json({ok:true,content:getContent()});}
