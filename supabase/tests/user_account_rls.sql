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
    '11000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'account-one@example.com',
    '',
    now(),
    '{}'::jsonb,
    '{"full_name":"Account One"}'::jsonb,
    now(),
    now()
  ),
  (
    '11000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'account-two@example.com',
    '',
    now(),
    '{}'::jsonb,
    '{"full_name":"Account Two"}'::jsonb,
    now(),
    now()
  );

select set_config(
  'request.jwt.claim.sub',
  '11000000-0000-0000-0000-000000000001',
  true
);
set local role authenticated;

do $$
begin
  if (
    select count(*)
    from public.users
  ) <> 1 then
    raise exception 'Account user can read another user row';
  end if;

  if (
    select count(*)
    from public.user_profiles
  ) <> 1 then
    raise exception 'Account user can read another profile';
  end if;

  begin
    insert into public.user_roles(user_id, role)
    values (
      '11000000-0000-0000-0000-000000000001',
      'admin'
    );
    raise exception 'Account user unexpectedly granted an admin role';
  exception
    when insufficient_privilege then
      null;
  end;

  begin
    insert into public.login_attempts(email_hash, success)
    values ('forbidden', false);
    raise exception 'Account user unexpectedly inserted login telemetry';
  exception
    when insufficient_privilege then
      null;
  end;
end;
$$;

rollback;
