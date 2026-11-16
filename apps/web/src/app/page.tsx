import Image from "next/image";
import type { ReactNode } from "react";

type IconName =
  | "arrow"
  | "calendar"
  | "check"
  | "document"
  | "globe"
  | "guests"
  | "heart"
  | "lock"
  | "plane"
  | "sparkle"
  | "wallet"
  | "wardrobe";

const iconContents: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M7.5 3v4M16.5 3v4M4 9.5h16" />
    </>
  ),
  check: <path d="m5 12 4.2 4.2L19 6.5" />,
  document: (
    <>
      <path d="M7 3.5h7l4.5 4.7v12.3H7z" />
      <path d="M14 3.5v5h4.5M10 13h5M10 16.5h5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 12h16.4M12 3.5c2.1 2.3 3.2 5.1 3.2 8.5s-1.1 6.2-3.2 8.5c-2.1-2.3-3.2-5.1-3.2-8.5s1.1-6.2 3.2-8.5Z" />
    </>
  ),
  guests: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.5-3 2.3-4.5 5.5-4.5s5 1.5 5.5 4.5M16 5.5a3 3 0 0 1 0 5.8m1 3.3c2.2.5 3.4 1.9 3.6 4.4" />
    </>
  ),
  heart: <path d="M20 8.8c0 4.1-8 9.7-8 9.7S4 12.9 4 8.8a4.3 4.3 0 0 1 8-2.2 4.3 4.3 0 0 1 8 2.2Z" />,
  lock: (
    <>
      <rect x="4.5" y="10" width="15" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
    </>
  ),
  plane: (
    <>
      <path d="m3 11 18-7-7 18-3-8-8-3Z" />
      <path d="m11 14 5-5" />
    </>
  ),
  sparkle: (
    <>
      <path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Z" />
      <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 6.5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h13" />
      <path d="M16 12h5m-5 0a2 2 0 1 0 0 4h5v-4h-5Z" />
    </>
  ),
  wardrobe: (
    <>
      <path d="M12 4.5a3 3 0 1 0-3 3M12 4.5a3 3 0 1 1 3 3M12 7.5 4 11v9h16v-9l-8-3.5Z" />
      <path d="M9 20v-5h6v5" />
    </>
  ),
};

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {iconContents[name]}
    </svg>
  );
}

function BrandMark() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 44 44">
      <circle cx="16.5" cy="22" r="11.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="27.5" cy="22" r="11.5" stroke="#D4AF37" strokeWidth="1.6" />
      <path d="m22 16 1.7 4.2L28 22l-4.3 1.8L22 28l-1.7-4.2L16 22l4.3-1.8L22 16Z" fill="#D4AF37" />
    </svg>
  );
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a aria-label="Make My Marriage home" className={`brand${footer ? " brand-footer" : ""}`} href="#top">
      <span className="brand-mark"><BrandMark /></span>
      <span className="brand-name">Make My Marriage</span>
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-intro section-intro-${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-description">{description}</p>
    </div>
  );
}

const eventRows = [
  { date: "DEC 12", event: "Mehendi", status: "100% Ready", progress: 100 },
  { date: "DEC 13", event: "Sangeet", status: "85% Locked", progress: 85 },
  { date: "DEC 14", event: "Pheras", status: "70% Progress", progress: 70 },
  { date: "DEC 15", event: "Reception", status: "Final Details", progress: 92 },
];

const clarityCards: { icon: IconName; title: string; copy: string }[] = [
  { icon: "guests", title: "Shared Family Collaboration", copy: "Coordinate ceremony workflows and family tasks without WhatsApp chaos." },
  { icon: "calendar", title: "Multi-Day Run of Show", copy: "Master schedules and precise run-down sheets for every event." },
  { icon: "wallet", title: "Transparent Expenses", copy: "Clear shared ledgers with customizable family privacy boundaries." },
  { icon: "document", title: "Digital Document Vault", copy: "Store vendor agreements, appraisal receipts, and contracts securely." },
];

const roles = [
  { tier: "TIER 1 / MASTER ADMINS", title: "Bride & Groom", copy: "Full workspace visibility, ultimate budget approvals, and master ceremony control.", icon: "heart" as const },
  { tier: "TIER 2 / COORDINATORS", title: "Core Families", copy: "Manage family guest allotments, specific ceremony logistics, and dedicated ledgers.", icon: "guests" as const },
  { tier: "TIER 3 / SPECIALISTS", title: "Trusted Team", copy: "Execution scopes for airport transfers, decor sign-offs, and guest concierge with zero financial access.", icon: "sparkle" as const },
];

const modules: { icon: IconName; title: string; copy: string }[] = [
  { icon: "calendar", title: "Multi-Day Events", copy: "Run-of-show itineraries and hourly call sheets for every ceremony." },
  { icon: "check", title: "Smart RSVPs", copy: "Track family units, meal preferences, flights, and room allocations." },
  { icon: "wallet", title: "Expense Splits", copy: "Split vendor payments seamlessly with family-level privacy." },
  { icon: "document", title: "Vendor Hub", copy: "Centralize caterers, decorators, and photo crews with sign-off milestones." },
  { icon: "wardrobe", title: "Wardrobe & Logistics", copy: "Coordinate color palettes, attire schedules, and safa logistics." },
  { icon: "globe", title: "Guest Concierge", copy: "Mobile-first portals with itinerary countdowns and live photo sharing." },
];

const steps = [
  { number: "01", title: "Create Workspace", copy: "Set dates and venues in 2 minutes." },
  { number: "02", title: "Invite Both Families", copy: "Grant role-based access to parents and coordinators." },
  { number: "03", title: "Plan in Real-Time", copy: "Track RSVPs, vendor milestones, and budgets." },
  { number: "04", title: "Celebrate in Peace", copy: "Execute every ritual without chaos." },
];

const securityFeatures = [
  { icon: "lock" as const, title: "Role-Based Access", copy: "Strict isolation ensures only designated parents view confidential ledgers and quotes." },
  { icon: "globe" as const, title: "Private Guest Links", copy: "Signed magic links prevent public search indexing and scraping." },
  { icon: "heart" as const, title: "Bank-Grade Encryption", copy: "256-bit encryption in transit and at rest on ISO 27001 certified cloud servers." },
];

const testimonials = [
  { names: "Tanya & Kabir", location: "Mumbai · 480 Guests", quote: "Our parents were in Delhi and Bangalore while we were in London. Make My Marriage kept all six of us in sync without a single argument." },
  { names: "Dev & Meera", location: "Jaipur · 620 Guests", quote: "Assigning airport pickups to cousins with their own sub-dashboard meant 200 out-of-town guests arrived seamlessly." },
  { names: "Priya & Arjun", location: "Udaipur · 520 Guests", quote: "The multi-event RSVP tracker saved us ₹8 Lakhs in catering waste by giving our caterers exact headcounts." },
];

export default function HomePage() {
  return (
    <main id="top">
      <header className="site-header">
        <div className="header-inner shell">
          <Brand />
          <nav aria-label="Main navigation" className="desktop-nav">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#guest-experience">Guest Experience</a>
            <a href="#security">Security</a>
          </nav>
          <div className="header-actions">
            <a className="login-link" href="#get-started">Log in</a>
            <a className="button button-small button-dark" href="#get-started">Start Planning <Icon name="arrow" /></a>
          </div>
          <details className="mobile-menu">
            <summary aria-label="Open navigation menu"><span /><span /></summary>
            <nav aria-label="Mobile navigation">
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#guest-experience">Guest Experience</a>
              <a href="#security">Security</a>
              <a href="#get-started">Log in</a>
              <a className="mobile-menu-cta" href="#get-started">Start Planning <Icon name="arrow" /></a>
            </nav>
          </details>
        </div>
      </header>

      <section className="hero">
        <div className="shell hero-shell">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-star">✦</span> The Collaborative Wedding Platform</p>
            <h1>One Wedding.<br /><em>One Shared Journey.</em></h1>
            <p className="hero-description">The collaborative digital workspace uniting couples and both families in complete harmony.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#get-started">Create Your Wedding <Icon name="arrow" /></a>
              <a className="button button-outline" href="#how-it-works">Explore How It Works</a>
            </div>
            <div className="hero-stats" aria-label="Platform statistics">
              <div><strong>₹45 Cr+</strong><span>Budgets Managed</span></div>
              <div><strong>99.4%</strong><span>RSVP Precision</span></div>
              <div><strong>Two Families</strong><span>In Sync</span></div>
            </div>
          </div>

          <div className="showcase-grid">
            <article className="dashboard-card" aria-label="Wedding workspace dashboard preview">
              <div className="dashboard-head">
                <div className="dashboard-brand"><BrandMark /></div>
                <div className="dashboard-heading"><span className="dashboard-kicker">YOUR SHARED WORKSPACE</span><h2>Ananya &amp; Rohan’s Wedding</h2><p>Udaipur, Rajasthan <i /> Dec 12–15, 2025</p></div>
                <span className="dashboard-live"><i /> Live</span>
              </div>
              <div className="dashboard-summary">
                <div className="summary-event"><span className="summary-icon"><Icon name="sparkle" /></span><span><small>NEXT CELEBRATION</small><strong>3 Days to Sangeet</strong></span></div>
                <div className="summary-people"><span className="avatar avatar-one">A</span><span className="avatar avatar-two">R</span><span className="avatar avatar-three">S</span><span className="avatar avatar-four">K</span><small>Both families are here</small></div>
              </div>
              <div className="dashboard-body">
                <div className="events-panel">
                  <div className="panel-heading"><div><span className="dashboard-kicker">THE CELEBRATION</span><h3>Event timeline</h3></div><a href="#how-it-works">View all <Icon name="arrow" /></a></div>
                  <div className="event-list">
                    {eventRows.map((event) => (
                      <div className="event-row" key={event.date}>
                        <span className="event-date">{event.date}</span>
                        <span className="event-name">{event.event}</span>
                        <span className="event-progress"><i style={{ width: `${event.progress}%` }} /></span>
                        <span className="event-status">{event.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="dashboard-widgets">
                  <div className="budget-widget">
                    <div className="widget-heading"><span className="widget-icon"><Icon name="wallet" /></span><span><small>FAMILY OVERVIEW</small><strong>Budget Sync</strong></span><span className="widget-more">•••</span></div>
                    <div className="budget-amount"><strong>₹61.2L</strong><span>/ ₹85L</span></div>
                    <div className="budget-bar"><span /></div>
                    <div className="family-budgets"><span><i className="budget-dot budget-dot-one" />Sharma <b>₹38.2L</b></span><span><i className="budget-dot budget-dot-two" />Kapoor <b>₹23L</b></span></div>
                  </div>
                  <div className="rsvp-widget">
                    <div className="widget-heading"><span className="widget-icon widget-icon-green"><Icon name="guests" /></span><span><small>GUESTS</small><strong>RSVP Attendance</strong></span></div>
                    <div className="rsvp-data"><strong>482 <small>/ 540</small></strong><span className="rsvp-ring"><i>92%</i></span></div>
                    <div className="rsvp-caption"><i /> 92% Confirmed</div>
                  </div>
                </div>
              </div>
            </article>
            <figure className="wedding-photo-card">
              <Image
                alt="Wedding couple"
                className="wedding-photo"
                fill
                priority
                sizes="(max-width: 800px) 100vw, 32vw"
                src="/images/stitch-wedding-couple.jpg"
              />
              <figcaption className="photo-caption"><span>THE CELEBRATION</span><strong>The Oberoi Udaivilas, Udaipur</strong><small>Ananya &amp; Rohan</small></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="clarity-section section-pad" id="families">
        <div className="shell">
          <SectionIntro eyebrow="OPERATIONAL CLARITY" title="Designed for Two Families" description="A single shared sanctuary replacing fragmented spreadsheets and WhatsApp groups." align="center" />
          <div className="clarity-grid">
            {clarityCards.map((card, index) => (
              <article className="clarity-card" key={card.title}>
                <span className="card-index">0{index + 1}</span>
                <span className="card-icon"><Icon name={card.icon} /></span>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ownership-section section-pad">
        <div className="shell">
          <SectionIntro eyebrow="GOVERNANCE" title="Equal Co-Ownership" description="Clear roles and tailored views for couples, parents, and wedding teams." align="center" />
          <div className="role-grid">
            {roles.map((role) => (
              <article className="role-card" key={role.tier}>
                <div className="role-topline"><span>{role.tier}</span><span className="role-icon"><Icon name={role.icon} /></span></div>
                <h3>{role.title}</h3>
                <p>{role.copy}</p>
                <span className="role-link">Explore permissions <Icon name="arrow" /></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section section-pad" id="features">
        <div className="shell">
          <SectionIntro eyebrow="CAPABILITIES" title="Everything in One Workspace" description="Six unified modules designed for multi-day celebratory scale." align="center" />
          <div className="module-grid">
            {modules.map((module) => (
              <article className="module-card" key={module.title}>
                <span className="module-icon"><Icon name={module.icon} /></span>
                <h3>{module.title}</h3>
                <p>{module.copy}</p>
                <span className="module-arrow"><Icon name="arrow" /></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="steps-section section-pad" id="how-it-works">
        <div className="shell">
          <SectionIntro eyebrow="THE JOURNEY" title="Four Calm Steps" description="Simple onboarding designed for effortless adoption across generations." align="center" />
          <div className="steps-grid">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <span className="step-number">{step.number}</span>
                <span className="step-marker"><i /></span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="guest-section section-pad" id="guest-experience">
        <div className="shell guest-grid">
          <div className="portal-wrap">
            <div className="portal-card">
              <div className="portal-browser"><span className="browser-dots"><i /><i /><i /></span><span className="portal-domain">ananya-rohan.makemymarriage.com</span><span className="portal-status"><i /> Live Portal</span></div>
              <div className="portal-cover">
                <Image alt="Wedding couple at their celebration" className="portal-photo" fill sizes="(max-width: 800px) 100vw, 36vw" src="/images/stitch-wedding-couple.jpg" />
                <div className="portal-cover-copy"><span>YOU’RE INVITED</span><h3>Join Us In Udaipur</h3></div>
              </div>
              <div className="portal-content">
                <div className="portal-couple"><span>ANANYA <i>&amp;</i> ROHAN</span><small>December 12–15, 2025 <b>·</b> Udaipur, Rajasthan</small></div>
                <div className="portal-itinerary">
                  <div><span className="portal-day">DAY 1</span><span><strong>Mehendi Sundowner</strong><small>4:00 PM <i>·</i> Lawn</small></span><Icon name="arrow" /></div>
                  <div><span className="portal-day">DAY 2</span><span><strong>Sangeet &amp; Cocktails</strong><small>7:30 PM <i>·</i> Ballroom</small></span><Icon name="arrow" /></div>
                  <div><span className="portal-day">DAY 3</span><span><strong>Muhurtham &amp; Pheras</strong><small>10:00 AM <i>·</i> Courtyard</small></span><Icon name="arrow" /></div>
                </div>
                <div className="portal-actions"><span>RSVP Now <Icon name="arrow" /></span><span><Icon name="plane" /> Airport Shuttles</span></div>
              </div>
            </div>
            <div className="portal-note"><span className="portal-note-icon"><Icon name="globe" /></span><span><strong>One lovely place for every guest</strong><small>Always in sync with your celebration</small></span></div>
          </div>
          <div className="guest-copy">
            <SectionIntro eyebrow="GUEST EXPERIENCE" title="Personalized Guest Portal" description="A refined mobile web portal synced in real-time with your schedule." />
            <ul className="guest-benefits">
              <li><span><Icon name="check" /></span> Live itineraries for every event</li>
              <li><span><Icon name="check" /></span> Easy RSVPs and travel details</li>
              <li><span><Icon name="check" /></span> A thoughtful welcome for every guest</li>
            </ul>
            <a className="text-link" href="#get-started">Explore the guest experience <Icon name="arrow" /></a>
          </div>
        </div>
      </section>

      <section className="security-section section-pad" id="security">
        <div className="shell">
          <SectionIntro eyebrow="CONFIDENCE" title="Private & Secure" description="Bank-grade infrastructure safeguarding sensitive family records and contracts." align="center" />
          <div className="security-grid">
            {securityFeatures.map((feature) => (
              <article className="security-card" key={feature.title}>
                <span className="security-icon"><Icon name={feature.icon} /></span>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
                <span className="security-check"><Icon name="check" /> Protected by design</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section section-pad">
        <div className="shell">
          <SectionIntro eyebrow="REAL CELEBRATIONS" title="Trusted by Couples & Families" description="Real experiences from multi-family teams across the globe." align="center" />
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <figure className="testimonial-card" key={testimonial.names}>
                <span aria-label="5 out of 5 stars" className="testimonial-stars">★★★★★</span>
                <blockquote>“{testimonial.quote}”</blockquote>
                <figcaption><span className="testimonial-avatar">{testimonial.names.slice(0, 1)}</span><span><strong>{testimonial.names}</strong><small>{testimonial.location}</small></span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-section" id="get-started">
        <div className="closing-shell shell">
          <span className="closing-ornament"><BrandMark /></span>
          <p className="eyebrow">BEGIN YOUR WORKSPACE</p>
          <h2>Your wedding deserves<br /><em>a beautiful plan.</em></h2>
          <p className="closing-description">Join thousands of couples and families planning the celebration of their lives in one shared workspace.</p>
          <a className="button button-light" href="#top">Start Your Wedding Journey <Icon name="arrow" /></a>
          <span className="closing-note">Made for two of you, and everyone you love.</span>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <Brand footer />
          <nav aria-label="Footer navigation"><a href="#features">Features</a><a href="#how-it-works">How It Works</a><a href="#guest-experience">Guest Experience</a><a href="#security">Security</a><a href="#privacy">Privacy Policy</a></nav>
          <span className="copyright">© 2025 Make My Marriage Inc. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
