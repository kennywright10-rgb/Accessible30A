'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/accessible-rentals', label: 'Accessible Rentals' },
  { href: '/beach-access', label: 'Beach Access' },
  { href: '/accessible-dining', label: 'Accessible Dining' },
  { href: '/towns', label: 'Towns' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-sand-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full bg-ocean-500 flex items-center justify-center group-hover:bg-ocean-600 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="2" />
                  <path d="M10 22V18L7 15.5" />
                  <path d="M14 22V18L17 15.5" />
                  <path d="M8 12C8 9.5 10 8 12 8C14 8 16 9.5 16 12" />
                  <circle cx="12" cy="17" r="5" fill="none" />
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-ocean-800 text-lg leading-none">
                  Accessible<span className="text-coral-400">30A</span>
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-ocean-700 hover:text-ocean-900 hover:bg-ocean-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/accessible-rentals/slim-shady-beach-house"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-coral-400 hover:bg-coral-500 text-white text-sm font-semibold rounded-full transition-colors"
              >
                Book Slim Shady
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-ocean-700 hover:bg-ocean-50 rounded-lg"
                aria-expanded={mobileOpen}
                aria-label="Toggle navigation menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-sand-200/60 bg-white" aria-label="Mobile navigation">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-ocean-700 hover:bg-ocean-50 rounded-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/accessible-rentals/slim-shady-beach-house"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-center bg-coral-400 hover:bg-coral-500 text-white rounded-full font-semibold mt-3"
              >
                Book Slim Shady Beach House
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
