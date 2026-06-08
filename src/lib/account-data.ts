import { requireHost, requireUser } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AccountListing = {
  id: string;
  slug: string;
  title: string;
  region: string;
  city: string;
  priceCents: number;
  currency: string;
  boatType: string;
  rating: number;
  reviewCount: number;
  imageUrl: string | null;
  status?: string;
};

export type AccountBooking = {
  id: string;
  reference: string;
  listingId: string;
  listingTitle: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: string;
  paymentStatus: string | null;
  totalCents: number;
  currency: string;
  createdAt: string;
};

export type AccountConversation = {
  id: string;
  listingId: string;
  listingTitle: string;
  counterpartLabel: string;
  lastMessage: string | null;
  lastMessageAt: string;
  unreadCount: number;
};

export type AccountMessage = {
  id: string;
  senderId: string;
  body: string;
  createdAt: string;
  isMine: boolean;
};

export type AccountConversationDetail = {
  id: string;
  listingId: string;
  listingTitle: string;
  counterpartLabel: string;
  messages: AccountMessage[];
};

async function signedListingImages(
  listingIds: string[],
): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  if (!listingIds.length) {
    return result;
  }

  const supabase = await createServerSupabaseClient();
  const { data: images } = await supabase
    .from("published_listing_images")
    .select("listing_id, storage_path, sort_order")
    .in("listing_id", listingIds)
    .order("sort_order", { ascending: true });

  const firstImages = new Map<string, string>();
  for (const image of images ?? []) {
    if (
      image.listing_id &&
      image.storage_path &&
      !firstImages.has(image.listing_id)
    ) {
      firstImages.set(image.listing_id, image.storage_path);
    }
  }

  await Promise.all(
    Array.from(firstImages.entries()).map(async ([listingId, path]) => {
      const { data } = await supabase.storage
        .from("listing-images")
        .createSignedUrl(path, 60 * 30);
      if (data?.signedUrl) {
        result.set(listingId, data.signedUrl);
      }
    }),
  );

  return result;
}

export async function getMyFavoriteListings(): Promise<AccountListing[]> {
  const user = await requireUser();
  const supabase = await createServerSupabaseClient();
  const { data: favorites, error } = await supabase
    .from("favorites")
    .select("listing_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Favorieten konden niet worden geladen.");
  }

  const listingIds = (favorites ?? []).map((item) => item.listing_id);
  if (!listingIds.length) {
    return [];
  }

  const [{ data: listings }, images] = await Promise.all([
    supabase
      .from("published_listing_catalog")
      .select(
        "id, slug, title, region, city, base_price_cents, boat_type, rating, review_count",
      )
      .in("id", listingIds),
    signedListingImages(listingIds),
  ]);
  const byId = new Map((listings ?? []).map((item) => [item.id, item]));

  return listingIds.flatMap((id) => {
    const listing = byId.get(id);
    if (!listing?.id || !listing.slug || !listing.title) {
      return [];
    }

    return [
      {
        id: listing.id,
        slug: listing.slug,
        title: listing.title,
        region: listing.region ?? "Noorwegen",
        city: listing.city ?? "",
        priceCents: listing.base_price_cents ?? 0,
        currency: "EUR",
        boatType: listing.boat_type ?? "Boot inbegrepen",
        rating: Number(listing.rating ?? 0),
        reviewCount: Number(listing.review_count ?? 0),
        imageUrl: images.get(listing.id) ?? null,
      },
    ];
  });
}

async function bookingsForListingIds(
  listingIds: string[],
): Promise<AccountBooking[]> {
  if (!listingIds.length) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(
      "id, reference, listing_id, check_in, check_out, guests, status, total_cents, currency, created_at",
    )
    .in("listing_id", listingIds)
    .order("check_in", { ascending: true });

  if (error) {
    throw new Error("Boekingen konden niet worden geladen.");
  }

  return hydrateBookings(bookings ?? []);
}

async function hydrateBookings(
  bookings: Array<{
    id: string;
    reference: string;
    listing_id: string;
    check_in: string;
    check_out: string;
    guests: number;
    status: string;
    total_cents: number;
    currency: string;
    created_at: string;
  }>,
): Promise<AccountBooking[]> {
  if (!bookings.length) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const bookingIds = bookings.map((booking) => booking.id);
  const listingIds = Array.from(
    new Set(bookings.map((booking) => booking.listing_id)),
  );
  const [{ data: listings }, { data: payments }] = await Promise.all([
    supabase.from("listings").select("id, title").in("id", listingIds),
    supabase
      .from("payments")
      .select("booking_id, status, attempt_number")
      .in("booking_id", bookingIds)
      .order("attempt_number", { ascending: false }),
  ]);
  const listingTitles = new Map(
    (listings ?? []).map((listing) => [listing.id, listing.title]),
  );
  const paymentStatuses = new Map<string, string>();
  for (const payment of payments ?? []) {
    if (!paymentStatuses.has(payment.booking_id)) {
      paymentStatuses.set(payment.booking_id, payment.status);
    }
  }

  return bookings.map((booking) => ({
    id: booking.id,
    reference: booking.reference,
    listingId: booking.listing_id,
    listingTitle:
      listingTitles.get(booking.listing_id) ?? `Boeking ${booking.reference}`,
    checkIn: booking.check_in,
    checkOut: booking.check_out,
    guests: booking.guests,
    status: booking.status,
    paymentStatus: paymentStatuses.get(booking.id) ?? null,
    totalCents: booking.total_cents,
    currency: booking.currency,
    createdAt: booking.created_at,
  }));
}

export async function getMyBookings(): Promise<AccountBooking[]> {
  const user = await requireUser();
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, reference, listing_id, check_in, check_out, guests, status, total_cents, currency, created_at",
    )
    .eq("guest_id", user.id)
    .order("check_in", { ascending: false });

  if (error) {
    throw new Error("Je boekingen konden niet worden geladen.");
  }

  return hydrateBookings(data ?? []);
}

export async function getMyHostListings(): Promise<AccountListing[]> {
  const user = await requireHost();
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("listings")
    .select(
      "id, slug, title, region, city, base_price_cents, currency, status",
    )
    .eq("host_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Je accommodaties konden niet worden geladen.");
  }

  return (data ?? []).map((listing) => ({
    id: listing.id,
    slug: listing.slug,
    title: listing.title,
    region: listing.region,
    city: listing.city,
    priceCents: listing.base_price_cents,
    currency: listing.currency,
    boatType: "Boot inbegrepen",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    status: listing.status,
  }));
}

export async function getMyHostBookings(): Promise<AccountBooking[]> {
  const listings = await getMyHostListings();
  return bookingsForListingIds(listings.map((listing) => listing.id));
}

export async function getMyConversations(): Promise<AccountConversation[]> {
  const user = await requireUser();
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("conversations")
    .select(
      "id, listing_id, guest_id, host_id, status, last_message_at, updated_at",
    )
    .or(`guest_id.eq.${user.id},host_id.eq.${user.id}`)
    .order("last_message_at", { ascending: false });

  if (error) {
    throw new Error("Berichten konden niet worden geladen.");
  }

  const conversations = (data ?? []) as Array<{
    id: string;
    listing_id: string;
    guest_id: string;
    host_id: string;
    last_message_at: string;
  }>;
  if (!conversations.length) {
    return [];
  }

  const conversationIds = conversations.map((item) => item.id);
  const listingIds = Array.from(
    new Set(conversations.map((item) => item.listing_id)),
  );
  const [{ data: listings }, { data: messages }] = await Promise.all([
    supabase.from("listings").select("id, title").in("id", listingIds),
    supabase
      .from("messages")
      .select("id, conversation_id, sender_id, body, read_at, created_at")
      .in("conversation_id", conversationIds)
      .order("created_at", { ascending: false }),
  ]);
  const listingTitles = new Map(
    ((listings ?? []) as Array<{ id: string; title: string }>).map((listing) => [
      listing.id,
      listing.title,
    ]),
  );
  const latestByConversation = new Map<
    string,
    { body: string; created_at: string }
  >();
  const unreadByConversation = new Map<string, number>();

  for (const message of (messages ?? []) as Array<{
    conversation_id: string;
    sender_id: string;
    body: string;
    read_at: string | null;
    created_at: string;
  }>) {
    if (!latestByConversation.has(message.conversation_id)) {
      latestByConversation.set(message.conversation_id, message);
    }
    if (message.sender_id !== user.id && !message.read_at) {
      unreadByConversation.set(
        message.conversation_id,
        (unreadByConversation.get(message.conversation_id) ?? 0) + 1,
      );
    }
  }

  return conversations.map((conversation) => {
    const latest = latestByConversation.get(conversation.id);
    return {
      id: conversation.id,
      listingId: conversation.listing_id,
      listingTitle:
        listingTitles.get(conversation.listing_id) ?? "Vakantiehuis met boot",
      counterpartLabel:
        conversation.host_id === user.id ? "Gast" : "Verhuurder",
      lastMessage: latest?.body ?? null,
      lastMessageAt: latest?.created_at ?? conversation.last_message_at,
      unreadCount: unreadByConversation.get(conversation.id) ?? 0,
    };
  });
}

export async function getMyConversation(
  conversationId: string,
): Promise<AccountConversationDetail | null> {
  const user = await requireUser();
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("conversations")
    .select("id, listing_id, guest_id, host_id")
    .eq("id", conversationId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const conversation = data as {
    id: string;
    listing_id: string;
    guest_id: string;
    host_id: string;
  };
  const [{ data: listing }, { data: messages }] = await Promise.all([
    supabase
      .from("listings")
      .select("id, title")
      .eq("id", conversation.listing_id)
      .maybeSingle(),
    supabase
      .from("messages")
      .select("id, sender_id, body, created_at")
      .eq("conversation_id", conversation.id)
      .order("created_at", { ascending: true }),
  ]);

  return {
    id: conversation.id,
    listingId: conversation.listing_id,
    listingTitle:
      (listing as { title?: string } | null)?.title ??
      "Vakantiehuis met boot",
    counterpartLabel:
      conversation.host_id === user.id ? "Gast" : "Verhuurder",
    messages: ((messages ?? []) as Array<{
      id: string;
      sender_id: string;
      body: string;
      created_at: string;
    }>).map((message) => ({
      id: message.id,
      senderId: message.sender_id,
      body: message.body,
      createdAt: message.created_at,
      isMine: message.sender_id === user.id,
    })),
  };
}
