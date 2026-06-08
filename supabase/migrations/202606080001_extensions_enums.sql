create schema if not exists extensions;
create schema if not exists private;

create extension if not exists btree_gist with schema extensions;
create extension if not exists citext with schema extensions;
create extension if not exists pgcrypto with schema extensions;
create extension if not exists postgis with schema extensions;

revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated, service_role;

create type public.user_role as enum ('guest', 'host', 'admin');
create type public.user_status as enum ('active', 'restricted', 'blocked', 'deleted');
create type public.host_verification_status as enum (
  'not_started',
  'pending',
  'verified',
  'restricted',
  'rejected'
);
create type public.listing_status as enum (
  'draft',
  'pending_review',
  'published',
  'rejected',
  'paused',
  'archived'
);
create type public.booking_status as enum (
  'draft',
  'pending_payment',
  'confirmed',
  'checked_in',
  'completed',
  'cancelled',
  'disputed'
);
create type public.payment_status as enum (
  'requires_payment',
  'processing',
  'paid',
  'held',
  'partially_refunded',
  'refunded',
  'failed',
  'chargeback'
);
create type public.payout_status as enum (
  'not_ready',
  'scheduled',
  'pending',
  'paid',
  'failed',
  'paused'
);
create type public.refund_status as enum (
  'requested',
  'approved',
  'processing',
  'completed',
  'rejected'
);
create type public.availability_type as enum (
  'payment_hold',
  'confirmed_booking',
  'host_block',
  'boat_block',
  'maintenance'
);
create type public.availability_status as enum ('active', 'released', 'expired');
create type public.boat_type as enum (
  'motorboat',
  'fishing_boat',
  'rib',
  'sailboat',
  'dinghy',
  'other'
);
create type public.dispute_status as enum (
  'open',
  'evidence_required',
  'under_review',
  'won',
  'lost',
  'resolved'
);
create type public.deposit_status as enum (
  'not_requested',
  'requires_method',
  'authorized',
  'released',
  'capture_requested',
  'captured',
  'failed'
);
create type public.job_status as enum ('pending', 'processing', 'completed', 'failed');

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
