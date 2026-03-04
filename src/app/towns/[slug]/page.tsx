import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

async function getTown(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('towns')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

async function getTownProperties(townId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('properties')
    .select('id, name, slug, property_type, bedrooms, bathrooms, sleeps, description, flagship, featured, ars_score')
    .eq('town_id', townId)
    .order('flagship', { ascending: false })
    .order('featured', { ascending: false });
  return data || [];
}

async function getNearbyBeachAccesses(townSlug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  // Get all beach accesses — we'll show them all since 30A is small
  const { data } = await supabase
    .from('beach_accesses')
    .select('id, name, slug, ada_ramp, beach_wheelchair, mobi_mat, description')
    .order('sort_order');
  return data || [];
}

async function getAllTowns() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('towns')
    .select('name, slug, sort_order')
    .order('sort_order');
  return data || [];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const town = await getTown(params.slug);
  if (!town) return { title: 'Town Not Found' };
  return {
    title: town.meta_title || `${town.name} — Wheelchair Accessible Guide | 30A`,
    description: town.meta_description || `Wheelchair-accessible vacation rentals, beach access, and dining in ${town.name} on Florida's Highway 30A. ${town.description?.slice(0, 100)}`,
  };
}

const TOWN_HIGHLIGHTS: Record<string, string[]> = {
  'miramar-beach': ['Closest to Destin shopping & dining', 'Pompano Joe\'s beachfront dining', 'Silver Sands Premium Outlets nearby', 'Paved coastal path great for wheelchairs'],
  'sandestin': ['Baytowne Wharf entertainment village', 'Multiple golf courses', 'Full-service resort amenities', 'Marina with boat rentals'],
  'dune-allen': ['Stinky\'s Fish Camp restaurant', 'Coastal dune lakes for kayaking', 'Quiet, nature-focused atmosphere', 'Dune Allen Regional Beach Access'],
  'santa-rosa-beach': ['Gulf Place shops & restaurants', 'Ed Walline Beach Access (best accessibility)', 'Timpoochee Trail access', '30A Bike Path hub'],
  'blue-mountain-beach': ['Highest elevation on the Gulf', 'Blue lupine wildflowers in spring', 'Local art galleries', 'Craft cocktail bars'],
  'grayton-beach': ['Grayton Beach State Park', 'The Red Bar (iconic restaurant)', 'Western Lake dune lake', 'Bohemian art community'],
  'watercolor': ['WaterColor Inn beachfront hotel', 'Multiple resort pools', 'Boat House restaurant', 'Camp WaterColor nature center'],
  'seaside': ['The Truman Show filming location', 'Central amphitheater with free concerts', 'Airstream food trucks', 'Iconic pastel cottages'],
  'seagrove-beach': ['Old Florida charm', 'Deer Lake State Park nearby', 'Santa Clara Beach Access', 'Less crowded, residential feel'],
  'watersound': ['Origins Golf Course', 'Nature trails through dune system', 'Private community amenities', 'WaterSound Beach Club'],
  'seacrest-beach': ['Camp Creek Lake', 'Near Rosemary Beach dining', 'Family-friendly lagoon pool', 'Growing restaurant scene'],
  'alys-beach': ['Caliza Pool (iconic)', 'Bermuda-inspired white architecture', 'George\'s at Alys Beach restaurant', 'NEAT bottle shop & tasting room'],
  'rosemary-beach': ['European-inspired town center', 'Fine dining at Edward\'s', 'Boutique shopping', 'Barrett Square gathering spot'],
  'inlet-beach': ['30Avenue dining & shopping district', 'Closest to Panama City Beach', 'Less developed, more private', 'Inlet Beach Regional Access'],
  'seascape': ['Seascape Golf, Beach & Tennis Resort', 'Near Miramar Beach amenities', 'Family resort atmosphere', 'Easy Destin access'],
};

export default async function TownPage({ params }: { params: { slug: string } }) {
  const town = await getTown(params.slug);
  if (!town) notFound();

  const [properties, beaches, allTowns] = await Promise.all([
    getTownProperties(town.id),
    getNearbyBeachAccesses(params.slug),
    getAllTowns(),
  ]);

  const highlights = TOWN_HIGHLIGHTS[town.slug] || [];

  // Find prev/next towns for navigation
  const townIndex = allTowns.findIndex((t: any) => t.slug === params.slug);
  const prevTown = townIndex > 0 ? allTowns[townIndex - 1] : null;
  const nextTown = townIndex < allTowns.length - 1 ? allTowns[townIndex + 1] : null;

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20 lg:pt-24">
        {/* Breadcrumb */}
        <div className="bg-sand-100 border-b border-sand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-ocean-500">
              <Link href="/" className="hover:text-ocean-700">Home</Link>
              <span>/</span>
              <Link href="/towns" className="hover:text-ocean-700">Towns</Link>
              <span>/</span>
              <span className="text-ocean-800 font-medium">{town.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-ocean-700 to-ocean-900 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              {town.name}
            </h1>
            <p className="text-ocean-200 text-lg max-w-3xl leading-relaxed">
              {town.description}
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-sand-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Highlights */}
                {highlights.length > 0 && (
                  <div className="bg-white rounded-xl border border-sand-200 p-6 sm:p-8">
                    <h2 className="font-display text-xl font-bold text-ocean-900 mb-4">
                      What Makes {town.name} Special
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-coral-400 mt-0.5">●</span>
                          <span className="text-sm text-ocean-700">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Accessible Properties */}
                <div>
                  <h2 className="font-display text-xl font-bold text-ocean-900 mb-4">
                    Accessible Rentals in {town.name}
                  </h2>
                  {properties.length > 0 ? (
                    <div className="space-y-4">
                      {properties.map((p: any) => (
                        <Link
                          key={p.id}
                          href={`/accessible-rentals/${p.slug}`}
                          className="group block bg-white rounded-xl border border-sand-200 p-5 card-hover"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-ocean-900 group-hover:text-ocean-600 transition-colors">
                                  {p.name}
                                </h3>
                                {p.flagship && (
                                  <span className="px-2 py-0.5 bg-coral-400 text-white text-xs font-bold rounded-full">Our Home</span>
                                )}
                              </div>
                              <p className="text-sm text-ocean-500 mb-2">
                                {p.property_type}
                                {p.bedrooms && <> &middot; {p.bedrooms} bed</>}
                                {p.bathrooms && <> &middot; {p.bathrooms} bath</>}
                                {p.sleeps && <> &middot; Sleeps {p.sleeps}</>}
                              </p>
                              <p className="text-sm text-ocean-600 line-clamp-2">{p.description}</p>
                            </div>
                            <span className="text-coral-500 text-sm font-semibold whitespace-nowrap">View →</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl border border-sand-200 p-6 text-center">
                      <p className="text-ocean-500 mb-3">No accessible rentals listed in {town.name} yet.</p>
                      <p className="text-sm text-ocean-400">
                        Know one? <a href="mailto:hello@accessible30a.com" className="text-ocean-600 underline">Let us know</a>
                      </p>
                    </div>
                  )}
                </div>

                {/* Nearby Beach Access */}
                <div>
                  <h2 className="font-display text-xl font-bold text-ocean-900 mb-4">
                    Nearby Beach Access Points
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {beaches.slice(0, 4).map((b: any) => (
                      <Link
                        key={b.id}
                        href={`/beach-access/${b.slug}`}
                        className="group bg-white rounded-xl border border-sand-200 p-4 card-hover"
                      >
                        <h3 className="font-semibold text-ocean-900 text-sm mb-2 group-hover:text-ocean-600 transition-colors">
                          {b.name}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {b.ada_ramp && <span className="feature-pill text-xs">✅ Ramp</span>}
                          {b.beach_wheelchair && <span className="feature-pill text-xs">🦽 Wheelchair</span>}
                          {b.mobi_mat && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-coral-100 text-coral-700 font-medium">⭐ Mobi Mat</span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/beach-access"
                    className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-ocean-600 hover:text-ocean-800"
                  >
                    View all {beaches.length} beach access points
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Quick links */}
                  <div className="bg-white rounded-xl border border-sand-200 p-6">
                    <h3 className="font-semibold text-ocean-900 mb-4">Explore {town.name}</h3>
                    <div className="space-y-2">
                      <Link
                        href="/accessible-rentals"
                        className="block px-4 py-2.5 text-sm text-ocean-700 hover:bg-ocean-50 rounded-lg transition-colors"
                      >
                        🏠 All Accessible Rentals
                      </Link>
                      <Link
                        href="/beach-access"
                        className="block px-4 py-2.5 text-sm text-ocean-700 hover:bg-ocean-50 rounded-lg transition-colors"
                      >
                        🏖️ Beach Access Guide
                      </Link>
                      <Link
                        href="/accessible-dining"
                        className="block px-4 py-2.5 text-sm text-ocean-700 hover:bg-ocean-50 rounded-lg transition-colors"
                      >
                        🍽️ Accessible Dining
                      </Link>
                    </div>
                  </div>

                  {/* Other Towns */}
                  <div className="bg-white rounded-xl border border-sand-200 p-6">
                    <h3 className="font-semibold text-ocean-900 mb-4">Other Towns on 30A</h3>
                    <div className="space-y-1 max-h-80 overflow-y-auto">
                      {allTowns.filter((t: any) => t.slug !== params.slug).map((t: any) => (
                        <Link
                          key={t.slug}
                          href={`/towns/${t.slug}`}
                          className="block px-3 py-2 text-sm text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 rounded-lg transition-colors"
                        >
                          {t.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-coral-50 border border-coral-200 rounded-xl p-6">
                    <h3 className="font-semibold text-coral-900 mb-2">Planning a Trip?</h3>
                    <p className="text-sm text-coral-700 mb-4">
                      We can help you find the perfect accessible rental in {town.name}.
                    </p>
                    <a
                      href="mailto:hello@accessible30a.com"
                      className="block w-full px-4 py-2.5 bg-coral-400 hover:bg-coral-500 text-white text-sm font-semibold rounded-full text-center transition-colors"
                    >
                      Get Recommendations
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Prev/Next Navigation */}
            <div className="mt-12 pt-8 border-t border-sand-200 flex items-center justify-between">
              {prevTown ? (
                <Link
                  href={`/towns/${prevTown.slug}`}
                  className="flex items-center gap-2 text-ocean-600 hover:text-ocean-800 font-medium text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  {prevTown.name}
                </Link>
              ) : <div />}
              {nextTown ? (
                <Link
                  href={`/towns/${nextTown.slug}`}
                  className="flex items-center gap-2 text-ocean-600 hover:text-ocean-800 font-medium text-sm"
                >
                  {nextTown.name}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
