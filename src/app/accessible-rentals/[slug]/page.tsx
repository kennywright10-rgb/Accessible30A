import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

async function getProperty(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

async function getAccessibility(propertyId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('property_accessibility')
    .select('*')
    .eq('property_id', propertyId)
    .order('category')
    .order('attribute');
  return data || [];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const property = await getProperty(params.slug);
  if (!property) return { title: 'Property Not Found' };
  return {
    title: property.meta_title || property.name,
    description: property.meta_description || property.description?.slice(0, 160),
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  entry: '🚪 Entry & Navigation',
  bathroom: '🚿 Bathroom',
  bedroom: '🛏️ Bedroom',
  kitchen: '🍳 Kitchen',
  outdoor: '🏊 Outdoor & Pool',
  location: '📍 Location & Proximity',
};

const ATTRIBUTE_LABELS: Record<string, string> = {
  zero_step_entry: 'Zero-step entry',
  ramp_available: 'Ramp available',
  ramp_grade: 'Ramp grade',
  front_door_width: 'Front door width',
  flooring_type: 'Flooring type',
  hallway_width_min: 'Minimum hallway width',
  elevator_available: 'Elevator',
  parking_proximity: 'Parking proximity',
  shower_type: 'Shower type',
  shower_bench: 'Shower bench',
  shower_grab_bars: 'Grab bars',
  shower_handheld: 'Handheld showerhead',
  toilet_height: 'Toilet height',
  toilet_grab_bars: 'Toilet grab bars',
  sink_under_clearance: 'Under-sink clearance',
  turning_radius: 'Turning radius',
  bed_height: 'Bed height',
  transfer_space_side: 'Transfer space',
  pool_access_type: 'Pool access',
  pool_depth: 'Pool depth',
  patio_accessible: 'Patio accessible',
  nearest_beach_access_name: 'Nearest beach access',
  nearest_beach_access_ada: 'ADA beach access',
  nearest_beach_wheelchair: 'Beach wheelchair nearby',
  neighborhood_terrain: 'Terrain',
};

function formatValue(attr: string, value: string, unit: string | null) {
  if (value === 'true') return '✅ Yes';
  if (value === 'false') return '❌ No';
  if (unit) return `${value} ${unit}`;
  return value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default async function PropertyPage({ params }: { params: { slug: string } }) {
  const property = await getProperty(params.slug);
  if (!property) notFound();

  const accessibility = await getAccessibility(property.id);

  // Group accessibility data by category
  const grouped = accessibility.reduce((acc: Record<string, any[]>, item: any) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const bookingUrl = property.booking_url || property.vrbo_url || property.airbnb_url;

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
              <Link href="/accessible-rentals" className="hover:text-ocean-700">Accessible Rentals</Link>
              <span>/</span>
              <span className="text-ocean-800 font-medium">{property.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="bg-gradient-to-br from-ocean-200 to-ocean-300 h-64 sm:h-80 lg:h-96 flex items-center justify-center">
          <div className="text-center text-ocean-500">
            <svg className="w-20 h-20 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
            </svg>
            <p className="text-sm font-medium">Photos coming soon</p>
          </div>
        </div>

        {/* Property Details */}
        <section className="py-10 sm:py-16 bg-sand-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {property.flagship && (
                    <span className="px-3 py-1 bg-coral-400 text-white text-xs font-bold rounded-full">Our Home</span>
                  )}
                  {property.ars_score && (
                    <span className="ars-badge ars-badge-verified">ARS {property.ars_score}/100</span>
                  )}
                  <span className="text-sm text-ocean-500 capitalize">{property.property_type}</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl font-bold text-ocean-900 mb-2">
                  {property.name}
                </h1>
                <p className="text-ocean-600 text-lg mb-6">
                  {property.city}, {property.state}
                  {property.bedrooms && <> &middot; {property.bedrooms} bed</>}
                  {property.bathrooms && <> &middot; {property.bathrooms} bath</>}
                  {property.sleeps && <> &middot; Sleeps {property.sleeps}</>}
                </p>

                <div className="prose prose-ocean max-w-none mb-10">
                  <p className="text-ocean-700 leading-relaxed">{property.description}</p>
                </div>

                {/* Accessibility Details */}
                {Object.keys(grouped).length > 0 && (
                  <div>
                    <h2 className="font-display text-2xl font-bold text-ocean-900 mb-6">
                      Accessibility Details
                    </h2>
                    <div className="space-y-6">
                      {Object.entries(CATEGORY_LABELS).map(([cat, label]) => {
                        const items = grouped[cat];
                        if (!items || items.length === 0) return null;
                        return (
                          <div key={cat} className="bg-white rounded-xl border border-sand-200 p-6">
                            <h3 className="font-semibold text-ocean-900 text-lg mb-4">{label}</h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {items.map((item: any) => (
                                <div key={item.id} className="flex items-start justify-between gap-2 py-2 border-b border-sand-100 last:border-0">
                                  <span className="text-sm text-ocean-600">
                                    {ATTRIBUTE_LABELS[item.attribute] || item.attribute.replace(/_/g, ' ')}
                                  </span>
                                  <span className="text-sm font-medium text-ocean-900 text-right">
                                    {formatValue(item.attribute, item.value, item.unit)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {Object.keys(grouped).length === 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h3 className="font-semibold text-amber-900 mb-2">Accessibility Verification Pending</h3>
                    <p className="text-sm text-amber-700">
                      We haven&apos;t verified this property&apos;s accessibility features yet. 
                      If you&apos;ve stayed here and use a wheelchair, we&apos;d love your review!
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-xl border border-sand-200 p-6 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-ocean-900 mb-4">
                    Book This Property
                  </h3>

                  {property.manager_company && (
                    <p className="text-sm text-ocean-500 mb-4">
                      Managed by <span className="font-medium text-ocean-700">{property.manager_company}</span>
                    </p>
                  )}

                  {bookingUrl ? (
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-3 bg-coral-400 hover:bg-coral-500 text-white font-semibold rounded-full text-center transition-colors mb-3"
                    >
                      Book Now
                    </a>
                  ) : (
                    <a
                      href="mailto:hello@accessible30a.com"
                      className="block w-full px-6 py-3 bg-coral-400 hover:bg-coral-500 text-white font-semibold rounded-full text-center transition-colors mb-3"
                    >
                      Inquire About This Property
                    </a>
                  )}

                  <a
                    href="mailto:hello@accessible30a.com"
                    className="block w-full px-6 py-3 bg-ocean-100 hover:bg-ocean-200 text-ocean-700 font-semibold rounded-full text-center transition-colors"
                  >
                    Ask About Accessibility
                  </a>

                  {/* Quick accessibility summary */}
                  {Object.keys(grouped).length > 0 && (
                    <div className="mt-6 pt-6 border-t border-sand-200">
                      <h4 className="font-semibold text-ocean-900 text-sm mb-3">Key Features</h4>
                      <div className="space-y-2">
                        {accessibility.slice(0, 6).map((item: any) => (
                          <div key={item.id} className="flex items-center gap-2 text-sm">
                            <span className="text-green-500">✓</span>
                            <span className="text-ocean-700">
                              {ATTRIBUTE_LABELS[item.attribute] || item.attribute.replace(/_/g, ' ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
