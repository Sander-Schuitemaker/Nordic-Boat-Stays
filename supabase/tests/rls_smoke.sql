begin;

insert into auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
values
  (
    '10000000-0000-0000-0000-000000000011',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'host-rls@example.com',
    '',
    now(),
    '{}'::jsonb,
    '{"full_name":"RLS Host","requested_role":"host"}'::jsonb,
    now(),
    now()
  ),
  (
    '10000000-0000-0000-0000-000000000012',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'guest-rls@example.com',
    '',
    now(),
    '{}'::jsonb,
    '{"full_name":"RLS Guest","requested_role":"guest"}'::jsonb,
    now(),
    now()
  );

insert into public.listings (
  id,
  host_id,
  slug,
  status,
  title,
  description,
  region,
  county,
  municipality,
  city,
  public_location,
  base_price_cents,
  max_guests,
  bedrooms,
  bathrooms,
  house_rules,
  cancellation_policy_version
)
values (
  '20000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000011',
  'rls-test',
  'published',
  'RLS test',
  'Published test listing',
  'Lofoten',
  'Nordland',
  'Moskenes',
  'Reine',
  extensions.st_setsrid(
    extensions.st_makepoint(13.0896, 67.9324),
    4326
  )::extensions.geography,
  10000,
  2,
  1,
  1,
  'Test rules',
  'flexible-v1'
);

insert into public.listing_private_locations (
  listing_id,
  address_line_1,
  postal_code,
  exact_location
)
values (
  '20000000-0000-0000-0000-000000000011',
  'Exacte teststraat 1',
  '8390',
  extensions.st_setsrid(
    extensions.st_makepoint(13.0910, 67.9330),
    4326
  )::extensions.geography
);

insert into public.bookings (
  id,
  reference,
  listing_id,
  guest_id,
  status,
  check_in,
  check_out,
  guests,
  nightly_subtotal_cents,
  cleaning_fee_cents,
  boat_fee_cents,
  guest_service_fee_cents,
  host_commission_cents,
  total_cents,
  host_net_cents,
  cancellation_policy_version,
  pricing_version
)
values (
  '30000000-0000-0000-0000-000000000011',
  'NBS-RLSTEST001',
  '20000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000012',
  'confirmed',
  '2026-08-01',
  '2026-08-08',
  2,
  10000,
  0,
  0,
  0,
  0,
  10000,
  10000,
  'flexible-v1',
  'pricing-rules-v1'
);

set local role anon;

do $$
begin
  if (select count(*) from public.listings where slug = 'rls-test') <> 1 then
    raise exception 'Anonymous user cannot read published listing';
  end if;

  begin
    perform count(*) from public.listing_private_locations;
    raise exception 'Anonymous user unexpectedly read exact address';
  exception
    when insufficient_privilege then
      null;
  end;
end;
$$;

reset role;
select set_config(
  'request.jwt.claim.sub',
  '10000000-0000-0000-0000-000000000012',
  true
);
set local role authenticated;

do $$
declare
  changed_rows integer;
begin
  update public.listings
  set title = 'Unauthorized update'
  where id = '20000000-0000-0000-0000-000000000011';

  get diagnostics changed_rows = row_count;

  if changed_rows <> 0 then
    raise exception 'Guest unexpectedly updated another host listing';
  end if;

  begin
    insert into public.payments (
      booking_id,
      attempt_number,
      amount_cents,
      transfer_group,
      idempotency_key
    )
    values (
      '30000000-0000-0000-0000-000000000011',
      1,
      10000,
      'rls-test',
      'rls-test-payment'
    );

    raise exception 'Authenticated browser unexpectedly inserted a payment';
  exception
    when insufficient_privilege then
      null;
  end;
end;
$$;

rollback;
