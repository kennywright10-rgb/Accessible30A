import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

async function getBeachAccess(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('beach_accesses')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const beach = await getBeachAccess(params.slug);
  if (!beach) return { title: 'Beach Access Not Found' };
  return {
    title: beach.meta_title || `${beach.name} — Wheelchair Accessible Beach Access on 30A`,
    description: beach.meta_description || beach.description?.slice(0, 160),
  };
}

export default async function BeachAccessDetailPage({ params }: { params: { slug: string } }) {
  const beach = await getBeachAccess(params.slug);
  if (!beach) notFound();

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
              <Link href="/beach-access" className="hover:text-ocean-700">Beach Access</Link>
              <span>/</span>
              <span className="text-ocean-800 font-medium">{beach.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-br from-ocean-200 to-ocean-300 h-64 sm:h-80 flex items-center justify-center">
          <div className="text-center text-ocean-500">
            <svg className="w-20 h-20 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
            </svg>
            <p className="text-sm font-medium">Video walkthrough coming soon</p>
          </div>
        </div>

        {/* Content */}
        <section className="py-10 sm:py-16 bg-sand-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title & badges */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {beach.ada_ramp && <span className="feature-pill">✅ ADA Ramp</span>}
                {beach.beach_wheelchair && <span className="feature-pill">🦽 Beach Wheelchair</span>}
                {beach.mobi_mat && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-coral-100 text-coral-700 font-medium">
                    ⭐ Mobi Mat
                  </span>
                )}
                {beach.accessible_restroom && <span className="feature-pill">🚻 Accessible Restroom</span>}
                {beach.accessible_parking && <span className="feature-pill">🅿️ Accessible Parking</span>}
                {beach.lifeguard && <span className="feature-pill">🏊 Lifeguard</span>}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold text-ocean-900 mb-2">
                {beach.name}
              </h1>
              <p className="text-ocean-600">{beach.address}</p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-sand-200 p-6 sm:p-8 mb-8">
              <p className="text-ocean-700 leading-relaxed text-lg">{beach.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {/* Accessibility Features */}
              <div className="bg-white rounded-xl border border-sand-200 p-6">
                <h2 className="font-semibold text-ocean-900 text-lg mb-4">Accessibility Features</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-sand-100">
                    <span className="text-sm text-ocean-600">ADA Ramp</span>
                    <span className="text-sm font-medium">{beach.ada_ramp ? '✅ Yes' : '❌ No'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-sand-100">
                    <span className="text-sm text-ocean-600">Beach Wheelchair</span>
                    <span className="text-sm font-medium">{beach.beach_wheelchair ? '✅ Yes' : '❌ No'}</span>
                  </div>
                  {beach.beach_wheelchair_details && (
                    <p className="text-xs text-ocean-500 italic">{beach.beach_wheelchair_details}</p>
                  )}
                  <div className="flex items-center justify-between py-2 border-b border-sand-100">
                    <span className="text-sm text-ocean-600">Mobi Mat</span>
                    <span className="text-sm font-medium">{beach.mobi_mat ? '✅ Yes' : '❌ No'}</span>
                  </div>
                  {beach.mobi_mat_details && (
                    <p className="text-xs text-ocean-500 italic">{beach.mobi_mat_details}</p>
                  )}
                  <div className="flex items-center justify-between py-2 border-b border-sand-100">
                    <span className="text-sm text-ocean-600">Accessible Restroom</span>
                    <span className="text-sm font-medium">{beach.accessible_restroom ? '✅ Yes' : '❌ No'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-ocean-600">Accessible Parking</span>
                    <span className="text-sm font-medium">{beach.accessible_parking ? '✅ Yes' : '❌ No'}</span>
                  </div>
                  {beach.parking_spots && (
                    <p className="text-xs text-ocean-500">{beach.parking_spots} parking spots available</p>
                  )}
                </div>
              </div>

              {/* Practical Info */}
              <div className="bg-white rounded-xl border border-sand-200 p-6">
                <h2 className="font-semibold text-ocean-900 text-lg mb-4">Practical Info</h2>
                <div className="space-y-3">
                  {beach.lifeguard && (
                    <>
                      <div className="flex items-center justify-between py-2 border-b border-sand-100">
                        <span className="text-sm text-ocean-600">Lifeguard</span>
                        <span className="text-sm font-medium">✅ Yes</span>
                      </div>
                      {beach.lifeguard_season && (
                        <p className="text-xs text-ocean-500">Season: {beach.lifeguard_season}</p>
                      )}
                    </>
                  )}
                  {beach.parking_spots && (
                    <div className="flex items-center justify-between py-2 border-b border-sand-100">
                      <span className="text-sm text-ocean-600">Parking Spots</span>
                      <span className="text-sm font-medium">{beach.parking_spots}</span>
                    </div>
                  )}
                </div>

                {/* Map placeholder */}
                <div className="mt-6 aspect-[4/3] bg-ocean-50 rounded-lg flex items-center justify-center border border-ocean-200">
                  <div className="text-center text-ocean-400">
                    <p className="text-sm">📍 Map coming soon</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${beach.latitude},${beach.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ocean-600 hover:text-ocean-800 underline mt-1 inline-block"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            {beach.tips && (
              <div className="bg-coral-50 border border-coral-200 rounded-xl p-6">
                <h2 className="font-semibold text-coral-900 mb-2">💡 Stephanie&apos;s Tip</h2>
                <p className="text-coral-800 text-sm leading-relaxed">{beach.tips}</p>
              </div>
            )}

            {/* Back link */}
            <div className="mt-10">
              <Link
                href="/beach-access"
                className="text-ocean-600 hover:text-ocean-800 font-medium text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to all beach access points
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
