alter table public.users enable row level security;
alter table public.host_profiles enable row level security;
alter table public.payout_accounts enable row level security;
alter table public.listings enable row level security;
alter table public.listing_private_locations enable row level security;
alter table public.listing_images enable row level security;
alter table public.boat_details enable row level security;
alter table public.listing_documents enable row level security;
alter table public.amenities enable row level security;
alter table public.listing_amenities enable row level security;
alter table public.availability enable row level security;
alter table public.pricing_rules enable row level security;
alter table public.listing_translations enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_price_items enable row level security;
alter table public.payments enable row level security;
alter table public.platform_fees enable row level security;
alter table public.payouts enable row level security;
alter table public.refunds enable row level security;
alter table public.disputes enable row level security;
alter table public.security_deposits enable row level security;
alter table public.booking_documents enable row level security;
alter table public.platform_settings enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.favorites enable row level security;
alter table public.reviews enable row level security;
alter table public.webhook_events enable row level security;
alter table public.audit_logs enable row level security;
alter table public.outbox_jobs enable row level security;

revoke all on all tables in schema public from anon, authenticated;
grant usage on schema public to anon, authenticated;

grant select on public.listings to anon, authenticated;
grant select on public.listing_images to anon, authenticated;
grant select on public.boat_details to anon, authenticated;
grant select on public.amenities to anon, authenticated;
grant select on public.listing_amenities to anon, authenticated;
grant select on public.listing_translations to anon, authenticated;
grant select on public.reviews to anon, authenticated;

grant select on public.users to authenticated;
grant update (full_name, avatar_path, locale, phone_e164) on public.users to authenticated;
grant select, insert on public.host_profiles to authenticated;
grant update (
  display_name,
  legal_entity_type,
  business_name,
  country_code,
  terms_version,
  terms_accepted_at
) on public.host_profiles to authenticated;
grant select on public.payout_accounts to authenticated;

grant insert on public.listings to authenticated;
grant update (
  slug,
  title,
  description,
  region,
  county,
  municipality,
  city,
  public_location,
  timezone,
  currency,
  base_price_cents,
  cleaning_fee_cents,
  mandatory_boat_fee_cents,
  max_guests,
  bedrooms,
  bathrooms,
  check_in_time,
  check_out_time,
  pets_allowed,
  waterfront,
  private_dock,
  sauna_hot_tub,
  direct_booking,
  house_rules,
  cancellation_policy_version
) on public.listings to authenticated;

grant select, insert, update, delete on public.listing_private_locations to authenticated;
grant insert, delete on public.listing_images to authenticated;
grant update (
  storage_path,
  alt_text,
  sort_order,
  width,
  height,
  crop
) on public.listing_images to authenticated;
grant insert, delete on public.boat_details to authenticated;
grant update (
  boat_type,
  make,
  model,
  build_year,
  capacity,
  engine_power_hp,
  license_required,
  license_category,
  safety_equipment,
  deposit_cents,
  rules
) on public.boat_details to authenticated;
grant select, insert, update, delete on public.listing_documents to authenticated;
grant insert, delete on public.listing_amenities to authenticated;
grant select, insert, update, delete on public.availability to authenticated;
grant select, insert, update, delete on public.pricing_rules to authenticated;
grant insert, update, delete on public.listing_translations to authenticated;

grant select on public.bookings to authenticated;
grant select on public.booking_price_items to authenticated;
grant select on public.booking_documents to authenticated;
grant select on public.platform_settings to authenticated;
grant select, insert on public.conversations to authenticated;
grant update (status) on public.conversations to authenticated;
grant select, insert on public.messages to authenticated;
grant update (read_at) on public.messages to authenticated;
grant select, insert, delete on public.favorites to authenticated;
grant insert on public.reviews to authenticated;

create policy users_select_self
on public.users for select
to authenticated
using (id = (select auth.uid()) or private.is_admin());

create policy users_update_self
on public.users for update
to authenticated
using (id = (select auth.uid()) and status = 'active')
with check (id = (select auth.uid()) and status = 'active');

create policy host_profiles_select_self
on public.host_profiles for select
to authenticated
using (user_id = (select auth.uid()) or private.is_admin());

create policy host_profiles_insert_self
on public.host_profiles for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and verification_status = 'not_started'
  and not platform_approved
);

create policy host_profiles_update_self
on public.host_profiles for update
to authenticated
using (user_id = (select auth.uid()))
with check (
  user_id = (select auth.uid())
  and verification_status in ('not_started', 'pending', 'verified', 'restricted', 'rejected')
);

create policy payout_accounts_select_self
on public.payout_accounts for select
to authenticated
using (host_id = (select auth.uid()) or private.is_admin());

create policy listings_public_read
on public.listings for select
to anon, authenticated
using (status = 'published');

create policy listings_owner_read
on public.listings for select
to authenticated
using (host_id = (select auth.uid()) or private.is_admin());

create policy listings_owner_insert
on public.listings for insert
to authenticated
with check (
  host_id = (select auth.uid())
  and status in ('draft', 'pending_review')
  and private.current_user_role() = 'host'
  and approved_by is null
  and approved_at is null
  and published_at is null
  and archived_at is null
);

create policy listings_owner_update
on public.listings for update
to authenticated
using (
  host_id = (select auth.uid())
  and status in ('draft', 'pending_review', 'rejected', 'paused')
)
with check (
  host_id = (select auth.uid())
  and status in ('draft', 'pending_review', 'rejected', 'paused')
);

create policy listing_private_locations_authorized_read
on public.listing_private_locations for select
to authenticated
using (
  private.owns_listing(listing_id)
  or exists (
    select 1
    from public.bookings b
    where b.listing_id = listing_id
      and b.guest_id = (select auth.uid())
      and b.status in ('confirmed', 'checked_in', 'completed')
  )
);

create policy listing_private_locations_owner_write
on public.listing_private_locations for all
to authenticated
using (private.owns_listing(listing_id))
with check (private.owns_listing(listing_id));

create policy listing_images_public_read
on public.listing_images for select
to anon, authenticated
using (
  moderation_status = 'approved'
  and exists (
    select 1
    from public.listings l
    where l.id = listing_id and l.status = 'published'
  )
);

create policy listing_images_owner_read
on public.listing_images for select
to authenticated
using (private.owns_listing(listing_id));

create policy listing_images_owner_insert
on public.listing_images for insert
to authenticated
with check (
  private.owns_listing(listing_id)
  and moderation_status = 'pending'
);

create policy listing_images_owner_update
on public.listing_images for update
to authenticated
using (private.owns_listing(listing_id))
with check (private.owns_listing(listing_id));

create policy listing_images_owner_delete
on public.listing_images for delete
to authenticated
using (private.owns_listing(listing_id));

create policy boat_details_public_read
on public.boat_details for select
to anon, authenticated
using (
  exists (
    select 1
    from public.listings l
    where l.id = listing_id and l.status = 'published'
  )
);

create policy boat_details_owner_insert
on public.boat_details for insert
to authenticated
with check (
  private.owns_listing(listing_id)
  and insurance_status = 'pending'
);

create policy boat_details_owner_update
on public.boat_details for update
to authenticated
using (private.owns_listing(listing_id))
with check (private.owns_listing(listing_id));

create policy boat_details_owner_delete
on public.boat_details for delete
to authenticated
using (private.owns_listing(listing_id));

create policy listing_documents_owner_read
on public.listing_documents for select
to authenticated
using (private.owns_listing(listing_id) or private.is_admin());

create policy listing_documents_owner_write
on public.listing_documents for all
to authenticated
using (private.owns_listing(listing_id))
with check (
  private.owns_listing(listing_id)
  and verification_status = 'pending'
  and verified_by is null
  and verified_at is null
);

create policy amenities_public_read
on public.amenities for select
to anon, authenticated
using (true);

create policy listing_amenities_public_read
on public.listing_amenities for select
to anon, authenticated
using (
  exists (
    select 1
    from public.listings l
    where l.id = listing_id and l.status = 'published'
  )
);

create policy listing_amenities_owner_write
on public.listing_amenities for all
to authenticated
using (private.owns_listing(listing_id))
with check (private.owns_listing(listing_id));

create policy availability_participant_read
on public.availability for select
to authenticated
using (
  private.owns_listing(listing_id)
  or (booking_id is not null and private.participates_in_booking(booking_id))
);

create policy availability_owner_manual_write
on public.availability for all
to authenticated
using (
  private.owns_listing(listing_id)
  and booking_id is null
  and block_type in ('host_block', 'boat_block', 'maintenance')
)
with check (
  private.owns_listing(listing_id)
  and booking_id is null
  and block_type in ('host_block', 'boat_block', 'maintenance')
  and created_by = (select auth.uid())
);

create policy pricing_rules_owner_read
on public.pricing_rules for select
to authenticated
using (private.owns_listing(listing_id));

create policy pricing_rules_owner_write
on public.pricing_rules for all
to authenticated
using (private.owns_listing(listing_id))
with check (private.owns_listing(listing_id));

create policy listing_translations_public_read
on public.listing_translations for select
to anon, authenticated
using (
  exists (
    select 1
    from public.listings l
    where l.id = listing_id and l.status = 'published'
  )
);

create policy listing_translations_owner_write
on public.listing_translations for all
to authenticated
using (private.owns_listing(listing_id))
with check (
  private.owns_listing(listing_id)
  and source in ('automatic', 'host')
);

create policy bookings_participant_read
on public.bookings for select
to authenticated
using (private.participates_in_booking(id));

create policy booking_price_items_participant_read
on public.booking_price_items for select
to authenticated
using (private.participates_in_booking(booking_id));

create policy booking_documents_participant_read
on public.booking_documents for select
to authenticated
using (
  user_id = (select auth.uid())
  or private.participates_in_booking(booking_id)
);

create policy platform_settings_authenticated_read
on public.platform_settings for select
to authenticated
using (effective_from <= now());

create policy conversations_participant_read
on public.conversations for select
to authenticated
using (private.participates_in_conversation(id));

create policy conversations_participant_update
on public.conversations for update
to authenticated
using (private.participates_in_conversation(id))
with check (private.participates_in_conversation(id));

create policy conversations_participant_insert
on public.conversations for insert
to authenticated
with check (
  guest_id = (select auth.uid())
  and exists (
    select 1
    from public.listings l
    where l.id = listing_id
      and l.host_id = host_id
      and l.status = 'published'
  )
);

create policy messages_participant_read
on public.messages for select
to authenticated
using (private.participates_in_conversation(conversation_id));

create policy messages_participant_insert
on public.messages for insert
to authenticated
with check (
  sender_id = (select auth.uid())
  and not system_message
  and private.participates_in_conversation(conversation_id)
);

create policy messages_recipient_mark_read
on public.messages for update
to authenticated
using (
  sender_id <> (select auth.uid())
  and private.participates_in_conversation(conversation_id)
)
with check (private.participates_in_conversation(conversation_id));

create policy favorites_owner_read
on public.favorites for select
to authenticated
using (user_id = (select auth.uid()));

create policy favorites_owner_insert
on public.favorites for insert
to authenticated
with check (user_id = (select auth.uid()));

create policy favorites_owner_delete
on public.favorites for delete
to authenticated
using (user_id = (select auth.uid()));

create policy reviews_public_read
on public.reviews for select
to anon, authenticated
using (status = 'published');

create policy reviews_reviewer_read
on public.reviews for select
to authenticated
using (reviewer_id = (select auth.uid()) or private.is_admin());

create policy reviews_completed_booking_insert
on public.reviews for insert
to authenticated
with check (
  reviewer_id = (select auth.uid())
  and status = 'pending'
  and exists (
    select 1
    from public.bookings b
    where b.id = booking_id
      and b.listing_id = listing_id
      and b.guest_id = (select auth.uid())
      and b.status = 'completed'
  )
);

create policy reviews_host_response_update
on public.reviews for update
to authenticated
using (
  exists (
    select 1
    from public.listings l
    where l.id = listing_id
      and l.host_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.listings l
    where l.id = listing_id
      and l.host_id = (select auth.uid())
  )
);

grant update (host_response) on public.reviews to authenticated;

create view public.published_listing_catalog
with (security_invoker = true)
as
select
  l.id,
  l.slug,
  l.title,
  l.description,
  l.region,
  l.county,
  l.municipality,
  l.city,
  l.public_location,
  l.currency,
  l.base_price_cents,
  l.cleaning_fee_cents,
  l.mandatory_boat_fee_cents,
  l.max_guests,
  l.bedrooms,
  l.bathrooms,
  l.pets_allowed,
  l.waterfront,
  l.private_dock,
  l.sauna_hot_tub,
  l.direct_booking,
  l.published_at,
  b.boat_type,
  b.capacity as boat_capacity,
  b.engine_power_hp,
  b.license_required,
  coalesce(r.rating, 0)::numeric(3, 2) as rating,
  coalesce(r.review_count, 0)::bigint as review_count
from public.listings l
join public.boat_details b on b.listing_id = l.id
left join lateral (
  select avg(rv.rating) as rating, count(*) as review_count
  from public.reviews rv
  where rv.listing_id = l.id and rv.status = 'published'
) r on true
where l.status = 'published';

create view public.published_listing_images
with (security_invoker = true)
as
select
  i.id,
  i.listing_id,
  i.storage_path,
  i.alt_text,
  i.sort_order,
  i.width,
  i.height,
  i.crop
from public.listing_images i
join public.listings l on l.id = i.listing_id
where l.status = 'published'
  and i.moderation_status = 'approved';

grant select on public.published_listing_catalog to anon, authenticated;
grant select on public.published_listing_images to anon, authenticated;

insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'listing-images',
    'listing-images',
    false,
    15728640,
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'private-documents',
    'private-documents',
    false,
    10485760,
    array['application/pdf', 'image/jpeg', 'image/png']
  )
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy listing_images_storage_public_read
on storage.objects for select
to anon, authenticated
using (
  bucket_id = 'listing-images'
  and exists (
    select 1
    from public.listing_images i
    join public.listings l on l.id = i.listing_id
    where i.storage_path = name
      and i.moderation_status = 'approved'
      and l.status = 'published'
  )
);

create policy listing_images_storage_owner_insert
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'listing-images'
  and exists (
    select 1
    from public.listings l
    where l.id::text = (storage.foldername(name))[1]
      and l.host_id = (select auth.uid())
  )
);

create policy listing_images_storage_owner_update
on storage.objects for update
to authenticated
using (
  bucket_id = 'listing-images'
  and exists (
    select 1
    from public.listings l
    where l.id::text = (storage.foldername(name))[1]
      and l.host_id = (select auth.uid())
  )
)
with check (
  bucket_id = 'listing-images'
  and exists (
    select 1
    from public.listings l
    where l.id::text = (storage.foldername(name))[1]
      and l.host_id = (select auth.uid())
  )
);

create policy listing_images_storage_owner_delete
on storage.objects for delete
to authenticated
using (
  bucket_id = 'listing-images'
  and exists (
    select 1
    from public.listings l
    where l.id::text = (storage.foldername(name))[1]
      and l.host_id = (select auth.uid())
  )
);
