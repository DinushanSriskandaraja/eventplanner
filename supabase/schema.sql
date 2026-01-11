-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- PROFILES (Manages user roles)
create type user_role as enum ('user', 'provider', 'admin');

create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  role user_role default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PROVIDERS (Stores public provider details)
create table public.providers (
  id uuid references public.profiles(id) on delete cascade not null primary key,
  name text not null,
  category text,
  location text,
  experience integer default 0,
  rating numeric(3, 2) default 0,
  review_count integer default 0,
  starting_price integer,
  currency text default '$',
  image_url text,
  tagline text,
  is_verified boolean default false,
  is_featured boolean default false,
  about text,
  services text[],
  event_types text[],
  social_media jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PORTFOLIO ITEMS
create type portfolio_type as enum ('photo', 'video');

create table public.portfolio_items (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references public.providers(id) on delete cascade not null,
  type portfolio_type not null,
  src text not null,
  youtube_url text,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ROW LEVEL SECURITY (RLS)
alter table public.profiles enable row level security;
alter table public.providers enable row level security;
alter table public.portfolio_items enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- Policies for Providers
create policy "Providers are viewable by everyone."
  on public.providers for select
  using ( true );

create policy "Providers can insert their own provider profile."
  on public.providers for insert
  with check ( auth.uid() = id );

create policy "Providers can update own provider profile."
  on public.providers for update
  using ( auth.uid() = id );

-- Policies for Portfolio Items
create policy "Portfolio items are viewable by everyone."
  on public.portfolio_items for select
  using ( true );

create policy "Providers can insert own portfolio items."
  on public.portfolio_items for insert
  with check ( auth.uid() = provider_id );

create policy "Providers can update own portfolio items."
  on public.portfolio_items for update
  using ( auth.uid() = provider_id );

create policy "Providers can delete own portfolio items."
  on public.portfolio_items for delete
  using ( auth.uid() = provider_id );

-- STORAGE BUCKETS
-- Note: Buckets usually need to be created via Dashboard or Client, but policies can be defined here if the bucket exists.
-- We will assume a bucket named 'portfolio' exists.

-- Storage Policies (requires 'portfolio' bucket to exist)
-- create policy "Portfolio images are publicly accessible."
--   on storage.objects for select
--   using ( bucket_id = 'portfolio' );

-- create policy "Providers can upload portfolio images."
--   on storage.objects for insert
--   with check ( bucket_id = 'portfolio' and auth.uid()::text = (storage.foldername(name))[1] );

-- PROVIDER PACKAGES
create table public.provider_packages (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references public.providers(id) on delete cascade not null,
  name text not null,
  description text,
  price numeric,
  currency text default '$',
  event_types text[],
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Policies for Packages
create policy "Public packages are viewable by everyone."
  on public.provider_packages for select
  using ( true );

create policy "Providers can insert own packages."
  on public.provider_packages for insert
  with check ( auth.uid() = provider_id );

create policy "Providers can update own packages."
  on public.provider_packages for update
  using ( auth.uid() = provider_id );


-- ENQUIRIES (Bookings/Leads)
create type enquiry_status as enum ('new', 'responded', 'booked', 'closed');

create table public.enquiries (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references public.providers(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete set null, -- Optional: client might be a registered user
  client_name text not null,
  client_email text not null,
  event_type text,
  event_date date,
  message text,
  status enquiry_status default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Policies for Enquiries
create policy "Providers can view own enquiries"
  on public.enquiries for select
  using ( auth.uid() = provider_id );

create policy "Providers can update own enquiries"
  on public.enquiries for update
  using ( auth.uid() = provider_id );

create policy "Users can insert enquiries"
  on public.enquiries for insert
  with check ( true ); -- Allow any authenticated user to send enquiry (or public if needed)

-- TRIGGER FOR NEW USER SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'user'::user_role)
  );

  if (new.raw_user_meta_data->>'role' = 'provider') then
      insert into public.providers (id, name, is_verified)
      values (new.id, new.raw_user_meta_data->>'full_name', false);
  end if;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

