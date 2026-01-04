-- Create a table for user profiles
create table profiles (
  id uuid references auth.users on delete cascade not null,
  is_paid boolean default false,
  payment_id text,
  updated_at timestamp with time zone,
  
  primary key (id)
);

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;

-- Create policies
-- Allow users to view their own profile
create policy "Users can view own profile" 
  on profiles for select 
  using ( auth.uid() = id );

-- Allow users to update their own profile (optional, mostly for admin/webhooks)
create policy "Users can update own profile" 
  on profiles for update 
  using ( auth.uid() = id );

-- Function to handle new user signup
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, is_paid)
  values (new.id, false);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
