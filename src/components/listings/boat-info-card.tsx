import { Anchor, Gauge, ShieldCheck, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Boat } from "@/lib/types";

export function BoatInfoCard({ boat }: { boat: Boat }) {
  const items = [
    ["Type boot", boat.type, Anchor],
    ["Capaciteit", `${boat.capacity} personen`, UsersRound],
    ["Motorvermogen", `${boat.enginePowerHp} pk`, Gauge],
    ["Vaarbewijs nodig", boat.licenseRequired ? "Ja" : "Nee", ShieldCheck],
    ["Veiligheidsuitrusting", boat.safetyIncluded ? "Inbegrepen" : "Niet inbegrepen", ShieldCheck]
  ] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bootinformatie</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {items.map(([label, value, Icon]) => (
          <div key={label} className="flex gap-3 rounded-xl bg-muted p-4">
            <Icon className="size-5 text-primary" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
              <p className="mt-1 font-semibold">{value}</p>
            </div>
          </div>
        ))}
        <p className="sm:col-span-2 text-sm leading-6 text-muted-foreground">{boat.description}</p>
      </CardContent>
    </Card>
  );
}
