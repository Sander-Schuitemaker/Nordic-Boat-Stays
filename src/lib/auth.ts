import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { UserRole } from "@prisma/client";
import { prisma } from "@/lib/db";

const cookieName = "nordic_session";
const maxAge = 60 * 60 * 24 * 30;

type SessionPayload = {
  userId: string;
  email: string;
  role: UserRole;
  expiresAt: number;
};

function authSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET ontbreekt. Zet een sterke secret in je environment.");
  }
  return secret || "development-only-change-me";
}

function sign(value: string) {
  return createHmac("sha256", authSecret()).update(value).digest("base64url");
}

function encodeSession(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

function decodeSession(token?: string): SessionPayload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    return payload.expiresAt > Date.now() ? payload : null;
  } catch {
    return null;
  }
}

export async function createSession(user: { id: string; email: string; role: UserRole }) {
  const cookieStore = await cookies();
  const token = encodeSession({
    userId: user.id,
    email: user.email,
    role: user.role,
    expiresAt: Date.now() + maxAge * 1000
  });

  cookieStore.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function getSession() {
  const cookieStore = await cookies();
  return decodeSession(cookieStore.get(cookieName)?.value);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true }
  });
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireHost() {
  const user = await requireUser();

  if (user.role !== "HOST" && user.role !== "ADMIN") {
    redirect("/");
  }

  return user;
}
