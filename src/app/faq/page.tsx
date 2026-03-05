import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

// ─── FAQ DATA ────────────────────────────────────────────────────────────────
// Organized by category, each question targets specific long-tail keywords
// that wheelchair users actually search for

const FAQ_SECTIONS = [
  {
    id: 'beach-wheelchairs',
    title: '🦽 Beach Wheelchairs on 30A',
    questions: [
      {
        q: 'Where can I get a free beach wheelchair on 30A?',
        a: 'The South Walton Fire District provides free beach wheelchairs at six staffed lifeguard towers along Highway 30A: Miramar Beach Regional (Tower 54), Dune Allen Regional, Ed Walline Regional (Tower 9), Van Ness Butler Jr Regional (Tower 5), Santa Clara Regional (Tower 4), and Inlet Beach Regional (Tower 1). They are available first-come, first-served from March 1 through October 31, between 10:30 AM and 5:30 PM. No reservation or deposit is required.',
      },
      {
        q: 'Do I need to reserve a beach wheelchair on 30A?',
        a: 'No. Beach wheelchairs on 30A are first-come, first-served at lifeguard towers during season (March 1–October 31, 10:30 AM–5:30 PM). There is no reservation system. We recommend arriving before noon on weekends and holidays, as wheelchairs can be claimed early on busy days. Ed Walline Regional Beach Access (Tower 9) near Gulf Place is the most popular location.',
      },
      {
        q: 'What is a Mobi Mat and where is the Mobi Mat on 30A?',
        a: 'A Mobi Mat is a portable roll-out mat made of non-slip material that creates a firm pathway across sand, allowing standard wheelchairs to roll from a boardwalk or ramp closer to the shoreline. On 30A, the only Mobi Mat is located at Ed Walline Regional Beach Access near Gulf Place in Santa Rosa Beach. It is one of very few Mobi Mats on the entire Emerald Coast of Florida. The Mobi Mat at Ed Walline extends from the end of the ADA boardwalk ramp across the sand toward the water.',
      },
      {
        q: 'Can I bring my own beach wheelchair to 30A?',
        a: 'Yes. You can bring your own beach wheelchair to any of the seven regional beach access points on 30A. All seven have ADA-compliant ramps from the parking area to the sand. If you do not own a beach wheelchair, you can rent one from medical equipment rental companies in Destin or Panama City Beach. Companies like Beach Wheelchair Rental and Special Needs Group offer delivery to 30A addresses.',
      },
      {
        q: 'Are beach wheelchairs available on 30A in winter?',
        a: 'No. The free beach wheelchairs provided by the South Walton Fire District are only available during lifeguard season, which runs from March 1 through October 31. During winter months (November through February), lifeguard towers are unstaffed and beach wheelchairs are not provided. If you are visiting 30A in winter, you will need to bring your own beach wheelchair or rent one from a local medical equipment company in Destin or Panama City Beach.',
      },
    ],
  },
  {
    id: 'beach-access',
    title: '🏖️ Accessible Beach Access on 30A',
    questions: [
      {
        q: 'Which beach access on 30A is the most wheelchair accessible?',
        a: 'Ed Walline Regional Beach Access near Gulf Place in Santa Rosa Beach is the most wheelchair-accessible beach access on 30A. It is the only access point with a Mobi Mat (a roll-out pathway that allows standard wheelchairs to cross the sand), a free beach wheelchair at Lifeguard Tower 9, ADA-compliant ramp, accessible restrooms, accessible parking, and a shaded picnic pavilion overlooking the Gulf. It is also steps from restaurants including Shunk Gulley Oyster Bar and Growler Garage.',
      },
      {
        q: 'How many wheelchair-accessible beach access points are on 30A?',
        a: 'There are seven regional beach access points along Highway 30A, all of which have ADA-compliant ramps. From west to east they are: Miramar Beach Regional, Dune Allen Regional, Fort Panic Regional, Ed Walline Regional, Van Ness Butler Jr Regional, Santa Clara Regional, and Inlet Beach Regional. Six of the seven (all except Fort Panic) have free beach wheelchairs available during lifeguard season (March–October). Only Ed Walline has a Mobi Mat.',
      },
      {
        q: 'Can a regular wheelchair go on the beach on 30A?',
        a: 'A standard wheelchair cannot roll on the sand at 30A beaches. The Gulf Coast sand is extremely fine and soft, which will stop standard wheelchair wheels immediately. Your options are: (1) Use the free beach wheelchairs available at lifeguard towers — these have wide balloon tires designed for sand. (2) Use the Mobi Mat at Ed Walline Regional Beach Access, which creates a firm pathway that standard wheelchairs can roll on. (3) Bring or rent a beach wheelchair with sand-capable tires. The ADA ramps at all seven beach access points will get you from the parking lot to the edge of the sand.',
      },
      {
        q: 'Is there accessible parking at 30A beach access points?',
        a: 'Yes. All seven regional beach access points on 30A have designated accessible parking spaces near the ADA ramps. Miramar Beach Regional has approximately 110 total parking spots, Inlet Beach has 40, Van Ness Butler Jr has 39, Fort Panic has 34, and Dune Allen has 23. Parking is free at all regional access points. During peak summer months parking fills quickly — arrive before 10 AM on weekends for the best chance at accessible spots close to the ramps.',
      },
    ],
  },
  {
    id: 'vacation-rentals',
    title: '🏠 Accessible Vacation Rentals on 30A',
    questions: [
      {
        q: 'Are there wheelchair-accessible vacation rentals on 30A?',
        a: 'Yes. There are wheelchair-accessible vacation rentals along Highway 30A, though they are far less common than standard rentals. Accessible 30A maintains a directory of properties with verified accessibility features including zero-step entry, roll-in showers, wide doorways (32 inches minimum), accessible pools, and hard surface flooring. Our flagship property, the Slim Shady Beach House in Seagrove Beach, was purpose-built for wheelchair accessibility with zero-step entry throughout, roll-in showers with grab bars in every bathroom, a heated plunge pool with ramp access, and a complimentary beach wheelchair for guests.',
      },
      {
        q: 'What should I look for in a wheelchair-accessible vacation rental on 30A?',
        a: 'When evaluating a wheelchair-accessible vacation rental on 30A, verify these specific features: (1) Zero-step entry — not "one small step" but truly zero steps at all entrances. (2) Door widths of at least 32 inches on every door you will use daily, including bedroom and bathroom doors. (3) Roll-in shower with zero threshold, grab bars, and a shower bench — not a step-in shower or bathtub. (4) Hard surface flooring throughout — thick carpet makes wheelchair navigation extremely difficult. (5) Adequate turning radius in bathrooms (at least 60 inches). (6) Pool access via ramp, lift, or zero-entry if the property has a pool. (7) Proximity to an accessible beach access point with ADA ramp and beach wheelchair. Do not rely on VRBO or Airbnb accessibility filters — they are self-reported by property owners and unverified.',
      },
      {
        q: 'Can I trust the wheelchair accessible filter on VRBO and Airbnb for 30A?',
        a: 'No. The "wheelchair accessible" filters on VRBO and Airbnb are self-reported by property owners and are not verified by the platforms. In our experience visiting 30A for over 20 years, the majority of properties that check the "accessible" box do not meet basic wheelchair accessibility standards. Common issues include: a single step at the entrance listed as "accessible" because it is ground floor, step-in showers labeled as "accessible" bathrooms, and doorways narrower than 32 inches. Always call the property manager directly and ask specific questions about door widths in inches, shower type (roll-in versus step-in), threshold heights, and number of steps. Accessible 30A verifies every listed property with actual wheelchair user reviews.',
      },
      {
        q: 'What is the most wheelchair-accessible vacation rental on 30A?',
        a: 'The Slim Shady Beach House in Seagrove Beach is the most comprehensively wheelchair-accessible vacation rental on 30A. It was purpose-built for wheelchair accessibility and features: zero-step entry at every entrance and throughout the entire home, 36-inch wide doorways on every interior door, roll-in showers with zero threshold and grab bars and built-in shower benches in every bathroom, hard surface flooring throughout with no carpet, a heated plunge pool with ramp access, a complimentary beach wheelchair for guests, roll-under sinks in bathrooms, and flat terrain with proximity to Santa Clara Regional Beach Access. It sleeps 10 in 4 bedrooms and 4 bathrooms. Book at slimshady30a.com or through Oversee property management.',
      },
      {
        q: 'How much does a wheelchair-accessible vacation rental cost on 30A?',
        a: 'Wheelchair-accessible vacation rentals on 30A range from approximately $200 per night for a smaller condo or studio to $800+ per night for a large accessible house during peak summer season (June–August). Spring and fall offer lower rates, typically 30–50% less than peak season. Winter rates are the lowest. Prices vary significantly based on the number of bedrooms, proximity to the beach, specific accessibility features (especially pool access), and the community location — Rosemary Beach and Alys Beach command premium rates compared to Santa Rosa Beach or Inlet Beach.',
      },
    ],
  },
  {
    id: 'restaurants',
    title: '🍽️ Accessible Restaurants on 30A',
    questions: [
      {
        q: 'Which restaurants on 30A are wheelchair accessible?',
        a: 'Several restaurants on 30A are fully wheelchair accessible with level or ramp entry, adequate table spacing, and accessible restrooms. Our top wheelchair-accessible restaurants include: Great Southern Café in Seaside (level entry on the town square, accessible restrooms, famous for Grits à Ya Ya), Shunk Gulley Oyster Bar near Gulf Place (level entry right next to Ed Walline Beach Access), Old Florida Fish House on Eastern Lake (spacious layout, accessible lakefront deck), Fish Out of Water at WaterColor Inn (hotel-grade accessibility, AAA Four Diamond dining), Pizza by the Sea in Seaside (open layout in the accessible town square), George\'s at Alys Beach (fully accessible fine dining in a courtyard setting), and Pompano Joe\'s in Miramar Beach (beachfront dining with ramp access). See our full accessible restaurant guide at accessible30a.com/accessible-dining for detailed reviews of every restaurant we have assessed.',
      },
      {
        q: 'Is The Red Bar on 30A wheelchair accessible?',
        a: 'No. The Red Bar in Grayton Beach is not wheelchair accessible. The historic building has steps at the entrance, a narrow interior, and no accessible restroom. While The Red Bar is one of 30A\'s most beloved and iconic restaurants — famous for its jazz music, eclectic decor, and devoted following — wheelchair users will face significant barriers. The outdoor seating area may offer limited accessibility depending on the current setup, but we recommend calling ahead. We include The Red Bar in our listings with honest accessibility information because it is one of the most frequently recommended restaurants on 30A, and wheelchair users deserve to know what to expect before arriving.',
      },
      {
        q: 'What is the best wheelchair-accessible restaurant near the beach on 30A?',
        a: 'Shunk Gulley Oyster Bar near Gulf Place is the best wheelchair-accessible restaurant near the beach on 30A. It has level entry, adequate table spacing for wheelchairs, accessible restrooms, and accessible outdoor seating — and it is located directly adjacent to Ed Walline Regional Beach Access, which is the most wheelchair-accessible beach on 30A. You can spend the morning on the beach with a free beach wheelchair and Mobi Mat at Ed Walline, then roll directly to Shunk Gulley for fresh oysters and Gulf seafood without ever loading into a car. Pompano Joe\'s in Miramar Beach is another excellent beachfront option with ramp entry and full accessibility.',
      },
    ],
  },
  {
    id: 'getting-around',
    title: '🚗 Getting Around 30A in a Wheelchair',
    questions: [
      {
        q: 'Is the 30A bike path wheelchair accessible?',
        a: 'Yes. The Timpoochee Trail (also called the 30A bike path) is a 19-mile paved multi-use trail that runs along Highway 30A from Dune Allen to Inlet Beach. It is completely wheelchair accessible — the surface is asphalt, well-maintained, and wide enough for two-way traffic. The trail is mostly flat with gentle grades and connects nearly every community along 30A, making it an excellent way to explore restaurants, shops, beach accesses, and towns without driving. Manual wheelchair users can self-propel on most stretches, and power wheelchair users will find the surface smooth and reliable.',
      },
      {
        q: 'Can I rent a wheelchair-accessible golf cart on 30A?',
        a: 'Some golf cart rental companies on 30A offer carts with wheelchair ramps or modifications for wheelchair users. Golf carts are one of the primary modes of transportation on 30A — many communities are golf-cart friendly and have dedicated cart paths. Contact local rental companies directly to ask about accessible options. Having an accessible golf cart opens up the 30A experience significantly, allowing you to cruise between towns, restaurants, and beach accesses without relying on a car for every trip. Be aware that golf carts are not permitted on Highway 30A itself, only on side streets and designated paths.',
      },
      {
        q: 'Is Seaside Florida wheelchair accessible?',
        a: 'Seaside is partially wheelchair accessible. The central town square is flat, paved, and easy to navigate in a wheelchair. Restaurants on the square including Great Southern Café and Pizza by the Sea have level entry. The amphitheater has wheelchair-accessible seating for concerts and movies. However, many of the charming brick paths and sandy side streets are difficult for wheelchairs. Some boutique shops have steps. The original Seaside cottages were built before accessibility standards and most have narrow doorways and steps. The nearby Van Ness Butler Jr Regional Beach Access (between Seaside and WaterColor) has an ADA ramp, free beach wheelchair, and stunning views. We recommend visiting Seaside for dining and shopping but staying in a verified accessible rental nearby rather than renting a cottage within Seaside.',
      },
      {
        q: 'How far apart are the towns on 30A?',
        a: 'Highway 30A stretches 24 miles from Miramar Beach on the west to Inlet Beach on the east. The 15 communities are spaced roughly 1–3 miles apart. From west to east: Miramar Beach, Seascape, Sandestin, Dune Allen, Santa Rosa Beach, Blue Mountain Beach, Grayton Beach, WaterColor, Seaside, Seagrove Beach, WaterSound, Seacrest Beach, Alys Beach, Rosemary Beach, and Inlet Beach. The Timpoochee Trail (paved bike path) connects most communities and is fully wheelchair accessible. Driving the full length of 30A takes approximately 45 minutes without stops.',
      },
    ],
  },
  {
    id: 'planning',
    title: '📋 Planning Your Accessible 30A Trip',
    questions: [
      {
        q: 'When is the best time to visit 30A for wheelchair users?',
        a: 'The best time to visit 30A for wheelchair users is late spring (April–May) or early fall (September–October). During these months you get: warm weather suitable for beach days, free beach wheelchairs at lifeguard towers (available March–October), smaller crowds than summer meaning easier parking and more beach wheelchair availability, lower vacation rental rates (30–50% less than peak summer), and fewer afternoon thunderstorms than summer. Avoid November through February if beach wheelchair access is important to you, as lifeguard towers are unstaffed and free beach wheelchairs are not available during winter.',
      },
      {
        q: 'What is the closest airport to 30A Florida?',
        a: 'The two closest airports to Highway 30A are Destin-Fort Walton Beach Airport (VPS), approximately 30–45 minutes west of 30A, and Panama City Beach/Northwest Florida Beaches International Airport (ECP), approximately 30–45 minutes east. Both airports are served by major carriers including Delta, American, United, and Southwest. VPS is closer to the western communities (Miramar Beach, Sandestin, Dune Allen), while ECP is closer to the eastern communities (Rosemary Beach, Inlet Beach). Both airports have wheelchair-accessible rental car facilities. Pensacola International Airport (PNS) is approximately 90 minutes west and often has lower fares.',
      },
      {
        q: 'Is 30A a good vacation destination for families with disabled members?',
        a: 'Yes. Highway 30A is one of the better beach vacation destinations in the southeastern United States for families with disabled members, particularly wheelchair users. The area offers: seven ADA-accessible beach access points with free beach wheelchairs during season (March–October), a 19-mile fully paved wheelchair-accessible bike trail (Timpoochee Trail), a growing number of wheelchair-accessible vacation rentals, numerous accessible restaurants, flat terrain in most communities, and a welcoming community atmosphere. The main limitations are: soft sand that requires a beach wheelchair (standard wheelchairs cannot traverse it), limited accessible vacation rental inventory compared to total rental stock, and some older buildings and communities with accessibility challenges. We built Accessible 30A specifically to help families navigate these challenges with verified, honest information.',
      },
      {
        q: 'Do I need a car on 30A?',
        a: 'A car is recommended but not strictly necessary if you are staying in a central location on 30A (near Gulf Place, Seaside, or WaterColor). The 19-mile Timpoochee Trail is fully wheelchair accessible and connects most communities. Golf carts are available for rent (some with wheelchair modifications). Ride-sharing services operate in the area. However, a car gives you the most flexibility, especially for: grocery runs to Publix in Santa Rosa Beach, reaching beach access points that may be several miles from your rental, exploring Destin or Panama City Beach for additional dining and shopping, and managing luggage and wheelchair equipment on arrival and departure. If renting a car, request an accessible vehicle or bring your own adaptive equipment.',
      },
      {
        q: 'What is the Accessible Rating System (ARS)?',
        a: 'The Accessible Rating System (ARS) is a standardized scoring methodology developed by Accessible 30A that evaluates vacation rental accessibility across 50+ specific data points in six categories: Entry and Navigation (zero-step entry, ramp grade, door widths, hallway widths, threshold heights, flooring), Bathroom (shower type, grab bars, bench, toilet height, under-sink clearance, turning radius), Bedroom (bed height, transfer space, closet reach, light controls), Kitchen (counter height, clearance, appliance reach, table height), Outdoor (pool access type, deck accessibility, parking, surface types), and Location (distance to accessible beach access, accessible restaurants, terrain grade). Each property receives an overall score from 1 to 100 plus individual category scores. ARS scores are verified by wheelchair users who physically visit and evaluate each property — they are never self-reported by property owners.',
      },
    ],
  },
  {
    id: 'slim-shady',
    title: '🏡 Slim Shady Beach House',
    questions: [
      {
        q: 'What accessibility features does Slim Shady Beach House have?',
        a: 'Slim Shady Beach House in Seagrove Beach is purpose-built for wheelchair accessibility with the following features: zero-step entry at every entrance and zero thresholds throughout the entire home, 36-inch wide doorways on every interior door, roll-in showers with zero threshold in every bathroom with grab bars and built-in shower benches, hard surface flooring throughout with no carpet anywhere, a heated plunge pool with ramp access and 4-foot depth, a complimentary beach wheelchair for guests, roll-under sinks in all bathrooms, level driveway parking with direct accessible entry, flat terrain throughout the property, and proximity to Santa Clara Regional Beach Access which has an ADA ramp and free beach wheelchair at Lifeguard Tower 4.',
      },
      {
        q: 'How do I book Slim Shady Beach House on 30A?',
        a: 'Slim Shady Beach House can be booked through Oversee property management at slimshady30a.com or by visiting the property listing on Accessible 30A at accessible30a.com/accessible-rentals/slim-shady-beach-house. The property is a 4-bedroom, 4-bathroom home in Seagrove Beach that sleeps 10 guests. For specific accessibility questions or to confirm that the property meets your needs, contact us at hello@accessible30a.com and we will personally help you evaluate whether Slim Shady is the right fit.',
      },
      {
        q: 'Where is Slim Shady Beach House located on 30A?',
        a: 'Slim Shady Beach House is located at 172 Shady Pines Drive in Seagrove Beach, Florida 32459, on Highway 30A. It is situated in a quiet residential area with flat terrain ideal for wheelchair navigation. The nearest wheelchair-accessible beach access is Santa Clara Regional Beach Access, which has an ADA ramp, free beach wheelchair at Lifeguard Tower 4 (Bramble Grove), accessible restrooms, and parking on both sides of Scenic Highway 30A. The property is centrally located on 30A, approximately 5 minutes from Seaside, WaterColor, and numerous accessible restaurants.',
      },
    ],
  },
];

// Generate Schema.org FAQPage structured data for Google
function generateFAQSchema() {
  const allQuestions = FAQ_SECTIONS.flatMap(s => s.questions);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allQuestions.map(q => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.a,
      },
    })),
  };
}

export const metadata = {
  title: 'FAQ — Wheelchair Accessible Travel on 30A | Accessible 30A',
  description: 'Frequently asked questions about wheelchair-accessible vacation rentals, beach wheelchairs, beach access, restaurants, and trip planning on Florida\'s Highway 30A.',
  alternates: {
    canonical: 'https://accessible30a.com/faq',
  },
};

export default function FAQPage() {
  const faqSchema = generateFAQSchema();
  const totalQuestions = FAQ_SECTIONS.reduce((sum, s) => sum + s.questions.length, 0);

  return (
    <>
      <Header />

      {/* FAQPage Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main id="main-content" className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="bg-ocean-800 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-ocean-200 text-lg max-w-2xl mx-auto">
              {totalQuestions} answers about wheelchair-accessible travel on Florida&apos;s Highway 30A — beach wheelchairs, vacation rentals, restaurants, and trip planning.
            </p>
          </div>
        </section>

        {/* Jump links */}
        <section className="bg-sand-100 border-b border-sand-200 sticky top-16 lg:top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide" aria-label="FAQ categories">
              {FAQ_SECTIONS.map(section => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="px-3 py-1.5 text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-white rounded-full whitespace-nowrap transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-12 sm:py-16 bg-sand-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {FAQ_SECTIONS.map(section => (
              <div key={section.id} id={section.id} className="mb-14 scroll-mt-32">
                <h2 className="font-display text-2xl font-bold text-ocean-900 mb-6 pb-3 border-b border-sand-200">
                  {section.title}
                </h2>
                <div className="space-y-6">
                  {section.questions.map((faq, i) => (
                    <div key={i} className="bg-white rounded-xl border border-sand-200 p-6 sm:p-8">
                      <h3 className="font-display text-lg font-bold text-ocean-900 mb-3">
                        {faq.q}
                      </h3>
                      <p className="text-ocean-700 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still have questions */}
        <section className="py-16 bg-white border-t border-sand-200">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-2xl font-bold text-ocean-900 mb-3">
              Still Have Questions?
            </h2>
            <p className="text-ocean-600 mb-6">
              We answer every email personally. As wheelchair users ourselves, we understand the questions that matter most.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:hello@accessible30a.com"
                className="w-full sm:w-auto px-8 py-3 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold rounded-full transition-colors"
              >
                Email Us
              </a>
              <Link
                href="/blog"
                className="w-full sm:w-auto px-8 py-3 bg-sand-200 hover:bg-sand-300 text-ocean-700 font-semibold rounded-full transition-colors"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </section>

        {/* Internal linking for SEO juice */}
        <section className="py-12 bg-sand-50 border-t border-sand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-ocean-900 mb-6 text-center">
              Explore Accessible 30A
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/accessible-rentals" className="group bg-white rounded-xl border border-sand-200 p-5 card-hover text-center">
                <span className="text-3xl mb-2 block">🏠</span>
                <h3 className="font-semibold text-ocean-900 group-hover:text-ocean-600 transition-colors">Accessible Rentals</h3>
                <p className="text-sm text-ocean-500 mt-1">Verified wheelchair-accessible vacation homes</p>
              </Link>
              <Link href="/beach-access" className="group bg-white rounded-xl border border-sand-200 p-5 card-hover text-center">
                <span className="text-3xl mb-2 block">🏖️</span>
                <h3 className="font-semibold text-ocean-900 group-hover:text-ocean-600 transition-colors">Beach Access Guide</h3>
                <p className="text-sm text-ocean-500 mt-1">7 ADA beach access points with details</p>
              </Link>
              <Link href="/accessible-dining" className="group bg-white rounded-xl border border-sand-200 p-5 card-hover text-center">
                <span className="text-3xl mb-2 block">🍽️</span>
                <h3 className="font-semibold text-ocean-900 group-hover:text-ocean-600 transition-colors">Accessible Dining</h3>
                <p className="text-sm text-ocean-500 mt-1">Honest restaurant accessibility reviews</p>
              </Link>
              <Link href="/towns" className="group bg-white rounded-xl border border-sand-200 p-5 card-hover text-center">
                <span className="text-3xl mb-2 block">🗺️</span>
                <h3 className="font-semibold text-ocean-900 group-hover:text-ocean-600 transition-colors">Towns on 30A</h3>
                <p className="text-sm text-ocean-500 mt-1">Explore 15 beach communities</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
