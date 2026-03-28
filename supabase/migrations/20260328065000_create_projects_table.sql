-- Projects table
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  location text NOT NULL,
  size text NOT NULL,
  status text NOT NULL DEFAULT 'coming-soon',
  tag text,
  image_url text,
  description text NOT NULL,
  overview text,
  connectivity text,
  pricing text,
  layout_features jsonb,
  documentation jsonb,
  images jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are viewable by everyone" ON public.projects FOR SELECT USING (true);

-- Seed projects
INSERT INTO public.projects (slug, name, location, size, status, tag, image_url, description, overview, connectivity, pricing, layout_features, documentation, images) VALUES
(
  'srikakulam-greens',
  'Srikakulam Greens',
  'Srikakulam District, Andhra Pradesh',
  '200 – 500 sq. yards',
  'open',
  'Featured',
  '/project-farm.jpg',
  'A structured farmland project with Red Sandalwood plantation integration, located in a growing agricultural corridor.',
  'Srikakulam Greens is a structured farmland development located in the agricultural belt of Srikakulam District, Andhra Pradesh. The project features organized plots, internal roads, and a Red Sandalwood plantation integrated as a long-term land-use component.',
  'Located near the NH-16 corridor with access to Srikakulam town within 20 km. Regional infrastructure development ongoing. Nearest railway station: Naupada Junction.',
  'Pricing is available on request and varies by plot size and location within the project. All pricing is transparent and documented before any agreement.',
  '["Defined plots with clear boundaries", "Internal access roads", "Plantation zones mapped", "Compound wall / fencing plan", "Drainage provisions"]'::jsonb,
  '["Sale Agreement", "Land Patta / Title Documents", "Plantation Permits", "Layout Plan", "Survey Map"]'::jsonb,
  '["project-farm.jpg", "hero-forest.jpg", "project-farm.jpg"]'::jsonb
),
(
  'vizag-valley',
  'Vizag Valley Estate',
  'Visakhapatnam Outskirts, AP',
  '300 – 600 sq. yards',
  'limited',
  'Limited Availability',
  '/hero-forest.jpg',
  'Premium plots near developing infrastructure zones with full plantation planning and clear documentation.',
  'Vizag Valley Estate is a premium structured farmland project on the outskirts of Visakhapatnam. Designed for buyers who value location, connectivity, and long-term land holding.',
  'Located 30 km from Visakhapatnam city on a developing growth corridor. Highway access within 5 km.',
  'Pricing is disclosed after initial discussion and site visit. Limited plots available.',
  '["Defined plots with clear boundaries", "Internal access roads", "Plantation zones mapped", "Compound wall / fencing plan", "Drainage provisions"]'::jsonb,
  '["Sale Agreement", "Land Patta / Title Documents", "Plantation Permits", "Layout Plan", "Survey Map"]'::jsonb,
  '["hero-forest.jpg", "project-farm.jpg", "hero-forest.jpg"]'::jsonb
),
(
  'kadapa-farmlands',
  'Kadapa Farmlands',
  'Kadapa District, AP',
  '250 – 800 sq. yards',
  'coming-soon',
  'Pre-Launch',
  '/project-farm.jpg',
  'An upcoming structured project in one of Andhra Pradesh''s most fertile agricultural belts.',
  'Kadapa Farmlands is an upcoming project in one of Andhra Pradesh''s most fertile agricultural corridors. Pre-registration is open for interested buyers.',
  'Located in Kadapa District with road connectivity and proximity to developing industrial zones. Full details available soon.',
  'Pre-launch pricing available to registered interest holders only.',
  '["Defined plots with clear boundaries", "Internal access roads", "Plantation zones mapped", "Compound wall / fencing plan", "Drainage provisions"]'::jsonb,
  '["Sale Agreement", "Land Patta / Title Documents", "Plantation Permits", "Layout Plan", "Survey Map"]'::jsonb,
  '["project-farm.jpg", "hero-forest.jpg", "project-farm.jpg"]'::jsonb
);
