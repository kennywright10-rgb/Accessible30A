// =============================================================================
// Affiliate Link Utilities
// Handles VRBO (CJ Affiliate), Airbnb, and direct booking tracking
// =============================================================================

const CJ_PUBLISHER_ID = process.env.CJ_AFFILIATE_PUBLISHER_ID || '';
const CJ_WEBSITE_ID = process.env.CJ_AFFILIATE_WEBSITE_ID || '';

/**
 * Generate a CJ Affiliate tracked link for VRBO listings
 * VRBO's CJ program uses deep linking to specific property pages
 *
 * Format: https://www.anrdoezrs.net/links/{publisher_id}/type/dlg/sid/{tracking_id}/https://www.vrbo.com/...
 */
export function createVRBOAffiliateLink(
  vrboUrl: string,
  trackingParams?: { propertySlug?: string; source?: string }
): string {
  if (!CJ_PUBLISHER_ID) {
    // Fallback to direct link if CJ not configured
    return vrboUrl;
  }

  // Build tracking SID (sub-ID for our internal analytics)
  const sid = [
    trackingParams?.propertySlug || 'unknown',
    trackingParams?.source || 'website',
    Date.now().toString(36),
  ].join('_');

  // CJ deep link format
  return `https://www.anrdoezrs.net/links/${CJ_PUBLISHER_ID}/type/dlg/sid/${sid}/${encodeURIComponent(vrboUrl)}`;
}

/**
 * Track an affiliate click (server-side)
 * Logs to our database for reconciliation with CJ reports
 */
export async function trackAffiliateClick(data: {
  propertyId: string;
  platform: 'vrbo' | 'airbnb' | 'direct';
  affiliateUrl: string;
  referrer?: string;
  userAgent?: string;
}) {
  // In production, this writes to a clicks table in Supabase
  // For now, just log it
  console.log('[Affiliate Click]', {
    ...data,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Build the booking URL for a property, choosing the best monetization path:
 * 1. Direct booking (Stripe) — highest margin
 * 2. Affiliate link (VRBO/Airbnb) — commission
 * 3. Property manager direct link — referral fee
 */
export function getBookingUrl(property: {
  stripe_account_id?: string | null;
  affiliate_url?: string | null;
  vrbo_url?: string | null;
  airbnb_url?: string | null;
  booking_url?: string | null;
  slug: string;
}): { url: string; type: 'direct' | 'affiliate' | 'external'; platform: string } {
  // Priority 1: Direct booking through our platform (highest margin)
  if (property.stripe_account_id) {
    return {
      url: `/book/${property.slug}`,
      type: 'direct',
      platform: 'accessible30a',
    };
  }

  // Priority 2: Pre-built affiliate link
  if (property.affiliate_url) {
    return {
      url: property.affiliate_url,
      type: 'affiliate',
      platform: 'affiliate',
    };
  }

  // Priority 3: VRBO with CJ affiliate wrapping
  if (property.vrbo_url) {
    return {
      url: createVRBOAffiliateLink(property.vrbo_url, {
        propertySlug: property.slug,
        source: 'listing',
      }),
      type: 'affiliate',
      platform: 'vrbo',
    };
  }

  // Priority 4: Airbnb (apply for their affiliate program separately)
  if (property.airbnb_url) {
    return {
      url: property.airbnb_url,
      type: 'affiliate',
      platform: 'airbnb',
    };
  }

  // Priority 5: Direct to property manager
  if (property.booking_url) {
    return {
      url: property.booking_url,
      type: 'external',
      platform: 'property_manager',
    };
  }

  // Fallback
  return {
    url: `/accessible-rentals/${property.slug}`,
    type: 'external',
    platform: 'none',
  };
}
