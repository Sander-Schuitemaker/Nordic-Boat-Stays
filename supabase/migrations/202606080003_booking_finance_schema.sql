create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  listing_id uuid not null references public.listings(id) on delete restrict,
  guest_id uuid not null references public.users(id) on delete restrict,
  status public.booking_status not null default 'draft',
  check_in date not null,
  check_out date not null,
  stay_range daterange generated always as (
    daterange(check_in, check_out, '[)')
  ) stored,
  guests smallint not null check (guests > 0),
  currency char(3) not null default 'EUR' check (currency = 'EUR'),
  nightly_subtotal_cents bigint not null check (nightly_subtotal_cents >= 0),
  cleaning_fee_cents bigint not null check (cleaning_fee_cents >= 0),
  boat_fee_cents bigint not null check (boat_fee_cents >= 0),
  guest_service_fee_cents bigint not null check (guest_service_fee_cents >= 0),
  host_commission_cents bigint not null check (host_commission_cents >= 0),
  tax_cents bigint not null default 0 check (tax_cents >= 0),
  total_cents bigint not null check (total_cents >= 0),
  host_net_cents bigint not null check (host_net_cents >= 0),
  guest_fee_bps integer not null default 800 check (guest_fee_bps between 0 and 10000),
  host_fee_bps integer not null default 500 check (host_fee_bps between 0 and 10000),
  cancellation_policy_version text not null,
  pricing_version text not null,
  license_required boolean not null default false,
  license_confirmed_at timestamptz,
  payment_expires_at timestamptz,
  confirmed_at timestamptz,
  checked_in_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,
  cancellation_reason text,
  payout_release_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_date_order_check check (check_out > check_in),
  constraint bookings_license_confirmation_check check (
    not license_required or status in ('draft', 'pending_payment', 'cancelled')
    or license_confirmed_at is not null
  ),
  constraint bookings_total_snapshot_check check (
    total_cents =
      nightly_subtotal_cents
      + cleaning_fee_cents
      + boat_fee_cents
      + guest_service_fee_cents
      + tax_cents
  ),
  constraint bookings_host_net_snapshot_check check (
    host_net_cents =
      nightly_subtotal_cents
      + cleaning_fee_cents
      + boat_fee_cents
      - host_commission_cents
  )
);

create index bookings_guest_created_idx
on public.bookings(guest_id, created_at desc);
create index bookings_listing_dates_idx
on public.bookings(listing_id, check_in, check_out);
create index bookings_payout_release_idx
on public.bookings(status, payout_release_at);
create index bookings_active_idx
on public.bookings(listing_id, check_in, check_out)
where status in ('pending_payment', 'confirmed', 'checked_in', 'disputed');

alter table public.availability
add constraint availability_booking_id_fkey
foreign key (booking_id) references public.bookings(id) on delete cascade;

create table public.booking_price_items (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  item_type text not null,
  label text not null,
  quantity numeric(12, 2) not null check (quantity > 0),
  unit_amount_cents bigint not null,
  total_amount_cents bigint not null,
  taxable boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index booking_price_items_type_idx
on public.booking_price_items(booking_id, item_type);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete restrict,
  attempt_number smallint not null check (attempt_number > 0),
  provider text not null default 'stripe' check (provider = 'stripe'),
  status public.payment_status not null default 'requires_payment',
  amount_cents bigint not null check (amount_cents >= 0),
  currency char(3) not null default 'EUR' check (currency = 'EUR'),
  checkout_session_id text unique,
  payment_intent_id text unique,
  charge_id text unique,
  transfer_group text not null,
  payment_method_type text,
  idempotency_key text not null unique,
  failure_code text,
  failure_message text,
  paid_at timestamptz,
  held_at timestamptz,
  released_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (booking_id, attempt_number)
);

create index payments_booking_status_idx on public.payments(booking_id, status);
create index payments_transfer_group_idx on public.payments(transfer_group);

create table public.platform_fees (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete restrict,
  payment_id uuid not null references public.payments(id) on delete restrict,
  fee_type text not null
    check (fee_type in ('guest_service', 'host_commission', 'provider_cost', 'tax_adjustment')),
  rate_bps integer check (rate_bps is null or rate_bps between 0 and 10000),
  amount_cents bigint not null,
  currency char(3) not null default 'EUR' check (currency = 'EUR'),
  status text not null default 'accrued'
    check (status in ('accrued', 'realized', 'reversed')),
  created_at timestamptz not null default now()
);

create index platform_fees_booking_type_idx
on public.platform_fees(booking_id, fee_type);
create index platform_fees_status_created_idx
on public.platform_fees(status, created_at);

create table public.payouts (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id) on delete restrict,
  host_id uuid not null references public.users(id) on delete restrict,
  payout_account_id uuid not null references public.payout_accounts(id) on delete restrict,
  status public.payout_status not null default 'not_ready',
  gross_host_cents bigint not null check (gross_host_cents >= 0),
  adjustment_cents bigint not null default 0,
  amount_cents bigint not null check (amount_cents >= 0),
  currency char(3) not null default 'EUR' check (currency = 'EUR'),
  scheduled_for timestamptz not null,
  provider_transfer_id text unique,
  provider_payout_id text unique,
  idempotency_key text not null unique,
  retry_count integer not null default 0 check (retry_count >= 0),
  failure_code text,
  failure_message text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint payouts_amount_check check (
    amount_cents = gross_host_cents + adjustment_cents
  )
);

create index payouts_status_schedule_idx
on public.payouts(status, scheduled_for);
create index payouts_host_created_idx
on public.payouts(host_id, created_at desc);

create table public.refunds (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete restrict,
  payment_id uuid not null references public.payments(id) on delete restrict,
  requested_by uuid not null references public.users(id) on delete restrict,
  approved_by uuid references public.users(id) on delete set null,
  status public.refund_status not null default 'requested',
  reason text not null,
  policy_result jsonb not null default '{}'::jsonb,
  amount_cents bigint not null check (amount_cents >= 0),
  currency char(3) not null default 'EUR' check (currency = 'EUR'),
  provider_refund_id text unique,
  idempotency_key text not null unique,
  requested_at timestamptz not null default now(),
  approved_at timestamptz,
  completed_at timestamptz,
  failure_message text
);

create index refunds_booking_status_idx on public.refunds(booking_id, status);
create index refunds_status_requested_idx on public.refunds(status, requested_at);

create table public.disputes (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete restrict,
  payment_id uuid not null references public.payments(id) on delete restrict,
  source text not null
    check (source in ('guest_claim', 'host_claim', 'damage_claim', 'chargeback')),
  status public.dispute_status not null default 'open',
  provider_dispute_id text unique,
  amount_cents bigint not null check (amount_cents >= 0),
  currency char(3) not null default 'EUR' check (currency = 'EUR'),
  reason text not null,
  evidence_due_at timestamptz,
  payout_paused boolean not null default true,
  assigned_admin_id uuid references public.users(id) on delete set null,
  resolution text,
  opened_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index disputes_status_evidence_idx
on public.disputes(status, evidence_due_at);
create index disputes_booking_idx on public.disputes(booking_id);
create index disputes_admin_status_idx
on public.disputes(assigned_admin_id, status);

create table public.security_deposits (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id) on delete restrict,
  status public.deposit_status not null default 'not_requested',
  amount_cents bigint not null check (amount_cents >= 0),
  currency char(3) not null default 'EUR' check (currency = 'EUR'),
  provider_setup_intent_id text unique,
  provider_payment_intent_id text unique,
  card_brand text,
  card_last4 char(4),
  authorization_expires_at timestamptz,
  claim_amount_cents bigint check (
    claim_amount_cents is null
    or (claim_amount_cents >= 0 and claim_amount_cents <= amount_cents)
  ),
  authorized_at timestamptz,
  released_at timestamptz,
  captured_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.booking_documents (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete restrict,
  document_type text not null
    check (document_type in ('boating_license', 'identity_verification')),
  provider_reference text,
  storage_path text,
  status text not null default 'requested'
    check (status in ('requested', 'pending', 'verified', 'rejected', 'expired')),
  expires_on date,
  verified_by uuid references public.users(id) on delete set null,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create index booking_documents_review_idx
on public.booking_documents(booking_id, status);

create table public.platform_settings (
  id uuid primary key default gen_random_uuid(),
  version text not null unique,
  guest_fee_bps integer not null default 800 check (guest_fee_bps between 0 and 10000),
  host_fee_bps integer not null default 500 check (host_fee_bps between 0 and 10000),
  cancellation_policy jsonb not null,
  payout_delay_hours integer not null default 24 check (payout_delay_hours >= 0),
  refund_approval_threshold_cents bigint not null default 0
    check (refund_approval_threshold_cents >= 0),
  effective_from timestamptz not null,
  effective_until timestamptz,
  updated_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint platform_settings_dates_check check (
    effective_until is null or effective_until > effective_from
  )
);

create index platform_settings_effective_idx
on public.platform_settings(effective_from desc, effective_until);

create trigger bookings_set_updated_at
before update on public.bookings
for each row execute function private.set_updated_at();
create trigger payments_set_updated_at
before update on public.payments
for each row execute function private.set_updated_at();
create trigger payouts_set_updated_at
before update on public.payouts
for each row execute function private.set_updated_at();
create trigger security_deposits_set_updated_at
before update on public.security_deposits
for each row execute function private.set_updated_at();
create trigger platform_settings_set_updated_at
before update on public.platform_settings
for each row execute function private.set_updated_at();
