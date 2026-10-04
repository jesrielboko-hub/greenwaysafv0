'use client';
import {useState} from 'react';
import {ArrowRight,CheckCircle2,Upload} from 'lucide-react';

export default function Contact(){
 const [sent,setSent]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 async function submit(e:any){
  e.preventDefault(); setBusy(true); setError('');
  const form=e.currentTarget; const fd=new FormData(form); fd.append('type','assessment');
  const controller=new AbortController(); const timeout=setTimeout(()=>controller.abort(),15000);
  try{
   const r=await fetch('/api/leads',{method:'POST',body:fd,signal:controller.signal});
   const result=await r.json().catch(()=>({}));
   if(!r.ok || !result.ok) throw new Error(result.error||'Unable to submit the request.');
   setSent(true); form.reset();
  }catch(err:any){
   setError(err?.name==='AbortError'?'The request took too long. Please try again.':err?.message||'We could not submit the request. Please try again.');
  }finally{clearTimeout(timeout);setBusy(false)}
 }
 return <main><section className="page-hero"><div className="container"><div className="eyebrow">FIELD ASSESSMENT</div><h1 className="display">TELL US ABOUT YOUR FIELD.</h1><p>Whether you're planning construction, solving a field problem or looking for ongoing maintenance, give Greenway the context needed to start the conversation.</p></div></section><section className="section"><div className="container detail-layout"><div><div className="eyebrow">REQUEST A FIELD ASSESSMENT</div><h2 className="display" style={{fontSize:48}}>WHAT ARE YOU SEEING?</h2><p className="muted" style={{lineHeight:1.8}}>Photos are helpful when available. Share drainage, turf, grading, irrigation, infield conditions, construction plans or general field concerns.</p>{sent?<div className="success large"><CheckCircle2/> <div><strong>Thank you.</strong><p>Your field assessment request has been received.</p></div></div>:<form className="form-grid" encType="multipart/form-data" onSubmit={submit}><Field label="First Name" name="firstName" required/><Field label="Last Name" name="lastName" required/><Field label="Organization" name="organization"/><Field label="Email" name="email" type="email" required/><Field label="Phone" name="phone"/><Field label="Field Location" name="location"/><Field label="Field Type" name="fieldType"/><Field label="Project Timeline" name="timeline"/><label className="field full"><span>What can we help with?</span><select name="need"><option>Construction</option><option>Renovation</option><option>Maintenance</option><option>Drainage</option><option>Irrigation</option><option>Grading</option><option>Infield</option><option>Field Repair</option><option>Not sure</option></select></label><label className="field full"><span>Project Description</span><textarea name="description" placeholder="Tell us what you're planning or what you're seeing…"/></label><label className="field full"><span>Field Photos <small>(optional, up to 10MB each)</small></span><div className="upload-input"><Upload size={18}/><input name="photos" type="file" accept="image/*" multiple/><span>Attach photos of the field, problem area or existing conditions.</span></div></label><button className="btn btn-primary" type="submit" disabled={busy}>{busy?'SENDING…':'REQUEST A FIELD ASSESSMENT'} <ArrowRight size={16}/></button>{error&&<p className="form-error full" role="alert">{error}</p>}</form>}</div><aside className="scope"><div className="eyebrow">WHAT HAPPENS NEXT</div><h3>Start with the field.</h3><p className="muted">Share the problem, project or maintenance need. Greenway can use the information to understand what kind of conversation is appropriate.</p><ul><li>Construction planning</li><li>Renovation needs</li><li>Drainage and irrigation</li><li>Turf and maintenance</li><li>Infield and field repairs</li></ul></aside></div></section></main>
}
function Field({label,name,type='text',required=false}:{label:string,name:string,type?:string,required?:boolean}){return <label className="field"><span>{label}</span><input name={name} type={type} required={required}/></label>}
