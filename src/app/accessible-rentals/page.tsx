import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Wheelchair Accessible Vacation Rentals on 30A',
  description: 'Browse verified wheelchair-accessible vacation rentals on Florida\'s Highway 30A. Zero-step entry, roll-in showers, pool access, and more.',
};

async function getProperties() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('properties')
    .select('*')
    .order('flagship', { ascending: false })
    .order('featured', { ascending: false })
    .order('name');
  return data || [];
}

function PropertyCard({ property }: { property: any }) {
  return (
    <Link
      href={`/accessible-rentals/${property.slug}`}
      className="group bg-white rounded-xl border border-sand-200 overflow-hidden card-hover"
    >
      {/* Image */}
      <div className="aspect-[16/10] bg-gradient-to-br from-ocean-100 to-ocean-200 relative">
        {property.flagship && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-coral-400 text-white text-xs font-bold rounded-full">
            Our Home
          </span>
        )}
        {!property.flagship && property.featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-ocean-500 text-white text-xs font-bold rounded-full">
            Featured
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-12 h-12 text-ocean-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
          </svg>
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="font-display font-bold text-ocean-900 text-lg mb-1 group-hover:text-ocean-600 transition-colors">
          {property.name}
        </h3>
        <p className="text-sm text-ocean-500 mb-3">
          {property.city}, {property.state}
          {property.bedrooms && <> &middot; {property.bedrooms} bed</>}
          {property.bathrooms && <> &middot; {property.bathrooms} bath</>}
          {property.sleeps && <> &middot; Sleeps {property.sleeps}</>}
        </p>
        <p className="text-sm text-ocean-600 line-clamp-2 mb-4">
          {property.description}
        </p>
        <div className="flex items-center justify-between">
          {property.ars_score ? (
            <span className="ars-badge ars-badge-verified">
              ARS {property.ars_score}/100
            </span>
          ) : (
            <span className="text-xs text-ocean-400">Accessibility data pending</span>
          )}
          <span className="text-sm font-semibold text-coral-500 group-hover:text-coral-600">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function AccessibleRentalsPage() {
  const properties = await getProperties();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20 lg:pt-24">
        {/* Page Header */}
        <section className="bg-ocean-800 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Accessible Vacation Rentals on 30A
            </h1>
            <p className="text-ocean-200 text-lg max-w-2xl mx-auto">
              {properties.length} wheelchair-accessible properties along Florida&apos;s Highway 30A. Every listing includes detailed accessibility information verified by real wheelchair users.
            </p>
          </div>
        </section>

        {/* Property Grid */}
        <section className="py-12 sm:py-16 bg-sand-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property: any) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {properties.length === 0 && (
              <div className="text-center py-20">
                <p className="text-ocean-500 text-lg">No properties found. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white border-t border-sand-200">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-2xl font-bold text-ocean-900 mb-3">
              Own an Accessible Property on 30A?
            </h2>
            <p className="text-ocean-600 mb-6">
              Get your property listed and reach thousands of travelers looking for genuinely accessible vacation rentals.
            </p>
            <a
              href="mailto:hello@accessible30a.com"
              className="inline-flex px-8 py-3 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold rounded-full transition-colors"
            >
              Submit Your Property
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
