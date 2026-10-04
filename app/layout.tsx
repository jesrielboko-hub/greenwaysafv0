import './globals.css'; import Header from '../components/Header'; import Footer from '../components/Footer'; import {getContent} from '../lib/content'; import type {Metadata} from 'next';
export const dynamic='force-dynamic';
export async function generateMetadata():Promise<Metadata>{const {site}=getContent();return {title:site.name,description:site.description,metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://www.greenwayafs.com'),openGraph:{title:site.name,description:site.description}}}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/>{children}<Footer/><div className="mobile-sticky"><a href="/contact" className="btn btn-primary">REQUEST A FIELD ASSESSMENT <span>→</span></a></div></body></html>}
