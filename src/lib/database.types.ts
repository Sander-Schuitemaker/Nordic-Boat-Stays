export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type TableDefinition<
  Row extends Record<string, unknown>,
  Insert extends Record<string, unknown> = Partial<Row>,
  Update extends Record<string, unknown> = Partial<Row>,
> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

type UserRole = "guest" | "host" | "admin";
type UserStatus = "active" | "restricted" | "blocked" | "deleted";
type HostVerificationStatus =
  | "not_started"
  | "pending"
  | "verified"
  | "restricted"
  | "rejected";
type ListingStatus =
  | "draft"
  | "pending_review"
  | "published"
  | "rejected"
  | "paused"
  | "archived";
type BookingStatus =
  | "draft"
  | "pending_payment"
  | "confirmed"
  | "checked_in"
  | "completed"
  | "cancelled"
  | "disputed";
type PaymentStatus =
  | "requires_payment"
  | "processing"
  | "paid"
  | "held"
  | "partially_refunded"
  | "refunded"
  | "failed"
  | "chargeback";
type PayoutStatus =
  | "not_ready"
  | "scheduled"
  | "pending"
  | "paid"
  | "failed"
  | "paused";
type RefundStatus =
  | "requested"
  | "approved"
  | "processing"
  | "completed"
  | "rejected";
type AvailabilityType =
  | "payment_hold"
  | "confirmed_booking"
  | "host_block"
  | "boat_block"
  | "maintenance";
type AvailabilityStatus = "active" | "released" | "expired";
type BoatType =
  | "motorboat"
  | "fishing_boat"
  | "rib"
  | "sailboat"
  | "dinghy"
  | "other";

type UserRow = {
  id: string;
  email: string;
  full_name: string;
  avatar_path: string | null;
  role: UserRole;
  status: UserStatus;
  locale: string;
  phone_e164: string | null;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
};

type ListingRow = {
  id: string;
  host_id: string;
  slug: string;
  status: ListingStatus;
  title: string;
  description: string;
  region: string;
  county: string;
  municipality: string;
  city: string;
  public_location: unknown;
  timezone: string;
  currency: string;
  base_price_cents: number;
  cleaning_fee_cents: number;
  mandatory_boat_fee_cents: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  check_in_time: string;
  check_out_time: string;
  pets_allowed: boolean;
  waterfront: boolean;
  private_dock: boolean;
  sauna_hot_tub: boolean;
  direct_booking: boolean;
  house_rules: string;
  cancellation_policy_version: string;
  approved_by: string | null;
  approved_at: string | null;
  published_at: string | null;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
};

type BookingRow = {
  id: string;
  reference: string;
  listing_id: string;
  guest_id: string;
  status: BookingStatus;
  check_in: string;
  check_out: string;
  stay_range: string;
  guests: number;
  currency: string;
  nightly_subtotal_cents: number;
  cleaning_fee_cents: number;
  boat_fee_cents: number;
  guest_service_fee_cents: number;
  host_commission_cents: number;
  tax_cents: number;
  total_cents: number;
  host_net_cents: number;
  guest_fee_bps: number;
  host_fee_bps: number;
  cancellation_policy_version: string;
  pricing_version: string;
  license_required: boolean;
  license_confirmed_at: string | null;
  payment_expires_at: string | null;
  confirmed_at: string | null;
  checked_in_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
  payout_release_at: string | null;
  created_at: string;
  updated_at: string;
};

type PaymentRow = {
  id: string;
  booking_id: string;
  attempt_number: number;
  provider: string;
  status: PaymentStatus;
  amount_cents: number;
  currency: string;
  checkout_session_id: string | null;
  payment_intent_id: string | null;
  charge_id: string | null;
  transfer_group: string;
  payment_method_type: string | null;
  idempotency_key: string;
  failure_code: string | null;
  failure_message: string | null;
  paid_at: string | null;
  held_at: string | null;
  released_at: string | null;
  created_at: string;
  updated_at: string;
};

type LooseRow = Record<string, unknown>;

export type Database = {
  public: {
    Tables: {
      users: TableDefinition<
        UserRow,
        Partial<UserRow> & Pick<UserRow, "id" | "email" | "full_name">,
        Partial<UserRow>
      >;
      host_profiles: TableDefinition<{
        user_id: string;
        display_name: string;
        legal_entity_type: string;
        business_name: string | null;
        country_code: string;
        verification_status: HostVerificationStatus;
        platform_approved: boolean;
        approved_by: string | null;
        approved_at: string | null;
        restriction_reason: string | null;
        terms_version: string;
        terms_accepted_at: string;
        created_at: string;
        updated_at: string;
      }>;
      payout_accounts: TableDefinition<{
        id: string;
        host_id: string;
        provider: string;
        provider_account_id: string;
        onboarding_complete: boolean;
        transfers_capability: string;
        payouts_enabled: boolean;
        payout_schedule: string;
        requirements_due: Json;
        last_synced_at: string | null;
        created_at: string;
        updated_at: string;
      }>;
      listings: TableDefinition<
        ListingRow,
        Partial<ListingRow> &
          Pick<
            ListingRow,
            | "host_id"
            | "slug"
            | "title"
            | "description"
            | "region"
            | "county"
            | "municipality"
            | "city"
            | "public_location"
            | "base_price_cents"
            | "max_guests"
            | "bedrooms"
            | "bathrooms"
            | "house_rules"
            | "cancellation_policy_version"
          >,
        Partial<ListingRow>
      >;
      listing_private_locations: TableDefinition<LooseRow>;
      listing_images: TableDefinition<LooseRow>;
      boat_details: TableDefinition<{
        listing_id: string;
        boat_type: BoatType;
        make: string | null;
        model: string | null;
        build_year: number | null;
        capacity: number;
        engine_power_hp: number;
        license_required: boolean;
        license_category: string | null;
        safety_equipment: string[];
        deposit_cents: number;
        rules: string;
        insurance_status: string;
        insurance_expires_on: string | null;
        created_at: string;
        updated_at: string;
      }>;
      listing_documents: TableDefinition<LooseRow>;
      amenities: TableDefinition<LooseRow>;
      listing_amenities: TableDefinition<LooseRow>;
      availability: TableDefinition<{
        id: string;
        listing_id: string;
        booking_id: string | null;
        date_range: string;
        block_type: AvailabilityType;
        status: AvailabilityStatus;
        expires_at: string | null;
        created_by: string | null;
        note: string | null;
        created_at: string;
        updated_at: string;
      }>;
      pricing_rules: TableDefinition<LooseRow>;
      listing_translations: TableDefinition<LooseRow>;
      bookings: TableDefinition<BookingRow>;
      booking_price_items: TableDefinition<LooseRow>;
      payments: TableDefinition<PaymentRow>;
      platform_fees: TableDefinition<LooseRow>;
      payouts: TableDefinition<{
        id: string;
        booking_id: string;
        host_id: string;
        payout_account_id: string;
        status: PayoutStatus;
        gross_host_cents: number;
        adjustment_cents: number;
        amount_cents: number;
        currency: string;
        scheduled_for: string;
        provider_transfer_id: string | null;
        provider_payout_id: string | null;
        idempotency_key: string;
        retry_count: number;
        failure_code: string | null;
        failure_message: string | null;
        paid_at: string | null;
        created_at: string;
        updated_at: string;
      }>;
      refunds: TableDefinition<{
        id: string;
        booking_id: string;
        payment_id: string;
        requested_by: string;
        approved_by: string | null;
        status: RefundStatus;
        reason: string;
        policy_result: Json;
        amount_cents: number;
        currency: string;
        provider_refund_id: string | null;
        idempotency_key: string;
        requested_at: string;
        approved_at: string | null;
        completed_at: string | null;
        failure_message: string | null;
      }>;
      disputes: TableDefinition<LooseRow>;
      security_deposits: TableDefinition<LooseRow>;
      booking_documents: TableDefinition<LooseRow>;
      platform_settings: TableDefinition<LooseRow>;
      conversations: TableDefinition<LooseRow>;
      messages: TableDefinition<LooseRow>;
      favorites: TableDefinition<{
        user_id: string;
        listing_id: string;
        created_at: string;
      }>;
      reviews: TableDefinition<LooseRow>;
      webhook_events: TableDefinition<LooseRow>;
      audit_logs: TableDefinition<LooseRow>;
      outbox_jobs: TableDefinition<LooseRow>;
    };
    Views: {
      published_listing_catalog: {
        Row: {
          id: string | null;
          slug: string | null;
          title: string | null;
          region: string | null;
          city: string | null;
          base_price_cents: number | null;
          boat_type: BoatType | null;
          rating: number | null;
          review_count: number | null;
        };
        Relationships: [];
      };
      published_listing_images: {
        Row: {
          id: string | null;
          listing_id: string | null;
          storage_path: string | null;
          alt_text: string | null;
          sort_order: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      create_booking_hold: {
        Args: {
          p_listing_id: string;
          p_check_in: string;
          p_check_out: string;
          p_guests: number;
          p_license_confirmed?: boolean;
        };
        Returns: {
          booking_id: string;
          payment_id: string;
          total_cents: number;
          hold_expires_at: string;
        }[];
      };
    };
    Enums: {
      user_role: UserRole;
      user_status: UserStatus;
      host_verification_status: HostVerificationStatus;
      listing_status: ListingStatus;
      booking_status: BookingStatus;
      payment_status: PaymentStatus;
      payout_status: PayoutStatus;
      refund_status: RefundStatus;
      availability_type: AvailabilityType;
      availability_status: AvailabilityStatus;
      boat_type: BoatType;
      dispute_status:
        | "open"
        | "evidence_required"
        | "under_review"
        | "won"
        | "lost"
        | "resolved";
      deposit_status:
        | "not_requested"
        | "requires_method"
        | "authorized"
        | "released"
        | "capture_requested"
        | "captured"
        | "failed";
      job_status: "pending" | "processing" | "completed" | "failed";
    };
    CompositeTypes: Record<string, never>;
  };
};
