import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

async function getPost(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  return data;
}

async function getRelatedPosts(currentSlug: string, category: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('blog_posts')
    .select('title, slug, excerpt, category, published_at')
    .eq('published', true)
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(3);
  return data || [];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
  };
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  guide: { bg: 'bg-ocean-100', text: 'text-ocean-700', label: 'Guide' },
  opinion: { bg: 'bg-coral-100', text: 'text-coral-700', label: 'Opinion' },
  story: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Our Story' },
  vision: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Vision' },
};

// Simple markdown-ish renderer for blog body
function renderBody(body: string) {
  const lines = body.split('\n');
  const elements: any[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={key++} className="h-4" />);
    } else if (trimmed.startsWith('### ')) {
      elements.push(<h3 key={key++} className="font-display text-xl font-bold text-ocean-900 mt-8 mb-3">{trimmed.slice(4)}</h3>);
    } else if (trimmed.startsWith('## ')) {
      elements.push(<h2 key={key++} className="font-display text-2xl font-bold text-ocean-900 mt-10 mb-4">{trimmed.slice(3)}</h2>);
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      elements.push(<p key={key++} className="text-ocean-900 font-semibold mb-2">{trimmed.slice(2, -2)}</p>);
    } else if (trimmed.startsWith('**')) {
      // Bold start in paragraph
      const parts = trimmed.split('**');
      elements.push(
        <p key={key++} className="text-ocean-700 leading-relaxed mb-3">
          {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-ocean-900">{part}</strong> : part)}
        </p>
      );
    } else {
      elements.push(<p key={key++} className="text-ocean-700 leading-relaxed mb-3">{trimmed}</p>);
    }
  }
  return elements;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const related = await getRelatedPosts(params.slug, post.category);
  const cat = CATEGORY_STYLES[post.category] || CATEGORY_STYLES.guide;
  const date = new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20 lg:pt-24">
        {/* Breadcrumb */}
        <div className="bg-sand-100 border-b border-sand-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-ocean-500">
              <Link href="/" className="hover:text-ocean-700">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-ocean-700">Blog</Link>
              <span>/</span>
              <span className="text-ocean-800 font-medium line-clamp-1">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="py-10 sm:py-16 bg-sand-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cat.bg} ${cat.text}`}>{cat.label}</span>
                <span className="text-sm text-ocean-400">{date}</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ocean-900 mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-lg text-ocean-600 leading-relaxed">{post.excerpt}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ocean-500 flex items-center justify-center text-white font-bold text-sm">KS</div>
                <div>
                  <p className="text-sm font-medium text-ocean-900">{post.author}</p>
                  <p className="text-xs text-ocean-500">Founders, Accessible 30A</p>
                </div>
              </div>
            </header>

            {/* Body */}
            <div className="bg-white rounded-2xl border border-sand-200 p-6 sm:p-10 mb-10">
              {renderBody(post.body)}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-sand-200 text-ocean-600 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="bg-ocean-800 rounded-xl p-6 sm:p-8 text-center mb-10">
              <h3 className="font-display text-xl font-bold text-white mb-2">Planning an Accessible 30A Trip?</h3>
              <p className="text-ocean-300 text-sm mb-4">Browse verified accessible properties, beach access guides, and restaurant reviews.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/accessible-rentals" className="px-6 py-2.5 bg-coral-400 hover:bg-coral-500 text-white font-semibold rounded-full text-sm transition-colors">Find Accessible Rentals</Link>
                <Link href="/beach-access" className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full text-sm transition-colors border border-white/20">Beach Access Guide</Link>
              </div>
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
              <div>
                <h3 className="font-display text-xl font-bold text-ocean-900 mb-4">More from the Blog</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {related.map((r: any) => {
                    const rCat = CATEGORY_STYLES[r.category] || CATEGORY_STYLES.guide;
                    return (
                      <Link key={r.slug} href={`/blog/${r.slug}`} className="group bg-white rounded-lg border border-sand-200 p-4 card-hover">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${rCat.bg} ${rCat.text}`}>{rCat.label}</span>
                        <h4 className="font-semibold text-ocean-900 text-sm mt-2 group-hover:text-ocean-600 transition-colors line-clamp-2">{r.title}</h4>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-10">
              <Link href="/blog" className="text-ocean-600 hover:text-ocean-800 font-medium text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back to all posts
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
