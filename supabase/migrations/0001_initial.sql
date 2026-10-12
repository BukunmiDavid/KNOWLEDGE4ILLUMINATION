-- Enable UUID
create extension if not exists "uuid-ossp";

-- Profiles table
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null unique,
  name text not null,
  role text not null default 'student' check (role in ('student','admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Course progress table
create table if not exists course_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  course_slug text not null,
  completed_lesson_ids text[] default '{}',
  last_lesson_id text,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, course_slug)
);

-- Updated_at trigger
create or replace function handle_updated_at()
returns trigger as 
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
 language plpgsql;

drop trigger if exists profiles_updated_at on profiles;
create trigger profiles_updated_at
  before update on profiles
  for each row execute procedure handle_updated_at();

drop trigger if exists course_progress_updated_at on course_progress;
create trigger course_progress_updated_at
  before update on course_progress
  for each row execute procedure handle_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as 
begin
  insert into public.profiles (id, email, name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)), 'student');
  return new;
end;
 language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table profiles enable row level security;
alter table course_progress enable row level security;

-- Policies: users can read/update own profile
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Policies: progress
create policy "Users can view own progress" on course_progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on course_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on course_progress for update using (auth.uid() = user_id);
create policy "Users can delete own progress" on course_progress for delete using (auth.uid() = user_id);

-- Admin read all profiles (optional) - adjust as needed
create policy "Admins can read all profiles" on profiles for select using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "Admins can read all progress" on course_progress for select using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
