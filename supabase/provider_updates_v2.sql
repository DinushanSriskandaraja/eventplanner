-- Add banner_url and years_of_experience to providers table
ALTER TABLE public.providers
ADD COLUMN IF NOT EXISTS banner_url text,
ADD COLUMN IF NOT EXISTS years_of_experience integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS starting_price numeric DEFAULT 0;

-- Ensure Admins/Owners (authenticated) can update these columns
-- (Existing policies generally cover UPDATE TO authenticated USING true for Admins, 
-- or USING (auth.uid() = id) for Providers updating themselves. 
-- We assume the base RLS is set up for self-update or admin update.)

-- Create index for filtering if needed
CREATE INDEX IF NOT EXISTS idx_providers_experience ON public.providers(years_of_experience);
CREATE INDEX IF NOT EXISTS idx_providers_price ON public.providers(starting_price);
