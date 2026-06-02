"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapListingPreview } from "@/components/map/map-listing-preview";
import type { Listing } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function NorwayMap({ listings, activeId, className = "" }: { listings: Listing[]; activeId?: string | null; className?: string }) {
  return (
    <div className={className}>
      <MapContainer center={[64.7, 13.8]} zoom={4} scrollWheelZoom className="min-h-[460px]">
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.latitude, listing.longitude]}
            icon={L.divIcon({
              className: `price-pin ${activeId === listing.id ? "is-active" : ""}`,
              html: `<div>${formatCurrency(listing.pricePerNight)}</div>`
            })}
          >
            <Popup closeButton={false}>
              <MapListingPreview listing={listing} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
