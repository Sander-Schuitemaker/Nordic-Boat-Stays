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
values (
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'host@example.com',
  '',
  now(),
  '{}'::jsonb,
  '{"full_name":"Test Host","requested_role":"host"}'::jsonb,
  now(),
  now()
);

insert into public.listings (
  id,
  host_id,
  slug,
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
  '20000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'overlap-test',
  'Overlap test',
  'Test listing',
  'Lofoten',
  'Nordland',
  'Moskenes',
  'Reine',
  extensions.st_setsrid(
    extensions.st_makepoint(13.0896, 67.9324),
    4326
  )::extensions.geography,
  25000,
  4,
  2,
  1,
  'Test rules',
  'flexible-v1'
);

insert into public.availability (
  listing_id,
  date_range,
  block_type,
  status
)
values (
  '20000000-0000-0000-0000-000000000001',
  daterange('2026-07-01', '2026-07-08', '[)'),
  'host_block',
  'active'
);

do $$
begin
  begin
    insert into public.availability (
      listing_id,
      date_range,
      block_type,
      status
    )
    values (
      '20000000-0000-0000-0000-000000000001',
      daterange('2026-07-05', '2026-07-10', '[)'),
      'maintenance',
      'active'
    );

    raise exception 'Expected availability_no_overlap to reject overlap';
  exception
    when exclusion_violation then
      null;
  end;
end;
$$;

insert into public.availability (
  listing_id,
  date_range,
  block_type,
  status
)
values (
  '20000000-0000-0000-0000-000000000001',
  daterange('2026-07-08', '2026-07-10', '[)'),
  'maintenance',
  'active'
);

rollback;
