# Nordic Boat Stays User Accounts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the remaining demo authentication with a secure Supabase account system supporting guest, host and admin access, profiles, recovery, deactivation and account-scoped marketplace data.

**Architecture:** Supabase Auth owns credentials and refresh sessions, while PostgreSQL stores application profiles, normalized roles, host status, session audit and security events. Next.js Server Actions and Route Handlers validate input with Zod, use cookie-based Supabase SSR sessions, and rely on Row Level Security as the final authorization boundary.

**Tech Stack:** Next.js 15 App Router, TypeScript, Supabase Auth/SSR/PostgreSQL/Storage, Zod, Tailwind CSS, shadcn-style components, Vitest, PostgreSQL pgTAP-style SQL tests.

---

## File Structure

### Database

- Create `supabase/migrations/202606090001_user_accounts.sql`: account enums, profiles, roles, sessions, verifications, login attempts and schema upgrades.
- Create `supabase/migrations/202606090002_user_account_functions.sql`: auth triggers, role sync, host application, admin mutations and deactivation RPCs.
- Create `supabase/migrations/202606090003_user_account_rls.sql`: privileges, RLS and avatar storage policies.
- Create `supabase/tests/user_accounts.sql`: trigger, role, host and deactivation database tests.
- Create `supabase/tests/user_account_rls.sql`: self-access, host, admin and participant isolation tests.
- Modify `src/lib/database.types.ts`: account table and RPC types until generated types are available.

### Auth domain

- Create `src/lib/auth/schemas.ts`: shared Zod schemas.
- Create `src/lib/auth/redirects.ts`: safe internal redirects.
- Create `src/lib/auth/authorization.ts`: normalized role/status decisions.
- Create `src/lib/auth/rate-limit.ts`: provider-neutral limiter boundary.
- Create `src/lib/auth/account-service.ts`: server-side account/profile/host/admin operations.
- Modify `src/lib/auth/user.ts`: role array, host status and email state.
- Modify `src/lib/auth.ts`: `requireVerifiedUser`, `requireHostProfile` and `requireAdmin`.
- Modify `src/lib/auth-actions.ts`: register, login, logout, recovery, profile, host and deactivation actions.
- Modify `src/lib/supabase/middleware.ts`: protected/auth-only routes and suspended-account handling.

### Pages and components

- Create `src/app/register/page.tsx`.
- Modify `src/app/login/page.tsx`.
- Create `src/app/forgot-password/page.tsx`.
- Create `src/app/reset-password/page.tsx`.
- Create `src/app/verify-email/page.tsx`.
- Create `src/app/auth/callback/route.ts`.
- Create `src/app/account/layout.tsx`.
- Create `src/app/account/page.tsx`.
- Create `src/app/account/profile/page.tsx`.
- Create `src/app/account/security/page.tsx`.
- Create `src/app/account/notifications/page.tsx`.
- Create `src/app/host/apply/page.tsx`.
- Create `src/app/admin/layout.tsx`.
- Create `src/app/admin/page.tsx`.
- Create `src/app/admin/users/page.tsx`.
- Create `src/app/admin/users/[id]/page.tsx`.
- Create `src/components/auth/auth-shell.tsx`.
- Split `src/components/auth/auth-forms.tsx` into focused login/register/recovery forms.
- Create `src/components/account/account-nav.tsx`.
- Create `src/components/account/profile-form.tsx`.
- Create `src/components/account/avatar-uploader.tsx`.
- Create `src/components/account/security-panel.tsx`.
- Create `src/components/host/host-application-form.tsx`.
- Create `src/components/admin/user-status-form.tsx`.
- Modify `src/app/layout.tsx`: account-aware navigation.
- Modify `src/components/dashboard/dashboard-nav.tsx`: host/profile/payout routes.

### Marketplace account data

- Modify `src/app/favorites/page.tsx`: Supabase RLS reads.
- Modify `src/app/messages/page.tsx`: conversation reads instead of Prisma messages.
- Modify `src/app/dashboard/page.tsx`: Supabase host summary.
- Modify `src/app/dashboard/bookings/page.tsx`: Supabase host booking reads.
- Create `src/app/bookings/page.tsx`: guest bookings and payment statuses.
- Create `src/lib/account-data.ts`: typed account-scoped queries.

### Documentation and tests

- Create `src/lib/auth/__tests__/schemas.test.ts`.
- Create `src/lib/auth/__tests__/redirects.test.ts`.
- Expand `src/lib/auth/__tests__/authorization.test.ts`.
- Create `src/lib/auth/__tests__/account-service.test.ts`.
- Create `src/lib/auth/__tests__/architecture.test.ts`.
- Modify `.env.example`, `README.md` and `docs/DEPLOYMENT.md`.

---

### Task 1: Account Validation and Redirect Contracts

**Files:**
- Create: `src/lib/auth/schemas.ts`
- Create: `src/lib/auth/redirects.ts`
- Test: `src/lib/auth/__tests__/schemas.test.ts`
- Test: `src/lib/auth/__tests__/redirects.test.ts`

- [ ] **Step 1: Write failing validation tests**

```ts
import { describe, expect, it } from "vitest";
import { registerSchema, profileSchema } from "@/lib/auth/schemas";

describe("registerSchema", () => {
  it("requires a strong password and accepted terms", () => {
    expect(registerSchema.safeParse({
      fullName: "Sander Schuit",
      email: "sander@example.com",
      password: "kort",
      acceptTerms: false,
    }).success).toBe(false);
  });

  it("normalizes a valid email address", () => {
    const result = registerSchema.parse({
      fullName: "Sander Schuit",
      email: " SANDER@EXAMPLE.COM ",
      password: "veilig-wachtwoord-2026",
      acceptTerms: true,
    });
    expect(result.email).toBe("sander@example.com");
  });
});

describe("profileSchema", () => {
  it("rejects future birth dates", () => {
    expect(profileSchema.safeParse({
      fullName: "Sander Schuit",
      dateOfBirth: "2999-01-01",
      language: "nl",
      preferredCurrency: "EUR",
    }).success).toBe(false);
  });
});
```

- [ ] **Step 2: Run tests and verify RED**

Run:

```bash
npm test -- src/lib/auth/__tests__/schemas.test.ts
```

Expected: FAIL because `@/lib/auth/schemas` does not exist.

- [ ] **Step 3: Implement the schemas**

```ts
import { z } from "zod";

const normalizedEmail = z.string().trim().email().transform((value) => value.toLowerCase());

export const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: normalizedEmail,
  password: z.string().min(12).max(128),
  acceptTerms: z.literal(true),
});

export const loginSchema = z.object({
  email: normalizedEmail,
  password: z.string().min(1).max(128),
  next: z.string().optional(),
});

export const profileSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().trim().max(32).optional(),
  dateOfBirth: z.string().date().optional().refine(
    (value) => !value || new Date(`${value}T00:00:00Z`) < new Date(),
    "Geboortedatum moet in het verleden liggen.",
  ),
  country: z.string().length(2).optional(),
  language: z.enum(["nl", "no", "sv", "da", "de", "en", "es", "fr"]),
  bio: z.string().trim().max(2000).optional(),
  preferredCurrency: z.enum(["EUR", "NOK"]),
});
```

- [ ] **Step 4: Add safe redirect tests and implementation**

```ts
import { expect, it } from "vitest";
import { safeInternalPath } from "@/lib/auth/redirects";

it("allows internal paths", () => {
  expect(safeInternalPath("/favorites?view=grid")).toBe("/favorites?view=grid");
});

it("rejects external and protocol-relative paths", () => {
  expect(safeInternalPath("https://evil.example")).toBeNull();
  expect(safeInternalPath("//evil.example")).toBeNull();
});
```

```ts
export function safeInternalPath(value: string | null | undefined): string | null {
  if (!value?.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return null;
  }
  return value;
}
```

- [ ] **Step 5: Run tests and commit**

```bash
npm test -- src/lib/auth/__tests__/schemas.test.ts src/lib/auth/__tests__/redirects.test.ts
git add src/lib/auth
git commit -m "feat: define account validation contracts"
```

Expected: both test files PASS.

### Task 2: PostgreSQL Account Schema

**Files:**
- Create: `supabase/migrations/202606090001_user_accounts.sql`
- Modify: `src/lib/database.types.ts`
- Test: `supabase/tests/user_accounts.sql`

- [ ] **Step 1: Write failing SQL assertions**

```sql
begin;
select plan(12);

select has_table('public', 'user_profiles');
select has_table('public', 'user_roles');
select has_table('public', 'user_sessions');
select has_table('public', 'user_verifications');
select has_table('public', 'login_attempts');
select has_column('public', 'users', 'is_guest');
select has_column('public', 'users', 'is_host');
select has_column('public', 'users', 'is_admin');
select col_is_pk('public', 'user_profiles', 'user_id');
select has_index('public', 'user_roles', 'user_roles_active_unique');
select has_index('public', 'login_attempts', 'login_attempts_email_created_idx');
select has_index('public', 'user_sessions', 'user_sessions_user_active_idx');

select * from finish();
rollback;
```

- [ ] **Step 2: Verify RED**

Run:

```bash
npx supabase test db supabase/tests/user_accounts.sql
```

Expected: FAIL because account tables and columns do not exist. If Docker is unavailable, validate the expected failure and continue with SQL parser verification.

- [ ] **Step 3: Create migration**

The migration must:

```sql
alter type public.user_status rename to user_status_old;
create type public.user_status as enum (
  'pending_email_verification', 'active', 'suspended', 'deactivated', 'deleted'
);

alter table public.users
  add column is_guest boolean not null default true,
  add column is_host boolean not null default false,
  add column is_admin boolean not null default false,
  add column email_verified boolean not null default false,
  add column phone_verified boolean not null default false,
  add column deletion_requested_at timestamptz,
  add column anonymized_at timestamptz;

create table public.user_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  date_of_birth date check (date_of_birth is null or date_of_birth < current_date),
  country char(2),
  language varchar(5) not null default 'nl',
  bio text check (bio is null or length(bio) <= 2000),
  emergency_contact jsonb not null default '{}'::jsonb,
  preferred_currency char(3) not null default 'EUR'
    check (preferred_currency in ('EUR', 'NOK')),
  notification_preferences jsonb not null default
    '{"booking":true,"messages":true,"marketing":false}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  role public.user_role not null,
  granted_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);

create unique index user_roles_active_unique
on public.user_roles(user_id, role) where revoked_at is null;
```

Also create the remaining columns/tables/indexes exactly as specified in the approved design, migrate old status values transactionally, and upgrade `host_profiles` without losing existing data.

- [ ] **Step 4: Extend hand-maintained database types**

Add `UserProfileRow`, `UserRoleRow`, `UserSessionRow`, `UserVerificationRow`, and account RPC definitions to `src/lib/database.types.ts`.

- [ ] **Step 5: Parse SQL, run typecheck and commit**

```bash
npm run typecheck
npx supabase db lint
git add supabase/migrations/202606090001_user_accounts.sql supabase/tests/user_accounts.sql src/lib/database.types.ts
git commit -m "feat: add production account schema"
```

Expected: TypeScript passes; SQL parsing/linting passes when the local database is available.

### Task 3: Auth Triggers, Roles and Account RPCs

**Files:**
- Create: `supabase/migrations/202606090002_user_account_functions.sql`
- Expand: `supabase/tests/user_accounts.sql`

- [ ] **Step 1: Add failing behavior tests**

```sql
select lives_ok(
  $$ insert into auth.users(id, email, raw_user_meta_data)
     values ('00000000-0000-0000-0000-000000000101', 'guest@example.com',
             '{"full_name":"Nieuwe Gast"}') $$,
  'auth user creation succeeds'
);

select results_eq(
  $$ select role::text from public.user_roles
     where user_id = '00000000-0000-0000-0000-000000000101'
       and revoked_at is null $$,
  array['guest'],
  'new users receive only guest role'
);
```

- [ ] **Step 2: Verify RED**

Run `npx supabase test db supabase/tests/user_accounts.sql`.

Expected: FAIL because the old trigger still supports `requested_role=host` and no normalized role sync exists.

- [ ] **Step 3: Implement secure functions**

Create:

```sql
create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users(
    id, email, full_name, role, status, is_guest, email_verified
  ) values (
    new.id,
    new.email,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), 'Nieuwe gebruiker'),
    'guest',
    case when new.email_confirmed_at is null
      then 'pending_email_verification'::public.user_status
      else 'active'::public.user_status end,
    true,
    new.email_confirmed_at is not null
  );
  insert into public.user_profiles(user_id) values (new.id);
  insert into public.user_roles(user_id, role) values (new.id, 'guest');
  return new;
end;
$$;
```

Also implement:

- `private.sync_auth_user_status()` for confirmation changes.
- `private.has_role(public.user_role)`.
- `public.apply_as_host(...)` that adds host role and pending profile atomically.
- `public.deactivate_my_account()` with active booking/refund/dispute checks.
- `private.admin_set_user_status(...)` with admin/AAL2 checks and audit insert.
- `private.admin_set_user_role(...)` preventing removal of the last admin.
- trigger to keep summary role booleans synchronized.

- [ ] **Step 4: Run database tests and commit**

```bash
npx supabase test db supabase/tests/user_accounts.sql
git add supabase/migrations/202606090002_user_account_functions.sql supabase/tests/user_accounts.sql
git commit -m "feat: secure account roles and lifecycle"
```

Expected: account behavior tests PASS.

### Task 4: Account RLS and Avatar Storage

**Files:**
- Create: `supabase/migrations/202606090003_user_account_rls.sql`
- Create: `supabase/tests/user_account_rls.sql`

- [ ] **Step 1: Write failing isolation tests**

```sql
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000101', true);

select results_eq(
  $$ select id from public.users order by id $$,
  array['00000000-0000-0000-0000-000000000101'::uuid],
  'user only sees own account'
);

select is_empty(
  $$ select * from public.user_sessions
     where user_id = '00000000-0000-0000-0000-000000000102' $$,
  'user cannot see another account sessions'
);
```

- [ ] **Step 2: Verify RED**

Run `npx supabase test db supabase/tests/user_account_rls.sql`.

Expected: FAIL until policies exist.

- [ ] **Step 3: Add privileges and policies**

Use cached auth checks and indexed columns:

```sql
alter table public.user_profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.user_sessions enable row level security;
alter table public.user_verifications enable row level security;
alter table public.login_attempts enable row level security;

create policy user_profiles_self_select
on public.user_profiles for select to authenticated
using (user_id = (select auth.uid()) or (select private.is_admin()));

create policy user_profiles_self_update
on public.user_profiles for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));
```

Browser users receive no direct write grants for roles, status, sessions, verification, login attempts or audit logs. Add private `avatars` bucket policies requiring first path segment to equal `auth.uid()`.

- [ ] **Step 4: Run RLS tests and commit**

```bash
npx supabase test db supabase/tests/user_account_rls.sql
git add supabase/migrations/202606090003_user_account_rls.sql supabase/tests/user_account_rls.sql
git commit -m "feat: enforce account row security"
```

Expected: isolation tests PASS.

### Task 5: Authorization Model and Middleware

**Files:**
- Modify: `src/lib/auth/user.ts`
- Create: `src/lib/auth/authorization.ts`
- Modify: `src/lib/auth.ts`
- Modify: `src/lib/supabase/middleware.ts`
- Test: `src/lib/auth/__tests__/authorization.test.ts`

- [ ] **Step 1: Write failing role/status tests**

```ts
it("allows one account to be both guest and host", () => {
  expect(canAccessHost({
    status: "active",
    roles: ["guest", "host"],
    hostStatus: "pending_verification",
  })).toBe(true);
});

it("requires verified host for publishing", () => {
  expect(canPublishListing({
    status: "active",
    roles: ["guest", "host"],
    hostStatus: "pending_verification",
  })).toBe(false);
});

it("requires active admin and aal2", () => {
  expect(canPerformAdminAction({
    status: "active",
    roles: ["guest", "admin"],
    assuranceLevel: "aal1",
  })).toBe(false);
});
```

- [ ] **Step 2: Verify RED**

```bash
npm test -- src/lib/auth/__tests__/authorization.test.ts
```

Expected: FAIL because current users have one role and no host status.

- [ ] **Step 3: Implement normalized authorization**

```ts
export type AppRole = "guest" | "host" | "admin";
export type UserStatus =
  | "pending_email_verification"
  | "active"
  | "suspended"
  | "deactivated"
  | "deleted";

export function hasRole(roles: AppRole[], role: AppRole) {
  return roles.includes(role);
}

export function canAccessHost(user: AuthorizationContext) {
  return user.status === "active" && hasRole(user.roles, "host");
}
```

Update `getCurrentUser()` to load active `user_roles` plus host status. Add `requireVerifiedUser`, `requireHostProfile`, and AAL2-aware `requireAdmin`.

- [ ] **Step 4: Protect routes**

Middleware route groups:

```ts
const protectedRouteRoots = [
  "/account", "/bookings", "/favorites", "/messages", "/host", "/dashboard", "/admin"
] as const;

const authOnlyRoutes = ["/login", "/register", "/forgot-password"] as const;
```

Middleware only verifies the Auth session. Role/status enforcement stays server-side in layouts and actions.

- [ ] **Step 5: Test and commit**

```bash
npm test -- src/lib/auth/__tests__/authorization.test.ts src/lib/supabase/__tests__/middleware.test.ts
npm run typecheck
git add src/lib/auth src/lib/supabase/middleware.ts
git commit -m "feat: authorize multi-role accounts"
```

### Task 6: Registration, Login and E-mail Callback

**Files:**
- Modify: `src/lib/auth-actions.ts`
- Create: `src/app/register/page.tsx`
- Modify: `src/app/login/page.tsx`
- Create: `src/app/auth/callback/route.ts`
- Create: `src/app/verify-email/page.tsx`
- Refactor: `src/components/auth/auth-forms.tsx`
- Create: `src/components/auth/auth-shell.tsx`
- Test: `src/lib/auth/__tests__/account-service.test.ts`

- [ ] **Step 1: Write failing registration contract tests**

Use injected Auth dependencies so tests cover payloads without mocking application logic:

```ts
it("never sends a requested role during sign-up", async () => {
  const auth = new RecordingAuthGateway();
  await registerUser(auth, {
    fullName: "Nieuwe Gast",
    email: "gast@example.com",
    password: "veilig-wachtwoord-2026",
    acceptTerms: true,
  }, "https://example.com/auth/callback");

  expect(auth.lastSignUp?.metadata).toEqual({ full_name: "Nieuwe Gast" });
});
```

- [ ] **Step 2: Verify RED**

Run `npm test -- src/lib/auth/__tests__/account-service.test.ts`.

Expected: FAIL because `registerUser` and the gateway do not exist.

- [ ] **Step 3: Implement account service and actions**

Registration uses:

```ts
await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${appUrl}/auth/callback?next=/account`,
    data: { full_name: fullName },
  },
});
```

Login must use the safe redirect helper, reject non-active profiles, update `last_login_at`, and return neutral Dutch errors.

- [ ] **Step 4: Implement pages**

- `/register`: separate form, password requirements, terms checkbox.
- `/login`: login only, links to register and forgot password.
- `/auth/callback`: exchange `code` with `exchangeCodeForSession`, sanitize `next`.
- `/verify-email`: confirmation instructions and resend action.

- [ ] **Step 5: Verify and commit**

```bash
npm test -- src/lib/auth
npm run typecheck
git add src/app/login src/app/register src/app/auth src/app/verify-email src/components/auth src/lib/auth-actions.ts src/lib/auth
git commit -m "feat: add verified account registration"
```

### Task 7: Password Recovery and Session Security

**Files:**
- Create: `src/app/forgot-password/page.tsx`
- Create: `src/app/reset-password/page.tsx`
- Create: `src/components/auth/recovery-forms.tsx`
- Modify: `src/lib/auth-actions.ts`
- Create: `src/components/account/security-panel.tsx`

- [ ] **Step 1: Add failing recovery tests**

```ts
it("returns the same public result for every reset request", async () => {
  expect(await publicPasswordResetResult()).toEqual({
    message: "Als dit e-mailadres bestaat, ontvang je zo een herstelmail.",
  });
});
```

- [ ] **Step 2: Verify RED, implement and verify GREEN**

```bash
npm test -- src/lib/auth/__tests__/account-service.test.ts
```

Implement `resetPasswordForEmail` with `/auth/callback?next=/reset-password`, validate new passwords with the shared schema, call `auth.updateUser`, then sign out other sessions.

- [ ] **Step 3: Build recovery pages**

Both forms use pending, success and field error states. The reset page rejects missing recovery sessions and links back to `/forgot-password`.

- [ ] **Step 4: Test and commit**

```bash
npm test -- src/lib/auth
npm run typecheck
git add src/app/forgot-password src/app/reset-password src/components/auth src/components/account src/lib/auth-actions.ts
git commit -m "feat: add secure password recovery"
```

### Task 8: Account Profile, Avatar and Navigation

**Files:**
- Create: account pages/components listed in File Structure
- Modify: `src/app/layout.tsx`
- Modify: `src/lib/auth-actions.ts`
- Test: `src/lib/auth/__tests__/account-service.test.ts`

- [ ] **Step 1: Write failing profile permission tests**

```ts
it("only emits user-editable profile columns", () => {
  expect(toProfileUpdate(validProfileInput)).toEqual({
    full_name: "Sander Schuit",
    phone_e164: "+31612345678",
    locale: "nl",
  });
  expect(toProfileUpdate(validProfileInput)).not.toHaveProperty("status");
  expect(toProfileUpdate(validProfileInput)).not.toHaveProperty("is_admin");
});
```

- [ ] **Step 2: Verify RED and implement mappers/actions**

Profile writes update `users` and `user_profiles` through RLS. Avatar upload accepts JPEG/PNG/WebP, maximum 5 MB, stores `${user.id}/avatar-${crypto.randomUUID()}.webp`, updates `avatar_path`, then deletes the previous object.

- [ ] **Step 3: Build account pages**

`/account` shows profile completeness, future bookings, unread messages and current roles. Separate profile, security and notification pages use `AccountNav`.

- [ ] **Step 4: Update navigation**

Logged-out: `Inloggen` and `Registreren`.  
Logged-in: avatar/name menu, account, bookings, favorites, messages, role-aware dashboard and logout.

- [ ] **Step 5: Test and commit**

```bash
npm test -- src/lib/auth
npm run typecheck
git add src/app/account src/app/layout.tsx src/components/account src/lib/auth-actions.ts
git commit -m "feat: add account profile management"
```

### Task 9: Host Application and Role Switching

**Files:**
- Create: `src/app/host/apply/page.tsx`
- Create: `src/components/host/host-application-form.tsx`
- Modify: `src/lib/auth-actions.ts`
- Modify: `src/app/dashboard/layout.tsx`
- Modify: `src/components/dashboard/dashboard-nav.tsx`

- [ ] **Step 1: Add failing host application tests**

```ts
it("creates a pending host without removing guest access", async () => {
  const result = await applyAsHost(service, guestUser, validHostApplication);
  expect(result.roles).toEqual(["guest", "host"]);
  expect(result.hostStatus).toBe("pending_verification");
});
```

- [ ] **Step 2: Verify RED and implement action**

Call `public.apply_as_host` rather than separate client inserts. Duplicate calls must return the existing host profile.

- [ ] **Step 3: Build host states**

- no profile: `/dashboard` redirects to `/host/apply`;
- pending: dashboard visible with verification banner; publish/payout disabled;
- verified: full host dashboard;
- rejected/restricted/suspended: reason-safe banner and support link.

- [ ] **Step 4: Test and commit**

```bash
npm test -- src/lib/auth
npm run typecheck
git add src/app/host src/app/dashboard/layout.tsx src/components/host src/components/dashboard src/lib/auth-actions.ts
git commit -m "feat: add host application workflow"
```

### Task 10: Account-Scoped Favorites, Bookings and Messages

**Files:**
- Create: `src/lib/account-data.ts`
- Modify: `src/app/favorites/page.tsx`
- Create: `src/app/bookings/page.tsx`
- Modify: `src/app/messages/page.tsx`
- Modify: `src/app/dashboard/page.tsx`
- Modify: `src/app/dashboard/bookings/page.tsx`
- Test: `src/lib/auth/__tests__/architecture.test.ts`

- [ ] **Step 1: Write failing architecture test**

```ts
it("does not use Prisma in account-scoped routes", async () => {
  for (const file of accountRouteFiles) {
    expect(await readFile(file, "utf8")).not.toContain("@/lib/db");
    expect(await readFile(file, "utf8")).not.toContain("prisma.");
  }
});
```

- [ ] **Step 2: Verify RED**

Run `npm test -- src/lib/auth/__tests__/architecture.test.ts`.

Expected: FAIL for messages and dashboard routes.

- [ ] **Step 3: Implement Supabase queries**

Use browser-safe RLS queries:

```ts
export async function getMyConversations(userId: string) {
  const supabase = await createServerSupabaseClient();
  return supabase
    .from("conversations")
    .select("id, listing_id, guest_id, host_id, status, updated_at, messages(*)")
    .or(`guest_id.eq.${userId},host_id.eq.${userId}`)
    .order("updated_at", { ascending: false });
}
```

Never accept a user ID from query/form data; use the authenticated user ID.

- [ ] **Step 4: Add loading/empty/error states**

Use `loading.tsx` files and calm Dutch empty states for account pages.

- [ ] **Step 5: Test and commit**

```bash
npm test -- src/lib/auth/__tests__/architecture.test.ts
npm run typecheck
git add src/lib/account-data.ts src/app/favorites src/app/bookings src/app/messages src/app/dashboard
git commit -m "feat: scope marketplace data to Supabase accounts"
```

### Task 11: Admin Dashboard and Audited Mutations

**Files:**
- Create: admin pages/components listed in File Structure
- Create: `src/app/api/admin/users/[id]/role/route.ts`
- Create: `src/app/api/admin/users/[id]/status/route.ts`
- Modify: `src/lib/auth/account-service.ts`

- [ ] **Step 1: Write failing admin authorization tests**

```ts
it("rejects admin mutation at aal1", async () => {
  await expect(setUserStatus({
    actor: adminAtAal1,
    targetUserId,
    status: "suspended",
    reason: "Fraudeonderzoek",
  })).rejects.toThrow("Extra beveiligingscontrole vereist.");
});
```

- [ ] **Step 2: Verify RED and implement service**

Route handlers:

- call `requireAdmin({ assuranceLevel: "aal2" })`;
- parse Zod body;
- call admin RPC;
- return sanitized JSON;
- never expose service keys or raw database errors.

- [ ] **Step 3: Build admin UI**

`/admin/users` uses server-side `q`, `role`, `status`, `page` filters. User detail shows roles, status, host verification and latest audit entries. Destructive actions require a reason and confirmation.

- [ ] **Step 4: Test and commit**

```bash
npm test -- src/lib/auth
npm run typecheck
git add src/app/admin src/app/api/admin src/components/admin src/lib/auth
git commit -m "feat: add audited admin account management"
```

### Task 12: Account Deactivation and Retention

**Files:**
- Modify: `src/app/account/security/page.tsx`
- Modify: `src/components/account/security-panel.tsx`
- Modify: `src/lib/auth-actions.ts`
- Expand: `supabase/tests/user_accounts.sql`

- [ ] **Step 1: Add failing lifecycle tests**

```sql
select throws_ok(
  $$ select public.deactivate_my_account() $$,
  'P0001',
  'ACCOUNT_HAS_ACTIVE_BOOKINGS',
  'active bookings block deactivation'
);
```

- [ ] **Step 2: Verify RED and implement UI/action**

Require the user to type `VERWIJDER MI`, call the RPC, sign out globally, and show a neutral completion page. Never delete `auth.users` directly from the browser.

- [ ] **Step 3: Add anonymization outbox job**

On successful deactivation insert deduplicated job:

```sql
insert into public.outbox_jobs(job_type, payload, dedupe_key, run_after)
values (
  'anonymize_user',
  jsonb_build_object('user_id', auth.uid()),
  'anonymize_user:' || auth.uid()::text,
  now() + interval '30 days'
);
```

- [ ] **Step 4: Test and commit**

```bash
npx supabase test db supabase/tests/user_accounts.sql
npm test -- src/lib/auth
git add src/app/account src/components/account src/lib/auth-actions.ts supabase
git commit -m "feat: add compliant account deactivation"
```

### Task 13: Configuration, Documentation and Static Demo Retirement

**Files:**
- Modify: `.env.example`
- Modify: `README.md`
- Modify: `docs/DEPLOYMENT.md`
- Modify: `netlify.toml`
- Modify: `website/login.html` and auth sections in `website/app.js` to show that the static demo is archived and direct account actions to the Next.js app

- [ ] **Step 1: Add required configuration**

Document:

```dotenv
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
SUPABASE_SECRET_KEY="sb_secret_..."
AUTH_RATE_LIMIT_SECRET="generate-at-least-32-random-bytes"
```

Supabase redirect allowlist:

```text
http://localhost:3000/auth/callback
https://staging.example.com/auth/callback
https://nordicboatstays.example/auth/callback
```

- [ ] **Step 2: Configure deployment**

Make Next.js the Netlify publish target only after the account pages pass staging verification. The old static demo receives an explicit archived/demo notice or is removed from the production deploy path.

- [ ] **Step 3: Document manual provider setup**

README must cover:

- create Supabase project;
- apply migrations;
- enable confirm email;
- configure SMTP;
- set Site URL and redirect allowlist;
- create first admin via protected SQL/CLI;
- configure avatar bucket;
- configure Netlify environment variables.

- [ ] **Step 4: Commit**

```bash
git add .env.example README.md docs/DEPLOYMENT.md netlify.toml website
git commit -m "docs: configure production account deployment"
```

### Task 14: Final Verification

**Files:**
- No planned production files; fix only concrete verification failures.

- [ ] **Step 1: Run unit and architecture tests**

```bash
npm test
```

Expected: all tests PASS.

- [ ] **Step 2: Run typecheck and production build**

```bash
npm run typecheck
npm run build
```

Expected: exit code 0.

- [ ] **Step 3: Reset and test database**

```bash
npx supabase db reset
npx supabase test db
```

Expected: migrations, seed and all account/RLS tests PASS. If Docker is unavailable, run against linked staging before deployment and record the blocker explicitly.

- [ ] **Step 4: Browser verification**

Verify desktop and mobile:

```text
register -> verify e-mail -> login -> profile -> host apply
forgot password -> callback -> reset -> login
guest blocked from admin
pending host sees restricted dashboard state
favorites/bookings/messages contain only own data
deactivation blocked with active booking
```

- [ ] **Step 5: Security checks**

```bash
npm audit --omit=dev
git diff --check
rg -n "demo1234|nordicBoatSession|mockLogin|mockRegister|localStorage.*session" src
```

Expected: zero production vulnerabilities, clean diff, and no Next.js production auth using localStorage or demo credentials. The archived static demo is excluded from the deployment target and is visibly marked as non-production.

- [ ] **Step 6: Record result**

Update this plan with:

- test counts;
- migrations applied;
- browser flows checked;
- external Supabase/SMTP blockers;
- exact staging URL;
- remaining production-hardening work.

## Verification Result - 2026-06-09

- Unit and architecture tests: `78/78` passed across `16` test files.
- TypeScript: `npm run typecheck` passed.
- Production build: `npm run build` passed and generated all account, host and admin routes.
- Dependency audit: `npm audit --omit=dev` reported `0` vulnerabilities.
- SQL syntax: account migrations `202606090001` through `202606090003` parsed successfully with `libpg_query`.
- Browser QA: registration, unavailable-Supabase feedback, login, password recovery, missing recovery session, protected account redirect and protected admin redirect were checked without console errors.
- Responsive QA: the registration surface reported no horizontal overflow at `375px` and `1440px`.
- Screenshot blocker: the in-app browser DOM and console APIs worked, but `Page.captureScreenshot` timed out.
- Database runtime blocker: Docker is not installed in the current environment, so `supabase db reset` and pgTAP/RLS execution were not run locally.
- External staging blocker: no Supabase staging project, SMTP credentials or staging URL are configured in this workspace.
- Required staging checks: apply all migrations, run pgTAP/RLS tests, verify real e-mail callbacks, test TOTP/AAL2 admin mutations, and validate user isolation with at least two real accounts.
