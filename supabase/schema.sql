-- ============================================================
-- Doctors Divine — Supabase schema
-- Run this ONCE in a NEW Supabase project: Dashboard -> SQL Editor ->
-- paste the whole file -> Run. Do NOT run it in any existing project
-- (especially not a paused project belonging to another app).
-- ============================================================

-- Bookings: one row per appointment made from the Book page.
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  patient_name text not null,
  mobile text not null,
  doctor text not null,
  date date not null,
  time_slot text not null,
  problem text,
  age integer,
  area text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'done', 'cancelled')),
  email_status text not null default 'off'
    check (email_status in ('off', 'sending', 'sent', 'failed')),
  email_error text,
  created_at timestamptz not null default now()
);

create index if not exists bookings_date_idx on public.bookings (date);
create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_token_idx on public.bookings (token);

-- Settings: exactly one row (id = 1) holding the 3 alert email addresses.
-- The dashboard's Settings section edits this row. No sample emails are
-- inserted: the row starts empty and the doctor fills it in.
create table if not exists public.settings (
  id integer primary key check (id = 1),
  email_1 text,
  email_2 text,
  email_3 text,
  updated_at timestamptz not null default now()
);

insert into public.settings (id, email_1, email_2, email_3)
values (1, null, null, null)
on conflict (id) do nothing;

-- ============================================================
-- Row Level Security
-- RLS is ENABLED on both tables, and NO policies are created for the
-- anon/authenticated roles. That means: nobody can read or write these
-- tables from the browser, ever — not even with the anon key.
--
-- The app only ever touches the database from the server (Next.js API
-- routes) using the SERVICE-ROLE key, which bypasses RLS by design.
-- That is the intended pattern: keep the service-role key server-only
-- (plain env var, never NEXT_PUBLIC_*) and the data stays private.
-- ============================================================
alter table public.bookings enable row level security;
alter table public.settings enable row level security;
