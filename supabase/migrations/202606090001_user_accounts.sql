alter type public.user_status add value if not exists 'pending_email_verification';
alter type public.user_status add value if not exists 'suspended';
alter type public.user_status add value if not exists 'deactivated';

create type public.host_status as enum (
  'not_started',
  'pending_verification',
  'verified',
  'rejected',
  'restricted',
  'suspended'
);

create type public.verification_status as enum (
  'not_started',
  'pending',
  'approved',
  'failed',
  'expired'
);

alter table public.users rename column avatar_path to avatar_url;
alter table public.users rename column phone_e164 to phone;

alter table public.users
  add column is_guest boolean not null default true,
  add column is_host boolean not null default false,
  add column is_admin boolean not null default false,
  add column email_verified boolean not null default false,
  add column phone_verified boolean not null default false,
  add column deletion_requested_at timestamptz,
  add column anonymized_at timestamptz;

update public.users
set
  is_guest = true,
  is_host = role in ('host', 'admin'),
  is_admin = role = 'admin',
  email_verified = exists (
    select 1
    from auth.users au
    where au.id = public.users.id
      and au.email_confirmed_at is not null
  );

create index users_status_created_idx
on public.users(status, created_at desc);

create index users_active_host_idx
on public.users(created_at desc)
where is_host and status = 'active';

create index users_active_admin_idx
on public.users(created_at desc)
where is_admin and status = 'active';

create table public.user_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  date_of_birth date
    check (date_of_birth is null or date_of_birth < current_date),
  country char(2),
  language varchar(5) not null default 'nl'
    check (language in ('nl', 'no', 'sv', 'da', 'de', 'en', 'es', 'fr')),
  bio text check (bio is null or length(bio) <= 2000),
  emergency_contact jsonb not null default '{}'::jsonb,
  preferred_currency char(3) not null default 'EUR'
    check (preferred_currency in ('EUR', 'NOK')),
  notification_preferences jsonb not null default
    '{"booking":true,"messages":true,"marketing":false}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.user_profiles(user_id, language)
select id, locale
from public.users
on conflict (user_id) do nothing;

create trigger user_profiles_set_updated_at
before update on public.user_profiles
for each row execute function private.set_updated_at();

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  role public.user_role not null,
  granted_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);

create unique index user_roles_active_unique
on public.user_roles(user_id, role)
where revoked_at is null;

create index user_roles_user_created_idx
on public.user_roles(user_id, created_at desc);

insert into public.user_roles(user_id, role)
select id, 'guest'::public.user_role
from public.users
on conflict (user_id, role) where revoked_at is null do nothing;

insert into public.user_roles(user_id, role)
select id, role
from public.users
where role in ('host', 'admin')
on conflict (user_id, role) where revoked_at is null do nothing;

alter table public.host_profiles rename column display_name to host_name;
alter table public.host_profiles rename column legal_entity_type to host_type;

alter table public.host_profiles
  add column id uuid not null default gen_random_uuid(),
  add column tax_number text,
  add column status public.host_status not null default 'not_started',
  add column payout_account_status text not null default 'not_started'
    check (
      payout_account_status in (
        'not_started',
        'pending',
        'active',
        'restricted'
      )
    ),
  add column response_rate numeric(5, 2)
    check (response_rate is null or response_rate between 0 and 100),
  add column response_time_minutes integer
    check (response_time_minutes is null or response_time_minutes >= 0);

alter table public.host_profiles
  add constraint host_profiles_id_unique unique (id);

update public.host_profiles
set status = case
  when verification_status = 'verified' and platform_approved
    then 'verified'::public.host_status
  when verification_status = 'rejected'
    then 'rejected'::public.host_status
  when verification_status = 'restricted'
    then 'restricted'::public.host_status
  when verification_status = 'pending'
    then 'pending_verification'::public.host_status
  else 'not_started'::public.host_status
end;

create index host_profiles_status_created_idx
on public.host_profiles(status, verification_status, created_at);

create index host_profiles_pending_review_idx
on public.host_profiles(created_at)
where status = 'pending_verification';

create table public.user_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  auth_session_id uuid not null unique,
  ip_address inet,
  user_agent text,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz,
  constraint user_sessions_expiry_check check (expires_at > created_at)
);

create index user_sessions_user_active_idx
on public.user_sessions(user_id, expires_at desc)
where revoked_at is null;

create index user_sessions_expiry_idx
on public.user_sessions(expires_at)
where revoked_at is null;

create table public.user_verifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  verification_type text not null
    check (
      verification_type in ('email', 'phone', 'identity', 'payout')
    ),
  provider text not null
    check (provider in ('supabase', 'stripe', 'manual')),
  provider_reference text,
  status public.verification_status not null default 'not_started',
  failure_reason text,
  verified_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_reference)
);

create index user_verifications_user_type_status_idx
on public.user_verifications(user_id, verification_type, status);

create trigger user_verifications_set_updated_at
before update on public.user_verifications
for each row execute function private.set_updated_at();

create table public.login_attempts (
  id bigint generated always as identity primary key,
  email_hash text not null,
  ip_address inet,
  success boolean not null,
  failure_reason text,
  created_at timestamptz not null default now()
);

create index login_attempts_email_created_idx
on public.login_attempts(email_hash, created_at desc);

create index login_attempts_ip_created_idx
on public.login_attempts(ip_address, created_at desc);

create index login_attempts_failed_created_idx
on public.login_attempts(created_at desc)
where not success;

alter table public.audit_logs
  add column target_user_id uuid references public.users(id) on delete set null,
  add column metadata jsonb not null default '{}'::jsonb;

create index audit_logs_target_idx
on public.audit_logs(target_user_id, created_at desc);
