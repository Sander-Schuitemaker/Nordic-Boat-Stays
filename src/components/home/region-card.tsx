import Link from "next/link";
import type { Region } from "@/lib/types";

export function RegionCard({ region }: { region: Region }) {
  return (
    <Link href={`/search?location=${encodeURIComponent(region.name)}`} className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/3] bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${region.imageUrl})` }} />
      <div className="p-5">
        <h3 className="text-xl font-semibold">{region.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{region.description}</p>
      </div>
    </Link>
  );
}
