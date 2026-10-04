'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

function getSessionId(){
  try{
    const key='greenway_analytics_session';
    let id=sessionStorage.getItem(key);
    if(!id){id=crypto.randomUUID();sessionStorage.setItem(key,id)}
    return id;
  }catch{return 'anonymous-session'}
}

export default function AnalyticsTracker(){
  const pathname=usePathname();
  useEffect(()=>{
    fetch('/api/analytics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({page:pathname,referrer:document.referrer,sessionId:getSessionId()}),keepalive:true}).catch(()=>{});
  },[pathname]);
  return null;
}
