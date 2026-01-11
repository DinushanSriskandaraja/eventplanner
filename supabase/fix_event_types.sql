-- Add status column to event_types
ALTER TABLE public.event_types 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive'));

-- Add RLS policies for Admin management of event_types
-- Assuming 'public' role (authenticated users) can manage for this MVP, 
-- or strictly, you might want to check for admin role.
-- For now, we will allow authenticated users to INSERT/UPDATE/DELETE.

CREATE POLICY "Authenticated users can insert event_types" 
ON public.event_types FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update event_types" 
ON public.event_types FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can delete event_types" 
ON public.event_types FOR DELETE 
TO authenticated 
USING (true);
