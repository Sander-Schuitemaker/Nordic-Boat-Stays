create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_name text;
  v_language text;
begin
  v_name := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    nullif(split_part(new.email, '@', 1), ''),
    'Nieuwe gebruiker'
  );

  if length(v_name) < 2 then
    v_name := 'Nieuwe gebruiker';
  end if;

  v_language := coalesce(
    nullif(new.raw_user_meta_data ->> 'language', ''),
    'nl'
  );

  if v_language not in ('nl', 'no', 'sv', 'da', 'de', 'en', 'es', 'fr') then
    v_language := 'nl';
  end if;

  insert into public.users(
    id,
    email,
    full_name,
    role,
    status,
    locale,
    is_guest,
    is_host,
    is_admin,
    email_verified
  )
  values (
    new.id,
    new.email,
    v_name,
    'guest'::public.user_role,
    case
      when new.email_confirmed_at is null
        then 'pending_email_verification'::public.user_status
      else 'active'::public.user_status
    end,
    v_language,
    true,
    false,
    false,
    new.email_confirmed_at is not null
  );

  insert into public.user_profiles(user_id, language)
  values (new.id, v_language);

  insert into public.user_roles(user_id, role)
  values (new.id, 'guest'::public.user_role);

  insert into public.user_verifications(
    user_id,
    verification_type,
    provider,
    provider_reference,
    status,
    verified_at
  )
  values (
    new.id,
    'email',
    'supabase',
    new.id::text,
    case
      when new.email_confirmed_at is null
        then 'pending'::public.verification_status
      else 'approved'::public.verification_status
    end,
    new.email_confirmed_at
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

create or replace function private.sync_auth_user_status()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.users
  set
    email = coalesce(new.email, email),
    email_verified = new.email_confirmed_at is not null,
    status = case
      when new.email_confirmed_at is not null
        and status = 'pending_email_verification'
        then 'active'::public.user_status
      else status
    end,
    updated_at = now()
  where id = new.id;

  update public.user_verifications
  set
    status = case
      when new.email_confirmed_at is null
        then 'pending'::public.verification_status
      else 'approved'::public.verification_status
    end,
    verified_at = new.email_confirmed_at,
    updated_at = now()
  where provider = 'supabase'
    and provider_reference = new.id::text
    and verification_type = 'email';

  return new;
end;
$$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
after update of email, email_confirmed_at on auth.users
for each row execute function private.sync_auth_user_status();

create or replace function private.sync_user_role_summary()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_guest boolean;
  v_host boolean;
  v_admin boolean;
begin
  if tg_op = 'DELETE' then
    v_user_id := old.user_id;
  else
    v_user_id := new.user_id;
  end if;

  select
    coalesce(bool_or(role = 'guest'), false),
    coalesce(bool_or(role = 'host'), false),
    coalesce(bool_or(role = 'admin'), false)
  into v_guest, v_host, v_admin
  from public.user_roles
  where user_id = v_user_id
    and revoked_at is null;

  update public.users
  set
    is_guest = v_guest,
    is_host = v_host,
    is_admin = v_admin,
    role = case
      when v_admin then 'admin'::public.user_role
      when v_host then 'host'::public.user_role
      else 'guest'::public.user_role
    end,
    updated_at = now()
  where id = v_user_id;

  if tg_op = 'DELETE' then
    return old;
  end if;

  return new;
end;
$$;

drop trigger if exists user_roles_sync_summary on public.user_roles;
create trigger user_roles_sync_summary
after insert or update or delete on public.user_roles
for each row execute function private.sync_user_role_summary();

create or replace function private.has_role(required_role public.user_role)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.user_roles ur
    join public.users u on u.id = ur.user_id
    where ur.user_id = (select auth.uid())
      and ur.role = required_role
      and ur.revoked_at is null
      and u.status = 'active'
  )
$$;

create or replace function private.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = ''
as $$
  select case
    when private.has_role('admin'::public.user_role)
      then 'admin'::public.user_role
    when private.has_role('host'::public.user_role)
      then 'host'::public.user_role
    else 'guest'::public.user_role
  end
$$;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.has_role('admin'::public.user_role)
$$;

create or replace function private.require_admin_aal2()
returns void
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception using
      errcode = '42501',
      message = 'ADMIN_REQUIRED';
  end if;

  if coalesce(auth.jwt() ->> 'aal', 'aal1') <> 'aal2' then
    raise exception using
      errcode = '42501',
      message = 'AAL2_REQUIRED';
  end if;
end;
$$;

create or replace function public.apply_as_host(
  p_host_name text,
  p_host_type text,
  p_company_name text,
  p_country_code text,
  p_terms_version text
)
returns table (
  host_user_id uuid,
  host_status public.host_status
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_status public.host_status;
begin
  if v_user_id is null then
    raise exception using errcode = '42501', message = 'AUTH_REQUIRED';
  end if;

  if not exists (
    select 1
    from public.users
    where id = v_user_id
      and status = 'active'
      and email_verified
  ) then
    raise exception using
      errcode = '42501',
      message = 'VERIFIED_ACCOUNT_REQUIRED';
  end if;

  if p_host_type not in ('individual', 'company') then
    raise exception using errcode = '22023', message = 'INVALID_HOST_TYPE';
  end if;

  if p_host_type = 'company' and nullif(trim(p_company_name), '') is null then
    raise exception using errcode = '22023', message = 'COMPANY_NAME_REQUIRED';
  end if;

  insert into public.host_profiles(
    user_id,
    host_name,
    host_type,
    business_name,
    country_code,
    status,
    verification_status,
    platform_approved,
    terms_version,
    terms_accepted_at
  )
  values (
    v_user_id,
    trim(p_host_name),
    p_host_type,
    nullif(trim(p_company_name), ''),
    upper(p_country_code),
    'pending_verification',
    'pending',
    false,
    p_terms_version,
    now()
  )
  on conflict (user_id) do update
  set
    host_name = excluded.host_name,
    host_type = excluded.host_type,
    business_name = excluded.business_name,
    country_code = excluded.country_code,
    status = case
      when public.host_profiles.status in ('not_started', 'rejected')
        then 'pending_verification'::public.host_status
      else public.host_profiles.status
    end,
    verification_status = case
      when public.host_profiles.status in ('not_started', 'rejected')
        then 'pending'::public.host_verification_status
      else public.host_profiles.verification_status
    end,
    terms_version = excluded.terms_version,
    terms_accepted_at = excluded.terms_accepted_at,
    updated_at = now()
  returning status into v_status;

  insert into public.user_roles(user_id, role)
  values (v_user_id, 'host'::public.user_role)
  on conflict (user_id, role) where revoked_at is null do nothing;

  insert into public.audit_logs(
    actor_user_id,
    actor_role,
    action,
    entity_type,
    entity_id,
    target_user_id,
    metadata
  )
  values (
    v_user_id,
    private.current_user_role()::text,
    'host.application_submitted',
    'host_profile',
    v_user_id,
    v_user_id,
    jsonb_build_object('status', v_status)
  );

  return query select v_user_id, v_status;
end;
$$;

create or replace function public.admin_set_user_status(
  p_target_user_id uuid,
  p_status public.user_status,
  p_reason text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := auth.uid();
  v_before public.user_status;
begin
  perform private.require_admin_aal2();

  if p_status::text not in (
    'pending_email_verification',
    'active',
    'suspended',
    'deactivated',
    'deleted'
  ) then
    raise exception using errcode = '22023', message = 'INVALID_USER_STATUS';
  end if;

  if nullif(trim(p_reason), '') is null then
    raise exception using errcode = '22023', message = 'REASON_REQUIRED';
  end if;

  if p_target_user_id = v_actor and p_status <> 'active' then
    raise exception using errcode = '22023', message = 'CANNOT_RESTRICT_SELF';
  end if;

  select status into v_before
  from public.users
  where id = p_target_user_id
  for update;

  if not found then
    raise exception using errcode = 'P0002', message = 'USER_NOT_FOUND';
  end if;

  update public.users
  set status = p_status, updated_at = now()
  where id = p_target_user_id;

  insert into public.audit_logs(
    actor_user_id,
    actor_role,
    action,
    entity_type,
    entity_id,
    target_user_id,
    before_data,
    after_data,
    metadata
  )
  values (
    v_actor,
    'admin',
    'user.status_changed',
    'user',
    p_target_user_id,
    p_target_user_id,
    jsonb_build_object('status', v_before),
    jsonb_build_object('status', p_status),
    jsonb_build_object('reason', trim(p_reason))
  );
end;
$$;

create or replace function public.admin_set_user_role(
  p_target_user_id uuid,
  p_role public.user_role,
  p_enabled boolean,
  p_reason text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := auth.uid();
begin
  perform private.require_admin_aal2();

  if p_role = 'guest' and not p_enabled then
    raise exception using errcode = '22023', message = 'GUEST_ROLE_REQUIRED';
  end if;

  if nullif(trim(p_reason), '') is null then
    raise exception using errcode = '22023', message = 'REASON_REQUIRED';
  end if;

  if p_role = 'admin' and not p_enabled then
    if p_target_user_id = v_actor then
      raise exception using errcode = '22023', message = 'CANNOT_REMOVE_OWN_ADMIN';
    end if;

    if (
      select count(*)
      from public.user_roles
      where role = 'admin'
        and revoked_at is null
    ) <= 1 then
      raise exception using errcode = '22023', message = 'LAST_ADMIN_REQUIRED';
    end if;
  end if;

  if p_enabled then
    insert into public.user_roles(user_id, role, granted_by)
    values (p_target_user_id, p_role, v_actor)
    on conflict (user_id, role) where revoked_at is null do nothing;
  else
    update public.user_roles
    set revoked_at = now()
    where user_id = p_target_user_id
      and role = p_role
      and revoked_at is null;
  end if;

  insert into public.audit_logs(
    actor_user_id,
    actor_role,
    action,
    entity_type,
    entity_id,
    target_user_id,
    metadata
  )
  values (
    v_actor,
    'admin',
    case when p_enabled then 'user.role_granted' else 'user.role_revoked' end,
    'user',
    p_target_user_id,
    p_target_user_id,
    jsonb_build_object('role', p_role, 'reason', trim(p_reason))
  );
end;
$$;

create or replace function public.deactivate_my_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception using errcode = '42501', message = 'AUTH_REQUIRED';
  end if;

  if exists (
    select 1
    from public.bookings b
    left join public.listings l on l.id = b.listing_id
    where (b.guest_id = v_user_id or l.host_id = v_user_id)
      and b.status in (
        'pending_payment',
        'confirmed',
        'checked_in',
        'disputed'
      )
  ) then
    raise exception using
      errcode = 'P0001',
      message = 'ACCOUNT_HAS_ACTIVE_BOOKINGS';
  end if;

  if exists (
    select 1
    from public.payouts
    where host_id = v_user_id
      and status in ('scheduled', 'pending', 'failed', 'paused')
  ) then
    raise exception using
      errcode = 'P0001',
      message = 'ACCOUNT_HAS_OPEN_PAYOUTS';
  end if;

  update public.users
  set
    status = 'deactivated',
    deletion_requested_at = now(),
    updated_at = now()
  where id = v_user_id
    and status <> 'deleted';

  update public.user_sessions
  set revoked_at = coalesce(revoked_at, now())
  where user_id = v_user_id;

  insert into public.outbox_jobs(
    job_type,
    payload,
    dedupe_key,
    run_after
  )
  values (
    'anonymize_user',
    jsonb_build_object('user_id', v_user_id),
    'anonymize_user:' || v_user_id::text,
    now() + interval '30 days'
  )
  on conflict (dedupe_key) do nothing;

  insert into public.audit_logs(
    actor_user_id,
    actor_role,
    action,
    entity_type,
    entity_id,
    target_user_id,
    metadata
  )
  values (
    v_user_id,
    private.current_user_role()::text,
    'user.deactivation_requested',
    'user',
    v_user_id,
    v_user_id,
    jsonb_build_object('anonymize_after_days', 30)
  );
end;
$$;

revoke all on function private.has_role(public.user_role) from public;
revoke all on function private.require_admin_aal2() from public;
revoke all on function public.apply_as_host(text, text, text, text, text)
from public, anon;
revoke all on function public.admin_set_user_status(
  uuid,
  public.user_status,
  text
) from public, anon;
revoke all on function public.admin_set_user_role(
  uuid,
  public.user_role,
  boolean,
  text
) from public, anon;
revoke all on function public.deactivate_my_account() from public, anon;

grant execute on function private.has_role(public.user_role) to authenticated;
grant execute on function private.require_admin_aal2() to authenticated;
grant execute on function public.apply_as_host(text, text, text, text, text)
to authenticated;
grant execute on function public.admin_set_user_status(
  uuid,
  public.user_status,
  text
) to authenticated;
grant execute on function public.admin_set_user_role(
  uuid,
  public.user_role,
  boolean,
  text
) to authenticated;
grant execute on function public.deactivate_my_account() to authenticated;
