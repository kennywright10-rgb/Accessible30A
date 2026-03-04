import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Wheelchair Accessible Restaurants on 30A',
  description: 'Honest reviews of wheelchair-accessible restaurants along Florida\'s Highway 30A. Ramp entry, table spacing, accessible restrooms — rated by wheelchair users.',
};

async function getRestaurants() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('restaurants')
    .select('*')
    .order('name');
  return data || [];
}

const PRICE_LABELS: Record<string, string> = { '$': '$', '$$': '$$', '$$$': '$$$', '$$$$': '$$$$' };
const CUISINE_LABELS: Record<string, string> = {
  seafood: '🐟 Seafood', american: '🍔 American', italian: '🍝 Italian', mexican: '🌮 Mexican',
  asian: '🍜 Asian', bbq: '🍖 BBQ', cafe: '☕ Café', bar: '🍺 Bar',
  fine_dining: '🥂 Fine Dining', casual: '🍽️ Casual', other: '🍽️ Other',
};

function AccessibilityScore({ restaurant }: { restaurant: any }) {
  const checks = [
    restaurant.ramp_entry, restaurant.door_width_adequate, restaurant.table_spacing_adequate,
    restaurant.accessible_restroom, restaurant.outdoor_seating_accessible, restaurant.parking_accessible,
  ];
  const passed = checks.filter(Boolean).length;
  const total = checks.filter(c => c !== null).length;

  if (total === 0) return <span className="text-xs text-ocean-400">Not yet rated</span>;

  let color = 'bg-red-100 text-red-800 border-red-200';
  let label = 'Limited';
  if (passed >= total * 0.8) { color = 'bg-green-100 text-green-800 border-green-200'; label = 'Excellent'; }
  else if (passed >= total * 0.5) { color = 'bg-yellow-100 text-yellow-800 border-yellow-200'; label = 'Moderate'; }

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${color}`}>
      {label} ({passed}/{total})
    </span>
  );
}

function RestaurantCard({ restaurant }: { restaurant: any }) {
  return (
    <Link
      href={`/accessible-dining/${restaurant.slug}`}
      className="group bg-white rounded-xl border border-sand-200 overflow-hidden card-hover"
    >
      {/* Color bar based on accessibility */}
      <div className="h-2 bg-gradient-to-r from-ocean-400 to-ocean-600" />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-display font-bold text-ocean-900 text-lg group-hover:text-ocean-600 transition-colors">
              {restaurant.name}
            </h3>
            <p className="text-sm text-ocean-500">
              {CUISINE_LABELS[restaurant.cuisine] || restaurant.cuisine} &middot; {PRICE_LABELS[restaurant.price_range] || restaurant.price_range}
            </p>
          </div>
          <AccessibilityScore restaurant={restaurant} />
        </div>

        <p className="text-sm text-ocean-600 line-clamp-2 mb-4">{restaurant.description}</p>

        {/* Accessibility quick view */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {restaurant.ramp_entry === true && <span className="feature-pill text-xs">✅ Ramp Entry</span>}
          {restaurant.ramp_entry === false && <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-red-50 text-red-600">❌ No Ramp</span>}
          {restaurant.accessible_restroom === true && <span className="feature-pill text-xs">🚻 Accessible Restroom</span>}
          {restaurant.outdoor_seating_accessible === true && <span className="feature-pill text-xs">🌤️ Accessible Patio</span>}
          {restaurant.table_spacing_adequate === true && <span className="feature-pill text-xs">♿ Good Spacing</span>}
        </div>

        {restaurant.accessibility_notes && (
          <p className="text-xs text-ocean-500 italic line-clamp-2 mb-3">{restaurant.accessibility_notes}</p>
        )}

        <span className="text-sm font-semibold text-coral-500 group-hover:text-coral-600">
          Full Details →
        </span>
      </div>
    </Link>
  );
}

export default async function AccessibleDiningPage() {
  const restaurants = await getRestaurants();

  const accessible = restaurants.filter((r: any) => r.ramp_entry === true);
  const notAccessible = restaurants.filter((r: any) => r.ramp_entry === false);

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20 lg:pt-24">
        <section className="bg-ocean-800 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Accessible Dining on 30A
            </h1>
            <p className="text-ocean-200 text-lg max-w-2xl mx-auto">
              {restaurants.length} restaurants reviewed for wheelchair accessibility. Ramp entry, table spacing, restrooms, and outdoor seating &mdash; honestly rated.
            </p>
          </div>
        </section>

        {/* How we rate */}
        <section className="bg-ocean-50 border-b border-ocean-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-ocean-500 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">📋</span>
              </div>
              <div>
                <h2 className="font-semibold text-ocean-900 mb-1">How We Rate Accessibility</h2>
                <p className="text-sm text-ocean-700">
                  We check 6 criteria: ramp/level entry, adequate door width, table spacing for wheelchairs, accessible restroom, accessible outdoor seating, and accessible parking. Ratings are <strong className="text-green-700">Excellent</strong> (5-6 of 6), <strong className="text-yellow-700">Moderate</strong> (3-4), or <strong className="text-red-700">Limited</strong> (0-2). We&apos;re honest &mdash; if it&apos;s not accessible, we say so.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accessible Restaurants */}
        <section className="py-12 sm:py-16 bg-sand-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-ocean-900 mb-6">
              Wheelchair-Accessible Restaurants ({accessible.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {accessible.map((r: any) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>

            {/* Not accessible */}
            {notAccessible.length > 0 && (
              <>
                <h2 className="font-display text-2xl font-bold text-ocean-900 mb-2">
                  Limited Accessibility ({notAccessible.length})
                </h2>
                <p className="text-ocean-500 text-sm mb-6">
                  These popular spots have accessibility barriers. We include them because you&apos;ll see them recommended everywhere &mdash; we want you to know what to expect.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notAccessible.map((r: any) => (
                    <RestaurantCard key={r.id} restaurant={r} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="py-16 bg-white border-t border-sand-200">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-2xl font-bold text-ocean-900 mb-3">
              Know an Accessible Restaurant on 30A?
            </h2>
            <p className="text-ocean-600 mb-6">
              Help us build the most honest restaurant accessibility guide on 30A. Your experience matters.
            </p>
            <a
              href="mailto:hello@accessible30a.com"
              className="inline-flex px-8 py-3 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold rounded-full transition-colors"
            >
              Share a Restaurant Review
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
