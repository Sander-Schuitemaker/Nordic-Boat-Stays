import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getPublicEnv } from "@/lib/env";

const protectedRouteRoots = [
  "/account",
  "/admin",
  "/host",
  "/dashboard",
  "/favorites",
  "/messages",
  "/bookings",
] as const;

const authOnlyRoutes = ["/login", "/register", "/forgot-password"] as const;

export function isProtectedPath(pathname: string): boolean {
  return protectedRouteRoots.some(
    (root) => pathname === root || pathname.startsWith(`${root}/`),
  );
}

export function isAuthOnlyPath(pathname: string): boolean {
  return authOnlyRoutes.includes(pathname as (typeof authOnlyRoutes)[number]);
}

function copyCookies(source: NextResponse, target: NextResponse): NextResponse {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie);
  });

  return target;
}

export async function updateSupabaseSession(request: NextRequest) {
  const config = getPublicEnv();

  if (!config.configured || !config.url || !config.publishableKey) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isProtectedPath(request.nextUrl.pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    loginUrl.searchParams.set(
      "next",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );

    return copyCookies(response, NextResponse.redirect(loginUrl));
  }

  if (user && isAuthOnlyPath(request.nextUrl.pathname)) {
    const accountUrl = request.nextUrl.clone();
    accountUrl.pathname = "/account";
    accountUrl.search = "";

    return copyCookies(response, NextResponse.redirect(accountUrl));
  }

  return response;
}
