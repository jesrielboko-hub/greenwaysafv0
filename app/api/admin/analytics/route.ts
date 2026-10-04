import {NextResponse} from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import {isAdmin} from '../../../../lib/admin';

export const runtime='nodejs';
export const dynamic='force-dynamic';
const file=path.join(process.env.GREENWAY_DATA_DIR || path.join(process.cwd(),'data'),'analytics.json');

export async function GET(){
  if(!await isAdmin()) return NextResponse.json({error:'Unauthorized'},{status:401});
  let list:any[]=[];
  try { list=JSON.parse(fs.readFileSync(file,'utf8')); if(!Array.isArray(list)) list=[]; } catch {}
  const now=Date.now();
  const sevenDaysAgo=now-7*24*60*60*1000;
  const recent=list.filter(x=>new Date(x.createdAt).getTime()>=sevenDaysAgo);
  const sessions=new Set(list.map(x=>x.sessionId).filter(Boolean));
  const recentSessions=new Set(recent.map(x=>x.sessionId).filter(Boolean));
  const pages=new Map<string,number>();
  for(const x of recent) pages.set(x.page,(pages.get(x.page)||0)+1);
  const topPages=[...pages.entries()].sort((a,b)=>b[1]-a[1]).slice(0,8).map(([page,views])=>({page,views}));
  return NextResponse.json({totalViews:list.length,totalVisits:sessions.size,last7DaysViews:recent.length,last7DaysVisits:recentSessions.size,topPages});
}
