import { Anchor, ShieldCheck, Waves } from "lucide-react";

export default function AboutPage() {
  const pillars = [
    { title: "Altijd met boot", text: "Elk huis heeft een boot of directe toegang tot een inbegrepen boot.", icon: Anchor },
    { title: "Betrouwbaar", text: "Vaarbewijs, veiligheidsuitrusting en capaciteit zijn zichtbaar voor boeking.", icon: ShieldCheck },
    { title: "Fjordgericht", text: "Geselecteerde plekken aan water, fjorden, eilanden en rustige baaien.", icon: Waves }
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold">Over Nordic Boat Stays</h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">
        Nordic Boat Stays helpt reizigers vakantiehuizen in Noorwegen vinden waar de boot geen extraatje is, maar onderdeel van de ervaring. Elk verblijf heeft toegang tot water, duidelijke bootinformatie en transparante voorwaarden.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {pillars.map(({ title, text, icon: Icon }) => (
          <div key={title} className="rounded-2xl bg-white p-6 ring-1 ring-border">
            <Icon className="size-6 text-primary" />
            <h2 className="mt-4 font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
