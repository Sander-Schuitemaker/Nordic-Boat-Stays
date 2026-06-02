import { z } from "zod";

export const searchSchema = z.object({
  location: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.coerce.number().int().min(1).max(16).default(2),
  boatType: z.string().optional()
});

export const bookingSchema = z
  .object({
    listingId: z.string().min(1),
    checkIn: z.string().min(1, "Kies een check-in datum"),
    checkOut: z.string().min(1, "Kies een check-out datum"),
    guests: z.coerce.number().int().min(1).max(16),
    message: z.string().max(500).optional()
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: "Check-out moet na check-in liggen",
    path: ["checkOut"]
  });

export const listingFormSchema = z.object({
  title: z.string().min(8),
  region: z.string().min(2),
  address: z.string().min(4),
  latitude: z.coerce.number().min(57).max(72),
  longitude: z.coerce.number().min(4).max(32),
  description: z.string().min(40),
  pricePerNight: z.coerce.number().int().min(80),
  maxGuests: z.coerce.number().int().min(1).max(16),
  bedrooms: z.coerce.number().int().min(1).max(10),
  amenities: z.string().min(2),
  imageUrl: z.string().url(),
  boatType: z.string().min(2),
  boatCapacity: z.coerce.number().int().min(1).max(12),
  enginePowerHp: z.coerce.number().int().min(5).max(400),
  licenseRequired: z.coerce.boolean().default(false),
  safetyIncluded: z.coerce.boolean().default(true),
  availableFrom: z.string().optional(),
  availableUntil: z.string().optional()
});
