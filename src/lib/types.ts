export type BoatType = "motorboot" | "vissersboot" | "sloep" | "rib" | "kajuitboot";
export type BookingStatus = "pending" | "accepted" | "rejected" | "cancelled" | "completed";

export type Region = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
};

export type Boat = {
  type: BoatType;
  capacity: number;
  enginePowerHp: number;
  licenseRequired: boolean;
  safetyIncluded: boolean;
  description: string;
};

export type Listing = {
  id: string;
  slug: string;
  title: string;
  city: string;
  region: string;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  reviewCount: number;
  popularity: number;
  petsAllowed: boolean;
  waterfront: boolean;
  privateDock: boolean;
  saunaHotTub: boolean;
  amenities: string[];
  images: string[];
  boat: Boat;
};

export type Booking = {
  id: string;
  listingId: string;
  listingTitle: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: BookingStatus;
  totalPrice: number;
};
