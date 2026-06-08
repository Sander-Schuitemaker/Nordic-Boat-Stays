import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AccountDeactivatedPage() {
  return (
    <main className="mx-auto grid min-h-[65vh] max-w-xl place-content-center justify-items-center px-4 py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
        <CheckCircle2 className="size-7" />
      </span>
      <h1 className="mt-6 text-3xl font-semibold">Account gedeactiveerd</h1>
      <p className="mt-3 leading-7 text-muted-foreground">
        Je bent overal uitgelogd. Persoonsgegevens worden volgens het
        privacybeleid en de wettelijke bewaartermijnen verwerkt.
      </p>
      <Button asChild className="mt-7">
        <Link href="/">Terug naar de homepagina</Link>
      </Button>
    </main>
  );
}
