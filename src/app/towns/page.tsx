import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Towns on 30A — Explore 15 Beach Communities',
  description: 'Explore the 15 unique beach communities along Florida\'s Highway 30A, from Miramar Beach to Inlet Beach. Accessibility info, dining, and vacation rentals for each town.',
};

async function getTowns() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('towns')
    .select('*')
    .order('sort_order');
  return data || [];
}

async function getPropertyCounts() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('properties')
    .select('town_id');
  const counts: Record<string, number> = {};
  for (const p of data || []) {
    if (p.town_id) counts[p.town_id] = (counts[p.town_id] || 0) + 1;
  }
  return counts;
}

const TOWN_VIBES: Record<string, { emoji: string; vibe: string }> = {
  'miramar-beach': { emoji: '🎉', vibe: 'High-energy, shopping & nightlife' },
  'sandestin': { emoji: '⛳', vibe: 'Full-service resort, golf & marina' },
  'dune-allen': { emoji: '🌿', vibe: 'Quiet, nature, coastal dune lakes' },
  'santa-rosa-beach': { emoji: '🏪', vibe: 'The hub — Gulf Place, shops & trails' },
  'blue-mountain-beach': { emoji: '🌸', vibe: 'Highest point on the Gulf, wildflowers' },
  'grayton-beach': { emoji: '🎨', vibe: 'Artsy, bohemian, Red Bar & state park' },
  'watercolor': { emoji: '🎨', vibe: 'Pastel architecture, resort pools & hotel' },
  'seaside': { emoji: '🏛️', vibe: 'Iconic — The Truman Show town' },
  'seagrove-beach': { emoji: '🌴', vibe: 'Old Florida charm, laid-back residential' },
  'watersound': { emoji: '🏡', vibe: 'Exclusive, gated, nature trails' },
  'seacrest-beach': { emoji: '🏊', vibe: 'Family-friendly, lagoon pool' },
  'alys-beach': { emoji: '🏛️', vibe: 'Striking white walls, upscale luxury' },
  'rosemary-beach': { emoji: '🍷', vibe: 'European charm, fine dining & boutiques' },
  'inlet-beach': { emoji: '🐚', vibe: 'Less developed, private, local feel' },
  'seascape': { emoji: '🎾', vibe: 'Resort living, golf & tennis' },
};

export default async function TownsPage() {
  const towns = await getTowns();
  const propertyCounts = await getPropertyCounts();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20 lg:pt-24">
        {/* Page Header */}
        <section className="bg-ocean-800 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              15 Beach Communities on 30A
            </h1>
            <p className="text-ocean-200 text-lg max-w-2xl mx-auto">
              From the high-energy shores of Miramar Beach to the quiet privacy of Inlet Beach &mdash; each 30A community has its own character. Explore them all from an accessibility perspective.
            </p>
          </div>
        </section>

        {/* Map placeholder */}
        <section className="bg-ocean-50 border-b border-ocean-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl border border-ocean-200 h-48 flex items-center justify-center">
              <div className="text-center text-ocean-400">
                <p className="font-medium">🗺️ Interactive 30A Map Coming Soon</p>
                <p className="text-sm mt-1">Towns listed west to east along Highway 30A</p>
              </div>
            </div>
          </div>
        </section>

        {/* Towns Grid */}
        <section className="py-12 sm:py-16 bg-sand-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {towns.map((town: any) => {
                const info = TOWN_VIBES[town.slug] || { emoji: '🏖️', vibe: '' };
                const count = propertyCounts[town.id] || 0;

                return (
                  <Link
                    key={town.id}
                    href={`/towns/${town.slug}`}
                    className="group bg-white rounded-xl border border-sand-200 overflow-hidden card-hover"
                  >
                    {/* Color header based on position */}
                    <div className="h-32 bg-gradient-to-br from-ocean-400 to-ocean-600 relative flex items-end p-5">
                      <div className="absolute top-4 right-4 text-3xl">{info.emoji}</div>
                      <div>
                        <h3 className="font-display font-bold text-white text-xl group-hover:text-coral-200 transition-colors">
                          {town.name}
                        </h3>
                        {info.vibe && (
                          <p className="text-ocean-100 text-sm mt-0.5">{info.vibe}</p>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-sm text-ocean-600 line-clamp-3 mb-4">
                        {town.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-ocean-500">
                          {count > 0 && (
                            <span className="flex items-center gap-1">
                              🏠 {count} accessible {count === 1 ? 'rental' : 'rentals'}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-coral-500 group-hover:text-coral-600">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* About 30A */}
        <section className="py-16 bg-white border-t border-sand-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-ocean-900 mb-4">
              About Highway 30A
            </h2>
            <div className="space-y-4 text-ocean-700 leading-relaxed">
              <p>
                Highway 30A is a 24-mile scenic road along Florida&apos;s Emerald Coast in South Walton County, connecting 15 distinct beach communities between Destin and Panama City Beach. Known for sugar-white sand beaches, emerald waters, and coastal dune lakes found nowhere else in the world.
              </p>
              <p>
                Each community has its own personality &mdash; from the New Urbanism architecture of Seaside (filming location for The Truman Show) to the bohemian art scene of Grayton Beach to the striking white-walled luxury of Alys Beach. What they share is a commitment to low-rise development, natural beauty, and a pace of life that feels worlds away from the high-rise beach towns nearby.
              </p>
              <p>
                For wheelchair users, 30A offers seven regional beach access points with ADA ramps, free beach wheelchairs during season, and the only Mobi Mat on the Emerald Coast at Ed Walline Regional Beach Access. The 19-mile Timpoochee Trail runs alongside 30A and is fully paved &mdash; perfect for wheelchairs and handcycles.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
