import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

export const dynamic = 'force-dynamic';

const stats: [string, string][] = [
  ['135+', 'Years of combined experience'],
  ['300+', 'Athletic field renovations'],
  ['125+', 'Athletic fields maintained'],
  ['1,000+', 'Acres maintained weekly'],
];

const leadership = [
  {
    role: 'CHAIRMAN OF THE BOARD',
    name: 'Charles W.B. Wardell III',
    bio: "Charles ‘Chuck’ W.B. Wardell III brings decades of experience in business, politics and the military. The current Greenway site describes his career in senior leadership at American Express, Travelers, MasterCard International and Citicorp, along with executive-search leadership and military service.",
  },
  {
    role: 'PRESIDENT & CEO',
    name: 'Rocco Lagana',
    bio: "As a founding member of Greenway Property Services, Rocco Lagana serves as President and CEO. The current Greenway site describes more than 50 years of landscape-industry experience across operations, sales and marketing, with his current focus on the growth of Greenway Athletic Field Services.",
  },
  {
    role: 'CHIEF OPERATING OFFICER',
    name: 'Rocky Lagana',
    bio: "Rocky has been with Greenway Property Services since its inception. The current Greenway site describes more than 15 years of landscape-industry experience and a background spanning operations, bidding, customer service, sales and acquisitions.",
  },
];

export default function About() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">ABOUT GREENWAY</div>
          <h1 className="display">DECADES OF FIELD EXPERIENCE.</h1>
          <p>
            Greenway Athletic Field Services specializes in athletic-field construction,
            renovation and maintenance, with experience rooted in the broader landscape
            and field industry.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container proof-layout">
          <div>
            <div className="eyebrow">THE GREENWAY APPROACH</div>
            <h2 className="display" style={{ fontSize: 48 }}>
              FIELD-FOCUSED. PRACTICAL. EXPERIENCED.
            </h2>
            <p className="muted" style={{ lineHeight: 1.8 }}>
              Greenway&apos;s work centers on the things that determine how athletic
              fields perform: drainage, grading, irrigation, turf, infield materials,
              construction quality and maintenance.
            </p>

            <div className="checklist">
              {stats.map(([number, label]) => (
                <div className="check" key={label}>
                  <div className="check-mark">
                    <Check size={14} />
                  </div>
                  <strong>{number} {label}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="image-wrap proof-image">
            <div className="placeholder">[ADD GREENWAY TEAM / FIELD PHOTO]</div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--gray)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">LEADERSHIP</div>
              <h2 className="display">THE PEOPLE BEHIND THE WORK.</h2>
            </div>
            <p>
              Leadership bios below are based on the current Greenway website and can
              be updated from the admin portal.
            </p>
          </div>

          <div className="leadership-grid">
            {leadership.map((person) => (
              <article className="leader-card" key={person.name}>
                <div className="eyebrow">{person.role}</div>
                <h3 className="display">{person.name}</h3>
                <p>{person.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">COLLABORATION</div>
              <h2 className="display">INDUSTRY PARTNERS.</h2>
            </div>
            <p>
              Greenway&apos;s current website identifies these organizations as
              industry partners and associations.
            </p>
          </div>

          <div className="partner-panel">
            <Image
              src="/assets/industry-partners.png"
              alt="Greenway industry partners and associations"
              width={2000}
              height={650}
            />
          </div>
        </div>
      </section>

      <section className="section cta">
        <div className="container cta-inner">
          <div>
            <div className="eyebrow">START WITH YOUR FIELD</div>
            <h2 className="display">TALK TO GREENWAY.</h2>
            <p>Tell us what you&apos;re planning, maintaining or trying to solve.</p>
          </div>

          <Link
            href="/contact"
            className="btn"
            style={{ background: 'white', color: 'var(--green)' }}
          >
            REQUEST A FIELD ASSESSMENT <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
