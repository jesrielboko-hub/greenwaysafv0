import crypto from 'node:crypto';
import {cookies} from 'next/headers';
const COOKIE='greenway_admin';
function secret(){return process.env.SESSION_SECRET || 'change-this-session-secret';}
function sign(value:string){return crypto.createHmac('sha256',secret()).update(value).digest('hex');}
export function createSession(){const value='admin:'+Date.now(); return `${value}.${sign(value)}`;}
export function validSession(value?:string){if(!value)return false; const [raw,sig]=value.split('.'); if(!raw||!sig)return false; return crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(sign(raw))) && raw.startsWith('admin:');}
export async function isAdmin(){return validSession((await cookies()).get(COOKIE)?.value)}
export const adminCookie=COOKIE;
