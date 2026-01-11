
-- Add status column to services
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive'));

-- Add RLS policies for Admin management of services
CREATE POLICY "Authenticated users can insert services" 
ON public.services FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update services" 
ON public.services FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can delete services" 
ON public.services FOR DELETE 
TO authenticated 
USING (true);
