-- 1. Updates to Providers Table
ALTER TABLE public.providers
ADD COLUMN IF NOT EXISTS status text DEFAULT 'Pending' CHECK (status IN ('Pending', 'Active', 'Suspended', 'Deactivated')),
ADD COLUMN IF NOT EXISTS plan_id uuid REFERENCES public.subscription_plans(id) ON DELETE SET NULL;

-- 2. Updates to Profiles (Users) Table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS status text DEFAULT 'Active' CHECK (status IN ('Active', 'Suspended', 'Banned'));

-- 3. Update Policies
-- Ensure Admins can update these new columns.
-- (Existing "Admins can update providers" policies usually cover all columns, but we verify implicitely via actions)

-- 4. Create Index for performance
CREATE INDEX IF NOT EXISTS idx_providers_status ON public.providers(status);
CREATE INDEX IF NOT EXISTS idx_providers_plan ON public.providers(plan_id);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
