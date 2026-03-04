-- =============================================================================
-- Accessible 30A — Seed Data for 30A
-- Run after schema migration
-- =============================================================================

-- ─── DESTINATION ─────────────────────────────────────────────────────────────

INSERT INTO destinations (id, name, slug, region, country, description, latitude, longitude, timezone, status)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Highway 30A',
  '30a',
  'Florida Panhandle',
  'US',
  'A 24-mile stretch of scenic highway along Florida''s Emerald Coast, connecting 15 distinctive beach communities. Known for sugar-white sand beaches, coastal dune lakes, and laid-back luxury — 30A is one of the Southeast''s premier vacation destinations.',
  30.3200,
  -86.1500,
  'America/Chicago',
  'active'
);

-- ─── TOWNS (West to East) ────────────────────────────────────────────────────

INSERT INTO towns (destination_id, name, slug, latitude, longitude, sort_order, description) VALUES
('00000000-0000-0000-0000-000000000001', 'Miramar Beach', 'miramar-beach', 30.3782, -86.3875, 1, 'The western gateway to 30A, Miramar Beach offers high-energy beach life with easy access to Destin dining and shopping.'),
('00000000-0000-0000-0000-000000000001', 'Sandestin', 'sandestin', 30.3700, -86.3300, 2, 'A sprawling resort community with golf courses, the Village of Baytowne Wharf, and multiple accessible lodging options.'),
('00000000-0000-0000-0000-000000000001', 'Dune Allen', 'dune-allen', 30.3570, -86.2700, 3, 'A quiet, nature-focused community defined by coastal dune lakes and a relaxed pace. Home to Stinky''s Fish Camp.'),
('00000000-0000-0000-0000-000000000001', 'Santa Rosa Beach', 'santa-rosa-beach', 30.3450, -86.2300, 4, 'The largest community along 30A, Santa Rosa Beach encompasses Gulf Place and serves as the area''s commercial hub.'),
('00000000-0000-0000-0000-000000000001', 'Blue Mountain Beach', 'blue-mountain-beach', 30.3400, -86.2000, 5, 'Named for its blue lupine wildflowers, this small community sits at the highest elevation point on the Gulf of Mexico.'),
('00000000-0000-0000-0000-000000000001', 'Grayton Beach', 'grayton-beach', 30.3350, -86.1800, 6, 'One of 30A''s oldest communities with an artsy, bohemian vibe. Home to the legendary Red Bar and Grayton Beach State Park.'),
('00000000-0000-0000-0000-000000000001', 'WaterColor', 'watercolor', 30.3300, -86.1500, 7, 'A master-planned community with resort amenities, multiple pools, and a beachfront hotel. Known for its distinctive pastel architecture.'),
('00000000-0000-0000-0000-000000000001', 'Seaside', 'seaside', 30.3200, -86.1400, 8, 'The iconic New Urbanism town that put 30A on the map. Featured in The Truman Show. Central amphitheater, shops, and restaurants.'),
('00000000-0000-0000-0000-000000000001', 'Seagrove Beach', 'seagrove-beach', 30.3150, -86.1200, 9, 'A laid-back, mostly residential beach community with old Florida charm. Less commercial, more authentic.'),
('00000000-0000-0000-0000-000000000001', 'WaterSound', 'watersound', 30.3000, -86.0700, 10, 'An exclusive, gated community with nature trails, private beach access, and high-end vacation homes.'),
('00000000-0000-0000-0000-000000000001', 'Seacrest Beach', 'seacrest-beach', 30.2900, -86.0500, 11, 'Known for its lagoon-style pool and proximity to Rosemary Beach. Family-friendly with a growing restaurant scene.'),
('00000000-0000-0000-0000-000000000001', 'Alys Beach', 'alys-beach', 30.2800, -86.0400, 12, 'A striking white-walled community inspired by Bermuda and Guatemalan architecture. Upscale dining and the iconic Caliza Pool.'),
('00000000-0000-0000-0000-000000000001', 'Rosemary Beach', 'rosemary-beach', 30.2750, -86.0300, 13, 'One of the most refined communities on 30A with European-inspired architecture, boutique shopping, and fine dining.'),
('00000000-0000-0000-0000-000000000001', 'Inlet Beach', 'inlet-beach', 30.2700, -86.0100, 14, 'The eastern bookend of 30A. Less developed, more private beaches, and close to 30Avenue shopping and dining.'),
('00000000-0000-0000-0000-000000000001', 'Seascape', 'seascape', 30.3750, -86.3500, 15, 'A resort community adjacent to Miramar Beach with golf, tennis, and family-oriented vacation rentals.');

-- ─── BEACH ACCESSES ──────────────────────────────────────────────────────────

INSERT INTO beach_accesses (destination_id, name, slug, address, latitude, longitude, ada_ramp, beach_wheelchair, beach_wheelchair_details, mobi_mat, mobi_mat_details, accessible_restroom, accessible_parking, parking_spots, lifeguard, lifeguard_season, description, sort_order) VALUES
('00000000-0000-0000-0000-000000000001', 'Miramar Beach Regional Access', 'miramar-beach-regional', '2375 Scenic Gulf Dr, Miramar Beach, FL 32550', 30.3782, -86.3875, TRUE, TRUE, 'Located at Lifeguard Tower 54 near Pompano Joe''s. Free, first-come first-served.', FALSE, NULL, TRUE, TRUE, 110, TRUE, 'March 1 - Oct 31', 'The largest and most active beach access on 30A. Located next to Pompano Joe''s with a paved coastal path perfect for wheelchairs. Parasailing, jet ski, and paddleboard rentals dot the shore. Wide, paved path connects to shops and cafes along Scenic Gulf Drive.', 1),

('00000000-0000-0000-0000-000000000001', 'Dune Allen Regional Access', 'dune-allen-regional', '5999 W Scenic Hwy 30A, Santa Rosa Beach, FL 32459', 30.3570, -86.2700, TRUE, TRUE, 'Available during lifeguard season. Free.', FALSE, NULL, TRUE, TRUE, 23, TRUE, 'March 1 - Oct 31', 'A quiet, peaceful access across from Stinky''s Fish Camp. The ramp gently drops you just a couple dozen feet from the Gulf waters. More nature than people — great for spotting blue herons. Modern bathroom pavilion with outdoor showers and bike parking.', 2),

('00000000-0000-0000-0000-000000000001', 'Fort Panic Regional Access', 'fort-panic-regional', '5753 W Scenic Hwy 30A, Santa Rosa Beach, FL 32459', 30.3527, -86.2513, TRUE, FALSE, NULL, FALSE, NULL, TRUE, TRUE, 34, TRUE, 'March 1 - Oct 31', 'More room to spread out than some other access points. Ramp access to the beach. Beautiful views of sea oats along the boardwalk.', 3),

('00000000-0000-0000-0000-000000000001', 'Ed Walline Regional Beach Access', 'ed-walline-regional', 'Near Gulf Place, Santa Rosa Beach, FL 32459', 30.3450, -86.2300, TRUE, TRUE, 'Tower 9. Free, first-come first-served. Available 10:30 AM - 5:30 PM during season.', TRUE, 'Blue Mobi Mat extends across the sand allowing standard wheelchairs to reach near the shoreline.', TRUE, TRUE, NULL, TRUE, 'March 1 - Oct 31', 'The best overall accessible beach access on 30A. The only access with a Mobi Mat for standard wheelchairs plus free beach wheelchairs. Located near Gulf Place with restaurants, shops, and the 30A bike trail steps away. A shaded picnic pavilion overlooks the Gulf. Next to Shunk Gulley Oyster Bar and Growler Garage.', 4),

('00000000-0000-0000-0000-000000000001', 'Van Ness Butler Jr Regional Access', 'van-ness-butler-regional', 'Between Seaside & WaterColor, Santa Rosa Beach, FL 32459', 30.3300, -86.1500, TRUE, TRUE, 'Tower 5. Free, first-come first-served.', FALSE, NULL, TRUE, TRUE, 39, TRUE, 'March 1 - Oct 31', 'Right in the heart of 30A between Seaside and WaterColor. A grand, wide zigzag ramp descends to the beach with stunning sunset views at every turn. Phenomenal parking and close to some of the finest dining on 30A. Hundreds of shady, tree-lined streets and forest paths to explore nearby.', 5),

('00000000-0000-0000-0000-000000000001', 'Santa Clara Regional Beach Access', 'santa-clara-regional', '3468 E Scenic Hwy 30A, Santa Rosa Beach, FL 32459', 30.3136, -86.1193, TRUE, TRUE, 'Tower 4 "Bramble Grove". Free, first-come first-served.', FALSE, NULL, TRUE, TRUE, NULL, TRUE, 'March 1 - Oct 31', 'In the heart of Seagrove Beach with a long, switchback boardwalk ramp that provides elevated views of the Gulf. One of the easiest pathways to the beach. Shaded benches near the multi-stall bathrooms. Parking on both sides of Scenic Highway 30A.', 6),

('00000000-0000-0000-0000-000000000001', 'Inlet Beach Regional Access', 'inlet-beach-regional', '438 S Orange St, Panama City Beach, FL 32413', 30.2740, -86.0039, TRUE, TRUE, 'Tower 1. Free, first-come first-served. Center walk only is ADA accessible.', FALSE, NULL, TRUE, TRUE, 40, TRUE, 'March 1 - Oct 31', 'The most private and remote accessible beach access on 30A. Three access points — the center walk has a ramp to the beach. Wide, uncrowded shoreline with views stretching to Miramar Beach to the west and Panama City Beach to the east. A great gateway if staying on the eastern end of 30A.', 7);

-- ─── FLAGSHIP PROPERTY: SLIM SHADY ──────────────────────────────────────────

INSERT INTO properties (
  destination_id, name, slug, property_type, address, city, state, zip, country,
  latitude, longitude, bedrooms, bathrooms, sleeps, description,
  booking_url, listing_source, featured, flagship, status, manager_company,
  meta_title, meta_description
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Slim Shady Beach House',
  'slim-shady-beach-house',
  'house',
  '172 Shady Pines Drive',
  'Santa Rosa Beach',
  'FL',
  '32459',
  'US',
  30.3150,
  -86.1200,
  4, 4, 10,
  'Purpose-built for wheelchair accessibility after 15 years of searching for a truly accessible 30A rental. Slim Shady Beach House features zero-step entry throughout, roll-in showers with grab bars, a heated plunge pool with ramp access, and a complimentary beach wheelchair. Located in Seagrove Beach with easy access to Santa Clara Regional Beach Access.',
  'https://oversee.us/vrp/unit/Slim_Shady-297-15',
  'manual',
  TRUE, TRUE, 'active',
  'Oversee',
  'Slim Shady Beach House — Wheelchair Accessible 30A Vacation Rental | Seagrove Beach',
  'Purpose-built accessible beach house on 30A. Zero-step entry, roll-in showers, heated pool with ramp, beach wheelchair included. 4 bed/4 bath in Seagrove Beach.'
);

-- Get the Slim Shady property ID for accessibility data
-- Using a known slug to reference

INSERT INTO property_accessibility (property_id, category, attribute, value, unit, verified, notes) VALUES
-- Entry
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'entry', 'zero_step_entry', 'true', NULL, TRUE, 'No steps in the entire home'),
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'entry', 'ramp_available', 'true', NULL, TRUE, 'Ramp access behind pool to boardwalk to driveway'),
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'entry', 'flooring_type', 'hard_surface', NULL, TRUE, 'Hard surface throughout for easy wheelchair navigation'),
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'entry', 'front_door_width', '36', 'inches', TRUE, 'Wide doorways throughout'),
-- Bathroom
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'bathroom', 'shower_type', 'roll_in', NULL, TRUE, 'Zero-entry roll-in shower'),
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'bathroom', 'shower_grab_bars', 'true', NULL, TRUE, 'Grab bars installed'),
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'bathroom', 'shower_bench', 'true', NULL, TRUE, 'Bench for extended sitting and relaxing'),
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'bathroom', 'sink_under_clearance', 'true', NULL, TRUE, 'Roll-under sinks'),
-- Outdoor
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'outdoor', 'pool_access_type', 'ramp', NULL, TRUE, 'Heated plunge pool with low-profile steps and ramp access behind pool'),
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'outdoor', 'pool_depth', '4', 'feet', TRUE, '4 feet depth'),
-- Location
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'location', 'nearest_beach_access_name', 'Santa Clara Regional Beach Access', NULL, TRUE, NULL),
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'location', 'nearest_beach_access_ada', 'true', NULL, TRUE, 'ADA ramp, beach wheelchair, lifeguard'),
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'location', 'nearest_beach_wheelchair', 'true', NULL, TRUE, 'Free beach wheelchair at lifeguard station'),
((SELECT id FROM properties WHERE slug = 'slim-shady-beach-house'), 'location', 'neighborhood_terrain', 'flat', NULL, TRUE, 'Flat terrain, easy for wheelchair navigation');

-- ─── ADDITIONAL PROPERTIES (Unverified, from research) ──────────────────────

INSERT INTO properties (destination_id, name, slug, property_type, address, city, state, zip, country, latitude, longitude, bedrooms, bathrooms, sleeps, description, booking_url, listing_source, source_url, status, meta_title, meta_description) VALUES

('00000000-0000-0000-0000-000000000001', 'Latitudes & Attitudes', 'latitudes-and-attitudes', 'house', 'Inlet Beach', 'Inlet Beach', 'FL', '32413', 'US', 30.2740, -86.0039, 7, 5, 20, 'One of only a few vacation homes in Inlet Beach offering handicap-friendly features including an elevator from ground level to fourth floor, a roll-in shower with bench, wide doorways, and proximity to Inlet Beach Regional Access.', 'https://www.endlesssummeron30a.com/vacation-rental-home.asp?PageDataID=161674', 'manual', 'https://latitudesandattitudeson30a.com/', 'unverified', 'Latitudes & Attitudes — Accessible Beach House in Inlet Beach, 30A', 'Elevator, roll-in shower, wide doorways. 7 bed/5 bath accessible vacation rental in Inlet Beach near beach access with wheelchair ramp.'),

('00000000-0000-0000-0000-000000000001', 'WaterColor Inn & Resort', 'watercolor-inn-resort', 'resort', '34 Goldenrod Circle', 'Santa Rosa Beach', 'FL', '32459', 'US', 30.3300, -86.1500, NULL, NULL, NULL, 'WaterColor Inn & Resort offers accessible rooms on every floor with a large elevator. Beach wheelchair ramp available to the public within walking distance.', NULL, 'manual', 'https://emeraldcoastaccessible.com/lodging-30A.html', 'unverified', 'WaterColor Inn & Resort — Accessible Hotel on 30A', 'Accessible rooms on every floor with elevator. Near public beach wheelchair ramp. WaterColor, FL.'),

('00000000-0000-0000-0000-000000000001', 'High Pointe Resort', 'high-pointe-resort', 'resort', '10254 E County Hwy 30A', 'Seacrest Beach', 'FL', '32461', 'US', 30.2900, -86.0500, NULL, NULL, NULL, 'Family-friendly beachfront condo on 30A with accessible guestrooms, van parking, and accessible pool.', NULL, 'manual', 'https://emeraldcoastaccessible.com/lodging-30A.html', 'unverified', 'High Pointe Resort — Accessible Beachfront Condo on 30A', 'Accessible guestrooms, van parking, accessible pool. Beachfront condo in Seacrest Beach on 30A.'),

('00000000-0000-0000-0000-000000000001', 'Coastal Joy on 30A', 'coastal-joy-30a', 'house', 'Highland Park, Blue Mountain Beach', 'Santa Rosa Beach', 'FL', '32459', 'US', 30.3400, -86.2000, 5, 5, NULL, 'Gorgeous 5BR/4.5BA home in the Highland Park community of Blue Mountain Beach, just off Highway 30A. Listed as accessible by Emerald Coast Accessible.', NULL, 'manual', 'https://emeraldcoastaccessible.com/lodging-30A.html', 'unverified', 'Coastal Joy — Accessible 30A Vacation Home in Blue Mountain Beach', '5 bed/4.5 bath accessible home in Highland Park, Blue Mountain Beach on 30A.');

-- ─── ADMIN USER (Ken) ────────────────────────────────────────────────────────

INSERT INTO users (email, name, role, company_name)
VALUES ('swright10@gmail.com', 'Ken Wright', 'admin', 'Accessible 30A');
