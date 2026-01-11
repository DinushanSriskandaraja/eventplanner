-- Fix missing provider_packages table
-- This table is required for the Service Packages feature in the Provider Dashboard

CREATE TABLE IF NOT EXISTS public.provider_packages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    provider_id uuid REFERENCES public.providers(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    description text,
    price numeric NOT NULL,
    currency text DEFAULT 'USD',
    is_active boolean DEFAULT true,
    event_types text[], -- Storing as array for simplicity matching the action logic
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.provider_packages ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'provider_packages' AND policyname = 'Packages are viewable by everyone') THEN
        CREATE POLICY "Packages are viewable by everyone" ON public.provider_packages FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'provider_packages' AND policyname = 'Providers can manage own packages') THEN
        CREATE POLICY "Providers can manage own packages" ON public.provider_packages FOR ALL USING (auth.uid() = provider_id);
    END IF;
END $$;

-- Add index
CREATE INDEX IF NOT EXISTS idx_packages_provider_id ON public.provider_packages(provider_id);
