
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
  social_links jsonb default '[]'::jsonb, -- Store links: [{ name, icon, href }]
  tech_stack jsonb default '[]'::jsonb, -- Store list of tech: [{ name, icon }]
  about_me text, -- Separate field for the About Me card
  cta_title text,
  cta_description text,
  cta_text text,
  cta_link text,
  theme text default 'dark',
  beams_enabled boolean default true,
  
  constraint username_length check (char_length(username) >= 3)
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
  tech_tags jsonb default '[]'::jsonb -- Array of tech strings e.g. ["Next.js", "React"]
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
