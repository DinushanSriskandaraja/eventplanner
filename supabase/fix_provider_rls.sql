-- Allow authenticated users (Admins) to UPDATE providers
-- This is necessary because the default policy usually only allows users to update their OWN provider profile.
CREATE POLICY "Authenticated users can update any provider"
ON public.providers
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users (Admins) to DELETE providers
CREATE POLICY "Authenticated users can delete any provider"
ON public.providers
FOR DELETE
TO authenticated
USING (true);

-- Ensure Insert is allowed if not already (though usually handled by trigger)
CREATE POLICY "Authenticated users can insert providers"
ON public.providers
FOR INSERT
TO authenticated
WITH CHECK (true);
