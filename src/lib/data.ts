// =============================================================================
// Data Fetching Utilities
// Used by server components and API routes
// =============================================================================

import { createServerClient } from './supabase/server';
import type { Property, BeachAccess, Restaurant, PropertySearchParams, PropertyAccessibility, Town, Review } from '@/types';

const DESTINATION_30A_ID = '00000000-0000-0000-0000-000000000001';

// ─── PROPERTIES ──────────────────────────────────────────────────────────────

export async function getProperties(params: PropertySearchParams = {}) {
  const supabase = createServerClient();
  const {
    destination_id = DESTINATION_30A_ID,
    town_id,
    property_type,
    min_beds,
    max_beds,
    min_price,
    max_price,
    min_ars_score,
    requires_zero_step_entry,
    requires_roll_in_shower,
    requires_elevator,
    requires_pool_access,
    page = 1,
    limit = 20,
    sort_by = 'featured',
    sort_order = 'desc',
  } = params;

  let query = supabase
    .from('properties')
    .select('*, town:towns(name, slug)', { count: 'exact' })
    .eq('destination_id', destination_id)
    .eq('status', 'active');

  if (town_id) query = query.eq('town_id', town_id);
  if (property_type?.length) query = query.in('property_type', property_type);
  if (min_beds) query = query.gte('bedrooms', min_beds);
  if (max_beds) query = query.lte('bedrooms', max_beds);
  if (min_price) query = query.gte('price_min', min_price);
  if (max_price) query = query.lte('price_max', max_price);
  if (min_ars_score) query = query.gte('ars_score', min_ars_score);

  // Sort: flagship first, then featured, then by sort_by
  query = query
    .order('flagship', { ascending: false })
    .order('featured', { ascending: false })
    .order(sort_by, { ascending: sort_order === 'asc' });

  // Pagination
  const from = (page - 1) * limit;
  query = query.range(from, from + limit - 1);

  const { data, error, count } = await query;
  if (error) throw error;

  // If accessibility filters are set, post-filter
  // (In production, these would be optimized subqueries or materialized views)
  let filtered = data || [];
  if (requires_zero_step_entry || requires_roll_in_shower || requires_elevator || requires_pool_access) {
    const propertyIds = filtered.map(p => p.id);
    const { data: accessData } = await supabase
      .from('property_accessibility')
      .select('property_id, attribute, value')
      .in('property_id', propertyIds);

    const accessMap = new Map<string, Map<string, string>>();
    for (const row of accessData || []) {
      if (!accessMap.has(row.property_id)) accessMap.set(row.property_id, new Map());
      accessMap.get(row.property_id)!.set(row.attribute, row.value);
    }

    filtered = filtered.filter(p => {
      const attrs = accessMap.get(p.id);
      if (!attrs) return false;
      if (requires_zero_step_entry && attrs.get('zero_step_entry') !== 'true') return false;
      if (requires_roll_in_shower && attrs.get('shower_type') !== 'roll_in') return false;
      if (requires_elevator && attrs.get('elevator_available') !== 'true') return false;
      if (requires_pool_access && !['ramp', 'lift', 'zero_entry'].includes(attrs.get('pool_access_type') || '')) return false;
      return true;
    });
  }

  return { properties: filtered as Property[], total: count || 0 };
}

export async function getPropertyBySlug(slug: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*, town:towns(name, slug)')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data as Property;
}

export async function getPropertyAccessibility(propertyId: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('property_accessibility')
    .select('*')
    .eq('property_id', propertyId)
    .order('category')
    .order('attribute');

  if (error) throw error;
  return data as PropertyAccessibility[];
}

// ─── BEACH ACCESSES ──────────────────────────────────────────────────────────

export async function getBeachAccesses(destinationId = DESTINATION_30A_ID) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('beach_accesses')
    .select('*, town:towns(name, slug)')
    .eq('destination_id', destinationId)
    .eq('status', 'active')
    .order('sort_order');

  if (error) throw error;
  return data as BeachAccess[];
}

export async function getBeachAccessBySlug(slug: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('beach_accesses')
    .select('*, town:towns(name, slug)')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data as BeachAccess;
}

// ─── RESTAURANTS ─────────────────────────────────────────────────────────────

export async function getRestaurants(destinationId = DESTINATION_30A_ID) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('restaurants')
    .select('*, town:towns(name, slug)')
    .eq('destination_id', destinationId)
    .eq('status', 'active')
    .order('name');

  if (error) throw error;
  return data as Restaurant[];
}

export async function getRestaurantBySlug(slug: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('restaurants')
    .select('*, town:towns(name, slug)')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data as Restaurant;
}

// ─── TOWNS ───────────────────────────────────────────────────────────────────

export async function getTowns(destinationId = DESTINATION_30A_ID) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('towns')
    .select('*')
    .eq('destination_id', destinationId)
    .order('sort_order');

  if (error) throw error;
  return data as Town[];
}

// ─── REVIEWS ─────────────────────────────────────────────────────────────────

export async function getReviews(entityType: string, entityId: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('*, user:users(name, avatar_url)')
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Review[];
}

// ─── FEATURED / HOME PAGE ────────────────────────────────────────────────────

export async function getFlagshipProperty() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('flagship', true)
    .single();

  if (error) throw error;
  return data as Property;
}

export async function getFeaturedProperties(limit = 6) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*, town:towns(name, slug)')
    .eq('status', 'active')
    .order('flagship', { ascending: false })
    .order('featured', { ascending: false })
    .order('ars_score', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Property[];
}
