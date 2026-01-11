-- Add missing columns to providers table
-- These columns are referenced in the application code but may be missing from the initial schema

DO $$
BEGIN
    -- social_media
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'providers' AND column_name = 'social_media') THEN
        ALTER TABLE public.providers ADD COLUMN social_media jsonb DEFAULT '{}'::jsonb;
    END IF;

    -- about
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'providers' AND column_name = 'about') THEN
        ALTER TABLE public.providers ADD COLUMN about text;
    END IF;
    
    -- website (optional, adding just in case)
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'providers' AND column_name = 'website') THEN
        ALTER TABLE public.providers ADD COLUMN website text;
    END IF;

    -- starting_price
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'providers' AND column_name = 'starting_price') THEN
        ALTER TABLE public.providers ADD COLUMN starting_price numeric;
    END IF;

    -- currency
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'providers' AND column_name = 'currency') THEN
        ALTER TABLE public.providers ADD COLUMN currency text DEFAULT 'USD';
    END IF;

    -- rating
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'providers' AND column_name = 'rating') THEN
        ALTER TABLE public.providers ADD COLUMN rating numeric DEFAULT 0;
    END IF;

    -- review_count
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'providers' AND column_name = 'review_count') THEN
        ALTER TABLE public.providers ADD COLUMN review_count integer DEFAULT 0;
    END IF;
    
    -- image_url (profile/banner)
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'providers' AND column_name = 'image_url') THEN
        ALTER TABLE public.providers ADD COLUMN image_url text;
    END IF;
END $$;
