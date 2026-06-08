create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email extensions.citext not null unique,
  full_name text not null check (length(trim(full_name)) >= 2),
  avatar_path text,
  role public.user_role not null default 'guest',
  status public.user_status not null default 'active',
  locale varchar(5) not null default 'nl',
  phone_e164 text,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index users_role_status_idx on public.users(role, status);
create index users_active_privileged_idx on public.users(role)
where status = 'active' and role in ('host', 'admin');

create table public.host_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  display_name text not null,
  legal_entity_type text not null check (legal_entity_type in ('individual', 'company')),
  business_name text,
  country_code char(2) not null,
  verification_status public.host_verification_status not null default 'not_started',
  platform_approved boolean not null default false,
  approved_by uuid references public.users(id) on delete set null,
  approved_at timestamptz,
  restriction_reason text,
  terms_version text not null,
  terms_accepted_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint host_profiles_business_name_check check (
    legal_entity_type <> 'company' or business_name is not null
  )
);

create index host_profiles_review_idx
on public.host_profiles(verification_status, platform_approved);

create table public.payout_accounts (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null unique references public.host_profiles(user_id) on delete cascade,
  provider text not null default 'stripe' check (provider = 'stripe'),
  provider_account_id text not null unique,
  onboarding_complete boolean not null default false,
  transfers_capability text not null default 'inactive'
    check (transfers_capability in ('inactive', 'pending', 'active')),
  payouts_enabled boolean not null default false,
  payout_schedule text not null default 'manual' check (payout_schedule = 'manual'),
  requirements_due jsonb not null default '[]'::jsonb,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references public.users(id) on delete restrict,
  slug text not null unique check (slug = lower(slug)),
  status public.listing_status not null default 'draft',
  title text not null,
  description text not null,
  region text not null,
  county text not null,
  municipality text not null,
  city text not null,
  public_location extensions.geography(point, 4326) not null,
  timezone text not null default 'Europe/Oslo',
  currency char(3) not null default 'EUR' check (currency = 'EUR'),
  base_price_cents bigint not null check (base_price_cents >= 0),
  cleaning_fee_cents bigint not null default 0 check (cleaning_fee_cents >= 0),
  mandatory_boat_fee_cents bigint not null default 0
    check (mandatory_boat_fee_cents >= 0),
  max_guests smallint not null check (max_guests > 0),
  bedrooms smallint not null check (bedrooms >= 0),
  bathrooms numeric(3, 1) not null check (bathrooms >= 0),
  check_in_time time not null default '16:00',
  check_out_time time not null default '10:00',
  pets_allowed boolean not null default false,
  waterfront boolean not null default true,
  private_dock boolean not null default false,
  sauna_hot_tub boolean not null default false,
  direct_booking boolean not null default true,
  house_rules text not null,
  cancellation_policy_version text not null,
  approved_by uuid references public.users(id) on delete set null,
  approved_at timestamptz,
  published_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index listings_status_published_idx
on public.listings(status, published_at desc);
create index listings_host_status_idx on public.listings(host_id, status);
create index listings_region_status_idx on public.listings(region, status);
create index listings_published_price_idx on public.listings(base_price_cents)
where status = 'published';
create index listings_location_idx on public.listings using gist(public_location);

create table public.listing_private_locations (
  listing_id uuid primary key references public.listings(id) on delete cascade,
  address_line_1 text not null,
  address_line_2 text,
  postal_code text not null,
  exact_location extensions.geography(point, 4326) not null,
  access_instructions text,
  updated_at timestamptz not null default now()
);

create index listing_private_locations_exact_idx
on public.listing_private_locations using gist(exact_location);

create table public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  storage_path text not null unique,
  alt_text text not null,
  sort_order integer not null check (sort_order >= 0),
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  crop jsonb,
  moderation_status text not null default 'pending'
    check (moderation_status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  unique (listing_id, sort_order)
);

create index listing_images_moderation_idx
on public.listing_images(listing_id, moderation_status);

create table public.boat_details (
  listing_id uuid primary key references public.listings(id) on delete cascade,
  boat_type public.boat_type not null,
  make text,
  model text,
  build_year smallint check (build_year is null or build_year between 1900 and 2100),
  capacity smallint not null check (capacity > 0),
  engine_power_hp integer not null default 0 check (engine_power_hp >= 0),
  license_required boolean not null,
  license_category text,
  safety_equipment text[] not null default '{}'::text[],
  deposit_cents bigint not null default 0 check (deposit_cents >= 0),
  rules text not null,
  insurance_status text not null default 'pending'
    check (insurance_status in ('pending', 'verified', 'expired', 'rejected')),
  insurance_expires_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint boat_license_category_check check (
    not license_required or license_category is not null
  )
);

create index boat_details_search_idx
on public.boat_details(license_required, boat_type, capacity);

create table public.listing_documents (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  document_type text not null,
  storage_path text not null unique,
  verification_status text not null default 'pending'
    check (verification_status in ('pending', 'verified', 'expired', 'rejected')),
  expires_on date,
  verified_by uuid references public.users(id) on delete set null,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create index listing_documents_review_idx
on public.listing_documents(listing_id, verification_status);

create table public.amenities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null,
  labels jsonb not null default '{}'::jsonb,
  icon text not null,
  created_at timestamptz not null default now()
);

create table public.listing_amenities (
  listing_id uuid not null references public.listings(id) on delete cascade,
  amenity_id uuid not null references public.amenities(id) on delete restrict,
  primary key (listing_id, amenity_id)
);

create index listing_amenities_filter_idx
on public.listing_amenities(amenity_id, listing_id);

create table public.availability (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  booking_id uuid,
  date_range daterange not null,
  block_type public.availability_type not null,
  status public.availability_status not null default 'active',
  expires_at timestamptz,
  created_by uuid references public.users(id) on delete set null,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint availability_nonempty_range check (not isempty(date_range)),
  constraint availability_hold_expiry_check check (
    block_type <> 'payment_hold' or expires_at is not null
  )
);

create index availability_range_idx
on public.availability using gist(listing_id, date_range);
create index availability_expiry_idx on public.availability(status, expires_at);
create index availability_booking_idx on public.availability(booking_id);

create table public.pricing_rules (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  name text not null,
  date_range daterange not null,
  weekdays smallint[],
  nightly_price_cents bigint not null check (nightly_price_cents >= 0),
  cleaning_fee_override_cents bigint
    check (cleaning_fee_override_cents is null or cleaning_fee_override_cents >= 0),
  min_nights smallint not null default 1 check (min_nights > 0),
  max_nights smallint check (max_nights is null or max_nights >= min_nights),
  priority integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pricing_rules_nonempty_range check (not isempty(date_range)),
  constraint pricing_rules_weekdays_check check (
    weekdays is null or weekdays <@ array[1, 2, 3, 4, 5, 6, 7]::smallint[]
  )
);

create index pricing_rules_range_idx
on public.pricing_rules using gist(listing_id, date_range);
create index pricing_rules_priority_idx
on public.pricing_rules(listing_id, active, priority desc);

create table public.listing_translations (
  listing_id uuid not null references public.listings(id) on delete cascade,
  locale varchar(5) not null,
  title text not null,
  description text not null,
  boat_rules text not null,
  house_rules text not null,
  source text not null default 'automatic'
    check (source in ('automatic', 'host', 'admin')),
  reviewed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (listing_id, locale)
);

create trigger users_set_updated_at
before update on public.users
for each row execute function private.set_updated_at();
create trigger host_profiles_set_updated_at
before update on public.host_profiles
for each row execute function private.set_updated_at();
create trigger payout_accounts_set_updated_at
before update on public.payout_accounts
for each row execute function private.set_updated_at();
create trigger listings_set_updated_at
before update on public.listings
for each row execute function private.set_updated_at();
create trigger listing_private_locations_set_updated_at
before update on public.listing_private_locations
for each row execute function private.set_updated_at();
create trigger boat_details_set_updated_at
before update on public.boat_details
for each row execute function private.set_updated_at();
create trigger availability_set_updated_at
before update on public.availability
for each row execute function private.set_updated_at();
create trigger pricing_rules_set_updated_at
before update on public.pricing_rules
for each row execute function private.set_updated_at();
create trigger listing_translations_set_updated_at
before update on public.listing_translations
for each row execute function private.set_updated_at();
