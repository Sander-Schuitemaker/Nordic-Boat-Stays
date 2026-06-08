insert into public.platform_settings (
  id,
  version,
  guest_fee_bps,
  host_fee_bps,
  cancellation_policy,
  payout_delay_hours,
  refund_approval_threshold_cents,
  effective_from
)
values (
  '00000000-0000-0000-0000-000000000001',
  'marketplace-v1',
  800,
  500,
  jsonb_build_object(
    'more_than_30_days', jsonb_build_object('refund_bps', 10000),
    'between_7_and_30_days', jsonb_build_object('refund_bps', 5000),
    'less_than_7_days', jsonb_build_object(
      'refund_bps',
      0,
      'refund_cleaning_fee',
      true
    ),
    'host_cancellation', jsonb_build_object('refund_bps', 10000)
  ),
  24,
  50000,
  '2026-06-08T00:00:00Z'
)
on conflict (version) do nothing;

insert into public.amenities(slug, category, labels, icon)
values
  ('wifi', 'popular', '{"nl":"Wifi","en":"Wi-Fi","no":"Wi-Fi"}', 'wifi'),
  ('washing-machine', 'popular', '{"nl":"Wasmachine","en":"Washing machine","no":"Vaskemaskin"}', 'washing-machine'),
  ('heating', 'popular', '{"nl":"Verwarming","en":"Heating","no":"Oppvarming"}', 'heater'),
  ('hot-tub', 'popular', '{"nl":"Hottub","en":"Hot tub","no":"Boblebad"}', 'waves'),
  ('kitchen', 'basic', '{"nl":"Keuken","en":"Kitchen","no":"Kjokken"}', 'utensils'),
  ('workspace', 'basic', '{"nl":"Werkplek","en":"Workspace","no":"Arbeidsplass"}', 'desk'),
  ('free-parking', 'extra', '{"nl":"Gratis parkeren","en":"Free parking","no":"Gratis parkering"}', 'circle-parking'),
  ('ev-charger', 'extra', '{"nl":"Laadpunt","en":"EV charger","no":"Elbillader"}', 'battery-charging'),
  ('barbecue', 'extra', '{"nl":"Barbecue","en":"Barbecue","no":"Grill"}', 'cooking-pot'),
  ('fireplace', 'extra', '{"nl":"Open haard","en":"Fireplace","no":"Peis"}', 'flame'),
  ('waterfront', 'location', '{"nl":"Aan het water","en":"Waterfront","no":"Ved vannet"}', 'waves'),
  ('smoke-alarm', 'safety', '{"nl":"Rookmelder","en":"Smoke alarm","no":"Roykvarsler"}', 'alarm-smoke'),
  ('carbon-monoxide-alarm', 'safety', '{"nl":"Koolmonoxidemelder","en":"Carbon monoxide alarm","no":"Kullosalarm"}', 'badge-alert'),
  ('self-check-in', 'booking', '{"nl":"Zelf inchecken","en":"Self check-in","no":"Selvinnsjekking"}', 'key-round'),
  ('pets-allowed', 'booking', '{"nl":"Huisdieren toegestaan","en":"Pets allowed","no":"Kjaeledyr tillatt"}', 'paw-print')
on conflict (slug) do update set
  category = excluded.category,
  labels = excluded.labels,
  icon = excluded.icon;
