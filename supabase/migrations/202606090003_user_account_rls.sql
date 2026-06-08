alter table public.user_profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.user_sessions enable row level security;
alter table public.user_verifications enable row level security;
alter table public.login_attempts enable row level security;

revoke all on public.user_profiles from anon, authenticated;
revoke all on public.user_roles from anon, authenticated;
revoke all on public.user_sessions from anon, authenticated;
revoke all on public.user_verifications from anon, authenticated;
revoke all on public.login_attempts from anon, authenticated;

grant select on public.user_profiles to authenticated;
grant update (
  date_of_birth,
  country,
  language,
  bio,
  emergency_contact,
  preferred_currency,
  notification_preferences
) on public.user_profiles to authenticated;

grant select on public.user_roles to authenticated;
grant select on public.user_sessions to authenticated;
grant select on public.user_verifications to authenticated;

revoke all on public.host_profiles from anon, authenticated;
grant select on public.host_profiles to authenticated;
grant update (
  host_name,
  host_type,
  business_name,
  country_code,
  terms_version,
  terms_accepted_at
) on public.host_profiles to authenticated;

drop policy if exists user_profiles_self_select on public.user_profiles;
create policy user_profiles_self_select
on public.user_profiles for select
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

drop policy if exists user_profiles_self_update on public.user_profiles;
create policy user_profiles_self_update
on public.user_profiles for update
to authenticated
using (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.users
    where id = (select auth.uid())
      and status = 'active'
  )
)
with check (user_id = (select auth.uid()));

drop policy if exists user_roles_self_select on public.user_roles;
create policy user_roles_self_select
on public.user_roles for select
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

drop policy if exists user_sessions_self_select on public.user_sessions;
create policy user_sessions_self_select
on public.user_sessions for select
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

drop policy if exists user_verifications_self_select
on public.user_verifications;
create policy user_verifications_self_select
on public.user_verifications for select
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

drop policy if exists login_attempts_admin_select on public.login_attempts;
create policy login_attempts_admin_select
on public.login_attempts for select
to authenticated
using ((select private.is_admin()));

drop policy if exists audit_logs_admin_select on public.audit_logs;
create policy audit_logs_admin_select
on public.audit_logs for select
to authenticated
using ((select private.is_admin()));

grant select on public.audit_logs to authenticated;

drop policy if exists host_profiles_insert_self on public.host_profiles;

drop policy if exists host_profiles_select_self on public.host_profiles;
create policy host_profiles_select_self
on public.host_profiles for select
to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

drop policy if exists host_profiles_update_self on public.host_profiles;
create policy host_profiles_update_self
on public.host_profiles for update
to authenticated
using (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.users
    where id = (select auth.uid())
      and status = 'active'
  )
)
with check (user_id = (select auth.uid()));

insert into storage.buckets(
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'avatars',
  'avatars',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists avatars_owner_select on storage.objects;
create policy avatars_owner_select
on storage.objects for select
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists avatars_owner_insert on storage.objects;
create policy avatars_owner_insert
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists avatars_owner_update on storage.objects;
create policy avatars_owner_update
on storage.objects for update
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists avatars_owner_delete on storage.objects;
create policy avatars_owner_delete
on storage.objects for delete
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
