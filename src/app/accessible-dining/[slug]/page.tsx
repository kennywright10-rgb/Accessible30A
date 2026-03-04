import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

async function getRestaurant(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('restaurants')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const r = await getRestaurant(params.slug);
  if (!r) return { title: 'Restaurant Not Found' };
  return {
    title: r.meta_title || `${r.name} — Wheelchair Accessibility Review | 30A`,
    description: r.meta_description || `Wheelchair accessibility review of ${r.name} on 30A. ${r.accessibility_notes?.slice(0, 120) || r.description?.slice(0, 120)}`,
  };
}

const CUISINE_LABELS: Record<string, string> = {
  seafood: '🐟 Seafood', american: '🍔 American', italian: '🍝 Italian', mexican: '🌮 Mexican',
  asian: '🍜 Asian', bbq: '🍖 BBQ', cafe: '☕ Café', bar: '🍺 Bar',
  fine_dining: '🥂 Fine Dining', casual: '🍽️ Casual', other: '🍽️ Other',
};

function AccessCheck({ label, value, detail }: { label: string; value: boolean | null; detail?: string }) {
  return (
    <div className="py-3 border-b border-sand-100 last:border-0">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ocean-700">{label}</span>
        <span className="text-sm font-medium">
          {value === true && '✅ Yes'}
          {value === false && '❌ No'}
          {value === null && '❓ Unknown'}
        </span>
      </div>
      {detail && <p className="text-xs text-ocean-500 mt-1">{detail}</p>}
    </div>
  );
}

export default async function RestaurantDetailPage({ params }: { params: { slug: string } }) {
  const r = await getRestaurant(params.slug);
  if (!r) notFound();

  const checks = [r.ramp_entry, r.door_width_adequate, r.table_spacing_adequate, r.accessible_restroom, r.outdoor_seating_accessible, r.parking_accessible];
  const passed = checks.filter(Boolean).length;
  const total = checks.filter(c => c !== null).length;

  let overallColor = 'bg-red-100 text-red-800 border-red-200';
  let overallLabel = 'Limited Accessibility';
  if (total > 0 && passed >= total * 0.8) { overallColor = 'bg-green-100 text-green-800 border-green-200'; overallLabel = 'Excellent Accessibility'; }
  else if (total > 0 && passed >= total * 0.5) { overallColor = 'bg-yellow-100 text-yellow-800 border-yellow-200'; overallLabel = 'Moderate Accessibility'; }

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
              <Link href="/accessible-dining" className="hover:text-ocean-700">Accessible Dining</Link>
              <span>/</span>
              <span className="text-ocean-800 font-medium">{r.name}</span>
            </nav>
          </div>
        </div>

        <section className="py-10 sm:py-16 bg-sand-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${overallColor}`}>
                  {overallLabel}
                </span>
                <span className="text-sm text-ocean-500">
                  {CUISINE_LABELS[r.cuisine] || r.cuisine} &middot; {r.price_range}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-ocean-900 mb-2">{r.name}</h1>
              <p className="text-ocean-600">{r.address}</p>
              <div className="flex items-center gap-4 mt-3">
                {r.phone && (
                  <a href={`tel:${r.phone}`} className="text-sm text-ocean-600 hover:text-ocean-800 flex items-center gap-1">
                    📞 {r.phone}
                  </a>
                )}
                {r.website && (
                  <a href={r.website} target="_blank" rel="noopener noreferrer" className="text-sm text-ocean-600 hover:text-ocean-800 flex items-center gap-1">
                    🌐 Website
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-sand-200 p-6 sm:p-8 mb-8">
              <p className="text-ocean-700 leading-relaxed text-lg">{r.description}</p>
            </div>

            {/* Accessibility Assessment */}
            <div className="bg-white rounded-xl border border-sand-200 p-6 sm:p-8 mb-8">
              <h2 className="font-display text-xl font-bold text-ocean-900 mb-6">
                ♿ Wheelchair Accessibility Assessment
              </h2>

              <AccessCheck label="Ramp / Level Entry" value={r.ramp_entry} />
              <AccessCheck label="Adequate Door Width" value={r.door_width_adequate} />
              <AccessCheck label="Table Spacing for Wheelchairs" value={r.table_spacing_adequate} />
              <AccessCheck label="Accessible Restroom" value={r.accessible_restroom} />
              <AccessCheck label="Outdoor Seating" value={r.outdoor_seating} />
              <AccessCheck label="Accessible Outdoor Seating" value={r.outdoor_seating_accessible} />
              <AccessCheck label="Accessible Parking" value={r.parking_accessible} />

              {r.accessibility_notes && (
                <div className="mt-6 p-4 bg-ocean-50 rounded-lg border border-ocean-200">
                  <h3 className="font-semibold text-ocean-900 text-sm mb-2">📝 Our Notes</h3>
                  <p className="text-sm text-ocean-700 leading-relaxed">{r.accessibility_notes}</p>
                </div>
              )}
            </div>

            {/* Map link */}
            <div className="bg-white rounded-xl border border-sand-200 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-ocean-900 mb-1">📍 Location</h3>
                  <p className="text-sm text-ocean-600">{r.address}</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${r.latitude},${r.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-ocean-100 hover:bg-ocean-200 text-ocean-700 text-sm font-semibold rounded-full transition-colors"
                >
                  Open in Maps
                </a>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
              <p className="text-xs text-amber-700 leading-relaxed">
                <strong>Note:</strong> Accessibility conditions can change with renovations, seasonal setups, or temporary obstacles. We recommend calling ahead to confirm current accessibility. Last reviewed: March 2026. If you&apos;ve visited recently and have an update, <a href="mailto:hello@accessible30a.com" className="underline">let us know</a>.
              </p>
            </div>

            <Link
              href="/accessible-dining"
              className="text-ocean-600 hover:text-ocean-800 font-medium text-sm flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to all restaurants
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
