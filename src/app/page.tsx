import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background — will be replaced with real hero image */}
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-800 via-ocean-600 to-ocean-500" />
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Decorative wave texture */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-sand-50" style={{ clipPath: 'ellipse(75% 100% at 50% 100%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-sm mb-8">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="5" r="2" />
            <path d="M10 22V18L7 15.5" strokeLinecap="round" />
            <path d="M14 22V18L17 15.5" strokeLinecap="round" />
            <circle cx="12" cy="17" r="5" />
          </svg>
          Built by a wheelchair-using family
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          The Beach Is
          <br />
          <span className="text-coral-300">For Everyone</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-body">
          Verified wheelchair-accessible vacation rentals, beach access guides, and restaurant reviews on Florida&apos;s Highway 30A. From real wheelchair users who&apos;ve been there.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/accessible-rentals"
            className="w-full sm:w-auto px-8 py-4 bg-coral-400 hover:bg-coral-500 text-white font-semibold rounded-full text-lg transition-all hover:shadow-lg hover:shadow-coral-400/30"
          >
            Find Accessible Rentals
          </Link>
          <Link
            href="/beach-access"
            className="w-full sm:w-auto px-8 py-4 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-semibold rounded-full text-lg transition-all border border-white/30"
          >
            Beach Access Guide
          </Link>
        </div>

        {/* Trust signal */}
        <div className="mt-12 flex items-center justify-center gap-8 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Wheelchair-verified
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            7 accessible beach access points
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Free beach wheelchairs
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FLAGSHIP PROPERTY ───────────────────────────────────────────────────────

function FlagshipProperty() {
  return (
    <section className="py-20 sm:py-28 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold border border-green-200 mb-4">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Fully Verified
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ocean-900 mb-4">
            Our Flagship Property
          </h2>
          <p className="text-ocean-600 text-lg max-w-2xl mx-auto">
            Purpose-built for wheelchair accessibility after 15 years of searching for the perfect accessible 30A rental.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-sand-200/60">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image placeholder */}
            <div className="aspect-[4/3] md:aspect-auto bg-gradient-to-br from-ocean-200 to-ocean-300 flex items-center justify-center">
              <div className="text-center text-ocean-600 p-8">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
                </svg>
                <p className="text-sm font-medium">Photo coming this weekend</p>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ocean-900 mb-2">
                Slim Shady Beach House
              </h3>
              <p className="text-ocean-600 mb-6">
                Seagrove Beach &middot; 4 bed &middot; 4 bath &middot; Sleeps 10
              </p>

              {/* Key accessibility features */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: '🦽', label: 'Zero-step entry throughout' },
                  { icon: '🚿', label: 'Roll-in showers with grab bars' },
                  { icon: '🏊', label: 'Pool with ramp access' },
                  { icon: '🏖️', label: 'Beach wheelchair included' },
                  { icon: '📐', label: '36"+ doorways everywhere' },
                  { icon: '🅿️', label: 'Level driveway parking' },
                ].map((feature) => (
                  <div key={feature.label} className="flex items-start gap-2">
                    <span className="text-lg">{feature.icon}</span>
                    <span className="text-sm text-ocean-700">{feature.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/accessible-rentals/slim-shady-beach-house"
                  className="px-6 py-3 bg-coral-400 hover:bg-coral-500 text-white font-semibold rounded-full text-center transition-colors"
                >
                  View Full Listing
                </Link>
                <a
                  href="https://oversee.us/vrp/unit/Slim_Shady-297-15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-ocean-100 hover:bg-ocean-200 text-ocean-700 font-semibold rounded-full text-center transition-colors"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BEACH ACCESS GRID ───────────────────────────────────────────────────────

const BEACH_ACCESSES = [
  { name: 'Miramar Beach Regional', slug: 'miramar-beach-regional', wheelchair: true, mobiMat: false, vibe: 'High-energy, near Pompano Joe\'s' },
  { name: 'Dune Allen Regional', slug: 'dune-allen-regional', wheelchair: true, mobiMat: false, vibe: 'Quiet, across from Stinky\'s Fish Camp' },
  { name: 'Fort Panic Regional', slug: 'fort-panic-regional', wheelchair: false, mobiMat: false, vibe: 'Spacious, room to spread out' },
  { name: 'Ed Walline Regional', slug: 'ed-walline-regional', wheelchair: true, mobiMat: true, vibe: 'Best overall — Mobi Mat + wheelchair' },
  { name: 'Van Ness Butler Jr Regional', slug: 'van-ness-butler-regional', wheelchair: true, mobiMat: false, vibe: 'Stunning zigzag ramp, near Seaside' },
  { name: 'Santa Clara Regional', slug: 'santa-clara-regional', wheelchair: true, mobiMat: false, vibe: 'Long switchback ramp, Seagrove Beach' },
  { name: 'Inlet Beach Regional', slug: 'inlet-beach-regional', wheelchair: true, mobiMat: false, vibe: 'Most private, eastern end of 30A' },
];

function BeachAccessSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ocean-900 mb-3">
              Wheelchair-Accessible Beach Access
            </h2>
            <p className="text-ocean-600 text-lg max-w-2xl">
              Seven ADA-accessible beach access points along 30A with ramps, free beach wheelchairs, and lifeguard support.
            </p>
          </div>
          <Link
            href="/beach-access"
            className="mt-4 sm:mt-0 text-ocean-600 hover:text-ocean-800 font-semibold text-sm flex items-center gap-1 transition-colors"
          >
            View full guide
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {BEACH_ACCESSES.map((beach) => (
            <Link
              key={beach.slug}
              href={`/beach-access/${beach.slug}`}
              className="group p-5 rounded-xl border border-sand-200 hover:border-ocean-300 hover:shadow-md transition-all bg-sand-50/50"
            >
              <h3 className="font-semibold text-ocean-900 mb-1 group-hover:text-ocean-600 transition-colors">
                {beach.name}
              </h3>
              <p className="text-sm text-ocean-500 mb-3">{beach.vibe}</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="feature-pill text-xs">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ADA Ramp
                </span>
                {beach.wheelchair && (
                  <span className="feature-pill text-xs">🦽 Beach Wheelchair</span>
                )}
                {beach.mobiMat && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-coral-100 text-coral-700 font-medium">
                    ⭐ Mobi Mat
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Beach wheelchair info callout */}
        <div className="mt-8 p-6 rounded-xl bg-ocean-50 border border-ocean-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-ocean-500 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🦽</span>
            </div>
            <div>
              <h3 className="font-semibold text-ocean-900 mb-1">Free Beach Wheelchairs</h3>
              <p className="text-sm text-ocean-700 leading-relaxed">
                South Walton Fire District provides free beach wheelchairs at staffed lifeguard towers from March 1 through October 31, 10:30 AM &ndash; 5:30 PM. First-come, first-served &mdash; no reservation needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── OUR STORY TEASER ────────────────────────────────────────────────────────

function OurStoryTeaser() {
  return (
    <section className="py-20 sm:py-28 bg-ocean-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
          Why We Built This
        </h2>
        <blockquote className="text-xl sm:text-2xl text-sand-200 leading-relaxed font-display italic mb-8">
          &ldquo;After 20 years of showing up to &lsquo;accessible&rsquo; rentals that weren&rsquo;t, we built the house we wished existed. Then we built this site so nobody else has to go through what we did.&rdquo;
        </blockquote>
        <p className="text-sand-300 mb-8">
          &mdash; Ken &amp; Stephanie Wright, founders of Accessible 30A
        </p>
        <Link
          href="/about"
          className="inline-flex px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all border border-white/20"
        >
          Read Our Story
        </Link>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-ocean-900 mb-4">
          Know an Accessible Property on 30A?
        </h2>
        <p className="text-ocean-600 text-lg mb-8 max-w-2xl mx-auto">
          We&apos;re building the most comprehensive accessible travel guide for 30A. If you own, manage, or know of a wheelchair-accessible property, we&apos;d love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/list-property"
            className="w-full sm:w-auto px-8 py-4 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold rounded-full text-lg transition-colors"
          >
            Submit a Property
          </Link>
          <a
            href="mailto:hello@accessible30a.com"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-sand-100 text-ocean-700 font-semibold rounded-full text-lg transition-colors border border-sand-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <FlagshipProperty />
        <BeachAccessSection />
        <OurStoryTeaser />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
