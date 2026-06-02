import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
      <section>
        <h1 className="text-4xl font-semibold">Contact</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">Vragen over een huis, bootveiligheid of verhuurderschap? Stuur ons een bericht.</p>
      </section>
      <form className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border">
        <div className="grid gap-4">
          <div className="flex flex-col gap-1">
            <Label>Naam</Label>
            <Input placeholder="Je naam" />
          </div>
          <div className="flex flex-col gap-1">
            <Label>E-mail</Label>
            <Input type="email" placeholder="naam@example.com" />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Bericht</Label>
            <textarea className="min-h-36 rounded-xl border border-border bg-white p-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Waar kunnen we mee helpen?" />
          </div>
          <Button type="button" size="lg">Bericht versturen</Button>
        </div>
      </form>
    </main>
  );
}
