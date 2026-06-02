"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Er ging iets mis</h1>
      <p className="mt-3 text-muted-foreground">Probeer opnieuw of ga terug naar de zoekpagina.</p>
      <Button className="mt-6" onClick={reset}>Opnieuw proberen</Button>
    </main>
  );
}
