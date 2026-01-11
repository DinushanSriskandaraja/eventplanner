-- 1. Reports Table
CREATE TABLE IF NOT EXISTS public.reports (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    reporter_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    provider_id uuid REFERENCES public.providers(id) ON DELETE CASCADE,
    report_type text NOT NULL,
    message text NOT NULL,
    attachments text[], -- Array of URLs
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'in-review', 'resolved')),
    admin_notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can view all reports" ON public.reports FOR SELECT USING (true); 
CREATE POLICY "Users can create reports" ON public.reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- 2. Subscription Plans Table
CREATE TABLE IF NOT EXISTS public.subscription_plans (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    description text,
    price numeric NOT NULL DEFAULT 0,
    billing_cycle text DEFAULT 'Monthly', -- Monthly, Yearly
    status text DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    features jsonb, 
    leads_per_month integer DEFAULT 0,
    is_featured boolean DEFAULT false,
    priority text DEFAULT 'Normal',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for plans" ON public.subscription_plans FOR SELECT USING (true);
CREATE POLICY "Admins full access to plans" ON public.subscription_plans FOR ALL USING (true);

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_provider ON public.reports(provider_id);
