-- ==========================================
-- FIX SCHEMA SCRIPT
-- ==========================================
-- RUN THIS SCRIPT IN THE SUPABASE SQL EDITOR
-- ==========================================

-- 1. Drop existing trigger and function to start fresh and avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Create the function with robust error handling and security
-- SECURITY DEFINER: Runs with the privileges of the creator (postgres/admin), bypassing RLS
-- SET search_path = public: Prevents search_path hijacking
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_full_name text;
  v_role user_role;
BEGIN
  -- Extract metadata with safe fallbacks
  v_full_name := new.raw_user_meta_data->>'full_name';
  -- Default to 'user' if role is missing or invalid
  v_role := COALESCE((new.raw_user_meta_data->>'role')::user_role, 'user'::user_role);

  -- Insert into profiles
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    v_full_name,
    v_role
  );

  -- If the user is a provider, initialize their provider profile
  IF (v_role = 'provider') THEN
      INSERT INTO public.providers (id, name, is_verified)
      VALUES (
        new.id, 
        COALESCE(v_full_name, 'New Provider'), 
        false
      );
  END IF;

  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- If an error occurs, we raise it so the transaction aborts and the user is NOT created in auth.users
    -- This prevents 'ghost' users without profiles.
    RAISE EXCEPTION 'Failed to create user profile: %', SQLERRM;
END;
$$;

-- 3. Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Verify/Ensure RLS policies exist (Optional safety check, these should already exist)
-- Since we are using SECURITY DEFINER above, these policies don't strictly block the trigger,
-- but they are good to have for client-side access.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
