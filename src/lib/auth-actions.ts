"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, destroySession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4)
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2),
  role: z.enum(["GUEST", "HOST"])
});

export type AuthActionState = {
  error?: string;
};

export async function loginAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { error: "Vul een geldig e-mailadres en wachtwoord in." };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    return { error: "E-mailadres of wachtwoord klopt niet." };
  }

  await createSession(user);
  redirect(user.role === "HOST" || user.role === "ADMIN" ? "/dashboard" : "/");
}

export async function registerAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: String(formData.get("email") || "").toLowerCase(),
    password: formData.get("password"),
    role: formData.get("role")
  });

  if (!parsed.success) {
    return { error: "Controleer je naam, e-mailadres, wachtwoord en accounttype." };
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return { error: "Er bestaat al een account met dit e-mailadres." };
  }

  const user = await prisma.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      role: parsed.data.role,
      passwordHash: hashPassword(parsed.data.password),
      profile: { create: {} }
    }
  });

  await createSession(user);
  redirect(user.role === "HOST" ? "/dashboard" : "/");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
