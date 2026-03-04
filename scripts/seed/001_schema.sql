-- =============================================================================
-- Accessible 30A — Database Schema
-- Supabase (PostgreSQL) — Scale-ready from day one
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";          -- For geo queries at scale

-- ─── ENUMS ───────────────────────────────────────────────────────────────────

CREATE TYPE property_type AS ENUM ('house', 'condo', 'villa', 'resort', 'cabin', 'cottage', 'bnb');
CREATE TYPE property_status AS ENUM ('active', 'pending_verification', 'unverified', 'archived');
CREATE TYPE listing_source AS ENUM ('manual', 'vrbo_scrape', 'airbnb_scrape', 'pm_submission', 'community_tip');
CREATE TYPE ars_category AS ENUM ('entry', 'bathroom', 'bedroom', 'kitchen', 'outdoor', 'location');
CREATE TYPE cuisine_type AS ENUM ('seafood', 'american', 'italian', 'mexican', 'asian', 'bbq', 'cafe', 'bar', 'fine_dining', 'casual', 'other');
CREATE TYPE price_range AS ENUM ('$', '$$', '$$$', '$$$$');
CREATE TYPE review_entity_type AS ENUM ('property', 'beach_access', 'restaurant');
CREATE TYPE disability_type AS ENUM ('wheelchair_manual', 'wheelchair_power', 'walker', 'scooter', 'visual', 'hearing', 'cognitive', 'elderly_mobility', 'temporary', 'other');
CREATE TYPE user_role AS ENUM ('traveler', 'property_owner', 'property_manager', 'verifier', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed', 'refunded');

-- ─── DESTINATIONS ────────────────────────────────────────────────────────────

CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  region TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'US',
  description TEXT NOT NULL DEFAULT '',
  hero_image_url TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  location GEOGRAPHY(POINT, 4326),  -- PostGIS point for geo queries
  timezone TEXT NOT NULL DEFAULT 'America/Chicago',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── TOWNS ───────────────────────────────────────────────────────────────────

CREATE TABLE towns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  hero_image_url TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  sort_order INTEGER NOT NULL DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(destination_id, slug)
);

-- ─── USERS ───────────────────────────────────────────────────────────────────

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE,              -- Links to Supabase Auth
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'traveler',
  disability_type disability_type,
  mobility_device TEXT,
  accessibility_priorities JSONB DEFAULT '[]'::jsonb,
  company_name TEXT,
  stripe_customer_id TEXT,
  stripe_connect_account_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── PROPERTIES ──────────────────────────────────────────────────────────────

CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  town_id UUID REFERENCES towns(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  property_type property_type NOT NULL DEFAULT 'house',
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'US',
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  location GEOGRAPHY(POINT, 4326),

  -- Basics
  bedrooms INTEGER,
  bathrooms INTEGER,
  sleeps INTEGER,
  sqft INTEGER,
  description TEXT NOT NULL DEFAULT '',

  -- ARS Scores (computed from property_accessibility data)
  ars_score INTEGER,                -- 1-100
  ars_entry_score INTEGER,
  ars_bathroom_score INTEGER,
  ars_bedroom_score INTEGER,
  ars_kitchen_score INTEGER,
  ars_outdoor_score INTEGER,
  ars_location_score INTEGER,
  ars_verified_at TIMESTAMPTZ,
  ars_verified_by UUID REFERENCES users(id),

  -- Booking & Monetization
  booking_url TEXT,
  vrbo_url TEXT,
  airbnb_url TEXT,
  affiliate_url TEXT,
  stripe_account_id TEXT,
  price_min INTEGER,                -- In cents (USD)
  price_max INTEGER,

  -- Management
  owner_id UUID REFERENCES users(id),
  manager_id UUID REFERENCES users(id),
  manager_company TEXT,
  listing_source listing_source NOT NULL DEFAULT 'manual',
  source_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  flagship BOOLEAN NOT NULL DEFAULT FALSE,

  -- Media
  hero_image_url TEXT,
  video_walkthrough_url TEXT,
  video_transcript TEXT,

  -- SEO
  meta_title TEXT,
  meta_description TEXT,

  status property_status NOT NULL DEFAULT 'unverified',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(destination_id, slug)
);

-- ─── PROPERTY ACCESSIBILITY (ARS Data) ──────────────────────────────────────
-- This is the core IP. One row per accessibility data point per property.

CREATE TABLE property_accessibility (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  category ars_category NOT NULL,
  attribute TEXT NOT NULL,          -- "door_width_front", "shower_type"
  value TEXT NOT NULL,              -- "36", "roll_in"
  unit TEXT,                        -- "inches", null for enums
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES users(id),
  photo_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(property_id, category, attribute)
);

-- ─── PROPERTY IMAGES ─────────────────────────────────────────────────────────

CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  category TEXT NOT NULL DEFAULT 'other',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_hero BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── BEACH ACCESSES ──────────────────────────────────────────────────────────

CREATE TABLE beach_accesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  town_id UUID REFERENCES towns(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  location GEOGRAPHY(POINT, 4326),

  -- Accessibility
  ada_ramp BOOLEAN NOT NULL DEFAULT FALSE,
  ramp_description TEXT,
  beach_wheelchair BOOLEAN NOT NULL DEFAULT FALSE,
  beach_wheelchair_details TEXT,
  mobi_mat BOOLEAN NOT NULL DEFAULT FALSE,
  mobi_mat_details TEXT,
  accessible_restroom BOOLEAN NOT NULL DEFAULT FALSE,
  accessible_parking BOOLEAN NOT NULL DEFAULT FALSE,
  parking_spots INTEGER,
  lifeguard BOOLEAN NOT NULL DEFAULT FALSE,
  lifeguard_season TEXT,

  -- Content
  description TEXT NOT NULL DEFAULT '',
  tips TEXT,
  hero_image_url TEXT,
  video_url TEXT,
  video_transcript TEXT,

  -- Ratings (computed from reviews)
  overall_rating NUMERIC(3,2),
  accessibility_rating NUMERIC(3,2),

  -- SEO
  meta_title TEXT,
  meta_description TEXT,

  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(destination_id, slug)
);

-- ─── RESTAURANTS ─────────────────────────────────────────────────────────────

CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  town_id UUID REFERENCES towns(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  phone TEXT,
  website TEXT,
  cuisine cuisine_type NOT NULL DEFAULT 'other',
  price_range price_range NOT NULL DEFAULT '$$',

  -- Accessibility
  ramp_entry BOOLEAN,
  door_width_adequate BOOLEAN,
  table_spacing_adequate BOOLEAN,
  accessible_restroom BOOLEAN,
  outdoor_seating BOOLEAN,
  outdoor_seating_accessible BOOLEAN,
  parking_accessible BOOLEAN,
  accessibility_notes TEXT,
  accessibility_rating NUMERIC(3,2),

  -- Content
  description TEXT,
  tips TEXT,
  hero_image_url TEXT,

  -- SEO
  meta_title TEXT,
  meta_description TEXT,

  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(destination_id, slug)
);

-- ─── REVIEWS ─────────────────────────────────────────────────────────────────

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type review_entity_type NOT NULL,
  entity_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
  accessibility_rating INTEGER NOT NULL CHECK (accessibility_rating BETWEEN 1 AND 5),
  accuracy_rating INTEGER NOT NULL CHECK (accuracy_rating BETWEEN 1 AND 5),
  title TEXT,
  body TEXT NOT NULL,
  pros TEXT,
  cons TEXT,
  disability_type disability_type,
  traveling_with TEXT,
  verified_stay BOOLEAN NOT NULL DEFAULT FALSE,
  stay_date DATE,
  status TEXT NOT NULL DEFAULT 'pending',
  helpful_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── BOOKINGS (Phase 2+) ────────────────────────────────────────────────────

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id),
  user_id UUID NOT NULL REFERENCES users(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  subtotal INTEGER NOT NULL,        -- Cents
  service_fee INTEGER NOT NULL,     -- Cents
  total INTEGER NOT NULL,           -- Cents
  currency TEXT NOT NULL DEFAULT 'usd',
  stripe_payment_intent_id TEXT,
  stripe_transfer_id TEXT,
  status booking_status NOT NULL DEFAULT 'pending',
  accessibility_guarantee BOOLEAN NOT NULL DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── API KEYS (Phase 3+) ────────────────────────────────────────────────────

CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL,
  organization_name TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  scope JSONB NOT NULL DEFAULT '["properties:read"]'::jsonb,
  rate_limit INTEGER NOT NULL DEFAULT 1000,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── SAVED PROPERTIES (Wishlists) ───────────────────────────────────────────

CREATE TABLE saved_properties (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, property_id)
);

-- ─── INDEXES ─────────────────────────────────────────────────────────────────

-- Properties
CREATE INDEX idx_properties_destination ON properties(destination_id);
CREATE INDEX idx_properties_town ON properties(town_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_ars_score ON properties(ars_score DESC) WHERE ars_score IS NOT NULL;
CREATE INDEX idx_properties_featured ON properties(featured) WHERE featured = TRUE;
CREATE INDEX idx_properties_flagship ON properties(flagship) WHERE flagship = TRUE;
CREATE INDEX idx_properties_location ON properties USING GIST(location);
CREATE INDEX idx_properties_slug ON properties(slug);
CREATE INDEX idx_properties_type ON properties(property_type);

-- Property Accessibility (critical for filtering)
CREATE INDEX idx_pa_property ON property_accessibility(property_id);
CREATE INDEX idx_pa_category ON property_accessibility(category);
CREATE INDEX idx_pa_attribute ON property_accessibility(attribute);
CREATE INDEX idx_pa_attribute_value ON property_accessibility(attribute, value);

-- Beach Accesses
CREATE INDEX idx_beach_destination ON beach_accesses(destination_id);
CREATE INDEX idx_beach_location ON beach_accesses USING GIST(location);

-- Restaurants
CREATE INDEX idx_restaurants_destination ON restaurants(destination_id);
CREATE INDEX idx_restaurants_location ON restaurants USING GIST(location);
CREATE INDEX idx_restaurants_cuisine ON restaurants(cuisine);

-- Reviews
CREATE INDEX idx_reviews_entity ON reviews(entity_type, entity_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_status ON reviews(status);

-- Towns
CREATE INDEX idx_towns_destination ON towns(destination_id);

-- ─── AUTO-UPDATE TIMESTAMPS ──────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_destinations_updated BEFORE UPDATE ON destinations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_towns_updated BEFORE UPDATE ON towns FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_properties_updated BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_pa_updated BEFORE UPDATE ON property_accessibility FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_beach_updated BEFORE UPDATE ON beach_accesses FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_restaurants_updated BEFORE UPDATE ON restaurants FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_reviews_updated BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_bookings_updated BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── AUTO-COMPUTE PostGIS LOCATION ──────────────────────────────────────────

CREATE OR REPLACE FUNCTION compute_location()
RETURNS TRIGGER AS $$
BEGIN
  NEW.location = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326)::geography;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_destinations_location BEFORE INSERT OR UPDATE OF latitude, longitude ON destinations FOR EACH ROW EXECUTE FUNCTION compute_location();
CREATE TRIGGER trg_towns_location BEFORE INSERT OR UPDATE OF latitude, longitude ON towns FOR EACH ROW EXECUTE FUNCTION compute_location();
CREATE TRIGGER trg_properties_location BEFORE INSERT OR UPDATE OF latitude, longitude ON properties FOR EACH ROW EXECUTE FUNCTION compute_location();
CREATE TRIGGER trg_beach_location BEFORE INSERT OR UPDATE OF latitude, longitude ON beach_accesses FOR EACH ROW EXECUTE FUNCTION compute_location();
CREATE TRIGGER trg_restaurants_location BEFORE INSERT OR UPDATE OF latitude, longitude ON restaurants FOR EACH ROW EXECUTE FUNCTION compute_location();

-- ─── ROW LEVEL SECURITY ─────────────────────────────────────────────────────

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_accessibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE beach_accesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;

-- Public read for active listings
CREATE POLICY "Public read properties" ON properties FOR SELECT USING (status = 'active');
CREATE POLICY "Public read accessibility" ON property_accessibility FOR SELECT USING (TRUE);
CREATE POLICY "Public read beach" ON beach_accesses FOR SELECT USING (status = 'active');
CREATE POLICY "Public read restaurants" ON restaurants FOR SELECT USING (status = 'active');
CREATE POLICY "Public read published reviews" ON reviews FOR SELECT USING (status = 'published');
CREATE POLICY "Public read images" ON property_images FOR SELECT USING (TRUE);

-- Users can read their own data
CREATE POLICY "Users read own" ON users FOR SELECT USING (auth.uid() = auth_id);
CREATE POLICY "Users update own" ON users FOR UPDATE USING (auth.uid() = auth_id);

-- Users can manage their own reviews
CREATE POLICY "Users create reviews" ON reviews FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own reviews" ON reviews FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Users can manage saved properties
CREATE POLICY "Users manage saves" ON saved_properties FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Users can view their own bookings
CREATE POLICY "Users read own bookings" ON bookings FOR SELECT USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Admin full access (use service_role key for admin operations)
-- Managed through Supabase service_role key, no RLS policy needed
