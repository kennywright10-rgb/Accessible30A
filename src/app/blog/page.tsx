import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog — Accessible 30A',
  description: 'Guides, tips, and stories about wheelchair-accessible travel on Florida\'s Highway 30A. Written by a wheelchair-using family with 20 years of experience.',
};

async function getPosts() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });
  return data || [];
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  guide: { bg: 'bg-ocean-100', text: 'text-ocean-700', label: 'Guide' },
  opinion: { bg: 'bg-coral-100', text: 'text-coral-700', label: 'Opinion' },
  story: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Our Story' },
  vision: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Vision' },
};

const POST_EMOJI: Record<string, string> = {
  'beach-wheelchair-guide-30a': '🦽',
  'ed-walline-best-accessible-beach-30a': '🏖️',
  'what-accessible-really-means': '🔍',
  'our-story-building-slim-shady': '🏠',
  'first-wheelchair-vacation-30a-tips': '📋',
  'accessible-restaurants-guide-30a': '🍽️',
  'timpoochee-trail-wheelchair-accessible': '🚴',
  'pool-access-wheelchair-users-30a': '🏊',
  'seaside-wheelchair-accessibility-guide': '🏛️',
  'why-building-accessibility-rating-system': '⭐',
};

function PostCard({ post, featured }: { post: any; featured?: boolean }) {
  const cat = CATEGORY_STYLES[post.category] || CATEGORY_STYLES.guide;
  const emoji = POST_EMOJI[post.slug] || '📝';
  const date = new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl border border-sand-200 overflow-hidden card-hover">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="aspect-[4/3] md:aspect-auto bg-gradient-to-br from-ocean-500 to-ocean-700 flex items-center justify-center min-h-[250px]">
            <span className="text-8xl opacity-80">{emoji}</span>
          </div>
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cat.bg} ${cat.text}`}>{cat.label}</span>
              <span className="text-xs text-ocean-400">{date}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ocean-900 mb-3 group-hover:text-ocean-600 transition-colors">{post.title}</h2>
            <p className="text-ocean-600 mb-4 line-clamp-3">{post.excerpt}</p>
            <span className="text-coral-500 font-semibold group-hover:text-coral-600">Read More →</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group bg-white rounded-xl border border-sand-200 overflow-hidden card-hover">
      <div className="aspect-[16/9] bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center">
        <span className="text-5xl opacity-80">{emoji}</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cat.bg} ${cat.text}`}>{cat.label}</span>
          <span className="text-xs text-ocean-400">{date}</span>
        </div>
        <h3 className="font-display font-bold text-ocean-900 text-lg mb-2 group-hover:text-ocean-600 transition-colors line-clamp-2">{post.title}</h3>
        <p className="text-sm text-ocean-600 line-clamp-2 mb-3">{post.excerpt}</p>
        <span className="text-sm font-semibold text-coral-500 group-hover:text-coral-600">Read More →</span>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20 lg:pt-24">
        <section className="bg-ocean-800 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Blog</h1>
            <p className="text-ocean-200 text-lg max-w-2xl mx-auto">Guides, tips, and honest stories about wheelchair-accessible travel on 30A. Written from 20 years of lived experience.</p>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-sand-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {featured && <div className="mb-12"><PostCard post={featured} featured /></div>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post: any) => (<PostCard key={post.id} post={post} />))}
            </div>
            {posts.length === 0 && <div className="text-center py-20"><p className="text-ocean-500 text-lg">Blog posts coming soon!</p></div>}
          </div>
        </section>

        <section className="py-16 bg-ocean-900">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">Get Accessible 30A Updates</h2>
            <p className="text-ocean-300 mb-6">New property reviews, beach access updates, and trip planning tips. No spam.</p>
            <a href="mailto:hello@accessible30a.com?subject=Subscribe to Accessible 30A" className="inline-flex px-8 py-3 bg-coral-400 hover:bg-coral-500 text-white font-semibold rounded-full transition-colors">Subscribe (Coming Soon)</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
