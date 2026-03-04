// =============================================================================
// Accessible 30A — Core Type Definitions
// Designed for multi-destination scale from day one
// =============================================================================

// ─── DESTINATIONS ────────────────────────────────────────────────────────────

export interface Destination {
  id: string;
  name: string;                    // "Highway 30A" or "Gulf Shores"
  slug: string;                    // "30a" or "gulf-shores"
  region: string;                  // "Florida Panhandle"
  country: string;                 // "US"
  description: string;
  hero_image_url: string | null;
  latitude: number;
  longitude: number;
  timezone: string;                // "America/Chicago"
  status: 'active' | 'coming_soon' | 'archived';
  created_at: string;
  updated_at: string;
}

// ─── TOWNS / NEIGHBORHOODS ───────────────────────────────────────────────────

export interface Town {
  id: string;
  destination_id: string;
  name: string;                    // "Rosemary Beach"
  slug: string;                    // "rosemary-beach"
  description: string;
  hero_image_url: string | null;
  latitude: number;
  longitude: number;
  sort_order: number;              // For display ordering (west to east on 30A)
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

// ─── PROPERTIES ──────────────────────────────────────────────────────────────

export type PropertyType = 'house' | 'condo' | 'villa' | 'resort' | 'cabin' | 'cottage' | 'bnb';
export type PropertyStatus = 'active' | 'pending_verification' | 'unverified' | 'archived';
export type ListingSource = 'manual' | 'vrbo_scrape' | 'airbnb_scrape' | 'pm_submission' | 'community_tip';

export interface Property {
  id: string;
  destination_id: string;
  town_id: string | null;
  name: string;                    // "Slim Shady Beach House"
  slug: string;
  property_type: PropertyType;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  latitude: number;
  longitude: number;

  // Property basics
  bedrooms: number | null;
  bathrooms: number | null;
  sleeps: number | null;
  sqft: number | null;
  description: string;

  // ARS (Accessible Rating System)
  ars_score: number | null;        // 1-100 composite score
  ars_entry_score: number | null;  // Category scores
  ars_bathroom_score: number | null;
  ars_bedroom_score: number | null;
  ars_kitchen_score: number | null;
  ars_outdoor_score: number | null;
  ars_location_score: number | null;
  ars_verified_at: string | null;
  ars_verified_by: string | null;  // user_id of verifier

  // Booking & monetization
  booking_url: string | null;      // Direct booking link (PM or own site)
  vrbo_url: string | null;
  airbnb_url: string | null;
  affiliate_url: string | null;    // Tracked affiliate link
  stripe_account_id: string | null; // For direct bookings via Stripe Connect
  price_min: number | null;        // Nightly rate range
  price_max: number | null;

  // Management
  owner_id: string | null;         // user_id
  manager_id: string | null;       // user_id (property manager)
  manager_company: string | null;  // "360 Blue", "Oversee", etc.
  listing_source: ListingSource;
  source_url: string | null;       // Where we found this listing
  featured: boolean;
  flagship: boolean;               // Ken's property

  // Media
  hero_image_url: string | null;
  video_walkthrough_url: string | null;
  video_transcript: string | null; // For AI/search indexing

  // SEO
  meta_title: string | null;
  meta_description: string | null;

  status: PropertyStatus;
  created_at: string;
  updated_at: string;
}

// ─── ACCESSIBILITY DATA (ARS) ────────────────────────────────────────────────
// This is the core IP — granular, structured accessibility data

export type ARSCategory = 'entry' | 'bathroom' | 'bedroom' | 'kitchen' | 'outdoor' | 'location';

export interface PropertyAccessibility {
  id: string;
  property_id: string;
  category: ARSCategory;
  attribute: string;               // "door_width_front", "shower_type", "ramp_grade"
  value: string;                   // "36", "roll_in", "1:12"
  unit: string | null;             // "inches", "degrees", null for enums
  verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
  photo_url: string | null;        // Photo evidence of this specific feature
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Predefined ARS attributes per category
export const ARS_ATTRIBUTES = {
  entry: [
    'zero_step_entry', 'ramp_available', 'ramp_grade', 'ramp_width',
    'front_door_width', 'threshold_height', 'doorbell_height',
    'hallway_width_min', 'flooring_type', 'elevator_available',
    'elevator_door_width', 'parking_proximity', 'parking_type',
    'path_surface', 'path_grade', 'lighting_exterior',
  ],
  bathroom: [
    'shower_type',                  // roll_in | step_in | tub_only | tub_with_shower
    'shower_bench', 'shower_grab_bars', 'shower_handheld',
    'shower_door_width', 'shower_threshold_height',
    'toilet_height', 'toilet_grab_bars',
    'sink_under_clearance', 'sink_height',
    'turning_radius', 'door_width', 'door_type', // swing | pocket | barn
    'mirror_height', 'non_slip_flooring',
  ],
  bedroom: [
    'bed_height', 'transfer_space_side', 'transfer_space_inches',
    'closet_reach_height', 'light_switch_height',
    'outlet_height', 'door_width', 'flooring_type',
    'turning_radius',
  ],
  kitchen: [
    'counter_height', 'under_counter_clearance',
    'sink_height', 'sink_under_clearance',
    'microwave_height', 'oven_type', // wall | range
    'refrigerator_type', 'table_height', 'table_clearance',
    'aisle_width',
  ],
  outdoor: [
    'pool_access_type',             // ramp | lift | zero_entry | steps_only | none
    'pool_depth', 'hot_tub_accessible',
    'patio_accessible', 'patio_surface',
    'grill_accessible', 'outdoor_shower',
    'deck_ramp', 'yard_surface',
  ],
  location: [
    'nearest_beach_access_name', 'nearest_beach_access_distance',
    'nearest_beach_access_ada', 'nearest_beach_wheelchair',
    'nearest_accessible_restaurant_distance',
    'neighborhood_terrain', // flat | hilly | mixed
    'sidewalk_condition', 'golf_cart_accessible',
    'accessible_transit_available',
  ],
} as const;

// ─── BEACH ACCESSES ──────────────────────────────────────────────────────────

export interface BeachAccess {
  id: string;
  destination_id: string;
  town_id: string | null;
  name: string;                    // "Ed Walline Regional Beach Access"
  slug: string;
  address: string;
  latitude: number;
  longitude: number;

  // Accessibility features
  ada_ramp: boolean;
  ramp_description: string | null;
  beach_wheelchair: boolean;
  beach_wheelchair_details: string | null; // "Tower 9, free, first-come"
  mobi_mat: boolean;
  mobi_mat_details: string | null;
  accessible_restroom: boolean;
  accessible_parking: boolean;
  parking_spots: number | null;
  lifeguard: boolean;
  lifeguard_season: string | null; // "March 1 - Oct 31"

  // Content
  description: string;
  tips: string | null;             // Stephanie's insider tips
  hero_image_url: string | null;
  video_url: string | null;
  video_transcript: string | null;

  // Ratings
  overall_rating: number | null;   // Community average
  accessibility_rating: number | null;

  // SEO
  meta_title: string | null;
  meta_description: string | null;

  sort_order: number;
  status: 'active' | 'archived';
  created_at: string;
  updated_at: string;
}

// ─── RESTAURANTS ─────────────────────────────────────────────────────────────

export type CuisineType = 'seafood' | 'american' | 'italian' | 'mexican' | 'asian' | 'bbq' | 'cafe' | 'bar' | 'fine_dining' | 'casual' | 'other';
export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export interface Restaurant {
  id: string;
  destination_id: string;
  town_id: string | null;
  name: string;
  slug: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  website: string | null;
  cuisine: CuisineType;
  price_range: PriceRange;

  // Accessibility
  ramp_entry: boolean | null;
  door_width_adequate: boolean | null;
  table_spacing_adequate: boolean | null;
  accessible_restroom: boolean | null;
  outdoor_seating: boolean | null;
  outdoor_seating_accessible: boolean | null;
  parking_accessible: boolean | null;
  accessibility_notes: string | null;
  accessibility_rating: number | null; // 1-5

  // Content
  description: string | null;
  tips: string | null;
  hero_image_url: string | null;

  // SEO
  meta_title: string | null;
  meta_description: string | null;

  status: 'active' | 'pending' | 'archived';
  created_at: string;
  updated_at: string;
}

// ─── REVIEWS ─────────────────────────────────────────────────────────────────

export type ReviewEntityType = 'property' | 'beach_access' | 'restaurant';
export type DisabilityType = 'wheelchair_manual' | 'wheelchair_power' | 'walker' | 'scooter' | 'visual' | 'hearing' | 'cognitive' | 'elderly_mobility' | 'temporary' | 'other';

export interface Review {
  id: string;
  entity_type: ReviewEntityType;
  entity_id: string;
  user_id: string;

  // Ratings
  overall_rating: number;          // 1-5
  accessibility_rating: number;    // 1-5
  accuracy_rating: number;         // 1-5 (did listing match reality?)

  // Content
  title: string | null;
  body: string;
  pros: string | null;
  cons: string | null;

  // Reviewer context
  disability_type: DisabilityType | null;
  traveling_with: string | null;   // "family", "caregiver", "solo"
  verified_stay: boolean;          // Did they actually book through us?
  stay_date: string | null;

  // Moderation
  status: 'published' | 'pending' | 'rejected';
  helpful_count: number;

  created_at: string;
  updated_at: string;
}

// ─── USERS ───────────────────────────────────────────────────────────────────

export type UserRole = 'traveler' | 'property_owner' | 'property_manager' | 'verifier' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: UserRole;

  // Disability profile (for personalized search)
  disability_type: DisabilityType | null;
  mobility_device: string | null;  // "manual_wheelchair", "power_wheelchair", "walker"
  accessibility_priorities: string[]; // ["roll_in_shower", "elevator", "pool_access"]

  // For property managers
  company_name: string | null;
  stripe_customer_id: string | null;
  stripe_connect_account_id: string | null;

  created_at: string;
  updated_at: string;
}

// ─── BOOKINGS (Phase 2+) ────────────────────────────────────────────────────

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';

export interface Booking {
  id: string;
  property_id: string;
  user_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  subtotal: number;                // Property rate
  service_fee: number;             // Our fee (8-12%)
  total: number;
  currency: string;                // "usd"
  stripe_payment_intent_id: string | null;
  stripe_transfer_id: string | null;
  status: BookingStatus;
  accessibility_guarantee: boolean; // Full refund if ARS doesn't match
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// ─── API KEYS (Phase 3+) ────────────────────────────────────────────────────

export interface ApiKey {
  id: string;
  organization_id: string;
  organization_name: string;
  key_hash: string;                // Never store plaintext
  name: string;                    // "Production", "Staging"
  scope: string[];                 // ["properties:read", "accessibility:read"]
  rate_limit: number;              // Requests per hour
  active: boolean;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
}

// ─── PROPERTY IMAGES ─────────────────────────────────────────────────────────

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  alt_text: string | null;
  caption: string | null;
  category: 'exterior' | 'interior' | 'bathroom' | 'bedroom' | 'kitchen' | 'pool' | 'beach' | 'accessibility' | 'other';
  sort_order: number;
  is_hero: boolean;
  created_at: string;
}

// ─── SEARCH / FILTER TYPES ──────────────────────────────────────────────────

export interface PropertySearchParams {
  destination_id?: string;
  town_id?: string;
  property_type?: PropertyType[];
  min_beds?: number;
  max_beds?: number;
  min_price?: number;
  max_price?: number;
  min_ars_score?: number;

  // Accessibility filters — the killer feature
  requires_zero_step_entry?: boolean;
  requires_roll_in_shower?: boolean;
  requires_elevator?: boolean;
  requires_pool_access?: boolean;
  requires_beach_wheelchair_nearby?: boolean;
  disability_type?: DisabilityType;

  // Pagination
  page?: number;
  limit?: number;
  sort_by?: 'ars_score' | 'price_min' | 'featured' | 'created_at';
  sort_order?: 'asc' | 'desc';
}
