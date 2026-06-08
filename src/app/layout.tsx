import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import { Anchor, Heart, UserRound } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/lib/auth-actions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Nordic Boat Stays",
  description: "Vakantiehuizen in Noorwegen, altijd met boot."
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const user = await getCurrentUser();

  return (
    <html lang="nl">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
          <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3 font-semibold">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Anchor className="size-5" />
              </span>
              <span>Nordic Boat Stays</span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
              <Link href="/search">Zoeken</Link>
              <Link href="/about">Over ons</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/messages">Berichten</Link>
              <Link href="/dashboard">Dashboard</Link>
            </nav>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="icon" aria-label="Favorieten">
                <Link href="/favorites">
                  <Heart className="size-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="hidden sm:inline-flex">
                <Link href={user ? "/dashboard" : "/login"}>
                  <UserRound className="size-4" />
                  {user ? user.fullName : "Inloggen"}
                </Link>
              </Button>
              {user ? (
                <form action={logoutAction}>
                  <Button type="submit" variant="ghost">Uitloggen</Button>
                </form>
              ) : null}
            </div>
          </div>
        </header>
        {children}
        <footer className="border-t border-border bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-muted-foreground sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <p className="font-semibold text-foreground">Nordic Boat Stays</p>
              <p className="mt-2">Vakantiehuizen in Noorwegen, altijd met boot.</p>
            </div>
            <p>Veilig boeken met geverifieerde verhuurders, beschermde betalingen en duidelijke bootinformatie.</p>
            <p className="md:text-right">Gebouwd met Next.js, Supabase, Stripe en PostgreSQL.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
