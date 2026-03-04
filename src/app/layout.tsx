import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://accessible30a.com'),
  title: {
    default: 'Accessible 30A — Wheelchair Accessible Vacation Rentals on Florida\'s Highway 30A',
    template: '%s | Accessible 30A',
  },
  description: 'The definitive guide to wheelchair-accessible vacation rentals, beach access, and dining on Florida\'s Highway 30A. Verified accessibility data from real wheelchair users.',
  keywords: [
    'wheelchair accessible vacation rentals 30A',
    'accessible beach access 30A',
    'handicap friendly rentals Santa Rosa Beach',
    'wheelchair accessible restaurants 30A',
    'beach wheelchair rental South Walton',
    'ADA accessible condos Seaside Florida',
    'accessible things to do Rosemary Beach',
    'wheelchair accessible 30A',
    'disability friendly beach vacation Florida',
  ],
  authors: [{ name: 'Ken & Stephanie Wright' }],
  creator: 'Accessible 30A',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://accessible30a.com',
    siteName: 'Accessible 30A',
    title: 'Accessible 30A — Wheelchair Accessible Vacation Rentals',
    description: 'Verified wheelchair-accessible vacation rentals, beach access guides, and restaurant reviews on Florida\'s Highway 30A.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@accessible30a',
    creator: '@accessible30a',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Schema.org - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Accessible 30A',
              url: 'https://accessible30a.com',
              logo: 'https://accessible30a.com/logo.png',
              sameAs: [
                'https://www.instagram.com/accessible30a',
                'https://www.facebook.com/accessible30a',
                'https://www.tiktok.com/@accessible30a',
                'https://www.youtube.com/@accessible30a',
                'https://www.pinterest.com/accessible30a',
              ],
              description: 'The definitive guide to wheelchair-accessible vacation rentals, beach access, and dining on Florida\'s Highway 30A.',
              founders: [
                { '@type': 'Person', name: 'Ken Wright' },
                { '@type': 'Person', name: 'Stephanie Wright' },
              ],
            }),
          }}
        />
      </head>
      <body className="font-body text-ocean-900 bg-sand-50 antialiased">
        {children}
      </body>
    </html>
  );
}
