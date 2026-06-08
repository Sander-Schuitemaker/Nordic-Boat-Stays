# Production Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the mock authentication and payment foundations with a deployable Next.js 15, Supabase/PostgreSQL and Stripe Connect base without disrupting the currently deployed static demo.

**Architecture:** The Next.js application becomes the production application while `website/` remains the temporary static production deploy. Supabase Auth supplies cookie-based sessions, versioned SQL migrations define the marketplace data model and RLS, and a provider-neutral payment interface isolates Stripe Connect. This phase establishes secure boundaries and tests; booking checkout and the full UI migration are implemented in later plans.

**Tech Stack:** Next.js 15, React 19, TypeScript, Zod, Supabase Auth/PostgreSQL/Storage, Stripe SDK, Vitest, Netlify

---

## File Structure

Create:

- `src/lib/env.ts`: validated public and server environment configuration.
- `src/lib/supabase/client.ts`: browser Supabase client.
- `src/lib/supabase/server.ts`: request-scoped server Supabase client.
- `src/lib/supabase/admin.ts`: server-only privileged client.
- `src/lib/supabase/middleware.ts`: session refresh helper.
- `src/lib/database.types.ts`: initial generated-shape TypeScript database types.
- `src/lib/auth/user.ts`: application user and role lookup.
- `src/lib/payments/types.ts`: provider-neutral payment contracts.
- `src/lib/payments/stripe.ts`: Stripe SDK singleton and account helpers.
- `src/lib/payments/provider.ts`: production and unavailable-provider selection.
- `src/lib/payments/unavailable-provider.ts`: explicit development fallback.
- `src/lib/money.ts`: integer money and commission calculations.
- `src/middleware.ts`: Supabase cookie refresh and protected-route redirect.
- `supabase/config.toml`: local Supabase project configuration.
- `supabase/migrations/202606080001_extensions_enums.sql`: extensions and enums.
- `supabase/migrations/202606080002_core_schema.sql`: users, hosts, listings, boats and availability.
- `supabase/migrations/202606080003_booking_finance_schema.sql`: bookings and financial tables.
- `supabase/migrations/202606080004_communication_audit_schema.sql`: messages, reviews, webhooks, audit and jobs.
- `supabase/migrations/202606080005_constraints_functions.sql`: booking overlap constraint and helper functions.
- `supabase/migrations/202606080006_rls.sql`: grants and RLS policies.
- `src/lib/__tests__/env.test.ts`: environment validation tests.
- `src/lib/__tests__/money.test.ts`: fee calculation tests.
- `src/lib/payments/__tests__/provider.test.ts`: safe provider selection tests.
- `src/lib/auth/__tests__/authorization.test.ts`: role authorization tests.
- `vitest.config.ts`: test runner configuration.

Modify:

- `package.json`: dependencies and test/typecheck scripts.
- `.env.example`: Supabase and Stripe variables with no secrets.
- `.gitignore`: local Supabase and test artifacts.
- `src/lib/auth.ts`: compatibility facade backed by Supabase.
- `src/lib/auth-actions.ts`: Supabase login, registration and logout.
- `src/components/auth/auth-forms.tsx`: production password rules and e-mail confirmation feedback.
- `src/app/layout.tsx`: application user shape and logout behavior.
- `src/app/dashboard/layout.tsx`: server-side host/admin guard.
- `README.md`: local Supabase and Stripe sandbox instructions.

Delete only after all imports are migrated:

- `src/lib/password.ts`
- `src/lib/payment-service.ts`

Keep for now:

- `prisma/`: temporary read-path compatibility until the listing migration plan.
- `website/`: current public static demo.

---

### Task 1: Add Test and Integration Dependencies

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [x] **Step 1: Add scripts and dependencies**

Add these scripts:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "typecheck": "tsc --noEmit",
  "supabase:start": "supabase start",
  "supabase:stop": "supabase stop",
  "supabase:reset": "supabase db reset",
  "supabase:types": "supabase gen types typescript --local > src/lib/database.types.ts"
}
```

Add runtime dependencies:

```text
@supabase/ssr
@supabase/supabase-js
stripe
server-only
```

Add development dependencies:

```text
supabase
vitest
```

- [x] **Step 2: Configure Vitest**

Create `vitest.config.ts` with Node environment, `@` alias to `src`, and test inclusion under `src/**/*.test.ts`.

- [x] **Step 3: Install packages**

Run:

```bash
npm install
```

Expected: a new `package-lock.json`, successful dependency resolution and no install failure.

- [x] **Step 4: Verify the empty harness**

Run:

```bash
npm test -- --passWithNoTests
```

Expected: exit code 0.

- [x] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add production integration tooling"
```

### Task 2: Add Strict Environment Validation

**Files:**
- Create: `src/lib/__tests__/env.test.ts`
- Create: `src/lib/env.ts`
- Modify: `.env.example`

- [x] **Step 1: Write failing tests**

Test these cases:

```ts
expect(parsePublicEnv({})).toEqual({ configured: false, url: null, publishableKey: null });

expect(() =>
  parseServerEnv({
    NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
    SUPABASE_SECRET_KEY: "",
    STRIPE_SECRET_KEY: "sk_live_example",
    STRIPE_WEBHOOK_SECRET: "whsec_example"
  })
).toThrow();
```

Also test that valid sandbox values parse and secrets are never returned by `parsePublicEnv`.

- [x] **Step 2: Confirm failure**

Run:

```bash
npx vitest run src/lib/__tests__/env.test.ts
```

Expected: FAIL because `src/lib/env.ts` does not exist.

- [x] **Step 3: Implement environment schemas**

Use Zod schemas with these variables:

```text
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_CONNECT_WEBHOOK_SECRET
STRIPE_API_VERSION
```

Rules:

- Public config can be absent during the compatibility period and returns `configured: false`.
- Server config is required only when a server integration is invoked.
- Production Stripe secrets must start with `sk_live_`; development accepts `sk_test_`.
- Webhook secrets start with `whsec_`.
- No secret value appears in thrown error messages.

- [x] **Step 4: Expand `.env.example`**

Use obvious placeholders only:

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_replace_me"
SUPABASE_SECRET_KEY="sb_secret_replace_me"
STRIPE_SECRET_KEY="sk_test_replace_me"
STRIPE_WEBHOOK_SECRET="whsec_replace_me"
STRIPE_CONNECT_WEBHOOK_SECRET="whsec_replace_me"
STRIPE_API_VERSION="2026-02-25.clover"
```

- [x] **Step 5: Run tests**

Run:

```bash
npx vitest run src/lib/__tests__/env.test.ts
```

Expected: PASS.

- [x] **Step 6: Commit**

```bash
git add .env.example src/lib/env.ts src/lib/__tests__/env.test.ts
git commit -m "feat: validate production environment"
```

### Task 3: Add Supabase Clients and Session Proxy

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/admin.ts`
- Create: `src/lib/supabase/middleware.ts`
- Create: `src/middleware.ts`

- [x] **Step 1: Implement the browser client**

`createBrowserClient` uses only the public URL and publishable key. When Supabase is not configured, do not instantiate a client; callers receive an explicit configuration error.

- [x] **Step 2: Implement the server client**

Use `createServerClient` with `next/headers` cookies. Cookie writes must be wrapped because Server Components cannot always set cookies.

- [x] **Step 3: Implement the admin client**

Import `server-only`. Use `SUPABASE_SECRET_KEY`, disable session persistence and never export it from a client component.

- [x] **Step 4: Implement session refresh**

The helper creates a Supabase server client from `NextRequest` and `NextResponse`, calls `auth.getUser()`, and forwards refreshed cookies.

- [x] **Step 5: Add `src/middleware.ts`**

Match all application routes except static assets. Refresh authentication cookies and redirect unauthenticated users away from:

```text
/dashboard
/favorites
/messages
/bookings
```

Do not authorize host/admin roles in proxy; role authorization remains server-side.

- [x] **Step 6: Typecheck**

Run:

```bash
npm run typecheck
```

Expected: PASS.

- [x] **Step 7: Commit**

```bash
git add src/lib/supabase src/middleware.ts
git commit -m "feat: add Supabase SSR clients"
```

### Task 4: Create Marketplace Database Migrations

**Files:**
- Create: `supabase/config.toml`
- Create: `supabase/migrations/202606080001_extensions_enums.sql`
- Create: `supabase/migrations/202606080002_core_schema.sql`
- Create: `supabase/migrations/202606080003_booking_finance_schema.sql`
- Create: `supabase/migrations/202606080004_communication_audit_schema.sql`

- [x] **Step 1: Initialize local Supabase configuration**

Set project ID `nordic-boat-stays`, API port `54321`, database port `54322`, Studio port `54323`, and enable e-mail confirmations in production documentation while local development uses the test mail server.

- [x] **Step 2: Add extensions and enums**

Enable:

```sql
create extension if not exists citext;
create extension if not exists btree_gist;
create extension if not exists postgis;
create extension if not exists pgcrypto;
```

Create all enums from the approved design: user role/status, host verification, listing status, booking status, payment status, payout status, refund status, availability type/status, boat type, dispute status, deposit status and job status.

- [x] **Step 3: Add identity and listing schema**

Create:

```text
users
host_profiles
payout_accounts
listings
listing_private_locations
listing_images
boat_details
listing_documents
amenities
listing_amenities
availability
pricing_rules
listing_translations
```

Use UUID foreign keys, cent amounts, basis-point fees, Oslo-local dates, PostGIS points and the indexes in the approved specification.

- [x] **Step 4: Add booking and finance schema**

Create:

```text
bookings
booking_price_items
payments
platform_fees
payouts
refunds
disputes
security_deposits
booking_documents
platform_settings
```

Add check constraints for positive amounts, valid date order and allowed percentages. `payments.transfer_group` is indexed but not unique because retries share the booking group.

- [x] **Step 5: Add communication and operations schema**

Create:

```text
conversations
messages
favorites
reviews
webhook_events
audit_logs
outbox_jobs
```

Make webhook event IDs and outbox deduplication keys unique. Revoke updates and deletes from audit logs for application roles.

- [ ] **Step 6: Reset local database (blocked: Docker is not installed)**

Run:

```bash
npx supabase start
npx supabase db reset
```

Expected: every migration applies without SQL errors.

- [x] **Step 7: Add generated-shape types (regenerate with CLI when Docker is available)**

Run:

```bash
npm run supabase:types
```

Expected: `src/lib/database.types.ts` contains all public tables and enums.

- [x] **Step 8: Commit**

```bash
git add supabase src/lib/database.types.ts
git commit -m "feat: add marketplace database schema"
```

### Task 5: Enforce Availability and Server-Side Business Rules

**Files:**
- Create: `supabase/migrations/202606080005_constraints_functions.sql`

- [x] **Step 1: Add the overlap constraint**

Create the partial GiST exclusion constraint:

```sql
alter table public.availability
add constraint availability_no_overlap
exclude using gist (
  listing_id with =,
  date_range with &&
)
where (status = 'active');
```

- [x] **Step 2: Add `handle_new_user` trigger**

Insert `public.users` after a new `auth.users` row. Accept only `guest` or `host` from metadata and default to `guest`. Never permit signup metadata to create an admin.

- [x] **Step 3: Add authorization helpers**

Create private or security-definer helpers with fixed search paths:

```text
private.current_user_role()
private.is_admin()
private.owns_listing(uuid)
private.participates_in_booking(uuid)
private.participates_in_conversation(uuid)
```

- [x] **Step 4: Add `create_booking_hold` RPC**

The function validates listing status, max guests, host verification and date order; calculates the immutable base fee snapshot; creates `pending_payment` booking/payment/payout rows; inserts a 30-minute availability hold; and returns booking and payment IDs. An overlap raises a stable `DATES_UNAVAILABLE` error.

- [x] **Step 5: Add job claim function**

Create `private.claim_outbox_jobs(limit integer)` using `FOR UPDATE SKIP LOCKED`. Increment attempts and set `locked_at`.

- [x] **Step 6: Add database-level verification tests**

Use a SQL test script or `psql` commands to insert two overlapping active periods for the same listing. The first insert succeeds and the second fails with `availability_no_overlap`. A non-overlapping range succeeds.

- [ ] **Step 7: Reset and verify (blocked: Docker is not installed; SQL parser passes)**

Run:

```bash
npx supabase db reset
```

Expected: migrations apply and the overlap reproduction behaves as specified.

- [x] **Step 8: Commit**

```bash
git add supabase/migrations/202606080005_constraints_functions.sql
git commit -m "feat: enforce booking availability"
```

### Task 6: Add RLS and Storage Policies

**Files:**
- Create: `supabase/migrations/202606080006_rls.sql`

- [x] **Step 1: Enable RLS**

Enable RLS on every exposed public table.

- [x] **Step 2: Grant minimum privileges**

- `anon`: read approved public listing views only.
- `authenticated`: limited reads/writes subject to RLS.
- No browser writes to payments, payouts, platform fees, webhooks or audit logs.

- [x] **Step 3: Add guest policies**

Users can read/update allowed fields on their own profile, manage their favorites, read their own bookings and financial summaries, and participate only in their own conversations.

- [x] **Step 4: Add host policies**

Hosts can manage only their own draft listing content, images, amenities, price rules and manual blocks. They cannot approve listings, change financial snapshots or overwrite confirmed booking blocks.

- [x] **Step 5: Add public views**

Create security-invoker views for published listing search/detail data. Exclude exact addresses, private notes, host legal data and financial data.

- [x] **Step 6: Add Storage buckets and policies**

Define:

- `listing-images`: public reads for approved assets, host write access under their listing prefix.
- `private-documents`: no public access; signed server URLs only.

- [ ] **Step 7: Run RLS smoke tests (scripts added; execution blocked by missing Docker)**

Using local Supabase users:

- anonymous user can read a published listing but not its exact address;
- guest cannot read another guest's booking;
- host cannot update another host's listing;
- authenticated user cannot insert payment or audit rows.

- [x] **Step 8: Commit**

```bash
git add supabase/migrations/202606080006_rls.sql
git commit -m "feat: secure marketplace data with RLS"
```

### Task 7: Replace Mock Authentication

**Files:**
- Create: `src/lib/auth/user.ts`
- Create: `src/lib/auth/__tests__/authorization.test.ts`
- Modify: `src/lib/auth.ts`
- Modify: `src/lib/auth-actions.ts`
- Modify: `src/components/auth/auth-forms.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/dashboard/layout.tsx`
- Delete: `src/lib/password.ts`

- [x] **Step 1: Write authorization tests**

Test pure helpers:

```ts
expect(canAccessDashboard({ role: "host", status: "active" })).toBe(true);
expect(canAccessDashboard({ role: "guest", status: "active" })).toBe(false);
expect(canAccessDashboard({ role: "admin", status: "blocked" })).toBe(false);
```

- [x] **Step 2: Confirm failure**

Run:

```bash
npx vitest run src/lib/auth/__tests__/authorization.test.ts
```

Expected: FAIL because helpers do not exist.

- [x] **Step 3: Implement application user lookup**

`getCurrentUser` calls Supabase `auth.getUser()`, then selects the matching `public.users` row. Return:

```ts
type AppUser = {
  id: string;
  email: string;
  fullName: string;
  role: "guest" | "host" | "admin";
  status: "active" | "restricted" | "blocked" | "deleted";
};
```

- [x] **Step 4: Keep an auth compatibility facade**

`src/lib/auth.ts` exports:

```text
getCurrentUser
requireUser
requireHost
requireAdmin
destroySession
```

The facade redirects blocked users to `/login?error=account-blocked`.

- [x] **Step 5: Replace auth actions**

- Login uses `signInWithPassword`.
- Registration uses `signUp` with `full_name` and safe `requested_role`.
- Host signup creates role `host` but verification remains `not_started`.
- Logout uses `auth.signOut()`.
- Password length becomes at least 10 characters.
- Errors are translated into safe Dutch messages.

- [x] **Step 6: Update forms**

Remove demo credentials. Add e-mail confirmation feedback and clear password requirements. Preserve the existing visual language.

- [x] **Step 7: Update layouts**

Use `fullName`, lowercase roles and Supabase logout. Dashboard layout allows active host/admin only.

- [x] **Step 8: Run tests and typecheck**

Run:

```bash
npm test
npm run typecheck
```

Expected: PASS.

- [x] **Step 9: Remove password hashing**

Delete `src/lib/password.ts` after `rg "password|hashPassword|verifyPassword" src` confirms there are no imports.

- [x] **Step 10: Commit**

```bash
git add src/lib/auth.ts src/lib/auth-actions.ts src/lib/auth src/components/auth/auth-forms.tsx src/app/layout.tsx src/app/dashboard/layout.tsx
git rm src/lib/password.ts
git commit -m "feat: replace mock auth with Supabase"
```

### Task 8: Add Money and Payment Provider Boundaries

**Files:**
- Create: `src/lib/__tests__/money.test.ts`
- Create: `src/lib/money.ts`
- Create: `src/lib/payments/types.ts`
- Create: `src/lib/payments/stripe.ts`
- Create: `src/lib/payments/provider.ts`
- Create: `src/lib/payments/unavailable-provider.ts`
- Create: `src/lib/payments/__tests__/provider.test.ts`
- Delete: `src/lib/payment-service.ts`

- [ ] **Step 1: Write money tests**

Required assertions:

```ts
expect(calculateFees(100_000)).toEqual({
  bookingSubtotalCents: 100_000,
  guestServiceFeeCents: 8_000,
  hostCommissionCents: 5_000,
  guestTotalCents: 108_000,
  hostNetCents: 95_000
});
```

Also test odd-cent rounding and reject negative values.

- [ ] **Step 2: Implement integer money helpers**

No floating point amounts. `calculateFees` accepts cents and basis points and rounds half away from zero using integer arithmetic.

- [ ] **Step 3: Define payment contracts**

```ts
interface PaymentProvider {
  createHostAccount(input): Promise<{ accountId: string }>;
  createHostOnboardingLink(input): Promise<{ url: string; expiresAt: number }>;
  createCheckout(input): Promise<{ providerSessionId: string; url: string }>;
  refund(input): Promise<{ providerRefundId: string; status: string }>;
  transferToHost(input): Promise<{ providerTransferId: string }>;
}
```

Every mutating input includes an idempotency key.

- [ ] **Step 4: Add Stripe singleton**

Use the current pinned API version from environment. Instantiate only server-side. Do not create Checkout or transfer logic yet; this phase establishes typed helpers and account configuration.

- [ ] **Step 5: Add safe provider selection**

When Stripe is configured, return the Stripe provider. Otherwise return an unavailable provider whose mutating calls throw `PaymentProviderNotConfiguredError`. Never silently authorize mock money in production code.

- [ ] **Step 6: Run tests**

Run:

```bash
npx vitest run src/lib/__tests__/money.test.ts src/lib/payments/__tests__/provider.test.ts
npm run typecheck
```

Expected: PASS.

- [ ] **Step 7: Remove mock payment service**

Confirm no imports remain, then delete `src/lib/payment-service.ts`.

- [ ] **Step 8: Commit**

```bash
git add src/lib/money.ts src/lib/__tests__/money.test.ts src/lib/payments
git rm src/lib/payment-service.ts
git commit -m "feat: add production payment boundaries"
```

### Task 9: Update Documentation and Deployment Safety

**Files:**
- Modify: `.gitignore`
- Modify: `README.md`
- Modify: `docs/DEPLOYMENT.md`

- [ ] **Step 1: Ignore local-only artifacts**

Ignore:

```text
.env.*
!.env.example
.supabase/
coverage/
```

- [ ] **Step 2: Document local setup**

Document:

```bash
npm install
npx supabase start
npx supabase db reset
cp .env.example .env.local
npm run dev
```

Explain where local Supabase keys appear and that Stripe sandbox keys must be supplied by the owner.

- [ ] **Step 3: Document deploy separation**

The current Netlify site continues publishing `website/`. Create a separate staging Netlify site for the Next.js app. Do not remove `NETLIFY_NEXT_PLUGIN_SKIP` from the current production site during this phase.

- [ ] **Step 4: Document required secrets**

List every environment variable and identify public versus server-only values. Never include real keys.

- [ ] **Step 5: Commit**

```bash
git add .gitignore README.md docs/DEPLOYMENT.md
git commit -m "docs: add production foundation setup"
```

### Task 10: Verify the Production Foundation

**Files:**
- No new files unless a verification failure requires a focused fix.

- [ ] **Step 1: Run unit tests**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: exit code 0.

- [ ] **Step 3: Reset local database**

```bash
npx supabase db reset
```

Expected: all migrations and seed hooks complete successfully.

- [ ] **Step 4: Build Next.js**

Use valid local Supabase variables and Stripe test placeholders:

```bash
npm run build
```

Expected: production build completes. Routes that require an unavailable external account show a controlled configuration state rather than crashing public pages.

- [ ] **Step 5: Inspect git state**

```bash
git status --short
git diff --check
```

Expected: no uncommitted production changes and no whitespace errors.

- [ ] **Step 6: Record phase result**

Update the implementation checklist in this plan, record any external account blockers, and prepare the next plan:

```text
Phase 2: listing/search migration
Phase 3: atomic booking and Stripe Checkout
Phase 4: host/admin operations, payouts and disputes
Phase 5: production hardening and launch
```
