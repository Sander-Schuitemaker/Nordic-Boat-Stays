import { z } from "zod";

const normalizedEmail = z
  .string()
  .trim()
  .email()
  .transform((value) => value.toLowerCase());

const optionalTrimmedString = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || undefined);

const dateInPast = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional()
  .transform((value) => value || undefined)
  .refine(
    (value) => !value || new Date(`${value}T00:00:00Z`) < new Date(),
    "Geboortedatum moet in het verleden liggen.",
  );

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

export const forgotPasswordSchema = z.object({
  email: normalizedEmail,
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(12).max(128),
    confirmPassword: z.string().min(12).max(128),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "De wachtwoorden zijn niet gelijk.",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: optionalTrimmedString(32),
  dateOfBirth: dateInPast,
  country: z
    .string()
    .trim()
    .length(2)
    .optional()
    .transform((value) => value?.toUpperCase()),
  language: z.enum(["nl", "no", "sv", "da", "de", "en", "es", "fr"]),
  bio: optionalTrimmedString(2000),
  preferredCurrency: z.enum(["EUR", "NOK"]),
});

export const notificationPreferencesSchema = z
  .object({
    booking: z.boolean(),
    messages: z.boolean(),
    marketing: z.boolean(),
  })
  .strict();

export const hostApplicationSchema = z.object({
  hostName: z.string().trim().min(2).max(100),
  hostType: z.enum(["individual", "company"]),
  companyName: optionalTrimmedString(160),
  countryCode: z.string().trim().length(2).transform((value) => value.toUpperCase()),
  acceptHostTerms: z.literal(true),
}).superRefine((value, context) => {
  if (value.hostType === "company" && !value.companyName) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Vul de bedrijfsnaam in.",
      path: ["companyName"],
    });
  }
});
