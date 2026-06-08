create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete restrict,
  booking_id uuid references public.bookings(id) on delete set null,
  guest_id uuid not null references public.users(id) on delete restrict,
  host_id uuid not null references public.users(id) on delete restrict,
  status text not null default 'open'
    check (status in ('open', 'archived', 'blocked')),
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint conversations_participants_check check (guest_id <> host_id)
);

create unique index conversations_booking_unique_idx
on public.conversations(booking_id)
where booking_id is not null;
create index conversations_guest_recent_idx
on public.conversations(guest_id, last_message_at desc);
create index conversations_host_recent_idx
on public.conversations(host_id, last_message_at desc);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.users(id) on delete restrict,
  body text not null check (length(trim(body)) between 1 and 10000),
  attachments jsonb not null default '[]'::jsonb,
  system_message boolean not null default false,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index messages_conversation_created_idx
on public.messages(conversation_id, created_at);
create index messages_unread_idx
on public.messages(conversation_id, created_at)
where read_at is null;

create table public.favorites (
  user_id uuid not null references public.users(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

create index favorites_listing_idx on public.favorites(listing_id);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id) on delete restrict,
  listing_id uuid not null references public.listings(id) on delete restrict,
  reviewer_id uuid not null references public.users(id) on delete restrict,
  rating smallint not null check (rating between 1 and 5),
  cleanliness_rating smallint not null check (cleanliness_rating between 1 and 5),
  boat_rating smallint not null check (boat_rating between 1 and 5),
  comment text not null check (length(trim(comment)) between 10 and 5000),
  host_response text,
  status text not null default 'pending'
    check (status in ('pending', 'published', 'hidden')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index reviews_listing_status_idx
on public.reviews(listing_id, status, published_at desc);

create table public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  provider_event_id text not null unique,
  event_type text not null,
  provider_account_id text,
  livemode boolean not null,
  payload jsonb not null,
  status text not null default 'received'
    check (status in ('received', 'processing', 'processed', 'failed', 'ignored')),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  last_error text
);

create index webhook_events_status_received_idx
on public.webhook_events(status, received_at);
create index webhook_events_type_idx
on public.webhook_events(provider, event_type, received_at desc);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.users(id) on delete set null,
  actor_role text,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  request_id text,
  before_data jsonb,
  after_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create index audit_logs_entity_idx
on public.audit_logs(entity_type, entity_id, created_at desc);
create index audit_logs_actor_idx
on public.audit_logs(actor_user_id, created_at desc);
create index audit_logs_action_idx
on public.audit_logs(action, created_at desc);

revoke update, delete, truncate on public.audit_logs
from anon, authenticated;

create table public.outbox_jobs (
  id uuid primary key default gen_random_uuid(),
  job_type text not null,
  payload jsonb not null default '{}'::jsonb,
  status public.job_status not null default 'pending',
  dedupe_key text not null unique,
  run_after timestamptz not null default now(),
  locked_at timestamptz,
  locked_by text,
  attempts integer not null default 0 check (attempts >= 0),
  max_attempts integer not null default 10 check (max_attempts > 0),
  last_error text,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint outbox_attempts_check check (attempts <= max_attempts)
);

create index outbox_jobs_claim_idx
on public.outbox_jobs(status, run_after, created_at);

create trigger conversations_set_updated_at
before update on public.conversations
for each row execute function private.set_updated_at();
create trigger reviews_set_updated_at
before update on public.reviews
for each row execute function private.set_updated_at();
create trigger outbox_jobs_set_updated_at
before update on public.outbox_jobs
for each row execute function private.set_updated_at();
