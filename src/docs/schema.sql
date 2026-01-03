
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role text default 'user', -- 'admin' or 'user'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. SITES (The project being managed)
create table public.sites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  domain_url text not null,
  current_phase int default 1, -- 1: Analysis, 2: Keywords, 3: Writing, 4: Live
  domain_authority int default 0,
  domain_health int default 100,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. BACKLINKS (Manual Ledger)
create table public.backlinks (
  id uuid default uuid_generate_v4() primary key,
  site_id uuid references public.sites(id) on delete cascade not null,
  source_url text not null,
  dr_score int not null,
  anchor_text text,
  acquired_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. ARTICLES (Content Calendar)
create table public.articles (
  id uuid default uuid_generate_v4() primary key,
  site_id uuid references public.sites(id) on delete cascade not null,
  title text not null,
  status text default 'In Editorial Review', -- 'In Editorial Review', 'Live'
  live_url text, -- Null if not live yet
  published_at timestamp with time zone
);

-- RLS POLICIES
alter table public.profiles enable row level security;
alter table public.sites enable row level security;
alter table public.backlinks enable row level security;
alter table public.articles enable row level security;

-- Admins can do everything
create policy "Admins can do everything"
  on public.profiles for all
  using (auth.jwt() ->> 'email' = 'admin@chainfessions.com'); -- Simple email check for now

create policy "Admins can do everything sites"
  on public.sites for all
  using (auth.jwt() ->> 'email' = 'admin@chainfessions.com');

create policy "Admins can do everything backlinks"
  on public.backlinks for all
  using (auth.jwt() ->> 'email' = 'admin@chainfessions.com');

create policy "Admins can do everything articles"
  on public.articles for all
  using (auth.jwt() ->> 'email' = 'admin@chainfessions.com');

-- Users can view their own data
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can view own site"
  on public.sites for select
  using (auth.uid() = user_id);

create policy "Users can view own backlinks"
  on public.backlinks for select
  using (site_id in (select id from public.sites where user_id = auth.uid()));

create policy "Users can view own articles"
  on public.articles for select
  using (site_id in (select id from public.sites where user_id = auth.uid()));

-- Users can insert their first site (Onboarding)
create policy "Users can insert site"
  on public.sites for insert
  with check (auth.uid() = user_id);
