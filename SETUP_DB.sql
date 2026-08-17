
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  username text unique,
  full_name text,
  avatar_url text,
  bio text, -- Renamed from biography (About Me)
  profession text,
  is_available boolean default true, -- Current Status
  status_message text,
  github_username text, -- For Contribution Graph
  github_graph_title text default '', -- Added custom title for GitHub Graph
  status_icon text default null, -- Status Emoji
  social_links jsonb default '[]'::jsonb, -- Store links: [{ name, icon, href }]
  tech_stack jsonb default '[]'::jsonb, -- Store list of tech: [{ name, icon }]
  about_me text, -- Separate field for the About Me card
  cta_title text,
  cta_description text,
  cta_text text,
  cta_link text,
  theme text default 'dark',
  layout text default 'classic', -- Public profile layout: 'classic' | 'minimal'
  loader_delay_ms integer default 0, -- Minimal-layout boot screen duration in ms; 0 = off, opt in from the dashboard
  beams_enabled boolean default true,
  is_donor boolean default false,
  cv_url text,

  constraint username_length check (char_length(username) >= 3),
  -- 0 = off, otherwise keep it inside a sane range so a profile can't be
  -- bricked behind a 10-minute loading screen.
  constraint loader_delay_range check (loader_delay_ms >= 0 and loader_delay_ms <= 8000)
);

-- Create a table for Projects
create table projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  url text,
  image_url text, -- Project Logo URL
  tech_tags jsonb default '[]'::jsonb, -- Array of tech strings e.g. ["Next.js", "React"]
  sort_order integer default 0, -- For rearranging projects
  is_hidden boolean default false not null -- Hidden projects are excluded from the public portfolio
);

-- Table for tracking profile views
create table profile_views (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references profiles(id) on delete cascade not null,
  viewed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  viewer_country text,
  viewer_country_code text
);

-- Table for tracking link clicks
create table link_clicks (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references profiles(id) on delete cascade not null,
  link_type text not null, -- 'social', 'project', 'cta'
  link_url text not null,
  clicked_at timestamp with time zone default timezone('utc'::text, now()) not null,
  viewer_country text,
  viewer_country_code text
);

-- Set up Row Level Security (RLS) for Profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Set up RLS for Projects
alter table projects enable row level security;

create policy "Public projects are viewable by everyone."
  on projects for select
  using ( true );

create policy "Users can insert their own projects."
  on projects for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own projects."
  on projects for update
  using ( auth.uid() = user_id );

create policy "Users can delete own projects."
  on projects for delete
  using ( auth.uid() = user_id );

-- RLS for Analytics
alter table profile_views enable row level security;
alter table link_clicks enable row level security;

create policy "Public can record views."
  on profile_views for insert
  with check ( true );

create policy "Users can view own profile analytics."
  on profile_views for select
  using ( auth.uid() = profile_id );

create policy "Public can record clicks."
  on link_clicks for insert
  with check ( true );

create policy "Users can view own click analytics."
  on link_clicks for select
  using ( auth.uid() = profile_id );

-- Ensure username is unique
create unique index if not exists profiles_username_idx on profiles (username);

-- Function to handle new user signup automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, username)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url', 
    new.raw_user_meta_data->>'username'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create Storage bucket for Avatars and Project Images
insert into storage.buckets (id, name, public) 
values ('images', 'images', true)
on conflict (id) do nothing;

-- Policy to allow public access to images
create policy "Images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'images' );

-- Policy to allow authenticated users to upload images
create policy "Authenticated users can upload images."
  on storage.objects for insert
  with check ( bucket_id = 'images' and auth.role() = 'authenticated' );
-- Create Storage bucket for CVs
insert into storage.buckets (id, name, public) 
values ('cvs', 'cvs', true)
on conflict (id) do nothing;

-- Policy to allow public access to CVs
create policy "CVs are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'cvs' );

-- Policy to allow authenticated users to upload CVs
create policy "Authenticated users can upload CVs."
  on storage.objects for insert
  with check ( bucket_id = 'cvs' and auth.role() = 'authenticated' );

-- ---------------------------------------------------------------------------
-- Migration: loader_delay_ms (minimal-layout boot screen duration)
-- Safe to run on an existing database; both statements are idempotent.
-- ---------------------------------------------------------------------------
alter table profiles
  add column if not exists loader_delay_ms integer default 0;

-- Corrects the default on databases where an earlier revision of this migration
-- created the column with 2800. Does not touch existing rows — see the note in
-- the PR for the one-time backfill, which must not live here or it would keep
-- resetting anyone who deliberately picks 2.8s.
alter table profiles
  alter column loader_delay_ms set default 0;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'loader_delay_range'
  ) then
    alter table profiles
      add constraint loader_delay_range
      check (loader_delay_ms >= 0 and loader_delay_ms <= 8000);
  end if;
end $$;
