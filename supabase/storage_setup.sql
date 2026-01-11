-- Create 'images' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'images' );

-- Policy to allow authenticated users to update their own images (optional, but good)
-- (Assuming they overwrite by name or we handle it via INSERT)
-- For simplicity, INSERT is often enough if we use unique names.

-- Policy to allow public to view images
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'images' );
