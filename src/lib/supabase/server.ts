// =============================================================================
// Supabase Client — Server-side (for API routes, server components, scripts)
// =============================================================================

import { createClient } from '@supabase/supabase-js';

// Server-side client with service role (bypasses RLS for admin ops)
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing Supabase service role credentials');
  return createClient(url, key);
}

// Server-side client with anon key (respects RLS)
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Missing Supabase credentials');
  return createClient(url, key);
}
