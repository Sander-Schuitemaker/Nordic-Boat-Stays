"use client";

import dynamic from "next/dynamic";

export const DynamicNorwayMap = dynamic(() => import("@/components/map/norway-map").then((mod) => mod.NorwayMap), {
  ssr: false,
  loading: () => <div className="flex min-h-[460px] items-center justify-center rounded-2xl bg-muted text-sm text-muted-foreground">Kaart laden...</div>
});
