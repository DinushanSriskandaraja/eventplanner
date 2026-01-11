-- Debug Script: Verify Data for Search
-- 1. Mark all providers as VERIFIED so they appear in search results.
--    By default, new providers are 'false' and hidden from search.
UPDATE public.providers SET is_verified = true;

-- 2. Debug Helper: Ensure 'Photography' service exists and is linked
--    This attempts to link the first provider found to 'photography' just in case data is missing.
--    (You can comment this out if you have real data you don't want to mess up)

DO $$ 
DECLARE
    v_provider_id uuid;
BEGIN
    SELECT id INTO v_provider_id FROM public.providers LIMIT 1;
    
    IF v_provider_id IS NOT NULL THEN
        -- Ensure photography service exists
        INSERT INTO public.services (id, label) VALUES ('photography', 'Photography') ON CONFLICT DO NOTHING;
        
        -- Link provider to photography
        INSERT INTO public.provider_services (provider_id, service_id)
        VALUES (v_provider_id, 'photography')
        ON CONFLICT DO NOTHING;
    END IF;
END $$;
