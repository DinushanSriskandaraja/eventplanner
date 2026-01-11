-- ==========================================
-- REFACTOR SCHEMA SCRIPT (3NF Normalization & Optimization)
-- ==========================================
-- This script normalizes the database, removing array columns in favor of relational tables.
-- It also adds missing indexes for performance.

BEGIN;

-- 1. Create Lookup Tables (Master Data)
-- These tables store the canonical list of services and event types to avoid duplication/typos.

CREATE TABLE public.services (
  id text PRIMARY KEY,
  label text NOT NULL,
  description text,
  icon text
);
-- Enable RLS for services (public read)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT USING (true);


CREATE TABLE public.event_types (
  id text PRIMARY KEY,
  label text NOT NULL
);
-- Enable RLS for event_types (public read)
ALTER TABLE public.event_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Event types are viewable by everyone" ON public.event_types FOR SELECT USING (true);


-- 2. Rename 'name' to 'business_name' in providers for clarity
-- We handle potential existing column name to avoid errors if run multiple times
DO $$
BEGIN
  IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name = 'providers' AND column_name = 'name') THEN
      ALTER TABLE public.providers RENAME COLUMN name TO business_name;
  END IF;
END $$;


-- 3. Update Trigger Function to use 'business_name'
-- CRITICAL: Since we renamed the column, we must update the trigger function immediately to prevent errors.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_full_name text;
  v_role user_role;
BEGIN
  -- Extract metadata with safe fallbacks
  v_full_name := new.raw_user_meta_data->>'full_name';
  -- Default to 'user' if role is missing or invalid
  v_role := COALESCE((new.raw_user_meta_data->>'role')::user_role, 'user'::user_role);

  -- Insert into profiles
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    v_full_name,
    v_role
  );

  -- If the user is a provider, initialize their provider profile
  IF (v_role = 'provider') THEN
      INSERT INTO public.providers (id, business_name, is_verified)
      VALUES (
        new.id, 
        COALESCE(v_full_name, 'New Provider'), 
        false
      );
  END IF;

  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to create user profile: %', SQLERRM;
END;
$$;


-- 4. Create Junction Tables (Many-to-Many Relationships)
-- These connect providers to services and event types efficiently.

CREATE TABLE public.provider_services (
  provider_id uuid REFERENCES public.providers(id) ON DELETE CASCADE,
  service_id text REFERENCES public.services(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (provider_id, service_id)
);
-- Enable RLS
ALTER TABLE public.provider_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Provider services are viewable by everyone" ON public.provider_services FOR SELECT USING (true);
CREATE POLICY "Providers can manage own services" ON public.provider_services FOR ALL USING (auth.uid() = provider_id);


CREATE TABLE public.provider_event_types (
  provider_id uuid REFERENCES public.providers(id) ON DELETE CASCADE,
  event_type_id text REFERENCES public.event_types(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (provider_id, event_type_id)
);
-- Enable RLS
ALTER TABLE public.provider_event_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Provider event types are viewable by everyone" ON public.provider_event_types FOR SELECT USING (true);
CREATE POLICY "Providers can manage own event types" ON public.provider_event_types FOR ALL USING (auth.uid() = provider_id);


-- 5. Migrate Data (If array columns exist) & Drop old columns
-- This block attempts to extract existing array data into the new tables before dropping columns.

DO $$ 
DECLARE
    r RECORD;
    s text;
    e text;
BEGIN
    -- Check if 'services' column exists in providers
    IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name = 'providers' AND column_name = 'services') THEN
        -- Insert unique services found in providers into master table (minimal seed)
        INSERT INTO public.services (id, label)
        SELECT DISTINCT unnest(services), INITCAP(unnest(services)) FROM public.providers
        ON CONFLICT (id) DO NOTHING;

        -- Link providers to services
        FOR r IN SELECT id, services FROM public.providers WHERE services IS NOT NULL LOOP
            FOREACH s IN ARRAY r.services LOOP
                INSERT INTO public.provider_services (provider_id, service_id) VALUES (r.id, s) ON CONFLICT DO NOTHING;
            END LOOP;
        END LOOP;
        
        -- Drop the old column
        ALTER TABLE public.providers DROP COLUMN services;
    END IF;

    -- Check if 'event_types' column exists in providers
    IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name = 'providers' AND column_name = 'event_types') THEN
        -- Insert unique event types
        INSERT INTO public.event_types (id, label)
        SELECT DISTINCT unnest(event_types), INITCAP(unnest(event_types)) FROM public.providers
        ON CONFLICT (id) DO NOTHING;

        -- Link providers to event types
        FOR r IN SELECT id, event_types FROM public.providers WHERE event_types IS NOT NULL LOOP
            FOREACH e IN ARRAY r.event_types LOOP
                INSERT INTO public.provider_event_types (provider_id, event_type_id) VALUES (r.id, e) ON CONFLICT DO NOTHING;
            END LOOP;
        END LOOP;

        -- Drop the old column
        ALTER TABLE public.providers DROP COLUMN event_types;
    END IF;
END $$;


-- 6. Add Performance Indexes
-- Indexes speed up common lookups. Postgres does NOT index Foreign Keys by default.
-- We use DO blocks to safely create indexes only if the tables exist (handling cases where optional tables are missing).

DO $$
BEGIN
    -- Provider Searches
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'providers') THEN
        CREATE INDEX IF NOT EXISTS idx_providers_location ON public.providers(location);
        CREATE INDEX IF NOT EXISTS idx_providers_category ON public.providers(category);
        CREATE INDEX IF NOT EXISTS idx_providers_rating ON public.providers(rating DESC);
        CREATE INDEX IF NOT EXISTS idx_providers_price ON public.providers(starting_price);
    END IF;

    -- Enquiries Dashboard
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'enquiries') THEN
        CREATE INDEX IF NOT EXISTS idx_enquiries_provider_status ON public.enquiries(provider_id, status);
        CREATE INDEX IF NOT EXISTS idx_enquiries_user_id ON public.enquiries(user_id);
    END IF;

    -- Foreign Keys
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'portfolio_items') THEN
        CREATE INDEX IF NOT EXISTS idx_portfolio_provider_id ON public.portfolio_items(provider_id);
    END IF;

    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'provider_packages') THEN
        CREATE INDEX IF NOT EXISTS idx_packages_provider_id ON public.provider_packages(provider_id);
    END IF;
END $$;


COMMIT;
