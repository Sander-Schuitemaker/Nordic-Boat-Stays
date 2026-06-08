alter table public.availability
add constraint availability_no_overlap
exclude using gist (
  listing_id with =,
  date_range with &&
)
where (status = 'active');

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_role public.user_role;
  requested_name text;
begin
  requested_role := case
    when new.raw_user_meta_data ->> 'requested_role' = 'host'
      then 'host'::public.user_role
    else 'guest'::public.user_role
  end;

  requested_name := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    nullif(split_part(new.email, '@', 1), ''),
    'Nieuwe gebruiker'
  );

  if length(requested_name) < 2 then
    requested_name := 'Nieuwe gebruiker';
  end if;

  insert into public.users(id, email, full_name, role)
  values (new.id, new.email, requested_name, requested_role);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

create or replace function private.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = ''
as $$
  select role
  from public.users
  where id = (select auth.uid())
    and status = 'active'
$$;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(private.current_user_role() = 'admin', false)
$$;

create or replace function private.owns_listing(target_listing_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_admin() or exists (
    select 1
    from public.listings
    where id = target_listing_id
      and host_id = (select auth.uid())
  )
$$;

create or replace function private.participates_in_booking(target_booking_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_admin() or exists (
    select 1
    from public.bookings b
    join public.listings l on l.id = b.listing_id
    where b.id = target_booking_id
      and (
        b.guest_id = (select auth.uid())
        or l.host_id = (select auth.uid())
      )
  )
$$;

create or replace function private.participates_in_conversation(target_conversation_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_admin() or exists (
    select 1
    from public.conversations
    where id = target_conversation_id
      and (
        guest_id = (select auth.uid())
        or host_id = (select auth.uid())
      )
  )
$$;

grant execute on function private.current_user_role() to authenticated;
grant execute on function private.is_admin() to authenticated;
grant execute on function private.owns_listing(uuid) to authenticated;
grant execute on function private.participates_in_booking(uuid) to authenticated;
grant execute on function private.participates_in_conversation(uuid) to authenticated;

create or replace function public.create_booking_hold(
  p_listing_id uuid,
  p_check_in date,
  p_check_out date,
  p_guests smallint,
  p_license_confirmed boolean default false
)
returns table (
  booking_id uuid,
  payment_id uuid,
  total_cents bigint,
  hold_expires_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_guest_id uuid := auth.uid();
  v_listing public.listings%rowtype;
  v_host public.host_profiles%rowtype;
  v_boat public.boat_details%rowtype;
  v_payout_account_id uuid;
  v_booking_id uuid := gen_random_uuid();
  v_payment_id uuid := gen_random_uuid();
  v_reference text;
  v_nights integer;
  v_nightly_subtotal bigint;
  v_cleaning_fee bigint;
  v_boat_fee bigint;
  v_booking_subtotal bigint;
  v_guest_fee_bps integer := 800;
  v_host_fee_bps integer := 500;
  v_guest_service_fee bigint;
  v_host_commission bigint;
  v_total bigint;
  v_host_net bigint;
  v_hold_expires_at timestamptz := now() + interval '30 minutes';
  v_cancellation_policy jsonb;
begin
  if v_guest_id is null then
    raise exception using errcode = 'P0001', message = 'AUTHENTICATION_REQUIRED';
  end if;

  if p_check_out <= p_check_in or p_check_in < current_date then
    raise exception using errcode = 'P0001', message = 'INVALID_DATES';
  end if;

  if p_guests <= 0 then
    raise exception using errcode = 'P0001', message = 'INVALID_GUEST_COUNT';
  end if;

  if not exists (
    select 1
    from public.users
    where id = v_guest_id and status = 'active'
  ) then
    raise exception using errcode = 'P0001', message = 'ACCOUNT_NOT_ACTIVE';
  end if;

  select *
  into v_listing
  from public.listings
  where id = p_listing_id
  for share;

  if not found or v_listing.status <> 'published' then
    raise exception using errcode = 'P0001', message = 'LISTING_NOT_BOOKABLE';
  end if;

  if not v_listing.direct_booking then
    raise exception using errcode = 'P0001', message = 'DIRECT_BOOKING_DISABLED';
  end if;

  if v_listing.host_id = v_guest_id then
    raise exception using errcode = 'P0001', message = 'HOST_CANNOT_BOOK_OWN_LISTING';
  end if;

  if p_guests > v_listing.max_guests then
    raise exception using errcode = 'P0001', message = 'TOO_MANY_GUESTS';
  end if;

  select *
  into v_host
  from public.host_profiles
  where user_id = v_listing.host_id;

  if not found
    or v_host.verification_status <> 'verified'
    or not v_host.platform_approved
  then
    raise exception using errcode = 'P0001', message = 'HOST_NOT_VERIFIED';
  end if;

  select id
  into v_payout_account_id
  from public.payout_accounts
  where host_id = v_listing.host_id
    and onboarding_complete
    and payouts_enabled
    and transfers_capability = 'active';

  if v_payout_account_id is null then
    raise exception using errcode = 'P0001', message = 'HOST_PAYOUT_NOT_READY';
  end if;

  select *
  into v_boat
  from public.boat_details
  where listing_id = p_listing_id;

  if not found or v_boat.insurance_status <> 'verified' then
    raise exception using errcode = 'P0001', message = 'BOAT_NOT_BOOKABLE';
  end if;

  if p_guests > v_boat.capacity then
    raise exception using errcode = 'P0001', message = 'BOAT_CAPACITY_TOO_LOW';
  end if;

  if v_boat.license_required and not p_license_confirmed then
    raise exception using errcode = 'P0001', message = 'BOATING_LICENSE_CONFIRMATION_REQUIRED';
  end if;

  select
    coalesce(ps.guest_fee_bps, 800),
    coalesce(ps.host_fee_bps, 500),
    ps.cancellation_policy
  into v_guest_fee_bps, v_host_fee_bps, v_cancellation_policy
  from public.platform_settings ps
  where ps.effective_from <= now()
    and (ps.effective_until is null or ps.effective_until > now())
  order by ps.effective_from desc
  limit 1;

  v_guest_fee_bps := coalesce(v_guest_fee_bps, 800);
  v_host_fee_bps := coalesce(v_host_fee_bps, 500);
  v_nights := p_check_out - p_check_in;

  select coalesce(sum(
    coalesce((
      select pr.nightly_price_cents
      from public.pricing_rules pr
      where pr.listing_id = p_listing_id
        and pr.active
        and pr.date_range @> stay_day::date
        and (
          pr.weekdays is null
          or extract(isodow from stay_day)::smallint = any(pr.weekdays)
        )
      order by pr.priority desc, pr.created_at desc
      limit 1
    ), v_listing.base_price_cents)
  ), 0)
  into v_nightly_subtotal
  from generate_series(
    p_check_in::timestamp,
    (p_check_out - 1)::timestamp,
    interval '1 day'
  ) as days(stay_day);

  select coalesce((
    select pr.cleaning_fee_override_cents
    from public.pricing_rules pr
    where pr.listing_id = p_listing_id
      and pr.active
      and pr.cleaning_fee_override_cents is not null
      and pr.date_range && daterange(p_check_in, p_check_out, '[)')
    order by pr.priority desc, pr.created_at desc
    limit 1
  ), v_listing.cleaning_fee_cents)
  into v_cleaning_fee;

  v_boat_fee := v_listing.mandatory_boat_fee_cents;
  v_booking_subtotal := v_nightly_subtotal + v_cleaning_fee + v_boat_fee;
  v_guest_service_fee := (v_booking_subtotal * v_guest_fee_bps + 5000) / 10000;
  v_host_commission := (v_booking_subtotal * v_host_fee_bps + 5000) / 10000;
  v_total := v_booking_subtotal + v_guest_service_fee;
  v_host_net := v_booking_subtotal - v_host_commission;
  v_reference := 'NBS-' || upper(substr(replace(v_booking_id::text, '-', ''), 1, 10));

  insert into public.bookings (
    id,
    reference,
    listing_id,
    guest_id,
    status,
    check_in,
    check_out,
    guests,
    currency,
    nightly_subtotal_cents,
    cleaning_fee_cents,
    boat_fee_cents,
    guest_service_fee_cents,
    host_commission_cents,
    tax_cents,
    total_cents,
    host_net_cents,
    guest_fee_bps,
    host_fee_bps,
    cancellation_policy_version,
    pricing_version,
    license_required,
    license_confirmed_at,
    payment_expires_at,
    payout_release_at
  )
  values (
    v_booking_id,
    v_reference,
    p_listing_id,
    v_guest_id,
    'pending_payment',
    p_check_in,
    p_check_out,
    p_guests,
    'EUR',
    v_nightly_subtotal,
    v_cleaning_fee,
    v_boat_fee,
    v_guest_service_fee,
    v_host_commission,
    0,
    v_total,
    v_host_net,
    v_guest_fee_bps,
    v_host_fee_bps,
    v_listing.cancellation_policy_version,
    'pricing-rules-v1',
    v_boat.license_required,
    case when v_boat.license_required then now() else null end,
    v_hold_expires_at,
    (p_check_in::timestamp at time zone v_listing.timezone) + interval '24 hours'
  );

  insert into public.booking_price_items (
    booking_id,
    item_type,
    label,
    quantity,
    unit_amount_cents,
    total_amount_cents,
    taxable
  )
  values
    (
      v_booking_id,
      'nightly_stay',
      'Verblijf',
      v_nights,
      case when v_nights > 0 then v_nightly_subtotal / v_nights else 0 end,
      v_nightly_subtotal,
      false
    ),
    (
      v_booking_id,
      'cleaning',
      'Schoonmaakkosten',
      1,
      v_cleaning_fee,
      v_cleaning_fee,
      false
    ),
    (
      v_booking_id,
      'boat',
      'Boot inbegrepen',
      1,
      v_boat_fee,
      v_boat_fee,
      false
    ),
    (
      v_booking_id,
      'guest_service',
      'Servicekosten',
      1,
      v_guest_service_fee,
      v_guest_service_fee,
      false
    );

  insert into public.payments (
    id,
    booking_id,
    attempt_number,
    status,
    amount_cents,
    currency,
    transfer_group,
    idempotency_key
  )
  values (
    v_payment_id,
    v_booking_id,
    1,
    'requires_payment',
    v_total,
    'EUR',
    v_booking_id::text,
    'booking:' || v_booking_id::text || ':payment:1'
  );

  insert into public.platform_fees (
    booking_id,
    payment_id,
    fee_type,
    rate_bps,
    amount_cents,
    currency
  )
  values
    (
      v_booking_id,
      v_payment_id,
      'guest_service',
      v_guest_fee_bps,
      v_guest_service_fee,
      'EUR'
    ),
    (
      v_booking_id,
      v_payment_id,
      'host_commission',
      v_host_fee_bps,
      v_host_commission,
      'EUR'
    );

  insert into public.payouts (
    booking_id,
    host_id,
    payout_account_id,
    status,
    gross_host_cents,
    adjustment_cents,
    amount_cents,
    currency,
    scheduled_for,
    idempotency_key
  )
  values (
    v_booking_id,
    v_listing.host_id,
    v_payout_account_id,
    'not_ready',
    v_host_net,
    0,
    v_host_net,
    'EUR',
    (p_check_in::timestamp at time zone v_listing.timezone) + interval '24 hours',
    'booking:' || v_booking_id::text || ':payout'
  );

  begin
    update public.availability
    set status = 'expired'
    where listing_id = p_listing_id
      and block_type = 'payment_hold'
      and status = 'active'
      and expires_at <= now();

    insert into public.availability (
      listing_id,
      booking_id,
      date_range,
      block_type,
      status,
      expires_at,
      created_by
    )
    values (
      p_listing_id,
      v_booking_id,
      daterange(p_check_in, p_check_out, '[)'),
      'payment_hold',
      'active',
      v_hold_expires_at,
      v_guest_id
    );
  exception
    when exclusion_violation then
      raise exception using errcode = 'P0001', message = 'DATES_UNAVAILABLE';
  end;

  insert into public.outbox_jobs (
    job_type,
    payload,
    dedupe_key,
    run_after
  )
  values (
    'expire_booking_hold',
    jsonb_build_object('booking_id', v_booking_id),
    'expire-booking-hold:' || v_booking_id::text,
    v_hold_expires_at
  );

  return query
  select v_booking_id, v_payment_id, v_total, v_hold_expires_at;
end;
$$;

revoke all on function public.create_booking_hold(uuid, date, date, smallint, boolean)
from public, anon;
grant execute on function public.create_booking_hold(uuid, date, date, smallint, boolean)
to authenticated;

create or replace function private.claim_outbox_jobs(p_limit integer default 25)
returns setof public.outbox_jobs
language sql
security definer
set search_path = ''
as $$
  with claimable as (
    select id
    from public.outbox_jobs
    where status in ('pending', 'failed')
      and run_after <= now()
      and attempts < max_attempts
    order by run_after, created_at
    for update skip locked
    limit greatest(1, least(p_limit, 100))
  )
  update public.outbox_jobs jobs
  set
    status = 'processing',
    attempts = jobs.attempts + 1,
    locked_at = now(),
    locked_by = current_setting('request.headers', true),
    updated_at = now()
  from claimable
  where jobs.id = claimable.id
  returning jobs.*
$$;

revoke all on function private.claim_outbox_jobs(integer)
from public, anon, authenticated;
grant execute on function private.claim_outbox_jobs(integer)
to service_role;
