-- PLYNT — initial schema
-- Run via: supabase db push  OR  supabase migration up

-- Example: users table (extend as needed)
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  wallet_address text,
  created_at timestamptz default now()
);

-- Row-level security
alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);
