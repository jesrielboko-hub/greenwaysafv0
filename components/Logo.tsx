import Image from 'next/image';
import Link from 'next/link';

export default function Logo(){
  return <Link href="/" className="brand-logo" aria-label="Greenway Athletic Field Services">
    <Image src="/assets/greenway-logo-transparent.png" alt="Greenway Athletic Field Services" width={250} height={87} priority />
  </Link>
}
