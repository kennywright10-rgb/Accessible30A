import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Wheelchair-Accessible Beach Access Points on 30A',
  description: 'Complete guide to all 7 ADA-accessible beach access points along Florida\'s Highway 30A. Free beach wheelchairs, Mobi Mats, ramps, and lifeguard info.',
};

async function getBeachAccesses() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('beach_accesses')
    .select('*')
    .order('sort_order');
  return data || [];
}

function BeachAccessCard({ beach }: { beach: any }) {
  return (
    <Link
      href={`/beach-access/${beach.slug}`}
      className="group bg-white rounded-xl border border-sand-200 overflow-hidden card-hover"
    >
      {/* Image placeholder */}
      <div className="aspect-[16/9] bg-gradient-to-br from-ocean-100 to-ocean-200 relative flex items-center justify-center">
        {beach.mobi_mat && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-coral-400 text-white text-xs font-bold rounded-full">
            ⭐ Mobi Mat Available
          </span>
        )}
        <svg className="w-12 h-12 text-ocean-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
        </svg>
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-ocean-900 text-lg mb-2 group-hover:text-ocean-600 transition-colors">
          {beach.name}
        </h3>
        <p className="text-sm text-ocean-500 mb-3">{beach.address}</p>
        <p className="text-sm text-ocean-600 line-clamp-2 mb-4">{beach.description}</p>

        {/* Feature badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {beach.ada_ramp && (
            <span className="feature-pill text-xs">✅ ADA Ramp</span>
          )}
          {beach.beach_wheelchair && (
            <span className="feature-pill text-xs">🦽 Beach Wheelchair</span>
          )}
          {beach.mobi_mat && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-coral-100 text-coral-700 font-medium">
              ⭐ Mobi Mat
            </span>
          )}
          {beach.accessible_restroom && (
            <span className="feature-pill text-xs">🚻 Accessible Restroom</span>
          )}
          {beach.lifeguard && (
            <span className="feature-pill text-xs">🏊 Lifeguard</span>
          )}
        </div>

        <span className="text-sm font-semibold text-coral-500 group-hover:text-coral-600">
          View Full Details →
        </span>
      </div>
    </Link>
  );
}

export default async function BeachAccessPage() {
  const beaches = await getBeachAccesses();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20 lg:pt-24">
        {/* Page Header */}
        <section className="bg-ocean-800 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Wheelchair-Accessible Beach Access on 30A
            </h1>
            <p className="text-ocean-200 text-lg max-w-2xl mx-auto">
              {beaches.length} ADA-accessible beach access points with ramps, free beach wheelchairs, and lifeguard support along Florida&apos;s Highway 30A.
            </p>
          </div>
        </section>

        {/* Beach wheelchair callout */}
        <section className="bg-ocean-50 border-b border-ocean-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-ocean-500 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🦽</span>
              </div>
              <div>
                <h2 className="font-semibold text-ocean-900 mb-1">Free Beach Wheelchairs</h2>
                <p className="text-sm text-ocean-700 leading-relaxed">
                  South Walton Fire District provides free beach wheelchairs at staffed lifeguard towers from <strong>March 1 through October 31</strong>, 10:30 AM &ndash; 5:30 PM. First-come, first-served &mdash; no reservation needed. Look for the lifeguard tower at each access point.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Beach Access Grid */}
        <section className="py-12 sm:py-16 bg-sand-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {beaches.map((beach: any) => (
                <BeachAccessCard key={beach.id} beach={beach} />
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 bg-white border-t border-sand-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-ocean-900 mb-6">
              Tips for Wheelchair Users on 30A Beaches
            </h2>
            <div className="space-y-4 text-ocean-700">
              <div className="flex items-start gap-3">
                <span className="text-ocean-500 font-bold mt-0.5">1.</span>
                <p><strong>Arrive before noon</strong> for the best chance at a beach wheelchair &mdash; they go fast on busy days, especially weekends and holidays.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-ocean-500 font-bold mt-0.5">2.</span>
                <p><strong>Ed Walline is the best overall access</strong> &mdash; it&apos;s the only one with a Mobi Mat that lets standard wheelchairs roll across the sand.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-ocean-500 font-bold mt-0.5">3.</span>
                <p><strong>Bring sun protection</strong> &mdash; the ramps and beach areas have limited shade. A beach umbrella is essential.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-ocean-500 font-bold mt-0.5">4.</span>
                <p><strong>Check tide times</strong> &mdash; at high tide, the beach narrows significantly and beach wheelchair navigation becomes more difficult.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-ocean-500 font-bold mt-0.5">5.</span>
                <p><strong>The sand is soft and deep</strong> &mdash; standard wheelchairs will not work on the sand without a Mobi Mat. Beach wheelchairs have wide balloon tires designed for sand.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
